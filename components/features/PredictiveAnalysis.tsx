"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Shield,
  Activity,
  Target,
  Zap,
  Info
} from "lucide-react";
import { MOCK_PREDICTIONS, AI_STATISTICS } from "@/lib/mock/predictions";
import { BRASILIA_REGIONS } from "@/lib/mock/regions";
import { REPORT_CATEGORIES } from "@/lib/mock/categories";
import { useState } from "react";

export function PredictiveAnalysis() {
  const [selectedView, setSelectedView] = useState<'predictions' | 'metrics'>('predictions');
  const topPredictions = MOCK_PREDICTIONS.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Análise Preditiva com IA
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Previsões baseadas em padrões históricos e machine learning
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedView === 'predictions' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('predictions')}
          >
            Predições
          </Button>
          <Button
            variant={selectedView === 'metrics' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('metrics')}
          >
            Métricas IA
          </Button>
        </div>
      </div>

      {selectedView === 'metrics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Acurácia do Modelo</p>
                  <p className="text-2xl font-bold text-green-600">
                    {AI_STATISTICS.highAccuracy}%
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Incidentes Prevenidos</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {AI_STATISTICS.preventedIncidents}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Economia Gerada</p>
                  <p className="text-2xl font-bold text-purple-600">
                    R$ {(AI_STATISTICS.economicSavings / 1000000).toFixed(1)}M
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tempo de Resposta</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {AI_STATISTICS.averageResponseTime}s
                  </p>
                </div>
                <Zap className="h-8 w-8 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === 'predictions' && (
        <>
          {/* Critical Alerts */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Alertas Críticos - Próximos 7 dias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPredictions.filter(p => p.riskLevel === 'crítico').slice(0, 3).map(prediction => {
                  const region = BRASILIA_REGIONS.find(r => r.id === prediction.regionId);
                  const category = REPORT_CATEGORIES.find(c => c.id === prediction.categoryId);
                  
                  return (
                    <div key={prediction.id} className="bg-white rounded-lg p-4 border border-red-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{category?.icon}</span>
                            <div>
                              <h4 className="font-semibold">{category?.name} em {region?.name}</h4>
                              <p className="text-sm text-gray-600">
                                Probabilidade: {prediction.probability}% • 
                                Impacto: ~{prediction.estimatedImpact.affected.toLocaleString()} pessoas
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700 mb-1">Fatores de Risco:</p>
                            <div className="flex flex-wrap gap-1">
                              {prediction.factors.map((factor, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {factor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="destructive">
                          Ação Urgente
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* High Risk Predictions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-600" />
                Predições de Alto Risco
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPredictions.filter(p => p.riskLevel === 'alto').slice(0, 5).map(prediction => {
                  const region = BRASILIA_REGIONS.find(r => r.id === prediction.regionId);
                  const category = REPORT_CATEGORIES.find(c => c.id === prediction.categoryId);
                  const predictedDate = new Date(prediction.predictedDate);
                  
                  return (
                    <div key={prediction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{category?.icon}</span>
                          <div>
                            <h4 className="font-medium">{category?.name}</h4>
                            <p className="text-sm text-gray-600">{region?.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            {prediction.probability}% probabilidade
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {predictedDate.toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm font-medium text-gray-700 mb-2">Ações Preventivas Recomendadas:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {prediction.preventiveActions.map((action, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Model Info */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Info className="h-5 w-5" />
                Sobre o Modelo de IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-purple-700">Última Atualização</p>
                  <p className="text-gray-700">
                    {new Date(AI_STATISTICS.modelLastUpdate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-purple-700">Pontos de Dados</p>
                  <p className="text-gray-700">
                    {AI_STATISTICS.dataPoints.toLocaleString()} analisados
                  </p>
                </div>
                <div>
                  <p className="font-medium text-purple-700">Predições Ativas</p>
                  <p className="text-gray-700">
                    {AI_STATISTICS.totalPredictions} em monitoramento
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}