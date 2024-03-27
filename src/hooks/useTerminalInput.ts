import { useCallback, useState } from "react"
import { commands } from "../lib/commands"

const HISTORY_SIZE = 10

const useTerminalInput = () => {
  const [input, setInput] = useState<string>("")
  const [matchingCommands, setMatchingCommands] = useState<string[]>(
    commands.map((cmd) => cmd.name)
  )
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)

  const handleInputChange = useCallback((value: string) => {
    const trimmedValue = value.trim()
    setInput(value)

    const filteredCommands = commands
      .filter((cmd) => cmd.name.startsWith(trimmedValue))
      .map((cmd) => cmd.name)
    setMatchingCommands(filteredCommands)
  }, [])

  const handleTabPress = useCallback(() => {
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
  }, [input, matchingCommands])

  const handleArrowUpPress = useCallback(() => {
    if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
      const newIndex = historyIndex + 1
      setInput(commandHistory[commandHistory.length - 1 - newIndex])
      setHistoryIndex(newIndex)
    }
  }, [commandHistory, historyIndex])

  const handleArrowDownPress = useCallback(() => {
    if (historyIndex >= 0) {
      const newIndex = historyIndex - 1
      const newInput =
        newIndex >= 0
          ? commandHistory[commandHistory.length - 1 - newIndex]
          : ""
      setInput(newInput)
      setHistoryIndex(newIndex)
    }
  }, [commandHistory, historyIndex])

  const addToHistory = useCallback(
    (command: string) => {
      if (command !== commandHistory[commandHistory.length - 1]) {
        const updatedHistory = [
          ...commandHistory.slice(-1 * HISTORY_SIZE + 1),
          command,
        ]
        setCommandHistory(updatedHistory)
      }
      setHistoryIndex(-1)
    },
    [commandHistory]
  )

  const clearInput = useCallback(() => {
    setInput("")
    setMatchingCommands(commands.map((cmd) => cmd.name))
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "Tab":
          event.preventDefault()
          handleTabPress()
          break
        case "ArrowUp":
          event.preventDefault()
          handleArrowUpPress()
          break
        case "ArrowDown":
          event.preventDefault()
          handleArrowDownPress()
          break
        default:
          break
      }
    },
    [handleTabPress, handleArrowUpPress, handleArrowDownPress]
  )

  return {
    input,
    handleInputChange,
    clearInput,
    handleKeyDown,
    addToHistory,
  }
}

export default useTerminalInput
