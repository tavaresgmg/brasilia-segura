"use client";

import { AdminMetrics } from "@/components/features/AdminMetrics";
import { CategoryChart } from "@/components/features/CategoryChart";
import { TimelineChart } from "@/components/features/TimelineChart";
import { RegionChart } from "@/components/features/RegionChart";
import { ReportsTable } from "@/components/features/ReportsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  RefreshCw, 
  Settings,
  Bell,
  Filter
} from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
              <p className="text-sm text-gray-600 mt-1">
                Acompanhe os reportes e métricas de Brasília Segura
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notificações</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Configurações</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Metrics */}
        <AdminMetrics />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TimelineChart />
          </div>
          <div>
            <CategoryChart />
          </div>
        </div>

        {/* Region Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ReportsTable />
          </div>
          <div>
            <RegionChart />
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start gap-2">
                <Download className="h-4 w-4" />
                Exportar Relatório Completo
              </Button>
              <Button variant="outline" className="justify-start gap-2">
                <Bell className="h-4 w-4" />
                Configurar Alertas
              </Button>
              <Button variant="outline" className="justify-start gap-2">
                <Settings className="h-4 w-4" />
                Gerenciar Categorias
              </Button>
              <Button variant="outline" className="justify-start gap-2">
                <RefreshCw className="h-4 w-4" />
                Sincronizar Dados
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}