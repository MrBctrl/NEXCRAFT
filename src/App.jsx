import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navigation/Navbar.jsx'
import Footer from './components/shared/Footer.jsx'
import ProgressBar from './components/shared/ProgressBar.jsx'
import Home from './pages/Home.jsx'
import FlagshipWorld from './pages/FlagshipWorld.jsx'
import ElaneWorld from './pages/worlds/ElaneWorld.jsx'
import AureliaWorld from './pages/worlds/AureliaWorld.jsx'
import LumenWorld from './pages/worlds/LumenWorld.jsx'
import LumoraWorld from './pages/worlds/LumoraWorld.jsx'
import EmberOakWorld from './pages/worlds/EmberOakWorld.jsx'
import VaultaWorld from './pages/worlds/VaultaWorld.jsx'
import { useScrollChrome } from './hooks/useScrollChrome.js'

const SECTION_IDS = ['about', 'services', 'work', 'uiux', 'contact']

export default function App() {
  const { progress, scrolled, activeSection } = useScrollChrome(SECTION_IDS)

  return (
    <>
      <ProgressBar progress={progress} />
      <Navbar scrolled={scrolled} activeSection={activeSection} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/elane" element={<ElaneWorld />} />
        <Route path="/work/aurelia" element={<AureliaWorld />} />
        <Route path="/work/lumen" element={<LumenWorld />} />
        <Route path="/work/lumora" element={<LumoraWorld />} />
        <Route path="/work/ember-oak" element={<EmberOakWorld />} />
        <Route path="/work/vaulta" element={<VaultaWorld />} />
        <Route path="/work/:slug" element={<FlagshipWorld />} />
      </Routes>

      <Footer />
    </>
  )
}
