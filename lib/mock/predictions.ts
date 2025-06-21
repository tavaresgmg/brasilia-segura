import { BRASILIA_REGIONS } from './regions';
import { REPORT_CATEGORIES } from './categories';

export interface Prediction {
  id: string;
  regionId: string;
  categoryId: string;
  probability: number; // 0-100
  riskLevel: 'baixo' | 'médio' | 'alto' | 'crítico';
  predictedDate: string;
  factors: string[];
  preventiveActions: string[];
  estimatedImpact: {
    affected: number;
    economicLoss: number;
    socialImpact: 'baixo' | 'médio' | 'alto';
  };
}

export interface TrendAnalysis {
  categoryId: string;
  trend: 'crescente' | 'estável' | 'decrescente';
  changePercentage: number;
  projection: number[]; // próximos 6 meses
  confidence: number; // 0-100
}

export interface HotspotAnalysis {
  regionId: string;
  riskScore: number; // 0-100
  mainIssues: string[];
  correlatedFactors: {
    factor: string;
    correlation: number; // -1 to 1
  }[];
  recommendations: string[];
}

// Gerar predições baseadas em padrões históricos
function generatePredictions(): Prediction[] {
  const predictions: Prediction[] = [];
  
  // Regiões com maior probabilidade de problemas
  const highRiskRegions = ['ceilandia', 'samambaia', 'sol-nascente', 'estrutural'];
  
  // Categorias mais prováveis
  const criticalCategories = ['iluminacao', 'seguranca', 'lixo', 'esgoto'];
  
  for (const region of BRASILIA_REGIONS) {
    const isHighRisk = highRiskRegions.includes(region.id);
    
    for (const category of REPORT_CATEGORIES) {
      const isCriticalCategory = criticalCategories.includes(category.id);
      
      // Calcular probabilidade baseada em fatores
      let baseProbability = Math.random() * 40 + 10;
      if (isHighRisk) baseProbability += 30;
      if (isCriticalCategory) baseProbability += 20;
      
      if (baseProbability > 40) {
        const probability = Math.min(baseProbability + (Math.random() * 20 - 10), 95);
        
        predictions.push({
          id: `pred-${region.id}-${category.id}`,
          regionId: region.id,
          categoryId: category.id,
          probability: Math.round(probability),
          riskLevel: 
            probability > 80 ? 'crítico' :
            probability > 60 ? 'alto' :
            probability > 40 ? 'médio' : 'baixo',
          predictedDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          factors: generateFactors(region.id, category.id),
          preventiveActions: generateActions(category.id),
          estimatedImpact: {
            affected: Math.floor(region.population * (probability / 100) * 0.1),
            economicLoss: Math.floor(probability * 1000 * Math.random()),
            socialImpact: probability > 70 ? 'alto' : probability > 40 ? 'médio' : 'baixo'
          }
        });
      }
    }
  }
  
  return predictions.sort((a, b) => b.probability - a.probability).slice(0, 50);
}

function generateFactors(regionId: string, categoryId: string): string[] {
  const commonFactors = [
    'Histórico de ocorrências na região',
    'Densidade populacional elevada',
    'Infraestrutura antiga'
  ];
  
  const categoryFactors: Record<string, string[]> = {
    iluminacao: ['Falta de manutenção preventiva', 'Vandalismo recorrente', 'Rede elétrica sobrecarregada'],
    lixo: ['Coleta irregular', 'Falta de lixeiras públicas', 'Descarte inadequado'],
    buracos: ['Tráfego intenso', 'Drenagem inadequada', 'Solo instável'],
    seguranca: ['Iluminação deficiente', 'Pouco policiamento', 'Áreas abandonadas'],
    esgoto: ['Sistema antigo', 'Crescimento desordenado', 'Falta de manutenção'],
    calcada: ['Raízes de árvores', 'Material de baixa qualidade', 'Uso intenso']
  };
  
  return [
    ...commonFactors.slice(0, Math.floor(Math.random() * 2) + 1),
    ...(categoryFactors[categoryId] || []).slice(0, Math.floor(Math.random() * 2) + 1)
  ];
}

function generateActions(categoryId: string): string[] {
  const actions: Record<string, string[]> = {
    iluminacao: [
      'Instalar iluminação LED preventiva',
      'Aumentar rondas de manutenção',
      'Criar programa de adoção de postes'
    ],
    lixo: [
      'Instalar mais pontos de coleta',
      'Campanhas de conscientização',
      'Aumentar frequência de coleta'
    ],
    buracos: [
      'Mapeamento preventivo de áreas',
      'Operação tapa-buraco programada',
      'Melhorar sistema de drenagem'
    ],
    seguranca: [
      'Aumentar patrulhamento',
      'Instalar câmeras de segurança',
      'Programa de ocupação de espaços'
    ],
    esgoto: [
      'Limpeza preventiva de bueiros',
      'Substituição de tubulações antigas',
      'Monitoramento de vazamentos'
    ],
    calcada: [
      'Programa de revitalização',
      'Poda preventiva de árvores',
      'Padronização de calçadas'
    ]
  };
  
  return actions[categoryId] || ['Ação preventiva genérica'];
}

