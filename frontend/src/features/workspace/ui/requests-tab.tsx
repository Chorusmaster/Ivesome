import Avatar from "@/shared/ui/avatar";
import { updateParticipationRequest } from "@/features/participation-requests/participation-requests.api";
import type { ParticipationRequest } from "@/features/participation-requests/participation-requests.types";
import { Link } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

interface RequestsTabProps {
  requests: ParticipationRequest[];
  setRequests: Dispatch<SetStateAction<ParticipationRequest[]>>;
}

function RequestsTab({ requests, setRequests }: RequestsTabProps) {
  async function acceptRequest(requestId: string) {
    await updateParticipationRequest(requestId, "ACCEPTED");
    setRequests(
      requests.filter((request) => request.id !== requestId)
    );
  }

  async function rejectRequest(requestId: string) {
    await updateParticipationRequest(requestId, "REJECTED");
    setRequests(
      requests.filter((request) => request.id !== requestId)
    );
  }

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
        {requests.length > 0 ? 
        requests.map((request) => (
          request.user &&
          <div
            key={request.user.id}
            className="px-5 py-4 border-b border-border last:border-b-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to={`/users/${request.user.id}`}>
                  <Avatar
                    user={request.user}
                  />
                </Link>

                <div>
                  <Link to={`/users/${request.user.id}`} className="font-medium hover:text-primary text-text-primary">
                    {request.user.firstName || request.user.lastName
                      ? `${request.user.firstName ?? ""} ${
                          request.user.lastName ?? ""
                        }`.trim()
                      : request.user.login}
                  </Link>

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
                  onClick={() => acceptRequest(request.id)}
                >
                  Accept
                </button>

                <button
                  className="px-3 py-1.5 text-sm font-medium rounded-md
                    border border-danger/40
                    text-danger
                    hover:bg-danger/10
                    transition"
                  onClick={() => rejectRequest(request.id)}
                >
                  Reject
                </button>
              </div>
            </div>

            <div className="pt-2 text-muted">
              {request.message}
            </div>
          </div>
        )):
        <div className="p-8 text-center text-text-secondary">No participation requests yet</div>}
      </div>
    </div>
  );
}

export default RequestsTab;