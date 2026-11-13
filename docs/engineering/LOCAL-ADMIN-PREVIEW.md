# Prévia local do painel administrativo

Execute `npm ci`, `npm run dev` e abra `http://localhost:5173/?preview=admin`.

Esta tela é carregada **somente quando `import.meta.env.DEV` é verdadeiro**. O build de produção continua apresentando o site institucional. O parâmetro de URL **não é autenticação nem mecanismo de autorização**; nunca usar esse padrão para liberar um painel real.

A prévia inclui três solicitações identificadas exclusivamente por IDs fictícios, filtro por estado, transições propostas, estado terminal e botão para restaurar dados. Toda alteração é volátil em memória; não existe backend, API, banco, localStorage, cookies, login, envio de informações ou formulário de contato. Recarregar descarta as alterações.

A implementação utiliza as regras puras em `src/domain/administrative-request.ts`. O objetivo é revisar navegação, rótulos e transições com a profissional piloto, sem coletar informações de pacientes.

Antes de qualquer painel real: aprovar os gates 1–4 de `docs/product/MVP-VALIDATION-GATES.md`, especificar autorização no servidor e isolamento de registros, e testar acesso negado, retenção e exclusão. Esta prévia **não comprova conformidade, segurança ou prontidão operacional**.
