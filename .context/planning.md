# 🎯 PLANNING — Redesign MAFFENG Site
**Status:** Active | **Data:** 29 mai 2026 | **Metodologia:** PREVC

---

## 📌 Escopo & Requisitos

### Objetivo Principal
Redesenhar o site MAFFENG (maffeng-home-site.html) com:
- ✅ Design System TM Sempre Tecnologia (tokens + animações)
- ✅ Dark mode obrigatório com persistência
- ✅ UI/UX pro max (sênior, técnica, direta)
- ✅ Single-file HTML (sem build, sem dependências)
- ✅ Animações sóbrias + reveal patterns

### Contexto de Negócio
- **Empresa:** MAFFENG Engenharia e Manutenção (Goiânia, GO)
- **Público:** Decisores corporativos, procurement, facility managers
- **Mensagem-chave:** "Liderança nacional em engenharia + confiabilidade bancária"
- **Conversões:** WhatsApp (62) 2220-0664 | Email administrativo@maffengengenharia.com.br

---

## 🎨 Decisões de Arquitetura

### Design System
- **Fonte Display:** Roboto Slab (Montserrat descontinuada → Roboto Slab)
- **Fonte UI:** Inter (novo padrão TM)
- **Fonte Técnica:** JetBrains Mono (para stats/números)
- **Cor Primária:** #CC1A1A (vermelho corporativo MAFFENG)
- **Cor Secundária:** #111111 (preto institucional)
- **Dark mode:** `html.dark` class + `localStorage` persistência

### Tipos de Página
- **Landing page híbrida:** Hero técnico + seções institucionais + CTA agressiva
- **Estrutura:** Header fixo → Hero → Serviços grid → Sobre → Clientes carousel → Números stats → CTA final → Footer

### Animações
- **Hero:** Reveal escalonado (fade + translateY) — 0.5s ease
- **Scroll sections:** IntersectionObserver com threshold 0.15
- **Stats:** Countup animado (1400ms ease-out-cubic)
- **Typewriter (opcional):** Para tagline técnica no hero

### Assets & CDN
- **Hero banner:** `https://maffengengenharia.com.br/wp-content/uploads/2024/07/banner_maffeng_institucional_v5.png`
- **Logo:** Embutido como SVG inline (quadrado laranja 18×18px + texto)
- **Logos clientes:** URLs diretas do WordPress CDN (sem fallbacks de arquivo local)

---

## 🔧 Estrutura de Seções

| Seção | Tipo | Componentes | Animação |
|-------|------|-------------|----------|
| **Header** | Fixed 68px | Logo TM + Nav hidden + Dark toggle + CTA button | Nenhuma |
| **Hero** | Full-height | Banner bg + Overlay + Logo grande + Tagline + Stats | Reveal escalonado |
| **Serviços** | Grid 4col | 4 cards (Manutenção Predial, Civil, Obras, Outros) | IntersectionObserver + border-top hover |
| **Sobre** | 2-col split | Mapa esquerda + texto direita (dark bg) | Fade-in ao scroll |
| **Clientes** | Carousel | Logos com links clicáveis + pause-on-hover | Scroll contínuo |
| **Quem Somos** | Hero split | Foto + texto instituição (2-col responsive) | Fade-in ao scroll |
| **Números** | Stats grid | 4 cards (Anos, Colaboradores, Clientes, Cidades) | Countup ao scroll |
| **CTA Final** | Full-width | Seção escura + Logo + Botão + Email | Fade-in ao scroll |
| **Footer** | Sticky | Branding + Endereço + CNPJ + Links | Nenhuma |

---

## 📐 Breakpoints Responsivos
- **Desktop:** 1200px+
- **Tablet:** 768px–1199px → 2-col grids collapse to 1
- **Mobile:** <768px → Stack vertical, padding 20px

---

## ⚠️ Riscos Identificados

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Banner não carrega via URL local | Alto | Usar CDN WordPress — URL absoluta HTTPS |
| Animações choppy em mobile | Médio | `prefers-reduced-motion` honrado |
| Dark mode persiste errado | Baixo | Testar localStorage em incógnito |
| Carousel clientes trava em mobile | Médio | Usar CSS scroll + JS simples (sem biblioteca) |

---

## ✅ Critérios de Sucesso

1. ✅ Single-file HTML válido (sem erros console)
2. ✅ Dark mode toggle funcional + persistência
3. ✅ Todas as imagens carregando via CDN
4. ✅ Animações suaves (60fps, sem jank)
5. ✅ Mobile responsivo até 320px de largura
6. ✅ Contrast ratio WCAG AA em light + dark
7. ✅ CTA conversão óbvia (WhatsApp em 3 lugares mín.)
8. ✅ Performance: LCP <2.5s, FID <100ms, CLS <0.1

---

## 🚀 Timeline Estimada

- **Planning:** 30 min ✅ (agora)
- **Design/Layout:** 1h
- **Implementação HTML/CSS:** 2h
- **Animações JS:** 1h
- **Testes + Otimizações:** 45 min
- **Total:** ~5h (sprint único)

---

**Próximo passo:** REVIEW phase + mockup de hero
