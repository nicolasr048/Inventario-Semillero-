'use client';

import React from 'react';
import { Package, Plus, Download, RefreshCw, Layers } from 'lucide-react';

interface HeaderProps {
  onAddItem: () => void;
  onExport: () => void;
  onReset: () => void;
  totalItems: number;
}

export const Header: React.FC<HeaderProps> = ({
  onAddItem,
  onExport,
  onReset,
  totalItems,
}) => {
  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-slate-800/80 px-6 py-4 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold">
            <Package className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-100 tracking-tight">
                Inventario Semillero
              </h1>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sistema de Gestión y Control de Equipos, Sensores y Componentes
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors cursor-pointer"
            title="Exportar reporte CSV"
          >
            <Download className="w-4 h-4 text-slate-400" />
            Exportar CSV
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-400 bg-slate-800/40 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/40 rounded-lg transition-colors cursor-pointer"
            title="Restablecer datos demo"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Restablecer Demo
          </button>

          <button
            onClick={onAddItem}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-lg shadow-md shadow-emerald-500/20 transition-all transform active:scale-95 cursor-pointer ml-1"
          >
            <Plus className="w-4 h-4" />
            Nuevo Ítem
          </button>
        </div>
      </div>
    </header>
  );
};
