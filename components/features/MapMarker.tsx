"use client";

import { REPORT_CATEGORIES } from "@/lib/mock/categories";

interface MapMarkerProps {
  categoryId: string;
  size?: number;
}

export function MapMarker({ categoryId, size = 40 }: MapMarkerProps) {
  const category = REPORT_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return null;

  return (
    <div 
      className="flex items-center justify-center rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"
      style={{
        width: size,
        height: size,
        backgroundColor: category.color,
      }}
    >
      <span style={{ fontSize: size * 0.5 }}>
        {category.icon}
      </span>
    </div>
  );
}