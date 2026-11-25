# Task Plan: MVP — Manutenção e Serviços (Catálogo local)

## Goal
Construir o MVP do site "Manutenção e Serviços": catálogo web (Next.js + Supabase + Vercel) conectando clientes a profissionais de manutenção em Serra dos Aimorés, com perfis, portfólios, referências e pedido de orçamento via formulário/WhatsApp. Sem auth, pagamentos, chat em tempo real ou painel admin.

## Next Step
Executar `docs/superpowers/plans/2026-11-24-proximos-passos-mvp.md` (6 tasks), começando pelo baseline e pelo upgrade de segurança do Next.js. Cada task termina com commit e validação própria.

## Current Phase
Phase 11 (pending)

## Phases

### Phase 1: Requirements & Discovery
- [x] Ler DOCUMENTACAO_CONSOLIDADA.md e AGENTS.md
- [x] Identificar stack planejada (Next.js App Router + Supabase + Vercel)
- [x] Identificar lacunas [A confirmar]/[Informação ausente]
- [x] Confirmar com o usuário: estilo (Tailwind), categorias (Reformas/Computadores/Celulares), orçamento vinculado ao profissional, campos básicos, moderação manual, domínio "Manutenção e Serviços", cadastro via formulário+aprovação, sem edição de perfil, verificação manual, filtro simples, chat pós-MVP, repo do zero
- [x] Registrar decisões em findings.md
- **Status:** complete

### Phase 2: Organização inicial (Etapa 0 do doc)
- [x] Revisar ideia e confirmar nome final do site/domínio
- [x] Definir páginas e textos iniciais
- [x] Criar repositório Git e estrutura de pastas (§4.1)
- [x] Escolher tecnologias do MVP (stack já definida: Next.js + Tailwind + Supabase)
- [x] Separar categorias iniciais (Reformas, Computadores, Celulares)
- [x] Build de produção passando
- **Status:** complete

### Phase 3: Modelagem de dados (Etapa 1)
- [x] Definir entidades: Profissional, Categoria, Portfólio, Avaliação/Referência, Pedido de Orçamento, Solicitação de Cadastro
- [x] Definir campos de cada entidade (incluindo `valor_base`, `status_moderacao`)
- [x] Criar schema SQL (supabase/schema.sql) com tabelas, RLS e seed de categorias
- [x] Seed de profissionais: mock no frontend (dados reais ficam para o deploy do usuário)
- **Status:** complete

### Phase 4: Backend / Supabase (Etapa 2)
- [x] RLS mínimo definido no schema (leitura pública de ativos/aprovados; insert anon para orçamentos/cadastros)
- [x] Services criados (profissionais, categorias, orcamentos) prontos para uso
- [x] Schema SQL pronto em supabase/schema.sql para rodar no Supabase do usuário
- [x] .env.local.example documentado
- [ ] Criar projeto no Supabase, rodar schema.sql, configurar .env.local, Storage (ação do usuário no deploy)
- **Status:** complete (preparado; deploy/integração real pelo usuário)

### Phase 5: Frontend base (Etapa 3)
- [x] Layout principal, Header, Footer, menu de navegação
- [x] Componentes reutilizáveis: CardProfissional, FiltroProfissionais, AbaCategorias, FormOrcamento, GaleriaPortfolio, VideoPlayer
- [x] Cores, fontes, espaçamentos, responsividade básica (Tailwind)
- [x] Estilo: Tailwind CSS
- **Status:** complete

### Phase 6: Páginas principais (Etapa 4)
- [x] Home `/` (hero, categorias, profissionais em destaque, depoimentos, CTA)
- [x] Catálogo `/profissionais` (lista + filtros)
- [x] Perfil `/profissionais/[id]` (foto, descrição, portfólio, referências, contato, WhatsApp)
- [x] Orçamento `/orcamento` e `/orcamento/[id]` (formulário)
- [x] Como funciona `/como-funciona`
- [x] Cadastro de profissional `/cadastro-profissional`
- **Status:** complete

### Phase 7: Integração frontend/backend (Etapa 5)
- [x] Services criados e prontos (obterProfissionais, obterProfissionalPorId, obterPortfolio, obterReferencias, obterCategorias, enviarPedidoOrcamento, enviarSolicitacaoCadastro)
- [x] Estados de UI tratados (carregando/vazio/erro/sucesso nas páginas e formulários)
- [x] Botão de WhatsApp (link direto) no perfil
- [x] Vídeos externos via VideoPlayer (YouTube embed)
- [x] Frontend usa mocks de fallback (integração real com Supabase fica para o deploy do usuário)
- **Status:** complete (preparado; integração real pelo usuário)

