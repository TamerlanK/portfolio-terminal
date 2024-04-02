import { commands } from "./commands"
import levenshtein from "fast-levenshtein"
import { GITHUB_URL, RESUME_URL } from "./constants"

type ParsedCommand = {
  baseCommand: string
  flags: string[]
}

const THRESHOLD_DISTANCE = 3

export const getClosestSuggestion = (command: string): string | null => {
  let closestSuggestion: string | null = null
  let minDistance = Infinity

  commands.forEach((cmd) => {
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

export const openGithub = () => window.open(GITHUB_URL, "_blank")

export const downloadResume = () => {
  if (!RESUME_URL) {
    console.error("Resume URL is not provided")
    return
  }

  const link = document.createElement("a")
  link.href = `/${RESUME_URL}`
  link.download = RESUME_URL
  link.click()
}

export const parseFlags = (command: string): ParsedCommand => {
  const [baseCommand, ...parts] = command.trim().split(/\s+/)
  const flags = parts.filter((part) => part.startsWith("-"))
  return { baseCommand, flags }
}

