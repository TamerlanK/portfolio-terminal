import { useState } from "react"
import { Contact, Help, Projects, Skills } from "../components"
import { commands, CommandType, COMMANDS } from "../lib/commands"
import levenshtein from "fast-levenshtein"

const THRESHOLD_DISTANCE = 4

const useCommandExecution = () => {
  const [output, setOutput] = useState<JSX.Element[]>([<Help />])
  const [suggestion, setSuggestion] = useState<string | null>(null)

  const handleCommand = (command: string) => {
    let newOutput: JSX.Element[] = [
      ...output,
      <div key={output.length}>
        🔐<span className="font-bold">@tk:~</span>$ {command}
      </div>,
    ]

    const exactMatch = commands.find(
      (cmd) => cmd.name.toLowerCase() === command.toLowerCase()
    )

    if (exactMatch) {
      switch (exactMatch.name.toLowerCase()) {
        case COMMANDS.CONTACT:
          newOutput.push(<Contact key={output.length + 1} />)
          break
        case COMMANDS.SKILLS:
          newOutput.push(<Skills key={output.length + 1} />)
          break
        case COMMANDS.PROJECTS:
          newOutput.push(<Projects key={output.length + 1} />)
          break
        case COMMANDS.CLEAR:
          newOutput = []
          break
        case COMMANDS.HELP:
          newOutput.push(<Help key={output.length + 1} />)
          break
        default:
          break
      }
    } else {
      const closestSuggestion = getClosestSuggestion(command)
      setSuggestion(closestSuggestion)
      newOutput.push(
        <div key={output.length + 1} className="text-red-600">
          Command "{command}" not recognized.
          {closestSuggestion && `Did you mean ${closestSuggestion}?`}
        </div>
      )
    }

    setOutput(newOutput)
  }

  const getClosestSuggestion = (command: string): string | null => {
    let closestSuggestion: string | null = null
    let minDistance = Infinity

    const filteredCommands = commands.filter(
      (cmd) =>
        Math.abs(cmd.name.length - command.length) <= THRESHOLD_DISTANCE ||
        cmd.name.toLowerCase().includes(command.toLowerCase())
    )

    filteredCommands.forEach((cmd) => {
      const distance = levenshtein.get(
        command.toLowerCase(),
        cmd.name.toLowerCase()
      )
      if (distance <= THRESHOLD_DISTANCE && distance < minDistance) {
        closestSuggestion = cmd.name
        minDistance = distance
      }
    })

    return closestSuggestion
  }

  return { output, suggestion, handleCommand }
}

export default useCommandExecution
