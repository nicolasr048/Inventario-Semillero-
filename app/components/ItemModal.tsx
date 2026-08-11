'use client';

import React, { useState, useEffect } from 'react';
import { InventoryItem, ItemCategory, ItemStatus } from '../types/inventory';
import { X, Save, PackagePlus, AlertCircle } from 'lucide-react';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<InventoryItem, 'id' | 'lastUpdated'> & { id?: string }) => void;
  initialItem?: InventoryItem | null;
}

const CATEGORIES: ItemCategory[] = [
  'Microcontroladores',
  'Sensores y Actuadores',
  'Herramientas',
  'Impresión 3D',
  'Robótica y Drones',
  'Electrónica General',
  'Equipos de Medición',
];

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
}) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'Microcontroladores' as ItemCategory,
    quantity: 1,
    minQuantity: 1,
    status: 'disponible' as ItemStatus,
    location: '',
    responsible: '',
    description: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialItem) {
      setFormData({
        code: initialItem.code,
        name: initialItem.name,
        category: initialItem.category,
        quantity: initialItem.quantity,
        minQuantity: initialItem.minQuantity,
        status: initialItem.status,
        location: initialItem.location,
        responsible: initialItem.responsible || '',
        description: initialItem.description || '',
      });
    } else {
      setFormData({
        code: `SEM-${Math.floor(100 + Math.random() * 900)}`,
        name: '',
        category: 'Microcontroladores',
        quantity: 1,
        minQuantity: 1,
        status: 'disponible',
        location: 'Lab 302',
        responsible: '',
        description: '',
      });
    }
    setError('');
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('El nombre del elemento es obligatorio');
      return;
    }
    if (!formData.code.trim()) {
      setError('El código es obligatorio');
      return;
    }

    onSave({
      ...(initialItem ? { id: initialItem.id } : {}),
      ...formData,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <PackagePlus className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-100">
              {initialItem ? 'Editar Elemento' : 'Agregar Nuevo Elemento'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Código / ID</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                placeholder="SEM-MCU-001"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ItemCategory })}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Nombre del Elemento / Equipo</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              placeholder="Ej. Raspberry Pi 4 Model B"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Cantidad</label>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Stock Mínimo</label>
              <input
                type="number"
                min="0"
                value={formData.minQuantity}
                onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Estado</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ItemStatus })}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="disponible">Disponible</option>
                <option value="en_uso">En Uso / Préstamo</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Ubicación Físicas</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                placeholder="Estante A-1, Lab 302"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Responsable (Si está en uso)</label>
              <input
                type="text"
                value={formData.responsible}
                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                placeholder="Nombre del estudiante / investigador"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Descripción / Notas adicionales</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
              placeholder="Detalles sobre el estado, accesorios incluidos, etc."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Guardar Ítem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
