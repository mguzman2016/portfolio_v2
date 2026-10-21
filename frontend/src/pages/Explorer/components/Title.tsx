
export default function Title() {
  return (
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
  );
}
