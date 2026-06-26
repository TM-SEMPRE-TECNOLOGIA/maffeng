# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Regras do Ambiente

Este é um **ambiente exclusivo de produção** gerenciado pela TM Sempre Tecnologia. Mudanças aqui são coordenadas e cirúrgicas — sem refatorações, sem experimentos, sem alterações estruturais sem instrução explícita. Cada edição aponta para um elemento ou seção específica.

## O Que É Este Projeto

Site estático single-file para a **MAFFENG Engenharia e Manutenção** — empresa de engenharia e manutenção predial sediada em Goiânia, GO.

**Arquivo de produção atual:** `maffeng-site-v2-tm.html` — contém HTML, CSS (`<style>`) e JavaScript (`<script>`) em um único arquivo. Sem sistema de build, sem gerenciador de pacotes, sem dependências. Abrir diretamente no navegador.

Versões anteriores estão em `Design Maffeng/SITE/` (v1–v14 + `maffeng-home-site.html`). Não editar versões antigas.

## Identidade Visual e Tokens de Design

Todas as cores são variáveis CSS definidas em `:root`:

```css
--mf-red:      #CC1A1A   /* cor primária da marca — botões, acentos, bordas */
--mf-red-dark: #A01414   /* estado hover */
--mf-black:    #1a1a1a
--mf-dark-bg:  #111111   /* fundo das seções escuras */
--mf-dark2:    #1e1e1e
--mf-gray:     #f5f5f5
--mf-muted:    #666666
```

**Fontes** (via Google Fonts — v2-tm):
- `Roboto Slab` — display / títulos principais
- `Inter` — UI geral, nav, botões, body
- `JetBrains Mono` — elementos técnicos/código

## Seções da Página (ordem no DOM)

| Seção | Classe CSS | Âncora | Observações |
|-------|-----------|--------|-------------|
| Cabeçalho | `.hdr` | — | Fixo, 68px, escurece no scroll >80px |
| Hero | `.hero` | `#hero` | Tela cheia, animação de entrada escalonada |
| Serviços | `.services` | `#services` | Grid 4 colunas (`svc-grid`), quebras em 860px/480px |
| Sobre/Mapa | `.about` | `#about` | Grid 2 colunas escuro com imagem do mapa |
| Clientes | `.clients` | `#clients` | Carrossel automático — logos duplicados para loop infinito |
| Quem Somos | `.mission` | `#mission` | 2 colunas com foto da equipe |
| Números | `.numbers` | `#numbers` | 4 contadores animados com atributo `data-target` |
| CTA | `.cta-section` | `#contact` | Escuro, centralizado, CTA para WhatsApp |
| Rodapé | `.footer` | — | Endereço, CNPJ, contato |
| Botão WA | `.wa-float` | — | Botão WhatsApp fixo no canto inferior direito |

## Comportamentos JavaScript

Todo JavaScript vanilla, sem bibliotecas:

- **Entrada do hero**: `setTimeout` escalonado — 4 elementos com delays de 100ms cada, adicionam classe `.vis`
- **Animações de scroll**: `IntersectionObserver` com `threshold: 0.15` adiciona `.vis` em elementos `.anim-in`
- **Contador animado**: countup via `requestAnimationFrame` — lê `data-target` (int) e `data-suffix` (string)
- **Carousel infinito**: CSS `animation` + elementos HTML duplicados; pausa no hover
- **Scroll do cabeçalho**: listener passivo de scroll define estilo inline
- **Dark mode**: toggle adiciona/remove classe `html.dark`; persistência via `localStorage` na chave `'tm-theme'`; fallback `prefers-color-scheme`

## Imagens e Assets

Todas as imagens estão hospedadas no CDN WordPress: `https://maffengengenharia.com.br/wp-content/uploads/`

O logo no cabeçalho e no hero está embutido como **PNG em base64** dentro do `<img src="data:image/png;base64,...">` — é muito longo. Não truncar nem corromper ao editar o HTML próximo a ele.

## Breakpoints Responsivos

```
900px  — nav do cabeçalho oculta, padding reduzido
860px  — grids de 2 colunas colapsam para 1 coluna (about, mission, numbers)
640px  — grid do rodapé colapsa
480px  — grid de serviços colapsa para 1 coluna
```

## Dados Críticos (atualizar com cuidado)

- **Telefone**: `(62) 2220-0664` — aparece em 5 lugares: header, hero CTA, footer, seção CTA final, rodapé
- **WhatsApp CTA**: `http://wa.me/5562996546785`
- **E-mail**: `administrativo@maffengengenharia.com.br` (2 ocorrências)
- **Endereço**: R C75 381, Setor Sudoeste, Goiânia – GO
- **CNPJ**: 33.624.704/0001-94
- **Contadores**: `data-target="5"` (anos), `data-target="87"` (colaboradores), `data-target="8"` (clientes), `data-target="385"` (cidades)
- **Desenvolvido por**: TM Sempre Tecnologia (crédito no rodapé)
