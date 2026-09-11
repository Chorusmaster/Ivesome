import { Bell } from "lucide-react";
import { Popover } from "../ui/popover";

function NotificationPopover() {
  return (
    <Popover>
      <Popover.Trigger
        type="button"
        aria-label="Open notifications"
        className="rounded-button p-2 transition-colors hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <Bell size={24} className="text-muted" />
      </Popover.Trigger>
      <Popover.Content className="w-80">
        <div className="border-b border-border px-2 pb-3">
          <h2 className="font-heading text-text-primary">Notifications</h2>
        </div>
        <p className="px-2 py-6 text-center text-small text-muted">
          No notifications yet.
        </p>
      </Popover.Content>
    </Popover>
  );
}

export default NotificationPopover;
