# Protótipo de regras administrativas (sem dados reais)

Este módulo implementa somente a função pura de transições proposta em [ciclo de vida](../product/ADMINISTRATIVE-REQUEST-LIFECYCLE.md). **Não é fluxo aprovado, nem painel, nem endpoint.** Não contém autenticação, banco, rede, formulário ou armazenamento. Os testes usam somente estados e dados fictícios.

## Contrato

- Estados: `received`, `reviewing`, `contacted`, `closed`.
- Transições permitidas: `received → reviewing`, `received → closed`, `reviewing → contacted`, `reviewing → closed`, `contacted → closed`.
- Repetições, reversões, reaberturas e valores desconhecidos são recusados.
- Erros retornam somente códigos genéricos, sem repetir entradas.
- A função não realiza autorização: **uma futura API deverá autenticar, autorizar no servidor, validar estado atual de forma atômica e aplicar isolamento no banco**. Nunca confiar apenas nesta função ou em restrições da interface.

## Critérios para evoluir

1. Validar estados e jornada com a profissional piloto (Gate 2).
2. Aprovar finalidade, campos, base legal, aviso, retenção e descarte (Gate 3).
3. Desenhar autenticação, autorização, RLS e testes de acesso negado (Gate 4).
4. Só então implementar API, persistência e painel; homologar exclusivamente com dados fictícios.

Execute `npm run test` e `npm run typecheck` para validar as regras. Não conectar o protótipo a dados reais.
