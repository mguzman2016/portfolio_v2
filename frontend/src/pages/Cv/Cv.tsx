import type { ReactNode } from "react"
import { Masthead } from "@/components/layout/Masthead"
import { Page } from "@/components/layout/Page"
import { cn } from "@/lib/utils"

function Fill({ children }: { children: ReactNode }) {
  return <span className="text-accent bg-accent-tint px-1.5 py-px">{children}</span>
}

/** Label / value rows (experience, education) share one responsive two-column grid. */
const ROW_GRID = "grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-[9.375rem_minmax(0,1fr)]"

const toolkit = [
  {
    label: "Modelling",
    value: "dbt · SQL · Kimball dimensional design · incremental strategies · data testing",
  },
  {
    label: "Engines & storage",
    value: (
      <>
        DuckDB · S3 / object storage · Parquet &amp; JSONL ·{" "}
        <Fill>[warehouse you have used at work]</Fill>
      </>
    ),
  },
  {
    label: "Platform",
    value: "Terraform · Docker · AWS ECS Fargate, ECR, EventBridge, Secrets Manager, SNS",
  },
  {
    label: "Languages",
    value: (
      <>
        Python · SQL · <Fill>[others worth listing]</Fill>
      </>
    ),
  },
]

export default function Cv() {
  return (
    <Page>
      <Masthead active="cv" />

      {/* HEAD */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10 pt-14 pb-12">
        <div className="md:col-span-8">
          <h1 className="m-0 text-display-xl">
            Curriculum
            <br />
            Vitae
          </h1>
          <p className="font-serif text-lede text-muted-strong max-w-[50ch] mt-7.5">
            Data engineer working across ingestion, warehouse modelling and the infrastructure
            underneath. The site you are on is a working example: scraper, S3 lake, dbt star
            schema, Terraform, scheduled on Fargate.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-10 max-w-50 md:max-w-none">
          <div className="w-full aspect-[4/5] border border-border bg-hover flex items-center justify-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-icon-muted"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8.5" r="3.6" />
              <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
            </svg>
          </div>
          <div className="font-mono text-micro text-faint text-center mt-2 tracking-[0.08em]">
            PORTRAIT · OPTIONAL
          </div>
        </div>
      </div>

      <hr className="u-rule" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 pt-10">
        {/* LEFT RAIL */}
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
            <a
              href="#"
              className="grow flex items-center justify-between gap-4 bg-accent text-background px-4.5 py-4 font-mono text-label tracking-button uppercase"
            >
              <span>Download PDF</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M12 4v12" />
                <path d="M7 12l5 5 5-5" />
                <path d="M4 20h16" />
              </svg>
            </a>
            <a
              href="#"
              className="grow flex items-center justify-between gap-4 border border-foreground px-4.5 py-4 font-mono text-label tracking-button uppercase"
            >
              <span>Print this page</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M7 9V4h10v5" />
                <rect x="4" y="9" width="16" height="7" />
                <path d="M7 16h10v4H7z" />
              </svg>
            </a>
          </div>

          <div className="mt-8.5">
            <div className="font-mono text-micro tracking-caps uppercase text-muted pb-2.5">
              Contact
            </div>
            <hr className="u-rule" />
            <div className="py-3.5 text-sm leading-[1.9] break-words">
              azuymiguel95@gmail.com
              <br />
              <a href="#" className="u-lnk">
                linkedin.com/in/…
              </a>
              <br />
              <a href="#" className="u-lnk">
                github.com/mguzman2016
              </a>
              <br />
              <Fill>[City, Country]</Fill>
            </div>
            <hr className="u-rule" />
          </div>

          <div className="mt-7.5">
            <div className="font-mono text-micro tracking-caps uppercase text-muted pb-2.5">
              Languages
            </div>
            <hr className="u-rule" />
            <div className="py-3.5 text-sm leading-[1.9]">
              Spanish <span className="text-muted">— native</span>
              <br />
              English <Fill>[level]</Fill>
              <br />
              German <Fill>[level]</Fill>
            </div>
            <hr className="u-rule" />
          </div>

          <div className="mt-7.5">
            <div className="font-mono text-micro tracking-caps uppercase text-muted pb-2.5">
              Status
            </div>
            <hr className="u-rule" />
            <div className="py-3.5 font-serif text-base leading-[1.5] text-muted-strong">
              <Fill>[Open to / not looking for]</Fill> data engineering roles in Switzerland.
            </div>
            <hr className="u-rule" />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8 lg:col-start-5">
          {/* SELECTED WORK */}
          <div className="flex items-baseline gap-3 mb-4.5">
            <span className="font-mono text-label text-accent">01</span>
            <h2 className="m-0 text-section-sm">Selected work</h2>
          </div>
          <hr className="u-rule" />
          <div className="py-5.5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div className="text-item">Swiss engineering job market warehouse</div>
              <div className="font-mono text-xs text-muted shrink-0">2026 — ongoing</div>
            </div>
            <p className="font-serif text-base leading-[1.6] text-muted-strong mt-3 max-w-[66ch]">
              End-to-end pipeline behind this site. A containerised Python scraper lands LinkedIn
              postings as Hive-partitioned JSONL in S3; dbt builds a Kimball star schema in DuckDB
              with incremental facts and 22 data tests; the compiled database round-trips through
              S3 so each run only processes new partitions. Infrastructure is Terraform — ECR, ECS
              Fargate, EventBridge schedules, Secrets Manager, SNS alerting.
            </p>
            <div className="flex gap-1.5 flex-wrap mt-4">
              {["Python", "dbt", "DuckDB", "Terraform", "AWS Fargate", "Docker"].map((tag) => (
                <span key={tag} className="border border-border px-2.5 py-1.5 font-mono text-label">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5.5 gap-y-2 font-mono text-label tracking-[0.08em] uppercase">
              <a href="#" className="u-lnk text-accent border-accent">
                Read the case study →
              </a>
              <a href="#" className="u-lnk">
                Source on GitHub →
              </a>
            </div>
          </div>
          <hr className="u-hair" />
          <div className="py-5.5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div className="text-item">
                <Fill>[Second project title]</Fill>
              </div>
              <div className="font-mono text-xs text-muted shrink-0">
                <Fill>[year]</Fill>
              </div>
            </div>
            <p className="font-serif text-base leading-[1.6] text-faint mt-3 max-w-[66ch]">
              Two to three sentences: the problem, what you built, and one number that shows it
              worked.
            </p>
          </div>
          <hr className="u-rule" />

          {/* EXPERIENCE */}
          <div className="flex items-baseline gap-3 mt-11.5 mb-4.5">
            <span className="font-mono text-label text-accent">02</span>
            <h2 className="m-0 text-section-sm">Experience</h2>
          </div>
          <hr className="u-rule" />
          <div className={cn("py-5.5", ROW_GRID)}>
            <div className="font-mono text-xs text-muted leading-[1.7]">
              <Fill>[2023]</Fill>
              <br />—<br />
              <Fill>[present]</Fill>
            </div>
            <div>
              <div className="text-item">
                <Fill>[Role title]</Fill> · <Fill>[Company]</Fill>
              </div>
              <ul className="font-serif text-base leading-[1.6] text-muted-strong mt-3 pl-5 max-w-[64ch]">
                <li className="mb-1.5">One line per achievement, each with a measurable outcome.</li>
                <li className="mb-1.5">
                  Name the stack you actually owned, not the stack that existed nearby.
                </li>
                <li>Scope: team size, data volume, systems replaced.</li>
              </ul>
            </div>
          </div>
          <hr className="u-hair" />
          <div className={cn("py-5.5", ROW_GRID)}>
            <div className="font-mono text-xs text-muted leading-[1.7]">
              <Fill>[year]</Fill>
              <br />—<br />
              <Fill>[year]</Fill>
            </div>
            <div>
              <div className="text-item">
                <Fill>[Role title]</Fill> · <Fill>[Company]</Fill>
              </div>
              <ul className="font-serif text-base leading-[1.6] text-faint mt-3 pl-5 max-w-[64ch]">
                <li>Same shape, two or three bullets.</li>
              </ul>
            </div>
          </div>
          <hr className="u-rule" />

          {/* TOOLKIT */}
          <div className="flex items-baseline gap-3 mt-11.5 mb-4.5">
            <span className="font-mono text-label text-accent">03</span>
            <h2 className="m-0 text-section-sm">Toolkit</h2>
          </div>
          <hr className="u-rule" />
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {toolkit.map((col, i) => (
              <div
                key={col.label}
                className={cn(
                  "py-5 border-b border-border-subtle",
                  i % 2 === 0 ? "sm:pr-6 sm:border-r" : "sm:pl-6"
                )}
              >
                <div className="font-mono text-micro tracking-caps uppercase text-muted">
                  {col.label}
                </div>
                <div className="text-body-sm leading-[1.8] mt-2">{col.value}</div>
              </div>
            ))}
          </div>
          <hr className="u-rule" />

          {/* EDUCATION */}
          <div className="flex items-baseline gap-3 mt-11.5 mb-4.5">
            <span className="font-mono text-label text-accent">04</span>
            <h2 className="m-0 text-section-sm">Education &amp; certification</h2>
          </div>
          <hr className="u-rule" />
          <div className={cn("py-5", ROW_GRID)}>
            <div className="font-mono text-xs text-muted">
              <Fill>[years]</Fill>
            </div>
            <div className="text-base leading-[1.7]">
              <Fill>[Degree]</Fill>, <Fill>[Institution]</Fill>
            </div>
          </div>
          <hr className="u-hair" />
          <div className={cn("py-5", ROW_GRID)}>
            <div className="font-mono text-xs text-muted">
              <Fill>[year]</Fill>
            </div>
            <div className="text-base leading-[1.7]">
              <Fill>[Certification, issuer]</Fill>
            </div>
          </div>
          <hr className="u-rule" />
        </div>
      </div>

      <div className="mt-block border-t border-border pt-5.5 pb-10 flex flex-col gap-3 font-mono text-label text-muted tracking-meta sm:flex-row sm:justify-between sm:items-baseline">
        <span>MIGUEL GUZMÁN · 2026</span>
        <span className="text-accent">Highlighted fields are placeholders for you to fill in</span>
      </div>
    </Page>
  )
}
