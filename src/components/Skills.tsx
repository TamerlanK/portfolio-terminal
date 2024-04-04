import {
  html5,
  css3,
  javascript,
  typescript,
  react,
  next,
  redux,
  tailwindcss,
  sass,
  webpack,
  git,
  markdown,
  python,
  jquery,
  jwt,
  mongodb,
  mysql,
} from "../images/skills"

const Skills = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      <div>
        <img src={html5} alt="HTML5" />
      </div>
      <div>
        <img src={css3} alt="CSS3" />
      </div>
      <div>
        <img src={javascript} alt="JavaScript" />
      </div>
      <div>
        <img src={typescript} alt="TypeScript" />
      </div>
      <div>
        <img src={react} alt="React" />
      </div>
      <div>
        <img src={next} alt="Next.js" />
      </div>
      <div>
        <img src={redux} alt="Redux" />
      </div>
      <div>
        <img src={tailwindcss} alt="Tailwind CSS" />
      </div>
      <div>
        <img src={sass} alt="SASS" />
      </div>
      <div>
        <img src={webpack} alt="Webpack" />
      </div>
      <div>
        <img src={git} alt="Git" />
      </div>
      <div>
        <img src={markdown} alt="Markdown" />
      </div>
      <div>
        <img src={python} alt="Python" />
      </div>
      <div>
        <img src={jquery} alt="jQuery" />
      </div>
      <div>
        <img src={jwt} alt="JWT" />
      </div>
      <div>
        <img src={mongodb} alt="MongoDB" />
      </div>
      <div>
        <img src={mysql} alt="MySQL" />
      </div>
    </div>
  )
}

export default Skills
