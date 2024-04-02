import React, { useRef } from "react"

interface TerminalInputFieldProps {
  input: string
  handleInputChange: (value: string) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  placeholderText: string
}

const TerminalInputField: React.FC<TerminalInputFieldProps> = ({
  input,
  handleInputChange,
  handleKeyDown,
  handleSubmit,
  placeholderText,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex">
      <span className="text-green-400 font-bold">🔐@tk:~$</span>
      <input
        type="text"
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholderText}
        className="bg-transparent text-green-400 outline-none border-none flex-1 ml-2 placeholder:italic max-sm:placeholder:text-transparent"
        autoFocus
      />
    </form>
  )
}

export default TerminalInputField
