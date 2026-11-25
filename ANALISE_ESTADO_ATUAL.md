# Análise do estado atual — Manutenção e Serviços

**Data:** 2026-11-24  
**Branch:** `main`  
**Plano ativo:** `.planning/2026-10-28-mvp-manutencao-e-servicos/` (`PLAN_ID: 2026-10-28-mvp-manutencao-e-servicos`)

## Resumo

O MVP existe como protótipo visual funcional: rotas, componentes e services foram criados, e a build gera as páginas. Porém **a integração real com o Supabase não está ligada ao código de produção** — páginas usam mocks, formulários simulam envio e os services não são importados. Há ainda um aviso de segurança do Next.js 16.4.3 e mudanças não commitadas no working tree.

## 1. Estado do repositório

- `git status`: `AGENTS.md` e `src/app/orcamento/[id]/page.js` e `src/app/profissionais/[id]/page.js` modificados, ainda não commitados. As duas rotas receberam a correção para Next.js 16: `await params` em componente async filho envolto em `<Suspense>`.
- `exemplos/` não rastreado: `README.md` + 3 mockups HTML da home (`01-home-aco-suave.html`, `02-home-terra-acolhedora.html`, `03-home-neblina.html`). São referência visual, não código de produção.
- `task_plan.md` marca a Fase 10 como concluída e o MVP como entregue; `progress.md` da sessão de 2026-10-28 ainda registrava fases 3/4 `in_progress`. As duas visões foram reconciliadas nesta análise e nos arquivos de planejamento.

## 2. Validação executada

| Comando | Resultado | Evidência |
|---------|-----------|-----------|
| `npm run lint` | exit 0, sem erros | saída do comando em 2026-11-24 |
| `npm run build` (1ª execução) | exit 1 | `SecurityFatalError`: versão do Next.js afetada por vulnerabilidade conhecida; compilação e 9 páginas foram geradas antes da interceptação |
| `npm run build` (retry imediato) | exit 0, aviso mantido | `⚠ Your version of Next.js is affected by a known security vulnerability...`; rotas estáticas e duas com Partial Prerender (`/orcamento/[id]`, `/profissionais/[id]`) |
| `npm audit --omit=dev` | 1 grupo de advisory moderado | 7 entradas em `next@16.4.3`; correção disponível em `16.4.6` (não é major bump) |

Dentre os advisories há cache poisoning em Cache Components com route params e vazamento de cache entre valores de `use cache` — relevantes porque `next.config.ts` habilita `cacheComponents` e `partialPrefetching`.

**Recomendação de segurança do CLI:** executar, no diretório do app, `next upgrade --agent=security --internal-nudge-id=13fb59fb-bf31-43da-be8b-9b25f2654963`. Não foi executado nesta auditoria porque altera dependências e lockfile; depende de decisão (worktree separado ou checkout atual).

## 3. Realidade da integração

- `grep` por imports de `@/services` ou `@/lib/validacoes` em `src/`: **zero ocorrências**. Os 7 services (`obterProfissionais`, `obterProfissionalPorId`, `obterPortfolio`, `obterReferencias`, `obterCategorias`, `enviarPedidoOrcamento`, `enviarSolicitacaoCadastro`) existem, mas não são usados em produção.
- `src/components/FormOrcamento.jsx:29-32` e `src/app/cadastro-profissional/page.js:30-32`: validam campos obrigatórios, fazem `console.log` + `setTimeout(800)` e exibem mensagem de sucesso. Nada é gravado e o `catch` é inalcançável.
- `src/app/profissionais/page.js:38-46`: filtro em memória sobre `PROFISSIONAIS_MOCK`; a query `?categoria=` enviada por `AbaCategorias` não é lida, então o deep-link não filtra.
- `src/app/page.js:42-57`: destaques e depoimentos são textos "Em breve". `VideoPlayer` existe, mas não é importado pela home.
- `src/components/Header.jsx:10-17`: só "Profissionais" e "Como funciona"; sem link de orçamento ou CTA "Buscar profissional".
- Categorias `Reformas`, `Computadores`, `Celulares` hardcoded em `src/app/page.js:4`, `src/app/profissionais/page.js:35`, `src/app/cadastro-profissional/page.js:83-85`, `src/app/profissionais/[id]/page.js:10` e no seed de `supabase/schema.sql:99-102`.
- Link de WhatsApp real só no perfil (`src/app/profissionais/[id]/page.js:63-67,95-103`), com telefone fictício.

## 4. Supabase, ambiente e deploy

- `supabase/schema.sql:73-96`: SELECT público em `profissionais` (com `ativo = true`), `portfolio`, `referencias` (aprovadas) e `categorias`; **apenas INSERT anon** em `orcamentos` e `solicitacoes_cadastro` (`for insert with check (true)`).
- `src/services/orcamentos.service.js:5,11-14` usa `.insert(...).select()`. Como não existe policy de SELECT nessas duas tabelas, o `returning` falha até a policy existir. Sem `.env.local`, `src/lib/supabase.js:11-14` exporta `null` e os services retornam erro próprio — esse padrão deve ser mantido.
- `.env.local.example:1-3` traz URL e ANON_KEY; o README manda copiá-lo, mas **não ensina a aplicar `supabase/schema.sql` no SQL Editor**, sem o qual nada funciona.
- `README.md:41` cita `src/styles/`, que não existe (CSS real em `src/app/globals.css`). `README.md:44-51` resume o deploy à configuração das variáveis na Vercel.

## 5. Lacunas ainda não decididas

- Domínio final do site (`DOCUMENTACAO_CONSOLIDADA.md:19,96`).
- Campo `data` das Avaliações/Referências (`DOCUMENTACAO_CONSOLIDADA.md:402`) versus `created_at` no schema.
- Seed de profissionais de exemplo (hoje só há seed de categorias).

## 6. Próximos passos priorizados

1. **Segurança:** atualizar `next` de 16.4.3 para 16.4.6, decidindo se o upgrade roda em worktree Git separado ou no checkout atual. Validar com `npm run lint` e `npm run build` após o upgrade.
2. **Higiene do repo:** commitar as correções das rotas `[id]`, o `AGENTS.md` atualizado e o plano sincronizado; decidir se `exemplos/` entra no versionamento como referência.
3. **Integração real:** aplicar o schema no Supabase, criar `.env.local`, adicionar policy de SELECT em `orcamentos`/`solicitacoes_cadastro`, ligar os services às páginas e formulários, remover mocks e tratar estados de carregamento/erro reais.
4. **Home e UI:** implementar destaques, depoimentos, seção "como funciona" e CTA de orçamento, usando os mockups de `exemplos/` como referência de conteúdo — não como código.
5. **Fechamento:** responder às lacunas do documento, corrigir o README, publicar na Vercel e fazer testes manuais em dispositivos reais.

## Evidências consultadas

`AGENTS.md`, `DOCUMENTACAO_CONSOLIDADA.md`, `README.md`, `package.json`, `next.config.ts`, `.env.local.example`, `supabase/schema.sql`, `src/app/**`, `src/components/**`, `src/services/**`, `src/lib/supabase.js`, `exemplos/**` e `.planning/2026-10-28-mvp-manutencao-e-servicos/{task_plan,progress,findings}.md`.
