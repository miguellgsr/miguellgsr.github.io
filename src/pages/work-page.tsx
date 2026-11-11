import { Link } from 'react-router'
import { cases } from '@/data/cases'

export function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
        Miguel Santa Rosa
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Direção de arte e identidade visual.
      </p>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((item) => (
          <li key={item.slug}>
            <Link
              to={`/work/${item.slug}`}
              className="group block rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent"
            >
              <div className="aspect-[4/3] rounded-xl bg-muted" />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-medium">{item.title}</h2>
                <span className="text-sm text-muted-foreground">
                  {item.year}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{item.role}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
