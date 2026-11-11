import { NavLink } from 'react-router'
import { Clock } from '@/components/clock'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Projetos', end: true },
  { to: '/about', label: 'Sobre', end: false },
  { to: '/contact', label: 'Contato', end: false },
]

// Menu flutuante no topo da tela.
export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Principal"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-background/70 p-1 shadow-sm backdrop-blur-md"
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              cn(
                'rounded-full px-4 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
        <span className="mx-2 hidden sm:inline">
          <Clock />
        </span>
        <ThemeToggle />
      </nav>
    </header>
  )
}
