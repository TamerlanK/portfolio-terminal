import { useState } from "react"
import { Contact, Help, Projects, Resume, Skills, Welcome } from "../components"
import { COMMANDS, commands } from "../lib/commands"
import { getClosestSuggestion, parseFlags } from "../lib/utils"

const INITIAL_OUTPUT = [<Welcome />, <Help />]

const useCommandExecution = () => {
  const [output, setOutput] = useState<JSX.Element[]>(INITIAL_OUTPUT)

  const handleCommand = (command: string) => {
    let newOutput: JSX.Element[] = [
      ...output,
      <div key={output.length}>
        🔐<span className="font-bold">@tk:~</span>$ {command}
      </div>,
    ]

    const { baseCommand, flags } = parseFlags(command)

    const exactMatch = commands.find((cmd) => cmd.name === baseCommand)

    if (exactMatch?.name) {
      switch (exactMatch.name) {
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
          newOutput.push(<Resume key={output.length + 1} flags={flags} />)
          break
        default:
          break
      }
    } else {
      const closestSuggestion = getClosestSuggestion(baseCommand)
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
