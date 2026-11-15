# Plano de rollback da futura infraestrutura Neon

**Estado:** plano preliminar, não executado. Atualmente não há migração operacional de dados do Supabase a reverter.

## Antes de ativar
1. Documentar versão da aplicação, migrations, papéis e configuração por ambiente.
2. Validar backup e restauração com dados fictícios em ambiente isolado.
3. Registrar janela de mudança, responsável, critérios de parada e autorização de produção.
4. Confirmar segregação entre homologação e produção, e verificar segredos fora do Git.

## Se uma migração falhar em homologação
1. Interromper novas gravações no ambiente de teste.
2. Preservar logs técnicos sem PII, SHA da migration e diagnóstico.
3. Restaurar backup isolado ou recriar o banco de homologação apenas após verificar que não contém dados reais.
4. Corrigir migration e executar testes de integridade e autorização novamente.

## Em produção (futuro)
Não executar rollback automático destrutivo. A estratégia deverá considerar compatibilidade de esquema (expand/contract), recuperação pontual, tempo de restauração, dados escritos após o backup e comunicação de incidente. Exigir autorização operacional explícita e plano testado antes de qualquer mudança.

**Regra:** nenhuma exclusão de banco, perda deliberada de dados ou alteração de produção é autorizada por este documento.
