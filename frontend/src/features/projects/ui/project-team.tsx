import Card from "@/shared/ui/card";
import TeamMember from "./team-member";
import type { Project } from "../projects.types";
import { useTranslation } from "react-i18next";

function ProjectTeam({ members }: { members: Project["members"] }) {
  const { t } = useTranslation();

  return (
    <Card>
      <h2 className="subheading text-text-primary">{t("projects.projectTeam.title")}</h2>
      <div className="flex flex-col gap-2">
        {members.map((member) => (
          <TeamMember key={member.user.id} member={member} />
        ))}
      </div>
    </Card>
  );
}

export default ProjectTeam;
