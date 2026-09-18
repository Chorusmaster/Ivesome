import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.context";
import Loading from "@/shared/ui/loading";

function AdminLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading text="Loading page..." fullScreen={true} />;
  }

  if (user && user.status=="UNVERIFIED") {
    return <Navigate to="/verify-email" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <Outlet />
  );
}

export default AdminLayout;