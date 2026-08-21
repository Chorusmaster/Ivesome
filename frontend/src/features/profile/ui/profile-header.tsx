import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, Mail, MapPin, MessageSquare, Pencil } from "lucide-react";
import Avatar from "@/shared/ui/avatar";
import { filePathToUrl } from "@/shared/lib/utils";
import type { User } from "@/features/auth/auth.types";

type ProfileHeaderProps = {
  user: User;
  isOwnProfile: boolean;
  onMessage: () => void;
};

function ProfileHeader({ user, isOwnProfile, onMessage }: ProfileHeaderProps) {
  return (
    <div className="px-16 py-12 bg-surface border-b border-border">
      <div className="flex justify-between items-start gap-8">
        <div className="flex gap-6 items-start min-w-0">
          <Avatar
            user={user}
            size="lg"
            theme="primary"
            imageUrl={filePathToUrl(user.avatarLink)}
          />
          <div className="min-w-0">
            <h1 className="text-display font-heading text-text-primary">
              {user.firstName ?? "Anonymous"} {user.lastName ?? ""}
            </h1>
            <p className="text-text-secondary text-body mb-3">
              @{user.login ?? "anonymous"}
            </p>
            <p className="text-text-secondary text-body mb-4 max-w-2xl">
              {user.bio ?? "No bio yet"}
            </p>
            <div className="flex flex-wrap gap-4 text-muted text-small">
              {user.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {user.location}
                </span>
              )}
              {user.createdAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  Joined{" "}
                  {formatDistanceToNowStrict(user.createdAt, {
                    locale: enUS,
                    addSuffix: true,
                  })}
                </span>
              )}
              {user.email && (
                <span className="flex items-center gap-1.5">
                  <Mail size={16} />
                  {user.email}
                </span>
              )}
            </div>
          </div>
        </div>
        {isOwnProfile ? (
          <Link
            to="/profile/edit"
            className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2 shrink-0"
          >
            <Pencil size={16} />
            Edit profile
          </Link>
        ) : (
          <button
            onClick={onMessage}
            className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2 shrink-0"
          >
            <MessageSquare size={16} />
            Send message
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
