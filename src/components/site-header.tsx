import { NavLink } from 'react-router'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Props = {
  aboutOpen: boolean
  onToggleAbout: () => void
  onCloseAbout: () => void
}

const item = 'text-sm transition-colors hover:text-foreground'
const on = 'font-bold text-foreground'
const off = 'font-light text-muted-foreground'

// Menu flutuante no topo: nome à esquerda; Projetos, Sobre, idioma e tema à direita.
export function SiteHeader({ aboutOpen, onToggleAbout, onCloseAbout }: Props) {
  const { lang, setLang } = useLang()
  const pt = lang === 'pt'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 font-display">
      <nav
        aria-label={pt ? 'Principal' : 'Main'}
        className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-border bg-background/70 py-1.5 pl-6 pr-2 shadow-sm backdrop-blur-md"
      >
        <NavLink
          to="/"
          onClick={onCloseAbout}
          className="text-sm font-bold uppercase tracking-[0.12em]"
        >
          Miguel Santa Rosa
        </NavLink>
        <div className="flex items-center gap-4 sm:gap-5">
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
          <div
            role="group"
            aria-label={pt ? 'Idioma' : 'Language'}
            className="flex items-center gap-1 text-xs tracking-[0.12em]"
          >
            {(['pt', 'en'] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span className="text-border">/</span>}
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={cn(
                    'uppercase transition-colors hover:text-foreground',
                    lang === l ? on : off,
                  )}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
