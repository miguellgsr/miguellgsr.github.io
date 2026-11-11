// Descobre a cor principal de uma imagem (a mais viva), para tingir o fundo.
export async function dominantColor(src: string): Promise<string> {
  const img = new Image()
  img.src = src
  await img.decode()
  const size = 48
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return 'rgb(120, 120, 120)'
  ctx.drawImage(img, 0, 0, size, size)
  const data = ctx.getImageData(0, 0, size, size).data

  // Agrupa por matiz (24 faixas), dando mais peso a pixels saturados e claros.
  const buckets = Array.from({ length: 24 }, () => ({ w: 0, r: 0, g: 0, b: 0 }))
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const v = max / 255
    const sat = max === 0 ? 0 : (max - min) / max
    if (v < 0.18 || sat < 0.12) continue
    const d = max - min
    let h = 0
    if (d) {
      if (max === r) h = ((g - b) / d) % 6
      else if (max === g) h = (b - r) / d + 2
      else h = (r - g) / d + 4
      h = (h * 60 + 360) % 360
    }
    const k = buckets[Math.floor(h / 15) % 24]
    const w = sat * sat * v
    k.w += w; k.r += r * w; k.g += g * w; k.b += b * w
  }
  const best = buckets.reduce((a, b) => (b.w > a.w ? b : a))
  if (best.w < 1) return 'rgb(120, 120, 120)' // imagem sem cor forte: cinza neutro
  return vivid(best.r / best.w, best.g / best.w, best.b / best.w)
}

// Deixa a cor mais viva (saturação alta, brilho médio), como no degradê de referência.
function vivid(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h = (h * 60 + 360) % 360
  }
  return `hsl(${Math.round(h)}, 92%, 52%)`
}
