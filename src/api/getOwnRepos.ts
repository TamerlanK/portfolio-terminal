import axios, { AxiosResponse } from "axios"

export type Repo = {
  id: number
  html_url: string
  name: string
}

let cachedRepos: Repo[] | null = null
let lastFetched: number | null = null

const axiosInstance = axios.create()
const REPOS_URL = "https://api.github.com/users/TamerlanK/repos"

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.url?.includes(REPOS_URL)) {
      cachedRepos = response.data as Repo[]
      lastFetched = Date.now()
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const getOwnRepos = async (): Promise<Repo[]> => {
  if (cachedRepos && lastFetched && Date.now() - lastFetched < 1000 * 60 * 15) {
    return cachedRepos
  }

  const response: AxiosResponse<Repo[]> = await axiosInstance.get(
    "https://api.github.com/users/TamerlanK/repos"
  )
  return response.data
}
