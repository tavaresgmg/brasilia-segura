"use client";

import { Report } from "@/lib/mock/reports";
import { REPORT_CATEGORIES, REPORT_STATUS, URGENCY_LEVELS } from "@/lib/mock/categories";
import { BRASILIA_REGIONS } from "@/lib/mock/regions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, AlertCircle, ThumbsUp, MessageSquare, X } from "lucide-react";

interface ReportPopupProps {
  report: Report;
  onClose: () => void;
}

export function ReportPopup({ report, onClose }: ReportPopupProps) {
  const category = REPORT_CATEGORIES.find(c => c.id === report.categoryId);
  const status = REPORT_STATUS.find(s => s.id === report.status);
  const urgency = URGENCY_LEVELS.find(u => u.id === report.urgency);
  const region = BRASILIA_REGIONS.find(r => r.id === report.location.regionId);
  
  const createdDate = new Date(report.createdAt);
  const timeAgo = getTimeAgo(createdDate);

  function getTimeAgo(date: Date) {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Há menos de 1 hora";
    if (diffInHours < 24) return `Há ${diffInHours} horas`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Há 1 dia";
    if (diffInDays < 30) return `Há ${diffInDays} dias`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) return "Há 1 mês";
    return `Há ${diffInMonths} meses`;
  }

  return (
    <Card className="w-80 shadow-xl">
      <div className="relative">
        <img
          src={report.imageUrl}
          alt={report.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        {status && (
          <div 
            className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-white text-xs font-medium"
            style={{ backgroundColor: status.color }}
          >
            {status.name}
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <div className="flex items-start gap-2">
            {category && (
              <span className="text-2xl">{category.icon}</span>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{report.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{report.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>{report.location.address}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{timeAgo}</span>
          </div>
          
          {urgency && (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-3 w-3" style={{ color: urgency.color }} />
              <span>Urgência: {urgency.name}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              {report.upvotes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {report.comments}
            </span>
          </div>
          
          <p className="text-xs text-gray-500">
            Por {report.userName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}