import { NavLink } from 'react-router'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Props = {
  aboutOpen: boolean
  onToggleAbout: () => void
  onCloseAbout: () => void
}

const item = 'py-2 text-[13px] transition-colors hover:text-foreground sm:text-sm'
const on = 'font-bold text-foreground'
const off = 'font-light text-muted-foreground'

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLang()
  return (
    <div
      role="group"
      aria-label={lang === 'pt' ? 'Idioma' : 'Language'}
      className={cn('flex items-center gap-1 text-xs tracking-[0.12em]', className)}
    >
      {(['pt', 'en'] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-border">/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={cn(
              'px-1 py-2 uppercase transition-colors hover:text-foreground',
              lang === l ? on : off,
            )}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )
}

// Menu flutuante no topo: nome à esquerda; Projetos, Sobre, idioma e tema à direita.
export function SiteHeader({ aboutOpen, onToggleAbout, onCloseAbout }: Props) {
  const { lang } = useLang()
  const pt = lang === 'pt'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 flex justify-center px-[max(1rem,env(safe-area-inset-left))] font-display">
      <nav
        aria-label={pt ? 'Principal' : 'Main'}
        className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-border bg-background/70 py-1.5 pl-4 pr-1.5 shadow-sm sm:pl-6 sm:pr-2 backdrop-blur-md"
      >
        <NavLink
          to="/"
          onClick={onCloseAbout}
          className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.1em] sm:text-sm sm:tracking-[0.12em]"
        >
          Miguel Santa Rosa
        </NavLink>
        <div className="flex items-center gap-3 sm:gap-5">
          <NavLink
            to="/"
            end
            onClick={onCloseAbout}
            className={({ isActive }) =>
              cn(item, isActive && !aboutOpen ? on : off)
            }
          >
            {pt ? 'Projetos' : 'Projects'}
          </NavLink>
          <button
            type="button"
            onClick={onToggleAbout}
            aria-expanded={aboutOpen}
            className={cn(item, aboutOpen ? on : off)}
          >
            {pt ? 'Sobre' : 'About'}
          </button>
          <LangSwitch className="hidden sm:flex" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
