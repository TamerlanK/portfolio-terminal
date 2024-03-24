import { commands } from "../lib/commands"

const Help = () => {
  return (
    <div>
      <h3 className="font-bold">Available commands:</h3>
      <div className="grid grid-cols-2 gap-2">
        {commands.map((cmd, index) => (
          <div key={index}>
            <span className="font-bold">{cmd.name}</span>: {cmd.description}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Help
