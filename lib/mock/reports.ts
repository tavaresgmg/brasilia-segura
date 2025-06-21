import { BRASILIA_REGIONS } from './regions';
import { REPORT_CATEGORIES, URGENCY_LEVELS, REPORT_STATUS } from './categories';

export interface Report {
  id: string;
  userId: string;
  userName: string;
  categoryId: string;
  title: string;
  description: string;
  location: {
    address: string;
    regionId: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  urgency: string;
  status: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  comments: number;
}

// Imagens de exemplo (placeholder)
const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', // Poste apagado
  'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&h=600&fit=crop', // Lixo
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&h=600&fit=crop', // Buraco
  'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=800&h=600&fit=crop', // Área abandonada
  'https://images.unsplash.com/photo-1590142151816-82b98c2b81a5?w=800&h=600&fit=crop', // Construção
  'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&h=600&fit=crop', // Calçada
];

// Descrições por categoria
const DESCRIPTIONS_BY_CATEGORY: Record<string, string[]> = {
  'iluminacao': [
    'Poste completamente apagado há mais de uma semana',
    'Três postes consecutivos sem iluminação',
    'Lâmpada piscando constantemente, causando desconforto',
    'Fiação exposta em poste de iluminação',
    'Iluminação insuficiente tornando a área perigosa'
  ],
  'lixo': [
    'Grande acúmulo de lixo na esquina',
    'Entulho de construção abandonado há dias',
    'Lixo espalhado por toda a calçada',
    'Descarte irregular de móveis velhos',
    'Ponto viciado de lixo sem coleta regular'
  ],
  'buraco': [
    'Buraco profundo no meio da via',
    'Cratera causando acidentes frequentes',
    'Asfalto cedendo formando grande depressão',
    'Sequência de buracos tornando via intransitável',
    'Buraco com água acumulada escondendo profundidade'
  ],
  'area-degradada': [
    'Terreno abandonado com mato alto e lixo',
    'Área pública tomada por vegetação e entulho',
    'Local usado para descarte irregular',
    'Construção abandonada servindo de abrigo',
    'Praça completamente deteriorada e sem manutenção'
  ],
  'construcao-irregular': [
    'Construção avançando sobre calçada pública',
    'Obra sem tapume de proteção',
    'Construção em área de preservação',
    'Puxadinho obstruindo passagem',
    'Comércio irregular em área residencial'
  ],
  'calcada': [
    'Calçada completamente destruída',
    'Desnível perigoso para pedestres',
    'Sem rampa de acessibilidade',
    'Piso escorregadio causando quedas',
    'Calçada tomada por vendedores ambulantes'
  ]
};

// Função para gerar coordenadas próximas
function generateNearbyCoordinates(baseLat: number, baseLng: number, radiusKm: number = 5) {
  const radiusInDegrees = radiusKm / 111;
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.random() * radiusInDegrees;
  
  return {
    lat: baseLat + randomRadius * Math.cos(randomAngle),
    lng: baseLng + randomRadius * Math.sin(randomAngle)
  };
}

// Função para gerar data aleatória nos últimos 6 meses
function generateRandomDate() {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  const randomTime = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  return new Date(randomTime);
}

// Gerar 500+ reportes com distribuição ponderada
export function generateMockReports(): Report[] {
  const reports: Report[] = [];
  const userNames = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza', 'Beatriz Lima'];
  
  // Pesos por região (mais reportes em Ceilândia, Samambaia, etc)
  const regionWeights: Record<string, number> = {
    'ceilandia': 80,
    'samambaia': 70,
    'taguatinga': 60,
    'recanto-emas': 55,
    'planaltina': 50,
    'aguas-claras': 45,
    'sol-nascente': 65,
    'estrutural': 60,
    'santa-maria': 50,
    'gama': 45,
    'plano-piloto': 20,
    'lago-sul': 10,
    'lago-norte': 10,
    'asa-sul': 15,
    'asa-norte': 15
  };

  // Gerar reportes por região baseado nos pesos
  BRASILIA_REGIONS.forEach(region => {
    const weight = regionWeights[region.id] || 30;
    const numReports = Math.floor(weight * (0.8 + Math.random() * 0.4)); // Variação de ±20%

    for (let i = 0; i < numReports; i++) {
      const category = REPORT_CATEGORIES[Math.floor(Math.random() * REPORT_CATEGORIES.length)];
      const urgency = URGENCY_LEVELS[Math.floor(Math.random() * URGENCY_LEVELS.length)];
      const status = REPORT_STATUS[Math.floor(Math.random() * REPORT_STATUS.length)];
      const coords = generateNearbyCoordinates(region.coordinates.lat, region.coordinates.lng);
      const createdAt = generateRandomDate();
      
      const descriptions = DESCRIPTIONS_BY_CATEGORY[category.id] || ['Problema identificado necessitando atenção'];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];

      reports.push({
        id: `report-${reports.length + 1}`,
        userId: `user-${Math.floor(Math.random() * 10) + 1}`,
        userName: userNames[Math.floor(Math.random() * userNames.length)],
        categoryId: category.id,
        title: `${category.name} - ${region.name}`,
        description,
        location: {
          address: `Quadra ${Math.floor(Math.random() * 50) + 1}, ${region.name}`,
          regionId: region.id,
          coordinates: coords
        },
        urgency: urgency.id,
        status: status.id,
        imageUrl: SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)],
        createdAt,
        updatedAt: new Date(createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000),
        upvotes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20)
      });
    }
  });

  // Ordenar por data de criação (mais recentes primeiro)
  return reports.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// Exportar reportes mockados
export const MOCK_REPORTS = generateMockReports();