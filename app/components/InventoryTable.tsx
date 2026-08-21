'use client';

import React, { useState } from 'react';
import { InventoryItem, ItemCategory, ItemStatus } from '../types/inventory';
import { 
  Search, Filter, Edit3, Trash2, UserCheck, 
  MapPin, AlertTriangle, Layers, Tag
} from 'lucide-react';

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  onBorrow: (item: InventoryItem) => void;
}

const CATEGORIES: (ItemCategory | 'Todas')[] = [
  'Todas',
  'Microcontroladores',
  'Sensores y Actuadores',
  'Herramientas',
  'Impresión 3D',
  'Robótica y Drones',
  'Electrónica General',
  'Equipos de Medición',
];

export const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  onEdit,
  onDelete,
  onBorrow,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'Todas'>('Todas');
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | 'Todos'>('Todos');

  // Filtering
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.responsible && item.responsible.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'Todas' || item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'Todos' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: ItemStatus) => {
    switch (status) {
      case 'disponible':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Disponible
          </span>
        );
      case 'en_uso':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            En Uso / Préstamo
          </span>
        );
      case 'mantenimiento':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            Mantenimiento
          </span>
        );
      case 'agotado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Agotado
          </span>
        );
    }
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
      {/* Controls Bar: Search & Filters */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, nombre, ubicación o responsable..."
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-slate-200">
                  {cat === 'Todas' ? 'Todas las Categorías' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-1.5">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              <option value="Todos" className="bg-slate-900 text-slate-200">Todos los Estados</option>
              <option value="disponible" className="bg-slate-900 text-slate-200">Disponible</option>
              <option value="en_uso" className="bg-slate-900 text-slate-200">En Uso / Préstamo</option>
              <option value="mantenimiento" className="bg-slate-900 text-slate-200">Mantenimiento</option>
              <option value="agotado" className="bg-slate-900 text-slate-200">Agotado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4 font-mono">Código</th>
              <th className="py-3.5 px-4">Elemento / Equipo</th>
              <th className="py-3.5 px-4">Categoría</th>
              <th className="py-3.5 px-4 text-center">Stock</th>
              <th className="py-3.5 px-4">Estado</th>
              <th className="py-3.5 px-4">Ubicación / Responsable</th>
              <th className="py-3.5 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Layers className="w-8 h-8 text-slate-600 stroke-[1.5]" />
                    <p className="text-sm font-medium">No se encontraron elementos</p>
                    <p className="text-xs text-slate-600">
                      Prueba modificando la búsqueda o los filtros seleccionados.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr 
                  key={item.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Code */}
                  <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400">
                    {item.code}
                  </td>

                  {/* Name & Description */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-slate-100 group-hover:text-white">
                      {item.name}
                    </div>
                    {item.description && (
                      <div className="text-[11px] text-slate-400 truncate mt-0.5 max-w-xs">
                        {item.description}
                      </div>
                    )}
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 text-slate-400">
                    <span className="bg-slate-800 px-2 py-1 rounded-md text-[11px] text-slate-300">
                      {item.category}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1 font-bold text-slate-200">
                      <span>{item.quantity}</span>
                      {item.quantity <= item.minQuantity && (
                        <span title="Stock bajo" className="text-rose-400">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Location & Responsible */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    {item.responsible ? (
                      <div className="text-[11px] text-amber-400/90 font-normal mt-0.5">
                        Resp: {item.responsible}
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                        Sin préstamo activo
                      </div>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onBorrow(item)}
                        className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
                        title={item.status === 'en_uso' ? 'Gestionar / Devolver' : 'Prestar a responsable'}
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Editar elemento"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar del inventario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="px-5 py-3 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
        <span>Mostrando {filteredItems.length} de {items.length} elementos registrados</span>
        <span>Semillero de Investigación · Laboratorio 302</span>
      </div>
    </div>
  );
};
