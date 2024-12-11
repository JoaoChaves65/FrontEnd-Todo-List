import TodoList from "./components/TodoList"
import { TodoProvider } from "./contexts/todoContext"
import { Toaster } from "react-hot-toast"
import { ThemeToggle } from "./components/ThemeToggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TodoProvider>
        {/* Cabeçalho apenas com o botão de alternância */}
        <header className="flex justify-end p-4 bg-card text-card-foreground">
          <ThemeToggle />
        </header>

        {/* Lista de Tarefas */}
        <main className="p-4">
          <TodoList />
        </main>
      </TodoProvider>

      {/* Notificações */}
      <Toaster position="top-center" />
    </div>
  )
}
