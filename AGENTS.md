# Instruções para agentes — AcolheMente

## Missão
Construir uma plataforma acolhedora para aproximar pessoas e profissionais de Psicologia, começando por um MVP administrativo pequeno, seguro e validado com profissionais reais.

## Regras obrigatórias
1. Leia este arquivo e a documentação relevante em `docs/` antes de alterar código.
2. Preserve o escopo do MVP. Não implemente funcionalidades futuras por antecipação.
3. Nunca invente conformidade legal, certificação do CFP/CRP ou garantias de segurança.
4. Não colete nem armazene prontuários, sintomas, diagnósticos, relatos terapêuticos ou outros dados clínicos no MVP.
5. Minimize dados pessoais. Não exponha dados em logs, analytics, URLs, mensagens de erro ou ambientes de teste.
6. Nunca coloque chaves privadas, tokens, senhas ou secrets no repositório. Use variáveis de ambiente e mantenha exemplos fictícios.
7. Toda autorização deve ser aplicada no servidor e, quando PostgreSQL/Neon for utilizado, reforçada por RLS quando adequado e corretamente configurado. Não confie apenas na interface.
8. Crianças e adolescentes exigem desenho específico de consentimento, representação legal, melhor interesse e revisão profissional/jurídica. Não habilite fluxo de menores sem aprovação explícita.
9. A plataforma não diagnostica, não faz triagem clínica automatizada e não substitui o julgamento da psicóloga.
10. Acessibilidade é requisito: HTML semântico, teclado, foco visível, contraste, mensagens compreensíveis e compatibilidade com leitores de tela.
11. Prefira Vue 3, TypeScript, Vite e CSS próprio. Não introduza Tailwind nem bibliotecas pesadas sem ADR.
12. Escreva testes para regras de negócio, validação, permissões e fluxos críticos. Execute lint, typecheck, testes e build quando disponíveis.
13. Não faça alterações destrutivas em banco, dados ou infraestrutura sem plano de rollback e aprovação humana.
14. Não use dados reais de pacientes em desenvolvimento, testes, screenshots ou demonstrações.
15. Registre decisões arquiteturais relevantes em ADRs e atualize CHANGELOG quando houver mudança funcional.

## Processo de trabalho
- Inspecione o estado atual antes de modificar.
- Divida tarefas em mudanças pequenas e revisáveis.
- Faça commits com mensagens claras, em inglês com escopo convencional (ex.: `docs: define MVP boundaries`).
- Abra PR para mudanças relevantes; descreva escopo, testes, riscos e limitações.
- Revise o diff procurando exposição de dados, permissões incorretas, dependências desnecessárias e regressões.
- Não declare testes executados se não foram executados.
- Se faltar informação clínica, legal ou operacional, documente a dúvida e use a alternativa mais conservadora.

## Critérios de pronto
Uma entrega só está pronta quando seu comportamento está descrito, os riscos estão identificados, os testes aplicáveis passam e a documentação acompanha a implementação.

## Desenvolvimento autônomo com proteção
- Planeje e execute lotes de 5 a 10 tarefas relacionadas, mantendo mudanças pequenas, revisáveis e commits convencionais. Não interrompa tarefas independentes por um bloqueio isolado.
- Antes de criar PR, consulte as PRs abertas do repositório; reutilize a PR da mesma frente sempre que possível. Mantenha no máximo uma PR ativa por frente, salvo justificativa técnica documentada.
- Registre no corpo da PR escopo, checklist do lote, testes executados, riscos, bloqueios e itens pendentes. Não abra PR por tarefa individual.
- Execute as verificações disponíveis antes de integrar: auditoria de dependências, testes de componentes, typecheck, build, testes de navegador e acessibilidade. Não declare uma verificação aprovada antes da conclusão real.
- Corrija falhas de CI; diferencie defeitos do código de falhas transitórias de infraestrutura usando logs. Reexecute jobs falhos apenas quando houver evidência de falha transitória, sem mascarar erros recorrentes.
- Use squash merge e, quando habilitado, auto-merge nativo do GitHub somente após todas as verificações e revisões obrigatórias. Nunca contorne branch protection, rulesets, CODEOWNERS, checks ou revisões; nunca integre PR em rascunho ou incompleta.
- Mudanças em autenticação, banco de dados, permissões, dados pessoais, integrações externas e produção exigem avaliação de risco e validação adicional. Respeite os gates documentados em `docs/product/MVP-VALIDATION-GATES.md`.
- Evite deploys intermediários e previews desnecessários na Vercel. Priorize validação local e GitHub Actions; não altere configurações de produção ou proteção da `main` sem analisar consequências e obter aprovação.
- Ao finalizar um lote, informe commits, PR, resultado da CI, pendências e bloqueios. Não afirme que tarefas continuarão em segundo plano sem uma automação configurada.

## Política de CI e recuperação
- A CI deve rodar em PRs para `main` e em pushes para `main`; preserve o nome dos checks usados em regras de proteção.
- Permissões do `GITHUB_TOKEN` devem permanecer mínimas (`contents: read` para validação).
- Cancelamento por concorrência só pode afetar execuções obsoletas da mesma PR ou branch; não cancelar checks de outras PRs.
- Em falhas de instalação do navegador, consulte logs de Playwright, apt e runner antes de alterar dependências. Não ignore testes E2E para obter merge verde.
- Antes de ativar auto-merge, audite regras de proteção, aprovações e checks exigidos; documente limitações de acesso.
