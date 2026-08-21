import { BriefcaseBusiness, Globe, Lightbulb, Triangle } from "lucide-react";
import Card from "@/shared/ui/card";
import type { User } from "@/features/auth/auth.types";

function ProfileSidebar({ user, projectCount }: { user: User; projectCount: number }) {
  return (
    <aside className="flex flex-col gap-4">
      <Card>
        <h2 className="subheading">Activity</h2>
        <div className="flex flex-col gap-3">
          <Activity icon={<Lightbulb size={18} />} label="Ideas" value={0} />
          <Activity icon={<BriefcaseBusiness size={18} />} label="Projects" value={projectCount} />
          <Activity icon={<Triangle size={18} />} label="Upvotes received" value={0} />
        </div>
      </Card>
      {user.links && user.links.length > 0 && <Card>
        <h2 className="subheading">Links</h2>
        <div className="flex flex-col gap-3">
          {user.links.map((link) => <a key={link.link} href={link.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-primary transition"><Globe size={18} />{link.link}</a>)}
        </div>
      </Card>}
      {user.skills && user.skills.length > 0 && user.skills[0].length > 0 && <Card>
        <h2 className="subheading">Skills & interests</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => <span key={skill} className="rounded-full bg-primary-light text-primary px-2 py-0.5 text-small">{skill}</span>)}
        </div>
      </Card>}
    </aside>
  );
}

function Activity({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-text-secondary"><span className="text-primary">{icon}</span>{label}</span><span className="font-heading text-text-primary">{value}</span></div>;
}

export default ProfileSidebar;