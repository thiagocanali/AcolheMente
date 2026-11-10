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
npm install
npm run dev
```

Verificações:

```bash
npm run test
npm run typecheck
npm run build
npm audit
```

O GitHub Actions executa testes, typecheck e build em pull requests e atualizações da branch `main`. A auditoria de dependências também informa advisories e versões corrigidas em mudanças de dependências.

## Documentação

- [Visão do produto](docs/product/VISION.md)
- [Escopo do MVP](docs/product/MVP.md)
- [Personas e jornadas](docs/product/PERSONAS-AND-JOURNEYS.md)
- [Roadmap](docs/product/ROADMAP.md)
- [Checklist de revisão do perfil profissional](docs/product/PROFESSIONAL-PROFILE-REVIEW.md)
- [Gates de validação do MVP](docs/product/MVP-VALIDATION-GATES.md)
- [Proposta de ciclo de vida das solicitações](docs/product/ADMINISTRATIVE-REQUEST-LIFECYCLE.md)
- [Arquitetura](docs/engineering/ARCHITECTURE.md)
- [Privacidade e segurança](docs/compliance/PRIVACY-AND-SECURITY.md)
- [Modelo mínimo de dados administrativos](docs/compliance/ADMINISTRATIVE-DATA-MODEL.md)
- [Ética e conformidade](docs/compliance/ETHICS-AND-COMPLIANCE.md)
- [Referências regulatórias](docs/compliance/REGULATORY-REFERENCES.md)
- [Decisões técnicas](docs/adr/README.md)

## Status

A landing page institucional está implementada. O fluxo administrativo ainda não está pronto para persistência: campos, base legal, aviso de privacidade, prazo de retenção, descarte e permissões precisam ser validados antes de receber dados reais. A documentação atual define uma proposta conservadora, não uma aprovação jurídica ou profissional.

A publicação também depende da resolução do limite de builds da conta Vercel; conexão do repositório não significa que exista um deploy publicado.

## Licença

Ainda não licenciada. Não reutilize ou redistribua o código até que uma licença seja definida.
