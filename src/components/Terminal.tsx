import React, { useCallback, useEffect, useMemo, useRef } from "react"
import useCommandExecution from "../hooks/useCommandExecution"
import useTerminalInput from "../hooks/useTerminalInput"
import { commands } from "../lib/commands"

const Terminal: React.FC = () => {
  const { input, clearInput, handleInputChange, handleKeyDown, addToHistory } =
    useTerminalInput()
  const { output, handleCommand } = useCommandExecution()
  const terminalRef = useRef<HTMLDivElement>(null)

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (input.trim() !== ""){
        handleCommand(input.trim())
        addToHistory(input.trim())
      }
      clearInput()
    },
    [input, handleCommand, addToHistory, clearInput]
  )

  const placeholderText = useMemo(
    () => commands.map((cmd) => cmd.name).join(", "),
    []
  )

  useEffect(() => {
    const terminal = terminalRef.current
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  }, [output])

  return (
    <div className="bg-black/80 backdrop-blur-sm text-green-400 p-4 pt-0 font-mono w-full h-[450px] flex flex-col">
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e)
          }
          placeholder={placeholderText}
          className="bg-transparent text-green-400 outline-none border-none flex-1 ml-2"
          autoFocus
        />
      </form>
    </div>
  )
}

export default Terminal
