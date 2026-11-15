# Neon PostgreSQL — inventário e preparação

**Status:** arquitetura futura proposta, não implantação nem aprovação dos gates.

## Inventário verificado (2026-11-15)

- Frontend: Vue 3, TypeScript e Vite, com landing pública e prévias exclusivamente locais de perfil e fluxo administrativo.
- Dependências do `package.json`: Vue; ferramentas de desenvolvimento Vite, Vitest, TypeScript, Playwright e axe. **Sem** `@supabase/supabase-js`, cliente PostgreSQL ou biblioteca de autenticação.
- `src/main.ts`: prévias `?preview=admin` e `?preview=profile` habilitadas somente com `import.meta.env.DEV`.
- `docs/security/ADMIN-THREAT-MODEL.md`: não existe API, autenticação, banco ou painel administrativo em produção.
- `docs/product/MVP-VALIDATION-GATES.md`: Gates 1–3 pendentes antes da implementação de autenticação, autorização e persistência.
- GitHub Actions: testes, auditoria de dependências, typecheck/build e Playwright; nenhuma conexão de banco requerida.
- Vercel: projeto Vite com produção em `main`, previews automáticos em branches; `vercel.json` define headers de segurança.
- Consulta de projetos Neon por nome `acolhe`: nenhum projeto correspondente encontrado. A busca por nome não prova inexistência absoluta sob outro nome.

**Conclusão:** não há dependência operacional Supabase conhecida no código verificado; há referências de arquitetura e planejamento a substituir. Não há dados reais ou migrations Supabase identificados nas superfícies auditadas. A verificação não constitui inventário exaustivo de todos os arquivos e ambientes externos.

## Arquitetura alvo, condicionada a aprovação

- Banco Neon PostgreSQL isolado para AcolheMente; SSL obrigatório; credenciais apenas no backend, nunca em variáveis `VITE_*`.
- Futuro serviço de API com consultas parametrizadas, transações e pool de conexões adequado a funções serverless.
- Avaliar Better Auth no Gate 4, incluindo sessões, proteção CSRF, rate limiting, recuperação de conta e permissões no servidor.
- Isolamento por profissional/tenant verificado no backend e, se adotado, RLS com identidade transacional definida explicitamente. Não reutilizar `auth.uid()` do Supabase.
- Migrations versionadas, idempotência controlada e plano de rollback. Testes de autorização negativa e isolamento com dados fictícios.
- Storage, Realtime e Edge Functions: **não necessários no MVP atual**; não provisionar serviços especulativos.
- Segredos futuros (somente quando necessários): `DATABASE_URL`, opcional `DATABASE_URL_UNPOOLED`, `AUTH_SECRET` e `AUTH_BASE_URL`; nunca registrar valores reais.
- Ambientes: desenvolvimento isolado, homologação fictícia e produção com credenciais segregadas; sem copiar dados clínicos.

## Bloqueios e sequência

1. Gate 1: aprovar conteúdo profissional.
2. Gate 2: aprovar campos administrativos, fluxo e estados, sem campos clínicos.
3. Gate 3: aprovar finalidade, base legal, retenção, exclusão, aviso e responsabilidades.
4. Gate 4: revisar arquitetura API/Neon/Auth, identidade, RLS/autorização, backup, restauração e separação de ambientes.
5. Só então provisionar projeto Neon, migrations e backend. Testar isolamento, rollback, segurança e recuperação em ambiente fictício antes de qualquer dado real.
6. Gates 5–6: homologação e piloto controlado, com autorização específica.

Não criar banco, tabelas de pacientes, cadastro, API ou coleta real apenas por decisão de padronização. A política de migração não substitui os gates de proteção de dados. A aplicação pública atual deve permanecer disponível e sem mudanças de infraestrutura de produção.

## Fila de execução e evidências

| Prioridade | Tarefa | Estado | Evidência / dependência |
| --- | --- | --- | --- |
| P1 | Remover direcionamento futuro ao Supabase em README, arquitetura e instruções de agentes | Implementada, aguardando CI e merge | PR #38; alterações versionadas |
| P1 | Registrar a decisão arquitetural Neon e os limites do MVP | Implementada, aguardando CI e merge | ADR 0004, PR #38 |
| P1 | Aprovar finalidade, campos, retenção e conteúdo profissional | Bloqueada externamente | Gates 1–3 pendentes |
| P1 | Definir API, Auth e isolamento PostgreSQL com critérios verificáveis | Pendente, depende dos Gates 1–3 | Gate 4 |
| P1 | Provisionar banco Neon, migrations e autenticação | Bloqueada | Gate 4; nenhuma credencial deve ser criada antecipadamente |
| P2 | Testar isolamento, restauração e fluxo completo em homologação fictícia | Bloqueada | API, Auth, banco e Gate 5 |
| P2 | Homologar piloto e ativar coleta real | Bloqueada externamente | Gate 6 e autorização operacional explícita |

A PR #32 contém uma fila de trabalho geral ainda não integrada; este quadro registra somente o escopo de Neon e não a substitui.
