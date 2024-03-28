export const COMMANDS = {
  CONTACT: "contact",
  SKILLS: "skills",
  PROJECTS: "projects",
  CLEAR: "clear",
  HELP: "help",
  RESUME: "resume",
} as const

export type Option = {
  option: string
  description: string
}

export type CommandType = {
  name: (typeof COMMANDS)[keyof typeof COMMANDS]
  description: string
  options?: Option[]
}

export const commands: CommandType[] = [
  { name: COMMANDS.CONTACT, description: "Display contact details" },
  { name: COMMANDS.SKILLS, description: "Display skills" },
  { name: COMMANDS.PROJECTS, description: "Display projects" },
  { name: COMMANDS.CLEAR, description: "Clear the terminal" },
  { name: COMMANDS.HELP, description: "Display available commands" },
  {
    name: COMMANDS.RESUME,
    description: "Open resume",
    options: [
      {
        option: "-d",
        description: "Download Resume",
      },
    ],
  },
]
