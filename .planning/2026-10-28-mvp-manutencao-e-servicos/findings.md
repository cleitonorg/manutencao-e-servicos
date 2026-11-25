# Findings & Decisions

## Requirements
- Site "Manutenção e Serviços": catálogo digital conectando clientes a profissionais de manutenção em Serra dos Aimorés.
- Funcionalidades MVP: catálogo por categoria, perfil do profissional, portfólio, referências/recomendações/críticas, filtros (localidade, categoria, valor), contato/orçamento via formulário e/ou WhatsApp.
- Fora do MVP: auth, pagamentos, chat em tempo real, painel admin, app nativo, IA complexa, múltiplos DBs, microserviços.
- Público-alvo: moradores de Serra dos Aimorés que precisam de reformas, consertos (PC, celular, eletrodomésticos), manutenção.
- Proposta de valor: centralizar profissionais em um catálogo organizado, com portfólio e referências, aumentando confiança.

## Research Findings
- Fonte canônica: `DOCUMENTACAO_CONSOLIDADA.md` (unifica chat + Gemini PDF + skill using-superpowers).
- Históricos em `Docs/Arquivados/` são superseded.
- AGENTS.md define convenções: rotas minúsculas, componentes PascalCase, services/, lib/, sem queries diretas em componentes.
- Sem git repo inicializado; sem código/manifesto/testes ainda (documentação/planejamento apenas).

### Mapa de páginas (rotas)
- `/` (Início), `/profissionais` (catálogo), `/profissionais/[id]` (perfil), `/orcamento` (ou `/orcamento/[id]`), `/como-funciona`, `/cadastro-profissional` (futura).

### Entidades (modelagem)
- Profissional: id, nome, categoria, descricao, cidade, bairro, telefone_whatsapp, foto_url, ativo, data_criacao, valor_base.
- Categoria: id, nome, descricao.
- Portfólio: id, profissional_id, titulo, descricao, imagem_url.
- Avaliação/Referência: id, profissional_id, nome_cliente, comentario, nota, data, status_moderacao [A confirmar].
- Pedido de Orçamento: id, nome_cliente, telefone, email, profissional_id, descricao_servico, mensagem, data_envio.

### Estados de UI importantes
- Formulário enviado com sucesso; erro ao enviar; campo obrigatório; nenhum profissional encontrado; carregando; perfil indisponível; imagem indisponível; vídeo indisponível; WhatsApp indisponível.

### Requisitos de UX
- Navegação simples, abas de categorias, botões visíveis, responsivo (mobile-first), boa hierarquia visual, filtros acessíveis, cartões resumidos, formulários curtos, acessibilidade básica (contraste, rótulos, alt text), feedback visual.

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Next.js (App Router) + Supabase (PostgreSQL + Storage) + Vercel | Consenso das duas versões; simplicidade; baixo custo; boa documentação |
| Sem autenticação no MVP; Supabase Auth como evolução | Escopo MVP (§1.10) |
| Formulário + link WhatsApp (sem chat em tempo real) | Evita backend complexo de mensagens; consenso |
| Vídeos de depoimento via YouTube/Vimeo (embed) | Reduz armazenamento próprio (§3.5) |
| RLS mínimo no Supabase para segurança | Boas práticas (§3.7) |
| Validação frontend + backend; não expor chaves; HTTPS | Segurança mínima (§3.7) |
| Moderação de avaliações no banco | Aprovação manual antes de publicar (status_moderacao) — decisão do usuário em 2026-10-28 |
| Campos do formulário de orçamento | Básico: nome do cliente, telefone/WhatsApp, descrição do serviço, mensagem/observações |
| Cadastro de profissionais (MVP) | Formulário público + aprovação manual pelo admin |
| Edição de perfil pelo profissional | Não no MVP (apenas admin/dev); área do profissional é evolução futura |
| Verificação de profissionais | Aprovação manual pelo admin antes de publicar |
| Filtro por faixa de valor | Filtro simples: categoria + localidade; valor como campo informativo no perfil |
| Chat privado (tempo real) | Pós-MVP (fora do escopo inicial) |
| Repositório Git / código | Não existe; começar do zero (criar na Etapa 0) |
| Nome do site/domínio | "Manutenção e Serviços" (domínio a confirmar) |
| Categorias iniciais do MVP | Reformas, Computadores, Celulares (decisão do usuário em 2026-10-28) |
| Formulário de orçamento | Vinculado ao profissional: rota /orcamento/[id] (decisão do usuário em 2026-10-28) |
| Rotas minúsculas; componentes PascalCase; services/; lib/ | Convenções AGENTS.md |
| Identificadores em pt-BR claro ou inglês simples | Convenções AGENTS.md |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| Lacunas [A confirmar]/[Informação ausente] na doc | Não inventar respostas; confirmar com usuário ou manter marcado |
| Divergência CSS puro vs Tailwind | Resolvido: Tailwind CSS (decisão do usuário em 2026-10-28) |
| Sem git repo; sem código | Criar repo e estrutura na Etapa 0 |

## Resources
- DOCUMENTACAO_CONSOLIDADA.md (canônica)
- AGENTS.md (convenções do repo)
- Docs/Arquivados/ (históricos, superseded)
- .planning/2026-10-28-mvp-manutencao-e-servicos/ (plano ativo)

