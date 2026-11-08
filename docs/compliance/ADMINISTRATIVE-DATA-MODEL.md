# Modelo mínimo de dados administrativos — proposta

## Status
Proposta para revisão da psicóloga piloto e validação de privacidade antes de qualquer implementação. Este documento não autoriza coleta ou armazenamento de dados reais.

## Objetivo e limite
O único objetivo do fluxo é permitir que a profissional retorne um contato e organize uma solicitação administrativa. O sistema não deve registrar informações necessárias à condução clínica.

## Campos candidatos

| Campo | Necessidade | Regra |
|---|---|---|
| Nome | Identificar a pessoa no retorno | Opcional quando o canal permitir; texto curto |
| Canal de retorno | Responder à solicitação | Um único canal escolhido, com valor validado |
| Preferência de modalidade | Ajudar a organizar o retorno | Opcional; apenas presencial/online/indiferente |
| Preferência de período | Facilitar contato | Opcional; manhã/tarde/noite, sem agenda detalhada |
| Status | Organizar o trabalho administrativo | Novo, em contato, concluído ou descartado |
| Criado em / atualizado em | Operação e auditoria mínima | Timestamp gerado pelo servidor |

Os campos finais dependem da validação da profissional. Não armazenar simultaneamente telefone e e-mail se um canal for suficiente.

## Dados proibidos no MVP
- Motivo da consulta, sintomas, diagnóstico, hipótese diagnóstica ou histórico de saúde.
- Relatos livres, mensagens clínicas, evolução, notas, documentos ou anexos.
- Dados de crianças/adolescentes ou informações de seus responsáveis.
- CPF, endereço residencial, dados financeiros ou documentos de identificação.
- Campos livres, tags ou observações internas que possam virar registro clínico.

O formulário deve orientar a pessoa a não inserir informações de saúde. Não incluir campo de texto livre.

## Acesso e autorização
- Solicitações são privadas e visíveis somente à profissional autorizada.
- A autorização deve ser verificada no servidor; esconder telas no frontend não é controle de acesso.
- Se houver banco exposto ao cliente, todas as tabelas devem ter RLS habilitada e políticas negativas testadas.
- Não criar contas públicas nem permitir autoinscrição de profissionais no MVP.
- Logs técnicos não devem conter payloads, nomes, canais de contato ou IDs diretamente identificáveis.

## Retenção e descarte
**Prazo ainda não definido — bloqueador para persistência e produção.**

Antes de ativar armazenamento, a profissional e a pessoa responsável por privacidade devem definir:
1. finalidade e base legal para cada campo;
2. prazo para solicitações novas, em contato, concluídas e descartadas;
3. evento que inicia a contagem do prazo;
4. rotina de exclusão e tratamento de backups;
5. processo para atender pedidos de acesso, correção e eliminação;
6. responsável pelo atendimento desses pedidos.

Não adotar um prazo arbitrário. Até a decisão ser registrada, usar apenas fluxo sem persistência ou canal externo aprovado pela profissional. Exclusão lógica isolada não equivale a descarte definitivo.

## Segurança operacional
- HTTPS e proteção contra abuso/spam.
- Validação server-side, limites de tamanho e rate limiting.
- Segredos somente em variáveis de ambiente.
- Dados fictícios nos ambientes de desenvolvimento e homologação.
- Nenhuma ferramenta de analytics, replay ou monitoramento pode receber dados do formulário.
- Backups, acesso administrativo e resposta a incidentes precisam ser definidos antes de dados reais.

## Condições para implementação
- [ ] Campos e finalidade aprovados pela profissional.
- [ ] Aviso de privacidade revisado e publicado.
- [ ] Base legal e papéis de controlador/operador avaliados.
- [ ] Prazo de retenção e descarte definidos.
- [ ] Autenticação e autorização server-side projetadas.
- [ ] RLS e testes de acesso indevido definidos.
- [ ] Processo de exclusão e incidentes documentado.

Este documento é uma proposta de engenharia, não um parecer jurídico nem uma declaração de conformidade com a LGPD ou normas do CFP/CRP.
