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
7. Toda autorização deve ser aplicada no servidor e, quando Supabase for usado, reforçada por RLS. Não confie apenas na interface.
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
