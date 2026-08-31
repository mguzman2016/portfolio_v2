import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center gap-1.5 border border-border px-2.5 py-[5px] font-mono text-[11px] tracking-[0.08em] uppercase text-muted hover:border-foreground hover:text-foreground transition-colors"
    >
      {theme === "light" ? <Moon size={12} strokeWidth={1.8} /> : <Sun size={12} strokeWidth={1.8} />}
      <span>{theme === "light" ? "Dark" : "Light"}</span>
    </button>
  )
}
