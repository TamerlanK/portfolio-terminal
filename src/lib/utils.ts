import { commands } from "./commands"
import levenshtein from "fast-levenshtein"

const THRESHOLD_DISTANCE = 4

export const getClosestSuggestion = (command: string): string | null => {
  let closestSuggestion: string | null = null
  let minDistance = Infinity

  const filteredCommands = commands.filter(
    (cmd) =>
      Math.abs(cmd.name.length - command.length) <= THRESHOLD_DISTANCE ||
      cmd.name.toLowerCase().includes(command.toLowerCase())
  )

  filteredCommands.forEach((cmd) => {
    const distance = levenshtein.get(
      command.toLowerCase(),
      cmd.name.toLowerCase()
    )
    if (distance <= THRESHOLD_DISTANCE) {
      if (
        !closestSuggestion ||
        distance < minDistance ||
        cmd.name.length === command.length
      ) {
        closestSuggestion = cmd.name
        minDistance = distance
      }
    }
  })

  return closestSuggestion
}
