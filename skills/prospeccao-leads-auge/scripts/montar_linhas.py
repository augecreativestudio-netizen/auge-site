#!/usr/bin/env python3
"""Valida os leads, calcula pontuação/prioridade e gera as linhas da planilha.

Uso:
  python montar_linhas.py leads.json --nicho "Marcenarias" --regiao "Grande Florianópolis" \
      --data 2026-09-29 [--csv saida.csv] [--json linhas.json]

A regra de pontuação está explicada em references/criterios.md.
"""
import argparse
import csv
import json
import sys
from datetime import date

NF = "não encontrado"
NV = "não verificado"

COLUNAS = [
    "Data da pesquisa", "Nicho", "Região", "Rank", "Lead", "Site", "Telefone", "Instagram",
    "Endereço", "Cidade/Bairro", "Tempo de mercado", "Nota Google", "Qtd. avaliações Google",
    "Último post Instagram", "Anuncia Meta Ads", "Anuncia Google Ads", "Produtos/Serviços",
    "Pessoa responsável", "Cargo", "Sinal encontrado", "Motivo para prospectar", "Pontuação",
    "Nível de prioridade", "Fonte",
]

CAMPOS = [
    "lead", "site", "telefone", "instagram", "endereco", "cidade_bairro", "anos_mercado",
    "tempo_mercado_texto", "nota_google", "avaliacoes_google", "ultimo_post_instagram",
    "anuncia_meta", "anuncia_google", "produtos", "pessoa", "cargo", "sinais", "sinais_extras",
    "motivo", "fontes",
]


def pontuar(l, hoje):
    pts = 0
    anos = l.get("anos_mercado")
    if isinstance(anos, (int, float)) and anos >= 5:
        pts += 3

    post = l.get("ultimo_post_instagram")
    if post and post != "sem Instagram":
        try:
            if (hoje - date.fromisoformat(post)).days <= 31:
                pts += 2
        except ValueError:
            sys.exit(f"{l['lead']}: ultimo_post_instagram deve ser AAAA-MM-DD, 'sem Instagram' ou null")

    nota, qtd = l.get("nota_google"), l.get("avaliacoes_google") or 0
    if isinstance(nota, (int, float)):
        if nota >= 4.5 and qtd >= 10:
            pts += 2
        elif nota >= 4.0:
            pts += 1

    nao = [l.get("anuncia_meta"), l.get("anuncia_google")].count("não")
    pts += {2: 3, 1: 1, 0: 0}[nao]

    extras = l.get("sinais_extras") or 0
    pts += max(0, min(3, int(extras)))
    return pts


def prioridade(pts):
    return "Alta" if pts >= 8 else "Média" if pts >= 5 else "Baixa"


def txt(v, vazio=NF):
    if v is None or v == "" or v == []:
        return vazio
    if isinstance(v, float):
        return f"{v:.1f}".replace(".", ",")
    return str(v)


def validar(l, i):
    faltando = [c for c in ("lead", "motivo", "fontes") if not l.get(c)]
    if faltando:
        sys.exit(f"Lead #{i + 1} ({l.get('lead', '?')}): campos obrigatórios vazios: {faltando}")
    extras = set(l) - set(CAMPOS)
    if extras:
        sys.exit(f"{l['lead']}: campos desconhecidos {sorted(extras)}")
    for c in ("anuncia_meta", "anuncia_google"):
        if l.get(c) not in (None, "sim", "não"):
            sys.exit(f"{l['lead']}: {c} deve ser 'sim', 'não' ou null")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("leads")
    ap.add_argument("--nicho", required=True)
    ap.add_argument("--regiao", required=True)
    ap.add_argument("--data", default=date.today().isoformat())
    ap.add_argument("--csv")
    ap.add_argument("--json")
    a = ap.parse_args()

    hoje = date.fromisoformat(a.data)
    leads = json.load(open(a.leads, encoding="utf-8"))
    for i, l in enumerate(leads):
        validar(l, i)
        l["_pts"] = pontuar(l, hoje)
    leads.sort(key=lambda l: (-l["_pts"], -(l.get("avaliacoes_google") or 0)))

    linhas = []
    for rank, l in enumerate(leads, 1):
        tempo = l.get("tempo_mercado_texto") or (f"{l['anos_mercado']} anos" if l.get("anos_mercado") else None)
        linhas.append([
            a.data, a.nicho, a.regiao, str(rank), l["lead"], txt(l.get("site")), txt(l.get("telefone")),
            txt(l.get("instagram")), txt(l.get("endereco")), txt(l.get("cidade_bairro")), txt(tempo),
            txt(l.get("nota_google")), txt(l.get("avaliacoes_google")),
            txt(l.get("ultimo_post_instagram"), NV), txt(l.get("anuncia_meta"), NV),
            txt(l.get("anuncia_google"), NV), txt(l.get("produtos")), txt(l.get("pessoa")),
            txt(l.get("cargo")), txt(l.get("sinais")), l["motivo"], str(l["_pts"]),
            prioridade(l["_pts"]), " | ".join(l["fontes"]),
        ])

    if a.csv:
        with open(a.csv, "w", newline="", encoding="utf-8-sig") as f:
            w = csv.writer(f, delimiter=";")
            w.writerow(COLUNAS)
            w.writerows(linhas)
    if a.json:
        json.dump(linhas, open(a.json, "w", encoding="utf-8"), ensure_ascii=False)

    cont = {p: sum(1 for r in linhas if r[22] == p) for p in ("Alta", "Média", "Baixa")}
    print(f"{len(linhas)} leads | Alta {cont['Alta']} · Média {cont['Média']} · Baixa {cont['Baixa']}")
    for r in linhas[:10]:
        print(f"  {r[3]:>2}. {r[4]} ({r[21]} pts, {r[22]})")


if __name__ == "__main__":
    main()
