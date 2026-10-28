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
- `src/lib/` — cliente Supabase e validações
- `src/services/` — funções de acesso a dados
- `src/styles/` — estilos globais
- `src/types/` — definições de entidades

## Variáveis de ambiente

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Deploy

Conectar o repositório no Vercel e configurar as variáveis de ambiente do Supabase.

## Escopo do MVP

Inclui: catálogo por categoria, perfil do profissional, portfólio, referências, filtros, contato via formulário/WhatsApp, cadastro de profissional com aprovação.

Fora do MVP: autenticação, pagamentos, chat em tempo real, painel administrativo, app nativo.