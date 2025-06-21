"use client";

import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoCaptureProps {
  onPhotoCapture: (photoUrl: string) => void;
  currentPhoto?: string;
}

export function PhotoCapture({ onPhotoCapture, currentPhoto }: PhotoCaptureProps) {
  const [preview, setPreview] = useState<string>(currentPhoto || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simular compressão - na vida real usaríamos uma lib como compressorjs
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onPhotoCapture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setPreview("");
    onPhotoCapture("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-gray-100 p-4 rounded-full">
                <Camera className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            
            <div>
              <p className="text-gray-600 mb-2">
                Adicione uma foto do problema
              </p>
              <p className="text-sm text-gray-500">
                Isso ajuda na resolução mais rápida
              </p>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button
                type="button"
                onClick={handleCameraClick}
                variant="default"
                className="gap-2"
              >
                <Camera className="h-4 w-4" />
                Tirar Foto
              </Button>
              <Button
                type="button"
                onClick={handleCameraClick}
                variant="outline"
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Escolher Arquivo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Foto do problema"
            className="w-full h-64 object-cover rounded-lg"
          />
          <Button
            type="button"
            onClick={handleRemovePhoto}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}