# Plano de homologação do MVP administrativo

**Status:** plano de testes, não aprovação de uso real. A aplicação publicada permanece institucional; as prévias administrativas são exclusivas do ambiente de desenvolvimento.

## Preparação e evidências

- Utilizar apenas identidades e solicitações fictícias. Não copiar informações de pacientes.
- Registrar versão do commit, ambiente, navegador, resultado, evidência sem PII e responsável pelo teste.
- Registrar explicitamente testes bloqueados pela ausência de backend, autenticação ou decisões profissionais.
- Não classificar um cenário como aprovado por existir apenas um teste de domínio ou uma prévia visual.

## Matriz de verificação

| ID | Cenário | Resultado esperado | Estado atual |
| --- | --- | --- | --- |
| H-01 | Navegar pelo site institucional em desktop e celular | Página acessível, sem overflow ou regressão visual | Automatizado no E2E existente |
| H-02 | Tentar abrir `?preview=admin` e `?preview=profile` no build de produção | Somente página institucional; nenhum dado fictício da prévia | Automatizado no E2E existente |
| H-03 | Navegar por teclado na prévia administrativa | Controles alcançáveis, rótulos e feedback legíveis | Cobertura de componente existente; revisão manual pendente |
| H-04 | Exercitar os 16 pares de estados | Apenas cinco transições válidas | Teste de domínio existente |
| H-05 | Fornecer status inválidos e valores inesperados | Negar sem exceção ou eco de entrada | Teste de domínio existente |
| H-06 | Ler lista sem sessão | 401 sem dados | Bloqueado: não existe API |
| H-07 | Acessar solicitação atribuída a outra profissional | Negado sem revelar conteúdo | Bloqueado: não existe API/identidade |
| H-08 | Alterar status com identidade ou papel falsificado no payload | Nenhuma elevação de privilégio | Bloqueado: não existe API |
| H-09 | Enviar duas alterações concorrentes | No máximo uma transição aceita | Bloqueado: não existe persistência |
| H-10 | Reabrir registro encerrado | Operação recusada pelo servidor | Parcial: domínio testado; servidor inexistente |
| H-11 | Testar CSRF, sessão expirada e logout | Acesso recusado, sessão invalidada | Bloqueado: autenticação indefinida |
| H-12 | Conferir logs, URLs e mensagens de erro | Nenhum dado pessoal desnecessário | Bloqueado: fluxo real inexistente |
| H-13 | Executar exclusão, retenção e recuperação de backup | Conforme política aprovada | Bloqueado: Gate 3 e infraestrutura |
| H-14 | Revisar conteúdo e mensagens com a profissional | Linguagem, campos e operação aprovados | Bloqueado: Gates 1 e 2 |

## Critérios de saída

1. Gates 1–4 aprovados e registrados antes de implementar backend e coleta.
2. Todos os cenários H-01 a H-14 pertinentes executados em ambiente isolado com dados fictícios; nenhum cenário bloqueado pode ser marcado como aprovado.
3. Falhas de autorização, vazamento de dados, acessibilidade impeditiva e retenção sem política são impeditivos de piloto.
4. Registrar correções, executar novamente os testes e preservar evidências não sensíveis.
5. Gate 6 exige aprovação operacional explícita; CI verde, isoladamente, não libera uso real.

**Referências:** [gates de validação](../product/MVP-VALIDATION-GATES.md), [ciclo administrativo](../product/ADMINISTRATIVE-REQUEST-LIFECYCLE.md), [modelo de ameaças](../security/ADMIN-THREAT-MODEL.md).
