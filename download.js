import fs from "fs"
import axios from "axios"
import { fileURLToPath } from "url"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.join(__dirname, "src", "images", "skills")

const images = [
  "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white",
  "https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white",
  "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
  "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
  "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
  "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white",
  "https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white",
  "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white",
  "https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white",
  "https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black",
  "https://img.shields.io/badge/git-%230769AD.svg?style=for-the-badge&logo=git&logoColor=white&color=orange",
  "https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white",
  "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54",
  "https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white",
  "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens",
  "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white",
  "https://img.shields.io/badge/mysql-%2300000f.svg?style=for-the-badge&logo=mysql&logoColor=white",
]

async function downloadImage(url, filename) {
  const imagePath = path.join(imagesDir, `${filename}.svg`)
  const response = await axios.get(url, { responseType: "stream" })
  const writer = fs.createWriteStream(imagePath)
  response.data.pipe(writer)
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve)
    writer.on("error", reject)
  })
}

async function downloadAllImages(images) {
  for (let i = 0; i < images.length; i++) {
    const filename = images[i].split("/").pop().split("-")[0].toLowerCase()
    try {
      await downloadImage(images[i], filename)
      console.log(`Image ${i + 1} downloaded successfully!`)
    } catch (error) {
      console.error(`Error downloading image ${i + 1}: ${error.message}`)
    }
  }
}

function generateExportStatements() {
  const files = fs.readdirSync(imagesDir)
  const exportStatements = files.map((file) => {
    const name = path.parse(file).name
    return `export { default as ${name} } from './${name}.svg';`
  })
  return exportStatements.join("\n")
}

async function main() {
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  await downloadAllImages(images)

  const indexContent = generateExportStatements()

  fs.writeFileSync(path.join(imagesDir, "index.ts"), indexContent)

  console.log(
    "index.ts file generated successfully with export statements for all SVGs."
  )
}

main().catch((error) => {
  console.error("An error occurred:", error)
})
