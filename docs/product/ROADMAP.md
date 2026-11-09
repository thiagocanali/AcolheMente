# Roadmap

## Fase 0 — Fundação
- [x] Definir visão, princípios e limites iniciais.
- [x] Documentar escopo conservador do MVP.
- [x] Registrar proposta de dados administrativos mínimos e limites de coleta.
- [ ] Validar jornada e campos com a psicóloga piloto.
- [ ] Confirmar informações públicas, contato e operação.
- [ ] Definir base legal, aviso de privacidade, retenção, descarte e responsabilidades.

## Fase 1 — Presença profissional
- [x] Configurar Vue 3 + TypeScript + Vite e landing page institucional.
- [x] Implementar componentes básicos acessíveis, SEO e testes do menu.
- [ ] Validar e publicar perfil profissional somente após aprovação da profissional (seguir [checklist de revisão](./PROFESSIONAL-PROFILE-REVIEW.md)).
- [ ] Revisão final de conteúdo e acessibilidade.

## Fase 2 — Solicitações administrativas
- [ ] Fechar o modelo de dados com a profissional e revisão de privacidade.
- [ ] Definir política de retenção, exclusão e backups.
- [ ] Projetar autenticação individual, autorização server-side e RLS.
- [ ] Configurar Supabase Auth e banco somente após aprovação das etapas anteriores.
- [ ] Implementar formulário sem campo clínico livre e painel protegido.
- [ ] Testar acesso permitido/negado, exclusão, abuso e ausência de dados pessoais em logs.

**Bloqueio:** não persistir solicitações nem inserir dados reais enquanto campos, base legal, aviso, retenção, descarte e controles de acesso não estiverem definidos e revisados.

## Fase 3 — Piloto
- [ ] Testar com dados fictícios em homologação.
- [ ] Realizar piloto controlado após revisão profissional e de privacidade.
- [ ] Medir clareza e facilidade de uso sem coletar dados clínicos.
- [ ] Priorizar melhorias com base no uso.

## Fase 4 — Expansão (decisão futura)
- [ ] Avaliar cadastro de outros profissionais.
- [ ] Avaliar pagamentos e agenda integrada.
- [ ] Avaliar videoatendimento por fornecedor adequado.
- [ ] Avaliar iniciativas sociais e bolsas.
- [ ] Considerar aplicativo somente após validação de demanda.

Cada fase depende de evidência e revisão. Não iniciar fases futuras apenas porque estão listadas.
