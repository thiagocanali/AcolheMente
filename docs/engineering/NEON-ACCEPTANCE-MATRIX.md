# Matriz de aceite para futura implementação Neon

**Estado:** critérios técnicos planejados; não executados.

| Cenário | Resultado esperado | Evidência futura |
| --- | --- | --- |
| Usuário sem login acessa painel | 401, sem registros | Teste API |
| Usuário autenticado sem papel autorizado | 403 | Teste API |
| Usuário A consulta ID de usuário B | Negado sem vazamento de existência ou conteúdo | Integração PostgreSQL |
| Usuário A altera registro de B | Nenhuma alteração | Integração PostgreSQL |
| Sessão expirada ou revogada | Reautenticação exigida | Teste Auth |
| Solicitação inválida | Erro controlado sem gravar dados | Teste API |
| Falha de banco | Resposta genérica, sem string de conexão | Teste API |
| Migração em banco vazio | Aplicação reprodutível | CI de migrações |
| Backup e restauração | Restauração validada em ambiente isolado | Exercício documentado |
| Build frontend | Sem segredos ou cliente Supabase | Teste automatizado |
| Retenção e exclusão | Política aprovada e implementada | Teste de integração |
| Fluxo com dados fictícios | Acessível, responsivo, funcional | Playwright |

Não marcar nenhum cenário como aprovado antes de execução verificável no ambiente correspondente. Gates 1–4 são pré-requisitos para implementação; Gate 5 exige homologação fictícia e Gate 6 aprovação operacional.
