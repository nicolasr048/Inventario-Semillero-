'use client';

import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../types/inventory';
import { X, UserCheck, AlertCircle } from 'lucide-react';

interface BorrowModalProps {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBorrow: (itemId: string, responsible: string) => void;
  onReturnItem: (itemId: string) => void;
}

export const BorrowModal: React.FC<BorrowModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirmBorrow,
  onReturnItem,
}) => {
  const [responsibleName, setResponsibleName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setResponsibleName(item.responsible || '');
    }
    setError('');
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const isCurrentlyBorrowed = item.status === 'en_uso';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responsibleName.trim()) {
      setError('Por favor indica el nombre de la persona responsable del préstamo.');
      return;
    }
    onConfirmBorrow(item.id, responsibleName.trim());
    onClose();
  };

  const handleReturn = () => {
    onReturnItem(item.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-100">
              {isCurrentlyBorrowed ? 'Gestionar Préstamo' : 'Registrar Préstamo de Equipo'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          {/* Details Card */}
          <div className="p-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-mono text-emerald-400 font-semibold">{item.code}</span>
              <span className="text-slate-400">{item.category}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">{item.name}</h3>
            <p className="text-slate-400">Ubicación: <span className="text-slate-200">{item.location}</span></p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isCurrentlyBorrowed ? (
            <div className="space-y-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-slate-300">
                Actualmente prestado a: <strong className="text-amber-300">{item.responsible}</strong>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleReturn}
                  className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md shadow-emerald-500/20 transition-all cursor-pointer text-center"
                >
                  Registrar Devolución al Laboratorio
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Estudiante / Investigador Responsable
                </label>
                <input
                  type="text"
                  value={responsibleName}
                  onChange={(e) => setResponsibleName(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500"
                  placeholder="Ej. Nicolás Restrepo - Proyecto X"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  Asignar y Prestar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
