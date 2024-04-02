import { TerminalHeader, TerminalBody } from "./components"

const App = () => {
  return (
    <main className="max-w-2xl mx-auto">
      <div className="flex justify-center flex-col h-screen px-4">
        <TerminalHeader />
        <TerminalBody />
      </div>
    </main>
  )
}

export default App
