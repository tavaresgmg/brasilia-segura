"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  MapPin,
  TrendingUp,
  Users,
  Camera,
  Map
} from "lucide-react";
import Link from "next/link";
import { MOCK_REPORTS } from "@/lib/mock/reports";
import { REPORT_CATEGORIES } from "@/lib/mock/categories";
import { BRASILIA_REGIONS } from "@/lib/mock/regions";

export default function HomePage() {
  // Calculate statistics
  const totalReports = MOCK_REPORTS.length;
  const pendingReports = MOCK_REPORTS.filter(r => r.status === 'pendente').length;
  const resolvedReports = MOCK_REPORTS.filter(r => r.status === 'resolvido').length;
  const inProgressReports = MOCK_REPORTS.filter(r => r.status === 'em-andamento').length;
  
  // Get top categories
  const categoryCount = MOCK_REPORTS.reduce((acc, report) => {
    acc[report.categoryId] = (acc[report.categoryId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategories = Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([categoryId, count]) => ({
      category: REPORT_CATEGORIES.find(c => c.id === categoryId),
      count
    }));

  // Recent reports
  const recentReports = [...MOCK_REPORTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 -mx-4 -mt-4">
        <h1 className="text-2xl font-bold mb-2">Olá, Cidadão!</h1>
        <p className="text-green-100">
          Juntos fazemos Brasília mais segura
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/report">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Camera className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Reportar</h3>
              <p className="text-sm text-green-600 mt-1">Novo problema</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/map">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <Map className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">Ver Mapa</h3>
              <p className="text-sm text-blue-600 mt-1">Todos reportes</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estatísticas Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">{totalReports}</p>
              <p className="text-sm text-gray-600">Total de Reportes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{resolvedReports}</p>
              <p className="text-sm text-gray-600">Resolvidos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{pendingReports}</p>
              <p className="text-sm text-gray-600">Pendentes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{inProgressReports}</p>
              <p className="text-sm text-gray-600">Em Andamento</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Categorias Mais Reportadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCategories.map(({ category, count }) => (
              <div key={category?.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category?.icon}</span>
                  <span className="font-medium">{category?.name}</span>
                </div>
                <span className="text-sm text-gray-600">{count} reportes</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Reportes Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => {
              const category = REPORT_CATEGORIES.find(c => c.id === report.categoryId);
              const region = BRASILIA_REGIONS.find(r => r.id === report.location.regionId);
              
              return (
                <div key={report.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <span className="text-2xl mt-1">{category?.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{report.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {region?.name} • {new Date(report.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    {report.status === 'resolvido' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {report.status === 'pendente' && (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    )}
                    {report.status === 'em-andamento' && (
                      <Clock className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}