import { Lightbulb, BriefcaseBusiness } from "lucide-react";

type ItemLogoProps = {
  type?: "idea" | "project";
  size?: "md" | "xl";
  imageUrl?: string;
};

function ItemLogo({ type="idea", size="md", imageUrl }: ItemLogoProps) {
  return (
    <div className={`${type == "idea" ? "border-accent bg-accent-light text-accent" : "border-primary bg-primary-light text-primary"} ${size == "md" ? "size-16" : "size-36"} shrink-0 border-3 rounded-xl flex items-center justify-center font-heading select-none`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={type + " logo"}
          className="size-full rounded-full object-cover"
        />
      ) : (
        type == "idea" ? <Lightbulb size={size == 'md' ? 32 : 40}></Lightbulb> : <BriefcaseBusiness size={size == 'md' ? 32 : 40}></BriefcaseBusiness>
      )}
    </div>
  );
}

export default ItemLogo;