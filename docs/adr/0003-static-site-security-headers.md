# ADR 0003 — Cabeçalhos de segurança da página estática

- **Status:** Adotado para a página institucional, sujeito à validação no preview antes da integração.
- **Data:** 2026-11-11

## Contexto

A página atual carrega JavaScript, CSS e favicon do próprio domínio, usa fontes do dispositivo e não contém formulário, iframe, API ou autenticação. Na consulta de produção desta revisão, não foram observados CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy ou Permissions-Policy explícitos. A plataforma já fornece HSTS.

## Decisão

Configurar os cabeçalhos de resposta em `vercel.json`, para todos os caminhos:

- CSP permite scripts, estilos, imagens, fontes e conexões somente do próprio domínio; demais tipos ficam bloqueados por padrão. Não permite scripts/estilos inline, eval, plugins, alteração da base, submissão de formulários ou incorporação em frames.
- `X-Content-Type-Options: nosniff` evita interpretação de recursos como outro tipo MIME.
- `X-Frame-Options: DENY` complementa `frame-ancestors 'none'` para navegadores legados.
- `Referrer-Policy: no-referrer` impede envio do referenciador nas requisições.
- `Permissions-Policy` desabilita câmera, microfone e geolocalização, que não são necessários nesta página.

Não duplicar HSTS fornecido pela Vercel nem adicionar o cabeçalho obsoleto X-XSS-Protection. A política se aplica ao build servido pela Vercel; o servidor de desenvolvimento do Vite não a aplica e necessita recursos próprios como HMR.

## Alternativas consideradas

- **Não configurar cabeçalhos:** mantém a política genérica do navegador sem expressar os limites atuais da aplicação.
- **Permitir qualquer origem ou código inline:** amplia permissões sem necessidade no build atual.
- **CSP somente em meta tag:** não cobre `frame-ancestors` e não substitui cabeçalhos HTTP.

## Consequências e riscos

A página não pode ser incorporada em outro site. Ferramentas que injetam scripts externos, incluindo a toolbar de previews da Vercel, podem ser bloqueadas; validar o preview por abertura direta. Não liberar origens genéricas apenas para acomodar uma ferramenta.

Integrações futuras, Supabase, autenticação, formulários, recursos inline ou serviços de terceiros exigem revisão explícita desta política e testes no build. CSP é defesa adicional; não substitui validação de entradas, autorização no servidor ou RLS. Os cabeçalhos não afirmam conformidade legal nem segurança integral.

## Verificação e reversão

Build validado em Chromium com os cabeçalhos HTTP aplicados por servidor local: renderização e estilos em 360 e 1280 pixels, navegação por teclado e transferência de foco; tentativa de script inline bloqueada por CSP. Conferir os cabeçalhos efetivos no preview da Vercel, pois `vite preview` sozinho não aplica `vercel.json`.

Reverter o commit remove a configuração no próximo deploy. Não há alteração de dados, banco ou segredos.

## Referência

- [Vercel — configuração de headers](https://vercel.com/docs/project-configuration/vercel-json#headers)
