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
2. Perfil profissional informativo.
3. Formulário administrativo mínimo para solicitar contato/agendamento.
4. Área administrativa básica para gerenciar solicitações.
5. Conteúdo claro sobre modalidade de atendimento, disponibilidade e canais de contato.

**Fora do MVP:** prontuário, relatos clínicos, triagem ou diagnóstico automatizado, teleconsulta embutida, pagamentos e marketplace aberto.

## Stack inicial proposta

- Vue 3 + TypeScript + Vite.
- CSS próprio com componentes acessíveis.
- Supabase (PostgreSQL e Auth) quando houver necessidade real de persistência.
- Vercel para hospedagem.
- Vitest e Playwright para testes.

A arquitetura deve permanecer simples, modular e evolutiva. Não adicionar serviços ou dependências sem justificativa.

## Desenvolvimento local

Requisitos: Node.js 22 ou superior e npm.

```bash
npm install
npm run dev
```

Verificações antes de enviar alterações:

```bash
npm run typecheck
npm run build
```

O GitHub Actions executa o typecheck e o build em pull requests e em atualizações da branch `main`.

## Documentação

- [Visão do produto](docs/product/VISION.md)
- [Escopo do MVP](docs/product/MVP.md)
- [Personas e jornadas](docs/product/PERSONAS-AND-JOURNEYS.md)
- [Roadmap](docs/product/ROADMAP.md)
- [Arquitetura](docs/engineering/ARCHITECTURE.md)
- [Privacidade e segurança](docs/compliance/PRIVACY-AND-SECURITY.md)
- [Ética e conformidade](docs/compliance/ETHICS-AND-COMPLIANCE.md)
- [Decisões técnicas](docs/adr/README.md)

## Status

Fase atual: fundação e descoberta do produto. Decisões clínicas, regulatórias e de tratamento de dados devem ser validadas com a psicóloga responsável e, quando necessário, assessoria especializada.

## Licença

Ainda não licenciada. Não reutilize ou redistribua o código até que uma licença seja definida.
