export interface Region {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  population: number;
}

export const BRASILIA_REGIONS: Region[] = [
  { id: "plano-piloto", name: "Plano Piloto", coordinates: { lat: -15.7975, lng: -47.8919 }, population: 220393 },
  { id: "ceilandia", name: "Ceilândia", coordinates: { lat: -15.8056, lng: -48.1094 }, population: 489351 },
  { id: "samambaia", name: "Samambaia", coordinates: { lat: -15.8747, lng: -48.0808 }, population: 232893 },
  { id: "taguatinga", name: "Taguatinga", coordinates: { lat: -15.8333, lng: -48.0553 }, population: 222598 },
  { id: "planaltina", name: "Planaltina", coordinates: { lat: -15.6222, lng: -47.6533 }, population: 189412 },
  { id: "aguas-claras", name: "Águas Claras", coordinates: { lat: -15.8344, lng: -48.0244 }, population: 161184 },
  { id: "recanto-emas", name: "Recanto das Emas", coordinates: { lat: -15.9056, lng: -48.0667 }, population: 145304 },
  { id: "gama", name: "Gama", coordinates: { lat: -16.0186, lng: -48.0647 }, population: 141911 },
  { id: "guara", name: "Guará", coordinates: { lat: -15.8278, lng: -47.9772 }, population: 134002 },
  { id: "santa-maria", name: "Santa Maria", coordinates: { lat: -16.0186, lng: -48.0147 }, population: 128882 },
  { id: "sobradinho", name: "Sobradinho", coordinates: { lat: -15.6522, lng: -47.7939 }, population: 85574 },
  { id: "sao-sebastiao", name: "São Sebastião", coordinates: { lat: -15.8972, lng: -47.7631 }, population: 115256 },
  { id: "vicente-pires", name: "Vicente Pires", coordinates: { lat: -15.8033, lng: -48.0325 }, population: 72879 },
  { id: "itapoa", name: "Itapoã", coordinates: { lat: -15.7531, lng: -47.7606 }, population: 68587 },
  { id: "sudoeste", name: "Sudoeste/Octogonal", coordinates: { lat: -15.7969, lng: -47.9225 }, population: 53770 },
  { id: "brazlandia", name: "Brazlândia", coordinates: { lat: -15.6747, lng: -48.2006 }, population: 57542 },
  { id: "riacho-fundo", name: "Riacho Fundo", coordinates: { lat: -15.8819, lng: -48.0178 }, population: 41404 },
  { id: "paranoa", name: "Paranoá", coordinates: { lat: -15.7731, lng: -47.7764 }, population: 65533 },
  { id: "nucleo-bandeirante", name: "Núcleo Bandeirante", coordinates: { lat: -15.8714, lng: -47.9681 }, population: 25072 },
  { id: "candangolandia", name: "Candangolândia", coordinates: { lat: -15.8519, lng: -47.9569 }, population: 17489 },
  { id: "lago-norte", name: "Lago Norte", coordinates: { lat: -15.7297, lng: -47.8594 }, population: 34182 },
  { id: "cruzeiro", name: "Cruzeiro", coordinates: { lat: -15.7892, lng: -47.9403 }, population: 33539 },
  { id: "lago-sul", name: "Lago Sul", coordinates: { lat: -15.8297, lng: -47.8594 }, population: 30629 },
  { id: "riacho-fundo-2", name: "Riacho Fundo II", coordinates: { lat: -15.9036, lng: -48.0522 }, population: 85658 },
  { id: "sia", name: "SIA", coordinates: { lat: -15.8058, lng: -47.9608 }, population: 2448 },
  { id: "estrutural", name: "Estrutural", coordinates: { lat: -15.7836, lng: -47.9942 }, population: 35801 },
  { id: "jardim-botanico", name: "Jardim Botânico", coordinates: { lat: -15.8653, lng: -47.8078 }, population: 28390 },
  { id: "sobradinho-2", name: "Sobradinho II", coordinates: { lat: -15.6464, lng: -47.8339 }, population: 100775 },
  { id: "park-way", name: "Park Way", coordinates: { lat: -15.9017, lng: -47.9253 }, population: 19759 },
  { id: "scia", name: "SCIA", coordinates: { lat: -15.7475, lng: -47.9658 }, population: 36377 },
  { id: "sol-nascente", name: "Sol Nascente/Pôr do Sol", coordinates: { lat: -15.8342, lng: -48.1256 }, population: 92600 },
  { id: "arniqueira", name: "Arniqueira", coordinates: { lat: -15.8447, lng: -48.0067 }, population: 46200 },
  { id: "fercal", name: "Fercal", coordinates: { lat: -15.6031, lng: -47.8783 }, population: 8523 },
  { id: "varjao", name: "Varjão", coordinates: { lat: -15.7106, lng: -47.8669 }, population: 9215 },
  { id: "asa-norte", name: "Asa Norte", coordinates: { lat: -15.7622, lng: -47.8825 }, population: 122000 },
  { id: "asa-sul", name: "Asa Sul", coordinates: { lat: -15.8133, lng: -47.9017 }, population: 98000 }
];