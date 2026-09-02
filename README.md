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

## Como trocar pelas imagens reais

O layout está 100% funcional com ilustrações em SVG (estilo line art) nas
cores da marca, só pra já deixar a página completa e navegável até vocês
mandarem as imagens de verdade. Como o upload é limitado a poucas imagens
por mensagem, o mais rápido é ir mandando aos poucos — em cada mensagem,
já diz pra qual ilustração é cada uma (ex: "essa é a do hero", "essa é a
da seção de benefícios") que eu vou substituindo aos poucos:

1. Hero (laptop + olho)
2. "A gente se importa de verdade" (ilustração ao lado do texto)
3. Benefícios (laptop + megafone)
4. FAQ (lupa)
5. Cases (3 thumbnails)
6. Ícones dos 4 cards de "não é simples" e dos 6 cards de serviços (se
   tiverem versão própria — hoje são ícones de linha simples)

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
