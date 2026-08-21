import { Link } from "react-router-dom";
import Avatar from "@/shared/ui/avatar";
import { toSentenceCase } from "@/shared/lib/utils";
import type { Project } from "../projects.types";

function TeamMember({ member }: { member: Project["members"][number] }) {
  const name = member.user.firstName && member.user.lastName
    ? `${member.user.firstName} ${member.user.lastName}`
    : member.user.login;

  return (
    <div className="flex gap-2">
      <Link to={`/users/${member.user.id}`}><Avatar user={member.user} theme="primary_light" /></Link>
      <div>
        <Link to={`/users/${member.user.id}`}>
          <div className="text-body hover:text-primary">{name}</div>
        </Link>
        <div className="text-caption text-muted">{toSentenceCase(member.role)}</div>
      </div>
    </div>
  );
}

export default TeamMember;