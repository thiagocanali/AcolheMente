# AcolheMente

**Cuidado que aproxima.**

AcolheMente é uma plataforma em construção para aproximar pessoas e profissionais de Psicologia por meio de uma experiência acolhedora, acessível, ética e segura.

## Visão

Começar com ferramentas simples que ajudem profissionais a apresentar seu trabalho, organizar disponibilidade e receber solicitações de agendamento. Evoluir, com validação real, para uma plataforma que conecte pacientes, famílias e profissionais.

## Princípios

- Acolhimento, dignidade e respeito à autonomia.
- Privacidade e proteção de dados desde a concepção.
- Acessibilidade e inclusão, sem capacitismo.
- Responsabilidade clínica sempre nas mãos de profissionais habilitados.
- Transparência sobre recursos, limites e custos.
- Tecnologia a serviço das pessoas.

## MVP

O primeiro MVP prioriza:
1. Página pública e institucional.
2. Perfil profissional informativo, somente com conteúdo aprovado pela profissional.
3. Formulário administrativo mínimo para solicitar contato/agendamento.
4. Área administrativa protegida para gerenciar solicitações.
5. Conteúdo claro sobre modalidade de atendimento, disponibilidade e canais de contato.

**Fora do MVP:** prontuário, relatos clínicos, triagem ou diagnóstico automatizado, teleconsulta embutida, pagamentos, marketplace aberto e fluxos para crianças/adolescentes.

## Stack

- Vue 3 + TypeScript + Vite.
- CSS próprio com componentes acessíveis.
- Supabase (PostgreSQL e Auth) somente após validação do fluxo, da retenção e da arquitetura de segurança.
- Vercel para hospedagem.
- Vitest e Playwright para testes.

Não adicionar serviços ou dependências sem justificativa.

## Desenvolvimento local

Requisitos: Node.js 20.17+ ou 22.9+ e npm (a CI utiliza Node.js 22).

```bash
npm ci
npm run dev
```

Verificações:

```bash
npm run test
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
npm audit
```

`npm run test:e2e` gera o build e testa a página publicada localmente na porta 4173, que precisa estar livre. Os cenários verificam navegação por teclado, foco, layout e acessibilidade automática em Chromium, nos tamanhos desktop e celular. Em ambientes com Chromium já instalado, é possível indicar o caminho com `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`.

O GitHub Actions executa testes de componentes, typecheck (incluindo testes e configurações), build e testes de navegador/acessibilidade em pull requests e atualizações da branch `main`. A auditoria de dependências também informa advisories e versões corrigidas em mudanças de dependências.

## Documentação

- [Visão do produto](docs/product/VISION.md)
- [Escopo do MVP](docs/product/MVP.md)
- [Personas e jornadas](docs/product/PERSONAS-AND-JOURNEYS.md)
- [Roadmap](docs/product/ROADMAP.md)
- [Checklist de revisão do perfil profissional](docs/product/PROFESSIONAL-PROFILE-REVIEW.md)
- [Gates de validação do MVP](docs/product/MVP-VALIDATION-GATES.md)
- [Proposta de ciclo de vida das solicitações](docs/product/ADMINISTRATIVE-REQUEST-LIFECYCLE.md)
- [Arquitetura](docs/engineering/ARCHITECTURE.md)
- [Revisão técnica de 2026-11-11](docs/engineering/REVIEW-2026-11-11.md)
- [Privacidade e segurança](docs/compliance/PRIVACY-AND-SECURITY.md)
- [Modelo mínimo de dados administrativos](docs/compliance/ADMINISTRATIVE-DATA-MODEL.md)
- [Ética e conformidade](docs/compliance/ETHICS-AND-COMPLIANCE.md)
- [Referências regulatórias](docs/compliance/REGULATORY-REFERENCES.md)
- [Decisões técnicas](docs/adr/README.md)

## Status

A landing page institucional está implementada. O fluxo administrativo ainda não está pronto para persistência: campos, base legal, aviso de privacidade, prazo de retenção, descarte e permissões precisam ser validados antes de receber dados reais. A documentação atual define uma proposta conservadora, não uma aprovação jurídica ou profissional.

Em 2026-11-11, a Vercel informa um deploy de produção com status `READY` para o commit `d3b3337`. Esse status confirma o build publicado, mas não substitui a validação dos fluxos no navegador.

## Licença

Ainda não licenciada. Não reutilize ou redistribua o código até que uma licença seja definida.
