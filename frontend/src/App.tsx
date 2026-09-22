import { Route, Routes } from "react-router-dom"
import Home from "@/pages/Home/Home"
import Explorer from "@/pages/Explorer/Explorer"
import Cv from "@/pages/Cv/Cv"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explorer" element={<Explorer />} />
      <Route path="/cv" element={<Cv />} />
    </Routes>
  )
}
