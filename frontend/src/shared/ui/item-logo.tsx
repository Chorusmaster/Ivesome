import { Lightbulb, BriefcaseBusiness } from "lucide-react";
import type { ProjectStage } from "@/features/projects/projects.types";

type ItemLogoProps = {
  type?: ProjectStage;
  size?: "md" | "lg";
  imageUrl?: string;
};

function ItemLogo({ type="IDEA", size="md", imageUrl }: ItemLogoProps) {
  return (
    <div className={`
  ${type === "IDEA"
    ? "bg-accent-light text-accent"
    : "bg-primary-light text-primary"
  }
  ${size === "md" ? "size-16" : "size-28"}
  ${!imageUrl
    ? type === "IDEA" ? "border-accent" : "border-primary"
    : "border-transparent"
  }
  shrink-0 border-3 rounded-xl flex items-center justify-center
  font-heading select-none overflow-hidden
`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={type + " logo"}
          className="size-full object-cover"
        />
      ) : (
        type == "IDEA" ? <Lightbulb size={size == 'md' ? 32 : 40}></Lightbulb> : <BriefcaseBusiness size={size == 'md' ? 32 : 40}></BriefcaseBusiness>
      )}
    </div>
  );
}

export default ItemLogo;