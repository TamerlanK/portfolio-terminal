import { useEffect, useState } from "react";
import { RESUME_URL } from "../lib/constants";
import { downloadResume } from "../lib/utils";

type Props = {
  flags: string[];
};

const Resume = ({ flags }: Props) => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (flags.includes("-d")) {
      downloadResume();
    } else if (flags.length === 0) {
      window.open(`/${RESUME_URL}`, "_blank");
    } else {
      setMessage("Invalid flag");
    }
  }, [flags]);

  return <span className="text-red-600">{message}</span>;
};

export default Resume;
