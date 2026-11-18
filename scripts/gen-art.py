#!/usr/bin/env python3
"""Gera o portfólio artístico: home com índice de projetos, uma página por projeto e a tela Sobre (PT e EN)."""
import os, shutil, html

ROOT = os.path.join(os.path.dirname(__file__), '..', 'site')
SITE = 'https://miguellgsr.github.io'
LI = 'https://www.linkedin.com/in/miguelsantarosa'

# slug, título, frase, categoria, arquivo, (w,h), alt PT, alt EN, frase EN, categoria EN
CASES = [
 ('tim-rock-in-rio','TIM Controle × Rock in Rio','KV do chip grátis da TIM Brasil.','Direção de arte','tim-rock-in-rio.webp',(545,306),
  'Peça da TIM Controle com o Rock in Rio: um homem salta segurando um chip, ao lado do texto Chip grátis',
  'TIM Controle and Rock in Rio piece: a man leaps holding a SIM card beside the words Free SIM','Free SIM key visual for TIM Brasil.','Art direction'),
 ('chef-bob','Chef Bob','Painel de rua com termômetro.','Direção de arte','chef-bob.webp',(913,470),
  'Painel de rua da Chef Bob com termômetro marcando 25 graus, ao lado de uma palmeira',
  'Chef Bob street panel showing 25 degrees, beside a palm tree','Street panel with a thermometer.','Art direction'),
 ('corona','Corona','Toalha de praia ilustrada.','Direção de arte','corona.webp',(917,517),
  'Toalha branca da Corona com ilustrações de baleia, arraia e águas-vivas',
  'White Corona towel with illustrations of a whale, a ray and jellyfish','Illustrated beach towel.','Art direction'),
 ('fluminense-escalacao','Fluminense: escalação','Arte de escalação para o dia do jogo.','Redes sociais','fluminense-escalacao.webp',(1043,657),
  'Arte de escalação do Fluminense: o jogador de camisa tricolor toma chimarrão ao lado da lista de titulares',
  'Fluminense line-up artwork: the player in a striped shirt drinks mate beside the starting eleven','Match-day line-up artwork.','Social media'),
 ('social-esportes','Redes sociais: esportes','Série de posts de futebol e apostas.','Redes sociais','social-esportes.webp',(1600,778),
  'Grade de oito posts de esportes para redes sociais',
  'Grid of eight sports posts for social media','Series of football and betting posts.','Social media'),
 ('betspeed','BetSpeed','Identidade e cartões de visita.','Identidade','betspeed.webp',(917,517),
  'Cartões de visita da BetSpeed sobre uma mesa de concreto',
  'BetSpeed business cards on a concrete desk','Identity and business cards.','Identity'),
]

L = {
 'pt': dict(
  lang='pt-BR', base='/', about='/sobre/', other='/en/', other_lbl='EN', other_title='Read this site in English',
  proj=lambda s: f'/projetos/{s}/', title='Miguel Santa Rosa: direção de arte',
  desc='Portfólio de Miguel Santa Rosa, diretor de arte em Niterói, RJ: KVs, campanhas e identidade visual.',
  role='Diretor de arte', place='Niterói, RJ', tag='Freelancer na BETC Havas, conta TIM Brasil',
  works='Projetos', about_btn='Sobre mim', back='Projetos', next='Próximo projeto', cat='Categoria',
  contact='Vamos conversar', contact_btn='Chamar no LinkedIn', skip='Ir para o conteúdo',
  about_h='Sobre', about_lead='Direção de arte, campanhas e identidade visual.',
  about_p=['Sou Miguel Santa Rosa, diretor de arte em Niterói, RJ. Faço KVs, campanhas e identidades visuais.',
           'Desde julho de 2026 cuido da direção de arte da conta TIM Brasil na BETC Havas, como freelancer. Estudo Publicidade e Propaganda na Estácio de Sá, com formatura prevista para 2026.2.'],
  path='Caminho', exp=[('BETC Havas','Diretor de arte, conta TIM Brasil','Jul 2026 a hoje'),
   ('Oner Travel','Ativos de Moto GP e Fórmula 1','Jan a Jun 2026'),('OnOff','Branding e KVs, incluindo Ambev','Jun 2024 a Dez 2025'),
   ('Betspeed','UI e UX, mais de 40 mil usuários','Mar a Nov 2023'),('Grupo Dupla','Conteúdo para redes sociais','Jul 2022 a Nov 2023'),
   ('Estácio de Sá','Publicidade e Propaganda','Formatura em 2026.2')],
  alt_i=6, count='projetos'),
 'en': dict(
  lang='en', base='/en/', about='/en/about/', other='/', other_lbl='PT', other_title='Ler este site em português',
  proj=lambda s: f'/en/projects/{s}/', title='Miguel Santa Rosa: art direction',
  desc='Portfolio of Miguel Santa Rosa, art director in Niterói, Brazil: key visuals, campaigns and visual identity.',
  role='Art director', place='Niterói, Brazil', tag='Freelance at BETC Havas, TIM Brasil account',
  works='Work', about_btn='About me', back='Work', next='Next project', cat='Category',
  contact="Let's talk", contact_btn='Message on LinkedIn', skip='Skip to content',
  about_h='About', about_lead='Art direction, campaigns and visual identity.',
  about_p=['I am Miguel Santa Rosa, an art director in Niterói, Brazil. I make key visuals, campaigns and visual identities.',
           'Since July 2026 I lead art direction on the TIM Brasil account at BETC Havas, as a freelancer. I am studying Advertising at Estácio de Sá, graduating in 2026.2.'],
  path='Path', exp=[('BETC Havas','Art director, TIM Brasil account','Jul 2026 to now'),
   ('Oner Travel','MotoGP and Formula 1 assets','Jan to Jun 2026'),('OnOff','Branding and key visuals, including Ambev','Jun 2024 to Dec 2025'),
   ('Betspeed','UI and UX, over 40,000 users','Mar to Nov 2023'),('Grupo Dupla','Social media content','Jul 2022 to Nov 2023'),
   ('Estácio de Sá','Advertising','Graduating 2026.2')],
  alt_i=7, count='projects'),
}

