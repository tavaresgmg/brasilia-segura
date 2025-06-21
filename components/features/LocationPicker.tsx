"use client";

import { useState, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRASILIA_REGIONS } from "@/lib/mock/regions";

interface LocationPickerProps {
  onLocationSelect: (location: {
    address: string;
    regionId: string;
    coordinates: { lat: number; lng: number };
  }) => void;
  currentLocation?: {
    address: string;
    regionId: string;
    coordinates: { lat: number; lng: number };
  };
}

export function LocationPicker({ onLocationSelect, currentLocation }: LocationPickerProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [address, setAddress] = useState(currentLocation?.address || "");
  const [selectedRegion, setSelectedRegion] = useState(currentLocation?.regionId || "");
  const [coordinates, setCoordinates] = useState(currentLocation?.coordinates || { lat: 0, lng: 0 });

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    
    // Simular obtenção de localização
    setTimeout(() => {
      // Pegar uma região aleatória para simular
      const randomRegion = BRASILIA_REGIONS[Math.floor(Math.random() * BRASILIA_REGIONS.length)];
      const mockAddress = `Quadra ${Math.floor(Math.random() * 50) + 1}, ${randomRegion.name}`;
      
      setAddress(mockAddress);
      setSelectedRegion(randomRegion.id);
      setCoordinates(randomRegion.coordinates);
      
      onLocationSelect({
        address: mockAddress,
        regionId: randomRegion.id,
        coordinates: randomRegion.coordinates
      });
      
      setIsGettingLocation(false);
    }, 1500);
  };

  const handleManualUpdate = () => {
    if (address && selectedRegion) {
      const region = BRASILIA_REGIONS.find(r => r.id === selectedRegion);
      if (region) {
        onLocationSelect({
          address,
          regionId: selectedRegion,
          coordinates: region.coordinates
        });
      }
    }
  };

  useEffect(() => {
    handleManualUpdate();
  }, [address, selectedRegion]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label>Localização do Problema</Label>
        
        <Button
          type="button"
          onClick={handleGetLocation}
          disabled={isGettingLocation}
          variant="outline"
          className="w-full gap-2"
        >
          {isGettingLocation ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Obtendo localização...
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4" />
              Usar Localização Atual
            </>
          )}
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="region">Região Administrativa</Label>
          <select
            id="region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Selecione uma região</option>
            {BRASILIA_REGIONS.sort((a, b) => a.name.localeCompare(b.name)).map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="address">Endereço/Referência</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ex: Quadra 5, próximo ao mercado"
            required
          />
        </div>
      </div>

      {coordinates.lat !== 0 && (
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          📍 Coordenadas: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}