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
    floorPlanImage: "plants/floor_2.jpg",
    units: [
      { id: "201", floorId: "2", price: 0, dimensions: 57.84, status: 'available', subtitle: 'Flat', type: 'apartment' },
      { id: "202", floorId: "2", price: 0, dimensions: 70.72, status: 'available', subtitle: 'Flat', type: 'apartment' }
    ]
  },
  {
    id: "3",
    name: "Piso 3",
    floorPlanImage: "plants/floor_3.jpg",
    units: [
      { id: "301", floorId: "3", price: 0, dimensions: 57.84, status: 'available', subtitle: 'Flat', type: 'apartment' },
      { id: "302", floorId: "3", price: 0, dimensions: 70.72, status: 'available', subtitle: 'Flat', type: 'apartment' }
    ]
  },
  {
    id: "4",
    name: "Piso 4",
    floorPlanImage: "plants/floor_4.jpg",
    units: [
      { id: "401", floorId: "4", price: 0, dimensions: 57.84, status: 'available', subtitle: 'Flat', type: 'apartment' },
      { id: "402", floorId: "4", price: 0, dimensions: 70.72, status: 'available', subtitle: 'Flat', type: 'apartment' }
    ]
  },
  {
    id: "5",
    name: "Piso 5",
    floorPlanImage: "plants/floor_5.jpg",
    units: [
      { id: "501", floorId: "5", price: 0, dimensions: 57.84, status: 'available', subtitle: 'Flat', type: 'apartment' },
      { id: "502", floorId: "5", price: 0, dimensions: 70.72, status: 'available', subtitle: 'Flat', type: 'apartment' }
    ]
  },
  {
    id: "6",
    name: "Piso 6",
    floorPlanImage: "plants/floor_6.jpg",
    units: [
      { id: "601", floorId: "6", price: 0, dimensions: 57.84, status: 'available', subtitle: 'Flat', type: 'apartment' },
      { id: "602", floorId: "6", price: 0, dimensions: 70.72, status: 'available', subtitle: 'Flat', type: 'apartment' }
    ]
  },
  {
    id: "7",
    name: "Piso 7",
    floorPlanImage: "plants/floor_7.jpg",
    units: [
      { id: "701", floorId: "7", price: 0, dimensions: 57.84, status: 'available', subtitle: 'Flat', type: 'apartment' },
      { id: "702", floorId: "7", price: 0, dimensions: 70.72, status: 'available', subtitle: 'Flat', type: 'apartment' }
    ]
  },
  {
    id: "8",
    name: "Piso 8",
    floorPlanImage: "plants/floor_8.jpg",
    units: [
      { id: "801", floorId: "8", price: 0, dimensions: 91.14, status: 'available', subtitle: 'Dúplex', type: 'apartment' },
      { id: "802", floorId: "8", price: 0, dimensions: 108.41, status: 'available', subtitle: 'Dúplex', type: 'apartment' }
    ]
  },
  {
    id: "9",
    name: "Piso 9",
    floorPlanImage: "plants/floor_9.jpg",
    units: []
  },
  {
    id: "1",
    name: "Piso 1",
    floorPlanImage: "plants/floor_1.jpg",
    units: [
      { id: "101", floorId: "1", price: 0, dimensions: 14.29, status: 'available', subtitle: 'Estacionamiento 1', type: 'storage' },
      { id: "102", floorId: "1", price: 0, dimensions: 14.58, status: 'available', subtitle: 'Estacionamiento 2', type: 'storage' },
      { id: "103", floorId: "1", price: 0, dimensions: 14.59, status: 'available', subtitle: 'Estacionamiento 3', type: 'storage' },
      { id: "104", floorId: "1", price: 0, dimensions: 13.66, status: 'available', subtitle: 'Estacionamiento 4', type: 'storage' },
      { id: "105", floorId: "1", price: 0, dimensions: 13.90, status: 'available', subtitle: 'Estacionamiento 5', type: 'storage' },
      { id: "106", floorId: "1", price: 0, dimensions: 1.48, status: 'available', subtitle: 'Depósito 1', type: 'storage' }
    ]
  }
];
