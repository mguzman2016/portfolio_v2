
export default function ResultBar() {
  return (
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
  );
}