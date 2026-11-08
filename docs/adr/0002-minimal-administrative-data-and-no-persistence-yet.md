# ADR 0002 — Dados administrativos mínimos e persistência adiada

- **Status:** Proposta adotada para orientar o MVP; depende de validação profissional e de privacidade antes de implementação.
- **Data:** 2026-11-08

## Contexto
O MVP poderá receber solicitações de contato/agendamento. Informações relacionadas à saúde são sensíveis e não são necessárias para a finalidade administrativa inicial. Ainda não foram confirmados os campos finais, a base legal, o prazo de retenção nem o processo de descarte.

## Decisão
1. Não implementar banco de dados, formulário persistente ou painel administrativo nesta etapa.
2. Limitar o modelo candidato a nome (se necessário), um canal de retorno, preferências administrativas opcionais, status e timestamps.
3. Não incluir campo livre, motivo da consulta, sintomas, diagnóstico, histórico, anexos, prontuário ou dados de menores.
4. Não permitir autoinscrição de profissionais; o acesso administrativo deverá ser individual e autorizado no servidor.
5. Não iniciar persistência real até que campos, aviso de privacidade, base legal, retenção, exclusão, papéis de acesso e RLS estejam definidos e revisados.

## Alternativas consideradas
- **Criar imediatamente tabelas e autenticação:** rejeitada porque prazo de retenção e responsabilidades ainda não foram definidos.
- **Guardar solicitações em planilha ou e-mail automaticamente:** rejeitada como atalho, pois apenas transfere o risco a outro fornecedor/canal sem avaliação.
- **Usar formulário sem persistência ou canal externo já aprovado:** alternativa temporária, desde que a profissional valide o canal e o aviso correspondente.

## Consequências
- O desenvolvimento evita coletar dados pessoais antes de existir governança mínima.
- A entrega do fluxo administrativo fica condicionada à validação da profissional e à revisão de privacidade.
- A implementação futura deverá testar acesso autorizado e não autorizado, exclusão e ausência de dados pessoais em logs.

## Riscos e pendências
- A profissional ainda precisa aprovar os campos e a operação.
- A base legal, os prazos de retenção e os contratos com fornecedores precisam ser avaliados por pessoa competente.
- Regras para crianças e adolescentes permanecem fora do MVP e exigem revisão específica.

## Critério para reabrir
Reabrir este ADR somente quando as decisões pendentes estiverem registradas e aprovadas pelos responsáveis.
