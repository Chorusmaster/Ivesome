import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.context";
import Loading from "@/shared/ui/loading";

function ProtectedLayout() {
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

  return (
    <Outlet />
  );
}

export default ProtectedLayout;