import re
T = {
 'pt': dict(
  lang='pt-BR', pre='', quick='Ação rápida', skip='Ir para o conteúdo', menu='Menu', main='Principal',
  title='Miguel Santa Rosa: diretor de arte para campanhas e marcas',
  desc='Diretor de arte em Niterói, RJ: KVs, campanhas e identidade visual. Hoje na conta da TIM Brasil, na BETC Havas.',
  n_cases='Cases', n_serv='Serviços', n_exp='Experiência', n_contact='Contato',
  action='Falar pelo LinkedIn',
  kicker='Freelancer na BETC Havas desde julho de 2026',
  h1='Direção de arte para campanhas',
  lead='Miguel Santa Rosa cria KVs, campanhas e identidades visuais. Hoje cuida da direção de arte da TIM Brasil na BETC Havas.',
  see='Ver os cases',
  f1=('Na estrada','Desde 2022'), f2=('Agência','BETC Havas'), f3=('Conta','TIM Brasil'),
  hero_alt='Arte de escalação do Fluminense: o jogador de camisa tricolor toma chimarrão ao lado da lista de titulares',
  cases_h='6 cases de campanha, marca e redes',
  cases_p='',
  cases=[
   ('tim','TIM Controle × Rock in Rio','KV do chip grátis da TIM Brasil.','Direção de arte','tim-rock-in-rio.webp','Peça da TIM Controle com o Rock in Rio: um homem salta segurando um chip, ao lado do texto Chip grátis'),
   ('bob','Chef Bob','Painel de rua com termômetro.','Direção de arte','chef-bob.webp','Painel de rua da Chef Bob com termômetro marcando 25 graus, ao lado de uma palmeira'),
   ('corona','Corona','Toalha de praia ilustrada.','Direção de arte','corona.webp','Toalha branca da Corona com ilustrações de baleia, arraia e águas-vivas'),
   ('flu','Fluminense: escalação','Arte de escalação para o dia do jogo.','Redes sociais','fluminense-escalacao.webp','Arte de escalação do Fluminense com o jogador tomando chimarrão'),
   ('esportes','Redes sociais: esportes','Série de posts de futebol e apostas.','Redes sociais','social-esportes.webp','Grade de oito posts de esportes para redes sociais'),
   ('bet','BetSpeed','Identidade e cartões de visita.','Identidade','betspeed.webp','Cartões de visita da BetSpeed sobre uma mesa de concreto'),
  ],
  serv_h='3 frentes de trabalho',
  serv_p='O que entrego, do KV ao post.',
  serv=[
   ('Direção de arte de campanhas','KVs da TIM Brasil, do Dia dos Pais à Black Friday.'),
   ('Identidade visual','Branding e KVs, incluindo a Ambev.'),
   ('Conteúdo para redes sociais','Posts em série, de 300 mil a 3 milhões de seguidores.'),
  ],
  serv_alt='Grade de oito posts de esportes para redes sociais',
  exp_alt='Painel de rua da Chef Bob com termômetro marcando 25 graus',
  stmt_label='Hoje',
  stmt='Faço a direção de arte da conta <strong>TIM Brasil</strong> na BETC Havas: KVs e desdobramentos de campanhas como Rock in Rio, Black Friday, Dia do Cliente e os dobráveis da Samsung.',
  exp_h='5 empresas e uma faculdade',
  exp_p='Da gestão de conteúdo ao KV de campanha.',
  exp=[
   ('BETC Havas','Diretor de arte, conta TIM Brasil.','Jul&nbsp;2026 a hoje'),
   ('Oner Travel','Ativos de Moto GP e Fórmula 1.','Jan a Jun&nbsp;2026'),
   ('OnOff','Branding e KVs, incluindo Ambev.','Jun&nbsp;2024 a Dez&nbsp;2025'),
   ('Betspeed','UI e UX, mais de 40 mil usuários.','Mar a Nov&nbsp;2023'),
   ('Grupo Dupla','Conteúdo para redes sociais.','Jul&nbsp;2022 a Nov&nbsp;2023'),
   ('Estácio de Sá','Publicidade e Propaganda, em Niterói.','Formatura em 2026.2'),
  ],
  close_h='Fale com Miguel',
  close_p='Mensagem direta pelo LinkedIn, para campanhas e projetos de marca.',
  lede='Direção de arte, campanhas e identidade visual. Niterói, RJ.',
  f_work='Trabalho', f_me='Miguel',
  year='© 2026 Miguel Santa Rosa',
  alt_href='en/', alt_lbl='English', alt_title='Read this page in English',
  pref='',
 ),
 'en': dict(
  lang='en', pre='../', quick='Quick action', skip='Skip to content', menu='Menu', main='Main',
  title='Miguel Santa Rosa: art director for campaigns and brands',
  desc='Art director in Niterói, Brazil: key visuals, campaigns and visual identity. Now on the TIM Brasil account at BETC Havas.',
  n_cases='Work', n_serv='Services', n_exp='Experience', n_contact='Contact',
  action='Message on LinkedIn',
  kicker='Freelance at BETC Havas since July 2026',
  h1='Art direction for campaigns',
  lead='Miguel Santa Rosa makes key visuals, campaigns and visual identities. Today he leads art direction for TIM Brasil at BETC Havas.',
  see='See the work',
  f1=('In the field','Since 2022'), f2=('Agency','BETC Havas'), f3=('Account','TIM Brasil'),
  hero_alt='Fluminense line-up artwork: the player in a striped shirt drinks mate beside the starting eleven',
  cases_h='6 cases in campaigns, brands and social',
  cases_p='',
  cases=[
   ('tim','TIM Controle × Rock in Rio','Free SIM key visual for TIM Brasil.','Art direction','tim-rock-in-rio.webp','TIM Controle and Rock in Rio piece: a man leaps holding a SIM card beside the words Free SIM'),
   ('bob','Chef Bob','Street panel with a thermometer.','Art direction','chef-bob.webp','Chef Bob street panel showing 25 degrees, beside a palm tree'),
   ('corona','Corona','Illustrated beach towel.','Art direction','corona.webp','White Corona towel with illustrations of a whale, a ray and jellyfish'),
   ('flu','Fluminense: line-up','Match-day line-up artwork.','Social media','fluminense-escalacao.webp','Fluminense line-up artwork with the player drinking mate'),
   ('esportes','Social media: sports','Series of football and betting posts.','Social media','social-esportes.webp','Grid of eight sports posts for social media'),
   ('bet','BetSpeed','Identity and business cards.','Identity','betspeed.webp','BetSpeed business cards on a concrete desk'),
  ],
  serv_h='3 lines of work',
  serv_p='What I deliver, from key visual to post.',
  serv=[
   ('Campaign art direction','TIM Brasil key visuals, from Father’s Day to Black Friday.'),
   ('Visual identity','Branding and key visuals, including Ambev.'),
   ('Social media content','Post series, from 300K to 3 million followers.'),
  ],
  serv_alt='Grid of eight sports posts for social media',
  exp_alt='Chef Bob street panel showing 25 degrees',
  stmt_label='Today',
  stmt='I lead art direction on the <strong>TIM Brasil</strong> account at BETC Havas: key visuals and adaptations for campaigns like Rock in Rio, Black Friday, Customer Day and the Samsung foldables.',
  exp_h='5 companies and a degree',
  exp_p='From social content to campaign key visuals.',
  exp=[
   ('BETC Havas','Art director, TIM Brasil account.','Jul&nbsp;2026 to now'),
   ('Oner Travel','MotoGP and Formula 1 assets.','Jan to Jun&nbsp;2026'),
   ('OnOff','Branding and key visuals, including Ambev.','Jun&nbsp;2024 to Dec&nbsp;2025'),
   ('Betspeed','UI and UX, over 40,000 users.','Mar to Nov&nbsp;2023'),
   ('Grupo Dupla','Social media content.','Jul&nbsp;2022 to Nov&nbsp;2023'),
   ('Estácio de Sá','Advertising, in Niterói.','Graduating 2026.2'),
  ],
  close_h='Talk to Miguel',
  close_p='A direct message on LinkedIn, for campaigns and brand projects.',
  lede='Art direction, campaigns and visual identity. Niterói, Brazil.',
  f_work='Work', f_me='Miguel',
  year='© 2026 Miguel Santa Rosa',
  alt_href='../', alt_lbl='Português', alt_title='Ler esta página em português',
  pref='',
 ),
}
ARROW='<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8"/><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5"/></svg>'
LI='https://www.linkedin.com/in/miguelsantarosa'
ROOT = """:root {
  color-scheme: light;
  --p-bg: #e2e2e2; --p-surface: #d6d6d6; --p-ink: #7d0c14; --p-muted: #7a4a4e;
  --p-accent: #7d0c14; --p-accent-ink: #e2e2e2; --p-action: #7d0c14; --p-action-ink: #e2e2e2;
  --p-inv-bg: #7d0c14; --p-inv-surface: #862323; --p-inv-ink: #e2e2e2; --p-inv-muted: #d0b3af;
  --p-inv-accent: #e2e2e2; --p-inv-accent-ink: #7d0c14; --p-inv-action: #e2e2e2; --p-inv-action-ink: #7d0c14;
  --font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --font-text: "Figtree", system-ui, sans-serif;
  --display-weight: 400;
  --display-tracking: -0.03em;
  --display-tracking-xl: -0.04em;
  --display-stretch: 96%;
  --ly-scale: 1.04;
}"""
DIM={'betspeed.webp':(917,517),'chef-bob.webp':(913,470),'corona.webp':(917,517),'fluminense-escalacao.webp':(1043,657),'social-esportes.webp':(1600,778),'tim-rock-in-rio.webp':(545,306)}
def wh(f): return f'width="{DIM[f][0]}" height="{DIM[f][1]}"'
def build(k):
    t=T[k]; p=t['pre']; img=p+'projects/'
    rows=''.join(f'<li data-peek-to="{c[0]}" tabindex="0"><span class="rows__name">{c[1]}</span><p>{c[2]}</p><span class="rows__value">{c[3]}</span></li>' for c in t['cases'])
    pics=''.join(f'<img class="frame__img" data-peek-for="{c[0]}" src="{img}{c[4]}" {wh(c[4])} alt="{c[5]}"{" hidden" if i else ""}>' for i,c in enumerate(t['cases']))
    serv=''.join(f'<li><span class="rows__name">{a}</span><p>{b}</p></li>' for a,b in t['serv'])
    exp=''.join(f'<li><span class="rows__name">{a}</span><p>{b}</p><span class="rows__value">{c}</span></li>' for a,b,c in t['exp'])
    return f'''<!doctype html>
<html lang="{t['lang']}" data-type="service" data-radius="soft" data-buttons="solid" data-motion>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{t['title']}</title>
<meta name="description" content="{t['desc']}">
<meta property="og:type" content="website">
<meta property="og:title" content="{t['title']}">
<meta property="og:description" content="{t['desc']}">
<meta property="og:image" content="{p}share.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{p}favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#e2e2e2">
<link rel="alternate" hreflang="pt-BR" href="{p or './'}">
<link rel="alternate" hreflang="en" href="{p}en/">
<meta name="site-kind" content="other">
<meta name="page-type" content="service">
<link rel="preload" href="{p}assets/fonts/bricolage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{p}assets/fonts/figtree.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{p}assets/system.css">
<link rel="stylesheet" href="{p}assets/ui/cards.css">
<link rel="stylesheet" href="{p}assets/motion/motion.css">
<link rel="stylesheet" href="{p}assets/backgrounds/backgrounds.css">
<link rel="stylesheet" href="{p}assets/layout/layout.css">
<link rel="stylesheet" href="{p}assets/icons/icon.css">
<style>
@font-face {{ font-family: "Bricolage Grotesque"; font-style: normal; font-weight: 200 800; font-stretch: 75% 100%; font-display: swap; src: url({p}assets/fonts/bricolage.woff2) format("woff2"); }}
@font-face {{ font-family: "Figtree"; font-style: normal; font-weight: 300 900; font-display: swap; src: url({p}assets/fonts/figtree.woff2) format("woff2"); }}
{ROOT}
</style>
<style>
  .hero__media img {{ --ly-pos: 72% 50%; object-position: 72% 50%; }}
  h1, h2 {{ text-wrap: balance; }}
  a, button {{ touch-action: manipulation; }}
  @media (min-width: 640px) and (max-width: 1023px) {{ #servicos .frame, #experiencia .frame {{ aspect-ratio: 16 / 9 !important; }} }}
  .lang-switch {{ font-size: 15px; font-weight: 500; margin-left: 12px; }}
  @media (max-width: 639px) {{ .hero__media img {{ object-position: 78% 50%; }} }}
</style>
<script>document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)</script>
<script src="{p}assets/backgrounds/backgrounds.js"></script>
<script>document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)</script>
<link rel="modulepreload" href="{p}assets/moments/moments.js">
<link rel="modulepreload" href="{p}assets/moments/lib.js">
<link rel="modulepreload" href="{p}assets/moments/word-highlight/moment.js">
</head>
<body>
<!-- type: service
     deal: hero split, nav nav-centre, close close-type, footer footer-columns, rhythm surface-pairs, buttons solid (re-dealt from arrow: its secondary sat 9px off the left line at 1024), mark dots, grounds none
     moments: word-highlight in #hoje -->
<header class="nav nav--centre">
  <div class="wrap nav__bar">
    <a class="skip-link" href="#top">{t['skip']}</a>
    <a class="nav__logo" href="#top"><span class="mark" data-mark="dots" aria-hidden="true"></span><span translate="no">Miguel Santa Rosa</span></a>
    <nav class="nav__links" aria-label="{t['main']}">
      <div class="nav__item"><a class="nav__link" href="#cases">{t['n_cases']}</a></div>
      <div class="nav__item"><a class="nav__link" href="#servicos">{t['n_serv']}</a></div>
      <div class="nav__item"><a class="nav__link" href="#experiencia">{t['n_exp']}</a></div>
      <div class="nav__item"><a class="nav__link" href="#contact">{t['n_contact']}</a></div>
    </nav>
    <div class="nav__actions">
      <a class="nav__link lang-switch" href="{t['alt_href']}" hreflang="{'en' if k=='pt' else 'pt-BR'}" lang="{'en' if k=='pt' else 'pt-BR'}" title="{t['alt_title']}">{t['alt_lbl']}</a>
      <a class="btn btn--primary" href="{LI}" rel="noopener">{t['action']}</a>
    </div>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-label="{t['menu']}">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>

<main id="top">
  <section class="hero hero--split" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text grid hero__grid">
      <div class="hero__text span-5">
        <p class="hero__kicker"><span class="dot" aria-hidden="true"></span>{t['kicker']}</p>
        <h1 id="hero-h">{t['h1']}</h1>
        <p class="hero__lead">{t['lead']}</p>
        <div class="btn-row"><a class="btn btn--primary" href="{LI}" rel="noopener">{t['action']}{ARROW}</a><a class="btn btn--secondary" href="#cases">{t['see']}</a></div>
      </div>
      <div class="hero__media span-6 start-7">
        <img src="{img}fluminense-escalacao.webp" {wh("fluminense-escalacao.webp")} alt="{t['hero_alt']}" fetchpriority="high">
      </div>
    </div></div>
  </section>

  <section class="section" id="cases" style="--hm: 2" aria-labelledby="cases-h">
    <div class="wrap">
      <div class="section-head"><h2 id="cases-h">{t['cases_h']}</h2></div>
      <div class="grid grid--top fill" data-peek>
        <ul class="rows span-6">{rows}</ul>
        <div class="frame frame--photo frame--fill span-6 start-7">{pics}</div>
      </div>
    </div>
  </section>

  <section class="section ground-surface" id="servicos" style="--hm: 2" aria-labelledby="serv-h">
    <div class="wrap">
      <div class="grid grid--top fill">
        <div class="span-5 stack-4">
          <div class="section-head"><h2 id="serv-h">{t['serv_h']}</h2><p>{t['serv_p']}</p></div>
          <ul class="rows">{serv}</ul>
        </div>
        <div class="frame frame--photo span-6 start-7" style="aspect-ratio: 4 / 3"><img class="frame__img" src="{img}social-esportes.webp" {wh("social-esportes.webp")} alt="{t['serv_alt']}" loading="lazy"></div>
      </div>
    </div>
  </section>

  <section class="section statement" id="hoje" data-moment="word-highlight" aria-label="{t['stmt_label']}">
    <div class="wrap">
      <p class="t-label">{t['stmt_label']}</p>
      <p class="mo-wh__text">{t['stmt']}</p>
    </div>
  </section>

  <section class="section" id="experiencia" style="--hm: 2" aria-labelledby="exp-h">
    <div class="wrap">
      <div class="section-head"><h2 id="exp-h">{t['exp_h']}</h2><p>{t['exp_p']}</p></div>
      <div class="grid grid--top fill">
        <ul class="rows span-6">{exp}</ul>
        <div class="frame frame--photo span-6 start-7" style="aspect-ratio: 4 / 3"><img class="frame__img" src="{img}chef-bob.webp" {wh("chef-bob.webp")} alt="{t['exp_alt']}" loading="lazy"></div>
      </div>
    </div>
  </section>
</main>

<footer class="footer closing" id="contact" aria-labelledby="close-h">
  <div class="wrap">
    <div class="closing__cta close--type">
      <div class="section-head"><h2 id="close-h">{t['close_h']}</h2><p>{t['close_p']}</p></div>
      <a class="btn btn--primary btn--xl btn--wide" href="{LI}" rel="noopener">{t['action']}{ARROW}</a>
    </div>
    <div class="closing__links">
      <div class="grid">
        <div class="span-6 stack-4">
          <a class="nav__logo" href="#top"><span class="mark" data-mark="dots" aria-hidden="true"></span><span translate="no">Miguel Santa Rosa</span></a>
          <p class="footer__lede">{t['lede']}</p>
        </div>
        <div class="span-3 start-7 footer__col"><h3>{t['f_work']}</h3><ul><li><a href="#cases">{t['n_cases']}</a></li><li><a href="#servicos">{t['n_serv']}</a></li></ul></div>
        <div class="span-3 footer__col"><h3>{t['f_me']}</h3><ul><li><a href="#experiencia">{t['n_exp']}</a></li><li><a href="{LI}" rel="noopener">LinkedIn</a></li><li><a href="{t['alt_href']}" hreflang="{'en' if k=='pt' else 'pt-BR'}" lang="{'en' if k=='pt' else 'pt-BR'}">{t['alt_lbl']}</a></li></ul></div>
      </div>
      <div class="footer__legal"><span>{t['year']}</span><div class="socials"></div></div>
    </div>
  </div>
</footer>

<nav class="actionbar" aria-label="{t['quick']}"><a class="btn btn--primary" href="{LI}" rel="noopener">{t['action']}</a></nav>

<script type="module" src="{p}assets/system.js"></script>
<script type="module" src="{p}assets/motion/motion.js"></script>
<script type="module" src="{p}assets/layout/layout.js"></script>
</body>
</html>
'''
open('site/index.html','w').write(build('pt'))
open('site/en/index.html','w').write(build('en'))
