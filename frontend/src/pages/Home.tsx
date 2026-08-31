import { Link } from "react-router-dom"
import { Masthead } from "@/components/layout/Masthead"
import { Footer } from "@/components/layout/Footer"

const titleCounts: { rank: string; title: string; count: number; active?: boolean }[] = [
  { rank: "01", title: "Software Engineer", count: 35 },
  { rank: "02", title: "DevOps Engineer", count: 13 },
  { rank: "03", title: "Back End Developer", count: 13 },
  { rank: "04", title: "Artificial Intelligence Engineer", count: 11 },
  { rank: "05", title: "Data Engineer", count: 10, active: true },
  { rank: "06", title: "Machine Learning Engineer", count: 6 },
  { rank: "07", title: "Full Stack Engineer", count: 6 },
  { rank: "08", title: "Senior Software Engineer", count: 5 },
]

const cities: { name: string; count: number; pct: number; accent?: boolean }[] = [
  { name: "Zürich", count: 88, pct: 100, accent: true },
  { name: "Geneva", count: 37, pct: 42 },
  { name: "Basel", count: 31, pct: 35 },
  { name: "Bern", count: 20, pct: 23 },
]

const movers: { name: string; industry: string; headcount: string; followers: string; delta: string }[] = [
  { name: "Crossing Hurdles", industry: "Staffing & Recruiting", headcount: "172", followers: "4,095,658", delta: "+303,491" },
  { name: "Jobgether", industry: "Technology & Internet", headcount: "451", followers: "3,046,156", delta: "+80,084" },
  { name: "Google", industry: "Software Development", headcount: "342,347", followers: "41,731,879", delta: "+39,622" },
  { name: "micro1", industry: "Software Development", headcount: "6,806", followers: "578,512", delta: "+9,927" },
  { name: "Deel", industry: "Human Resources", headcount: "9,627", followers: "777,789", delta: "+8,824" },
  { name: "CERN", industry: "Research Services", headcount: "7,882", followers: "584,758", delta: "+1,540" },
  { name: "Canonical", industry: "Software Development", headcount: "1,994", followers: "758,465", delta: "+4,186" },
]

