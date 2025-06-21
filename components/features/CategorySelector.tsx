"use client";

import { REPORT_CATEGORIES } from "@/lib/mock/categories";
import { cn } from "@/lib/utils";

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export function CategorySelector({ selectedCategory, onCategorySelect }: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Tipo de Problema
      </label>
      <div className="grid grid-cols-2 gap-3">
        {REPORT_CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySelect(category.id)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all text-left",
              selectedCategory === category.id
                ? "border-green-600 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-sm">{category.name}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}