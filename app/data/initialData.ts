import { InventoryItem } from '../types/inventory';

export const INITIAL_ITEMS: InventoryItem[] = [
  {
    id: '1',
    code: 'SEM-MCU-001',
    name: 'Raspberry Pi 4 Model B (8GB RAM)',
    category: 'Microcontroladores',
    quantity: 5,
    minQuantity: 2,
    status: 'en_uso',
    location: 'Estante A-1 (Lab 302)',
    responsible: 'Carlos Mendoza - Proyecto IoT',
    description: 'Tarjeta para procesamiento en borde y servidor local de telemetría.',
    lastUpdated: '2026-08-10'
  },
  {
    id: '2',
    code: 'SEM-MCU-002',
    name: 'ESP32 NodeMCU Wi-Fi + Bluetooth',
    category: 'Microcontroladores',
    quantity: 12,
    minQuantity: 4,
    status: 'disponible',
    location: 'Cajón B-2 (Semillero)',
    responsible: '',
    description: 'Módulos para nodos sensores inalámbricos.',
    lastUpdated: '2026-08-08'
  },
  {
    id: '3',
    code: 'SEM-SEN-005',
    name: 'Sensor Ultrasónico HC-SR04',
    category: 'Sensores y Actuadores',
    quantity: 18,
    minQuantity: 5,
    status: 'disponible',
    location: 'Cajón C-1',
    responsible: '',
    description: 'Medición de distancia por ultrasonido para prototipos móviles.',
    lastUpdated: '2026-08-05'
  },
  {
    id: '4',
    code: 'SEM-3D-001',
    name: 'Impresora 3D Creality Ender 3 V2',
    category: 'Impresión 3D',
    quantity: 2,
    minQuantity: 1,
    status: 'mantenimiento',
    location: 'Zona de Fabricación 3D',
    responsible: 'Laura Restrepo - Calibración Boquilla',
    description: 'Impresora para chasis y carcasas de prototipos.',
    lastUpdated: '2026-08-11'
  },
  {
    id: '5',
    code: 'SEM-MED-003',
    name: 'Osciloscopio Digital Rigol DS1054Z 50MHz',
    category: 'Equipos de Medición',
    quantity: 1,
    minQuantity: 1,
    status: 'en_uso',
    location: 'Mesa de Trabajo 1',
    responsible: 'Nicolás R. - Pruebas de Señal',
    description: 'Osciloscopio de 4 canales para depuración de buses SPI/I2C.',
    lastUpdated: '2026-08-09'
  },
  {
    id: '6',
    code: 'SEM-HER-012',
    name: 'Estación de Soldadura Yihua 8786D',
    category: 'Herramientas',
    quantity: 3,
    minQuantity: 1,
    status: 'disponible',
    location: 'Mesa de Soldadura',
    responsible: '',
    description: 'Estación con cautín y pistola de aire caliente.',
    lastUpdated: '2026-08-01'
  },
  {
    id: '7',
    code: 'SEM-ROB-004',
    name: 'Kit de Chasis Robot Móvil 2WD + Motores TT',
    category: 'Robótica y Drones',
    quantity: 6,
    minQuantity: 2,
    status: 'disponible',
    location: 'Estante C-3',
    responsible: '',
    description: 'Kit para prácticas de navegación autónoma y control PID.',
    lastUpdated: '2026-07-28'
  },
  {
    id: '8',
    code: 'SEM-ELE-020',
    name: 'Fuente de Alimentación Regulada DC 30V 5A',
    category: 'Equipos de Medición',
    quantity: 1,
    minQuantity: 2,
    status: 'en_uso',
    location: 'Mesa de Trabajo 2',
    responsible: 'Andrés Gómez',
    description: 'Fuente variable para pruebas de consumo energético.',
    lastUpdated: '2026-08-07'
  }
];