def case(k, c):
    """Campos do case no idioma k."""
    if k == 'pt':
        return dict(slug=c[0], name=c[1], line=c[2], cat=c[3], img=c[4], wh=c[5], alt=c[6])
    return dict(slug=c[0], name=c[1], line=c[8], cat=c[9], img=c[4], wh=c[5], alt=c[7])

def esc(s): return html.escape(s, quote=True)

def head(k, title, desc, path, alt_path, og=None):
    t = L[k]
    og = og or '/projects/fluminense-escalacao.webp'
    return f'''<!doctype html>
<html lang="{t['lang']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{SITE}{og}">
<link rel="canonical" href="{SITE}{path}">
<link rel="alternate" hreflang="{t['lang']}" href="{SITE}{path}">
<link rel="alternate" hreflang="{L['en' if k=='pt' else 'pt']['lang']}" href="{SITE}{alt_path}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#e2e2e2">
<link rel="preload" href="/assets/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/art.css">
</head>'''

def nav(k, alt_path, here):
    t = L[k]
    return f'''<a class="skip" href="#main">{t['skip']}</a>
<header class="top">
  <a class="top__name" href="{t['base']}" translate="no">Miguel Santa Rosa</a>
  <nav class="top__nav" aria-label="{t['works']}">
    <a class="pill{' is-on' if here=='about' else ''}" href="{t['about']}"{' aria-current="page"' if here=='about' else ''}>{t['about_btn']}</a>
    <a class="lang" href="{alt_path}" hreflang="{L['en' if k=='pt' else 'pt']['lang']}" title="{t['other_title']}">{t['other_lbl']}</a>
  </nav>
</header>'''

def foot(k):
    t = L[k]
    return f'''<footer class="foot">
  <p class="foot__big">{t['contact']}</p>
  <a class="btn" href="{LI}" target="_blank" rel="noopener">{t['contact_btn']} <span aria-hidden="true">↗</span></a>
  <p class="foot__small"><span translate="no">© 2026 Miguel Santa Rosa</span> · {t['place']}</p>
</footer>'''

