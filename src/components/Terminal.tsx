import React, { useEffect, useRef } from "react"
import useTerminalInput from "../hooks/useTerminalInput"
import useCommandExecution from "../hooks/useCommandExecution"
import { commands } from "../lib/commands"

const Terminal: React.FC = () => {
  const { input, clearInput, handleInputChange, handleTabPress } =
    useTerminalInput()
  const { output, handleCommand } = useCommandExecution()
  const terminalRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCommand(input.trim())
    clearInput()
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const placeholderText = commands.map((cmd) => cmd.name).join(", ")

  return (
    <div className="bg-black/80 backdrop-blur-sm text-green-400 p-4 pt-0 font-mono w-full h-[400px] flex flex-col">
      <div ref={terminalRef} className="flex-1 overflow-y-auto">
        {output.map((element, index) => (
          <div key={index} className="mb-1">
            {element}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-green-400 font-bold">🔐@tk:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault()
              handleTabPress()
            }
          }}
          placeholder={placeholderText}
          className="bg-transparent text-green-400 outline-none border-none flex-1 ml-2"
          autoFocus
        />
      </form>
    </div>
  )
}

export default Terminal
