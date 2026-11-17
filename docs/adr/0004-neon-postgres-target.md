# ADR 0004 — Neon PostgreSQL como banco alvo

**Status:** decisão de direção tecnológica; implementação bloqueada pelos gates do MVP.

## Contexto

O AcolheMente é atualmente uma aplicação Vue/Vite estática. Não há banco, API ou autenticação operacionais no MVP. A estratégia de infraestrutura passou a priorizar Neon PostgreSQL em vez de Supabase. A documentação de validação exige aprovações profissionais, de fluxo e privacidade antes de persistir dados administrativos.

## Decisão

- Adotar Neon PostgreSQL como destino da **futura** persistência do AcolheMente, em projeto isolado.
- Não depender de Supabase Auth, Storage, Realtime, Edge Functions ou APIs.
- Manter a landing atual estática até que os gates aplicáveis sejam aprovados.
- Escolher autenticação independente (Better Auth como candidato, não decisão final) no Gate 4.
- Fazer acesso ao PostgreSQL exclusivamente pelo servidor, com TLS, queries parametrizadas, segredos segregados e autorização por identidade verificada no servidor.
- Definir migrações, retenção, isolamento, backups e testes negativos antes de ativar persistência.

## Alternativas

1. **Supabase:** descartado como dependência operacional futura pela diretriz de padronização.
2. **Neon + Better Auth:** candidato, mas precisa de revisão de sessões, recuperação, e-mail, limites e requisitos de segurança antes de implementação.
3. **Autenticação própria:** não recomendada sem necessidade técnica comprovada devido ao custo de manutenção e risco.

## Consequências e riscos

- Neon fornece PostgreSQL, **não** um substituto direto para autenticação, armazenamento de arquivos ou regras Supabase.
- Sem backend aprovado, criar tabelas de pacientes ou habilitar cadastros anteciparia tratamento de dados sem governança definida.
- O ambiente de produção permanece sem conexão de banco até autorização operacional.
- A implantação futura exigirá testes de isolamento entre usuários, restauração e migrações reproduzíveis; `READY` da Vercel não comprova esses fluxos.
- Não há rollback de banco a executar nesta fase, pois nenhuma migração operacional foi iniciada.

## Critério para avançar

Aprovação dos Gates 1–3 e especificação técnica do Gate 4, conforme `docs/product/MVP-VALIDATION-GATES.md`. Só depois disso provisionar banco, criar migrations e implementar API/Auth com dados fictícios em homologação.
