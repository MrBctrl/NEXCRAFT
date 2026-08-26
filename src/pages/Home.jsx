import Hero from '../components/hero/Hero.jsx'
import Marquee from '../components/shared/Marquee.jsx'
import About from '../components/sections/About.jsx'
import Services from '../components/sections/Services.jsx'
import Work from '../components/sections/Work.jsx'
import UIUX from '../components/sections/UIUX.jsx'
import Contact from '../components/sections/Contact.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

export default function Home() {
  useScrollReveal()

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <UIUX />
      <Contact />
    </>
  )
}
