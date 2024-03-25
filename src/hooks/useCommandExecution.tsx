import { useState } from "react"
import { Contact, Help, Projects, Skills } from "../components"
import { COMMANDS, CommandType } from "../lib/commands"

const useCommandExecution = () => {
  const [output, setOutput] = useState<JSX.Element[]>([<Help />])

  const handleCommand = (command: CommandType["name"] | string) => {
    let newOutput: JSX.Element[] = [...output]

    newOutput.push(
      <div key={output.length}>
        🔐<span className="font-bold">@tk:~</span>$ {command}
      </div>
    )

    switch (command.toLowerCase()) {
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
        newOutput.push(
          <div key={output.length + 1} className="text-red-600">
            Command "{command}" not recognized
          </div>
        )
        break
    }

    setOutput(newOutput)
  }

  return { output, handleCommand }
}

export default useCommandExecution
