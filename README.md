# Brasília Segura 🛡️

**Campus Party 2025 - Desafio Cidade + Segura**

Uma Progressive Web App (PWA) totalmente visual e mockada para transformar Brasília em uma cidade mais segura através da participação cidadã e inteligência artificial.

## 🎯 Sobre o Projeto

Brasília Segura é uma solução inovadora que permite aos cidadãos reportarem problemas urbanos como iluminação quebrada, acúmulo de lixo, buracos nas vias e outras desordens que afetam a segurança pública. Baseado na Teoria das Janelas Quebradas e metodologia CPTED, o app usa IA para análise preditiva e prevenção de problemas.

### ✨ Funcionalidades Principais

- 📱 **PWA Mobile-First**: Funciona offline e pode ser instalado como app nativo
- 📸 **Reporte em 5 Passos**: Sistema wizard intuitivo com foto e geolocalização
- 🗺️ **Mapa Visual**: Visualização mockada com clustering e heatmap (sem biblioteca de mapas)
- 🤖 **IA Preditiva**: Simulação visual de análise de padrões e previsão de riscos
- 📊 **Dashboard Admin**: Gestão completa com gráficos e métricas
- 🏆 **Gamificação**: Sistema de pontos e rankings para engajamento cidadão

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Estilização moderna e responsiva
- **shadcn/ui** - Componentes UI acessíveis e bonitos
- **PWA** - next-pwa com Serwist para funcionalidade offline
- **Zustand** - Gerenciamento de estado simples e eficiente

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/brasilia-segura.git

# Entre no diretório
cd brasilia-segura

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📦 Scripts

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter

## 🌐 Deploy no GitHub Pages

O app está configurado para deploy automático:

```bash
# Build para produção
npm run build

# O GitHub Actions fará deploy automático ao fazer push para main
git push origin main
```

Acesse em: `https://seu-usuario.github.io/brasilia-segura`

## 📱 Como Usar

### Para Cidadãos:
1. Acesse o app pelo navegador mobile
2. Faça login com qualquer email/senha
3. Clique no botão "Reportar Problema"
4. Siga o wizard de 5 passos
5. Receba protocolo para acompanhamento

### Para Administradores:
1. Login com email terminando em `@admin.com`
2. Acesse dashboard com métricas em tempo real
3. Visualize predições de IA e hotspots
4. Gerencie reportes e tome ações

## 🏛️ Dados Realistas de Brasília

- **35 Regiões Administrativas** com coordenadas GPS reais
- **500+ reportes simulados** com distribuição ponderada
- **Maior concentração** em Ceilândia e Samambaia (baseado em dados reais)
- **8 categorias** de problemas urbanos

## 🤖 Inteligência Artificial Visual

- **Predições de risco** para próximos 30 dias
- **Análise de tendências** por categoria
- **Mapa de hotspots** com correlações
- **87.3% acurácia simulada**
- **156 incidentes prevenidos** (simulação)

## 🏗️ Estrutura do Projeto

```
brasilia-segura/
├── app/
│   ├── (auth)/         # Login/Registro
│   ├── (app)/          # App do cidadão
│   ├── (admin)/        # Painel administrativo
│   └── layout.tsx      # Layout PWA
├── components/
│   ├── ui/            # shadcn/ui
│   └── features/      # Componentes específicos
├── lib/
│   ├── mock/          # Dados mockados
│   ├── contexts/      # Contextos React
│   └── utils/         # Utilitários
└── public/
    ├── icons/         # Ícones PWA
    └── manifest.json  # Manifesto
```

## 👥 Créditos

Desenvolvido para o **Hackathon Campus Party 2025** - Desafio Cidade + Segura

## 📄 Notas

Este é um projeto demonstrativo com dados totalmente mockados para fins de apresentação no hackathon.
