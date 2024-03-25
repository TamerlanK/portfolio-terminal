import { useState } from "react";
import { commands } from "../lib/commands";

const useTerminalInput = () => {
  const [input, setInput] = useState<string>("");
  const [matchingCommands, setMatchingCommands] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setInput(value);

    // Filter commands based on the input
    const filteredCommands = commands.map((cmd) => cmd.name).filter((cmd) => cmd.startsWith(value.trim()));

    // Update matching commands based on the current input
    setMatchingCommands(filteredCommands);
  };

  const handleTabPress = () => {
    if (matchingCommands.length > 0) {
      const nextIndex = matchingCommands.findIndex(cmd => cmd === input.trim()) + 1;
      const nextCommand = matchingCommands[nextIndex % matchingCommands.length];
      setInput(nextCommand);
    }
  };

  // Function to clear the input field
  const clearInput = () => {
    setInput("");
  };

  return { input, matchingCommands, handleInputChange, handleTabPress, clearInput };
};

export default useTerminalInput;
