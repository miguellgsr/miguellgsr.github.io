// Publica o site novo (pasta "site") em "dist". Sem bundler: HTML, CSS e JS estáticos.
import { cpSync, rmSync } from 'node:fs'
rmSync('dist', { recursive: true, force: true })
cpSync('site', 'dist', { recursive: true })
console.log('site publicado em dist/')
