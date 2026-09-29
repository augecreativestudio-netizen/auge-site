# Critérios de pontuação

A Auge busca empresas que já têm estrutura para pagar uma gestão de anúncios, que cuidam da presença digital e que ainda não exploram mídia paga. Cada critério abaixo mede um desses pontos.

| Critério | Pontos | Por que importa |
|---|---|---|
| Tempo de mercado ≥ 5 anos | 3 | Empresa estável, com fluxo de caixa para investir em mídia e gestão. |
| Post no Instagram nos últimos 31 dias | 2 | Alguém cuida do marketing; há conteúdo para virar anúncio e um interlocutor interessado. |
| Nota Google ≥ 4,5 com ≥ 10 avaliações | 2 | Boa reputação converte o tráfego que os anúncios trazem. |
| Nota Google ≥ 4,0 (sem cumprir o anterior) | 1 | |
| Não anuncia no Meta **nem** no Google | 3 | É a oportunidade principal: começar do zero. |
| Não anuncia em apenas um dos dois | 1 | Dá para vender o canal que falta. |
| Outros sinais (`sinais_extras`, 0 a 3) | 0–3 | Veja abaixo. |

Critério "não verificado" ou dado "não encontrado" vale 0: a lista não deve subir um lead por um fato que ninguém confirmou.

**Prioridade:** Alta ≥ 8 · Média 5–7 · Baixa ≤ 4 (máximo 13).

Um lead que já anuncia nos dois canais não é descartado: ele cai de prioridade, e o motivo para prospectar muda para "otimizar/assumir a gestão". Diga isso no campo `motivo`.

## Outros sinais (`sinais_extras`)

Dê 1 ponto por sinal confirmado com fonte, até 3:
- Estrutura: fábrica própria, showroom, equipe, várias unidades, mais de um sócio.
- Ticket alto ou público de alta renda (alto padrão, CASACOR, bairros nobres).
- Dependência declarada de indicação ("90% dos clientes vêm por indicação").
- Destino pronto para anúncios: site com WhatsApp/formulário, oferta de entrada (visita ou orçamento grátis).
- Decisor identificado (nome e cargo).
- Crescimento/expansão: página para nova cidade, contratações, nova loja.

Sinais negativos (não somam, mas registre em `sinais` e no `motivo`): Reclame Aqui com muitas queixas sem resposta, site fora do ar, empresa aparentemente fechada.

## Formato do JSON

Uma lista de objetos, um por lead. Campos desconhecidos: `null`. Não invente valores para preencher.

```json
[
  {
    "lead": "Marcenaria Steinbach",
    "site": "https://www.marcenariasteinbach.com.br/",
    "telefone": "(48) 3093-5880 / (48) 99605-5656",
    "instagram": "https://www.instagram.com/marcenariasteinbach/",
    "endereco": "Rua Vitor Meirelles, 11",
    "cidade_bairro": "Jardim Eldorado, Palhoça",
    "anos_mercado": 72,
    "tempo_mercado_texto": "Desde 1954 (3ª geração)",
    "nota_google": 4.5,
    "avaliacoes_google": 43,
    "ultimo_post_instagram": "2026-09-20",
    "anuncia_meta": "não",
    "anuncia_google": "não",
    "produtos": "Cozinhas, dormitórios, closets, home office, projeto 3D",
    "pessoa": "Jeferson Ruminik Steinbach",
    "cargo": "Proprietário",
    "sinais": "71 anos, posicionamento premium, página para Florianópolis",
    "sinais_extras": 2,
    "motivo": "Tradição e boa nota, mas alcance ainda local: anúncios levam a marca a Florianópolis.",
    "fontes": ["https://www.marcenariasteinbach.com.br/", "https://www.facebook.com/ads/library/?..."]
  }
]
```

Valores aceitos:
- `anuncia_meta` / `anuncia_google`: `"sim"`, `"não"` ou `null` (não verificado).
- `ultimo_post_instagram`: data `AAAA-MM-DD`, `"sem Instagram"` ou `null` (não verificado).
- `anos_mercado`: número inteiro de anos completos, ou `null`.
