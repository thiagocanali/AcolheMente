# Arquitetura inicial

## Diretriz
Começar com uma aplicação web única, modular e simples. Evitar microserviços, filas e abstrações prematuras.

## Stack proposta
- Vue 3 + TypeScript + Vite.
- Vue Router quando houver mais de uma área/rota.
- CSS próprio com tokens e componentes acessíveis.
- Vitest para testes unitários; Playwright para fluxos E2E.
- Supabase para autenticação e persistência somente quando o fluxo estiver validado.
- Vercel para hospedagem, com variáveis de ambiente separadas por ambiente.

## Módulos lógicos
- `public-site`: conteúdo público e perfil profissional.
- `contact-requests`: formulário e estados de solicitação.
- `professional-admin`: painel administrativo autenticado.
- `shared`: componentes, validação, acessibilidade e utilitários.

## Dados e confiança
- Não persistir conteúdo clínico.
- Minimizar identificadores e campos pessoais.
- Validar no cliente e no servidor.
- Aplicar menor privilégio e RLS no banco.
- Nunca confiar em autorização apenas por rota ou interface.
- Não registrar payloads de formulários em logs.
- Separar ambientes e usar dados fictícios.

## Integrações
Adicionar integrações somente quando o caso de uso estiver definido e os termos, localização de dados, segurança, retenção e responsabilidades forem avaliados.

## Evolução
A arquitetura pode evoluir para múltiplos profissionais depois do piloto. O modelo de dados deve evitar acoplamento desnecessário, mas não antecipar marketplace, pagamentos ou prontuário.
