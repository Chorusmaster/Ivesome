import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  Flag,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
} from "lucide-react";
import Avatar from "@/shared/ui/avatar";
import { filePathToUrl } from "@/shared/lib/utils";
import type { User } from "@/features/auth/auth.types";
import { ReportDialog } from "@/shared/ui/report-dialog";
import { getDateLocale } from "@/shared/lib/utils";

type ProfileHeaderProps = {
  user: User;
  isOwnProfile: boolean;
  canReport: boolean;
  onMessage: () => void;
  reportOpen: boolean;
  reportReason: string;
  reportSubmitting: boolean;
  reportError: string;
  onReportReasonChange: (value: string) => void;
  onReportSubmit: () => void;
  onReportOpenChange: (open: boolean) => void;
};

function ProfileHeader({
  user,
  isOwnProfile,
  canReport,
  onMessage,
  reportOpen,
  reportReason,
  reportSubmitting,
  reportError,
  onReportReasonChange,
  onReportSubmit,
  onReportOpenChange,
}: ProfileHeaderProps) {
  const { t } = useTranslation();

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
              {user.firstName ?? t("profile.header.anonymous")}{" "}
              {user.lastName ?? ""}
            </h1>
            <p className="text-text-secondary text-body mb-3">
              @{user.login ?? "anonymous"}
            </p>
            <p className="text-text-secondary text-body mb-4 max-w-2xl">
              {user.bio ?? t("profile.header.noBio")}
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
                  {t("profile.header.joined", {
                    time: formatDistanceToNowStrict(user.createdAt, {
                      locale: getDateLocale(),
                      addSuffix: true,
                    }),
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
            {t("profile.header.editProfile")}
          </Link>
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onMessage}
              className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2"
            >
              <MessageSquare size={16} />
              {t("profile.header.sendMessage")}
            </button>
            {canReport && (
              <>
                <button
                  type="button"
                  onClick={() => onReportOpenChange(true)}
                  className="button border border-border text-muted hover:text-danger hover:border-danger transition h-10"
                  aria-label={t("profile.header.reportUser")}
                >
                  <Flag size={16} />
                </button>
                <ReportDialog
                  open={reportOpen}
                  onOpenChange={onReportOpenChange}
                  value={reportReason}
                  onChange={onReportReasonChange}
                  submitting={reportSubmitting}
                  error={reportError}
                  onSubmit={onReportSubmit}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
