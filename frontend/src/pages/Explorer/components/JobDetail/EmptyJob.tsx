import { Link } from "react-router-dom"
import { Masthead } from "@/components/layout/Masthead"
import { Footer } from "@/components/layout/Footer"
import { Page } from "@/components/layout/Page"

export default function EmptyJob() {
  return (
    <Page>
        <Masthead active="explorer" />
        <div className="py-16 text-center">
            <h1 className="text-subsection">Posting not found</h1>
            <p className="font-serif text-muted-body mt-3">
            This job may have been removed from the pipeline, or the link is wrong.
            </p>
            <Link
            to="/explorer"
            className="u-lnk inline-block mt-5 font-mono text-label tracking-[0.1em] uppercase text-accent border-accent"
            >
            Back to the explorer
            </Link>
        </div>
        <Footer />
    </Page>
  );
}