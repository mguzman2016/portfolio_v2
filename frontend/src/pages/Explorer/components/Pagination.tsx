import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

function pageHref(page: number) {
  return page <= 1 ? "/explorer" : `/explorer?page=${page}`
}

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-1.5 pt-5 font-mono text-label">
      <Link
        to={pageHref(currentPage - 1)}
        className={cn(
          "border border-foreground px-3.5 py-2.5 uppercase tracking-button",
          currentPage === 1 && "pointer-events-none opacity-30"
        )}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : undefined}
      >
        Prev
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          to={pageHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "w-9 h-9 flex items-center justify-center border",
            page === currentPage
              ? "border-foreground bg-foreground text-background"
              : "border-border"
          )}
        >
          {page}
        </Link>
      ))}

      <Link
        to={pageHref(currentPage + 1)}
        className={cn(
          "border border-foreground px-3.5 py-2.5 uppercase tracking-button",
          currentPage === totalPages && "pointer-events-none opacity-30"
        )}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : undefined}
      >
        Next
      </Link>
    </div>
  )
}
