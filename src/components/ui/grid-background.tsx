import * as React from 'react'

type Props = {
  /** Cor das linhas (qualquer cor CSS). Troca com transição suave. */
  color: string
  /** Tamanho do quadrado da grade, em px. */
  size?: number
  /** Força da cor e do brilho (1 = padrão). */
  strength?: number
  /** Opacidade geral do fundo (0 a 1). */
  opacity?: number
}

// Fundo em grade: todas as linhas acendem na cor do case, com um halo de
// brilho que "respira" e um ponto de luz mais forte passeando pela grade.
export function GridBackground({ color, size = 56, strength = 1, opacity = 0.3 }: Props) {
  const line = (c: string, w = 1) =>
    `linear-gradient(to right, ${c} ${w}px, transparent ${w}px), linear-gradient(to bottom, ${c} ${w}px, transparent ${w}px)`
  const tint = (pct: number) =>
    `color-mix(in oklab, var(--grid-color) calc(${pct}% * var(--grid-k)), transparent)`
  const grid = { backgroundSize: `${size}px ${size}px`, backgroundPosition: 'center top' }
  const fade = 'radial-gradient(ellipse 100% 90% at 50% 55%, #000 30%, transparent 100%)'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={
        {
          '--grid-color': color,
          '--grid-k': strength,
          opacity,
          transition: '--grid-color 900ms ease',
        } as React.CSSProperties
      }
    >
      <style>{`
        @property --grid-color { syntax: "<color>"; inherits: true; initial-value: transparent; }
        @keyframes gridHalo { 0% { opacity: .35; } 100% { opacity: 1; } }
        @keyframes gridSweep {
          0%   { -webkit-mask-position: 0% 25%;   mask-position: 0% 25%; }
          50%  { -webkit-mask-position: 100% 70%; mask-position: 100% 70%; }
          100% { -webkit-mask-position: 0% 25%;   mask-position: 0% 25%; }
        }
        @media (prefers-reduced-motion: reduce) { .gb-halo, .gb-sweep { animation: none !important; } }
        /* celular/tablet: tira a camada mais pesada (blur grande) para não travar */
        @media (max-width: 1023px), (pointer: coarse) { .gb-far { display: none; } }
      `}</style>

      {/* linhas na cor do case */}
      <div
        className="absolute inset-0"
        style={{
          ...grid,
          backgroundImage: line(tint(5)),
          maskImage: fade,
          WebkitMaskImage: fade,
        }}
      />

      {/* halo difuso: as mesmas linhas bem borradas, pulsando devagar */}
      <div
        className="gb-halo absolute inset-0"
        style={{
          ...grid,
          backgroundImage: line(tint(90), 3),
          filter: 'blur(9px)',
          maskImage: fade,
          WebkitMaskImage: fade,
          animation: 'gridHalo 6s ease-in-out infinite alternate',
        }}
      />

      {/* segunda camada de brilho, ainda mais difusa, em outro ritmo */}
      <div
        className="gb-halo gb-far absolute inset-0"
        style={{
          ...grid,
          backgroundImage: line(tint(85), 4),
          filter: 'blur(20px)',
          maskImage: fade,
          WebkitMaskImage: fade,
          animation: 'gridHalo 9s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* ponto de luz que passeia pela grade, deixando as linhas mais fortes */}
      <div
        className="gb-sweep absolute inset-0"
        style={{
          ...grid,
          backgroundImage: line(tint(28)),
          maskImage: 'radial-gradient(closest-side, #000 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(closest-side, #000 0%, transparent 100%)',
          maskSize: '65% 90%',
          WebkitMaskSize: '65% 90%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          animation: 'gridSweep 16s ease-in-out infinite',
        }}
      />
    </div>
  )
}
