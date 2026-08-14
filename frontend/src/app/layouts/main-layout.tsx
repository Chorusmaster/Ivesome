import Footer from "@/shared/ui/footer";
import Navbar from "@/shared/ui/navbar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App