// Análise de tendências
function generateTrendAnalysis(): TrendAnalysis[] {
  return REPORT_CATEGORIES.map(category => {
    const trend = Math.random() > 0.6 ? 'crescente' : Math.random() > 0.3 ? 'estável' : 'decrescente';
    const baseValue = Math.random() * 100 + 50;
    
    return {
      categoryId: category.id,
      trend,
      changePercentage: trend === 'crescente' ? Math.random() * 30 + 5 :
                       trend === 'decrescente' ? -(Math.random() * 20 + 5) :
                       Math.random() * 10 - 5,
      projection: Array.from({ length: 6 }, (_, i) => {
        const trendFactor = trend === 'crescente' ? 1.05 :
                           trend === 'decrescente' ? 0.95 : 1;
        return Math.round(baseValue * Math.pow(trendFactor, i + 1));
      }),
      confidence: Math.round(Math.random() * 30 + 70)
    };
  });
}

// Análise de hotspots
function generateHotspotAnalysis(): HotspotAnalysis[] {
  const highRiskRegions = ['ceilandia', 'samambaia', 'sol-nascente', 'estrutural', 'santa-maria'];
  
  return BRASILIA_REGIONS
    .map(region => {
      const isHighRisk = highRiskRegions.includes(region.id);
      const baseScore = isHighRisk ? 60 : 30;
      const riskScore = Math.min(baseScore + Math.random() * 30, 95);
      
      return {
        regionId: region.id,
        riskScore: Math.round(riskScore),
        mainIssues: generateMainIssues(riskScore),
        correlatedFactors: generateCorrelatedFactors(),
        recommendations: generateRecommendations(riskScore)
      };
    })
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 15);
}

function generateMainIssues(riskScore: number): string[] {
  const allIssues = [
    'Iluminação pública deficiente',
    'Acúmulo de lixo em vias públicas',
    'Buracos nas vias principais',
    'Falta de segurança pública',
    'Problemas de esgoto a céu aberto',
    'Calçadas danificadas',
    'Pichações e vandalismo',
    'Terrenos baldios abandonados'
  ];
  
  const numIssues = riskScore > 70 ? 5 : riskScore > 50 ? 3 : 2;
  return allIssues.sort(() => Math.random() - 0.5).slice(0, numIssues);
}

function generateCorrelatedFactors(): { factor: string; correlation: number }[] {
  const factors = [
    { factor: 'Densidade populacional', correlation: 0.75 },
    { factor: 'Renda média', correlation: -0.65 },
    { factor: 'Idade da infraestrutura', correlation: 0.82 },
    { factor: 'Investimento público', correlation: -0.71 },
    { factor: 'Participação cidadã', correlation: -0.58 }
  ];
  
  return factors
    .map(f => ({ ...f, correlation: f.correlation + (Math.random() * 0.2 - 0.1) }))
    .slice(0, 3);
}

function generateRecommendations(riskScore: number): string[] {
  const recommendations = [
    'Implementar força-tarefa de manutenção urbana',
    'Criar programa de zeladoria compartilhada',
    'Aumentar frequência de rondas preventivas',
    'Instalar sistema de monitoramento inteligente',
    'Promover mutirões comunitários mensais',
    'Estabelecer canal direto com a administração',
    'Criar programa de adoção de espaços públicos'
  ];
  
  const numRecs = riskScore > 70 ? 4 : riskScore > 50 ? 3 : 2;
  return recommendations.sort(() => Math.random() - 0.5).slice(0, numRecs);
}

// Exportar dados mockados
export const MOCK_PREDICTIONS = generatePredictions();
export const MOCK_TREND_ANALYSIS = generateTrendAnalysis();
export const MOCK_HOTSPOT_ANALYSIS = generateHotspotAnalysis();

// Estatísticas gerais de IA
export const AI_STATISTICS = {
  totalPredictions: MOCK_PREDICTIONS.length,
  criticalPredictions: MOCK_PREDICTIONS.filter(p => p.riskLevel === 'crítico').length,
  highAccuracy: 87.3, // % de acurácia simulada
  preventedIncidents: 156, // número simulado
  economicSavings: 2450000, // R$ economizados (simulado)
  modelLastUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  dataPoints: 15420, // pontos de dados analisados
  averageResponseTime: 0.234 // segundos
};