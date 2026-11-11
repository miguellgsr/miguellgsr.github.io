// O GitHub Pages só serve páginas que existem como arquivo.
// Copiando o index.html para 404.html, endereços como /about
// continuam abrindo o site normalmente ao recarregar a página.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
