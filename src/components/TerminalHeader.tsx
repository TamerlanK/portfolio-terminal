import { MdMinimize, MdOutlineSquare, MdClose } from "react-icons/md"

const TerminalHeader = () => {
  return (
    <header className="bg-black text-neutral-700 font-mono text-center py-2 px-4 rounded-tl-md rounded-tr-md">
      <div className="w-full flex justify-center items-center relative">
        <p className="">portfolio@tamerlan:~</p>
        <div className="flex absolute right-0 inset-y-0 gap-x-2 items-center">
          <div className="grid place-content-center p-1">
            <MdMinimize />
          </div>
          <div className="grid place-content-center p-1">
            <MdOutlineSquare className="mt-0.5" />
          </div>
          <div className="grid place-content-center p-1 rounded-full bg-red-600">
            <MdClose className="text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default TerminalHeader
