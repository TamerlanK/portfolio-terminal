import { useState } from "react"
import { Contact, Help, Projects, Resume, Skills } from "../components"
import { COMMANDS, commands } from "../lib/commands"
import { getClosestSuggestion } from "../lib/utils"

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

    const [baseCommand, option] = command.split(" ")

    const exactMatch = commands.find((cmd) => cmd.name === baseCommand)

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
        case COMMANDS.RESUME:
          newOutput.push(<Resume key={output.length + 1} option={option} />)
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
          {closestSuggestion && ` Did you mean ${closestSuggestion}?`}
        </div>
      )
    }

    setOutput(newOutput)
  }

  return { output, handleCommand }
}

export default useCommandExecution