### Lacunas a confirmar com o usuário (bloqueantes ou não)
- Domínio final do site (`DOCUMENTACAO_CONSOLIDADA.md:19,96`) — decisão para quando houver dominio registrado.
- URLs de depoimentos em vídeo: em breve; resolver quando houver referências reais (mockup `exemplos/03-home-neblina.html` guarda exemplos).
1. Nome final do domínio (". www" incompleto) — [A confirmar]
2. Estilo: CSS puro vs Tailwind — RESOLVIDO: Tailwind CSS (2026-10-28)
3. Como será o cadastro dos profissionais (autônomo ou com aprovação) — [Informação ausente]
4. Autonomia dos profissionais para editar perfis — [Informação ausente]
5. Moderação/verificação de recomendações e críticas — [Informação ausente]
6. Campos da tabela de orçamento — [A confirmar]
7. Filtro por faixa de valor e como o valor é definido — [A confirmar]
8. Login para clientes/profissionais — [Informação ausente]
9. Pagamento integrado — [Informação ausente]
10. Chat em tempo real vs troca simples de mensagens — [A confirmar]
11. Verificação de profissionais antes do catálogo — [A confirmar]
12. Categorias iniciais (sugestão: reformas, computadores, celulares) — a confirmar
13. Dados de exemplo/seed para teste — a definir

### Fora do escopo MVP (não implementar)
- Pagamento online; app mobile nativo; painel admin completo; chat em tempo real (sockets); IA complexa; relatórios avançados; sistema financeiro; múltiplos DBs; microserviços; blockchain.

## Auditoria 2026-11-24 (evidências locais)
- Working tree sujo em `main`: `AGENTS.md` reescrito para pt-BR com o estado real do código; `src/app/orcamento/[id]/page.js` e `src/app/profissionais/[id]/page.js` corrigidos para `await params` dentro de `<Suspense>` (Next.js 16); `exemplos/` não rastreado com 3 mockups HTML da home.
- `npm run lint` passa (exit 0). `npm run build` gera 9 rotas (duas com Partial Prerender), mas o CLI do Next.js 16.4.3 intercepta a 1ª execução com `SecurityFatalError`; a 2ª execução termina com exit 0 e mantém o aviso.
- `npm audit --omit=dev`: `next@16.4.3` tem 1 advisory agrupado (moderado) com 7 entradas, incluindo cache poisoning em Cache Components com route params — relevante porque `next.config.ts` habilita `cacheComponents` e há rotas dinâmicas com PPR. Correção: `next@16.4.6`, sem major bump.
- O comando sugerido pelo CLI (`next upgrade --agent=security --internal-nudge-id=...`) altera dependências/lockfile e não foi executado: depende de decisão do usuário, inclusive sobre usar worktree separado.
- Divergência de plano: `task_plan.md` marca Phase 10 como complete, enquanto `progress.md` (sessão 2026-10-28) ainda diz fases 3/4 in_progress.

### Auditoria cruzada (duas lanes, verificada no arquivo)
- `grep` por imports de `@/services` ou `@/lib/validacoes` em `src/`: zero ocorrências. Os 7 services existem mas não são usados em produção.
- `src/components/FormOrcamento.jsx:29-32` e `src/app/cadastro-profissional/page.js:30-32`: `TODO` + `console.log` + `setTimeout(800)`; `catch` inalcançável; nenhuma gravação.
- `supabase/schema.sql:89-96`: só `for insert with check (true)` em `orcamentos`/`solicitacoes_cadastro`; `src/services/orcamentos.service.js:5,11-14` usa `.insert(...).select()` → quebra sem policy SELECT.
- `src/app/page.js:42-57`: destaques e depoimentos são textos "Em breve"; `VideoPlayer` não é importado. `src/app/page.js:4`, `src/app/profissionais/page.js:35`, `src/app/cadastro-profissional/page.js:83-85` e seed do schema mantêm categorias hardcoded.
- `src/app/profissionais/page.js:38-46`: filtro em memória; não lê `?categoria=` enviado por `AbaCategorias`.
- `src/components/Header.jsx:10-17`: só "Profissionais" e "Como funciona"; sem link de orçamento/CTA.
- `exemplos/` contém `README.md` + 3 mockups (`01-home-aco-suave.html`, `02-home-terra-acolhedora.html`, `03-home-neblina.html`) com hero, categorias, destaques, depoimentos, "como funciona" e CTA de orçamento.
- `README.md:41` cita `src/styles/` (inexistente; CSS real em `src/app/globals.css`) e `README.md:44-51` não ensina a aplicar `supabase/schema.sql` no SQL Editor.
- Lacunas do documento ainda em aberto: domínio final (`DOCUMENTACAO_CONSOLIDADA.md:19,96`), campo `data` de referências (`:402`) vs `created_at` do schema, e seed de profissionais de exemplo (`findings.md:81`).
- Verificação final em 2026-11-24: `npm run lint` exit 0; `npm run build` 1ª execução exit 1 (`SecurityFatalError`), retry imediato exit 0 com aviso de vulnerabilidade; 9 rotas geradas (duas com PPR).