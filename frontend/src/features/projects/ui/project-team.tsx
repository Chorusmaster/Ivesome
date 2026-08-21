import Card from "@/shared/ui/card";
import TeamMember from "./team-member";
import type { Project } from "../projects.types";

function ProjectTeam({ members }: { members: Project["members"] }) {
  return (
    <Card>
      <h2 className="subheading">Team</h2>
      <div className="flex flex-col gap-2">
        {members.map((member) => <TeamMember key={member.user.id} member={member} />)}
      </div>
    </Card>
  );
}

export default ProjectTeam;