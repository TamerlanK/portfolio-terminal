import { useState } from "react"
import { commands } from "../lib/commands"

const useTerminalInput = () => {
  const [input, setInput] = useState<string>("")
  const [matchingCommands, setMatchingCommands] = useState<string[]>(
    commands.map((cmd) => cmd.name)
  )

  const handleInputChange = (value: string) => {
    const trimmedValue = value.trim()
    setInput(trimmedValue)
    const filteredCommands = commands
      .filter((cmd) => cmd.name.startsWith(trimmedValue))
      .map((cmd) => cmd.name)
    setMatchingCommands(filteredCommands)
  }

  const handleTabPress = () => {
    if (input.trim() === "") {
      setInput(commands[0].name)
    } else {
      const currentIndex = matchingCommands.findIndex(
        (cmd) => cmd === input.trim()
      )
      const nextIndex =
        currentIndex === -1 ? 0 : (currentIndex + 1) % matchingCommands.length
      setInput(matchingCommands[nextIndex])
    }
  }

  const clearInput = () => {
    setInput("")
    setMatchingCommands(commands.map((cmd) => cmd.name))
  }

  return {
    input,
    handleInputChange,
    handleTabPress,
    clearInput,
  }
}

export default useTerminalInput
