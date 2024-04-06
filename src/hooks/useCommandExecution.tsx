import { useState } from "react"
import { Contact, Help, Projects, Resume, Skills, Welcome } from "../components"
import { COMMANDS } from "../lib/commands"
import { getClosestSuggestion, openGithub, parseFlags } from "../lib/utils"

const MAX_OUTPUT_LENGTH = 20

const useCommandExecution = () => {
  const INITIAL_OUTPUT = [<Welcome />, <Help />]
  const [output, setOutput] = useState<JSX.Element[]>(INITIAL_OUTPUT)

  const handleCommand = (command: string) => {
    const { baseCommand, flags } = parseFlags(command)
    const matchedCommand = findMatchingCommand(baseCommand)

    if (matchedCommand) {
      executeMatchedCommand(matchedCommand, flags)
    } else {
      handleUnrecognizedCommand(command, baseCommand)
    }
  }

  const findMatchingCommand = (baseCommand: string) => {
    return Object.values(COMMANDS).find((cmd) => cmd === baseCommand)
  }

  const executeMatchedCommand = (command: string, flags: string[]) => {
    let newOutput: JSX.Element[] = []

    switch (command) {
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
        openGithub()
        break
      default:
        break
    }

    appendToOutput(command, newOutput)
  }

  const handleUnrecognizedCommand = (command: string, baseCommand: string) => {
    const closestSuggestion = getClosestSuggestion(baseCommand)
    const errorMessage = closestSuggestion
      ? `Command "${command}" not recognized. Did you mean ${closestSuggestion}?`
      : `Command "${command}" not recognized.`
    appendToOutput(command, [
      <div key={output.length + 1} className="text-red-600">
        {errorMessage}
      </div>,
    ])
  }

  const appendToOutput = (command: string, newOutput: JSX.Element[]) => {
    const commandOutput = (
      <div key={output.length}>
        🔐<span className="font-bold">@tk:~</span>$ {command}
        {newOutput}
      </div>
    )

    setOutput((prevOutput) => [
      ...prevOutput.slice(
        Math.max(0, prevOutput.length - MAX_OUTPUT_LENGTH + 1)
      ),
      commandOutput,
    ])
  }

  return { output, handleCommand }
}

export default useCommandExecution
