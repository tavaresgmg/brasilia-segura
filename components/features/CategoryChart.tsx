"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_STATISTICS } from "@/lib/mock/statistics";

export function CategoryChart() {
  const data = MOCK_STATISTICS.reportsByCategory.slice(0, 6);
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Reportes por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((category) => (
            <div key={category.categoryId}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.categoryName}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {category.count} ({category.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(category.count / maxCount) * 100}%`,
                    backgroundColor: category.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}