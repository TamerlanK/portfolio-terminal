import { contactDetails } from "../lib/constants"
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai"

const Contact = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold my-1">Contact Details</h3>
      <ul className="space-y-1">
        <li className="flex items-center space-x-2">
          <AiOutlineMail className="inline-block" />
          <span className="font-semibold">email:</span>{" "}
          <a
            href={`mailto:${contactDetails.email}`}
            className="text-white underline"
          >
            {contactDetails.email}
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <AiOutlinePhone className="inline-block" />
          <span className="font-semibold">phone:</span>{" "}
          <a
            href={`tel:${contactDetails.phone}`}
            className="text-white underline"
          >
            {contactDetails.phone}
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <AiOutlineInstagram className="inline-block" />
          <span className="font-semibold">instagram:</span>{" "}
          <a
            href={contactDetails.instagram.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >
            {contactDetails.instagram.username}
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <AiOutlineLinkedin className="inline-block" />
          <span className="font-semibold">linkedin:</span>{" "}
          <a
            href={contactDetails.linkedin.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >
            {contactDetails.linkedin.username}
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Contact
