import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import Pagination from "./Pagination"
import { listings } from "../data/data"
import { useSearchParams } from "react-router-dom"
const PAGE_SIZE = 5

export default function List(){
    const [searchParams] = useSearchParams()
    const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE))
    const requestedPage = Number(searchParams.get("page")) || 1
    const currentPage = Math.min(Math.max(requestedPage, 1), totalPages)
    const pageListings = listings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
    )
    
    return (
        <div className="min-w-0">
        <div className="flex gap-3.5 px-1 pb-2 label-micro text-muted">
          <span className="grow">Role</span>
          <span className="hidden sm:block w-37.5">Company</span>
          <span className="hidden md:block w-21.5">Type</span>
          <span className="w-17.5 text-right">Seen</span>
        </div>
        <hr className="u-rule" />

        {pageListings.map((job, i) => (
          <div key={job.id}>
            <Link
              to={`/explorer/${job.id}`}
              className={cn(
                "u-row flex items-baseline gap-3.5 py-3.75 pr-3 cursor-pointer",
                job.featured
                  ? "bg-accent-tint border-l-[3px] border-accent pl-1"
                  : "pl-1.75"
              )}
            >
              <span className="grow min-w-0">
                <span className={cn("text-base", job.featured && "font-medium")}>
                  {job.title}
                </span>
                <br />
                <span
                  className={cn("font-mono text-label", job.featured ? "text-accent" : "text-faint")}
                >
                  {job.standardTitle} · {job.level}
                </span>
              </span>
              <span className="hidden sm:block w-37.5 text-sm">{job.company}</span>
              <span className="hidden md:block w-21.5 text-meta text-muted-body">{job.type}</span>
              <span className="w-17.5 text-right font-mono text-xs text-muted">{job.seen}</span>
            </Link>
            <hr className={i === pageListings.length - 1 ? "u-rule" : "u-hair"} />
          </div>
        ))}

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    )
}