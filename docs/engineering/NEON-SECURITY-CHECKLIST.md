# Checklist de segurança para a futura API Neon

**Estado:** especificação para Gate 4, sem autorização para ativar API ou persistência.

## Identidade e sessão
- Escolher e registrar a biblioteca de autenticação independente; revisar manutenção, suporte e compatibilidade com runtime.
- Cookies de sessão HttpOnly, Secure e SameSite apropriado; rotação e revogação de sessões.
- Verificar CSRF para operações mutáveis e proteção contra enumeração de contas.
- Limitar tentativas de login, recuperação e criação de solicitações sem registrar dados sensíveis.
- Não expor tokens, segredos, strings de conexão ou IDs internos em URLs públicas.

## Autorização e banco
- Identidade de sessão validada pelo servidor antes de cada acesso administrativo.
- Escopo obrigatório por profissional/tenant em leitura, escrita, atualização e exclusão.
- Se RLS for adotada, definir como o identificador autenticado entra em cada transação e testar pool/reutilização de conexão.
- Nunca usar `auth.uid()` sem Supabase Auth; não confiar no `tenant_id` enviado pelo navegador.
- Credenciais de banco exclusivas do backend, com TLS, privilégio mínimo e segregação por ambiente.
- Migrações versionadas, backup, restauração testada e procedimento de rollback.

## Testes de aceite futuros (somente dados fictícios)
- Visitante sem sessão recebe 401; sessão válida sem permissão recebe 403.
- Usuário A não lista, lê, edita ou exclui dados do usuário B.
- Sessão revogada e expirada não acessa recursos.
- Requests inválidos, CSRF e tentativas de enumeração são rejeitados.
- Logs, traces, respostas de erro e artefatos de CI não contêm PII nem segredos.
- Falhas de conexão ao banco não retornam detalhes internos.
- Testar restauração, descarte e isolamento de ambientes antes do piloto.

**Bloqueio:** gates 1–3 e aprovação do desenho no Gate 4. Este documento não habilita coleta real.
