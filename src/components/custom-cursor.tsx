import { useEffect, useRef } from 'react'

// Cursor em "V" minimalista. Usa mix-blend-mode: difference com traço branco,
// então fica preto sobre fundo claro e branco sobre fundo escuro, sem precisar
// saber o tema. Só liga em dispositivos com mouse (hover + ponteiro fino).
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const el = ref.current
    if (!fine.matches || !el) return

    const html = document.documentElement
    let x = -100
    let y = -100
    let raf = 0
    let scale = 1
    let shown = false

    const paint = () => {
      raf = 0
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      if (!shown) {
        shown = true
        html.classList.add('has-custom-cursor')
        el.style.opacity = '1'
      }
      const target = e.target as Element | null
      const hit = !!target?.closest('a, button, [role="button"], canvas, summary')
      scale = hit ? 1.35 : 1
      request()
    }
    // Qualquer evento do mouse mantém o V visível e a classe ativa (clique, navegação, troca de tema).
    const keep = (e: MouseEvent | PointerEvent) => {
      if ('pointerType' in e && e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      if (shown) {
        html.classList.add('has-custom-cursor')
        el.style.opacity = '1'
        request()
      }
    }
    // só esconde quando o mouse realmente sai da janela (não quando um elemento é trocado sob ele)
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget) return
      const out = e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth - 1 || e.clientY >= window.innerHeight - 1
      if (out) el.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    for (const t of ['pointerdown', 'pointerup', 'click', 'mousemove', 'mouseover']) {
      window.addEventListener(t, keep as EventListener, { passive: true, capture: true })
    }
    document.documentElement.addEventListener('mouseout', onOut)
    return () => {
      window.removeEventListener('pointermove', onMove)
      for (const t of ['pointerdown', 'pointerup', 'click', 'mousemove', 'mouseover']) {
        window.removeEventListener(t, keep as EventListener, { capture: true })
      }
      document.documentElement.removeEventListener('mouseout', onOut)
      html.classList.remove('has-custom-cursor')
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 mix-blend-difference transition-opacity duration-200"
      style={{ willChange: 'transform' }}
    >
      {/* o vértice do V é o ponto exato do clique */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M15.5 6.5 1.5 1.5l5 14"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
