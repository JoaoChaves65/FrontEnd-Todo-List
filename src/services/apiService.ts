import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/tasks", // URL do backend
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getTasks = async () => {
  const response = await api.get('/')
  return Array.isArray(response.data) ? response.data : response.data.tasks || []
}


export const addTask = async (text: string) => {
  const response = await api.post('/', { text, completed: false })
  return response.data
}

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/${id}`)
  return response.data
}

export const toggleTask = async (id: string, completed: boolean) => {
  const response = await api.patch(`/${id}`, { completed })
  return response.data
}

export const editTask = async (id: string, text: string) => {
  const response = await api.patch(`/${id}`, { text })
  return response.data
}
