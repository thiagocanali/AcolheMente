# Gates de validação antes da persistência

## Objetivo

Transformar os bloqueios já definidos no roadmap e no modelo administrativo em uma sequência verificável. Este documento não autoriza coleta de dados reais; ele define o que ainda precisa ser decidido antes da implementação.

## Gate 1 — Conteúdo profissional

**Responsável pela decisão:** profissional piloto.

- [ ] Perfil, credenciais, formação e descrição profissional revisados.
- [ ] Serviços, público, modalidades e disponibilidade confirmados.
- [ ] Canais de contato confirmados.
- [ ] Conteúdo final aprovado conforme o [checklist de revisão](./PROFESSIONAL-PROFILE-REVIEW.md).

**Saída:** versão de conteúdo aprovada ou lista de pendências.

## Gate 2 — Fluxo administrativo

**Responsáveis:** produto + profissional.

- [ ] Finalidade de cada campo definida.
- [ ] Campos desnecessários removidos.
- [ ] Nenhum campo clínico ou texto livre incluído.
- [ ] Estados da solicitação definidos.
- [ ] Regras para contato, encerramento e exclusão definidas.
- [ ] Comportamento quando não houver disponibilidade definido.

**Saída:** especificação funcional mínima.

## Gate 3 — Privacidade e governança

**Responsáveis:** produto + profissional; revisão jurídica quando necessária.

- [ ] Base legal analisada para cada finalidade.
- [ ] Papéis de controlador, operador e fornecedores definidos.
- [ ] Aviso de privacidade aprovado antes da coleta.
- [ ] Retenção definida por finalidade/status.
- [ ] Evento inicial da retenção definido.
- [ ] Exclusão e descarte em backups considerados.
- [ ] Processo para direitos dos titulares definido.
- [ ] Processo e responsável para incidentes definidos.
- [ ] Fluxo de menores continua desabilitado.

**Saída:** requisitos de privacidade e governança aprovados.

## Gate 4 — Arquitetura e segurança

**Responsáveis:** engenharia.

Somente depois dos gates anteriores:

- [ ] Autenticação individual definida.
- [ ] Autorização server-side definida.
- [ ] RLS ou controle equivalente especificado.
- [ ] Separação de ambientes definida.
- [ ] Segredos e variáveis de ambiente definidos.
- [ ] Logs sem payload/PII desnecessária.
- [ ] Estratégia de backup e restauração definida.
- [ ] Testes de acesso permitido e negado definidos.

**Saída:** desenho técnico pronto para implementação.

## Gate 5 — Homologação

Usar exclusivamente dados fictícios.

- [ ] Formulário funciona em teclado e leitor de tela.
- [ ] Validações e mensagens de erro são compreensíveis.
- [ ] Sucesso não expõe dados.
- [ ] Painel bloqueia usuários não autorizados.
- [ ] Um usuário não acessa registros de outro.
- [ ] Exclusão produz o comportamento documentado.
- [ ] Logs não contêm dados pessoais desnecessários.
- [ ] Build, typecheck e testes passam.

**Saída:** evidência de funcionamento em ambiente de teste.

## Gate 6 — Piloto controlado

Só iniciar após aprovação dos gates anteriores.

- [ ] Profissional aprova a versão que será usada.
- [ ] Política de privacidade está publicada.
- [ ] Controles de acesso estão ativos.
- [ ] Procedimento de suporte/incidente está definido.
- [ ] Dados reais entram somente após autorização operacional explícita.
- [ ] Critérios de interrupção do piloto estão definidos.

**Saída:** piloto controlado ou decisão de adiar.

## Regra de bloqueio

Se qualquer gate obrigatório estiver pendente, **não implementar nem ativar persistência com dados reais**.

A ordem existe para evitar que infraestrutura ou código criem uma pressão artificial para aceitar decisões ainda não validadas.
