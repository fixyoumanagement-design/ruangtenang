import React, { useState } from 'react';
import { COMPONENT_SYSTEM } from '../data/dvcData';
import { 
  Square, 
  Layers, 
  Columns, 
  MousePointer, 
  Sliders,
  CheckCircle,
  Copy,
  Sparkles
} from 'lucide-react';

export const ComponentSystemView: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            TUGAS 4 · POIN 4: COMPONENT, VARIANT & AUTO LAYOUT
          </span>
          <span className="text-xs text-neutral-400 font-mono">Konsistensi Desain Sejak Wireframe</span>
        </div>
        <h2 className="text-lg md:text-xl font-bold text-neutral-900 mt-1">
          Sistem Komponen Dasar (Design Tokens & UI Kit)
        </h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Komponen yang didefinisikan satu kali dan digunakan berulang di 5 layar untuk menjaga konsistensi visual dan efisiensi di Figma/Adobe XD.
        </p>
      </div>

      {/* Concept Reminder Banner from Slide 9 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-900 block mb-1">1. Component</span>
          <p className="text-slate-600">Elemen (tombol, kartu) yang dapat dipakai ulang dan diperbarui secara terpusat.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-900 block mb-1">2. Variant</span>
          <p className="text-slate-600">Beberapa versi dari satu component (misal: tombol primer, sekunder, dan SOS krisis).</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-900 block mb-1">3. Auto Layout</span>
          <p className="text-slate-600">Menyusun elemen agar otomatis menyesuaikan jarak (padding & gap) saat konten berubah.</p>
        </div>
      </div>

      {/* Component Sections */}
      <div className="space-y-6">
        {/* 1. BUTTONS */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>A. Button Component & Variants</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {COMPONENT_SYSTEM.buttons.map((btn, idx) => (
              <div key={btn.name} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-slate-900">{btn.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">Variant #{idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{btn.use}</p>
                </div>

                {/* Preview */}
                <div className="p-4 rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                  {idx === 0 && (
                    <button className="px-5 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-lg shadow-sm hover:bg-teal-700">
                      Mulai Konsultasi (Primary)
                    </button>
                  )}
                  {idx === 1 && (
                    <button className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50">
                      Pilih Jadwal Lain (Ghost)
                    </button>
                  )}
                  {idx === 2 && (
                    <button className="px-5 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-lg shadow-sm hover:bg-rose-700 animate-pulse">
                      SOS KRISIS DARURAT
                    </button>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 font-mono bg-slate-100 p-2 rounded">
                  Specs: {btn.visual}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CARDS */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            <span>B. Card Component & Templates</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMPONENT_SYSTEM.cards.map((c) => (
              <div key={c.name} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{c.name}</span>
                  <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-semibold">Auto Layout</span>
                </div>
                <p className="text-xs text-slate-600">{c.use}</p>
                <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded border border-slate-100">
                  {c.visual}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. INPUTS & NAVIGATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>C. Navigation Elements</span>
            </h3>
            {COMPONENT_SYSTEM.navigation.map((n) => (
              <div key={n.name} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1 text-xs">
                <span className="font-bold text-slate-900 block">{n.name}</span>
                <p className="text-slate-600">{n.use}</p>
                <p className="text-[11px] font-mono text-slate-500">{n.visual}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>D. Form & Input Elements</span>
            </h3>
            {COMPONENT_SYSTEM.inputs.map((inp) => (
              <div key={inp.name} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1 text-xs">
                <span className="font-bold text-slate-900 block">{inp.name}</span>
                <p className="text-slate-600">{inp.use}</p>
                <p className="text-[11px] font-mono text-slate-500">{inp.visual}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
