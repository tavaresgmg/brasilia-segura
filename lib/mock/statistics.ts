import { MOCK_REPORTS } from './reports';
import { BRASILIA_REGIONS } from './regions';
import { REPORT_CATEGORIES, REPORT_STATUS } from './categories';

export interface Statistics {
  totalReports: number;
  resolvedReports: number;
  pendingReports: number;
  averageResolutionTime: number;
  reportsByCategory: CategoryStat[];
  reportsByRegion: RegionStat[];
  reportsByMonth: MonthlyStat[];
  topContributors: ContributorStat[];
  resolutionRate: number;
  criticalAreas: CriticalArea[];
}

export interface CategoryStat {
  categoryId: string;
  categoryName: string;
  count: number;
  percentage: number;
  resolved: number;
  icon: string;
  color: string;
}

export interface RegionStat {
  regionId: string;
  regionName: string;
  count: number;
  resolved: number;
  pending: number;
  critical: number;
  coordinates: { lat: number; lng: number };
}

export interface MonthlyStat {
  month: string;
  year: number;
  reports: number;
  resolved: number;
}

export interface ContributorStat {
  userId: string;
  name: string;
  reports: number;
  points: number;
  avatarUrl: string;
}

export interface CriticalArea {
  regionId: string;
  regionName: string;
  criticalCount: number;
  mainIssue: string;
  coordinates: { lat: number; lng: number };
}

// Função para gerar estatísticas baseadas nos dados mockados
export function generateStatistics(): Statistics {
  const total = MOCK_REPORTS.length;
  const resolved = MOCK_REPORTS.filter(r => r.status === 'resolvido').length;
  const pending = MOCK_REPORTS.filter(r => r.status === 'pendente' || r.status === 'em-analise').length;
  
  // Estatísticas por categoria
  const categoryStats: CategoryStat[] = REPORT_CATEGORIES.map(category => {
    const categoryReports = MOCK_REPORTS.filter(r => r.categoryId === category.id);
    const resolvedCount = categoryReports.filter(r => r.status === 'resolvido').length;
    
    return {
      categoryId: category.id,
      categoryName: category.name,
      count: categoryReports.length,
      percentage: (categoryReports.length / total) * 100,
      resolved: resolvedCount,
      icon: category.icon,
      color: category.color
    };
  }).sort((a, b) => b.count - a.count);
  
  // Estatísticas por região
  const regionStats: RegionStat[] = BRASILIA_REGIONS.map(region => {
    const regionReports = MOCK_REPORTS.filter(r => r.location.regionId === region.id);
    const resolvedCount = regionReports.filter(r => r.status === 'resolvido').length;
    const pendingCount = regionReports.filter(r => r.status === 'pendente' || r.status === 'em-analise').length;
    const criticalCount = regionReports.filter(r => r.urgency === 'critica').length;
    
    return {
      regionId: region.id,
      regionName: region.name,
      count: regionReports.length,
      resolved: resolvedCount,
      pending: pendingCount,
      critical: criticalCount,
      coordinates: region.coordinates
    };
  }).sort((a, b) => b.count - a.count);
  
  // Estatísticas mensais (últimos 6 meses)
  const monthlyStats: MonthlyStat[] = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.toLocaleString('pt-BR', { month: 'long' });
    const year = date.getFullYear();
    
    const monthReports = MOCK_REPORTS.filter(r => {
      const reportDate = new Date(r.createdAt);
      return reportDate.getMonth() === date.getMonth() && 
             reportDate.getFullYear() === date.getFullYear();
    });
    
    const monthResolved = monthReports.filter(r => r.status === 'resolvido').length;
    
    monthlyStats.push({
      month: month.charAt(0).toUpperCase() + month.slice(1),
      year,
      reports: monthReports.length,
      resolved: monthResolved
    });
  }
  
  // Top contribuidores
  const userReports = new Map<string, { name: string; count: number }>();
  MOCK_REPORTS.forEach(report => {
    const current = userReports.get(report.userId) || { name: report.userName, count: 0 };
    current.count++;
    userReports.set(report.userId, current);
  });
  
  const topContributors: ContributorStat[] = Array.from(userReports.entries())
    .map(([userId, data]) => ({
      userId,
      name: data.name,
      reports: data.count,
      points: data.count * 10,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
    }))
    .sort((a, b) => b.reports - a.reports)
    .slice(0, 10);
  
  // Áreas críticas
  const criticalAreas: CriticalArea[] = regionStats
    .filter(r => r.critical > 5)
    .map(r => {
      const regionReports = MOCK_REPORTS.filter(rep => rep.location.regionId === r.regionId);
      const categoryCounts = new Map<string, number>();
      
      regionReports.forEach(report => {
        categoryCounts.set(report.categoryId, (categoryCounts.get(report.categoryId) || 0) + 1);
      });
      
      const mainIssueId = Array.from(categoryCounts.entries())
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'iluminacao';
      
      const mainIssue = REPORT_CATEGORIES.find(c => c.id === mainIssueId)?.name || 'Problemas diversos';
      
      return {
        regionId: r.regionId,
        regionName: r.regionName,
        criticalCount: r.critical,
        mainIssue,
        coordinates: r.coordinates
      };
    })
    .slice(0, 5);
  
  // Tempo médio de resolução (em dias) - mockado
  const averageResolutionTime = 12.5;
  
  return {
    totalReports: total,
    resolvedReports: resolved,
    pendingReports: pending,
    averageResolutionTime,
    reportsByCategory: categoryStats,
    reportsByRegion: regionStats,
    reportsByMonth: monthlyStats,
    topContributors,
    resolutionRate: (resolved / total) * 100,
    criticalAreas
  };
}

export const MOCK_STATISTICS = generateStatistics();