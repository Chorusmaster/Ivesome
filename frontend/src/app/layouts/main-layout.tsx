import Footer from "@/shared/ui/footer";
import Navbar from "@/shared/ui/navbar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App