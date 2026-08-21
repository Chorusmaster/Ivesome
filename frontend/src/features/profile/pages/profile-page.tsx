import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/auth.context";

import Card from "@/shared/ui/card";
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

function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const {
    user: currentUser,
    refreshUser,
  } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState<User>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function startConversation(userId: string) {
    const conversation = await createConversation(userId);
    navigate(`/conversations/${conversation.id}`);
  }

  useEffect(() => {
    const loadData = async () => {
      try {
          setLoading(true);

          const targetUser = userId
            ? await getUser(userId)
            : currentUser ?? await refreshUser();

          setProfileUser(targetUser);

          const projects = await getUserProjects(targetUser.id);
          setProjects(projects);
        } finally {
          setLoading(false);
        }
      };

    loadData();
  }, [userId]);

  const isOwnProfile = currentUser && profileUser && currentUser.id === profileUser.id;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profileUser) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <ProfileHeader user={profileUser} isOwnProfile={!!isOwnProfile} onMessage={() => startConversation(profileUser.id)} />

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          {profileUser?.about && <ProfileAbout aboutText={profileUser.about} />}
          <ProfileProjects projects={projects} />
        </div>

        <ProfileSidebar user={profileUser} projectCount={projects.length} />
      </div>
    </div>
  );
}

export default ProfilePage;
