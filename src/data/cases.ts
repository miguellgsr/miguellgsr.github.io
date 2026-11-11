export type Case = {
  slug: string
  title: string
  year: string
  role: string
  summary: string
}

// Lista dos cases. Para adicionar um projeto novo, basta incluir
// mais um bloco aqui (o endereço da página vem do "slug").
export const cases: Case[] = [
  {
    slug: 'projeto-01',
    title: 'Projeto 01',
    year: '2026',
    role: 'Direção de arte',
    summary: 'Resumo do case. O texto de verdade entra aqui.',
  },
  {
    slug: 'projeto-02',
    title: 'Projeto 02',
    year: '2026',
    role: 'Identidade visual',
    summary: 'Resumo do case. O texto de verdade entra aqui.',
  },
  {
    slug: 'projeto-03',
    title: 'Projeto 03',
    year: '2026',
    role: 'Direção de arte',
    summary: 'Resumo do case. O texto de verdade entra aqui.',
  },
]
