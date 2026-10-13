import { movers } from "../data/data"

const CompanyMovers = () => {
  return (
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
  )
}

export default CompanyMovers;