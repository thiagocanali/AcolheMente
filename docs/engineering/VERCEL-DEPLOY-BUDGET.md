# Política de orçamento de deploys Vercel

Atualizado em 2026-11-15. Aplicável ao projeto AcolheMente.

## Evidência da causa

A integração Git da Vercel está criando previews para commits de branches de desenvolvimento. Na branch `test/admin-preview-reset-filter`, os commits `53f0710`, `2d90b2d` e `cc68fe3` geraram deploys cancelados, enquanto `354b7fe` gerou preview READY. A branch `fix/admin-preview-empty-announcement` também gerou um deploy cancelado seguido de READY. Portanto, commits intermediários enviados ao GitHub consomem tentativas de deploy, ainda que o GitHub Actions já execute testes e build.

A última produção observada durante a investigação corresponde à branch `main` e ao commit `5a13583`; não foi alterada.

## Processo obrigatório

1. Desenvolver e validar alterações intermediárias localmente: `npm run test`, `npm run typecheck`, `npm run build` e, quando relevante, `npm run test:e2e`.
2. Fazer commits locais pequenos para preservar histórico, mas **agrupar pushes** da mesma entrega em um único envio para uma branch de PR sempre que viável.
3. Usar GitHub Actions como validação primária; não criar novas branches/PRs apenas para documentação ou testes triviais quando puderem ser agrupados numa entrega coerente.
4. Reservar previews para mudanças que precisem de verificação hospedada (integrações de ambiente, headers, redirects, autenticação ou experiência final).
5. Se a cota for atingida, não repetir deploys nem reexecutar jobs de Vercel. Continuar revisão, testes e documentação sem afetar produção.
6. Antes de integrar, revisar checks de CI e conflitos. `READY` é somente status do deploy, não prova de funcionamento de integrações.

## Alternativas a avaliar sem alteração de produção

- Verificar em **Vercel → Project Settings → Git** se existe controle de Automatic Deployments/Preview Deployments por branch para este projeto/plano.
- Considerar um **Ignored Build Step** configurado de forma segura e validado para branches específicas ou alterações que não afetem o artefato; não ignorar automaticamente a branch de produção e não suprimir previews necessários à homologação.
- Considerar filtros de paths no GitHub Actions apenas quando não reduzirem checks obrigatórios. Os testes de segurança, typecheck e build devem continuar cobrindo mudanças relevantes.
- Qualquer alteração de Git Deployment, Ignored Build Step, configurações do projeto ou `vercel.json` que mude comportamento de deploy exige revisão específica, testes e autorização apropriada.

## Verificações realizadas

- Projeto Vercel `acolhemente`, framework Vite, com deploys de produção em `main` e previews para branches de PR.
- O `vercel.json` atual contém apenas headers de segurança; não possui regra de ignore de build.
- O workflow `.github/workflows/ci.yml` executa auditoria de dependências, testes, typecheck/build e Playwright sem chamar CLI de deploy.
- **Não foi confirmado** que o plano atual ofereça controles granulares de previews por branch, nem foi alterada qualquer configuração da Vercel.

Este documento descreve o procedimento; não desativa deployments.
