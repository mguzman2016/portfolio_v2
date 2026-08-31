import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

type Page = "index" | "explorer" | "cv"

const navItems: { label: string; page: Page; to: string }[] = [
  { label: "Index", page: "index", to: "/" },
  { label: "Explorer", page: "explorer", to: "/explorer" },
  { label: "Curriculum Vitae", page: "cv", to: "/cv" },
]

export function Masthead({ active }: { active: Page }) {
  return (
    <>
      <div className="flex items-baseline justify-between pt-7 pb-5">
        <div className="flex items-baseline gap-3.5">
          <div className="text-[15px] font-semibold tracking-[0.14em] uppercase">
            Miguel Guzmán
          </div>
          <div className="font-mono text-[11px] text-muted tracking-[0.06em]">
            Data Engineer · Zürich
          </div>
        </div>
        <div className="flex items-baseline gap-7 text-[13px] tracking-[0.03em]">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.to}
              className={cn(
                "u-lnk",
                item.page === active && "!border-accent !text-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
          <span className="text-faint cursor-default select-none">Companies</span>
          <span className="text-faint cursor-default select-none">Pipeline</span>
          <ThemeToggle />
        </div>
      </div>
      <hr className="u-rule" />
    </>
  )
}
