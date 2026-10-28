# AGENTS.md — Manutenção e Serviços

## Repo state
- Documentation/planning only. No application code, package manifest, tests, or build commands exist yet.
- Canonical spec: `DOCUMENTACAO_CONSOLIDADA.md`. Historical/variant sources live under `Docs/Arquivados/` (chat export + Gemini PDF) and are superseded by the consolidated doc.
- Language of docs and user-facing copy: Portuguese (pt-BR). Region focus: Serra dos Aimorés.
- Always respond to the user in Brazilian Portuguese (pt-BR).
- All documentation and content aimed at the end user must be written in Brazilian Portuguese (pt-BR).

## Product (MVP scope)
- Local catalog connecting clients to maintenance/service professionals, organized by category, with portfolios, references/reviews, and contact/quote requests.
- MVP excludes: auth, payments, real-time chat, admin panel, native mobile app. Contact is via form and/or WhatsApp link.
- Open questions in the spec are marked `[A confirmar]` / `[Informação ausente]` — do not invent answers; ask or keep marked.

## Planned stack (do not expand beyond this)
- Next.js (App Router) + Supabase (PostgreSQL + Storage) + Vercel.
- Styling is undecided: CSS puro vs Tailwind — confirm before choosing; both are accepted.
- Avoid microservices, Docker/Kubernetes, multiple DBs, GraphQL, complex infra, payment gateways, real-time chat before MVP validation.

## Conventions (when implementing)
- Routes lowercase (`/profissionais`, `/profissionais/[id]`, `/orcamento`, `/como-funciona`).
- Components PascalCase (`CardProfissional.jsx`); services in `services/`; Supabase client + validations in `lib/`; no direct DB queries scattered in components.
- Identifiers in clear pt-BR or simple English (e.g. `obterProfissionais`, `enviarPedidoOrcamento`).
- Follow folder layout in consolidated doc §4.1.

## Notes
- No git repository is initialized in this workspace.
- Process skills (brainstorming before new features, systematic-debugging for bugs) are enforced by the environment.