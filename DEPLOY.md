# Deploy Instructions

## GitHub Pages Deployment

O projeto está configurado para deploy automático no GitHub Pages usando GitHub Actions.

### URLs do Projeto

- **Repositório**: https://github.com/tavaresgmg/brasilia-segura
- **App Live**: https://tavaresgmg.github.io/brasilia-segura

### Deploy Automático

1. Qualquer push para a branch `main` dispara o deploy automático
2. O GitHub Actions executa:
   - Instalação de dependências
   - Build de produção com Next.js
   - Deploy dos arquivos estáticos no GitHub Pages

### Deploy Manual

Se precisar fazer deploy manual:

```bash
# Build local
npm run build

# O GitHub Actions fará o deploy automaticamente após push
git add .
git commit -m "Sua mensagem"
git push origin main
```

### Verificar Status do Deploy

1. Acesse: https://github.com/tavaresgmg/brasilia-segura/actions
2. Verifique o workflow "Deploy to GitHub Pages"
3. Aguarde a conclusão (geralmente 2-3 minutos)

### Configurações Importantes

- **Base Path**: `/brasilia-segura` (configurado em `next.config.ts`)
- **Output**: Static export para GitHub Pages
- **Branch**: Deploy a partir da branch `main`

### Troubleshooting

Se o site não aparecer:
1. Verifique Settings > Pages no repositório
2. Confirme que está usando a branch `main`
3. Aguarde até 10 minutos para primeira publicação
4. Limpe o cache do navegador

### Ambiente Local

Para testar localmente com as mesmas configurações de produção:

```bash
npm run build
npx serve@latest out
```

Acesse: http://localhost:3000