const pipelineStages = [
  {
    step: "01 · Source",
    accent: false,
    models: ["linkedin_raw.job_postings"],
    note: "JSONL in S3, Hive-partitioned by city / search / date_hour.",
  },
  {
    step: "02 · Staging",
    accent: false,
    models: ["stg_job_postings"],
    note: "Casts types, splits pipe-delimited fields into arrays, lifts partition keys out of the path.",
  },
  {
    step: "03 · Intermediate",
    accent: false,
    models: ["int_job_postings_deduped", "int_companies"],
    note: "One row per job; one row per company per day. Latest run wins.",
  },
  {
    step: "04 · Marts",
    accent: true,
    models: ["fct_job_postings", "fct_company_snapshots", "dim_job · dim_company", "dim_date · dim_job_type"],
    note: "Kimball star. Facts are incremental; dimensions rebuild.",
  },
]

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto px-[72px]">
      <Masthead active="index" />

      {/* HERO */}
      <div className="grid grid-cols-12 gap-6 pt-14 pb-16">
        <div className="col-span-8">
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-7">
            A standing survey of the Swiss engineering market
          </div>
          <h1 className="m-0 text-[76px] leading-[0.94] tracking-[-0.035em] font-semibold max-w-[15ch]">
            Every engineering role posted in four Swiss cities, collected on a schedule.
          </h1>
          <p className="font-serif text-[21px] leading-[1.5] text-muted-strong max-w-[52ch] mt-8">
            I scrape LinkedIn on a cadence, land the raw JSON in S3, and model it into a star
            schema with dbt and DuckDB. What follows is the whole warehouse, opened up — the
            counts, the gaps, and the parts that are still honestly incomplete.
          </p>
        </div>
        <div className="col-span-4 flex flex-col pt-1.5">
          <hr className="u-rule" />
          <div className="flex justify-between py-3.5 font-mono text-xs">
            <span className="text-muted">LAST RUN</span>
            <span>2026-06-07 20:00 UTC</span>
          </div>
          <hr className="u-hair" />
          <div className="flex justify-between py-3.5 font-mono text-xs">
            <span className="text-muted">CADENCE</span>
            <span>EventBridge → ECS Fargate</span>
          </div>
          <hr className="u-hair" />
          <div className="flex justify-between py-3.5 font-mono text-xs">
            <span className="text-muted">DBT TESTS</span>
            <span className="text-accent">22 / 22 passing</span>
          </div>
          <hr className="u-rule" />
          <div className="flex items-center gap-2.5 pt-5.5 font-mono text-[11px] tracking-[0.04em] text-muted-strong flex-wrap">
            <span className="border border-border px-2.5 py-[5px]">LinkedIn</span>
            <span className="text-faint">→</span>
            <span className="border border-border px-2.5 py-[5px]">S3 JSONL</span>
            <span className="text-faint">→</span>
            <span className="border border-border px-2.5 py-[5px]">DuckDB</span>
            <span className="text-faint">→</span>
            <span className="border border-accent text-accent px-2.5 py-[5px]">dbt marts</span>
          </div>
        </div>
      </div>

      {/* NUMBERS BAND */}
      <hr className="u-rule" />
      <div className="grid grid-cols-4">
        <div className="py-[34px] pr-8 border-r border-border">
          <div className="text-[68px] leading-none tracking-[-0.04em] font-medium tabular-nums">176</div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mt-3">Unique postings</div>
        </div>
        <div className="py-[34px] px-8 border-r border-border">
          <div className="text-[68px] leading-none tracking-[-0.04em] font-medium tabular-nums">107</div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mt-3">Companies tracked</div>
        </div>
        <div className="py-[34px] px-8 border-r border-border">
          <div className="text-[68px] leading-none tracking-[-0.04em] font-medium tabular-nums">4</div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mt-3">Cities surveyed</div>
        </div>
        <div className="py-[34px] pl-8">
          <div className="text-[68px] leading-none tracking-[-0.04em] font-medium tabular-nums text-accent">
            10.8<span className="text-[34px]">%</span>
          </div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mt-3">Disclose salary</div>
        </div>
      </div>
      <hr className="u-rule" />

      {/* CITY SPLIT + TITLES */}
      <div className="grid grid-cols-12 gap-6 pt-16">
        <div className="col-span-5">
          <div className="flex items-baseline gap-3 mb-1.5">
            <span className="font-mono text-[11px] text-accent">01</span>
            <h2 className="m-0 text-[30px] tracking-[-0.02em] font-semibold">Where the roles are</h2>
          </div>
          <p className="font-serif text-base leading-[1.55] text-muted-body mb-7 max-w-[40ch]">
            Zürich carries half the market on its own. Bern, the federal capital, posts fewer
            engineering roles than Basel.
          </p>
          <div className="flex flex-col">
            <hr className="u-hair" />
            {cities.map((city) => (
              <div key={city.name}>
                <div className="flex items-center gap-4 py-[15px]">
                  <div className="w-[68px] text-[15px] font-medium">{city.name}</div>
                  <div className="grow h-2.5 bg-border-subtle">
                    <div
                      className={city.accent ? "h-2.5 bg-accent" : "h-2.5 bg-foreground"}
                      style={{ width: `${city.pct}%` }}
                    />
                  </div>
                  <div className="w-[62px] text-right font-mono text-[13px] tabular-nums">{city.count}</div>
                </div>
                <hr className="u-hair" />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-6 col-start-7">
          <div className="flex items-baseline gap-3 mb-1.5">
            <span className="font-mono text-[11px] text-accent">02</span>
            <h2 className="m-0 text-[30px] tracking-[-0.02em] font-semibold">
              What they are actually called
            </h2>
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
                  className={
                    "u-row flex items-baseline gap-4 px-1 py-[11px]" +
                    (row.active ? " bg-accent-tint" : "")
                  }
                >
                  <span
                    className={
                      "font-mono text-[11px] w-[22px] " + (row.active ? "text-accent" : "text-faint")
                    }
                  >
                    {row.rank}
                  </span>
                  <span className={"grow text-base" + (row.active ? " text-accent font-medium" : "")}>
                    {row.title}
                  </span>
                  <span
                    className={
                      "font-mono text-[13px] tabular-nums" + (row.active ? " text-accent" : "")
                    }
                  >
                    {row.count}
                  </span>
                </div>
                <hr className="u-hair" />
              </div>
            ))}
            <div className="pt-3 px-1">
              <a href="#" className="u-lnk font-mono text-[11px] tracking-[0.1em] uppercase text-accent !border-accent">
                See all 66 standardised titles →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SALARY ESSAY */}
      <div className="mt-[88px] border-t-[3px] border-foreground border-b border-border">
        <div className="grid grid-cols-12 gap-6 pt-12 pb-14">
          <div className="col-span-5">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-mono text-[11px] text-accent">03</span>
              <h2 className="m-0 text-[30px] tracking-[-0.02em] font-semibold">
                The salary column is mostly empty
              </h2>
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
          <div className="col-span-6 col-start-7">
            <div className="flex gap-[3px] h-[34px] mb-2.5">
              <div className="bg-accent" style={{ width: "10.8%" }} />
              <div className="grow bg-border-subtle" />
            </div>
            <div className="flex justify-between font-mono text-[11px] tracking-[0.06em] text-muted mb-10">
              <span className="text-accent">19 WITH PAY</span>
              <span>157 WITHOUT</span>
            </div>
            <div className="grid grid-cols-2 border-t border-border">
              <div className="py-6 pr-6 border-r border-border">
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                  Hourly · 17 postings
                </div>
                <div className="text-[40px] tracking-[-0.03em] font-medium mt-3.5 tabular-nums">30 – 80</div>
                <div className="font-serif text-[15px] text-muted-body mt-2">
                  median band, USD/hr · range 15 – 130
                </div>
              </div>
              <div className="py-6 pl-6">
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                  Yearly · 2 postings
                </div>
                <div className="text-[40px] tracking-[-0.03em] font-medium mt-3.5 tabular-nums">
                  110k – 185k
                </div>
                <div className="font-serif text-[15px] text-muted-body mt-2">
                  two data points. Shown, not averaged.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPANY MOVERS */}
      <div className="grid grid-cols-12 gap-6 pt-18">
        <div className="col-span-3">
          <div className="flex items-baseline gap-3 mb-3.5">
            <span className="font-mono text-[11px] text-accent">04</span>
            <h2 className="m-0 text-[30px] tracking-[-0.02em] font-semibold">Companies, moving</h2>
          </div>
          <p className="font-serif text-base leading-[1.55] text-muted-body">
            Every run snapshots headcount and follower count. Thirteen companies have been caught
            twice or more, so this table grows with the pipeline rather than with the page.
          </p>
          <div className="font-mono text-[11px] text-muted mt-5.5 border-t border-border pt-3 leading-[1.7]">
            SOURCE
            <br />
            fct_company_snapshots
            <br />
            24 MAY → 07 JUN 2026
          </div>
        </div>
        <div className="col-span-9">
          <div className="flex gap-4 px-1 pb-2.5 font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            <span className="grow">Company</span>
            <span className="w-[190px]">Industry</span>
            <span className="w-[96px] text-right">Headcount</span>
            <span className="w-[110px] text-right">Followers</span>
            <span className="w-[104px] text-right">Δ 14 days</span>
          </div>
          <hr className="u-rule" />
          {movers.map((company, i) => (
            <div key={company.name}>
              <div className="u-row flex items-baseline gap-4 px-1 py-[13px]">
                <span className="grow text-base">{company.name}</span>
                <span className="w-[190px] text-[13px] text-muted">{company.industry}</span>
                <span className="w-[96px] text-right font-mono text-[13px] tabular-nums">
                  {company.headcount}
                </span>
                <span className="w-[110px] text-right font-mono text-[13px] tabular-nums">
                  {company.followers}
                </span>
                <span className="w-[104px] text-right font-mono text-[13px] tabular-nums text-accent">
                  {company.delta}
                </span>
              </div>
              <hr className={i === movers.length - 1 ? "u-rule" : "u-hair"} />
            </div>
          ))}
        </div>
      </div>

      {/* PIPELINE / LINEAGE */}
      <div className="mt-[88px]">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-mono text-[11px] text-accent">05</span>
          <h2 className="m-0 text-[30px] tracking-[-0.02em] font-semibold">How it is built</h2>
        </div>
        <p className="font-serif text-[17px] leading-[1.55] text-muted-body mb-8 max-w-[62ch]">
          Four layers, ten models, one DuckDB file that lives in S3 between runs. Click any model
          to read its SQL on GitHub.
        </p>
        <div className="grid grid-cols-4 gap-5">
          {pipelineStages.map((stage) => (
            <div
              key={stage.step}
              className={
                "pt-4 border-t-[3px] " + (stage.accent ? "border-accent" : "border-foreground")
              }
            >
              <div
                className={
                  "font-mono text-[10px] tracking-[0.16em] uppercase mb-4 " +
                  (stage.accent ? "text-accent" : "text-muted")
                }
              >
                {stage.step}
              </div>
              <div className="flex flex-col gap-2">
                {stage.models.map((model) => (
                  <div
                    key={model}
                    className={
                      "border px-3.5 py-3 font-mono text-xs " +
                      (stage.accent ? "border-accent text-accent" : "border-border")
                    }
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
      <div className="mt-[88px] border-t-[3px] border-foreground pt-11">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-7">
            <h2 className="m-0 text-[46px] leading-[1.02] tracking-[-0.035em] font-semibold max-w-[17ch]">
              If you got this far, you probably want the CV.
            </h2>
          </div>
          <div className="col-span-4 col-start-9 flex flex-col gap-3">
            <Link
              to="/cv"
              className="flex items-center justify-between bg-foreground text-background px-5.5 py-4.5 font-mono text-xs tracking-[0.12em] uppercase"
            >
              <span>Read the CV</span>
              <span>→</span>
            </Link>
            <a
              href="#"
              className="flex items-center justify-between border border-foreground px-5.5 py-4.5 font-mono text-xs tracking-[0.12em] uppercase"
            >
              <span>Download PDF</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
