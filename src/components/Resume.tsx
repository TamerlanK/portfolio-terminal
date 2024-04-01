import { useEffect } from "react"
import { downloadResume } from "../lib/utils"
import { RESUME_URL } from "../lib/constants"

type Props = {
  flags: string
}

const Resume = ({ flags }: Props) => {
  const handleResumeCommand = (flags: string) => {
    if (flags?.includes("-d")) {
      downloadResume()
    } else {
      window.open(`/${RESUME_URL}`, "_blank")
    }
  }

  useEffect(() => {
    handleResumeCommand(flags)
  }, [flags])

  return <></>
}

export default Resume
