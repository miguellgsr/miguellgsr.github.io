import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        Página não encontrada
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Esse endereço não existe.{' '}
        <Link to="/" className="text-foreground underline underline-offset-4">
          Voltar ao início
        </Link>
      </p>
    </section>
  )
}
