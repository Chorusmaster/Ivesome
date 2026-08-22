import { filePathToUrl } from "@/shared/lib/utils";
import type { Workspace } from "../workspace.types";
import Avatar from "@/shared/ui/avatar";

interface MembersTabProps {
  workspace: Workspace;
}

function MembersTab({ workspace }: MembersTabProps) {
  const members = workspace.project.members;

  return (
    <div className="main-container-narrow">
      <div className="mb-6">
        <h2 className="font-heading text-heading">
          Members
        </h2>

        <p className="text-sm text-text-secondary mt-1">
          People working on this project
        </p>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {members.map((member) => (
          <div
            key={member.user.id}
            className="flex items-center justify-between px-5 py-4 border-b border-border last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <Avatar
                imageUrl={filePathToUrl(member.user.avatarLink)}
              />

              <div>
                <div className="font-medium text-text-primary">
                  {member.user.firstName || member.user.lastName
                    ? `${member.user.firstName ?? ""} ${
                        member.user.lastName ?? ""
                      }`.trim()
                    : member.user.login}
                </div>

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

export default MembersTab;