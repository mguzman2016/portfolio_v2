const SalaryEssay = () => {
  return (
    <div className="mt-section border-t-[3px] border-foreground border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 pt-12 pb-14">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-mono text-label text-accent">03</span>
              <h2 className="m-0 text-section">The salary column is mostly empty</h2>
            </div>
            <p className="font-serif text-lg leading-[1.55] text-muted-strong max-w-[42ch]">
              This is not a bug in the pipeline — it is the finding. 
              Most of Swiss companies decide not to disclose salaries.
            </p>
            <p className="font-serif text-lg leading-[1.55] text-muted-strong max-w-[42ch] mt-5">
              However, based on the available data here are some useful numbers.
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
  )
}

export default SalaryEssay;