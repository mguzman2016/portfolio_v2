import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Page shell — owns the max width and the fluid side gutter (see `shell` in index.css). */
export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("shell", className)}>{children}</div>
}
