interface TaskCounterProps {
    label: string
    count: number
    total?: number
  }
  
  export function TaskCounter({ label, count, total }: TaskCounterProps) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-blue-500">{label}</span>
        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-bold text-zinc-200">
          {total ? `${count} de ${total}` : count}
        </span>
      </div>
    )
  }
  
  