import React, { createContext, useContext, useState, useEffect } from 'react'
import { Task } from '../types/task'
import toast from 'react-hot-toast'
import { getTasks, addTask as addTaskToApi, deleteTask as deleteTaskFromApi, toggleTask as toggleTaskInApi, editTask as editTaskInApi } from '../services/apiService'

interface TodoContextType {
  tasks: Task[]
  addTask: (text: string) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  editTask: (id: string, newText: string) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // Carregar tarefas do backend
    const loadTasks = async () => {
      try {
        const fetchedTasks = await getTasks()
        setTasks(fetchedTasks)
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error)
        toast.error('Erro ao carregar tarefas.')
      }
    }
    loadTasks()
  }, [])

  const addTask = async (text: string) => {
    try {
      const newTask = await addTaskToApi(text)
      setTasks((prev) => [...prev, newTask])
      toast.success('Tarefa adicionada com sucesso!')
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error)
      toast.error('Erro ao adicionar tarefa.')
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskFromApi(id)
      setTasks((prev) => prev.filter((task) => task._id !== id))
      toast.success('Tarefa removida com sucesso!')
    } catch (error) {
      console.error('Erro ao remover tarefa:', error)
      toast.error('Erro ao remover tarefa.')
    }
  }

  const toggleTask = async (id: string) => {
    try {
      const task = tasks.find((task) => task._id === id)
      if (!task) return

      const updatedTask = await toggleTaskInApi(id, !task.completed)
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: updatedTask.completed } : t))
      )
      toast.success(updatedTask.completed ? 'Tarefa concluída!' : 'Tarefa reaberta!')
    } catch (error) {
      console.error('Erro ao alternar tarefa:', error)
      toast.error('Erro ao alternar tarefa.')
    }
  }

  const editTask = async (id: string, newText: string) => {
    console.log(id, newText)
    try {
      const updatedTask = await editTaskInApi(id, newText)
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, text: updatedTask.text } : t))
      )
      toast.success('Tarefa atualizada com sucesso!')
    } catch (error) {
      console.error('Erro ao editar tarefa:', error)
      toast.error('Erro ao editar tarefa.')
    }
  }

  return (
    <TodoContext.Provider value={{ tasks, addTask, deleteTask, toggleTask, editTask }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider')
  }
  return context
}
