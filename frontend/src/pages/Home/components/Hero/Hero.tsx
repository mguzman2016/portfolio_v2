import StatRow from "./StatRow"

const Hero = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 pt-14 pb-16">
        <div className="lg:col-span-8">
          <div className="font-mono text-label tracking-caps uppercase text-accent mb-7">
            A standing survey of the Swiss engineering market
          </div>
          <h1 className="m-0 text-display max-w-[15ch]">
            Every engineering role posted in four Swiss cities, collected on a schedule.
          </h1>
          <p className="font-serif text-lede text-muted-strong max-w-[52ch] mt-8">
            Hello! I'm Miguel and this is my portfolio, I scrape LinkedIn using automated python 
            scripts, data lands as raw JSON in AWS S3 and then it's processed using dbt and DuckDB.
            I focus on end-to-end data pipelines and the insights they can generate.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col lg:pt-1.5">
          <hr className="u-rule" />
          <StatRow textLeft="LAST RUN" textRight="2026-06-07 20:00 UTC" />
          <hr className="u-hair" />
          <StatRow textLeft="CADENCE" textRight="EventBridge → ECS Fargate" />
          <hr className="u-hair" />
          <StatRow textLeft="DBT TESTS" textRight="22 / 22 passing" /> 
          <hr className="u-rule" />
          <div className="flex items-center gap-2.5 pt-5.5 font-mono text-label tracking-[0.04em] text-muted-strong flex-wrap">
            <span className="border border-border px-2.5 py-1.25">LinkedIn</span>
            <span className="text-faint">→</span>
            <span className="border border-border px-2.5 py-1.25">S3 JSONL</span>
            <span className="text-faint">→</span>
            <span className="border border-border px-2.5 py-1.25">DuckDB</span>
            <span className="text-faint">→</span>
            <span className="border border-accent text-accent px-2.5 py-1.25">dbt marts</span>
          </div>
        </div>
      </div>
    );
};

export default Hero;
