# Mockups de referência — Página inicial

Esta pasta contém **3 mockups HTML estáticos e auto-contidos** da página inicial do site
"Manutenção e Serviços". Servem apenas como referência visual para discussão e comparação;
**não** são código de produção e não substituem a implementação real em Next.js + Tailwind.

## Como abrir

- **Duplo clique** no arquivo `.html` (abre no navegador padrão).
- Ou, para servir localmente:
  ```bash
  cd exemplos
  python -m http.server 8000
  ```
  Depois acesse `http://localhost:8000/01-home-aco-suave.html` (e os demais).

Funcionam offline (sem rede). CSS e JavaScript estão embutidos em cada arquivo.

## O que cada mockup demonstra

- **01-home-aco-suave.html** — Paleta "Aço Suave" (#f4f6f8 / #1e293b / #475569 / #0d9488).
  Hero com palavra/categoria rotativa (fade), marquee horizontal de categorias abaixo do hero,
  cards com fade-up em cascata ao carregar. Tom neutro, acento teal suave.
- **02-home-terra-acolhedora.html** — Paleta "Terra Acolhedora" (#faf7f2 / #292524 / #78716c / #c2410c).
  Hero com chips de categoria entrando em cascata (staggered slide-up), padrão geométrico SVG
  sutil no fundo, grid de profissionais. Tipografia serifada para acolhimento.
- **03-home-neblina.html** — Paleta "Neblina" (#f8fafc / #0f172a / #64748b / #6366f1).
  Hero central com badges flutuantes (floating) ao redor do título e CTA central, seção de
  depoimentos em destaque. Acento índigo suave.

## Observações

- Todas as três seguem a mesma estrutura de seções: header, hero, categorias, profissionais em
  destaque, depoimentos em vídeo, como funciona, footer.
- Respeitam `prefers-reduced-motion`, foco visível e contraste mínimo WCAG AA para texto principal.
- Layout responsivo: mobile (1 col), tablet (2 col), desktop (3 col) nos grids.
- As cores e animações são sugestões não vinculantes; a implementação final deve seguir o
  sistema de design definido no projeto.
- Itens marcados como `[A confirmar]` no projeto permanecem em aberto e não foram inventados aqui.
