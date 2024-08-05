import Homepage from "./pages/HomePage"
import StaticsPage from "./pages/StaticsPage"
import { DataProvider } from "./context/Datacontext"

function App() {

  return (
    <div className="h-full w-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 ">
      <DataProvider>
        <Homepage />
        <StaticsPage />
      </DataProvider>
    </div>
  )
}

export default App
