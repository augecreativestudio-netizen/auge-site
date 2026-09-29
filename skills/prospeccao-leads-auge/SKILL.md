---
name: prospeccao-leads-auge
description: Pesquisa e qualifica leads para a Auge Creative Studio (gestão de tráfego pago Meta Ads e Google Ads para médios negócios), verifica no navegador se cada lead já anuncia, quando postou no Instagram e sua nota no Google Maps, prioriza e alimenta a planilha mestre "Auge | Prospecção de Leads" no Google Sheets. Use sempre que o usuário pedir prospecção, lista de leads, potenciais clientes, "pesquisa de [nicho] em [cidade/região]", "encontre X empresas de...", ou mandar só um nicho + local + quantidade, mesmo sem dizer "skill" ou "planilha".
---

# Prospecção de leads para a Auge

A Auge Creative Studio vende gestão de anúncios online (Meta Ads e Google Ads) para médios negócios e empresários. Esta skill transforma um pedido curto ("dentistas em Joinville, 15 leads") numa lista verificada e priorizada de potenciais clientes, gravada na planilha mestre do Google Sheets.

O valor da lista está em ser confiável: o time vai ligar para essas pessoas. Por isso a regra mais importante é **não inventar nada**. Dado não encontrado fica "não encontrado"; critério que não deu para checar fica "não verificado". Toda informação precisa de uma URL de fonte para conferência manual.

## 1. Entrada

Extraia do pedido:

| Parâmetro | Obrigatório | Padrão |
|---|---|---|
| Nicho (ex.: marcenarias, clínicas de estética) | sim | pergunte se faltar |
| Local (cidade, região ou bairros) | sim | pergunte se faltar |
| Quantidade de leads | não | **20** |
| Critérios extras do usuário | não | nenhum |

Se nicho ou local faltarem, faça uma única pergunta curta. Não faça outras perguntas: o resto tem padrão. Se o local for uma região ("Grande Florianópolis"), divida a busca pelas cidades que a compõem.

## 2. Pesquisa web (coleta)

Busque o dobro da quantidade pedida em candidatos e fique com os melhores. Fontes úteis, nesta ordem: sites próprios, perfis de Instagram/Facebook, Google Maps, diretórios (marcenarias.net.br, guiamais, solutudo, akilar, telelistas), consultas de CNPJ (cnpj.biz, econodata, casadosdados) para ano de fundação e sócios, e ZoomInfo/LinkedIn para porte.

Para cada lead colete: nome, site, telefone, Instagram (ou outra rede), endereço, cidade/bairro, tempo de mercado, nota e nº de avaliações no Google, produtos/serviços, pessoa responsável/decisora e cargo, sinais relevantes, e as URLs de fonte.

Cuidados que evitam erros comuns:
- Confirme que o Instagram é da empresa certa (nome, cidade, site na bio). Perfil com nome parecido de outra cidade é um erro frequente; na dúvida, "não encontrado".
- Duas marcas no mesmo endereço e telefone provavelmente são a mesma empresa: una num lead e anote.
- Sócios de CNPJ são dados públicos; registre o cargo como aparece ("Sócio-administrador", "Titular do CNPJ").
- Telefone mascarado ("98426-****") não é telefone encontrado.
- Tempo de mercado: prefira a data de abertura do CNPJ ou o ano que a empresa declara; escreva de onde veio.

## 3. Verificação no navegador (anúncios, Instagram, Maps)

Esta etapa responde os critérios que a busca web não alcança. Ela precisa do Claude in Chrome ou do navegador do app (Cowork / Claude Desktop). Antes de começar, leia a skill do navegador disponível (`chrome-browser` ou `built-in-browser`) e depois `references/verificacao-navegador.md`, que traz as URLs e o passo a passo para cada site.

Verifique todos os leads que sobraram após a coleta. Para cada um registre: anuncia no Meta (sim/não), anuncia no Google (sim/não), data do último post do Instagram (ignorando posts fixados), nota e nº de avaliações no Google Maps, e a URL de cada verificação na coluna Fonte.

