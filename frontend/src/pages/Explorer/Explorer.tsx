import { Masthead } from "@/components/layout/Masthead"
import { Footer } from "@/components/layout/Footer"
import { Page } from "@/components/layout/Page"
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

const listings: {
  title: string
  standardTitle: string
  level: string
  company: string
  type: string
  seen: string
  featured?: boolean
}[] = [
  {
    title: "Senior Data Engineer",
    standardTitle: "Data Engineer",
    level: "Mid-Senior level",
    company: "ApprovalMax",
    type: "Full-time",
    seen: "07 Jun",
    featured: true,
  },
  {
    title: "Principal Software Engineer — Search Scaling",
    standardTitle: "Search Engineer",
    level: "level not stated",
    company: "Canonical",
    type: "Full-time",
    seen: "07 Jun",
  },
  {
    title: "Software Engineer, Machine Learning",
    standardTitle: "Software Engineer",
    level: "level not stated",
    company: "Google",
    type: "Full-time",
    seen: "30 May",
  },
  {
    title: "DevOps Engineer",
    standardTitle: "DevOps Engineer",
    level: "Mid-Senior level",
    company: "micro1",
    type: "Contract",
    seen: "30 May",
  },
  {
    title: "Backend Engineer: Ranking",
    standardTitle: "Back End Developer",
    level: "level not stated",
    company: "Constructor",
    type: "Full-time",
    seen: "30 May",
  },
  {
    title: "Data Scientist",
    standardTitle: "Data Scientist",
    level: "Mid-Senior level",
    company: "Crossing Hurdles",
    type: "Contract",
    seen: "30 May",
  },
  {
    title: "Java Developer — Financial Platforms",
    standardTitle: "Java Software Engineer",
    level: "Director",
    company: "Experis",
    type: "Full-time",
    seen: "24 May",
  },
  {
    title: "Telco Cloud Field Engineer",
    standardTitle: "Field Engineer",
    level: "Mid-Senior level",
    company: "Canonical",
    type: "Full-time",
    seen: "24 May",
  },
  {
    title: "AI Engineer, Applied Research",
    standardTitle: "Artificial Intelligence Engineer",
    level: "Associate",
    company: "Proxify",
    type: "Contract",
    seen: "24 May",
  },
]

export default function Explorer() {
  return (
    <Page>
      <Masthead active="explorer" />

      {/* TITLE */}
      <div className="flex flex-col gap-6 pt-10 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="m-0 text-display-sm">The explorer</h1>
          <p className="font-serif text-lg text-muted-body mt-3.5 max-w-[56ch]">
            Every posting the pipeline has ever seen, deduplicated to one row per job. Filter it,
            read it, follow it back to LinkedIn.
          </p>
        </div>
        <div className="font-mono text-label text-muted leading-[1.8] tracking-meta shrink-0 lg:text-right">
          GRAIN · ONE ROW PER job_id
          <br />
          SOURCE · fct_job_postings ⋈ dim_job
          <br />
          REFRESHED · 2026-06-07 20:00 UTC
        </div>
      </div>

      {/* SEARCH + FILTERS */}
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

      {/* RESULT BAR */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4 pb-2.5">
        <div className="font-mono text-xs text-muted-strong tracking-[0.04em]">
          <span className="text-accent">88</span> of 176 postings · zürich · mid-senior
        </div>
        <div className="flex items-center gap-2 font-mono text-label tracking-[0.1em] uppercase text-muted">
          <span>Sort · newest first</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* SPLIT: LIST + DETAIL */}
      {/* Single column until xl; the fixed 700px list column only fits once the
          shell is wide enough to give the detail panel a usable remainder. */}
      <div className="grid grid-cols-1 gap-10 items-start xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:gap-6">
        {/* LIST */}
        <div className="min-w-0">
          <div className="flex gap-3.5 px-1 pb-2 label-micro text-muted">
            <span className="grow">Role</span>
            <span className="hidden sm:block w-37.5">Company</span>
            <span className="hidden md:block w-21.5">Type</span>
            <span className="w-17.5 text-right">Seen</span>
          </div>
          <hr className="u-rule" />

          {listings.map((job, i) => (
            <div key={job.title}>
              <div
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
              </div>
              <hr className={i === listings.length - 1 ? "u-rule" : "u-hair"} />
            </div>
          ))}

          <div className="flex justify-center pt-5">
            <span className="border border-foreground px-6.5 py-3 font-mono text-label tracking-button uppercase cursor-pointer">
              Load 79 more
            </span>
          </div>
        </div>

        {/* DETAIL */}
        <div className="min-w-0 border border-foreground bg-card xl:sticky xl:top-6">
          <div className="p-6.5 pb-5.5 border-b border-border">
            <div className="flex items-start gap-3.5">
              <div className="w-11.5 h-11.5 shrink-0 border border-border bg-hover flex items-center justify-center font-mono text-body-sm text-muted">
                AM
              </div>
              <div className="grow min-w-0">
                <div className="text-body-sm font-medium">ApprovalMax</div>
                <div className="font-mono text-label text-muted mt-1">
                  Software Development · 132 staff · 40,544 followers
                </div>
              </div>
            </div>
            <h2 className="text-subsection mt-5">Senior Data Engineer</h2>
            <div className="flex gap-1.5 flex-wrap mt-4">
              {["Zürich", "Full-time", "Mid-Senior", "Information Technology"].map((tag) => (
                <span key={tag} className="border border-border px-2.5 py-1.5 font-mono text-label">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="px-6.5 py-5.5 border-b border-border flex flex-wrap justify-between items-center gap-3 bg-background">
            <span className="label-micro text-muted">Compensation</span>
            <span className="font-serif italic text-body-sm text-faint">not published</span>
          </div>

          <div className="p-6.5">
            <div className="label-micro text-muted mb-3">job_description · 7,135 chars</div>
            <p className="font-serif text-base leading-[1.6] text-muted-copy m-0">
              About ApprovalMax — a fast-growing B2B SaaS company that helps businesses automate
              their approval workflows and financial controls. With a global team of over 100
              people spanning the UK, Europe, North America, Australia and South Africa, we build
              software that matters and we are scaling quickly…
            </p>
            <div className="mt-3.5">
              <a
                href="#"
                className="u-lnk font-mono text-label tracking-[0.1em] uppercase text-accent border-accent"
              >
                Expand full text
              </a>
            </div>
          </div>

          <div className="px-6.5 pb-6">
            <a
              href="#"
              className="flex items-center justify-between gap-4 bg-foreground text-background px-4.5 py-3.5 font-mono text-label tracking-button uppercase"
            >
              <span>Open on LinkedIn</span>
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
                <path d="M14 4h6v6" />
                <path d="M20 4l-9 9" />
                <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
              </svg>
            </a>
          </div>

          <div className="border-t border-border bg-hover px-6.5 py-4 font-mono text-micro text-muted leading-[1.9] tracking-[0.04em]">
            job_key &nbsp;9f2c…a41d
            <br />
            src_id &nbsp;&nbsp;&nbsp;4420956438
            <br />
            date_key &nbsp;20260607 · search_term data_engineer
          </div>
        </div>
      </div>

      <div className="h-16" />
      <Footer />
    </Page>
  )
}
