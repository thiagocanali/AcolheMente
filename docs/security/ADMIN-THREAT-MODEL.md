# Modelo de ameaças — futuro painel administrativo

**Estado:** proposta de engenharia, não aprovação do Gate 4. Não existe API, autenticação, persistência ou painel administrativo de produção neste estágio.

## Ativos e limites de confiança

- Navegador público e parâmetros de URL são entradas **não confiáveis**.
- Identidade autenticada deve ser comprovada no servidor, nunca por IDs ou flags enviados pelo cliente.
- Um serviço futuro deverá verificar que a profissional autenticada é responsável pelo registro antes de qualquer leitura ou alteração.
- Banco, backups, logs e prestadores são superfícies distintas de acesso e retenção; exigem decisões dos Gates 2 e 3.
- A prévia `?preview=admin` funciona somente em desenvolvimento, com IDs fictícios e estado volátil. **Não é uma proteção de acesso reutilizável.**

## Ameaças e controles necessários antes de implementar

| Risco | Controle exigido | Evidência para homologação |
| --- | --- | --- |
| Leitura por visitante não autenticado | Negar por padrão no servidor | GET sem sessão → 401 sem dados |
| Acesso a solicitação de outra profissional (IDOR) | Filtro por responsável na consulta e RLS/equivalente | Registro de outra conta → 404/403 sem conteúdo |
| Elevação de privilégio por parâmetro de URL ou payload | Identidade e papel derivados da sessão validada | Trocar ID/role no cliente não amplia acesso |
| Alteração concorrente ou repetida | Transição atômica condicionada ao estado atual | Duas transições concorrentes: no máximo uma aceita |
| Reabertura indevida | Máquina de estados no servidor; encerramento terminal enquanto aprovado | `closed` não permite transições |
| CSRF ou roubo de sessão | Cookies seguros e proteção CSRF conforme mecanismo de autenticação | Requisições cruzadas não autorizadas falham |
| XSS em conteúdo exibido | Renderização escapada; CSP restritiva | Conteúdo de teste tratado como texto |
| Exposição de PII em URL, log ou erro | Minimização e redaction; IDs opacos | Testes e revisão de logs sem payload pessoal |
| Retenção indefinida | Política aprovada, descarte e ciclo de backup | Evidência de expurgo conforme regra definida |
| Abuso de envio público | Limitação de taxa e proteção anti-automação compatível com acessibilidade | Teste de abuso sem vazamento de existência de registros |
| Perda ou corrupção | Backup com acesso restrito e restauração ensaiada | Recuperação testada sem dados reais |

## Contratos candidatos, **não implementados**

- `GET /api/admin/requests`: autenticação obrigatória; somente registros autorizados, campos mínimos e paginação. Nenhuma informação clínica.
- `PATCH /api/admin/requests/:opaqueId/status`: autenticação, autorização por responsável e comparação atômica com o estado atual; rejeição genérica para acesso negado, estado inválido e conflito.
- `DELETE /api/admin/requests/:opaqueId`: **não projetar endpoint antes de definir retenção, base legal e descarte em backups**.
- Nenhum endpoint de criação pública até aprovações dos campos, aviso de privacidade e requisitos de segurança.

A forma exata de respostas, erros, autenticação e códigos HTTP será decidida na especificação do Gate 4; esta lista não autoriza desenvolvimento do backend.

## Decisões bloqueadoras

1. **Gate 1:** aprovação de conteúdo e canais da profissional.
2. **Gate 2:** estados, campos, duplicidade, encerramento e indisponibilidade.
3. **Gate 3:** papéis de tratamento, base legal, aviso, retenção, exclusão e incidentes.
4. **Gate 4:** provedor de identidade, sessões, autorização, isolamento/RLS, backups, ambientes e testes.
5. **Gate 5:** testes com dados inteiramente fictícios, incluindo tentativas de acesso indevido e restauração.
6. **Gate 6:** autorização explícita para piloto controlado.

Nenhuma conta real, banco, API ou coleta deve ser ativada enquanto os gates aplicáveis estiverem pendentes.
