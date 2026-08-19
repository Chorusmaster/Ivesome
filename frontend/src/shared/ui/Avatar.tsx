import type { User } from "@/features/auth/auth.types";
import { filePathToUrl } from "../lib/utils";

const sizes = {
  xs: "size-6 text-xs",
  md: "size-10 text-sm",
  lg: "size-20 text-2xl",
} as const;

const themes = {
  primary: "bg-primary text-white",
  primary_light: "bg-primary-light text-primary",
  accent: "bg-accent text-white",
  accent_light: "bg-accent-light text-text-accent",
} as const;


type AvatarProps = {
  user?: User;
  customText?: string;
  size?: keyof typeof sizes;
  theme?: keyof typeof themes;
  imageUrl?: string;
};

function Avatar({ user, customText, size="md", theme="primary" }: AvatarProps) {
  const name = (user && user.login) ? 
    ((user.firstName && user.lastName) ? [user.firstName, user.lastName] : [user.login]) :
    ["Anonymous", "User"]

  const initials = name
    .map(part => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`${sizes[size]} rounded-full ${themes[theme]} flex items-center justify-center font-medium select-none`}>
      {user?.avatarLink ? (
        <img
          src={filePathToUrl(user.avatarLink)}
          alt={name.join(" ")}
          className="size-full rounded-full object-cover"
        />
      ) : 
        customText ? customText : initials
      }
    </div>
  );
}

export default Avatar;