# Prévia local do painel administrativo

Execute `npm ci`, `npm run dev` e abra `http://localhost:5173/?preview=admin`.

Esta tela é carregada **somente quando `import.meta.env.DEV` é verdadeiro**. O build de produção continua apresentando o site institucional. O parâmetro de URL **não é autenticação nem mecanismo de autorização**; nunca usar esse padrão para liberar um painel real.

A prévia inclui três solicitações identificadas exclusivamente por IDs fictícios, filtro por estado, transições propostas, estado terminal e botão para restaurar dados. Toda alteração é volátil em memória; não existe backend, API, banco, localStorage, cookies, login, envio de informações ou formulário de contato. Recarregar descarta as alterações.

A implementação utiliza as regras puras em `src/domain/administrative-request.ts`. O objetivo é revisar navegação, rótulos e transições com a profissional piloto, sem coletar informações de pacientes.

Após uma transição acionada no controle focado, o foco segue para a primeira ação disponível do mesmo registro. Se o estado for final, segue para o cartão, identificado pelo ID fictício e descrito pelo estado. Se o filtro ocultar o registro atualizado, retorna ao filtro. Os cartões não entram na sequência normal de Tab; não há restauração quando o controle acionado não estava focado ou quando o foco já foi movido para outro elemento.

Antes de qualquer painel real: aprovar os gates 1–4 de `docs/product/MVP-VALIDATION-GATES.md`, especificar autorização no servidor e isolamento de registros, e testar acesso negado, retenção e exclusão. Esta prévia **não comprova conformidade, segurança ou prontidão operacional**.

Para executar a homologação automatizada no navegador, use `npm run test:previews` após instalar Chromium com `npx playwright install chromium`. A suíte usa a porta 4176 e verifica o fluxo fictício no servidor de desenvolvimento; a CI executa essa etapa além dos testes do build de produção. Veja a matriz em `docs/quality/ADMIN-HOMOLOGATION-PLAN.md`.

Enquanto o módulo é carregado, há uma mensagem de status. Uma falha tratada de carregamento exibe mensagem genérica, foco no título, botão para recarregar a mesma prévia e link para voltar à página institucional. A recarga descarta qualquer alteração volátil. O erro original e caminhos técnicos não são exibidos. Isso não recupera falhas anteriores à execução do próprio main.ts nem substitui tratamento de erros de uma futura API.
