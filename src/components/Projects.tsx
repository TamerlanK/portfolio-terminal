import React, { useState, useEffect } from "react"

import { Repo, getOwnRepos } from "../api/getOwnRepos"

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([])

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await getOwnRepos()
        setRepos(response)
      } catch (error) {
        console.error("Error fetching repositories:", error)
      }
    }
    fetchRepos()
  }, [])

  if (!repos) return null

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">My Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className="my-2">
            <a
              href={repo.html_url}
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Projects
