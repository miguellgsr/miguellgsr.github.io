import { Link } from 'react-router'
import { cases, coverUrl } from '@/data/cases'
import { useLang } from '@/lib/i18n'

// Lista simples de projetos. Aparece quando o aparelho não tem WebGL,
// no lugar do carrossel de vidro.
export function ProjectGrid() {
  const { t, lang } = useLang()
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
        Miguel Santa Rosa
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        {lang === 'pt'
          ? 'Direção de arte e identidade visual.'
          : 'Art direction and visual identity.'}
      </p>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((item) => (
          <li key={item.slug}>
            <Link
              to={`/work/${item.slug}`}
              className="group block rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent"
            >
              <img
                src={coverUrl(item.cover)}
                alt={item.title}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl bg-muted object-cover"
              />
              <h2 className="mt-4 text-lg font-medium">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{t(item.category)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
