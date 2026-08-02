import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <main className="flex-1 bg-background px-32 pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App