import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/navigation/Navbar.jsx'
import Footer from './components/shared/Footer.jsx'
import ProgressBar from './components/shared/ProgressBar.jsx'
import Home from './pages/Home.jsx'
const FlagshipWorld = lazy(() => import('./pages/FlagshipWorld.jsx'))
const ElaneWorld = lazy(() => import('./pages/worlds/ElaneWorld.jsx'))
const AureliaWorld = lazy(() => import('./pages/worlds/AureliaWorld.jsx'))
const LumenWorld = lazy(() => import('./pages/worlds/LumenWorld.jsx'))
const LumoraWorld = lazy(() => import('./pages/worlds/LumoraWorld.jsx'))
const EmberOakWorld = lazy(() => import('./pages/worlds/EmberOakWorld.jsx'))
const VaultaWorld = lazy(() => import('./pages/worlds/VaultaWorld.jsx'))
const AdminLayout = lazy(() => import('./components/admin/AdminLayout.jsx'))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute.jsx'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'))
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages.jsx'))
const AdminPortfolio = lazy(() => import('./pages/admin/AdminPortfolio.jsx'))
const AdminWebProjects = lazy(() => import('./pages/admin/AdminWebProjects.jsx'))
const AdminUiux = lazy(() => import('./pages/admin/AdminUiux.jsx'))
import { useScrollChrome } from './hooks/useScrollChrome.js'


const SECTION_IDS = ['about', 'founder', 'work', 'uiux', 'services', 'contact']

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

      <Suspense fallback={null}>
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
      </Suspense>

      {!isAdmin && <Footer />}
    </>
  )
}
