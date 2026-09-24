import type { ReactNode } from "react";

interface SettingsEntryProps {
  title: string;
  description?: string;
  action?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

export default function SettingsEntry({
  title,
  description,
  action,
  titleClassName,
  descriptionClassName,
  className
}: SettingsEntryProps) {
  return (
    <div className={`flex items-center justify-between gap-6 py-4 ${className ?? ""}`}>
      <div className="min-w-0">
        <h3 className={`font-medium text-text-primary ${titleClassName ?? ""}`}>{title}</h3>

        {description && (
          <p className={`mt-1 text-small text-muted ${descriptionClassName ?? ""}`}>{description}</p>
        )}
      </div>

      {action && <div className="shrink-0"> {action} </div>}
    </div>
  );
}
