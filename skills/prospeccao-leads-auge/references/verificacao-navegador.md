# Verificação no navegador

Faça a verificação num tab novo e feche-o ao terminar. Use o nome da empresa e confirme a correspondência pelo site, pela cidade ou pelo @ do Instagram antes de registrar qualquer resultado: nomes de marcenarias, clínicas etc. se repetem em várias cidades.

Anote a URL da página de verificação na lista `fontes` do lead.

## Biblioteca de Anúncios da Meta (Facebook e Instagram)

URL de busca (troque `NOME` pelo nome com `%20` nos espaços):

```
https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&media_type=all&search_type=keyword_unordered&q=NOME
```

1. Prefira escolher a **página** da empresa nas sugestões do campo de busca: a busca por palavra-chave também traz anúncios de terceiros que citam o nome.
2. Com a página certa aberta, veja "Anúncios ativos". Se houver, registre `anuncia_meta: "sim"` e anote, em `sinais`, quantos e desde quando ("Veiculação iniciada em ...").
3. Sem anúncios ativos, mude o filtro para "Todos os anúncios" (active_status=all). Anúncios só antigos contam como `"não"` hoje, mas anote em `sinais` ("anunciou até mar/2025"): é alguém que já testou e parou, um bom gancho de conversa.
4. Página não encontrada na biblioteca: `"não"` só se você confirmou que a empresa tem página/Instagram e ela não aparece; senão, `null`.

## Google Ads Transparency Center

```
https://adstransparency.google.com/?region=BR
```

1. Busque pelo nome da empresa e, se não achar, pelo domínio do site (ex.: `marcenariasteinbach.com.br`).
2. Anunciante encontrado com anúncios mostrados nos últimos 30 dias → `anuncia_google: "sim"`, com a data em `sinais`.
3. Nenhum anunciante com o nome nem com o domínio → `"não"`.

## Instagram

1. Abra o perfil do lead. Se pedir login e o usuário não estiver logado, marque `null` e siga.
2. **Pule os posts fixados** (ícone de alfinete nos três primeiros): eles costumam ser antigos e enganam a data.
3. Abra o post mais recente não fixado e leia a data. Registre em `ultimo_post_instagram` (`AAAA-MM-DD`).
4. Aproveite e anote seguidores em `sinais` se for relevante (muito baixo para o porte da empresa é um sinal de oportunidade).

## Google Maps

```
https://www.google.com/maps/search/NOME+CIDADE
```

1. Confirme que o card é da empresa certa (endereço e telefone).
2. Registre `nota_google` e `avaliacoes_google`. Empresa sem perfil no Maps: deixe `null` e anote "sem perfil no Maps" em `sinais`.

## Quando parar

Se uma página não carregar ou exigir algo que você não pode fazer (captcha, login), tente uma vez mais, marque o campo como `null` e siga para o próximo lead. Se o navegador parar de responder, avise o usuário e conclua com o que já foi verificado, marcando o resto como "não verificado".
