import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = false,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn("group overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee",
          reverse && "shimmer-reverse",
          pauseOnHover && "group-hover:paused"
        )}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}