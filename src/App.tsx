import Terminal from "./components/Terminal"
import TerminalHeader from "./components/TerminalHeader"

const App = () => {
  return (
    <main className="max-w-2xl mx-auto">
      <div className="flex justify-center flex-col h-screen">
        <TerminalHeader />
        <Terminal />
      </div>
    </main>
  )
}

export default App
