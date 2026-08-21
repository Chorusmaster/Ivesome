import { Link, useParams } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  MapPin,
  Calendar,
  Mail,
  Pencil,
  Lightbulb,
  BriefcaseBusiness,
  Triangle,
  Globe,
  MessageSquare
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/auth.context";

import Avatar from "@/shared/ui/avatar";
import Card from "@/shared/ui/card";
import DiscoveryCard from "@/features/search/ui/discovery-card";
import { filePathToUrl } from "@/shared/lib/utils";
import type { Project } from "@/features/projects/projects.types";
import { getUserProjects } from "@/features/projects/projects.api";
import type { User } from "@/features/auth/auth.types";
import { getUser } from "@/features/profile/profile.api";
import { createConversation } from "@/features/conversations/conversations.api";
import { useNavigate } from "react-router-dom";

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
      <div className="px-16 py-12 bg-surface border-b border-border">
        <div className="flex justify-between items-start gap-8">
          <div className="flex gap-6 items-start min-w-0">
            <Avatar 
            user={profileUser ?? undefined}
            size="lg" 
            theme="primary" 
            imageUrl={filePathToUrl(profileUser?.avatarLink)}
            />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-display font-heading text-text-primary">
                  {profileUser?.firstName ?? "Anonymous"}{" "}{profileUser?.lastName ?? ""}
                </h1>
              </div>

              <p className="text-text-secondary text-body mb-3">
                @{profileUser?.login ?? "anonymous"}
              </p>

              <p className="text-text-secondary text-body mb-4 max-w-2xl">
                {profileUser?.bio ?? "No bio yet"}
              </p>

              <div className="flex flex-wrap gap-4 text-muted text-small">
                {profileUser?.location && <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {profileUser.location}
                </span>}
                {profileUser?.createdAt && <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  Joined{" "}
                  {formatDistanceToNowStrict(profileUser.createdAt, {
                    locale: enUS,
                    addSuffix: true,
                  })}
                </span>}
                {profileUser?.email && <span className="flex items-center gap-1.5">
                  <Mail size={16} />
                  {profileUser.email}
                </span>}
              </div>
            </div>
          </div>

          {isOwnProfile ?
          <Link
            to="/profile/edit"
            className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2 shrink-0"
          >
            <Pencil size={16} />
            Edit profile
          </Link> : 
          <button
            onClick={() => startConversation(profileUser.id)}
            className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2 shrink-0"
          >
            <MessageSquare size={16} />
            Send message
          </button>
          }
        </div>
      </div>

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          {profileUser?.about && <Card>
            <h2 className="heading">About</h2>
            <p className="text-text-secondary whitespace-pre-line">
              {profileUser.about}
            </p>
          </Card>}

          <Card>
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-heading font-heading text-text-primary">
                Ideas & projects
              </h2>
              <Link
                to="/search"
                className="text-small text-primary hover:text-primary-hover"
              >
                Browse feed
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {loading ? (
                <p>Loading...</p>
              ) : (projects && projects.length > 0) ? (
                  projects.map((project) => (
                    <DiscoveryCard
                      key={project.id}
                      project={project}
                    />
                  ))
                ) : (
                  <p>No projects yet</p>
                )}
            </div>
          </Card>
        </div>

        <aside className="flex flex-col gap-4">
          <Card>
            <h2 className="subheading">Activity</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-text-secondary">
                  <Lightbulb size={18} className="text-primary" />
                  Ideas
                </span>
                <span className="font-heading text-text-primary">
                  {0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-text-secondary">
                  <BriefcaseBusiness size={18} className="text-primary" />
                  Projects
                </span>
                <span className="font-heading text-text-primary">
                  {0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-text-secondary">
                  <Triangle size={18} className="text-primary" />
                  Upvotes received
                </span>
                <span className="font-heading text-text-primary">
                  {0}
                </span>
              </div>
            </div>
          </Card>

          {(profileUser?.links && profileUser.links.length > 0) && <Card>
            <h2 className="subheading">Links</h2>
            <div className="flex flex-col gap-3">
              {profileUser.links.map((link, id) => (
                <a
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-primary transition"
                >
                  <Globe size={18} />
                  {link.link}
                </a>
              ))}
            </div>
          </Card>}

          {(profileUser?.skills && profileUser.skills.length > 0 && profileUser.skills[0].length > 0) && <Card>
            <h2 className="subheading">Skills & interests</h2>
            <div className="flex flex-wrap gap-2">
              {profileUser.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-primary-light text-primary px-2 py-0.5 text-small">
                  {skill}
                </span>
              ))}
            </div>
          </Card>}
        </aside>
      </div>
    </div>
  );
}

export default ProfilePage;
