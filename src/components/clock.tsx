import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'America/Sao_Paulo',
})

// Relógio no horário de Brasília (GMT-3).
export function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="text-xs tabular-nums text-muted-foreground">
      {formatter.format(now)} GMT-3
    </span>
  )
}
