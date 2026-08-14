import type { ComponentProps } from "react";

type LoadingProps = ComponentProps<"div"> & {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
};

function Loading({
  size = "md",
  text,
  fullScreen = false,
  className,
  ...props
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const container = fullScreen ? (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
      {...props}
    >
      <div className="flex flex-col items-center gap-3 bg-surface p-6 rounded-card shadow-lg">
        <div
          className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin ${className}`}
        />
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col items-center justify-center gap-2"
      {...props}
    >
      <div
        className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin ${className}`}
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );

  return container;
}

export default Loading;
