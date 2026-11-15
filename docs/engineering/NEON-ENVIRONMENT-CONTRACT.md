# Contrato de ambiente — Neon (planejado)

**Não criar estas variáveis em produção nesta fase.** São nomes propostos para o futuro backend e devem ser revisados no Gate 4.

| Nome | Destino | Regra |
| --- | --- | --- |
| `DATABASE_URL` | servidor | URL TLS do PostgreSQL; nunca expor em Vite ou logs |
| `DATABASE_URL_UNPOOLED` | servidor, se necessário | migrações e operações incompatíveis com pooling |
| `AUTH_SECRET` | servidor | segredo de sessão com rotação planejada |
| `AUTH_BASE_URL` | servidor | origem pública validada, específica por ambiente |

- Nunca criar `VITE_DATABASE_URL`, `VITE_AUTH_SECRET` ou outra variável `VITE_*` com credenciais.
- Separar desenvolvimento, homologação e produção com bancos e segredos distintos.
- Proibir credenciais reais em commits, issues, PRs, screenshots e logs.
- Preferir permissões mínimas; não usar credenciais administrativas na aplicação.
- Validar SSL/TLS, pooling, timeouts e limites de conexões antes de provisionar.
- Documentar recuperação, backup e descarte, inclusive retenção de backups.
- Se o provedor de autenticação precisar de outros nomes de ambiente, registrar revisão de arquitetura e atualizar testes antes de integrar.

Não há arquivo `.env` com valores reais neste documento.
