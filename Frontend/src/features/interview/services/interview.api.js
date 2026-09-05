import axios from "axios"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/interview`,
  withCredentials: true,
})

export async function generateInterviewReport({ resume, jobDescription, selfDescription }) {
  const formData = new FormData()
  formData.append("resume", resume)
  formData.append("jobDescription", jobDescription)
  formData.append("selfDescription", selfDescription)

  const response = await api.post("/", formData)
  return response.data
}