import { filePathToUrl } from "@/shared/lib/utils";
import type { Workspace } from "../workspace.types";
import Avatar from "@/shared/ui/avatar";

interface RequestsTabProps {
  workspace: Workspace;
}

function RequestsTab({ workspace }: RequestsTabProps) {
  const requests = workspace.project.participationRequests.filter((request) => request.status === "PENDING" && request.type === "APPLICATION");

  return (
    <div className="main-container-narrow">
      <div className="mb-6">
        <h2 className="font-heading text-heading">
          Participation requests
        </h2>

        <p className="text-sm text-text-secondary mt-1">
          People wanting to participate in this project
        </p>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {requests.map((request) => (
          request.user &&
          <div
            key={request.user.id}
            className="px-5 py-4 border-b border-border last:border-b-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  imageUrl={filePathToUrl(request.user.avatarLink)}
                />

                <div>
                  <div className="font-medium text-text-primary">
                    {request.user.firstName || request.user.lastName
                      ? `${request.user.firstName ?? ""} ${
                          request.user.lastName ?? ""
                        }`.trim()
                      : request.user.login}
                  </div>

                  <div className="text-sm text-text-secondary">
                    @{request.user.login}
                  </div>
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  className="px-3 py-1.5 text-sm font-medium rounded-md
                    border border-primary/40
                    text-primary
                    hover:bg-primary/10
                    transition"
                >
                  Accept
                </button>

                <button
                  className="px-3 py-1.5 text-sm font-medium rounded-md
                    border border-danger/40
                    text-danger
                    hover:bg-danger/10
                    transition"
                >
                  Reject
                </button>
              </div>
            </div>

            <div className="pt-2 text-muted">
              {request.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestsTab;