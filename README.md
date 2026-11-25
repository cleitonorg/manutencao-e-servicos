# Manutenção e Serviços

Catálogo digital que conecta clientes a profissionais de manutenção e serviços em Serra dos Aimorés.

## Stack

- Next.js (App Router) + Tailwind CSS
- Supabase (PostgreSQL + Storage)
- Hospedagem: Vercel

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Copie o arquivo de ambiente e preencha com as credenciais do Supabase:

```bash
cp .env.local.example .env.local
```

3. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse http://localhost:3000.

## Estrutura de pastas

Conforme `DOCUMENTACAO_CONSOLIDADA.md` §4.1:

- `src/app/` — páginas (rotas)
- `src/components/` — componentes reutilizáveis
- `src/lib/` — cliente Supabase, validações e mocks locais
- `src/services/` — funções de acesso a dados
- `src/tests/` não é usado; testes em `tests/` na raiz do repo
- `src/app/globals.css` — estilos globais (Tailwind 4)
- `src/types/` — definições de entidades (em andamento)

## Variáveis de ambiente

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Setup (desenvolvimento)

1. `cp .env.local.example .env.local` — **opcional**; sem ele o app roda em modo demonstração (dados mock + aviso no catálogo e formulários).
2. No SQL Editor do projeto Supabase, aplicar `supabase/schema.sql` antes de configurar as variáveis.
3. `npm install` → `npm run dev` (localhost:3000).
4. Validar com `npm test`, `npm run lint` e `npm run build`.

## Deploy

Conectar o repositório no Vercel e configurar as variáveis de ambiente do Supabase.

## Escopo do MVP

Inclui: catálogo por categoria, perfil do profissional, portfólio, referências, filtros, contato via formulário/WhatsApp, cadastro de profissional com aprovação.

Fora do MVP: autenticação, pagamentos, chat em tempo real, painel administrativo, app nativo.