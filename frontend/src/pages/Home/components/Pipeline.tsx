
import { cn } from "@/lib/utils"
import { pipelineStages } from "../data/data"

const Pipeline = () => {
  return (
    <div className="mt-section">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-mono text-label text-accent">05</span>
          <h2 className="m-0 text-section">How it is built</h2>
        </div>
        <p className="font-serif text-body-lg text-muted-body mb-8 max-w-[62ch]">
          Data is ingested once a day from LinkedIn. Data is then processed in
          four layers, ten models, one DuckDB file that lives in S3 between runs. Click any model
          to read its SQL on GitHub.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pipelineStages.map((stage) => (
            <div
              key={stage.step}
              className={cn(
                "pt-4 border-t-[3px]",
                stage.accent ? "border-accent" : "border-foreground"
              )}
            >
              <div
                className={cn(
                  "font-mono text-micro tracking-caps uppercase mb-4",
                  stage.accent ? "text-accent" : "text-muted"
                )}
              >
                {stage.step}
              </div>
              <div className="flex flex-col gap-2">
                {stage.models.map((model) => (
                  <div
                    key={model}
                    className={cn(
                      "border px-3.5 py-3 font-mono text-xs break-words",
                      stage.accent ? "border-accent text-accent" : "border-border"
                    )}
                  >
                    {model}
                  </div>
                ))}
              </div>
              <div className="font-serif text-sm text-muted mt-3.5 leading-[1.5]">{stage.note}</div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Pipeline;