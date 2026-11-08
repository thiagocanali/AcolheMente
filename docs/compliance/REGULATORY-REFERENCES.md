# Referências regulatórias e técnicas

> Revisado em 2026-11-08. Documento de referência para engenharia e produto; não constitui parecer jurídico nem orientação profissional do CFP/CRP.

## Objetivo

Concentrar referências oficiais que afetam decisões de produto, privacidade, acessibilidade e limites do MVP do AcolheMente. As referências devem ser revalidadas antes de mudanças de escopo ou entrada em produção.

## 1. Psicologia mediada por TDICs — CFP nº 9/2024

A Resolução CFP nº 9/2024 regulamenta o exercício profissional da Psicologia mediado por Tecnologias Digitais da Informação e da Comunicação (TDICs). O CFP também reforça que a profissional deve considerar os recursos tecnológicos adotados e a preservação do sigilo das informações.

**Implicações para o produto:**
- A plataforma não presta atendimento psicológico por conta própria e não deve alegar aprovação, certificação ou autorização do CFP/CRP.
- Recursos que apoiem atendimento digital devem ser avaliados pela profissional quanto à adequação, segurança, privacidade, sigilo e limites técnicos.
- O produto não deve induzir o envio de informações clínicas desnecessárias em formulários.
- Contratos, condições de atendimento e informações sobre tecnologia utilizada são responsabilidade profissional e devem ser tratados fora de qualquer suposição automática do sistema.

Referência: [CFP — Nota Técnica de 2025 sobre atendimento à população surda](https://site.cfp.org.br/wp-content/uploads/2025/05/SEI_CFP-2183756-Nota-Tecnica.pdf), que cita expressamente a Resolução CFP nº 9/2024.

## 2. Acessibilidade e enfrentamento do capacitismo — CFP nº 7/2025

A Resolução CFP nº 7/2025 estabelece normas para o atendimento de pessoas com deficiência e determina a consideração de Desenho Universal ou, quando necessário, Adaptação Razoável. Também prevê uso ético e inclusivo de TDICs no atendimento.

**Implicações para o produto:**
- manter navegação por teclado e foco visível;
- usar HTML semântico e estrutura compatível com tecnologias assistivas;
- preservar contraste, legibilidade e possibilidade de adaptação de texto;
- evitar linguagem capacitista;
- revisar contratos e interfaces para acessibilidade quando esses recursos entrarem no produto;
- realizar testes automatizados e manuais de acessibilidade antes de produção.

Referência oficial: [Resolução CFP nº 7/2025](https://site.cfp.org.br/wp-content/uploads/2025/04/RESOLUCAO_CFP_N__7___2025___PUBLICACAO_NO_DOU.pdf).

## 3. Registros e documentos psicológicos

O Manual Orientativo de Registro e Elaboração de Documentos Psicológicos do CFP (2025) reforça as obrigações relacionadas a registros, documentos, sigilo e guarda.

**Limite do MVP:** AcolheMente não é prontuário nem registro documental psicológico. A ausência desses recursos na plataforma não elimina as obrigações profissionais de registro que eventualmente existam e que permanecem sob responsabilidade da psicóloga.

Se o produto futuramente armazenar registros clínicos, isso deve ser tratado como mudança de escopo e exigir nova análise ética, jurídica, de segurança, acesso, retenção e descarte.

Referência oficial: [Manual Orientativo do CFP (2025)](https://site.cfp.org.br/wp-content/uploads/2025/11/Manual_Orientativo.pdf).

## 4. LGPD e ANPD

Nome, telefone e outros dados de contato de uma pessoa natural podem ser dados pessoais. Dados referentes à saúde são dados pessoais sensíveis. A LGPD prevê hipóteses distintas de tratamento para dados pessoais em geral (art. 7º) e dados pessoais sensíveis (art. 11).

**Regra de engenharia:** não assumir que consentimento é automaticamente a base legal de todo tratamento. A finalidade, categoria do dado e contexto devem ser analisados antes da implementação, e a base legal aplicável deve ser documentada pela parte responsável pelo tratamento.

Para o MVP, a coleta administrativa deve continuar mínima e sem relatos de saúde, sintomas, diagnósticos, histórico clínico ou campo de texto livre.

A definição dos papéis de controlador, operador e demais responsabilidades também deve ocorrer antes de produção, inclusive para fornecedores tecnológicos.

Referência oficial: [ANPD — Perguntas Frequentes sobre a LGPD](https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes), atualizada em 2026-09-09.

## 5. Crianças e adolescentes

O MVP mantém crianças e adolescentes fora do fluxo de coleta e atendimento da plataforma.

Caso o escopo seja alterado, não assumir que autorização parental seja a única hipótese jurídica aplicável. O tratamento deverá ser analisado considerando o melhor interesse e as bases legais pertinentes, além das regras profissionais de atendimento, representação, sigilo e autonomia progressiva.

Qualquer inclusão futura exige revisão específica antes de implementação.

## 6. Checklist antes de produção

Antes de habilitar qualquer persistência de dados reais, confirmar e documentar:

- profissional responsável e aprovação do conteúdo;
- finalidade de cada dado coletado;
- categoria e necessidade de cada campo;
- base legal aplicável;
- controlador, operador e fornecedores envolvidos;
- aviso de privacidade;
- retenção por finalidade e critérios de descarte;
- direitos dos titulares e canal de atendimento;
- autenticação, autorização e privilégio mínimo;
- proteção de dados em trânsito e em repouso quando aplicável;
- logs sem PII desnecessária;
- procedimento de exclusão e resposta a incidentes;
- revisão de acessibilidade;
- revisão ética/profissional e, quando necessário, jurídica.

## Observação

As referências acima orientam decisões de produto, mas não substituem a consulta às versões oficiais vigentes, ao Código de Ética Profissional do Psicólogo, ao CRP competente ou a assessoria jurídica especializada quando necessária.
