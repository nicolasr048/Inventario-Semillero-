export type ItemStatus = 'disponible' | 'en_uso' | 'mantenimiento' | 'agotado';

export type ItemCategory = 
  | 'Microcontroladores' 
  | 'Sensores y Actuadores' 
  | 'Herramientas' 
  | 'Impresión 3D' 
  | 'Robótica y Drones' 
  | 'Electrónica General' 
  | 'Equipos de Medición';

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: ItemCategory;
  quantity: number;
  minQuantity: number;
  status: ItemStatus;
  location: string;
  responsible?: string;
  description?: string;
  lastUpdated: string;
}
