import React, { useState, useRef, useEffect } from "react"
import Contact from "./Contact"
import Projects from "./Projects"
import Skills from "./Skills"
import { COMMANDS, commands } from "../lib/commands"
import { CommandType } from "../lib/commands"
import Help from "./Help"

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<JSX.Element[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCommand(input.trim())
    setInput("")
  }

  const handleCommand = (command: CommandType["name"] | string) => {
    let newOutput = [...output]

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

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    handleCommand(COMMANDS.HELP)
  }, [])

  const placeholderText = commands.map((cmd) => cmd.name).join(", ")

  return (
    <div className="bg-black/80 backdrop-blur-sm text-green-400 p-4 pt-0 font-mono w-full h-[400px] flex flex-col">
      <div ref={terminalRef} className="flex-1 overflow-y-auto">
        {output.map((element, index) => (
          <div key={index} className="mb-1">
            {element}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-green-400 font-bold">🔐@tk:~$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={placeholderText}
          className="bg-transparent text-green-400 outline-none border-none flex-1 ml-2"
          autoFocus
        />
      </form>
    </div>
  )
}

export default Terminal
