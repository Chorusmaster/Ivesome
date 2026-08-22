import { useParams, Link } from "react-router-dom";
import ItemLogo from "@/shared/ui/item-logo";
import { ArrowLeft } from "lucide-react";
import Loading from "@/shared/ui/loading";
import { useEffect, useState } from "react";
import { getWorkspace } from "../workspace.api";
import type { Workspace } from "../workspace.types";
import { toSentenceCase } from "@/shared/lib/utils";
import { filePathToUrl } from "@/shared/lib/utils";

import TasksTab from "../ui/tasks-tab";
import ChatTab from "../ui/chat-tab";
import MembersTab from "../ui/members-tab";
import SettingsTab from "../ui/settings-tab";
import RequestsTab from "../ui/requests-tab";

function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openTab, setOpenTab] = useState<WorkspaceTabNames>("TASKS");

  useEffect(() => {
    if (!workspaceId) return;
    const id = workspaceId;

    async function loadWorkspace() {
      try {
        setLoading(true);
        setError("");
        setWorkspace(await getWorkspace(id));
      } catch {
        setError("Unable to load workspace");
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, [workspaceId]);

  if (loading) {
    return <Loading fullScreen={true} text="Loading workspace..." />;
  }

  if (error || !workspace) {
    return (
      <div className="min-h-screen bg-background p-8 text-danger">
        {error || "Workspace not found"}
      </div>
    );
  }

  const WORKSPACE_TABS = [
    {
      name: "TASKS",
      label: "Tasks",
      element: <TasksTab workspaceId={workspace.id} tasks={workspace.tasks} />,
    },
    { name: "CHAT", label: "Chat", element: <ChatTab /> },
    {
      name: "MEMBERS",
      label: "Members",
      element: <MembersTab workspace={workspace} />,
    },
    {
      name: "REQUESTS",
      label: "Participation requests",
      element: <RequestsTab workspace={workspace} />,
    },
    { name: "SETTINGS", label: "Settings", element: <SettingsTab /> },
  ] as const;
  type WorkspaceTabNames = (typeof WORKSPACE_TABS)[number]["name"];

  const { project } = workspace;
  const requestsCount = project.participationRequests.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-surface pt-4 px-8 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <ItemLogo
              imageUrl={filePathToUrl(project?.logoLink)}
              type={project.stage}
            />
            <div className="flex flex-col justify-center">
              <div className="text-heading font-heading">{project.title}</div>
              <div className="text-text-secondary">
                {toSentenceCase(project.stage)} · {project.members.length}{" "}
                members
              </div>
            </div>
          </div>
          <Link
            to={`/project/${project.id}`}
            className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to public page
          </Link>
        </div>
        <div className="pt-2">
          {WORKSPACE_TABS.map((tabData) => (
            <button
              key={tabData.name}
              className={`border-b-2 ${openTab === tabData.name ? "border-primary" : "border-transparent"} text-text-primary px-4 py-2 transition`}
              onClick={() => setOpenTab(tabData.name)}
            >
              {tabData.label}
              {tabData.name === "REQUESTS" && requestsCount > 0 && (
                <span className="rounded-full bg-primary text-white px-1.5 ml-1.5 text-small">
                  {requestsCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {WORKSPACE_TABS.find((tab) => tab.name === openTab)?.element}
    </div>
  );
}

export default WorkspacePage;
