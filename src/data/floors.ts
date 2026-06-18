export type UnitStatus = 'available' | 'reserved' | 'sold';

export const UnitStatusString: Record<UnitStatus, string> = {
  available: 'Disponible',
  reserved: 'Separado',
  sold: 'Vendido'
}

export interface Unit {
  id: string;        // e.g. "410"
  floorId: string;   // e.g. "4"
  price: number;     // e.g. 1000
  dimensions: number; // m2, e.g. 90
  bedrooms?: number;  // Optional for storage units
  bathrooms?: number; // Optional for storage units
  status: UnitStatus;
  type?: 'apartment' | 'storage'; // To distinguish unit types
  subtitle?: string; // e.g. "Flat", "Duplex", "Bodega"
  description?: string;
  images?: string[];
  tourUrl?: string; // Kuula or other 360 tour URL
  assetId?: string; // Folder name for assets if different from ID (e.g. 'x01')
  x?: number; // Percentage 0-100
  y?: number; // Percentage 0-100
  path?: string; // SVG Path 'd' attribute for irregular shapes (0-100 coordinate space)
  identifier?: string; // Optional friendly name (e.g. "101")
}

export interface Floor {
  id: string;
  name: string;
  floorPlanImage: string;
  units: Unit[];
}

// NOTE: In the template, we export empty or sample data.
// In a real implementation, you might import specific asset helpers or just use string paths.

