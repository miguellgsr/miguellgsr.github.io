import { lazy, Suspense, useCallback, useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import { useNavigate } from 'react-router'
import { ProjectGrid } from '@/components/project-grid'
import { cases, coverUrl } from '@/data/cases'
import { useLang } from '@/lib/i18n'

// O carrossel (e o WebGL dele) só é baixado nesta página.
const Carousel = lazy(() => import('@/components/ui/3d-curved-carousel'))

// Lembra qual projeto estava no centro, para voltar nele depois de abrir um case.
let lastIndex = 0

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function WorkPage() {
  const { resolvedTheme } = useTheme()
  const navigate = useNavigate()
  const { t, lang } = useLang()
  const slides = useMemo(
    () =>
      cases.map((item) => ({
        title: item.title,
        kicker: t(item.category),
        image: coverUrl(item.cover),
        video: item.preview ? coverUrl(item.preview) : undefined,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  )
  const [startIndex] = useState(() => lastIndex)
  const webgl = useMemo(() => hasWebGL(), [])

  const handleChange = useCallback((index: number) => {
    lastIndex = index
  }, [])

  // Clicou no card central: abre direto a página final do case.
  const handleSelect = useCallback(
    (index: number) => {
      const item = cases[index]
      if (item) navigate(`/work/${item.slug}`)
    },
    [navigate],
  )

  // Sem WebGL: mostra a lista simples de projetos.
  if (!webgl) return <ProjectGrid />

  // Espera o tema ser conhecido, para o fundo já nascer na cor certa.
  if (!resolvedTheme) return <div className="h-svh" />

  const dark = resolvedTheme === 'dark'

  return (
    <section className="relative h-svh w-full">
      <Suspense fallback={null}>
        <Carousel
          slides={slides}
          label={lang === 'pt' ? 'Projetos' : 'Projects'}
          prevLabel={lang === 'pt' ? 'Projeto anterior' : 'Previous project'}
          nextLabel={lang === 'pt' ? 'Próximo projeto' : 'Next project'}
          background={dark ? '#0a0a0a' : '#ffffff'}
          ink={dark ? '#f5f5f5' : '#0a0a0a'}
          height="100svh"
          startIndex={startIndex}
          onChange={handleChange}
          onSelect={handleSelect}
        />
      </Suspense>
    </section>
  )
}
