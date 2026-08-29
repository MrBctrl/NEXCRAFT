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
import AdminLayout from './components/admin/AdminLayout.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminMessages from './pages/admin/AdminMessages.jsx'
import AdminPortfolio from './pages/admin/AdminPortfolio.jsx'
import AdminWebProjects from './pages/admin/AdminWebProjects.jsx'
import AdminUiux from './pages/admin/AdminUiux.jsx'
import { useScrollChrome } from './hooks/useScrollChrome.js'
import { useLocation } from 'react-router-dom'

const SECTION_IDS = ['about', 'services', 'work', 'uiux', 'contact']

function SiteChrome() {
  const { progress, scrolled, activeSection } = useScrollChrome(SECTION_IDS)
  return (
    <>
      <ProgressBar progress={progress} />
      <Navbar scrolled={scrolled} activeSection={activeSection} />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <SiteChrome />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/elane" element={<ElaneWorld />} />
        <Route path="/work/aurelia" element={<AureliaWorld />} />
        <Route path="/work/lumen" element={<LumenWorld />} />
        <Route path="/work/lumora" element={<LumoraWorld />} />
        <Route path="/work/ember-oak" element={<EmberOakWorld />} />
        <Route path="/work/vaulta" element={<VaultaWorld />} />
        <Route path="/work/:slug" element={<FlagshipWorld />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="web-projects" element={<AdminWebProjects />} />
          <Route path="uiux" element={<AdminUiux />} />
        </Route>
      </Routes>

      {!isAdmin && <Footer />}
    </>
  )
}
