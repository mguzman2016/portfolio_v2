
import { cn } from "@/lib/utils"
import { headline } from "../data/data"

const NumbersBand = () => {
  return (
    <>
    <hr className="u-rule" />
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {headline.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "py-8 border-border",
              i % 2 === 0 ? "pr-5 sm:pr-8" : "pl-5 sm:pl-8 border-l",
              i < 2 && "border-b lg:border-b-0",
              i === 1 && "lg:pr-8",
              i === 2 && "lg:pl-8 lg:border-l"
            )}
          >
            <div
              className={cn("text-stat tabular-nums", stat.accent && "text-accent")}
            >
              {stat.value}
              {stat.suffix && <span className="text-stat-suffix">{stat.suffix}</span>}
            </div>
            <div className="label-caps text-muted mt-3">{stat.label}</div>
          </div>
        ))}
      </div>
      <hr className="u-rule" />
    </>
  )
}

export default NumbersBand;