import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "@/features/auth/auth.api";

import Logo from "@/assets/logo.svg?react";
import { Search } from "lucide-react";
import Avatar from "@/shared/ui/avatar";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="px-16 py-2 w-screen flex justify-between items-center bg-surface shadow-sm select-none border-b border-border">
      <div className="flex gap-2 py-2 items-center">
        <Link className="flex items-center gap-2" to="/">
          <Logo className="size-8"></Logo>
          <div className="text-2xl font-bold">Ivesome</div>
        </Link>
        <div className="flex px-8 gap-8 items-center">
          <Link
            to="/"
            className={`${location.pathname == "/" ? "text-primary" : "text-muted"} font-button`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`${location.pathname == "/search" ? "text-primary" : "text-muted"} font-button`}
          >
            Search
          </Link>
          <Link
            to="/dashboard"
            className={`${location.pathname == "/dashboard" ? "text-primary" : "text-muted"} font-button`}
          >
            Dashboard
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="bg-background rounded-input border border-border w-72 flex items-center">
          <Search size={18} className="ml-4 mr-3 text-muted"></Search>
          <input
            placeholder="Search ideas..."
            className="h-full w-full pl-1 pr-2 focus:outline-none placeholder:text-muted"
          ></input>
        </div>
        <Link to="ideas/new" className="button text-white bg-primary hover:bg-primary-hover">
          + New idea
        </Link>
        <Link to="/profile">
          <Avatar name="Anonymous User" theme="accent" />
        </Link>
        <button
          onClick={handleLogout}
          className="text-primary hover:text-primary-hover rounded-button font-button py-1 px-2 hidden"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