Se nenhuma ferramenta de navegador estiver disponível, não pare: faça a pesquisa web, preencha esses campos como "não verificado" e diga ao usuário, no fim, que a verificação ficou pendente e como resolvê-la (rodar a skill no Cowork com o Claude in Chrome conectado).

## 4. Pontuação e prioridade

A pontuação é calculada pelo script, para que listas de nichos diferentes sejam comparáveis. Você fornece os fatos; o script aplica a regra. A regra e o raciocínio estão em `references/criterios.md` (leia para preencher `sinais_extras` corretamente).

Resumo: tempo de mercado ≥ 5 anos (3), post no Instagram nos últimos 31 dias (2), nota Google ≥ 4,5 com ≥ 10 avaliações (2) ou ≥ 4,0 (1), não anuncia em Meta nem Google (3; em só um deles, 1), outros sinais (0–3). Alta ≥ 8, Média 5–7, Baixa ≤ 4. Critério "não verificado" vale 0.

## 5. Montar as linhas

Salve os leads num JSON (formato em `references/criterios.md`, seção "Formato do JSON") e rode:

```bash
python <skill>/scripts/montar_linhas.py leads.json --nicho "Marcenarias" --regiao "Grande Florianópolis" --data 2026-09-29 --csv saida.csv --json linhas.json
```

O script valida os campos, preenche "não encontrado"/"não verificado", calcula pontuação e prioridade, ordena do mais para o menos interessante e gera:
- `saida.csv`: CSV da pesquisa (`;`, UTF-8 com BOM, abre direto no Excel em português);
- `linhas.json`: as linhas prontas para acrescentar na planilha, na ordem exata das colunas.

## 6. Alimentar a planilha mestre

A planilha mestre chama-se **"Auge | Prospecção de Leads"** no Google Drive do usuário. Antes de mexer nela, leia a skill `google-workspace` e a referência de Sheets dela.

1. Abra a planilha pelo ID `1psusyCbkVS5X9XhFhlGfIOy8NHsqWAuKA4q8oeCVcFE` (primeira aba). Se o ID não abrir, procure com a busca do Drive (`title contains 'Prospecção de Leads'` e `mimeType = 'application/vnd.google-apps.spreadsheet'`).
2. Leia as colunas e as linhas existentes. **Remova duplicatas**: não acrescente lead cujo site, telefone, Instagram ou nome já exista na planilha. Liste os pulados no resumo final.
3. Acrescente as novas linhas abaixo da última linha preenchida, com o conector do Google Sheets, usando `valueInputOption: RAW` para que telefones e textos não virem números ou fórmulas.
4. Leia de novo o intervalo gravado para confirmar.

Se a planilha não existir, crie-a com o cabeçalho de `scripts/montar_linhas.py` (constante `COLUNAS`). Se o conector do Google Sheets estiver desligado, não crie uma planilha nova no lugar: diga ao usuário para ativá-lo e entregue o CSV enquanto isso.

## 7. Resposta ao usuário

Seja breve e comece pelo que importa:
1. Quantos leads entraram na planilha (com link) e quantos foram pulados por duplicidade.
2. Tabela dos leads com as colunas: Lead, Site, Telefone, Instagram, Localização, Pessoa responsável, Cargo, Sinal encontrado, Motivo para prospectar, Nível de prioridade, Fonte (uma URL principal por lead; todas estão na planilha).
3. Os critérios que mais pesaram nesta lista, em 2 a 4 linhas.
4. Os 10 melhores para começar a abordagem (ou todos, se a lista tiver menos de 10).
5. O que ficou "não verificado" e por quê, se for o caso.

"Motivo para prospectar" é uma frase curta, específica daquele lead, ligada ao que a Auge vende (ex.: "Depende de indicação e não anuncia: tráfego pago cria um canal previsível de orçamentos."). Evite frases genéricas que serviriam para qualquer empresa.
