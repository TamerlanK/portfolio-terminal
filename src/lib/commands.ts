export const COMMANDS = {
  CONTACT: "contact",
  SKILLS: "skills",
  PROJECTS: "projects",
  CLEAR: "clear",
  HELP: "help",
} as const

export type CommandType = {
  name: (typeof COMMANDS)[keyof typeof COMMANDS]
  description: string
}

export const commands: CommandType[] = [
  { name: COMMANDS.CONTACT, description: "Display contact details" },
  { name: COMMANDS.SKILLS, description: "Display skills" },
  { name: COMMANDS.PROJECTS, description: "Display projects" },
  { name: COMMANDS.CLEAR, description: "Clear the terminal" },
  { name: COMMANDS.HELP, description: "Display available commands" },
]
