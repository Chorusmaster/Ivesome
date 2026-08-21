import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.context";
import Loading from "@/shared/ui/loading";
import Navbar from "@/shared/ui/navbar";
import Footer from "@/shared/ui/footer";

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
    <>
      <Navbar />
        <main className="min-h-0 flex-1 bg-background">
          <Outlet />
        </main>
      <Footer />
    </>
  );
}

export default ProtectedLayout;