def page_home(k):
    t = L[k]
    cs = [case(k, c) for c in CASES]
    rows = ''
    for i, c in enumerate(cs, 1):
        w, h = c['wh']
        rows += f'''
    <li class="idx__item">
      <a class="idx__link" href="{t['proj'](c['slug'])}" data-preview="/projects/{c['img']}">
        <span class="idx__num">{i:02d}</span>
        <span class="idx__title">{esc(c['name'])}</span>
        <span class="idx__cat">{esc(c['cat'])}</span>
        <img class="idx__thumb" src="/projects/{c['img']}" width="{w}" height="{h}" alt="{esc(c['alt'])}" loading="{'eager' if i<3 else 'lazy'}">
      </a>
    </li>'''
    alt = L['en' if k == 'pt' else 'pt']['base']
    return head(k, t['title'], t['desc'], t['base'], alt) + f'''
<body class="home">
{nav(k, alt, 'home')}
<main id="main">
  <section class="hero">
    <p class="hero__tag">{t['tag']}</p>
    <h1 class="hero__h1"><span class="hero__a" translate="no">Miguel</span> <span class="hero__b" translate="no">Santa&nbsp;Rosa</span></h1>
    <p class="hero__role">{t['role']}<span>{t['place']}</span></p>
    <a class="hero__go" href="#projetos" aria-label="{t['works']}">{t['works']} <span aria-hidden="true">↓</span></a>
  </section>
  <section class="idx" id="projetos" aria-labelledby="idx-h">
    <h2 class="idx__h" id="idx-h">{t['works']} <sup>{len(cs)}</sup></h2>
    <ol class="idx__list">{rows}
    </ol>
    <div class="peek" aria-hidden="true"><img alt="" src=""></div>
  </section>
</main>
{foot(k)}
<script src="/assets/art.js" defer></script>
</body>
</html>
'''

def page_project(k, i):
    t = L[k]
    cs = [case(k, c) for c in CASES]
    c = cs[i]; n = cs[(i + 1) % len(cs)]
    w, h = c['wh']
    alt = L['en' if k == 'pt' else 'pt']['proj'](c['slug'])
    title = f"{c['name']} · Miguel Santa Rosa"
    return head(k, title, f"{c['name']}: {c['line']}", t['proj'](c['slug']), alt, '/projects/' + c['img']) + f'''
<body class="project">
{nav(k, alt, 'project')}
<main id="main">
  <a class="back" href="{t['base']}#projetos"><span aria-hidden="true">←</span> {t['back']}</a>
  <header class="proj__head">
    <p class="proj__num">{i+1:02d} / {len(cs):02d}</p>
    <h1 class="proj__h1">{esc(c['name'])}</h1>
    <p class="proj__line">{esc(c['line'])}</p>
    <dl class="proj__meta"><div><dt>{t['cat']}</dt><dd>{esc(c['cat'])}</dd></div></dl>
  </header>
  <figure class="proj__fig">
    <img src="/projects/{c['img']}" width="{w}" height="{h}" alt="{esc(c['alt'])}" style="max-width:{int(w*1.6)}px">
  </figure>
  <a class="next" href="{t['proj'](n['slug'])}">
    <span class="next__k">{t['next']}</span>
    <span class="next__t">{esc(n['name'])} <span aria-hidden="true">→</span></span>
  </a>
</main>
{foot(k)}
</body>
</html>
'''

def page_about(k):
    t = L[k]
    alt = L['en' if k == 'pt' else 'pt']['about']
    ps = ''.join(f'<p>{esc(p)}</p>' for p in t['about_p'])
    ex = ''.join(f'<li><span class="ex__n">{esc(a)}</span><span class="ex__r">{esc(b)}</span><span class="ex__d">{esc(c)}</span></li>' for a, b, c in t['exp'])
    return head(k, f"{t['about_h']} · Miguel Santa Rosa", t['desc'], t['about'], alt) + f'''
<body class="about">
{nav(k, alt, 'about')}
<main id="main">
  <a class="back" href="{t['base']}"><span aria-hidden="true">←</span> {t['back']}</a>
  <h1 class="about__h1">{t['about_h']}</h1>
  <p class="about__lead">{t['about_lead']}</p>
  <div class="about__cols">
    <div class="about__txt">{ps}</div>
    <div>
      <h2 class="about__h2">{t['path']}</h2>
      <ul class="ex">{ex}</ul>
    </div>
  </div>
</main>
{foot(k)}
</body>
</html>
'''

def write(path, content):
    full = os.path.join(ROOT, path.lstrip('/'), 'index.html')
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    # remove o kit antigo e as páginas anteriores; mantém só fontes, capas e favicon
    for d in os.listdir(os.path.join(ROOT, 'assets')):
        if d != 'fonts':
            p = os.path.join(ROOT, 'assets', d)
            shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)
    for k in ('pt', 'en'):
        t = L[k]
        write(t['base'], page_home(k))
        write(t['about'], page_about(k))
        for i, c in enumerate(CASES):
            write(t['proj'](c[0]), page_project(k, i))
    here = os.path.dirname(__file__)
    shutil.copy(os.path.join(here, 'art.css'), os.path.join(ROOT, 'assets', 'art.css'))
    shutil.copy(os.path.join(here, 'art.js'), os.path.join(ROOT, 'assets', 'art.js'))
    print('ok')

main()
