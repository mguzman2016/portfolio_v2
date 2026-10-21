import { cn } from "@/lib/utils"

const cityChips = [
  { name: "Zürich", count: 88, active: true },
  { name: "Geneva", count: 37 },
  { name: "Basel", count: 31 },
  { name: "Bern", count: 20 },
]

const levelChips = [
  { name: "Entry" },
  { name: "Associate" },
  { name: "Mid-Senior", active: true },
  { name: "Director" },
]

export default function Explorer() {
    return (
        <div className="border-t-[3px] border-foreground border-b border-border py-5 pb-5.5">
        <div className="flex items-center gap-3 border border-foreground px-4 py-3.5 bg-card">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-muted shrink-0"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4.2-4.2" />
          </svg>
          <span className="text-body-sm text-faint truncate">
            Search titles, companies, descriptions…
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="label-micro text-muted">City</span>
            <div className="flex flex-wrap gap-1.5">
              {cityChips.map((chip) => (
                <span
                  key={chip.name}
                  className={cn(
                    "border px-3 py-1.5 text-meta",
                    chip.active
                      ? "border-accent bg-accent text-background"
                      : "border-border"
                  )}
                >
                  {chip.name}{" "}
                  <span
                    className={cn("font-mono text-label", chip.active ? "opacity-80" : "text-faint")}
                  >
                    {chip.count}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="label-micro text-muted">Level</span>
            <div className="flex flex-wrap gap-1.5">
              {levelChips.map((chip) => (
                <span
                  key={chip.name}
                  className={cn(
                    "px-3 py-1.5 text-meta border",
                    chip.active ? "border-foreground" : "border-border"
                  )}
                >
                  {chip.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="label-micro text-muted">Pay published</span>
            <span className="inline-flex items-center w-10.5 h-5.5 border border-border bg-border-subtle p-0.5">
              <span className="w-4.5 h-4.5 bg-background border border-border" />
            </span>
          </div>
        </div>
      </div>
    );
}