"use client";

import { useState, useEffect } from "react";
import { MOCK_REPORTS, Report } from "@/lib/mock/reports";
import { BRASILIA_REGIONS } from "@/lib/mock/regions";
import { REPORT_CATEGORIES } from "@/lib/mock/categories";
import { MapFilters } from "./MapFilters";
import { ReportPopup } from "./ReportPopup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Locate, Plus, Minus, Layers, Navigation } from "lucide-react";

export function BrasiliaMap() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState({ lat: -15.7975, lng: -47.8919 });
  const [filteredReports, setFilteredReports] = useState(MOCK_REPORTS);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [mapStyle, setMapStyle] = useState<'street' | 'satellite'>('street');

  // Simulated map bounds for Brasília
  const mapBounds = {
    north: -15.5,
    south: -16.1,
    east: -47.6,
    west: -48.3
  };

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
    setCenter({ lat: -15.7975, lng: -47.8919 });
    setZoom(12);
  };

  // Convert coordinates to pixel position
  const coordsToPixels = (lat: number, lng: number) => {
    const mapWidth = 800;
    const mapHeight = 600;
    
    const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * mapWidth;
    const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * mapHeight;
    
    // Apply zoom and center offset
    const zoomFactor = Math.pow(2, (zoom - 11) / 2);
    const centerX = mapWidth / 2;
    const centerY = mapHeight / 2;
    
    const offsetX = (center.lng - -47.8919) * 1000 * zoomFactor;
    const offsetY = (center.lat - -15.7975) * 1000 * zoomFactor;
    
    return {
      x: (x - centerX) * zoomFactor + centerX - offsetX,
      y: (y - centerY) * zoomFactor + centerY + offsetY
    };
  };

  // Group reports by proximity
  const getClusteredReports = () => {
    if (zoom < 12) {
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
      
      return Array.from(clusters.values()).filter(c => c.reports.length > 0);
    }
    
    return null;
  };

  const clusters = getClusteredReports();

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        {/* Base Map Layer */}
        <div className={`absolute inset-0 ${
          mapStyle === 'satellite' 
            ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900' 
            : 'bg-gradient-to-br from-green-50 via-gray-50 to-blue-50'
        }`}>
          {/* Simulated map grid */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Simulated roads and landmarks */}
          <div className="absolute inset-0">
            {/* Eixo Monumental */}
            <div 
              className={`absolute h-1 ${mapStyle === 'satellite' ? 'bg-gray-600' : 'bg-gray-300'}`}
              style={{
                width: '400px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
              }}
            />
            {/* Lago Paranoá outline */}
            <div 
              className={`absolute rounded-full ${mapStyle === 'satellite' ? 'bg-blue-900' : 'bg-blue-200'} opacity-50`}
              style={{
                width: '200px',
                height: '120px',
                right: '20%',
                top: '40%',
                transform: 'rotate(25deg)',
              }}
            />
          </div>
        </div>

        {/* Administrative Regions Layer */}
        <div className="absolute inset-0">
          {BRASILIA_REGIONS.map(region => {
            const pos = coordsToPixels(region.coordinates.lat, region.coordinates.lng);
            const isVisible = pos.x > -100 && pos.x < 900 && pos.y > -100 && pos.y < 700;
            
            if (!isVisible) return null;
            
            return (
              <div
                key={region.id}
                className="absolute text-xs font-medium pointer-events-none"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className={`px-2 py-1 rounded ${
                  mapStyle === 'satellite' 
                    ? 'bg-gray-800 text-gray-200' 
                    : 'bg-white text-gray-700'
                } shadow-sm opacity-80`}>
                  {region.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Heatmap Layer */}
        {showHeatmap && (
          <div className="absolute inset-0 pointer-events-none">
            {BRASILIA_REGIONS.map(region => {
              const regionReports = filteredReports.filter(r => r.location.regionId === region.id);
              const intensity = Math.min(regionReports.length / 20, 1);
              
              if (intensity > 0) {
                const pos = coordsToPixels(region.coordinates.lat, region.coordinates.lng);
                
                return (
                  <div
                    key={region.id}
                    className="absolute rounded-full blur-3xl"
                    style={{
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      transform: 'translate(-50%, -50%)',
                      width: `${100 + intensity * 150}px`,
                      height: `${100 + intensity * 150}px`,
                      background: `radial-gradient(circle, rgba(239, 68, 68, ${intensity * 0.6}) 0%, transparent 70%)`,
                    }}
                  />
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Markers Layer */}
        <div className="absolute inset-0">
          {!showHeatmap && (
            <>
              {clusters ? (
                // Show clusters
                clusters.map(cluster => {
                  const pos = coordsToPixels(
                    cluster.region.coordinates.lat, 
                    cluster.region.coordinates.lng
                  );
                  
                  if (pos.x < -50 || pos.x > 850 || pos.y < -50 || pos.y > 650) return null;
                  
                  const category = REPORT_CATEGORIES.find(c => 
                    c.id === cluster.reports[0]?.categoryId
                  );
                  
                  return (
                    <div
                      key={cluster.region.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                      }}
                      onClick={() => {
                        setCenter(cluster.region.coordinates);
                        setZoom(13);
                      }}
                    >
                      <div className="relative">
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-pulse"
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
                // Show individual markers
                filteredReports.slice(0, 100).map(report => {
                  const pos = coordsToPixels(
                    report.location.coordinates.lat,
                    report.location.coordinates.lng
                  );
                  
                  if (pos.x < -50 || pos.x > 850 || pos.y < -50 || pos.y > 650) return null;
                  
                  const category = REPORT_CATEGORIES.find(c => c.id === report.categoryId);
                  
                  return (
                    <div
                      key={report.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                      }}
                      onClick={() => setSelectedReport(report)}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
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
      </div>

      {/* Controls */}
      <MapFilters onFiltersChange={handleFiltersChange} />
      
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          className="bg-white shadow-md hover:shadow-lg"
          onClick={() => setZoom(Math.min(zoom + 1, 18))}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-white shadow-md hover:shadow-lg"
          onClick={() => setZoom(Math.max(zoom - 1, 10))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-white shadow-md hover:shadow-lg"
          onClick={handleCenterOnLocation}
        >
          <Locate className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="bg-white shadow-md hover:shadow-lg"
          onClick={() => setMapStyle(mapStyle === 'street' ? 'satellite' : 'street')}
        >
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Info */}
      <Card className="absolute bottom-4 left-4 p-3 bg-white/90 backdrop-blur-sm">
        <div className="text-sm space-y-1">
          <p className="font-semibold">Total de reportes: {filteredReports.length}</p>
          <p className="text-xs text-gray-600">Zoom: {zoom}x</p>
        </div>
      </Card>

      {/* Selected Report Popup */}
      {selectedReport && (
        <ReportPopup
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}