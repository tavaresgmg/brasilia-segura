"use client";

import { useState, useEffect } from "react";
import { MOCK_REPORTS, Report } from "@/lib/mock/reports";
import { BRASILIA_REGIONS } from "@/lib/mock/regions";
import { REPORT_CATEGORIES } from "@/lib/mock/categories";
import { MapFilters } from "./MapFilters";
import { ReportPopup } from "./ReportPopup";
import { Button } from "@/components/ui/button";
import { Locate, Plus, Minus } from "lucide-react";

export function MockMap() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState({ lat: -15.7975, lng: -47.8919 });
  const [filteredReports, setFilteredReports] = useState(MOCK_REPORTS);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const handleFiltersChange = (filters: {
    categories: string[];
    status: string[];
    urgency: string[];
    showHeatmap: boolean;
  }) => {
    setShowHeatmap(filters.showHeatmap);
    
    let filtered = MOCK_REPORTS;
    
    if (filters.categories.length > 0) {
      filtered = filtered.filter(r => filters.categories.includes(r.categoryId));
    }
    
    if (filters.status.length > 0) {
      filtered = filtered.filter(r => filters.status.includes(r.status));
    }
    
    if (filters.urgency.length > 0) {
      filtered = filtered.filter(r => filters.urgency.includes(r.urgency));
    }
    
    setFilteredReports(filtered);
  };

  const handleCenterOnLocation = () => {
    // Simular centralização na localização atual (Plano Piloto)
    setCenter({ lat: -15.7975, lng: -47.8919 });
    setZoom(13);
  };

  // Agrupar reportes por proximidade para simular clustering
  const getClusteredReports = () => {
    if (zoom < 12) {
      // Agrupar por região quando zoom baixo
      const clusters = new Map<string, { region: any; reports: Report[] }>();
      
      filteredReports.forEach(report => {
        const region = BRASILIA_REGIONS.find(r => r.id === report.location.regionId);
        if (region) {
          if (!clusters.has(region.id)) {
            clusters.set(region.id, { region, reports: [] });
          }
          clusters.get(region.id)!.reports.push(report);
        }
      });
      
      return Array.from(clusters.values());
    }
    
    return null;
  };

  const clusters = getClusteredReports();

  return (
    <div className="relative h-full w-full min-h-[500px] bg-gray-200">
      {/* Mapa simulado visual */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-gray-100 to-blue-50" />

      {/* Overlay de heatmap simulado */}
      {showHeatmap && (
        <div className="absolute inset-0 pointer-events-none">
          {BRASILIA_REGIONS.map(region => {
            const regionReports = filteredReports.filter(r => r.location.regionId === region.id);
            const intensity = Math.min(regionReports.length / 20, 1);
            
            if (intensity > 0) {
              return (
                <div
                  key={region.id}
                  className="absolute rounded-full blur-3xl"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${(region.coordinates.lng - center.lng) * 100}px, ${(center.lat - region.coordinates.lat) * 100}px)`,
                    width: `${100 + intensity * 100}px`,
                    height: `${100 + intensity * 100}px`,
                    background: `radial-gradient(circle, rgba(239, 68, 68, ${intensity * 0.6}) 0%, transparent 70%)`,
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Marcadores */}
      <div className="absolute inset-0">
        {!showHeatmap && (
          <>
            {clusters ? (
              // Mostrar clusters
              clusters.map(cluster => {
                const category = REPORT_CATEGORIES.find(c => 
                  c.id === cluster.reports[0]?.categoryId
                );
                
                return (
                  <div
                    key={cluster.region.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${(cluster.region.coordinates.lng - center.lng) * 300}px, ${(center.lat - cluster.region.coordinates.lat) * 300}px)`,
                    }}
                    onClick={() => {
                      setCenter(cluster.region.coordinates);
                      setZoom(13);
                    }}
                  >
                    <div className="relative">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                        style={{ backgroundColor: category?.color || '#22c55e' }}
                      >
                        {cluster.reports.length}
                      </div>
                      <p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap bg-white px-2 py-1 rounded shadow">
                        {cluster.region.name}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              // Mostrar marcadores individuais
              filteredReports.slice(0, 50).map(report => {
                const category = REPORT_CATEGORIES.find(c => c.id === report.categoryId);
                
                return (
                  <div
                    key={report.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${(report.location.coordinates.lng - center.lng) * 300 * (zoom / 11)}px, ${(center.lat - report.location.coordinates.lat) * 300 * (zoom / 11)}px)`,
                    }}
                    onClick={() => setSelectedReport(report)}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform"
                      style={{ backgroundColor: category?.color || '#22c55e' }}
                    >
                      <span className="text-xl">{category?.icon}</span>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>

      {/* Controles */}
      <MapFilters onFiltersChange={handleFiltersChange} />
      
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          className="bg-white shadow-md"
          onClick={() => setZoom(Math.min(zoom + 1, 18))}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-white shadow-md"
          onClick={() => setZoom(Math.max(zoom - 1, 10))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-white shadow-md"
          onClick={handleCenterOnLocation}
        >
          <Locate className="h-4 w-4" />
        </Button>
      </div>

      {/* Popup de reporte selecionado */}
      {selectedReport && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <ReportPopup
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
          />
        </div>
      )}

      {/* Legenda */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
        <p className="text-xs font-medium mb-2">Total de reportes: {filteredReports.length}</p>
        {showHeatmap && (
          <p className="text-xs text-gray-500">
            Áreas mais vermelhas indicam maior concentração de problemas
          </p>
        )}
      </div>
    </div>
  );
}