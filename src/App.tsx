import { useCallback, useState } from 'react'
import { Route, Routes } from 'react-router'
import { AboutDrawer } from '@/components/about-drawer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { SiteHeader } from '@/components/site-header'
import { CasePage } from '@/pages/case-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { WorkPage } from '@/pages/work-page'

function App() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const closeAbout = useCallback(() => setAboutOpen(false), [])
  const toggleAbout = useCallback(() => setAboutOpen((v) => !v), [])

  return (
    <>
      <ScrollToTop />
      <SiteHeader
        aboutOpen={aboutOpen}
        onToggleAbout={toggleAbout}
        onCloseAbout={closeAbout}
      />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CasePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <AboutDrawer open={aboutOpen} onClose={closeAbout} />
    </>
  )
}

export default App
