"use client";

import { URGENCY_LEVELS } from "@/lib/mock/categories";
import { cn } from "@/lib/utils";
import { AlertCircle, Clock } from "lucide-react";

interface UrgencySelectorProps {
  selectedUrgency: string;
  onUrgencySelect: (urgencyId: string) => void;
}

export function UrgencySelector({ selectedUrgency, onUrgencySelect }: UrgencySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Nível de Urgência
      </label>
      <div className="grid grid-cols-2 gap-3">
        {URGENCY_LEVELS.map((urgency) => (
          <button
            key={urgency.id}
            type="button"
            onClick={() => onUrgencySelect(urgency.id)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all",
              selectedUrgency === urgency.id
                ? "border-current bg-opacity-10"
                : "border-gray-200 hover:border-gray-300"
            )}
            style={{
              borderColor: selectedUrgency === urgency.id ? urgency.color : undefined,
              backgroundColor: selectedUrgency === urgency.id ? `${urgency.color}20` : undefined
            }}
          >
            <div className="text-center">
              <AlertCircle 
                className="h-6 w-6 mx-auto mb-2"
                style={{ color: urgency.color }}
              />
              <p className="font-medium text-sm">{urgency.name}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                {urgency.days} {urgency.days === 1 ? 'dia' : 'dias'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}