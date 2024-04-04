import { commands, CommandType, Flag } from "../lib/commands"

const Help = () => {
  return (
    <div>
      <h3 className="font-bold text-xl mb-2">Available commands</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {commands.map((cmd: CommandType, index: number) => (
          <div key={index}>
            <span className="font-bold">{cmd.name}</span>: {cmd.description}
            {cmd.flags && (
              <ul>
                {cmd.flags.map((flag: Flag, idx: number) => (
                  <li key={idx}>
                    {flag.flag}: {flag.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Help
