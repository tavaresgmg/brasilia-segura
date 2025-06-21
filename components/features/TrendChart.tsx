"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Info
} from "lucide-react";
import { MOCK_TREND_ANALYSIS } from "@/lib/mock/predictions";
import { REPORT_CATEGORIES } from "@/lib/mock/categories";

export function TrendChart() {
  const trends = MOCK_TREND_ANALYSIS;
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'crescente':
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'decrescente':
        return <TrendingDown className="h-4 w-4 text-green-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'crescente':
        return 'text-red-600 bg-red-50';
      case 'decrescente':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Análise de Tendências por Categoria</span>
          <Badge variant="secondary" className="font-normal">
            Próximos 6 meses
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trends.map(trend => {
            const category = REPORT_CATEGORIES.find(c => c.id === trend.categoryId);
            if (!category) return null;
            
            const maxValue = Math.max(...trend.projection);
            
            return (
              <div key={trend.categoryId} className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className={getTrendColor(trend.trend)}>
                          <span className="flex items-center gap-1">
                            {getTrendIcon(trend.trend)}
                            {trend.trend === 'crescente' ? 'Crescente' : 
                             trend.trend === 'decrescente' ? 'Decrescente' : 'Estável'}
                          </span>
                        </Badge>
                        <span className={`text-sm font-medium ${
                          trend.changePercentage > 0 ? 'text-red-600' : 
                          trend.changePercentage < 0 ? 'text-green-600' : 
                          'text-gray-600'
                        }`}>
                          {trend.changePercentage > 0 ? '+' : ''}{trend.changePercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Confiança</p>
                    <p className="font-semibold">{trend.confidence}%</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="relative">
                  <div className="flex items-end gap-1 h-20">
                    {trend.projection.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="relative w-full">
                          <div
                            className="w-full rounded-t transition-all duration-500 hover:opacity-80"
                            style={{
                              height: `${(value / maxValue) * 60}px`,
                              backgroundColor: category.color
                            }}
                          />
                          <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {months.map((month, i) => (
                      <span key={i} className="text-xs text-gray-500 flex-1 text-center">
                        {month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">Como interpretar as tendências:</p>
              <ul className="space-y-1 text-xs">
                <li>• <span className="font-medium">Crescente:</span> Aumento esperado de reportes - requer atenção preventiva</li>
                <li>• <span className="font-medium">Decrescente:</span> Redução esperada - ações estão sendo efetivas</li>
                <li>• <span className="font-medium">Estável:</span> Situação controlada - manter monitoramento</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}