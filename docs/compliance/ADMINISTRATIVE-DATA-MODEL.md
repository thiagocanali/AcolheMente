# Modelo de dados administrativos

> **Status: proposta técnica. Não é autorização para coletar dados reais.**

## Objetivo

Definir o menor conjunto possível de dados para contato administrativo e eventual solicitação de agendamento, sem transformar o MVP em sistema de prontuário ou coleta clínica.

## Dados candidatos

- nome (opcional, se realmente necessário);
- um canal de contato;
- preferência de modalidade: presencial, online ou indiferente;
- preferência de período: manhã, tarde ou noite;
- status interno;
- timestamps técnicos estritamente necessários.

Mesmo dados administrativos como nome e contato são dados pessoais e exigem finalidade, transparência e base legal apropriada. A base legal **não deve ser presumida como consentimento**: deve ser analisada conforme a finalidade e os arts. 7º e 11 da LGPD, quando aplicáveis.

## Não coletar no MVP

Não armazenar:
- motivo clínico, sintomas, diagnóstico ou histórico de saúde;
- narrativas clínicas ou campo de texto livre;
- documentos ou anexos;
- dados de crianças/adolescentes ou responsáveis;
- CPF, endereço residencial ou documentos de identificação;
- dados financeiros;
- qualquer informação clínica desnecessária para o objetivo administrativo.

O formulário deve orientar explicitamente a pessoa a não inserir informações de saúde.

## Crianças e adolescentes

O fluxo permanece desabilitado no MVP. Uma futura mudança de escopo exige análise específica do melhor interesse, bases legais aplicáveis e regras profissionais antes de qualquer coleta.

## Acesso e segurança

Se a persistência for aprovada futuramente:
- acesso somente a usuários autorizados;
- autorização no servidor;
- RLS/controle equivalente no banco;
- nenhum cadastro administrativo público com acesso amplo;
- logs sem PII desnecessária;
- segredos fora do código-fonte;
- transporte seguro;
- política de retenção e descarte implementada.

## Bloqueios antes da implementação

Não implementar persistência até definir e aprovar:
1. finalidade de cada campo;
2. base legal aplicável;
3. controlador, operador e fornecedores;
4. aviso de privacidade;
5. período de retenção por status/finalidade;
6. evento que inicia a contagem da retenção;
7. descarte também em backups;
8. processo para direitos dos titulares;
9. responsável por atender solicitações;
10. resposta a incidentes.

## Referências

- [Referências regulatórias do projeto](./REGULATORY-REFERENCES.md)
- [Privacidade e segurança](./PRIVACY-AND-SECURITY.md)

> Este documento é uma proposta de engenharia e não afirma conformidade jurídica ou ética automática.
