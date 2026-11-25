# Próximos Passos do MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Levar o MVP de protótipo com mocks a um estado seguro e integrado ao Supabase, com home alinhada aos mockups e documentação de deploy correta.

**Architecture:** Seis tasks sequenciais, cada uma com deliverable testável e commit próprio. Primeiro estabiliza-se o baseline e atualiza-se o Next.js; depois cria-se uma camada de validação pura testável com `node:test`; em seguida ligam-se escrita e leitura aos services existentes, mantendo fallback de demonstração quando `supabase` for `null`; por fim ajustam-se home/Header e documentação. Nenhuma dependência nova é adicionada.

**Tech Stack:** Next.js 16.4.6 (App Router, JavaScript), Tailwind 4, Supabase JS, Vercel, ESLint 9, `node:test` nativo (Node 26.13.1).

**Spec:** `ANALISE_ESTADO_ATUAL.md` (raiz do repo). Convenções adicionais em `AGENTS.md`.

**Revisão (2026-11-24, @oracle):** o comando `next upgrade --agent=security` abre um handoff interativo e não garante o bump; a via executada é `npm install next@16.4.6 eslint-config-next@16.4.6`. O fallback de mocks só vale quando `supabase === null`, nunca em erro real de query. A home permanece síncrona, com busca feita por componente cliente. Deploy em Vercel e testes em dispositivos reais continuam como etapa manual externa.

## Global Constraints

- Idioma: todo texto de UI, comentários, docs e commits em pt-BR; região: Serra dos Aimorés.
- Stack fixa: Next.js 16 App Router + Tailwind 4 + Supabase + Vercel. Sem auth, pagamentos, chat em tempo real, painel admin, app nativo ou novas dependências.
- Versão alvo do Next.js: **16.4.6** (atual: 16.4.3). Upgrade não é major bump.
- Rotas minúsculas; componentes PascalCase em `src/components/`; acesso a dados em `src/services/`; cliente Supabase e validações em `src/lib/`; tipos em `src/types/`; nenhuma query direta em componente.
- `src/lib/supabase.js` exporta `null` sem `NEXT_PUBLIC_SUPABASE_*`; todo service trata `if (!supabase)` sem lançar exceção.
- `cacheComponents` e `partialPrefetching` ativos: nenhum `new Date()` ou valor dependente de tempo no render; `params` de rota dinâmica é Promise — usar `await params` em server component dentro de `<Suspense>`.
- Categorias iniciais: `Reformas`, `Computadores`, `Celulares`.
- Testes apenas com `node:test` nativo; comandos de validação: `npm test`, `npm run lint`, `npm run build`.

## Review Focus

1. **Sem `.env.local` (`supabase === null`) versus erro real de query:** somente no primeiro caso catálogo/perfil usam mocks com aviso de modo demonstração; no segundo, exibem erro e nunca telefones fictícios como reais. Formulários devem mostrar erro real, nunca "sucesso" falso. Teste: Task 3 (ausência de `setTimeout`/`console.log` + imports dos services) e checagem manual em Task 6.
2. **Sem policy de SELECT anon em `orcamentos`/`solicitacoes_cadastro`:** os services de escrita não podem usar `.insert(...).select()`; criar policy pública de SELECT exporia dados de clientes. Teste: Task 3 (assertiva sobre o código-fonte do service).
3. **Deep-link `?categoria=Celulares`:** os cards devem abrir já filtrados. Teste: Task 4 (`categoriaValida`) e checagem manual em Task 6.
4. **Campos obrigatórios e telefone inválido:** mensagens exatas, sem envio. Testes unitários em Task 2.
5. **Prerender com Cache Components e rotas `[id]`:** nenhum valor de tempo no render; `await params` preservado sob `<Suspense>`; home sem fetch de servidor. Teste: `npm run build` ao fim de cada task, sem env e (se disponível) com env; se aparecer `SecurityFatalError`, repetir o comando uma vez.

**Fora deste plano (dependem de decisão externa):** domínio final; URLs de depoimentos em vídeo (seção permanece com estado honesto "Em breve"); seed de profissionais reais no banco (mocks locais permanecem).

---

### Task 1: Baseline e upgrade de segurança

**Files:**
- Modify: `package.json`, `package-lock.json`
- Commit pendente: `AGENTS.md`, `src/app/orcamento/[id]/page.js`, `src/app/profissionais/[id]/page.js`, `ANALISE_ESTADO_ATUAL.md`, `exemplos/`, `.planning/2026-10-28-mvp-manutencao-e-servicos/`

