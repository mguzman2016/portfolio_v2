import { Link } from "react-router-dom"
import { Masthead } from "@/components/layout/Masthead"
import { Footer } from "@/components/layout/Footer"
import { Page } from "@/components/layout/Page"
import { cn } from "@/lib/utils"
import { titleCounts, cities, movers, pipelineStages } from "./data/data"
import Hero from "./components/Hero/Hero"
import NumbersBand from "./components/NumbersBand"

export default function Home() {
  return (
    <Page>
      <Masthead active="index" />

      {/* HERO */}
      <Hero />

      {/* NUMBERS BAND */}
      <NumbersBand />

      {/* CITY SPLIT + TITLES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 pt-16">
        <div className="lg:col-span-5">
          <div className="flex items-baseline gap-3 mb-1.5">
            <span className="font-mono text-label text-accent">01</span>
            <h2 className="m-0 text-section">Where the roles are</h2>
          </div>
          <p className="font-serif text-base leading-[1.55] text-muted-body mb-7 max-w-[40ch]">
            Zürich carries half the market on its own. Bern, the federal capital, posts fewer
            engineering roles than Basel.
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
            LinkedIn standardises every title. Under the noise of "Principal Software Engineer —
            Search Scaling", the market is buying twelve things.
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

      {/* SALARY ESSAY */}
      <div className="mt-section border-t-[3px] border-foreground border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 pt-12 pb-14">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-mono text-label text-accent">03</span>
              <h2 className="m-0 text-section">The salary column is mostly empty</h2>
            </div>
            <p className="font-serif text-lg leading-[1.55] text-muted-strong max-w-[42ch]">
              Nineteen of a hundred and seventy-six postings publish a number. That is not a bug
              in the pipeline — it is the finding. Any Swiss salary chart built on scraped
              listings is describing a tenth of the market and calling it the whole.
            </p>
            <p className="font-serif text-lg leading-[1.55] text-muted-strong max-w-[42ch] mt-5">
              So the site shows the nineteen, labelled as nineteen.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex gap-[3px] h-8.5 mb-2.5">
              <div className="bg-accent" style={{ width: "10.8%" }} />
              <div className="grow bg-border-subtle" />
            </div>
            <div className="flex justify-between font-mono text-label tracking-meta text-muted mb-10">
              <span className="text-accent">19 WITH PAY</span>
              <span>157 WITHOUT</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-border">
              <div className="py-6 border-b border-border sm:pr-6 sm:border-b-0 sm:border-r">
                <div className="label-caps text-muted">Hourly · 17 postings</div>
                <div className="text-stat-sm mt-3.5 tabular-nums">30 – 80</div>
                <div className="font-serif text-body-sm text-muted-body mt-2">
                  median band, USD/hr · range 15 – 130
                </div>
              </div>
              <div className="py-6 sm:pl-6">
                <div className="label-caps text-muted">Yearly · 2 postings</div>
                <div className="text-stat-sm mt-3.5 tabular-nums">110k – 185k</div>
                <div className="font-serif text-body-sm text-muted-body mt-2">
                  two data points. Shown, not averaged.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPANY MOVERS */}
      {/* Secondary columns drop out as the viewport narrows; company and Δ always survive. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 pt-section">
        <div className="lg:col-span-3">
          <div className="flex items-baseline gap-3 mb-3.5">
            <span className="font-mono text-label text-accent">04</span>
            <h2 className="m-0 text-section">Companies, moving</h2>
          </div>
          <p className="font-serif text-base leading-[1.55] text-muted-body">
            Every run snapshots headcount and follower count. Thirteen companies have been caught
            twice or more, so this table grows with the pipeline rather than with the page.
          </p>
          <div className="font-mono text-label text-muted mt-5.5 border-t border-border pt-3 leading-[1.7]">
            SOURCE
            <br />
            fct_company_snapshots
            <br />
            24 MAY → 07 JUN 2026
          </div>
        </div>
        <div className="lg:col-span-9">
          <div className="flex gap-4 px-1 pb-2.5 label-micro text-muted">
            <span className="grow">Company</span>
            <span className="hidden lg:block w-[11.875rem]">Industry</span>
            <span className="hidden sm:block w-24 text-right">Headcount</span>
            <span className="hidden md:block w-27.5 text-right">Followers</span>
            <span className="w-26 text-right">Δ 14 days</span>
          </div>
          <hr className="u-rule" />
          {movers.map((company, i) => (
            <div key={company.name}>
              <div className="u-row flex items-baseline gap-4 px-1 py-3.25">
                <span className="grow min-w-0 text-base">{company.name}</span>
                <span className="hidden lg:block w-[11.875rem] text-meta text-muted">
                  {company.industry}
                </span>
                <span className="hidden sm:block w-24 text-right font-mono text-meta tabular-nums">
                  {company.headcount}
                </span>
                <span className="hidden md:block w-27.5 text-right font-mono text-meta tabular-nums">
                  {company.followers}
                </span>
                <span className="w-26 text-right font-mono text-meta tabular-nums text-accent">
                  {company.delta}
                </span>
              </div>
              <hr className={i === movers.length - 1 ? "u-rule" : "u-hair"} />
            </div>
          ))}
        </div>
      </div>

      {/* PIPELINE / LINEAGE */}
      <div className="mt-section">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-mono text-label text-accent">05</span>
          <h2 className="m-0 text-section">How it is built</h2>
        </div>
        <p className="font-serif text-body-lg text-muted-body mb-8 max-w-[62ch]">
          Four layers, ten models, one DuckDB file that lives in S3 between runs. Click any model
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

      {/* CV CTA */}
      <div className="mt-section border-t-[3px] border-foreground pt-11">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-8 items-end">
          <div className="lg:col-span-7">
            <h2 className="m-0 text-display-xs max-w-[17ch]">
              If you got this far, you probably want the CV.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-3">
            <Link
              to="/cv"
              className="flex items-center justify-between gap-4 bg-foreground text-background px-5.5 py-4.5 font-mono text-xs tracking-button uppercase"
            >
              <span>Read the CV</span>
              <span>→</span>
            </Link>
            <a
              href="#"
              className="flex items-center justify-between gap-4 border border-foreground px-5.5 py-4.5 font-mono text-xs tracking-button uppercase"
            >
              <span>Download PDF</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </Page>
  )
}
