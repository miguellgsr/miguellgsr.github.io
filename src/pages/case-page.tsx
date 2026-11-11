import { Link, useParams } from 'react-router'
import { cases, coverUrl } from '@/data/cases'
import { useLang } from '@/lib/i18n'
import { NotFoundPage } from '@/pages/not-found-page'

export function CasePage() {
  const { slug } = useParams()
  const { t, lang } = useLang()
  const item = cases.find((c) => c.slug === slug)

  if (!item) return <NotFoundPage />

  return (
    <article>
      {/* A capa ocupa a tela inteira, no mesmo enquadramento do zoom do carrossel. */}
      <header className="relative h-svh min-h-[420px] w-full overflow-hidden bg-muted">
        <img
          src={coverUrl(item.cover)}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        {/* O loop que tocava no carrossel continua rodando aqui, em miniatura. */}
        {item.preview && (
          <video
            src={coverUrl(item.preview)}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] right-6 z-10 aspect-[4/5] w-24 rounded-xl object-cover shadow-xl ring-1 ring-white/20 sm:w-36"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-40 text-white">
          <div className="animate-in fade-in slide-in-from-bottom-3 mx-auto max-w-6xl duration-700">
            <p className="text-sm text-white/70">{t(item.category)}</p>
            <h1 className="mt-2 text-[2rem] font-semibold leading-tight tracking-tight sm:text-6xl">
              {item.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <p className="max-w-2xl text-lg leading-relaxed">{t(item.summary)}</p>
        <Link
          to="/"
          className="mt-16 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {lang === 'pt' ? '← Voltar aos projetos' : '← Back to projects'}
        </Link>
      </div>
    </article>
  )
}
