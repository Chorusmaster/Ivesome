import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.context";
import { filePathToUrl } from "../lib/utils.ts";

import Logo from "@/assets/logo.svg?react";
import { Search, LogOut } from "lucide-react";
import Avatar from "@/shared/ui/avatar";
import { useState } from "react";
import { Popover } from "./popover.tsx";
import NotificationPopover from "../../features/notifications/ui/notification-popover.tsx";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      navigate("/search");
      return;
    }

    const params = new URLSearchParams({ q: query.trim() });

    navigate(`/search?${params.toString()}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="h-16">
      <nav className="z-50 fixed h-16 px-16 w-screen flex justify-between items-center bg-surface shadow-sm select-none border-b border-border">
        <div className="flex gap-2 py-2 items-center">
          <Link className="flex items-center gap-2" to="/">
            <Logo className="size-8"></Logo>
            <div className="text-2xl font-bold text-text-primary">Ivesome</div>
          </Link>
          <div className="flex px-8 gap-8 items-center">
            <Link
              to="/search"
              className={`${location.pathname == "/search" ? "text-primary" : "text-muted"} font-button`}
            >
              Search
            </Link>
            {user && user.role === "USER" && (
              <>
                <Link
                  to="/favourites"
                  className={`${location.pathname == "/favourites" ? "text-primary" : "text-muted"} font-button`}
                >
                  Favourites
                </Link>
                <Link to="/conversations" className="text-muted font-button">
                  Conversations
                </Link>
              </>
            )}

            {user && user.role === "ADMIN" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`${location.pathname == "/admin/dashboard" ? "text-primary" : "text-muted"} font-button`}
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-background rounded-input border border-border w-72 flex items-center"
          >
            <Search size={18} className="ml-4 mr-3 text-muted"></Search>
            <input
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ideas..."
              className="h-10 w-full pl-1 pr-2 focus:outline-none placeholder:text-muted"
            ></input>
          </form>

          <Link
            to="ideas/new"
            className="button text-white bg-primary hover:bg-primary-hover"
          >
            + New idea
          </Link>

          <NotificationPopover />

          <Popover>
            <Popover.Trigger
              type="button"
              aria-label="Open account menu"
              className="mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <Avatar
                user={user ?? undefined}
                theme="accent"
                imageUrl={filePathToUrl(user?.avatarLink)}
              />
            </Popover.Trigger>
            <Popover.Content className="flex flex-col gap-1">
              <Link
                className="w-full rounded-button px-2 py-1 text-left text-text-secondary transition-colors hover:bg-background"
                to="/profile"
              >
                Profile
              </Link>
              <Link
                className="w-full rounded-button px-2 py-1 text-left text-text-secondary transition-colors hover:bg-background"
                to="/settings"
              >
                Settings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-button px-2 py-1 text-left text-text-secondary transition-colors hover:bg-background hover:text-danger-hover"
              >
                <LogOut size={12} />
                Log out
              </button>
            </Popover.Content>
          </Popover>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
