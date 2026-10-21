import { Masthead } from "@/components/layout/Masthead"
import { Footer } from "@/components/layout/Footer"
import { Page } from "@/components/layout/Page"
import Title from "./components/Title"
import Search from "./components/Search"
import ResultBar from "./components/ResultBar"
import List from "./components/List"

export default function Explorer() {
  return (
    <Page>
      <Masthead active="explorer" />

      {/* TITLE */}
      <Title />

      {/* SEARCH + FILTERS */}
      <Search />

      {/* RESULT BAR */}
      <ResultBar />

      {/* LIST */}
      <List />

      <div className="h-16" />
      <Footer />
    </Page>
  )
}
