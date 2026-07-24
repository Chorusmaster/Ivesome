import { Link } from "react-router-dom";
import { logout } from "@/features/auth/auth.api";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  }

  return (
    <nav className="px-8 py-2 w-screen flex justify-between items-center bg-surface shadow-sm">
      <Link to="/"><img src="/full_logo.svg" className="h-8 mb-2"></img></Link>
      <button onClick={handleLogout} className="text-primary hover:text-primary-hover rounded-button font-button py-1 px-2">Log out</button>
    </nav>
  )
}

export default Navbar;
