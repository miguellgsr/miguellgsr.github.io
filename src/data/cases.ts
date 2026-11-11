import type { L } from '@/lib/i18n'

export type Case = {
  slug: string
  title: string
  category: L
  /** Caminho da capa dentro da pasta "public" (sem a barra inicial). */
  cover: string
  summary: L
  /** Loop curto (mp4/webm) em public/projects/, opcional. Toca no carrossel e na página do case. */
  preview?: string
}

// Lista dos cases. Para adicionar um projeto novo:
// 1) coloque a capa em public/projects/
// 2) inclua mais um bloco aqui (o endereço da página vem do "slug").
export const cases: Case[] = [
  {
    slug: 'betspeed',
    title: 'BetSpeed',
    category: { pt: 'Identidade visual', en: 'Visual identity' },
    cover: 'projects/betspeed.webp',
    summary: { pt: 'Texto do case em breve.', en: 'Case write-up coming soon.' },
  },
  {
    slug: 'tim-controle-rock-in-rio',
    title: 'TIM Controle × Rock in Rio',
    category: { pt: 'Direção de arte', en: 'Art direction' },
    cover: 'projects/tim-rock-in-rio.webp',
    summary: { pt: 'Texto do case em breve.', en: 'Case write-up coming soon.' },
  },
  {
    slug: 'chef-bob',
    title: 'Chef Bob',
    category: { pt: 'Direção de arte', en: 'Art direction' },
    cover: 'projects/chef-bob.webp',
    summary: { pt: 'Texto do case em breve.', en: 'Case write-up coming soon.' },
  },
  {
    slug: 'corona',
    title: 'Corona',
    category: { pt: 'Direção de arte', en: 'Art direction' },
    cover: 'projects/corona.webp',
    summary: { pt: 'Texto do case em breve.', en: 'Case write-up coming soon.' },
  },
  {
    slug: 'fluminense-escalacao',
    title: 'Fluminense — Escalação',
    category: { pt: 'Redes sociais', en: 'Social media' },
    cover: 'projects/fluminense-escalacao.webp',
    summary: { pt: 'Texto do case em breve.', en: 'Case write-up coming soon.' },
  },
  {
    slug: 'social-esportes',
    title: 'Redes sociais — Esportes',
    category: { pt: 'Redes sociais', en: 'Social media' },
    cover: 'projects/social-esportes.webp',
    summary: { pt: 'Texto do case em breve.', en: 'Case write-up coming soon.' },
  },
]

/** Monta o endereço da imagem respeitando a pasta base do site. */
export function coverUrl(cover: string) {
  return `${import.meta.env.BASE_URL}${cover}`
}
