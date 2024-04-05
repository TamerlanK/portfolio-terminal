import React, { useEffect, useRef } from "react"

interface TerminalScreenProps {
  output: JSX.Element[]
}

const TerminalScreen: React.FC<TerminalScreenProps> = ({ output }) => {
  const outputEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({
        behavior: "smooth",
      })
    }
  })

  //!TODO: Scroll to bottom when new command executes, fix scroll bug when "projects" gets executed

  return (
    <div className="flex-1 overflow-y-auto mt-2 | scrollbar">
      {output.map((element, index) => (
        <div key={index} className="mb-1">
          {element}
        </div>
      ))}
      <div ref={outputEndRef} />
    </div>
  )
}

export default TerminalScreen
