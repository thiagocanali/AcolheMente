# Privacidade e segurança

## Princípio
Privacidade desde a concepção. Informações relacionadas à saúde são dados pessoais sensíveis sob a LGPD. O produto deve evitar coletá-las sempre que não forem necessárias.

## Regras para o MVP
- Não solicitar sintomas, diagnósticos, histórico, motivo clínico ou relato livre.
- Informar finalidade, base legal aplicável, controlador, canal de contato, retenção e direitos de titulares antes da coleta.
- Coletar apenas dados administrativos estritamente necessários.
- Definir prazo de retenção e processo de exclusão antes do lançamento.
- Restringir acesso por autenticação, menor privilégio e RLS.
- Usar HTTPS, secrets em variáveis de ambiente e ambientes separados.
- Não enviar dados pessoais a analytics, logs, ferramentas de replay ou trackers.
- Preparar procedimento de incidentes e solicitações de titulares.

## Antes de produção
É necessária revisão específica do fluxo de dados, papéis de controlador/operador, contratos com fornecedores, bases legais, aviso de privacidade, cookies, retenção, direitos dos titulares e resposta a incidentes por profissional competente.

## Menores
Não habilitar cadastro ou agendamento de crianças/adolescentes até definir e revisar consentimento, representação legal, melhor interesse, sigilo, acesso de responsáveis, retenção e deveres profissionais.

## Segurança de aplicação
- RLS em todas as tabelas expostas ao cliente.
- Políticas testadas com usuários autorizados e não autorizados.
- Proteção contra abuso e spam no formulário.
- Validação server-side, limites de tamanho e rate limiting.
- Sem segredos no frontend ou repositório.
- Backups e recuperação documentados antes de armazenar dados operacionais reais.

Este documento é orientação de engenharia, não parecer jurídico.
