# Privacidade e segurança

## Princípios

AcolheMente deve aplicar minimização, finalidade, necessidade, transparência, segurança e privilégio mínimo desde o desenho do produto.

Dados referentes à saúde são dados pessoais sensíveis. Nome, telefone e outros dados de contato também podem ser dados pessoais. O fato de um dado ser apenas administrativo não o torna livre de proteção pela LGPD.

## Limites do MVP

Não coletar nem armazenar:
- sintomas;
- diagnósticos;
- histórico de saúde;
- relatos clínicos;
- prontuários ou registros psicológicos;
- documentos clínicos;
- texto livre para descrever sofrimento ou motivo clínico;
- dados de crianças/adolescentes.

AcolheMente não substitui os registros/documentos psicológicos que possam ser de responsabilidade da profissional. Se o produto passar a armazená-los, haverá mudança de escopo e nova revisão de segurança, privacidade, retenção, acesso e conformidade.

## Base legal

Não assumir que consentimento seja a base legal de todo tratamento. Para dados pessoais em geral, a LGPD prevê hipóteses no art. 7º; para dados pessoais sensíveis, no art. 11. A hipótese aplicável deve ser definida conforme finalidade, categoria do dado e contexto.

Antes da produção, documentar a análise de base legal para cada tratamento real.

## Transparência e direitos

Antes de qualquer coleta real, definir:
- finalidade e necessidade de cada campo;
- controlador, operador e fornecedores;
- aviso de privacidade;
- retenção e descarte;
- canal para exercício de direitos;
- procedimento de exclusão/correção quando aplicável;
- resposta a incidentes.

## Segurança técnica

Quando houver persistência aprovada:
- autenticação forte e autorização por menor privilégio;
- RLS ou controle equivalente;
- HTTPS/TLS;
- segredos somente em mecanismos apropriados;
- validação server-side;
- logs sem PII desnecessária;
- proteção contra acesso público indevido;
- backups e descarte tratados na política de retenção.

## Recursos de terceiros e conexões externas

A página institucional deve evitar requisições desnecessárias a terceiros. Fontes tipográficas são servidas pela pilha de fontes do próprio dispositivo; não carregamos Google Fonts nem outro provedor externo de fontes. Isso reduz a divulgação de metadados de conexão a terceiros durante a simples navegação.

Links externos acionados pela pessoa visitante (por exemplo, o repositório público do projeto) continuam sujeitos às políticas do destino. Qualquer futura incorporação de vídeos, mapas, widgets, fontes ou scripts de terceiros exige avaliação prévia de finalidade, dados transmitidos, necessidade, transparência e impacto na privacidade.

## Cookies, analytics e rastreamento

O MVP não deve introduzir analytics, cookies não essenciais, pixels ou rastreadores sem decisão documentada de finalidade, necessidade, transparência e base legal.

## Crianças e adolescentes

O MVP não coleta dados de crianças/adolescentes. Se esse escopo mudar, será necessária revisão específica, inclusive quanto ao melhor interesse e às bases legais aplicáveis, sem presumir que consentimento parental seja a única hipótese jurídica.

## Referências

- [Referências regulatórias do projeto](./REGULATORY-REFERENCES.md)
- [ANPD — Perguntas Frequentes](https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes)

> Este documento orienta engenharia e produto. Não constitui parecer jurídico nem afirma conformidade automática.
