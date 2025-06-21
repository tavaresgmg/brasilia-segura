"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_STATISTICS } from "@/lib/mock/statistics";

export function TimelineChart() {
  const data = MOCK_STATISTICS.reportsByMonth;
  const maxReports = Math.max(...data.map(d => d.reports));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Evolução Mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between gap-2">
          {data.map((month) => (
            <div key={`${month.month}-${month.year}`} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center gap-1">
                <span className="text-xs font-medium">
                  {month.reports}
                </span>
                <div className="relative w-full flex gap-1">
                  <div
                    className="flex-1 bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600"
                    style={{
                      height: `${(month.resolved / maxReports) * 200}px`,
                    }}
                    title={`Resolvidos: ${month.resolved}`}
                  />
                  <div
                    className="flex-1 bg-yellow-500 rounded-t transition-all duration-500 hover:bg-yellow-600"
                    style={{
                      height: `${((month.reports - month.resolved) / maxReports) * 200}px`,
                    }}
                    title={`Pendentes: ${month.reports - month.resolved}`}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                {month.month.slice(0, 3)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Resolvidos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Pendentes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}