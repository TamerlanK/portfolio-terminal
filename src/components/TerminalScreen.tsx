import React, { useEffect, useRef } from "react"

interface TerminalScreenProps {
  output: JSX.Element[]
}

const TerminalScreen: React.FC<TerminalScreenProps> = ({ output }) => {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const terminal = terminalRef.current
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  }, [output])

  return (
    <div ref={terminalRef} className="flex-1 overflow-y-auto | scrollbar mt-2">
      {output.map((element, index) => (
        <div key={index} className="mb-1">
          {element}
        </div>
      ))}
    </div>
  )
}

export default TerminalScreen
