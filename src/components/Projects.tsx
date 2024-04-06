import React, { useState, useEffect } from "react"
import { Repo, getOwnRepos } from "../api/getOwnRepos"

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await getOwnRepos()
        setRepos(response)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching repositories:", error)
        setError("Error fetching repositories. Please try again later.")
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  if (loading) {
    return <div className="container mx-auto">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto text-red-600">{error}</div>
  }

  if (!repos) {
    return <div className="container mx-auto">No repositories found.</div>
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-1">My Repositories</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2">
        {repos.map((repo) => (
          <li key={repo.id} className="my-1">
            <a
              href={repo.html_url}
              className="text-blue-500 hover:underline"
              rel="noopener noreferrer"
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
