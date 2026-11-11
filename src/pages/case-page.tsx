import { Link, useParams } from 'react-router'
import { cases } from '@/data/cases'
import { NotFoundPage } from '@/pages/not-found-page'

export function CasePage() {
  const { slug } = useParams()
  const item = cases.find((c) => c.slug === slug)

  if (!item) return <NotFoundPage />

  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <Link
        to="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Voltar aos projetos
      </Link>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
        {item.title}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {item.role} · {item.year}
      </p>

      <div className="mt-10 aspect-[16/9] rounded-2xl bg-muted" />
      <p className="mt-10 max-w-2xl text-lg leading-relaxed">{item.summary}</p>
    </article>
  )
}
