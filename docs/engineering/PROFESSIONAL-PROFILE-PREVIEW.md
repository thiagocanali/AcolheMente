# Prévia local do perfil

Execute `npm ci` e `npm run dev`; abra a URL local com `?preview=profile`.

Para revisar a versão preenchida, use `?preview=profile-demo`. Ela carrega um conjunto de textos explicitamente fictícios, sem contato, foto, identidade ou credenciais reais. A faixa de demonstração permanece visível. A versão sem conteúdo continua disponível em `?preview=profile`.

As duas opções são exclusivas do servidor de desenvolvimento. Os testes de navegador sobre o build verificam que ambas continuam mostrando a página institucional em produção.

O componente `ProfessionalProfile.vue` recebe conteúdo por propriedades. Sem conteúdo, apresenta um estado pendente; campos opcionais ausentes não são exibidos. A prévia não contém formulário nem canal de contato. O acesso pela query existe somente quando `import.meta.env.DEV` é verdadeiro; o build de produção mantém a página institucional.

Dados reais e qualquer versão pública continuam sujeitos ao checklist em `docs/product/PROFESSIONAL-PROFILE-REVIEW.md`. Passar propriedades ao componente não representa aprovação para publicação. Não preencher credenciais por inferência.

Os testes usam somente textos explicitamente fictícios e verificam ausência de coleta, omissão de campos e escape de conteúdo.

`npm run test:previews` verifica as duas versões no navegador, junto à prévia administrativa, incluindo teclado, acessibilidade automática e telas pequenas. O comando usa o servidor de desenvolvimento na porta 4176; os testes de isolamento do build continuam na suíte `npm run test:e2e`.

As prévias anunciam o carregamento e oferecem recuperação se o componente ou os textos demonstrativos não carregarem: recarregar a mesma URL ou voltar ao site institucional. A mensagem é genérica, não exibe caminhos técnicos e recebe foco para navegação por teclado. A suíte simula as falhas dos módulos e testa a recuperação. Esse tratamento começa após a execução do main.ts, não cobre sua própria ausência nem valida serviços externos.
