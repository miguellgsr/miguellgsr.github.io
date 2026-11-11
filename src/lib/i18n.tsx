import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'pt' | 'en'
/** Um texto nos dois idiomas. */
export type L = { pt: string; en: string }

const KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    /* sem acesso ao armazenamento: segue o idioma do navegador */
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'pt'
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (text: L) => string }
const LangContext = createContext<Ctx | null>(null)

// Guarda o idioma escolhido no navegador, para valer em todas as páginas.
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* ignora */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (text) => text[lang] }),
    [lang, setLang],
  )
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang precisa estar dentro do LangProvider')
  return ctx
}
