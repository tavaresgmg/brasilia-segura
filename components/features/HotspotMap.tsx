"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  AlertTriangle, 
  TrendingUp,
  Eye,
  Navigation
} from "lucide-react";
import { MOCK_HOTSPOT_ANALYSIS } from "@/lib/mock/predictions";
import { BRASILIA_REGIONS } from "@/lib/mock/regions";
import { useState } from "react";

export function HotspotMap() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const hotspots = MOCK_HOTSPOT_ANALYSIS;

  const getRiskColor = (score: number) => {
    if (score >= 80) return '#DC2626'; // red-600
    if (score >= 60) return '#EA580C'; // orange-600
    if (score >= 40) return '#F59E0B'; // yellow-600
    return '#10B981'; // green-600
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'Crítico';
    if (score >= 60) return 'Alto';
    if (score >= 40) return 'Médio';
    return 'Baixo';
  };

  return (
    <div className="space-y-6">
      {/* Map Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-600" />
            Mapa de Hotspots - Áreas de Risco
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Visual Mock Map */}
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-50" />
            
            {/* Hotspot Markers */}
            {hotspots.map((hotspot, index) => {
              const region = BRASILIA_REGIONS.find(r => r.id === hotspot.regionId);
              if (!region) return null;
              
              const isSelected = selectedHotspot === hotspot.regionId;
              const size = 20 + (hotspot.riskScore / 100) * 30;
              
              return (
                <div
                  key={hotspot.regionId}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: `${(index % 5) * 20 + 10}%`,
                    top: `${Math.floor(index / 5) * 25 + 10}%`,
                    transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.2)' : ''}`
                  }}
                  onClick={() => setSelectedHotspot(hotspot.regionId)}
                >
                  {/* Pulse Animation for Critical Areas */}
                  {hotspot.riskScore >= 80 && (
                    <div 
                      className="absolute rounded-full animate-ping"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: getRiskColor(hotspot.riskScore),
                        opacity: 0.3
                      }}
                    />
                  )}
                  
                  {/* Main Marker */}
                  <div
                    className="relative rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: getRiskColor(hotspot.riskScore)
                    }}
                  >
                    {hotspot.riskScore}
                  </div>
                  
                  {/* Region Label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow">
                      {region.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="text-sm">Crítico (80+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
              <span className="text-sm">Alto (60-79)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              <span className="text-sm">Médio (40-59)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <span className="text-sm">Baixo (&lt;40)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Hotspot Details */}
      {selectedHotspot && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle>
              Análise Detalhada - {BRASILIA_REGIONS.find(r => r.id === selectedHotspot)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const hotspot = hotspots.find(h => h.regionId === selectedHotspot);
              if (!hotspot) return null;
              
              return (
                <div className="space-y-4">
                  {/* Risk Score */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Score de Risco</p>
                      <p className="text-3xl font-bold" style={{ color: getRiskColor(hotspot.riskScore) }}>
                        {hotspot.riskScore}/100
                      </p>
                    </div>
                    <Badge 
                      variant="secondary"
                      className="text-lg px-4 py-2"
                      style={{ 
                        backgroundColor: getRiskColor(hotspot.riskScore) + '20',
                        color: getRiskColor(hotspot.riskScore)
                      }}
                    >
                      {getRiskLevel(hotspot.riskScore)}
                    </Badge>
                  </div>

                  {/* Main Issues */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Principais Problemas
                    </h4>
                    <div className="space-y-2">
                      {hotspot.mainIssues.map((issue, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Correlated Factors */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Fatores Correlacionados
                    </h4>
                    <div className="space-y-2">
                      {hotspot.correlatedFactors.map((factor, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-sm">{factor.factor}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${Math.abs(factor.correlation) * 100}%`,
                                  backgroundColor: factor.correlation > 0 ? '#DC2626' : '#10B981'
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium">
                              {(factor.correlation * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold mb-2">Recomendações</h4>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {hotspot.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-blue-600 mt-0.5">→</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="default">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Reportes da Região
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <Navigation className="h-4 w-4 mr-2" />
                      Criar Plano de Ação
                    </Button>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}