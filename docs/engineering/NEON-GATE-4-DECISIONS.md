# Decisões pendentes para Gate 4

**Status:** preparação de engenharia; Gates 1–3 permanecem pendentes.

## Decisões a registrar antes da implementação
1. API: runtime, organização de rotas, validação server-side e limite de payload.
2. Auth: fornecedor/biblioteca, política de senha, MFA, recuperação, sessão e revogação.
3. Autorização: papéis, escopo por profissional, checagem no servidor e eventual RLS.
4. Banco: região, plano/cota, pooling, TLS, migrations, separação de ambientes e menor privilégio.
5. Privacidade: minimização, retenção, exclusão, backups, acesso e logs sem PII.
6. Operação: CI de migrations, alertas, restauração, resposta a incidentes e rollback.
7. Custos: estimativa e aprovação antes de criar recursos pagos.
8. Deploy: habilitar preview funcional apenas quando necessário, sem alteração de produção sem autorização.

## Saída exigida
ADR aprovada, matriz de testes de acesso positivo/negativo, política de segredos, plano de rollback, critérios de aceite e evidência de gates anteriores. Até lá, manter landing estática e dados fictícios somente nas prévias locais.
