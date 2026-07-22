import { Outlet } from "react-router-dom";

function App() {

  return (
    <main className="flex-1 flex justify-center items-center">
      <Outlet />
    </main>
  )
}

export default App