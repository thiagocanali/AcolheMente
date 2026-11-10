# Ciclo de vida da solicitação administrativa

> **Status: proposta funcional para validação.** Este documento não aprova coleta, persistência, contato com pessoas reais ou ativação de um fluxo. Os estados e transições abaixo são hipóteses mínimas para discussão com a profissional piloto e revisão de privacidade.

## Objetivo e limites

Descrever como uma solicitação estritamente administrativa poderia ser acompanhada pela profissional, sem transformar o painel em prontuário, agenda clínica ou canal de atendimento.

O fluxo proposto:

1. A pessoa consulta informações públicas e o aviso de privacidade.
2. Se decidir prosseguir, envia somente os campos mínimos que forem aprovados no Gate 2 e no Gate 3.
3. O sistema informa apenas que a solicitação foi recebida — não confirma consulta ou disponibilidade.
4. A profissional analisa a solicitação e, se apropriado, retorna pelo canal escolhido e aprovado.
5. A profissional encerra a solicitação quando não houver mais ação administrativa pendente.

**Não fazem parte deste fluxo:** avaliação de urgência, triagem, diagnóstico, troca de mensagens clínicas, prontuário, confirmação automática de consulta, pagamento ou cadastro de menores.

## Estados candidatos

| Estado | Significado administrativo | Ação permitida sugerida |
| --- | --- | --- |
| `received` | Solicitação recebida pelo sistema. | Visualizar os dados mínimos autorizados. |
| `reviewing` | Profissional está verificando se pode retornar e como proceder. | Manter pendente ou avançar para contato/encerramento. |
| `contacted` | A profissional registrou que realizou uma tentativa ou retorno pelo canal autorizado. | Aguardar resposta fora da plataforma ou encerrar. |
| `closed` | Não há ação administrativa pendente nesta solicitação. | Consulta histórica apenas pelo período de retenção aprovado; depois, descarte. |

Os identificadores são nomes técnicos provisórios. A redação exibida à pessoa usuária e à profissional deve ser revisada para ser clara, respeitosa e não sugerir atendimento confirmado.

## Transições propostas

- `received → reviewing`
- `received → closed` (por exemplo, solicitação duplicada ou encerramento administrativo; motivo detalhado não deve virar campo livre)
- `reviewing → contacted`
- `reviewing → closed`
- `contacted → closed`

`closed` é terminal nesta proposta. Reabertura, cancelamento pelo solicitante, duplicidade e tentativas repetidas de contato ainda precisam de decisão de produto e privacidade; não devem ser improvisados na implementação.

Toda transição deve ser autorizada no servidor, vinculada à profissional responsável e validada contra o estado atual. A interface não é uma fronteira de segurança.

## Dados e histórico mínimos

Proposta sujeita aos gates:

- identificador aleatório da solicitação;
- campos de contato estritamente necessários e aprovados;
- estado atual;
- timestamps técnicos indispensáveis para operação e retenção;
- identificador da profissional responsável, se houver mais de uma conta no futuro.

Não registrar no histórico o conteúdo de ligações, mensagens, conversas ou motivos clínicos. Não adicionar notas livres, anexos, sintomas, diagnósticos, dados de saúde, CPF, endereço residencial ou dados de menores.

O histórico de mudanças de estado também é dado relacionado à pessoa e precisa de finalidade, acesso e retenção definidos. Se não for necessário para auditoria operacional, preferir manter somente o estado atual e os timestamps indispensáveis.

## Regras de comportamento

- Recebimento não significa vaga disponível, consulta marcada ou vínculo profissional estabelecido.
- Não prometer prazo de resposta enquanto a profissional não definir e aprovar um compromisso operacional.
- Não enviar conteúdo pessoal em notificações, URLs, analytics ou logs.
- Não mostrar dados de contato em listagens ou telas além do necessário para a tarefa.
- Não permitir que usuários não autenticados ou profissionais não responsáveis leiam ou alterem solicitações.
- Não oferecer opção de urgência, emergência ou avaliação clínica. O conteúdo público deverá orientar de forma apropriada sem simular triagem.
- A exclusão e a retenção devem seguir política aprovada, inclusive quanto a backups; o estado `closed` não substitui exclusão.
- Falhas de envio devem ser comunicadas sem expor payload ou detalhes internos.

## Decisões pendentes para o Gate 2

- Quais estados fazem sentido para a rotina real da profissional?
- É necessário registrar a tentativa de contato ou basta encerrar a solicitação?
- Como representar uma solicitação duplicada ou retirada pela própria pessoa?
- Como agir quando a profissional não puder atender ou não tiver disponibilidade?
- Qual canal de retorno é realmente necessário e quem o acessa?
- Quais mensagens de confirmação e encerramento são claras sem sugerir consulta confirmada?
- É necessário histórico de transições ou basta o estado atual?

## Dependências antes de qualquer implementação

1. Aprovação da jornada e dos estados pela profissional piloto.
2. Finalidade e necessidade de cada campo definidas.
3. Base legal, aviso de privacidade, retenção, descarte e papéis de tratamento revisados.
4. Regras de autenticação, autorização server-side e isolamento definidas.
5. Testes de transições válidas/inválidas, acesso negado, exclusão e ausência de PII em logs planejados.

Até que esses pontos sejam aprovados, este documento serve somente como material de discussão. Não criar tabela, endpoint, formulário ou armazenamento com base nesta proposta.