**Interfaces:**
- Consumes: nada.
- Produces: `next@16.4.6` no `package.json`/lock; working tree limpo antes do upgrade.

- [ ] **Step 1: Fixar o baseline**

```bash
git add AGENTS.md 'src/app/orcamento/[id]/page.js' 'src/app/profissionais/[id]/page.js' ANALISE_ESTADO_ATUAL.md docs/ exemplos/ .planning/2026-10-28-mvp-manutencao-e-servicos/
git commit -m "docs: registrar analise de estado e correcoes do Next.js 16"
git status --short
```
Expected: sem arquivos modificados ou não rastreados. Incluir `exemplos/` como referência visual versionada.

- [ ] **Step 2: Confirmar a vulnerabilidade antes do upgrade**

Run: `npm audit --omit=dev --audit-level=moderate`
Expected: exit 1 (1 advisory moderado em `next@16.4.3`).

- [ ] **Step 3: Aplicar o upgrade de forma determinística**

Run (na raiz do repositório): `npm install next@16.4.6 eslint-config-next@16.4.6`
Expected: `package.json` com `"next": "16.4.6"` e `"eslint-config-next": "16.4.6"`; lockfile atualizado. A recomendação do CLI foi `next upgrade --agent=security --internal-nudge-id=13fb59fb-bf31-43da-be8b-9b25f2654963`, mas ela delega a um handoff interativo (worktree + `experimental.agentUpgrade` no `next.config.ts`) e não garante o bump — usar apenas se o usuário pedir expressamente esse fluxo, com decisão de worktree e commit também de `next.config.ts`. O plano assume o checkout atual, limpo após o Step 1.

- [ ] **Step 4: Verificar o upgrade**

Run: `npm audit --omit=dev --audit-level=moderate && npm run lint && npm run build`
Expected: exit 0 nos três; build sem aviso de vulnerabilidade; 9 rotas geradas.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: atualizar Next.js para 16.4.6"
```

### Task 2: Infraestrutura de testes e validações puras

**Files:**
- Modify: `package.json`, `src/lib/validacoes.js`
- Create: `tests/validacoes.test.js`

**Interfaces:**
- Consumes: `validarTelefone` e `validarEmail` já existentes em `src/lib/validacoes.js`.
- Produces: `validarPedidoOrcamento(form)` e `validarSolicitacaoCadastro(form)` → objeto `{ [campo]: mensagem }`, vazio quando válido.

- [ ] **Step 1: Habilitar ESM e o runner nativo**

Em `package.json`, adicionar `"type": "module"` e `"scripts.test": "node --test tests"`, mantendo as dependências intactas.

- [ ] **Step 2: Escrever os testes que falham**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { validarPedidoOrcamento, validarSolicitacaoCadastro } from "../src/lib/validacoes.js";

test("pedido exige nome, telefone com DDD e descricao", () => {
  assert.deepEqual(validarPedidoOrcamento({ nome_cliente: "", telefone: "123", descricao_servico: "" }), {
    nome_cliente: "Informe seu nome.",
    telefone: "Informe um telefone com DDD.",
    descricao_servico: "Descreva o servico.",
  });
  assert.deepEqual(validarPedidoOrcamento({ nome_cliente: "Ana", telefone: "(31) 99999-9999", descricao_servico: "Conserto" }), {});
});

test("cadastro exige nome, categoria, cidade e WhatsApp", () => {
  assert.deepEqual(validarSolicitacaoCadastro({ nome: "", categoria: "", cidade: "", telefone_whatsapp: "123" }), {
    nome: "Informe seu nome.",
    categoria: "Selecione uma categoria.",
    cidade: "Informe sua cidade.",
    telefone_whatsapp: "Informe um WhatsApp com DDD.",
  });
});
```

- [ ] **Step 3: Rodar e confirmar a falha**

Run: `npm test`
Expected: FAIL com `SyntaxError: ... does not provide an export named 'validarPedidoOrcamento'`.

- [ ] **Step 4: Implementar as duas funções**

Em `src/lib/validacoes.js`, usar `validarObrigatorio` para texto e `validarTelefone` para telefone/WhatsApp, devolvendo as mensagens exatas dos testes. Não validar `email` nem `descricao` do cadastro (opcionais).

- [ ] **Step 5: Verificar**

Run: `npm test && npm run lint && npm run build`
Expected: testes passam; lint e build exit 0.

- [ ] **Step 6: Commit**

```bash
git add package.json src/lib/validacoes.js tests/validacoes.test.js
git commit -m "test: adicionar validacoes puras dos formularios"
```

