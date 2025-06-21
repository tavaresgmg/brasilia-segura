"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  AlertCircle,
  Users,
  MapPin,
  Calendar
} from "lucide-react";
import { MOCK_STATISTICS } from "@/lib/mock/statistics";

export function AdminMetrics() {
  const stats = MOCK_STATISTICS;
  
  const metrics = [
    {
      title: "Total de Reportes",
      value: stats.totalReports.toLocaleString('pt-BR'),
      change: "+12%",
      changeType: "positive",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Resolvidos",
      value: stats.resolvedReports.toLocaleString('pt-BR'),
      change: `${stats.resolutionRate.toFixed(1)}%`,
      changeType: "neutral",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pendentes",
      value: stats.pendingReports.toLocaleString('pt-BR'),
      change: "-8%",
      changeType: "positive",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Tempo Médio",
      value: `${stats.averageResolutionTime} dias`,
      change: "-2 dias",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const additionalMetrics = [
    {
      title: "Áreas Críticas",
      value: stats.criticalAreas.length,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Contribuidores Ativos",
      value: stats.topContributors.length,
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Regiões Afetadas",
      value: stats.reportsByRegion.filter(r => r.count > 0).length,
      icon: MapPin,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
    {
      title: "Novos Hoje",
      value: Math.floor(Math.random() * 50) + 20,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs mt-1 ${
                metric.changeType === 'positive' ? 'text-green-600' : 
                metric.changeType === 'negative' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {metric.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {additionalMetrics.map((metric) => (
          <Card key={metric.title} className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-xl font-semibold mt-1">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-full ${metric.bgColor}`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}