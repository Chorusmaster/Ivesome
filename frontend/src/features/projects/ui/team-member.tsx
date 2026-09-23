import { Link } from "react-router-dom";
import Avatar from "@/shared/ui/avatar";
import type { Project } from "../projects.types";
import { useTranslation } from "react-i18next";

function TeamMember({ member }: { member: Project["members"][number] }) {
  const { t } = useTranslation();

  const name =
    member.user.firstName && member.user.lastName
      ? `${member.user.firstName} ${member.user.lastName}`
      : member.user.login;

  const translatedRole = t(`projects.projectRoles.${member.role.toLowerCase()}`, {
    defaultValue: member.role,
  });

  return (
    <div className="flex gap-2">
      <Link to={`/users/${member.user.id}`}>
        <Avatar user={member.user} theme="primary_light" />
      </Link>
      <div>
        <Link to={`/users/${member.user.id}`}>
          <div className="text-body hover:text-primary">{name}</div>
        </Link>
        <div className="text-caption text-muted">{translatedRole}</div>
      </div>
    </div>
  );
}

export default TeamMember;
