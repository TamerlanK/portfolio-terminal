import { useState } from "react"
import { Contact, Help, Projects, Resume, Skills, Welcome } from "../components"
import { COMMANDS, commands } from "../lib/commands"
import { getClosestSuggestion, parseFlags } from "../lib/utils"
import { GITHUB_URL } from "../lib/constants"

const MAX_OUTPUT_LENGTH = 20
const INITIAL_OUTPUT = [<Welcome />, <Help />].slice(1, 2)

const useCommandExecution = () => {
  const [output, setOutput] = useState<JSX.Element[]>(INITIAL_OUTPUT)
  console.log(output.length)

  const handleCommand = (command: string) => {
    const { baseCommand, flags } = parseFlags(command)
    const exactMatch = commands.find((cmd) => cmd.name === baseCommand)

    let newOutput: JSX.Element[] = []

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
          setOutput([])
          return
        case COMMANDS.HELP:
          newOutput.push(<Help key={output.length + 1} />)
          break
        case COMMANDS.RESUME:
          newOutput.push(<Resume key={output.length + 1} flags={flags} />)
          break
        case COMMANDS.GITHUB:
          window.open(GITHUB_URL, "_blank")
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

    const commandOutput = (
      <div key={output.length}>
        🔐<span className="font-bold">@tk:~</span>$ {command}
        {newOutput}
      </div>
    )

    setOutput([
      ...output.slice(Math.max(0, output.length - MAX_OUTPUT_LENGTH + 1)),
      commandOutput,
    ])
  }

  return { output, handleCommand }
}

export default useCommandExecution
