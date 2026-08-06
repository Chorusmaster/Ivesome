import Navbar from "@/shared/ui/navbar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
