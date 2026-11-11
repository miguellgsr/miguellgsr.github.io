import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'
import { Button } from '@/components/ui/button'
import { useLang } from '@/lib/i18n'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const { lang } = useLang()
  const isDark = resolvedTheme === 'dark'

  // A nova cor se espalha em círculo a partir do ícone (View Transitions).
  // Em navegadores sem suporte, ou com "reduzir movimento", troca direto.
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? 'light' : 'dark'
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> }
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!doc.startViewTransition || reduced) {
      setTheme(next)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )
    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 750,
          easing: 'cubic-bezier(.4, 0, .2, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  const label =
    lang === 'pt'
      ? isDark
        ? 'Ativar modo claro'
        : 'Ativar modo escuro'
      : isDark
        ? 'Switch to light mode'
        : 'Switch to dark mode'

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      aria-label={label}
      onClick={toggle}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
