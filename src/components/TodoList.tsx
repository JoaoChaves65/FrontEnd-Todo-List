import { useState } from "react";
import { Puzzle } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { TaskItem } from "./TaskItem";
import { TaskCounter } from "./TaskCounter";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { useTodo } from "../contexts/todoContext";

export default function TodoList() {
  const { tasks, addTask } = useTodo();
  const [newTask, setNewTask] = useState("");

  const completedTasks = tasks.filter((task) => task.completed).length;

  function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask("");
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl">
        <header className="flex items-center justify-center gap-2 py-8">
          <Puzzle className="h-8 w-8 text-purple-500" />
          <h1 className="text-3xl font-bold text-foreground">To-do list</h1>
        </header>

        <form onSubmit={handleCreateTask} className="flex gap-2 mb-8">
          <Input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 bg-input border-input text-foreground placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
          >
            Criar
          </Button>
        </form>

        <div className="flex justify-between mb-6">
          <TaskCounter label="Tarefas criadas" count={tasks.length} />
          <TaskCounter
            label="Concluídas"
            count={completedTasks}
            total={tasks.length}
          />
        </div>

        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
