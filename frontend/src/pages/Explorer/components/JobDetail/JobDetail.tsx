import { Link, useParams } from "react-router-dom"
import { Masthead } from "@/components/layout/Masthead"
import { Footer } from "@/components/layout/Footer"
import { Page } from "@/components/layout/Page"
import { getJobById } from "../../data/data"
import EmptyJob from "./EmptyJob"

export default function JobDetail() {
  const { jobId } = useParams<{ jobId: string }>()
  const job = jobId ? getJobById(jobId) : undefined

  if (!job) {
    return (
      <EmptyJob />
    )
  }

  return (
    <Page>
      <Masthead active="explorer" />

      <div className="pt-7 pb-5">
        <Link
          to="/explorer"
          className="u-lnk font-mono text-label tracking-[0.1em] uppercase text-muted border-muted"
        >
          ← Back to the explorer
        </Link>
      </div>

      <div className="max-w-[760px] border border-foreground bg-card mb-16">
        <div className="p-6.5 pb-5.5 border-b border-border">
          <div className="flex items-start gap-3.5">
            <div className="w-11.5 h-11.5 shrink-0 border border-border bg-hover flex items-center justify-center font-mono text-body-sm text-muted">
              {job.companyInitials}
            </div>
            <div className="grow min-w-0">
              <div className="text-body-sm font-medium">{job.company}</div>
              <div className="font-mono text-label text-muted mt-1">{job.companyMeta}</div>
            </div>
          </div>
          <h1 className="text-subsection mt-5">{job.title}</h1>
          <div className="font-mono text-label text-faint mt-1.5">
            {job.standardTitle} · {job.level}
          </div>
          <div className="flex gap-1.5 flex-wrap mt-4">
            {job.tags.map((tag) => (
              <span key={tag} className="border border-border px-2.5 py-1.5 font-mono text-label">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="px-6.5 py-5.5 border-b border-border flex flex-wrap justify-between items-center gap-3 bg-background">
          <span className="label-micro text-muted">Compensation</span>
          <span className="font-serif italic text-body-sm text-faint">{job.compensation}</span>
        </div>

        <div className="p-6.5">
          <div className="label-micro text-muted mb-3">
            job_description · {job.descriptionChars.toLocaleString()} chars
          </div>
          <p className="font-serif text-base leading-[1.6] text-muted-copy m-0">
            {job.description}
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
            href={job.linkedinUrl}
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
          job_key &nbsp;{job.jobKey}
          <br />
          src_id &nbsp;&nbsp;&nbsp;{job.srcId}
          <br />
          date_key &nbsp;{job.dateKey} · search_term {job.searchTerm}
        </div>
      </div>

      <Footer />
    </Page>
  )
}