### Task 3: Escrita segura e formulários reais

**Files:**
- Modify: `src/services/orcamentos.service.js`, `src/components/FormOrcamento.jsx`, `src/app/cadastro-profissional/page.js`
- Create: `tests/integracao-formularios.test.js`

**Interfaces:**
- Consumes: `validarPedidoOrcamento`, `validarSolicitacaoCadastro` (Task 2); `enviarPedidoOrcamento`, `enviarSolicitacaoCadastro` (services existentes).
- Produces: services de escrita retornam `{ data: payload | null, error }` sem `.select()`; formulários só exibem sucesso quando `error` for nulo.

- [ ] **Step 1: Escrever testes de guarda que falham**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const servico = readFileSync("src/services/orcamentos.service.js", "utf8");
const orcamento = readFileSync("src/components/FormOrcamento.jsx", "utf8");
const cadastro = readFileSync("src/app/cadastro-profissional/page.js", "utf8");

test("services de escrita nao pedem SELECT ao banco", () => {
  assert.equal(/\.select\(/.test(servico), false);
  assert.match(servico, /enviarPedidoOrcamento/);
  assert.match(servico, /enviarSolicitacaoCadastro/);
});

test("formularios usam services e nao simulam envio", () => {
  assert.match(orcamento, /enviarPedidoOrcamento/);
  assert.match(cadastro, /enviarSolicitacaoCadastro/);
  for (const fonte of [orcamento, cadastro]) {
    assert.equal(/setTimeout\(/.test(fonte), false);
    assert.equal(/console\.log\(/.test(fonte), false);
  }
});
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npm test`
Expected: FAIL nos dois testes — o de `.select()` (ainda presente em `orcamentos.service.js:5,14`) e o de formulários.

- [ ] **Step 3: Corrigir os services de escrita**

Em `src/services/orcamentos.service.js`, trocar `.insert([payload]).select()` por `.insert([payload])` e retornar `{ data: error ? null : payload, error }`. Manter o guard `if (!supabase) return { data: null, error: new Error("Supabase não configurado") }`. Não criar policy de SELECT anon. Observação: `data: payload` é apenas o eco do dado enviado pelo cliente, não confirmação do servidor; os formulários devem usar somente `error` para decidir o sucesso.

- [ ] **Step 4: Ligar os formulários**

Em `src/components/FormOrcamento.jsx` e `src/app/cadastro-profissional/page.js`: chamar o validador correspondente e exibir a primeira mensagem no estado `erro`; chamar o service com o payload atual (incluindo `profissional_id` no orçamento); só chamar `setStatus("sucesso")` se `error` for nulo; no `catch`, preencher `erro` com a mensagem retornada. Preservar os textos de sucesso atuais.

- [ ] **Step 5: Verificar**

Run: `npm test && npm run lint && npm run build`
Expected: todos exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/services/orcamentos.service.js src/components/FormOrcamento.jsx src/app/cadastro-profissional/page.js tests/integracao-formularios.test.js
git commit -m "feat: gravar orcamentos e cadastros no Supabase"
```

### Task 4: Leitura real com fallback, mocks centralizados e deep-link

**Files:**
- Create: `src/lib/categorias.js`, `src/lib/mocks.js`, `tests/categorias.test.js`
- Modify: `src/lib/supabase.js`, `src/app/page.js`, `src/app/profissionais/page.js`, `src/app/profissionais/[id]/page.js`, `src/app/orcamento/[id]/page.js`, `src/app/cadastro-profissional/page.js`, `src/components/FiltroProfissionais.jsx`

**Interfaces:**
- Consumes: `obterProfissionais`, `obterProfissionalPorId`, `obterPortfolio`, `obterReferencias`, `obterCategorias` (services existentes).
- Produces: `CATEGORIAS_PADRAO`, `categoriaValida(valor)`; `PROFISSIONAIS_MOCK`, `PERFIS_MOCK`, `NOMES_PROFISSIONAIS_MOCK` em `src/lib/mocks.js`; `isSupabaseConfigurado()` em `src/lib/supabase.js`.

- [ ] **Step 1: Escrever testes que falham**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { CATEGORIAS_PADRAO, categoriaValida } from "../src/lib/categorias.js";

test("categorias iniciais", () => {
  assert.deepEqual(CATEGORIAS_PADRAO, ["Reformas", "Computadores", "Celulares"]);
});

test("categoria da URL so aceita valores conhecidos", () => {
  assert.equal(categoriaValida("Celulares"), "Celulares");
  assert.equal(categoriaValida("Inexistente"), "");
  assert.equal(categoriaValida(null), "");
});
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npm test`
Expected: FAIL com módulo `src/lib/categorias.js` não encontrado.

- [ ] **Step 3: Criar os módulos e substituir os arrays hardcoded**

`src/lib/categorias.js`: exportar `CATEGORIAS_PADRAO` com os três valores e `categoriaValida(valor)` que retorna o valor quando pertence à lista, senão `""`. `src/lib/mocks.js`: mover para lá os três conjuntos de mocks hoje definidos em `src/app/profissionais/page.js`, `src/app/profissionais/[id]/page.js` e `src/app/orcamento/[id]/page.js`. Substituir os arrays de categorias em `src/app/page.js`, `src/app/profissionais/page.js` e `src/app/cadastro-profissional/page.js` pelo import de `CATEGORIAS_PADRAO`; manter o seed SQL inalterado.

- [ ] **Step 4: Conectar o catálogo e o deep-link**

Em `src/lib/supabase.js`, exportar `isSupabaseConfigurado()` que retorna `Boolean(supabase)`, sem abrir queries. Em `src/app/profissionais/page.js`: manter `"use client"`; dividir em `ProfissionaisPage` (que só envolve `<Suspense fallback={<p>Carregando filtros…</p>}>`) e `Catalogo` (que usa `useSearchParams()`). Inicializar `filtro.categoria` com `categoriaValida(searchParams.get("categoria"))`. Carregar dados com `obterProfissionais(filtro)` em `useEffect`. Usar `PROFISSIONAIS_MOCK` **somente** quando `!isSupabaseConfigurado()`, exibindo `Modo demonstração: configure o Supabase para ver dados reais.`; se houver env e a query falhar, exibir `Não foi possível carregar os profissionais. Tente novamente.` sem mocks (evita telefones fictícios como reais). Adicionar prop `valorInicial` a `FiltroProfissionais` para o `<select>` refletir a categoria da URL.

- [ ] **Step 5: Conectar perfil e orçamento**

Em `src/app/profissionais/[id]/page.js`, dentro de `PerfilProfissional`: manter `const { id } = await params`; buscar `obterProfissionalPorId(id)`, `obterPortfolio(id)` e `obterReferencias(id)`. Usar `PERFIS_MOCK[id]` **somente** quando `!isSupabaseConfigurado()` (as chaves dos mocks são numéricas; com Supabase configurado, `id` é UUID e o fallback não se aplica). Se houver env e a busca falhar ou não retornar registro, manter a mensagem "Profissional não encontrado ou indisponível." Em `src/app/orcamento/[id]/page.js`, usar `obterProfissionalPorId(id)` com fallback em `NOMES_PROFISSIONAIS_MOCK[id]` restrito ao modo sem env, preservando `await params` e o `<Suspense>`.

- [ ] **Step 6: Verificar**

Run: `npm test && npm run lint && npm run build`
Expected: exit 0; rotas `[id]` continuam com Partial Prerender.

- [ ] **Step 7: Commit**

```bash
git add src/lib/categorias.js src/lib/mocks.js src/lib/supabase.js tests/categorias.test.js src/app/page.js src/app/profissionais/page.js 'src/app/profissionais/[id]/page.js' 'src/app/orcamento/[id]/page.js' src/app/cadastro-profissional/page.js src/components/FiltroProfissionais.jsx
git commit -m "feat: carregar catalogo e perfis do Supabase com fallback"
```

### Task 5: Home e Header alinhados aos mockups

**Files:**
- Modify: `src/app/page.js`, `src/components/Header.jsx`
- Create: `src/components/DestaquesHome.jsx`, `tests/home.test.js`

**Interfaces:**
- Consumes: `obterProfissionais`, `PROFISSIONAIS_MOCK` e `isSupabaseConfigurado()` (Task 4); `CardProfissional`, `AbaCategorias`.
- Produces: seções "Profissionais em destaque", "Como funciona" e "Precisa de um orçamento?" na home; link `/orcamento` no Header.

- [ ] **Step 1: Escrever teste de guarda que falha**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync("src/app/page.js", "utf8");
const header = readFileSync("src/components/Header.jsx", "utf8");

test("home e header expoem as secoes e o CTA de orcamento", () => {
  for (const texto of ["Profissionais em destaque", "Como funciona", "Precisa de um orçamento?", "Solicitar orçamento"]) {
    assert.equal(home.includes(texto), true);
  }
  assert.match(home, /href="\/orcamento"/);
  assert.match(header, /href="\/orcamento"/);
});
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npm test`
Expected: FAIL — strings ausentes em `src/app/page.js`.

- [ ] **Step 3: Implementar as seções**

Manter `Home` como server component síncrona (evitar fetch assíncrono em rota prerenderizada com Cache Components). Criar `src/components/DestaquesHome.jsx` como componente cliente: `useEffect` chama `obterProfissionais()`; usa `PROFISSIONAIS_MOCK.slice(0, 3)` apenas quando `!isSupabaseConfigurado()` e mostra erro textual se a query falhar com env; renderiza três `CardProfissional`. Em `src/app/page.js`, manter o título "Profissionais em destaque" e montar `<DestaquesHome />`. Adicionar "Como funciona" com os três passos do mockup `exemplos/01-home-aco-suave.html:263-265` (Busque / Compare / Contrate — usar o texto exato do mockup) e o CTA "Precisa de um orçamento?" / "Solicitar orçamento" com `href="/orcamento"`. Manter a seção de depoimentos com o texto "Em breve" (sem URLs no spec). O visual final segue o sistema de design existente; os mockups são referência de conteúdo, não código.

- [ ] **Step 4: Ajustar o Header**

Incluir link `href="/orcamento"` com texto "Orçamento" ao lado de "Profissionais" e "Como funciona".

- [ ] **Step 5: Verificar**

Run: `npm test && npm run lint && npm run build`
Expected: exit 0; nenhum valor dependente de tempo introduzido no render.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.js src/components/Header.jsx src/components/DestaquesHome.jsx tests/home.test.js
git commit -m "feat: completar home com destaques, como funciona e CTA"
```

### Task 6: Documentação, lacunas e validação final

**Files:**
- Modify: `README.md`, `.planning/2026-10-28-mvp-manutencao-e-servicos/findings.md`
- Create: `tests/documentacao.test.js`

**Interfaces:**
- Consumes: todas as tasks anteriores.
- Produces: README executável do zero; plano atualizado com o resultado da execução.

- [ ] **Step 1: Escrever teste de guarda que falha**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const readme = readFileSync("README.md", "utf8");

test("README descreve setup real e caminhos corretos", () => {
  assert.equal(readme.includes("src/styles/"), false);
  assert.match(readme, /supabase\/schema\.sql/);
  assert.match(readme, /npm test/);
  assert.match(readme, /npm run build/);
});
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npm test`
Expected: FAIL em "README descreve setup real...".

- [ ] **Step 3: Corrigir o README**

Trocar `src/styles/` por `src/app/globals.css`; acrescentar: aplicar `supabase/schema.sql` no SQL Editor antes de usar o app com dados reais; copiar `.env.local.example` para `.env.local`; explicar o modo demonstração sem env; documentar `npm test`, `npm run lint`, `npm run build`; detalhar as variáveis na Vercel.

- [ ] **Step 4: Registrar decisões e lacunas que permanecem abertas**

Em `.planning/2026-10-28-mvp-manutencao-e-servicos/findings.md`: registrar que o campo `data` das referências **continua `[A confirmar]`** (não decidir unilateralmente que é `created_at`); que o domínio final também segue `[A confirmar]`; que o seed de profissionais permanece mock no frontend; que não foi criada policy de SELECT anon (o `.select()` foi removido dos services). Perguntar ao usuário as lacunas antes de qualquer publicação.

- [ ] **Step 5: Validação local completa**

```bash
npm test && npm run lint && npm run build
npm run dev > /tmp/opencode/dev-mvp.log 2>&1 &
DEV_PID=$!
curl -s 'http://localhost:3000/profissionais?categoria=Celulares' | grep -o 'Carlos Lima'
kill "$DEV_PID"
```
Expected: testes/lint/build exit 0; o `curl` encontra Carlos Lima (mock sem env). Com env configurado, os dados vêm do Supabase; sem env, os formulários exibem "Supabase não configurado" em vez de "enviado com sucesso". `npm run dev` não faz parte da cadeia `&&` porque não retorna. Publicar na Vercel e testar em dispositivos reais são passos manuais externos, **fora** deste fechamento.

- [ ] **Step 6: Commit e fechamento do plano**

```bash
git add README.md .planning/2026-10-28-mvp-manutencao-e-servicos/findings.md tests/documentacao.test.js
git commit -m "docs: corrigir setup e registrar lacunas em aberto"
git status --short
```
Expected: working tree limpo; marcar as fases do plano ativo como concluídas ao executar este plano.
