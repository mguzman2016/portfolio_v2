import { Link } from "react-router-dom"

const CvCta = () => {
  return (
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
  )
}

export default CvCta;