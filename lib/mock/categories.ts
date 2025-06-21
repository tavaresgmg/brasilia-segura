export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const REPORT_CATEGORIES: Category[] = [
  {
    id: 'iluminacao',
    name: 'Iluminação Pública',
    icon: '💡',
    color: '#FCD34D',
    description: 'Postes apagados, lâmpadas queimadas, fiação exposta'
  },
  {
    id: 'lixo',
    name: 'Lixo Acumulado',
    icon: '🗑️',
    color: '#8B5CF6',
    description: 'Descarte irregular, entulho, lixo nas ruas'
  },
  {
    id: 'buraco',
    name: 'Buraco na Via',
    icon: '🕳️',
    color: '#EF4444',
    description: 'Buracos no asfalto, crateras, vias danificadas'
  },
  {
    id: 'area-degradada',
    name: 'Área Degradada',
    icon: '🏚️',
    color: '#F97316',
    description: 'Terrenos abandonados, mato alto, áreas de risco'
  },
  {
    id: 'construcao-irregular',
    name: 'Construção Irregular',
    icon: '🏗️',
    color: '#10B981',
    description: 'Obras sem alvará, invasões, construções em área pública'
  },
  {
    id: 'calcada',
    name: 'Calçada Danificada',
    icon: '🚶',
    color: '#3B82F6',
    description: 'Calçadas quebradas, sem acessibilidade, obstruídas'
  },
  {
    id: 'sinalizacao',
    name: 'Sinalização',
    icon: '🚦',
    color: '#EC4899',
    description: 'Placas danificadas, semáforos com defeito, faixas apagadas'
  },
  {
    id: 'arvore',
    name: 'Árvore/Vegetação',
    icon: '🌳',
    color: '#84CC16',
    description: 'Árvore caída, galhos perigosos, mato alto'
  }
];

export const URGENCY_LEVELS = [
  { id: 'baixa', name: 'Baixa', color: '#10B981', days: 30 },
  { id: 'media', name: 'Média', color: '#F59E0B', days: 15 },
  { id: 'alta', name: 'Alta', color: '#EF4444', days: 7 },
  { id: 'critica', name: 'Crítica', color: '#7C3AED', days: 1 }
];

export const REPORT_STATUS = [
  { id: 'pendente', name: 'Pendente', color: '#6B7280' },
  { id: 'em-analise', name: 'Em Análise', color: '#3B82F6' },
  { id: 'em-andamento', name: 'Em Andamento', color: '#F59E0B' },
  { id: 'resolvido', name: 'Resolvido', color: '#10B981' },
  { id: 'cancelado', name: 'Cancelado', color: '#EF4444' }
];