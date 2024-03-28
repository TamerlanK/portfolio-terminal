import { useEffect } from "react"

type Props = {
  option: string | undefined
}

const Resume = ({ option }: Props) => {
  const resumeUrl = "TamerlanKengerliCV.pdf"

  const downloadResume = () => {
    const link = document.createElement("a")
    link.href = `/${resumeUrl}`
    link.download = resumeUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleResumeCommand = (option: string | undefined) => {
    if (option === "-d") {
      downloadResume()
    } else {
      window.open(`/${resumeUrl}`, "_blank")
    }
  }

  useEffect(() => {
    handleResumeCommand(option)
  }, [option])

  return <></>
}

export default Resume
