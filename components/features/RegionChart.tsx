"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_STATISTICS } from "@/lib/mock/statistics";
import { AlertCircle } from "lucide-react";

export function RegionChart() {
  const data = MOCK_STATISTICS.reportsByRegion.slice(0, 10);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top 10 Regiões com Mais Reportes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((region, index) => (
            <div key={region.regionId} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 w-6">
                {index + 1}º
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{region.regionName}</span>
                    {region.critical > 5 && (
                      <AlertCircle className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{region.count}</span>
                </div>
                <div className="flex gap-1">
                  <div 
                    className="h-2 bg-green-500 rounded"
                    style={{ width: `${(region.resolved / region.count) * 100}%` }}
                    title={`Resolvidos: ${region.resolved}`}
                  />
                  <div 
                    className="h-2 bg-yellow-500 rounded"
                    style={{ width: `${(region.pending / region.count) * 100}%` }}
                    title={`Pendentes: ${region.pending}`}
                  />
                  {region.critical > 0 && (
                    <div 
                      className="h-2 bg-red-500 rounded"
                      style={{ width: `${(region.critical / region.count) * 100}%` }}
                      title={`Críticos: ${region.critical}`}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}