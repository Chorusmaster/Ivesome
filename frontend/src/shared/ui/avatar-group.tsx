import type { User } from "@/features/auth/auth.types";
import Avatar from "./avatar";

type AvatarGroupProps = {
  users: User[];
  size?: "xs" | "md";
  theme?: "primary" | "primary_light" | "accent" | "accent_light";
  maxVisible?: number;
  showBorder?: boolean;
};

function AvatarGroup({
  users,
  size = "md",
  theme = "primary_light",
  maxVisible = 3,
  showBorder = true,
}: AvatarGroupProps) {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - visibleUsers.length;

  return (
    <div className="flex">
      {visibleUsers.map((user, index) => (
        <div
          key={index}
          className={`${index > 0 ? "-ml-2" : ""} ${showBorder ? "border-2 border-white rounded-full" : ""}`}
        >
          <Avatar user={user} size={size} theme={theme} />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={`-ml-2 ${showBorder ? "border-2 border-white rounded-full" : ""}`}
        >
          <Avatar customText={`+${remainingCount}`} size={size} theme={theme} />
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;
