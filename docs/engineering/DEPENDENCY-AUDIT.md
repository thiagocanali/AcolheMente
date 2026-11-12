# Auditoria contínua de dependências

## Execução

O workflow `Dependency audit` consulta o npm em PRs que alteram dependências, o próprio workflow ou seu validador/testes. Também pode ser iniciado manualmente pelo GitHub Actions e roda às segundas-feiras às 12:17 UTC (09:17 em São Paulo). O agendamento só fica ativo após integração na branch padrão e pode sofrer atraso do GitHub.

A instalação utiliza o lockfile com `npm ci`. A consulta inclui dependências de desenvolvimento, pois ferramentas de build e teste também executam código. O workflow preserva o lockfile auditado e o relatório JSON como artefatos para investigação.

## Critérios de falha

- Vulnerabilidade moderada, alta ou crítica: execução falha, conforme o limite já usado pela CI principal.
- Falha de rede/registry ou outro erro do comando npm: execução falha, mesmo que algum JSON tenha sido produzido.
- JSON inválido, versão de relatório desconhecida, contagens ausentes ou inconsistentes: execução falha; não tratar como ausência de vulnerabilidades.
- Vulnerabilidades baixas/informativas aparecem no relatório, sem bloquear pelo limite atual.

O passo de consulta permite continuar temporariamente para preservar o relatório. Os passos seguintes validam o conteúdo e exigem que o comando original tenha terminado com sucesso; `continue-on-error` não transforma a execução completa em aprovação.

O script `scripts/report-audit.mjs` resume e valida o relatório. Seus testes de erro e de código de saída fazem parte de `npm test`, usando `node:test` sem nova dependência. Para verificar manualmente:

```bash
npm audit --audit-level=moderate --json > npm-audit.json
node scripts/report-audit.mjs npm-audit.json
```

O primeiro comando também deve ter seu código de saída verificado; o script complementar não substitui esse resultado. Não commitar o relatório temporário.

## Resposta a falhas

Consultar o motivo no workflow e o artefato. Se a consulta falhou, restaurar a conectividade e executar novamente; não concluir que o projeto está livre de advisories. Se houver vulnerabilidade, avaliar o advisory, alcance e versão corrigida; atualizar por PR, revisar o lockfile e executar os testes. Não aplicar `npm audit fix --force` automaticamente.

O workflow não envia mensagens externas, não cria issues e não atualiza dependências automaticamente. As notificações seguem as preferências do GitHub de quem acompanha o repositório. Um relatório limpo representa o conhecimento do registry naquele momento, não uma garantia de segurança.

## Validação em 2026-11-12

12 testes de componentes e quatro testes da auditoria aprovados; typecheck e build aprovados. A consulta real ao npm retornou relatório versão 2 com zero vulnerabilidades, aceito pelo validador. Testes cobrem erros do registry, JSON inválido, relatório incompleto/inconsistente, vulnerabilidades bloqueantes e códigos de saída do CLI.
