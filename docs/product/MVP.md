# Escopo do MVP

## Objetivo
Validar se uma página profissional clara e um fluxo administrativo simples ajudam uma psicóloga a receber e organizar pedidos de contato/agendamento.

## Incluído
- Landing page institucional responsiva.
- Página de perfil da profissional piloto com informações aprovadas por ela.
- Informações de modalidade, público atendido, abordagem, localização geral e disponibilidade publicada.
- Formulário mínimo para solicitação de contato/agendamento.
- Aviso de privacidade acessível antes do envio.
- Painel administrativo protegido para visualizar, atualizar status e excluir solicitações.
- Estados de carregamento, sucesso, erro e ausência de resultados.
- Acessibilidade, SEO básico e métricas técnicas sem conteúdo pessoal.

## Dados permitidos inicialmente
Definir com a profissional e assessoria: nome, canal de retorno, preferência de contato e faixa de horário. Coletar somente o estritamente necessário. Não coletar campo livre para descrição de sofrimento, sintomas ou histórico.

## Explicitamente fora do MVP
- Prontuário, evolução, notas clínicas ou documentos de pacientes.
- Diagnóstico, avaliação, score ou triagem clínica automatizada.
- Chat terapêutico ou teleconsulta embutida.
- Cadastro aberto de profissionais / marketplace.
- Pagamentos, repasses ou comissão.
- Agendamento confirmado automaticamente sem validação da profissional.
- Fluxos para menores até revisão específica de consentimento, representação legal, segurança e deveres profissionais.

## Fluxo básico
1. Visitante consulta as informações públicas.
2. Visitante lê o aviso de privacidade e solicita contato com dados mínimos.
3. Sistema confirma recebimento sem expor informações sensíveis.
4. Profissional acessa painel autenticado e gerencia a solicitação.
5. Profissional combina detalhes por canal apropriado e confirma diretamente.

## Critérios de aceite
- Funciona em celular e desktop.
- Formulário valida os campos e não aceita conteúdo clínico livre.
- Rotas administrativas exigem autenticação.
- Dados de uma profissional não podem ser acessados por outro usuário.
- Exclusão e retenção têm comportamento documentado.
- Nenhuma informação pessoal aparece em logs ou analytics.
- Testes cobrem validação e autorização.

## Perguntas para validação
- Quais informações a profissional deseja publicar?
- Qual canal de contato e retorno prefere?
- Qual é o tempo esperado de retenção das solicitações?
- Como solicitações são tratadas quando não há disponibilidade?
- Quais serviços, faixas etárias e modalidades ela efetivamente oferece?
