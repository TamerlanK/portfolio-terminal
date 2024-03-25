import { useState } from "react"
import { commands } from "../lib/commands"

const useTerminalInput = () => {
  // State for current input value
  const [input, setInput] = useState<string>("")

  // State for matching commands based on input
  const [matchingCommands, setMatchingCommands] = useState<string[]>(
    commands.map((cmd) => cmd.name)
  )

  // Function to handle input change
  const handleInputChange = (value: string) => {
    const trimmedValue = value.trim() // Trim input value
    setInput(trimmedValue) // Update input state
    // Filter commands based on input value and update matchingCommands state
    const filteredCommands = commands
      .filter((cmd) => cmd.name.startsWith(trimmedValue))
      .map((cmd) => cmd.name)
    setMatchingCommands(filteredCommands)
  }

  // Function to handle tab press for auto-completion
  const handleTabPress = () => {
    // If input is empty, set it to the first command
    if (input.trim() === "") {
      setInput(commands[0].name)
    } else {
      // Find the index of the current input in matchingCommands
      const currentIndex = matchingCommands.findIndex(
        (cmd) => cmd === input.trim()
      )
      // Calculate the index of the next command for auto-completion
      const nextIndex =
        currentIndex === -1
          ? 0 // If current command not found, select the first command
          : (currentIndex + 1) % matchingCommands.length // Otherwise, select the next command
      setInput(matchingCommands[nextIndex]) // Update input state
    }
  }

  // Function to clear input and reset matching commands
  const clearInput = () => {
    setInput("") // Clear input
    // Reset matchingCommands to include all commands
    setMatchingCommands(commands.map((cmd) => cmd.name))
  }

  // Return the state and functions for external use
  return {
    input,
    handleInputChange,
    handleTabPress,
    clearInput,
  }
}

export default useTerminalInput
