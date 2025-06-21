"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhotoCapture } from "@/components/features/PhotoCapture";
import { CategorySelector } from "@/components/features/CategorySelector";
import { LocationPicker } from "@/components/features/LocationPicker";
import { UrgencySelector } from "@/components/features/UrgencySelector";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Send } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";

interface ReportData {
  photo: string;
  categoryId: string;
  location: {
    address: string;
    regionId: string;
    coordinates: { lat: number; lng: number };
  } | null;
  urgency: string;
  description: string;
}

export default function ReportPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [protocol, setProtocol] = useState("");
  
  const [reportData, setReportData] = useState<ReportData>({
    photo: "",
    categoryId: "",
    location: null,
    urgency: "",
    description: ""
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const canProceed = () => {
    switch (step) {
      case 1: return reportData.photo !== "";
      case 2: return reportData.categoryId !== "";
      case 3: return reportData.location !== null;
      case 4: return reportData.urgency !== "";
      case 5: return reportData.description.trim() !== "";
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Gerar protocolo
    const newProtocol = `BSB${Date.now().toString().slice(-8)}`;
    setProtocol(newProtocol);
    
    // Salvar no localStorage (simulando backend)
    const savedReports = JSON.parse(localStorage.getItem('user-reports') || '[]');
    savedReports.push({
      id: `report-${Date.now()}`,
      ...reportData,
      userId: user?.id,
      userName: user?.name,
      createdAt: new Date().toISOString(),
      status: 'pendente',
      protocol: newProtocol
    });
    localStorage.setItem('user-reports', JSON.stringify(savedReports));
    
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900">
              Reporte Enviado!
            </h1>
            <p className="text-gray-600">
              Obrigado por contribuir para uma Brasília mais segura.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Protocolo</p>
              <p className="text-2xl font-mono font-bold text-green-800">
                {protocol}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Você pode acompanhar o status do seu reporte através deste número.
            </p>
            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => router.push("/")}
                className="w-full"
              >
                Voltar ao Início
              </Button>
              <Button 
                onClick={() => {
                  setShowSuccess(false);
                  setStep(1);
                  setReportData({
                    photo: "",
                    categoryId: "",
                    location: null,
                    urgency: "",
                    description: ""
                  });
                }}
                variant="outline"
                className="w-full"
              >
                Fazer Novo Reporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200">
        <div 
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <p className="text-sm text-gray-500">Etapa {step} de {totalSteps}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            {step === 1 && "Adicione uma Foto"}
            {step === 2 && "Selecione a Categoria"}
            {step === 3 && "Informe a Localização"}
            {step === 4 && "Nível de Urgência"}
            {step === 5 && "Descreva o Problema"}
          </h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            {/* Step 1: Photo */}
            {step === 1 && (
              <PhotoCapture
                onPhotoCapture={(photo) => setReportData({ ...reportData, photo })}
                currentPhoto={reportData.photo}
              />
            )}

            {/* Step 2: Category */}
            {step === 2 && (
              <CategorySelector
                selectedCategory={reportData.categoryId}
                onCategorySelect={(categoryId) => setReportData({ ...reportData, categoryId })}
              />
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <LocationPicker
                onLocationSelect={(location) => setReportData({ ...reportData, location })}
                currentLocation={reportData.location || undefined}
              />
            )}

            {/* Step 4: Urgency */}
            {step === 4 && (
              <UrgencySelector
                selectedUrgency={reportData.urgency}
                onUrgencySelect={(urgency) => setReportData({ ...reportData, urgency })}
              />
            )}

            {/* Step 5: Description */}
            {step === 5 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">
                    Descreva o problema em detalhes
                  </Label>
                  <Textarea
                    id="description"
                    value={reportData.description}
                    onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                    placeholder="Quanto mais detalhes você fornecer, mais rápido conseguiremos resolver..."
                    rows={6}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Voltar
            </Button>
          )}
          
          {step < totalSteps ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1"
            >
              Próximo
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="flex-1 gap-2"
            >
              {isSubmitting ? (
                <>Enviando...</>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar Reporte
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}