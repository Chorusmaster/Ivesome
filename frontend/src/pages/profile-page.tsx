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

import Avatar from "@/shared/ui/avatar";
import Card from "@/shared/ui/card";
import DiscoveryCard from "@/features/search/ui/discovery-card";

const profile = {
  name: "Ferko Mrkvička",
  role: "Product designer & founder",
  email: "ferko@ivesome.app",
  location: "Bratislava, SK",
  joinedAt: new Date("2024-03-12"),
  bio: "Building tools for remote teams. Looking for co-founders who care about craft and shipping.",
  about: "I spent the last few years designing collaboration products for distributed teams. On Ivesome I share early ideas, gather feedback, and look for people who want to turn promising concepts into real products. Currently focused on habit-building tools and lightweight analytics for Slack-first workflows.",
  skills: ["product design", "saas", "b2b", "remote teams", "ux research"],
  links: {
    website: "https://ferko.dev",
    linkedin: "https://linkedin.com/in/ferko",
  },
  stats: {
    ideas: 4,
    projects: 2,
    upvotes: 286,
  },
};

function ProfilePage() {
  return (
    <div>
      <div className="px-16 py-12 bg-surface border-b border-border">
        <div className="flex justify-between items-start gap-8">
          <div className="flex gap-6 items-start min-w-0">
            <Avatar name={profile.name} size="lg" theme="primary" />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-display font-heading text-text-primary">
                  {profile.name}
                </h1>
              </div>

              <p className="text-text-secondary text-body mb-3">
                {profile.role}
              </p>

              <p className="text-text-secondary text-body mb-4 max-w-2xl">
                {profile.bio}
              </p>

              <div className="flex flex-wrap gap-4 text-muted text-small">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  Joined{" "}
                  {formatDistanceToNowStrict(profile.joinedAt, {
                    locale: enUS,
                    addSuffix: true,
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={16} />
                  {profile.email}
                </span>
              </div>
            </div>
          </div>

          <button className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2 shrink-0">
            <Pencil size={16} />
            Edit profile
          </button>
        </div>
      </div>

      <div className="main-container grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <Card>
            <h2 className="heading">About</h2>
            <p className="text-text-secondary whitespace-pre-line">
              {profile.about}
            </p>
          </Card>

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
                slug="nudge"
                title="Nudge — a habit tracker for remote development teams"
                description="A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings."
                tags={["productivity", "saas", "b2b"]}
                upvotes={142}
                comments={38}
                publishedAt={new Date("2024-06-01")}
                type="idea"
              />
              <DiscoveryCard
                slug="nudge"
                title="Nudge — a habit tracker for remote development teams"
                description="A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings."
                tags={["productivity", "saas", "b2b"]}
                upvotes={142}
                comments={38}
                publishedAt={new Date("2024-06-01")}
                type="project"
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
                  {profile.stats.ideas}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-text-secondary">
                  <BriefcaseBusiness size={18} className="text-primary" />
                  Projects
                </span>
                <span className="font-heading text-text-primary">
                  {profile.stats.projects}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-text-secondary">
                  <Triangle size={18} className="text-primary" />
                  Upvotes received
                </span>
                <span className="font-heading text-text-primary">
                  {profile.stats.upvotes}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="subheading">Links</h2>
            <div className="flex flex-col gap-3">
              <a
                href={profile.links.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition"
              >
                <Globe size={18} />
                Website
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition"
              >
                <Globe size={18} />
                LinkedIn
              </a>
            </div>
          </Card>

          <Card>
            <h2 className="subheading">Skills & interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-primary-light text-primary px-2 py-0.5 text-small">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default ProfilePage;
