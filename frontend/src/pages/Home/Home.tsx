import { Masthead } from "@/components/layout/Masthead"
import { Footer } from "@/components/layout/Footer"
import { Page } from "@/components/layout/Page"
import Hero from "./components/Hero/Hero"
import CityAndTitles from "./components/CityAndTitles"
import NumbersBand from "./components/NumbersBand"
import CvCta from "./components/CvCta"

import Pipeline from "./components/Pipeline"
import SalaryEssay from "./components/SalaryEssay"
import CompanyMovers from "./components/CompanyMovers"

export default function Home() {
  return (
    <Page>
      <Masthead active="index" />
      
      <Hero />
      <NumbersBand />
      <CityAndTitles />
      <SalaryEssay />
      <CompanyMovers />
      <Pipeline />
      <CvCta />

      <Footer />
    </Page>
  )
}
