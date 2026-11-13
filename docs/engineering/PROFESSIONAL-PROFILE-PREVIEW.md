# Prévia local do perfil

Execute `npm ci` e `npm run dev`; abra a URL local com `?preview=profile`.

O componente `ProfessionalProfile.vue` recebe conteúdo por propriedades. Sem conteúdo, apresenta um estado pendente; campos opcionais ausentes não são exibidos. A prévia não contém formulário nem canal de contato. O acesso pela query existe somente quando `import.meta.env.DEV` é verdadeiro; o build de produção mantém a página institucional.

Dados reais e qualquer versão pública continuam sujeitos ao checklist em `docs/product/PROFESSIONAL-PROFILE-REVIEW.md`. Passar propriedades ao componente não representa aprovação para publicação. Não preencher credenciais por inferência.

Os testes usam somente textos explicitamente fictícios e verificam ausência de coleta, omissão de campos e escape de conteúdo.
