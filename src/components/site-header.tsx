import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
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

// Refração do vidro (só Chromium aceita url() em backdrop-filter; nos demais fica o blur).
const CHROMIUM =
  typeof navigator !== 'undefined' && /Chrome\//.test(navigator.userAgent) && !/CriOS|EdgiOS|FxiOS/.test(navigator.userAgent)

function GlassFilter() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
      <defs>
        <filter id="lg-refract" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

// Menu flutuante de vidro líquido: nome à esquerda; Projetos, Sobre, idioma e tema à direita.
export function SiteHeader({ aboutOpen, onToggleAbout, onCloseAbout }: Props) {
  const { lang } = useLang()
  const pt = lang === 'pt'
  const { pathname } = useLocation()
  const home = pathname === '/'

  const wrap = useRef<HTMLDivElement>(null)
  const refs = useRef<(HTMLElement | null)[]>([])
  const [hover, setHover] = useState<number | null>(null)
  const [box, setBox] = useState({ x: 0, w: 0, ready: false })
  const [moving, setMoving] = useState(false)

  // 0 = Projetos, 1 = Sobre; sem seleção em páginas de case
  const current = aboutOpen ? 1 : home ? 0 : null
  const target = hover ?? current

  useLayoutEffect(() => {
    const el = target == null ? null : refs.current[target]
    if (!el) {
      setBox((b) => ({ ...b, w: 0 }))
      return
    }
    setBox((b) => ({ x: el.offsetLeft, w: el.offsetWidth, ready: b.ready || b.w > 0 }))
  }, [target, lang])

  useEffect(() => {
    setMoving(true)
    const id = window.setTimeout(() => setMoving(false), 420)
    return () => window.clearTimeout(id)
  }, [target])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 flex justify-center px-[max(1rem,env(safe-area-inset-left))] font-display">
      <GlassFilter />
      <nav
        aria-label={pt ? 'Principal' : 'Main'}
        className="lg-nav pointer-events-auto relative flex w-full max-w-3xl items-center justify-between gap-4 rounded-full py-1.5 pl-4 pr-1.5 sm:pl-6 sm:pr-2"
        style={CHROMIUM ? ({ '--lg-bf': 'url(#lg-refract) blur(10px) saturate(1.7) brightness(1.06)' } as React.CSSProperties) : undefined}
      >
        <NavLink
          to="/"
          onClick={onCloseAbout}
          className="relative z-10 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.1em] sm:text-sm sm:tracking-[0.12em]"
        >
          Miguel Santa Rosa
        </NavLink>
        <div className="relative z-10 flex items-center gap-3 sm:gap-5">
          <div
            ref={wrap}
            className="relative flex items-center gap-1 sm:gap-2"
            onMouseLeave={() => setHover(null)}
          >
            <span
              aria-hidden="true"
              className="lg-drop"
              data-moving={moving}
              style={{
                width: box.w,
                transform: `translateX(${box.x}px) scale(${moving ? 1.08 : 1}, ${moving ? 0.9 : 1})`,
                opacity: box.w > 0 ? 1 : 0,
                transition: box.ready
                  ? 'transform .55s cubic-bezier(.34,1.56,.64,1), width .55s cubic-bezier(.34,1.56,.64,1), opacity .3s'
                  : 'opacity .3s',
              }}
            />
            <NavLink
              ref={(el) => {
                refs.current[0] = el
              }}
              to="/"
              end
              onClick={onCloseAbout}
              onMouseEnter={() => setHover(0)}
              onFocus={() => setHover(0)}
              onBlur={() => setHover(null)}
              className={({ isActive }) => cn(item, 'px-3', isActive && !aboutOpen ? on : off)}
            >
              {pt ? 'Projetos' : 'Projects'}
            </NavLink>
            <button
              ref={(el) => {
                refs.current[1] = el
              }}
              type="button"
              onClick={onToggleAbout}
              onMouseEnter={() => setHover(1)}
              onFocus={() => setHover(1)}
              onBlur={() => setHover(null)}
              aria-expanded={aboutOpen}
              className={cn(item, 'px-3', aboutOpen ? on : off)}
            >
              {pt ? 'Sobre' : 'About'}
            </button>
          </div>
          <LangSwitch className="hidden sm:flex" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
