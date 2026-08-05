import { Lightbulb, BriefcaseBusiness } from "lucide-react";

type DiscoveryCardLogoProps = {
  type?: "idea" | "project";
  imageUrl?: string;
};

function DiscoveryCardLogo({ type="idea", imageUrl }: DiscoveryCardLogoProps) {
  return (
    <div className={`${type == "idea" ? "border-accent bg-accent-light text-accent" : "border-primary bg-primary-light text-primary"} w-16 h-16 shrink-0 border-3 rounded-xl flex items-center justify-center font-heading select-none`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={type + " logo"}
          className="size-full rounded-full object-cover"
        />
      ) : (
        type == "idea" ? <Lightbulb size="32"></Lightbulb> : <BriefcaseBusiness size="32"></BriefcaseBusiness>
      )}
    </div>
  );
}

export default DiscoveryCardLogo;