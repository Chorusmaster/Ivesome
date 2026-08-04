const sizes = {
  xs: "size-8 text-xs",
  md: "size-10 text-sm",
} as const;

const themes = {
  primary: "bg-primary text-white",
  primary_light: "bg-primary-light text-primary",
  accent: "bg-accent text-white",
  accent_light: "bg-accent-light text-text-accent",
} as const;


type AvatarProps = {
  name: string;
  size?: keyof typeof sizes;
  theme?: keyof typeof themes;
  imageUrl?: string;
};

function Avatar({ name, size="md", theme="primary", imageUrl }: AvatarProps) {
  const initials = name
    .split(" ")
    .map(part => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`${sizes[size]} rounded-full ${themes[theme]} flex items-center justify-center font-medium select-none`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="size-full rounded-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}

export default Avatar;