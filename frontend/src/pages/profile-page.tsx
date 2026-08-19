import { Link } from "react-router-dom";
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
} from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/auth.context";

import Avatar from "@/shared/ui/avatar";
import Card from "@/shared/ui/card";
import DiscoveryCard from "@/features/search/ui/discovery-card";
import { filePathToUrl } from "@/shared/lib/utils";

function ProfilePage() {
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      await refreshUser();
    };

    if (!user) loadUser();
  }, [user]);

  return (
    <div>
      <div className="px-16 py-12 bg-surface border-b border-border">
        <div className="flex justify-between items-start gap-8">
          <div className="flex gap-6 items-start min-w-0">
            <Avatar 
            user={user ?? undefined}
            size="lg" 
            theme="primary" 
            imageUrl={filePathToUrl(user?.avatarLink)}
            />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-display font-heading text-text-primary">
                  {user?.firstName ?? "Anonymous"}{" "}{user?.lastName ?? ""}
                </h1>
              </div>

              <p className="text-text-secondary text-body mb-3">
                @{user?.login ?? "anonymous"}
              </p>

              <p className="text-text-secondary text-body mb-4 max-w-2xl">
                {user?.bio ?? "No bio yet"}
              </p>

              <div className="flex flex-wrap gap-4 text-muted text-small">
                {user?.location && <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {user.location}
                </span>}
                {user?.createdAt && <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  Joined{" "}
                  {formatDistanceToNowStrict(user.createdAt, {
                    locale: enUS,
                    addSuffix: true,
                  })}
                </span>}
                {user?.email && <span className="flex items-center gap-1.5">
                  <Mail size={16} />
                  {user.email}
                </span>}
              </div>
            </div>
          </div>

          <Link
            to="/profile/edit"
            className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2 shrink-0"
          >
            <Pencil size={16} />
            Edit profile
          </Link>
        </div>
      </div>

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          {user?.about && <Card>
            <h2 className="heading">About</h2>
            <p className="text-text-secondary whitespace-pre-line">
              {user.about}
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
              <DiscoveryCard
                id="1"
                title="Nudge — a habit tracker for remote development teams"
                description="A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings."
                tags={["productivity", "saas", "b2b"]}
                upvotes={142}
                comments={38}
                publishedAt={new Date("2024-06-01")}
                stage="IDEA"
              />
              <DiscoveryCard
                id="1"
                title="Nudge — a habit tracker for remote development teams"
                description="A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings."
                tags={["productivity", "saas", "b2b"]}
                upvotes={142}
                comments={38}
                publishedAt={new Date("2024-06-01")}
                stage="TEAM_BUILDING"
              />
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

          {(user?.links && user.links.length > 0) && <Card>
            <h2 className="subheading">Links</h2>
            <div className="flex flex-col gap-3">
              {user.links.map((link, id) => (
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

          {(user?.skills && user.skills.length > 0 && user.skills[0].length > 0) && <Card>
            <h2 className="subheading">Skills & interests</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
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
