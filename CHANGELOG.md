# Changelog

Mudanças relevantes do projeto serão registradas aqui.

## Unreleased
- Prepara componente de perfil com campos opcionais ocultos e prévia exclusiva do servidor de desenvolvimento em `?preview=profile`, sem publicar dados ou habilitar contato.
- Corrige a auditoria de dependências para falhar em erros de consulta, relatórios inválidos e vulnerabilidades moderadas ou superiores; adiciona execução semanal e testes do validador.
- Define cabeçalhos HTTP para a página estática: CSP, proteção contra interpretação incorreta de MIME e enquadramento, política de referenciador e bloqueio de câmera/microfone/geolocalização. Decisão e limites no ADR 0003.
- Incorpora seis cenários de navegador com Playwright e axe à CI, cobrindo teclado, foco, menu móvel, layout e acessibilidade automática sobre o build.
- Amplia o typecheck para testes de componentes, testes de navegador e configurações de teste.
- Adiciona lockfile npm e instalação reproduzível com `npm ci` nos workflows.
- Transfere o foco para a seção selecionada ao fechar o menu móvel, com teste de regressão.
- Registra revisão técnica, verificações executadas e próximas tarefas em `docs/engineering/REVIEW-2026-11-11.md`.
- Documenta uma proposta de estados e transições administrativas para solicitações, explicitamente pendente de validação profissional e de privacidade e sem autorizar persistência.
- Define gates verificáveis para conteúdo, fluxo administrativo, privacidade, segurança, homologação e piloto antes de qualquer persistência com dados reais.
- Adiciona checklist para revisão e aprovação explícita do perfil profissional antes da publicação, sem presumir credenciais, serviços, disponibilidade ou promessas de resultado.
- Remove o carregamento de fontes pelo Google Fonts e adota fontes do sistema, evitando uma requisição externa automática na visita à página institucional; documenta critérios para futuras integrações de terceiros.
- Corrige o fechamento do menu móvel com Escape mesmo quando o foco está no próprio botão de alternância, e adiciona teste de regressão.
- Ajusta tons de textos secundários, rótulos e metadados para melhorar o contraste com os fundos claros, preservando a identidade visual.
- Torna o landmark principal focável para que o link "Pular para o conteúdo" funcione melhor com navegação por teclado e adiciona testes de acessibilidade da estrutura principal.
- Atualiza o atributo rel do link externo para declarar explicitamente noopener.
- Atualiza as referências regulatórias e técnicas, incluindo CFP nº 9/2024, CFP nº 7/2025, Manual Orientativo do CFP (2025) e orientações atuais da ANPD sobre LGPD.
- Reforça requisitos de acessibilidade, limites sobre registros psicológicos, análise de bases legais, papéis de tratamento e exclusão de crianças/adolescentes do MVP.
- Reforça que consentimento não deve ser presumido como base legal universal e que o AcolheMente não substitui registros/documentos psicológicos profissionais.
- Faz a CI falhar quando a auditoria npm encontra vulnerabilidades moderadas, altas ou críticas.
- Atualiza Vitest, Vite e vue-tsc para versões corrigidas e remove Vue Test Utils, substituindo-o por montagem nativa do Vue nos testes para eliminar a cadeia vulnerável de js-beautify.
- Mantém relatório de auditoria npm com detalhes dos advisories e artefato temporário do lockfile gerado para revisão.
- Documenta proposta de campos administrativos mínimos, restrições explícitas a dados clínicos e critérios de acesso, retenção e descarte.
- Registra decisão de não implementar persistência até validação profissional e de privacidade.
- Adiciona workflow de auditoria de dependências npm em modo informativo para identificar pacotes, severidades e disponibilidade de correção.
- Atualiza README e roadmap para refletir bloqueadores reais do fluxo administrativo.
- Devolve o foco ao botão do menu móvel ao fechá-lo pela tecla Escape e cobre esse comportamento com teste.
- Extrai cabeçalho e rodapé em componentes Vue reutilizáveis e adiciona testes automatizados para o menu responsivo.
- Adiciona favicon SVG próprio, política básica de rastreamento e metadados Open Graph/Twitter para compartilhamento.
- Corrige o início da folha de estilos, que continha um fragmento inválido após a remoção da importação duplicada de fontes.
- Melhora a acessibilidade do menu móvel com suporte à tecla Escape e marcação dos elementos decorativos.
- Fundação documental: visão, escopo do MVP, jornadas, roadmap, arquitetura, privacidade, ética e instruções para agentes.
