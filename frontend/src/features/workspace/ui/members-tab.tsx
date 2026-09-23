import type { Workspace } from "../workspace.types";
import Avatar from "@/shared/ui/avatar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface membersTabProps {
  workspace: Workspace;
}

function membersTab({ workspace }: membersTabProps) {
  const { t } = useTranslation();
  const members = workspace.project.members;

  return (
    <div className="main-container-narrow">
      <div className="mb-6">
        <h2 className="font-heading text-heading text-text-primary">
          {t("workspace.membersTab.title")}
        </h2>

        <p className="text-sm text-text-secondary mt-1">
          {t("workspace.membersTab.description")}
        </p>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {members.map((member) => (
          <div
            key={member.user.id}
            className="flex items-center justify-between px-5 py-4 border-b border-border last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <Link to={`/users/${member.user.id}`}>
                <Avatar user={member.user} />
              </Link>

              <div>
                <Link
                  to={`/users/${member.user.id}`}
                  className="font-medium hover:text-primary text-text-primary"
                >
                  {member.user.firstName || member.user.lastName
                    ? `${member.user.firstName ?? ""} ${
                        member.user.lastName ?? ""
                      }`.trim()
                    : member.user.login}
                </Link>

                <div className="text-sm text-text-secondary">
                  @{member.user.login}
                </div>
              </div>
            </div>

            <span className="text-sm px-2.5 py-1 rounded-full bg-background border border-border text-text-secondary">
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default membersTab;
