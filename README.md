# Auge — Landing Page

Landing page one-page da Auge, construída em HTML + CSS + JS puros (sem
build step) seguindo a identidade visual da marca.

## Identidade visual

| Uso | Cor |
|---|---|
| Marrom (destaque/CTA) | `#a75f1e` |
| Verde (fundo escuro/títulos) | `#1b4330` |
| Bege claro (fundo claro) | `#efe9d3` |

**Fontes:** Calistoga (títulos), Poppins (corpo de texto) e Caveat (destaques
manuscritos). Por padrão elas são carregadas via Google Fonts no
`<head>` do `index.html`.

## Estrutura

```
index.html        → estrutura da página (todas as seções)
css/style.css      → design system, layout, responsivo e animações
js/script.js       → menu mobile, header on-scroll, reveal on-scroll, FAQ, formulário
img/               → ilustrações e ícones (atualmente SVGs desenhados à mão para preencher o layout)
fonts/             → pasta pronta para fontes auto-hospedadas (opcional)
```

## Como trocar pelas imagens/fontes reais

O layout está 100% funcional com ilustrações em SVG (estilo line art) nas
cores da marca, só pra já deixar a página completa e navegável. Para usar
os arquivos reais de vocês:

1. **Imagens/ilustrações**: mande os arquivos (PNG/SVG/WebP) que eu troco
   cada ilustração (hero, seção "a gente se importa", benefícios, FAQ etc.)
   pelos arquivos reais em `img/`.
2. **Fontes**: se vocês tiverem os arquivos das fontes (Calistoga, Poppins,
   Caveat) para hospedar localmente em vez de usar o Google Fonts, é só
   mandar os `.woff2` que eu adiciono em `fonts/` e ajusto o `@font-face`
   no `style.css`.
3. **Redes sociais / WhatsApp**: os links do rodapé (`Instagram`,
   `WhatsApp`, `E-mail`) estão com placeholders — me passem os links/telefone
   reais para eu atualizar.
4. **Formulário de contato**: o formulário final está com um placeholder de
   envio (`js/script.js`). Me digam se querem integrar com e-mail, WhatsApp,
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
