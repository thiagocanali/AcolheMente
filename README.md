# AcolheMente

Plataforma web com foco em psicologia, acessibilidade, privacidade e segurança, começando por um MVP institucional e administrativo mínimo.

## Status

Projeto em construção. O MVP prioriza um site institucional, apresentação profissional validada, acessibilidade e uma base técnica preparada para evoluir com segurança.

## Escopo do MVP

Inclui:
- página institucional;
- apresentação profissional;
- informações sobre atendimento, quando validadas pela profissional;
- contato/solicitação administrativa mínima, quando houver persistência aprovada;
- área administrativa protegida, se e quando necessária.

Fora do MVP:
- prontuário ou registros clínicos;
- diagnóstico ou triagem clínica automatizada;
- IA clínica;
- teleatendimento embutido;
- pagamentos;
- marketplace aberto;
- fluxo de crianças/adolescentes.

## Stack

- Vue 3
- TypeScript
- Vite
- CSS próprio
- Vitest
- GitHub Actions

## Desenvolvimento local

Requisitos: Node.js 20.17+ ou 22.9+.

```bash
npm install
npm run dev
```

Validação:

```bash
npm run test:run
npm run typecheck
npm run build
npm audit --audit-level=moderate
```

## Documentação

- [Visão do produto](docs/product/VISION.md)
- [MVP](docs/product/MVP.md)
- [Personas e jornadas](docs/product/PERSONAS-AND-JOURNEYS.md)
- [Roadmap](docs/product/ROADMAP.md)
- [Arquitetura](docs/engineering/ARCHITECTURE.md)
- [Privacidade e segurança](docs/compliance/PRIVACY-AND-SECURITY.md)
- [Modelo de dados administrativos](docs/compliance/ADMINISTRATIVE-DATA-MODEL.md)
- [Ética e conformidade](docs/compliance/ETHICS-AND-COMPLIANCE.md)
- [Referências regulatórias](docs/compliance/REGULATORY-REFERENCES.md)
- [ADRs](docs/adr/README.md)

## Princípio

Nenhuma persistência de dados reais deve ser habilitada antes de definir finalidade, base legal, responsabilidades, retenção, direitos dos titulares, controles de acesso, segurança e processo de descarte.
