'use client';

import React from 'react';
import { InventoryItem } from '../types/inventory';
import { Boxes, CheckCircle2, Clock, Wrench, AlertTriangle } from 'lucide-react';

interface StatsOverviewProps {
  items: InventoryItem[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ items }) => {
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalTypes = items.length;

  const availableCount = items.filter(i => i.status === 'disponible').length;
  const inUseCount = items.filter(i => i.status === 'en_uso').length;
  const maintenanceCount = items.filter(i => i.status === 'mantenimiento').length;
  const lowStockCount = items.filter(i => i.quantity <= i.minQuantity).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Items Card */}
      <div className="glass-card p-4 rounded-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total en Inventario</p>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">{totalQuantity} <span className="text-xs font-normal text-slate-400">unidades ({totalTypes} tipos)</span></h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Boxes className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-[11px] text-slate-400">
          <span className="text-blue-400 font-medium">100%</span>
          <span className="ml-1">registrados en sistema</span>
        </div>
      </div>

      {/* Disponibles Card */}
      <div className="glass-card p-4 rounded-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Disponibles</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">{availableCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-[11px] text-slate-400">
          <span className="text-emerald-400 font-medium">{Math.round((availableCount / (totalTypes || 1)) * 100)}%</span>
          <span className="ml-1">listos para préstamo</span>
        </div>
      </div>

      {/* En Uso Card */}
      <div className="glass-card p-4 rounded-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">En Préstamo / Uso</p>
            <h3 className="text-2xl font-bold text-amber-400 mt-1">{inUseCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center text-[11px] text-slate-400">
          <span className="text-amber-400 font-medium">{inUseCount} asignados</span>
          <span className="ml-1">a proyectos activos</span>
        </div>
      </div>

      {/* Mantenimiento / Alerta Card */}
      <div className="glass-card p-4 rounded-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Mantenimiento / Stock Bajo</p>
            <h3 className="text-2xl font-bold text-rose-400 mt-1">{maintenanceCount + lowStockCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            {lowStockCount > 0 ? <AlertTriangle className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
          </div>
        </div>
        <div className="mt-3 flex items-center text-[11px] text-slate-400">
          <span className="text-rose-400 font-medium">{maintenanceCount} en taller</span>
          <span className="ml-1">· {lowStockCount} stock bajo</span>
        </div>
      </div>
    </div>
  );
};
