import { useEffect } from 'react'
import { LangSwitch } from '@/components/site-header'
import { resume } from '@/data/resume'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Props = { open: boolean; onClose: () => void }

// Painel "Sobre": desliza da direita, ocupa metade da tela (tela cheia no
// celular) e deixa o que está atrás visível, desfocado e sem cor.
export function AboutDrawer({ open, onClose }: Props) {
  const { t, lang } = useLang()
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      className={cn('fixed inset-0 z-40', !open && 'pointer-events-none')}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-background/30 backdrop-blur-md backdrop-grayscale transition-opacity duration-500',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      <aside
        inert={!open}
        aria-label={lang === 'pt' ? 'Sobre' : 'About'}
        className={cn(
          'absolute right-0 top-0 h-full w-full overflow-y-auto border-l border-border bg-background px-6 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(6.5rem,calc(env(safe-area-inset-top)+5.5rem))] font-display transition-transform duration-500 ease-[cubic-bezier(.2,.9,.1,1)] md:w-1/2 md:px-12',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <LangSwitch className="-ml-1 mb-4 sm:hidden" />
        <h2 className="text-2xl font-bold tracking-tight">{resume.name}</h2>
        <p className="mt-1 text-sm font-light uppercase tracking-[0.18em] text-muted-foreground">
          {t(resume.role)} · {t(resume.location)}
        </p>
        <p className="mt-6 max-w-prose text-sm font-light leading-relaxed">
          {t(resume.intro)}
        </p>

        <h3 className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">
          {lang === 'pt' ? 'Experiência' : 'Experience'}
        </h3>
        <ul className="mt-4 divide-y divide-border">
          {resume.experience.map((item) => (
            <li key={item.company + item.period.pt} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="text-sm font-bold">
                  {t(item.title)} · {item.company}
                </p>
                <p className="text-xs font-light text-muted-foreground">
                  {t(item.period)}
                </p>
              </div>
              <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                {t(item.text)}
              </p>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">
          {lang === 'pt' ? 'Formação' : 'Education'}
        </h3>
        <ul className="mt-4">
          {resume.education.map((item) => (
            <li key={item.title.pt} className="py-2">
              <p className="text-sm font-bold">{t(item.title)}</p>
              <p className="text-sm font-light text-muted-foreground">
                {item.company} · {t(item.period)}
              </p>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">
          {lang === 'pt' ? 'Contato' : 'Contact'}
        </h3>
        <ul className="mt-4 flex gap-6">
          {resume.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline underline-offset-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
