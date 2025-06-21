"use client";

import { PredictiveAnalysis } from "@/components/features/PredictiveAnalysis";
import { HotspotMap } from "@/components/features/HotspotMap";
import { TrendChart } from "@/components/features/TrendChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Map, 
  TrendingUp,
  BarChart3
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Analytics & IA</h1>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Análises avançadas com inteligência artificial para prevenção de problemas urbanos
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="predictions" className="gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Predições</span>
            </TabsTrigger>
            <TabsTrigger value="hotspots" className="gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Hotspots</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Tendências</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <PredictiveAnalysis />
          </TabsContent>

          <TabsContent value="hotspots" className="space-y-6">
            <HotspotMap />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <TrendChart />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}