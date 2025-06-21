export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin';
  regionId: string;
  points: number;
  level: string;
  badges: Badge[];
  reportsCount: number;
  resolvedCount: number;
  joinedAt: Date;
  avatarUrl: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export const BADGES = [
  {
    id: 'first-report',
    name: 'Primeiro Passo',
    description: 'Fez seu primeiro reporte',
    icon: '🎯'
  },
  {
    id: 'ten-reports',
    name: 'Cidadão Ativo',
    description: '10 reportes realizados',
    icon: '⭐'
  },
  {
    id: 'fifty-reports',
    name: 'Guardião da Cidade',
    description: '50 reportes realizados',
    icon: '🛡️'
  },
  {
    id: 'hundred-reports',
    name: 'Herói Urbano',
    description: '100 reportes realizados',
    icon: '🦸'
  },
  {
    id: 'lighting-expert',
    name: 'Especialista em Iluminação',
    description: '20 reportes de iluminação',
    icon: '💡'
  },
  {
    id: 'clean-city',
    name: 'Cidade Limpa',
    description: '20 reportes de lixo',
    icon: '🧹'
  },
  {
    id: 'road-warrior',
    name: 'Guerreiro das Vias',
    description: '20 reportes de buracos',
    icon: '🛣️'
  },
  {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Reportou antes das 6h',
    icon: '🌅'
  },
  {
    id: 'night-owl',
    name: 'Coruja Noturna',
    description: 'Reportou após 22h',
    icon: '🦉'
  },
  {
    id: 'streak-week',
    name: 'Semana Completa',
    description: 'Reportou 7 dias seguidos',
    icon: '📅'
  },
  {
    id: 'community-leader',
    name: 'Líder Comunitário',
    description: 'Mais upvotes recebidos',
    icon: '👑'
  },
  {
    id: 'photo-master',
    name: 'Mestre da Fotografia',
    description: 'Fotos de alta qualidade',
    icon: '📸'
  }
];

// Avatares de exemplo
const AVATAR_URLS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=João',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda'
];

// Função para calcular nível baseado em pontos
function calculateLevel(points: number): string {
  if (points >= 1000) return 'Diamante';
  if (points >= 500) return 'Ouro';
  if (points >= 200) return 'Prata';
  if (points >= 50) return 'Bronze';
  return 'Iniciante';
}

// Função para gerar badges baseado em reportes
function generateBadges(reportsCount: number, joinedAt: Date): Badge[] {
  const userBadges: Badge[] = [];
  
  if (reportsCount >= 1) {
    userBadges.push({
      ...BADGES[0],
      unlockedAt: new Date(joinedAt.getTime() + 2 * 24 * 60 * 60 * 1000)
    });
  }
  
  if (reportsCount >= 10) {
    userBadges.push({
      ...BADGES[1],
      unlockedAt: new Date(joinedAt.getTime() + 30 * 24 * 60 * 60 * 1000)
    });
  }
  
  if (reportsCount >= 50) {
    userBadges.push({
      ...BADGES[2],
      unlockedAt: new Date(joinedAt.getTime() + 90 * 24 * 60 * 60 * 1000)
    });
  }
  
  // Adicionar badges aleatórios
  if (Math.random() > 0.5) {
    userBadges.push({
      ...BADGES[4], // Especialista em iluminação
      unlockedAt: new Date(joinedAt.getTime() + 45 * 24 * 60 * 60 * 1000)
    });
  }
  
  if (Math.random() > 0.7) {
    userBadges.push({
      ...BADGES[7], // Madrugador
      unlockedAt: new Date(joinedAt.getTime() + 15 * 24 * 60 * 60 * 1000)
    });
  }
  
  return userBadges;
}

// Gerar usuários mockados
export function generateMockUsers(): MockUser[] {
  const users: MockUser[] = [];
  const regions = ['ceilandia', 'samambaia', 'taguatinga', 'plano-piloto', 'aguas-claras', 'guara', 'gama', 'asa-sul', 'asa-norte', 'lago-sul'];
  
  const userData = [
    { name: 'João Silva', email: 'joao@gmail.com', reports: 45, resolved: 38 },
    { name: 'Maria Santos', email: 'maria@hotmail.com', reports: 78, resolved: 62 },
    { name: 'Pedro Oliveira', email: 'pedro@yahoo.com', reports: 23, resolved: 18 },
    { name: 'Ana Costa', email: 'ana@gmail.com', reports: 156, resolved: 134 },
    { name: 'Carlos Souza', email: 'carlos@outlook.com', reports: 92, resolved: 78 },
    { name: 'Beatriz Lima', email: 'bia@gmail.com', reports: 34, resolved: 28 },
    { name: 'Lucas Ferreira', email: 'lucas@gmail.com', reports: 67, resolved: 55 },
    { name: 'Julia Martins', email: 'julia@hotmail.com', reports: 12, resolved: 8 },
    { name: 'Rafael Alves', email: 'rafael@gmail.com', reports: 203, resolved: 187 },
    { name: 'Fernanda Rocha', email: 'fernanda@yahoo.com', reports: 89, resolved: 72 }
  ];
  
  userData.forEach((data, index) => {
    const joinedAt = new Date(Date.now() - (180 - index * 15) * 24 * 60 * 60 * 1000);
    const points = data.reports * 10 + data.resolved * 5;
    
    users.push({
      id: `user-${index + 1}`,
      name: data.name,
      email: data.email,
      role: 'citizen',
      regionId: regions[index % regions.length],
      points,
      level: calculateLevel(points),
      badges: generateBadges(data.reports, joinedAt),
      reportsCount: data.reports,
      resolvedCount: data.resolved,
      joinedAt,
      avatarUrl: AVATAR_URLS[index]
    });
  });
  
  // Adicionar o admin
  users.push({
    id: 'admin-1',
    name: 'Administrador Sistema',
    email: 'admin@brasilia.gov.br',
    role: 'admin',
    regionId: 'plano-piloto',
    points: 0,
    level: 'Admin',
    badges: [],
    reportsCount: 0,
    resolvedCount: 523,
    joinedAt: new Date('2024-01-01'),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  });
  
  return users;
}

export const MOCK_USERS = generateMockUsers();