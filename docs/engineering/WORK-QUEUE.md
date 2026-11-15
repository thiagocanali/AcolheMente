# Fila de trabalho — AcolheMente

Atualizado em 2026-11-15. Esta fila registra o estado de implementação, não concede aprovação profissional, jurídica ou operacional.

## Concluído

- [x] Ciclo de vida administrativo puro e testes de transições (PR #26).
- [x] Prévia administrativa somente em desenvolvimento, com dados fictícios (PR #27).
- [x] Acessibilidade básica, layout móvel e testes de componentes (PR #28).
- [x] Testes Playwright de isolamento das prévias no build de produção (PR #29).
- [x] Modelo de ameaças e critérios de autorização futura (PR #30).
- [x] Rejeição segura de entradas inesperadas nas regras administrativas (PR #31).

## Em andamento

- [ ] Restaurar filtro e registros fictícios juntos; testar isolamento entre cartões (PR seguinte; CI pendente).

## Próximas tarefas independentes dos gates

- [ ] Revisar o fluxo de teclado e foco da prévia em navegador de desenvolvimento, com dados fictícios.
- [ ] Conferir cobertura de regressões de layout em 360px e 320px.
- [ ] Validar mensagens e rótulos administrativos com a profissional, sem publicar conteúdo não aprovado.
- [ ] Revisar dependências e segurança de cada PR antes de integrar.

## Bloqueios externos obrigatórios

- [ ] Gate 1: conteúdo profissional aprovado.
- [ ] Gate 2: campos, estados, canais e jornada administrativa aprovados.
- [ ] Gate 3: base legal, aviso, retenção, descarte, incidentes e responsabilidades aprovados.
- [ ] Gate 4: desenho de autenticação, autorização no servidor, isolamento e backup aprovado.
- [ ] Gates 5–6: homologação com dados fictícios e autorização explícita para piloto.

**Não criar nem ativar API, banco, formulário de dados reais, contas profissionais reais ou fluxo de menores antes das aprovações aplicáveis.** Consulte [gates](../product/MVP-VALIDATION-GATES.md) e [modelo de ameaças](../security/ADMIN-THREAT-MODEL.md).
