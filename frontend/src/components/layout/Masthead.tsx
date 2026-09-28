import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

type Page = "index" | "explorer" | "cv"

const navItems: { label: string; shortLabel?: string; page: Page; to: string }[] = [
  { label: "Index", page: "index", to: "/" },
  { label: "Explorer", page: "explorer", to: "/explorer" },
  { label: "Curriculum Vitae", shortLabel: "CV", page: "cv", to: "/cv" },
]

export function Masthead({ active }: { active: Page }) {
  return (
    <>
      <div className="flex flex-col gap-4 pt-7 pb-5 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
          <div className="text-body-sm font-semibold tracking-label uppercase">Miguel Guzmán</div>
          <div className="font-mono text-label text-muted tracking-meta">Data Engineer · Zürich</div>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2.5 text-meta tracking-[0.03em] lg:gap-x-7">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.to}
              className={cn("u-lnk", item.page === active && "border-accent text-accent")}
            >
              {item.shortLabel ? (
                <>
                  <span className="sm:hidden">{item.shortLabel}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </>
              ) : (
                item.label
              )}
            </Link>
          ))}
          <span className="hidden text-faint cursor-default select-none lg:inline">Companies</span>
          <span className="hidden text-faint cursor-default select-none lg:inline">Pipeline</span>
          <ThemeToggle />
        </div>
      </div>
      <hr className="u-rule" />
    </>
  )
}