### Phase 8: Testes e ajustes (Etapa 6)
- [x] Build de produção passando (npm run build)
- [x] Lint passando (npm run lint) — 0 erros
- [x] Navegação, filtros, formulários, mensagens de erro/sucesso implementados
- [x] Responsividade básica (Tailwind, mobile-first)
- [ ] Testes manuais em dispositivos reais (ação do usuário)
- **Status:** complete (validação final pelo usuário)

### Phase 9: Publicação (Etapa 7)
- [x] README.md com instruções de setup e deploy
- [x] .env.local.example documentado
- [ ] Criar conta Vercel, conectar repo GitHub (ação do usuário)
- [ ] Configurar variáveis de ambiente do Supabase (ação do usuário)
- [ ] Deploy e testes em produção (ação do usuário)
- **Status:** complete (deploy pelo usuário)

### Phase 10: Entrega e próximos passos (Etapa 8 — pós-MVP)
- [x] Documentar README com setup e deploy
- [x] Listar evoluções futuras (login profissional, chat, avaliações moderadas, painel, mapa, notificações)
- [x] Código organizado conforme convenções (rotas minúsculas, componentes PascalCase, services/, lib/)
- **Status:** complete

### Phase 11: Implementação dos próximos passos (2026-11-24)
- [x] Baseline commitado (AGENTS.md, rotas `[id]`, análise, exemplos e plano)
- [x] Upgrade de segurança do Next.js 16.4.3 → 16.4.6
- [x] Testes nativos (`node:test`) e validações dos formulários
- [x] Services de escrita sem `.select()` e formulários gravando no Supabase
- [x] Leitura real com fallback mock, categorias centralizadas e deep-link `?categoria=`
- [x] Home/Header alinhados aos mockups de `exemplos/`
- [x] README, lacunas do spec e validação final
- Plano detalhado: `docs/superpowers/plans/2026-11-24-proximos-passos-mvp.md`
- Commits: `ff3f28f` (baseline), `cbce542` (Next.js 16.4.6), `eaf21db` (validações), `7748f97` (escrita no Supabase), `995562e` (leitura), `4e7f569` (home), `9bb4bcc` (docs/lacunas).
- Verificação final: `npm test` → 8/8 pass, `npm run lint` exit 0, `npm run build` exit 0; `npm run dev` smoke test: `/` com CTA, `/profissionais?categoria=Celulares` renderizando mock de demo (só Carlos Lima). Lacunas de domínio e URLs de depoimentos em `[A confirmar]`.
- **Status:** complete

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Stack: Next.js (App Router) + Supabase + Vercel | Consenso das duas versões da doc; simplicidade para iniciantes; baixo custo |
| Sem auth, pagamentos, chat em tempo real e painel admin no MVP | Escopo definido na doc §1.10 |
| Contato via formulário + link WhatsApp | Consenso; evita backend complexo de mensagens |
| Vídeos de depoimento via YouTube/Vimeo (externos) | Reduz armazenamento próprio (§3.5) |
| Rotas em minúsculas; componentes PascalCase; serviços em `services/`; Supabase client + validações em `lib/` | Convenções AGENTS.md §4.1 |
| Identificadores em pt-BR claro ou inglês simples | Convenções AGENTS.md |
| Chat privado e pagamento online fora do MVP | Fora do escopo (§1.10) |
| Estilo (CSS puro vs Tailwind) | Tailwind CSS — decisão do usuário (2026-10-28) |
| Categorias iniciais do MVP | Reformas, Computadores, Celulares |
| Formulário de orçamento | Vinculado ao profissional: rota /orcamento/[id] |
| Campos do orçamento | Básico: nome, telefone/WhatsApp, descrição do serviço, mensagem |
| Moderação de avaliações | Aprovação manual antes de publicar (status_moderacao) |
| Nome do site | "Manutenção e Serviços" (domínio a confirmar) |
| Cadastro de profissionais | Formulário público + aprovação manual pelo admin |
| Edição de perfil | Não no MVP (apenas admin/dev) |
| Verificação de profissionais | Aprovação manual pelo admin |
| Filtro por valor | Simples: categoria + localidade; valor informativo no perfil |
| Chat privado | Pós-MVP (fora do escopo inicial) |
| Repositório Git | Não existe; criar do zero na Etapa 0 |

## Errors Encountered
| Error | Resolution |
|-------|------------|