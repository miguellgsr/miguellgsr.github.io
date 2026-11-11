import { Link } from 'react-router'
import { useLang } from '@/lib/i18n'

export function NotFoundPage() {
  const { lang } = useLang()
  const pt = lang === 'pt'
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        {pt ? 'Página não encontrada' : 'Page not found'}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        {pt ? 'Esse endereço não existe.' : 'This address does not exist.'}{' '}
        <Link to="/" className="text-foreground underline underline-offset-4">
          {pt ? 'Voltar ao início' : 'Back to home'}
        </Link>
      </p>
    </section>
  )
}
