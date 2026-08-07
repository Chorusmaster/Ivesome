import type { ComponentProps } from "react";

type CardProps = ComponentProps<"div"> & {
  children: React.ReactNode;
  hoverable?: boolean;
  variant?: "normal" | "primary";
}

function Card({children, hoverable=false, variant="normal", className, ...props}: CardProps) {
  return (
    <div className={`${variant == 'normal' ? 'bg-surface' : 'bg-primary-light'} border border-border rounded-card shadow-card p-6 ${hoverable ? 'hover:shadow-lg' : ''} ` + className}>
      {children}
    </div>
    );
}

export default Card;