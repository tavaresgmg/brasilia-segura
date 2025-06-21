"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { REPORT_CATEGORIES, REPORT_STATUS, URGENCY_LEVELS } from "@/lib/mock/categories";
import { Filter, X, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapFiltersProps {
  onFiltersChange: (filters: {
    categories: string[];
    status: string[];
    urgency: string[];
    showHeatmap: boolean;
  }) => void;
}

export function MapFilters({ onFiltersChange }: MapFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedUrgency, setSelectedUrgency] = useState<string[]>([]);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const activeFiltersCount = 
    selectedCategories.length + 
    selectedStatus.length + 
    selectedUrgency.length +
    (showHeatmap ? 1 : 0);

  const handleCategoryToggle = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updated);
    updateFilters(updated, selectedStatus, selectedUrgency, showHeatmap);
  };

  const handleStatusToggle = (statusId: string) => {
    const updated = selectedStatus.includes(statusId)
      ? selectedStatus.filter(id => id !== statusId)
      : [...selectedStatus, statusId];
    setSelectedStatus(updated);
    updateFilters(selectedCategories, updated, selectedUrgency, showHeatmap);
  };

  const handleUrgencyToggle = (urgencyId: string) => {
    const updated = selectedUrgency.includes(urgencyId)
      ? selectedUrgency.filter(id => id !== urgencyId)
      : [...selectedUrgency, urgencyId];
    setSelectedUrgency(updated);
    updateFilters(selectedCategories, selectedStatus, updated, showHeatmap);
  };

  const handleHeatmapToggle = () => {
    const updated = !showHeatmap;
    setShowHeatmap(updated);
    updateFilters(selectedCategories, selectedStatus, selectedUrgency, updated);
  };

  const updateFilters = (
    categories: string[], 
    status: string[], 
    urgency: string[],
    heatmap: boolean
  ) => {
    onFiltersChange({ categories, status, urgency, showHeatmap: heatmap });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatus([]);
    setSelectedUrgency([]);
    setShowHeatmap(false);
    onFiltersChange({ categories: [], status: [], urgency: [], showHeatmap: false });
  };

  return (
    <>
      {/* Filter Button */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          onClick={handleHeatmapToggle}
          variant={showHeatmap ? "default" : "outline"}
          size="icon"
          className="bg-white shadow-md"
        >
          <Layers className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="bg-white shadow-md relative"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <Card className="absolute top-20 right-4 z-20 w-80 max-h-[80vh] overflow-y-auto shadow-xl">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filtros</h3>
              <div className="flex gap-2">
                {activeFiltersCount > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={clearFilters}
                  >
                    Limpar
                  </Button>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Categorias</h4>
              <div className="space-y-2">
                {REPORT_CATEGORIES.map(category => (
                  <label
                    key={category.id}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="h-4 w-4 text-green-600 rounded border-gray-300"
                    />
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-3 mt-6">
              <h4 className="text-sm font-medium text-gray-700">Status</h4>
              <div className="space-y-2">
                {REPORT_STATUS.map(status => (
                  <label
                    key={status.id}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(status.id)}
                      onChange={() => handleStatusToggle(status.id)}
                      className="h-4 w-4 text-green-600 rounded border-gray-300"
                    />
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                    <span className="text-sm">{status.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="space-y-3 mt-6">
              <h4 className="text-sm font-medium text-gray-700">Urgência</h4>
              <div className="space-y-2">
                {URGENCY_LEVELS.map(urgency => (
                  <label
                    key={urgency.id}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUrgency.includes(urgency.id)}
                      onChange={() => handleUrgencyToggle(urgency.id)}
                      className="h-4 w-4 text-green-600 rounded border-gray-300"
                    />
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: urgency.color }}
                    />
                    <span className="text-sm">{urgency.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Heatmap Toggle */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={handleHeatmapToggle}
                  className="h-4 w-4 text-green-600 rounded border-gray-300"
                />
                <div>
                  <p className="text-sm font-medium">Mapa de Calor</p>
                  <p className="text-xs text-gray-500">
                    Visualizar densidade de problemas
                  </p>
                </div>
              </label>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}