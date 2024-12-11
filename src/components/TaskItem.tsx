import { useState } from 'react'
import { Trash2, Edit2, Check, X, Circle } from 'lucide-react'
import { Task } from "../types/task"
import { useTodo } from "../contexts/todoContext"
import { Input } from "../../@/components/ui/input"
import { Button } from "../../@/components/ui/button"
import toast from 'react-hot-toast'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, editTask } = useTodo()
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.text)

  const handleEdit = () => {
    if (editedText.trim() !== '') {
      console.log('Editando tarefa:', { id: task._id, text: editedText }) // Log para depuração
      editTask(task._id, editedText.trim())
      setIsEditing(false)
    } else {
      toast.error('A tarefa não pode estar vazia!')
    }
  }

  const handleCancel = () => {
    setEditedText(task.text)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center gap-3 rounded-lg bg-zinc-800 p-4 mb-3">
      <button onClick={() => toggleTask(task._id)} className="focus:outline-none">
        <Circle className={`h-5 w-5 ${task.completed ? 'fill-current text-[#8284FA]' : 'text-blue-400'}`} />
      </button>
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-1 bg-zinc-700 border-zinc-600 text-zinc-100"
          />
          <Button onClick={handleEdit} size="icon" variant="ghost" className="text-green-500 hover:text-green-400">
            <Check className="h-4 w-4" />
          </Button>
          <Button onClick={handleCancel} size="icon" variant="ghost" className="text-red-500 hover:text-red-400">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <p className={`flex-1 text-sm ${task.completed ? 'line-through text-zinc-400' : 'text-zinc-100'}`}>
            {task.text}
          </p>
          <Button onClick={() => setIsEditing(true)} size="icon" variant="ghost" className="text-zinc-400 hover:text-zinc-300">
            <Edit2 className="h-4 w-4" />
          </Button>
        </>
      )}
      <Button onClick={() => deleteTask(task._id)} size="icon" variant="ghost" className="text-zinc-400 hover:text-red-400">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
