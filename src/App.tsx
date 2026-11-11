import { Route, Routes } from 'react-router'
import { ScrollToTop } from '@/components/scroll-to-top'
import { SiteHeader } from '@/components/site-header'
import { AboutPage } from '@/pages/about-page'
import { CasePage } from '@/pages/case-page'
import { ContactPage } from '@/pages/contact-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { WorkPage } from '@/pages/work-page'

function App() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CasePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
