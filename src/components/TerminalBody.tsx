import React from "react"
import { TerminalInputField, TerminalScreen } from "."
import useCommandExecution from "../hooks/useCommandExecution"
import useTerminalInput from "../hooks/useTerminalInput"
import { commands } from "../lib/commands"

const TerminalBody = () => {
  const { input, clearInput, handleInputChange, handleKeyDown, addToHistory } =
    useTerminalInput()
  const { output, handleCommand } = useCommandExecution()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() !== "") {
      handleCommand(input.trim())
      addToHistory(input.trim())
    }
    clearInput()
  }

  const placeholderText = commands
    .slice(0, 6)
    .map((cmd) => cmd.name)
    .join(", ")

  return (
    <div className="bg-black/80 backdrop-blur-sm text-green-400 p-4 pt-0 font-mono w-full h-[450px] flex flex-col">
      <TerminalScreen output={output} />
      <TerminalInputField
        input={input}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        placeholderText={placeholderText}
      />
    </div>
  )
}

export default TerminalBody
