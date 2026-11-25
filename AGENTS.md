# AGENTS.md — Manutenção e Serviços

## Estado do repo
- MVP em Next.js 16 (App Router, JavaScript) + Tailwind 4 + cliente Supabase scaffoldado. Git em `main`, sem testes nem CI.
- Spec canônica: `DOCUMENTACAO_CONSOLIDADA.md`. `Docs/Arquivados/` está superseded. Pontos em aberto vêm marcados `[A confirmar]` / `[Informação ausente]` — perguntar, nunca inventar.
- Decisões já fechadas e erros já resolvidos estão em `.planning/2026-10-28-mvp-manutencao-e-servicos/progress.md` (ponteiro: `.planning/.active_plan`); ler antes de mexer no MVP.
- `exemplos/` contém 3 mockups HTML da home — referência visual, não código de produção.
- Idioma: todo texto de UI, comentários, docs e commits em pt-BR. Região: Serra dos Aimorés.

## Realidade do código (não assumir integração pronta)
- As páginas usam dados mock hardcoded (`PROFISSIONAIS_MOCK`, `PROFISSIONAIS`). Os módulos `src/services/*` existem mas não são importados por ninguém.
- Os formulários (`FormOrcamento`, `cadastro-profissional`) fazem submit falso: `console.log` + `setTimeout`, com `TODO` apontando para os services. Não há gravação real no Supabase ainda.
- `src/lib/supabase.js` exporta `null` se `NEXT_PUBLIC_SUPABASE_*` não existirem (dev sem `.env.local`). Todos os services tratam `if (!supabase)` — manter esse padrão, não lançar exceção.
- `supabase/schema.sql` é aplicado manualmente no SQL Editor do Supabase; não há CLI/migrations.
- RLS: anon tem INSERT em `orcamentos`/`solicitacoes_cadastro` e SELECT público nas tabelas de catálogo; **não há policy de SELECT** para `orcamentos`/`solicitacoes_cadastro`, então o `.insert(...).select()` dos services falha até essa policy existir.
- Categorias (`Reformas`, `Computadores`, `Celulares`) estão hardcoded em `src/app/page.js`, `src/app/profissionais/page.js`, `src/app/cadastro-profissional/page.js` e no seed do schema — atualizar nos 4.

## Comandos
- `npm install` → `cp .env.local.example .env.local` (opcional; sem ele o app roda em modo mock) → `npm run dev` (localhost:3000).
- `npm run build` (Turbopack + Cache Components) e `npm run lint`. Não existe script de teste nem de typecheck.

## Gotchas do Next.js 16 (verificados)
- `params` de rota dinâmica é **Promise**: usar `await params` em server component. As rotas `[id]` já fazem isso num filho async envolto em `<Suspense>`; não regressir para `useParams` em client component (isso quebrou o prerender).
- `cacheComponents: true` e `partialPrefetching: true` em `next.config.ts` forçam prerender: não usar `new Date()`/valores dependentes de tempo no render (já quebrou o build; `Footer` tem ano fixo 2026).
- Tailwind 4 não usa `postcss.config` nem `tailwind.config`: é carregado pela regra do Turbopack em `next.config.ts` (`@tailwindcss/turbopack`). CSS global em `src/app/globals.css`; o `src/styles/` citado no README não existe.
- Projeto é JS com alias `@/*` → `src/*` (`jsconfig.json`); dependências TS existem mas não há `tsconfig.json`. Não introduzir TypeScript sem alinhar com o usuário.

## Convenções
- Rotas minúsculas (`/profissionais`, `/profissionais/[id]`, `/orcamento`, `/orcamento/[id]`, `/como-funciona`, `/cadastro-profissional`).
- Componentes PascalCase em `src/components/`; acesso a dados em `src/services/`; cliente Supabase e validações em `src/lib/`; tipos/formatos de entidade em `src/types/`. Nenhuma query direta em componente.
- Identificadores em pt-BR claro ou inglês simples (`obterProfissionais`, `enviarPedidoOrcamento`).
- Escopo MVP: sem auth, pagamentos, chat em tempo real, painel admin ou app nativo; não expandir a stack (Next + Supabase + Vercel).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
