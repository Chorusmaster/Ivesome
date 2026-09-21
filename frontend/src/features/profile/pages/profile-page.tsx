import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/auth.context";

import type { Project } from "@/features/projects/projects.types";
import { getUserProjects } from "@/features/projects/projects.api";
import type { User } from "@/features/auth/auth.types";
import { getUser } from "@/features/profile/profile.api";
import { createConversation } from "@/features/conversations/conversations.api";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "@/features/profile/ui/profile-header";
import ProfileProjects from "@/features/profile/ui/profile-projects";
import ProfileSidebar from "@/features/profile/ui/profile-sidebar";
import ProfileAbout from "../ui/profile-about";
import type { ProfileStats } from "../profile.types";
import { createReport } from "@/features/reports/reports.api";

function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState<User>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileStats, setProfileStats] = useState<ProfileStats | undefined>();
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportError, setReportError] = useState("");

  async function startConversation(userId: string) {
    const conversation = await createConversation(userId);
    navigate(`/conversations/${conversation.id}`);
  }

  async function getProfileStats(projects: Project[]): Promise<ProfileStats> {
    return {
      ideas: projects.filter(
        (item) => item.stage === "IDEA" && item.visibility === "PUBLIC",
      ).length,
      projects: projects.filter(
        (item) => item.stage !== "IDEA" && item.visibility === "PUBLIC",
      ).length,
      upvotes: projects.reduce(
        (total, project) => total + project._count.upvotes,
        0,
      ),
    };
  }

  async function handleReportSubmit() {
    if (!profileUser || !reportReason.trim()) return;

    setReportSubmitting(true);
    setReportError("");

    try {
      await createReport({
        targetType: "USER",
        targetId: profileUser.id,
        reason: reportReason.trim(),
      });
      setReportReason("");
      setReportOpen(false);
    } catch {
      setReportError("Unable to submit report. Please try again.");
    } finally {
      setReportSubmitting(false);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const targetUser = userId
          ? await getUser(userId)
          : (currentUser ?? (await refreshUser()));

        setProfileUser(targetUser);

        const projects = await getUserProjects(targetUser.id);
        setProjects(projects);
        setProfileStats(await getProfileStats(projects));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  const isOwnProfile =
    currentUser && profileUser && currentUser.id === profileUser.id;

  if (loading) {
    return <p className="text-text-primary">Loading...</p>;
  }

  if (!profileUser) {
    return <p className="text-text-primary">User not found</p>;
  }

  return (
    <div>
      <ProfileHeader
        user={profileUser}
        isOwnProfile={!!isOwnProfile}
        canReport={!!currentUser && !isOwnProfile}
        onMessage={() => startConversation(profileUser.id)}
        reportOpen={reportOpen}
        reportReason={reportReason}
        reportSubmitting={reportSubmitting}
        reportError={reportError}
        onReportReasonChange={setReportReason}
        onReportSubmit={handleReportSubmit}
        onReportOpenChange={setReportOpen}
      />

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          {profileUser?.about && <ProfileAbout aboutText={profileUser.about} />}
          <ProfileProjects projects={projects} />
        </div>

        <ProfileSidebar user={profileUser} profileStats={profileStats} />
      </div>
    </div>
  );
}

export default ProfilePage;
