import { ClipboardList } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
      <ClipboardList className="h-12 w-12 mb-4 text-zinc-600" />
      <p className="font-bold">Você ainda não tem tarefas cadastradas</p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}