export const floorsData: Floor[] = [
  {
    id: "2",
    name: "Piso 2",
    floorPlanImage: "plants/floor_2.webp",
    units: [
      { id: "201", floorId: "2", price: 0, dimensions: 57.84, bedrooms: 2, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 29.8,35.2 L 29.4,81.1 L 59.6,81.7 L 59.3,45.6 L 43,45.7 L 43,34.9 Z', tourUrl: 'https://kuula.co/share/collection/7TGWk?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' },
      { id: "202", floorId: "2", price: 0, dimensions: 70.72, bedrooms: 3, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 41.5,34.7 L 43,35 L 43.1,45.5 L 59.3,45.3 L 59.7,81.1 L 70.4,80.8 L 69.6,0.1 L 43.8,0.4 L 43.9,9.4 L 41.5,9.4 Z', tourUrl: 'https://kuula.co/share/collection/7TGWZ?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' }
    ]
  },
  {
    id: "3",
    name: "Piso 3",
    floorPlanImage: "plants/floor_3.webp",
    units: [
      { id: "301", floorId: "3", price: 0, dimensions: 57.84, bedrooms: 2, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 29.9,35.5 L 29.4,81.2 L 59.7,81.7 L 59.2,46.3 L 43.2,46.1 L 43,35.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGWH?logo=0&info=1&fs=1&vr=1&sd=1&thumbs=1' },
      { id: "302", floorId: "3", price: 0, dimensions: 70.72, bedrooms: 3, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 40.3,35.4 L 43,35.5 L 43.1,46.3 L 59.3,46.1 L 59.5,80.8 L 70.4,81.2 L 69.5,10 L 65.3,10 L 62.6,5.7 L 59.7,10.2 L 55,10.1 L 54,7.3 L 51.9,10.1 L 48.4,10.1 L 47.5,7.5 L 45.2,10.1 L 41.7,10.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGWg?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' }
    ]
  },
  {
    id: "4",
    name: "Piso 4",
    floorPlanImage: "plants/floor_4.webp",
    units: [
      { id: "401", floorId: "4", price: 0, dimensions: 57.84, bedrooms: 2, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 29.9,35.5 L 29.4,81.2 L 59.7,81.7 L 59.2,46.3 L 43.2,46.1 L 43,35.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGWs?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' },
      { id: "402", floorId: "4", price: 0, dimensions: 70.72, bedrooms: 3, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 40.3,35.4 L 43,35.5 L 43.1,46.3 L 59.3,46.1 L 59.5,80.8 L 70.4,81.2 L 69.5,10 L 65.3,10 L 62.6,5.7 L 59.7,10.2 L 55,10.1 L 54,7.3 L 51.9,10.1 L 48.4,10.1 L 47.5,7.5 L 45.2,10.1 L 41.7,10.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGWB?logo=0&info=1&fs=1&vr=1&sd=1&thumbs=1' }
    ]
  },
  {
    id: "5",
    name: "Piso 5",
    floorPlanImage: "plants/floor_5.webp",
    units: [
      { id: "501", floorId: "5", price: 0, dimensions: 57.84, bedrooms: 2, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 29.9,35.5 L 29.4,81.2 L 59.7,81.7 L 59.2,46.3 L 43.2,46.1 L 43,35.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGWJ?logo=0&info=1&fs=1&vr=1&sd=1&thumbs=1' },
      { id: "502", floorId: "5", price: 0, dimensions: 70.72, bedrooms: 3, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 40.3,35.4 L 43,35.5 L 43.1,46.3 L 59.3,46.1 L 59.5,80.8 L 70.4,81.2 L 69.5,10 L 65.3,10 L 62.6,5.7 L 59.7,10.2 L 55,10.1 L 54,7.3 L 51.9,10.1 L 48.4,10.1 L 47.5,7.5 L 45.2,10.1 L 41.7,10.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGWb?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' }
    ]
  },
  {
    id: "6",
    name: "Piso 6",
    floorPlanImage: "plants/floor_6.webp",
    units: [
      { id: "601", floorId: "6", price: 0, dimensions: 57.84, bedrooms: 2, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 29.9,35.5 L 29.4,81.2 L 59.7,81.7 L 59.2,46.3 L 43.2,46.1 L 43,35.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGWM?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' },
      { id: "602", floorId: "6", price: 0, dimensions: 70.72, bedrooms: 3, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 40.3,35.4 L 43,35.5 L 43.1,46.3 L 59.3,46.1 L 59.5,80.8 L 70.4,81.2 L 69.5,10 L 65.3,10 L 62.6,5.7 L 59.7,10.2 L 55,10.1 L 54,7.3 L 51.9,10.1 L 48.4,10.1 L 47.5,7.5 L 45.2,10.1 L 41.7,10.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGWj?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' }
    ]
  },
  {
    id: "7",
    name: "Piso 7",
    floorPlanImage: "plants/floor_7.webp",
    units: [
      { id: "701", floorId: "7", price: 0, dimensions: 57.84, bedrooms: 2, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 29.9,35.5 L 29.4,81.2 L 59.7,81.7 L 59.2,46.3 L 43.2,46.1 L 43,35.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGW3?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' },
      { id: "702", floorId: "7", price: 0, dimensions: 70.72, bedrooms: 3, bathrooms: 2, status: 'available', subtitle: 'Flat', type: 'apartment', path: 'M 40.3,35.4 L 43,35.5 L 43.1,46.3 L 59.3,46.1 L 59.5,80.8 L 70.4,81.2 L 69.5,10 L 65.3,10 L 62.6,5.7 L 59.7,10.2 L 55,10.1 L 54,7.3 L 51.9,10.1 L 48.4,10.1 L 47.5,7.5 L 45.2,10.1 L 41.7,10.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGy4?logo=0&info=1&fs=1&vr=1&sd=1&thumbs=1' }
    ]
  },
  {
    id: "8",
    name: "Piso 8",
    floorPlanImage: "plants/floor_8.webp",
    units: [
      { id: "801", floorId: "8", price: 0, dimensions: 91.14, bedrooms: 3, bathrooms: 3, status: 'available', subtitle: 'Dúplex', type: 'apartment', path: 'M 29.9,35.9 L 29.4,81.4 L 59.5,81.6 L 59.2,46.4 L 46.6,46.1 L 46.4,35.7 Z', tourUrl: 'https://kuula.co/share/collection/7TGyp?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' },
      { id: "802", floorId: "8", price: 0, dimensions: 108.41, bedrooms: 3, bathrooms: 3, status: 'available', subtitle: 'Dúplex', type: 'apartment', path: 'M 41.7,35.4 L 41.7,10.6 L 45.1,10.4 L 47.5,7.9 L 48.3,10.1 L 51.9,10.1 L 54.1,7.8 L 54.7,10.1 L 59.7,10.5 L 62.6,5.9 L 65.3,10 L 69.4,10.3 L 70.4,81.6 L 59.6,81.2 L 59.2,45.9 L 46.6,45.8 L 46.5,36.2 Z', tourUrl: 'https://kuula.co/share/collection/7TGyP?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' }
    ]
  },
  {
    id: "9",
    name: "Piso 9",
    floorPlanImage: "plants/floor_9.webp",
    units: [
      { id: "801", floorId: "9", price: 0, dimensions: 91.14, bedrooms: 3, bathrooms: 3, status: 'available', subtitle: 'Dúplex', type: 'apartment', identifier: '801', path: 'M 29.8,35.7 L 29.6,79.9 L 54.6,79.6 L 54.6,65.1 L 59.5,64.4 L 59.3,46.2 L 46.6,45.7 L 46.5,35.6 Z', tourUrl: 'https://kuula.co/share/collection/7TGyp?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' },
      { id: "802", floorId: "9", price: 0, dimensions: 108.41, bedrooms: 3, bathrooms: 3, status: 'available', subtitle: 'Dúplex', type: 'apartment', identifier: '802', path: 'M 41.6,10.9 L 44.8,11.1 L 47.4,8.6 L 48.3,10.8 L 51.4,10.9 L 54,8.4 L 54.8,10.7 L 59.9,10.7 L 62.3,6.5 L 65,10.4 L 69.5,10.4 L 70.4,80.2 L 54.7,80.2 L 54.7,65 L 59.4,64.4 L 59.3,46.1 L 46.6,45.7 L 46.6,35.6 L 41.7,35.1 Z', tourUrl: 'https://kuula.co/share/collection/7TGyP?logo=-1&card=1&info=0&fs=1&vr=1&zoom=1&initload=0&thumbs=3&alpha=0.91&inst=es' }
    ]
  },
  {
    id: "1",
    name: "Piso 1",
    floorPlanImage: "plants/floor_1.webp",
    units: [
      { id: "101", floorId: "1", price: 0, dimensions: 14.29, status: 'available', subtitle: 'Estacionamiento 1', type: 'storage', path: 'M 49.4,98.1 L 49.2,66.3 L 39.3,66 L 39,96.7 Z' },
      { id: "102", floorId: "1", price: 0, dimensions: 14.58, status: 'available', subtitle: 'Estacionamiento 2', type: 'storage', path: 'M 49.5,66.1 L 59.3,65.8 L 59.3,98.1 L 49.6,97.5 Z' },
      { id: "103", floorId: "1", price: 0, dimensions: 14.59, status: 'available', subtitle: 'Estacionamiento 3', type: 'storage', path: 'M 50.5,23.4 L 41.7,23.3 L 41.1,0.3 L 50.4,0.2 Z' },
      { id: "104", floorId: "1", price: 0, dimensions: 13.66, status: 'available', subtitle: 'Estacionamiento 4', type: 'storage', path: 'M 59.5,23.5 L 59.3,0.1 L 50.3,0.3 L 50.6,23.1 Z' },
      { id: "105", floorId: "1", price: 0, dimensions: 13.90, status: 'available', subtitle: 'Estacionamiento 5', type: 'storage', path: 'M 69.6,23.3 L 59.7,23.3 L 59.5,0.2 L 69.4,0.2 Z' }
      // { id: "106", floorId: "1", price: 0, dimensions: 1.48, status: 'available', subtitle: 'Depósito 1', type: 'storage', path: 'M 49.8,62.7 L 49.8,65.5 L 59.2,65.7 L 59.1,62.6 Z' }
    ]
  }
];
