import { cn } from "@/lib/utils"
import { cities, titleCounts } from "../data/data"

const CityAndTitles = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 pt-16">
        <div className="lg:col-span-5">
          <div className="flex items-baseline gap-3 mb-1.5">
            <span className="font-mono text-label text-accent">01</span>
            <h2 className="m-0 text-section">Where the roles are</h2>
          </div>
          <p className="font-serif text-base leading-[1.55] text-muted-body mb-7 max-w-[40ch]">
            Here is the list of engineering roles by city.
          </p>
          <div className="flex flex-col">
            <hr className="u-hair" />
            {cities.map((city) => (
              <div key={city.name}>
                <div className="flex items-center gap-4 py-3.75">
                  <div className="w-17 text-body-sm font-medium">{city.name}</div>
                  <div className="grow h-2.5 bg-border-subtle">
                    <div
                      className={city.accent ? "h-2.5 bg-accent" : "h-2.5 bg-foreground"}
                      style={{ width: `${city.pct}%` }}
                    />
                  </div>
                  <div className="w-14 text-right font-mono text-meta tabular-nums">
                    {city.count}
                  </div>
                </div>
                <hr className="u-hair" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="flex items-baseline gap-3 mb-1.5">
            <span className="font-mono text-label text-accent">02</span>
            <h2 className="m-0 text-section">What they are actually called</h2>
          </div>
          <p className="font-serif text-base leading-[1.55] text-muted-body mb-7 max-w-[46ch]">
            LinkedIn standardises every title, here's a glimpse of the most common ones.
          </p>
          <div className="flex flex-col">
            <hr className="u-hair" />
            {titleCounts.map((row) => (
              <div key={row.rank}>
                <div
                  className={cn(
                    "u-row flex items-baseline gap-4 px-1 py-2.75",
                    row.active && "bg-accent-tint"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-label w-5.5 shrink-0",
                      row.active ? "text-accent" : "text-faint"
                    )}
                  >
                    {row.rank}
                  </span>
                  <span
                    className={cn("grow text-base", row.active && "text-accent font-medium")}
                  >
                    {row.title}
                  </span>
                  <span
                    className={cn("font-mono text-meta tabular-nums", row.active && "text-accent")}
                  >
                    {row.count}
                  </span>
                </div>
                <hr className="u-hair" />
              </div>
            ))}
            <div className="pt-3 px-1">
              <a
                href="#"
                className="u-lnk font-mono text-label tracking-[0.1em] uppercase text-accent border-accent"
              >
                See all 66 standardised titles →
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CityAndTitles;