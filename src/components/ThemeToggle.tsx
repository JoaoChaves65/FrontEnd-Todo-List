import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Recupera o tema do localStorage ou define "dark" como padrão
    return localStorage.getItem("theme") || "dark"
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme) // Salva no localStoragex'
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Alternar Tema"
    >
      <Sun className={`h-6 w-6 transition-transform ${theme === "dark" ? "rotate-90 scale-0" : "scale-100"}`} />
      <Moon className={`h-6 w-6 transition-transform ${theme === "dark" ? "scale-100" : "-rotate-90 scale-0"}`} />
    </button>
  )
}
