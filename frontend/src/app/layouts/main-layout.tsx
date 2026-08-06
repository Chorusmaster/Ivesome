import Footer from "@/shared/ui/footer";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App