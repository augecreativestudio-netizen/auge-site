# Auge — Landing Page

Landing page one-page da Auge, construída em HTML + CSS + JS puros (sem
build step) seguindo a identidade visual da marca.

## Identidade visual

| Uso | Cor |
|---|---|
| Marrom (destaque/CTA) | `#a75f1e` |
| Verde (fundo escuro/títulos) | `#1b4330` |
| Bege claro (fundo claro) | `#efe9d3` |

**Fontes:** Calistoga (títulos) é auto-hospedada com o arquivo oficial da
marca em `fonts/`. Poppins (corpo de texto) e Caveat (destaques manuscritos)
são carregadas via Google Fonts no `<head>` do `index.html`.

## Estrutura

```
index.html        → estrutura da página (todas as seções)
css/style.css      → design system, layout, responsivo e animações
js/script.js       → menu mobile, header on-scroll, reveal on-scroll, FAQ, formulário
img/               → ilustrações e ícones (atualmente SVGs desenhados à mão para preencher o layout)
fonts/             → Calistoga-Regular (.woff2 + .ttf, auto-hospedada)
```

## Imagens reais já aplicadas

- **Hero** (laptop + olho) → `img/hero-laptop-eye.png`
- **"A gente se importa de verdade"** → aperto de mãos como imagem
  principal (`img/care-handshake.png`), com o gesto de mão
  (`img/care-hand-snap.png`) e as moedas (`img/care-coins.png`) flutuando
  ao redor, no mesmo estilo do hero
- **CTA final** (megafone) → `img/cta-megaphone.png`
- **4 ícones de "não é simples"**: `img/problem-time.png`,
  `img/problem-invest.png`, `img/problem-direction.png`,
  `img/problem-support.png`
- **6 ícones de serviços**: `img/service-social.png`,
  `img/service-ads.png`, `img/service-sites.png`,
  `img/service-branding.png`, `img/service-copywriting.png`,
  `img/service-consulting.png`
- **Benefícios**: laptop com o olho da marca como imagem principal
  (`img/benefits-laptop.png`), com o megafone
  (`img/benefits-megaphone.png`) e o punho (`img/benefits-fist.png`)
  flutuando ao redor
- **FAQ** (lupa) → `img/faq-magnifier.png`
- **Check dos benefícios** → `img/check-badge.png`
- **Sparkle decorativo** perto do título "O que fazemos?" →
  `img/sparkle.png`

Cada uma tem uma versão `.webp` gerada automaticamente (bem mais leve) que
carrega primeiro via `<picture>`, com o `.png` original como fallback.

## O que ainda falta

Como o upload é limitado a poucas imagens por mensagem, o mais rápido é
ir mandando aos poucos — em cada mensagem, já diz pra qual ilustração é
cada uma. **Importante**: mande como anexo/arquivo (não colado direto na
mensagem), senão eu só consigo ver a imagem, não salvar o arquivo.

1. Fotos/thumbnails dos 3 cases (hoje é um placeholder listrado)

Pode mandar em PNG, SVG ou WebP, do jeito que tiver.

## Já atualizado com dados reais

- Instagram: [@auge.cs](https://instagram.com/auge.cs)
- TikTok: [@auge.cs](https://tiktok.com/@auge.cs)
- WhatsApp: (48) 99246-9043
- E-mail: augecreativestudio@gmail.com

## Pendente

**Formulário de contato**: o formulário final está com um placeholder de
envio (`js/script.js`) — só mostra uma mensagem de confirmação, não envia
pra lugar nenhum ainda. Me digam se querem integrar com e-mail, WhatsApp,
Google Sheets, CRM etc. para eu conectar de verdade.

## Rodando localmente

Não precisa de build. Basta abrir `index.html` no navegador, ou servir a
pasta com qualquer servidor estático, por exemplo:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Recursos implementados

- Header fixo (sticky) com sombra dinâmica ao rolar e menu mobile animado
- Hero com ilustração flutuante (laptop + "olho" da marca)
- Seções de dor/solução, processo (linha do tempo numerada), serviços,
  benefícios, cases e FAQ em acordeão
- Animações de entrada ao rolar a página (`IntersectionObserver`)
- Micro-interações em cards, botões e badges (hover/lift)
- Totalmente responsivo (mobile, tablet, desktop)
- Respeita `prefers-reduced-motion` para acessibilidade
