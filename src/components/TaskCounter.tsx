interface TaskCounterProps {
    label: string
    count: number
    total?: number
  }
  
  export function TaskCounter({ label, count, total }: TaskCounterProps) {
    const labelColor = label === "Concluídas" ? "text-[#8284FA]" : "text-blue-400"

    return (
      <div className="flex items-center gap-2">
        <span className={`text-sm font-bold ${labelColor}`}>{label}</span>
        <span className="rounded-full  px-2 py-0.5 text-xs font-bold text-zinc-500">
          {total ? `${count} de ${total}` : count}
        </span>
      </div>
    )
  }
  
  