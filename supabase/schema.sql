-- Schema MVP: Manutenção e Serviços (Supabase / PostgreSQL)
-- Executar no SQL Editor do Supabase.

-- Categorias
create table if not exists categorias (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  descricao text,
  created_at timestamptz default now()
);

-- Profissionais
create table if not exists profissionais (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  categoria text not null,
  descricao text,
  cidade text not null,
  bairro text,
  telefone_whatsapp text,
  foto_url text,
  valor_base text,
  ativo boolean default false,
  created_at timestamptz default now()
);

-- Portfólio
create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  profissional_id uuid not null references profissionais(id) on delete cascade,
  titulo text not null,
  descricao text,
  imagem_url text,
  created_at timestamptz default now()
);

-- Referências / avaliações (moderação manual)
create table if not exists referencias (
  id uuid primary key default gen_random_uuid(),
  profissional_id uuid not null references profissionais(id) on delete cascade,
  nome_cliente text not null,
  comentario text not null,
  nota int check (nota between 1 and 5),
  status_moderacao text default 'pendente', -- pendente | aprovado | rejeitado
  created_at timestamptz default now()
);

-- Pedidos de orçamento
create table if not exists orcamentos (
  id uuid primary key default gen_random_uuid(),
  nome_cliente text not null,
  telefone text not null,
  email text,
  profissional_id uuid references profissionais(id),
  descricao_servico text not null,
  mensagem text,
  created_at timestamptz default now()
);

-- Solicitações de cadastro de profissional
create table if not exists solicitacoes_cadastro (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  categoria text not null,
  cidade text not null,
  telefone_whatsapp text not null,
  descricao text,
  status text default 'pendente', -- pendente | aprovado | rejeitado
  created_at timestamptz default now()
);

-- RLS: leitura pública apenas de profissionais ativos
alter table profissionais enable row level security;
create policy "profissionais_public_read" on profissionais
  for select using (ativo = true);

alter table portfolio enable row level security;
create policy "portfolio_public_read" on portfolio
  for select using (true);

alter table referencias enable row level security;
create policy "referencias_public_read" on referencias
  for select using (status_moderacao = 'aprovado');

alter table categorias enable row level security;
create policy "categorias_public_read" on categorias
  for select using (true);

-- Inserção de orçamentos e solicitações de cadastro: permitir anon (MVP)
alter table orcamentos enable row level security;
create policy "orcamentos_anon_insert" on orcamentos
  for insert with check (true);

alter table solicitacoes_cadastro enable row level security;
create policy "solicitacoes_anon_insert" on solicitacoes_cadastro
  for insert with check (true);

-- Seed de categorias
insert into categorias (nome, descricao) values
  ('Reformas', 'Reformas residenciais e construções'),
  ('Computadores', 'Conserto e manutenção de computadores'),
  ('Celulares', 'Conserto e manutenção de celulares')
on conflict (nome) do nothing;
