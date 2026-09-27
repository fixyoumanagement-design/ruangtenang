import React, { useState } from 'react';
import { ScreenId, FidelityMode } from '../types';
import { SCREENS } from '../data/dvcData';
import { ScreenMockups } from './ScreenMockups';
import { DvcBreakdown } from './DvcBreakdown';
import { UserFlowDiagram } from './UserFlowDiagram';
import { ComponentSystemView } from './ComponentSystemView';
import { FigmaDesignSystemView } from './FigmaDesignSystemView';
import { AssignmentExport } from './AssignmentExport';
import { 
  Layout, 
  BookOpen, 
  GitBranch, 
  Component, 
  FileText, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  Figma,
  X
} from 'lucide-react';

interface DvcAssignmentStudioProps {
  onClose: () => void;
}

export const DvcAssignmentStudio: React.FC<DvcAssignmentStudioProps> = ({ onClose }) => {
  const [activeScreenId, setActiveScreenId] = useState<ScreenId>('home');
  const [fidelity, setFidelity] = useState<FidelityMode>('high-fi');
  const [activeTab, setActiveTab] = useState<'canvas' | 'critique' | 'flow' | 'components' | 'figma' | 'export'>('canvas');
  const [selectedAnnotation, setSelectedAnnotation] = useState<number | null>(null);

  const currentScreen = SCREENS.find(s => s.id === activeScreenId) || SCREENS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Academic Context Header */}
      <div className="bg-white rounded-3xl border border-[#D5E2D5] p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF4ED] text-[#2F4B36] border border-[#CCDCCD]">
              STUDIO AKADEMIK DVC · SESI 4
            </span>
            <span className="text-xs text-[#6B8573]">Universitas Cakrawala</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1E2E23] font-heading">
            Arsitektur Wireframe & Bedah Desain Komunikasi Visual
          </h2>
          <p className="text-xs text-[#526B5A]">
            Rubrik Penilaian Tugas 4: 5 Layar High-Fi (Benchmark Solma), User Flow, Sistem Komponen Figma, Prinsip CRAP, dan Laporan.
          </p>
        </div>

        <button
          onClick={onClose}
          className="self-start md:self-center px-4 py-2 rounded-xl bg-[#EDF4ED] hover:bg-[#DDE9DD] text-[#284130] font-bold text-xs flex items-center space-x-1.5 transition-all shadow-2xs"
        >
          <X className="w-3.5 h-3.5" />
          <span>Kembali ke Website RuangTenang</span>
        </button>
      </div>

      {/* Academic Sub-Navigation Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto bg-white p-1.5 rounded-2xl border border-[#E3ECE3] text-xs font-semibold text-[#4C6654]">
        <button
          onClick={() => setActiveTab('canvas')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'canvas' ? 'bg-[#37523E] text-white shadow-xs font-bold' : 'hover:text-[#1E2E23]'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>1. Kanvas 5 Layar</span>
        </button>

        <button
          onClick={() => setActiveTab('critique')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'critique' ? 'bg-[#37523E] text-white shadow-xs font-bold' : 'hover:text-[#1E2E23]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>2. Bedah Teori Desain (CRAP)</span>
        </button>

        <button
          onClick={() => setActiveTab('flow')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'flow' ? 'bg-[#37523E] text-white shadow-xs font-bold' : 'hover:text-[#1E2E23]'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>3. User Flow</span>
        </button>

        <button
          onClick={() => setActiveTab('components')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'components' ? 'bg-[#37523E] text-white shadow-xs font-bold' : 'hover:text-[#1E2E23]'
          }`}
        >
          <Component className="w-3.5 h-3.5" />
          <span>4. Sistem Komponen</span>
        </button>

        <button
          onClick={() => setActiveTab('figma')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'figma' ? 'bg-[#37523E] text-white shadow-xs font-bold' : 'hover:text-[#1E2E23]'
          }`}
        >
          <Figma className="w-3.5 h-3.5 text-emerald-300" />
          <span>5. Panduan & Token Figma</span>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'export' ? 'bg-[#24392B] text-white shadow-xs font-bold' : 'hover:text-[#1E2E23]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>6. Ekspor Laporan Tugas 4</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. KANVAS WIREFRAME */}
      {activeTab === 'canvas' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#E3ECE3] p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs font-semibold">
              {SCREENS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveScreenId(s.id);
                    setSelectedAnnotation(null);
                  }}
                  className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    activeScreenId === s.id
                      ? 'bg-[#2D4534] text-white shadow-xs'
                      : 'bg-[#F2F6F2] text-[#4A6452] hover:bg-[#E5ECE5]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px]">
                    {s.number}
                  </span>
                  <span>{s.title.split('(')[0]}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-1.5 bg-[#EDF3ED] p-1 rounded-2xl text-xs font-semibold shrink-0">
              <button
                onClick={() => setFidelity('low-fi')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  fidelity === 'low-fi' ? 'bg-white text-[#243B2B] shadow-xs font-bold' : 'text-[#4F6956] hover:text-[#243B2B]'
                }`}
              >
                Low-Fi Wireframe
              </button>
              <button
                onClick={() => setFidelity('high-fi')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  fidelity === 'high-fi' ? 'bg-white text-[#243B2B] shadow-xs font-bold' : 'text-[#4F6956] hover:text-[#243B2B]'
                }`}
              >
                Visual Halus
              </button>
              <button
                onClick={() => setFidelity('annotated')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1 ${
                  fidelity === 'annotated' ? 'bg-[#537D5C] text-white shadow-xs font-bold' : 'text-[#4F6956] hover:text-[#243B2B]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Anotasi DVC</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <ScreenMockups
                screenId={activeScreenId}
                fidelity={fidelity}
                onSelectScreen={(id) => {
                  setActiveScreenId(id);
                  setSelectedAnnotation(null);
                }}
                selectedAnnotation={selectedAnnotation}
                onSelectAnnotation={(idx) => setSelectedAnnotation(idx)}
              />
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl border border-[#E3ECE3] p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#EDF4ED] text-[#36573E]">
                    SCREEN {currentScreen.number} DARI 5
                  </span>
                  <button
                    onClick={() => setActiveTab('critique')}
                    className="text-xs font-bold text-[#37523E] hover:underline flex items-center space-x-1"
                  >
                    <span>Bedah CRAP</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <h3 className="font-bold text-[#1F2F23] text-sm md:text-base font-heading">
                  {currentScreen.title}
                </h3>

                <div className="text-xs space-y-2 text-[#4D6653]">
                  <div>
                    <strong className="text-[#203125] block text-[11px] uppercase tracking-wide">Tujuan Layar:</strong>
                    <p className="mt-0.5">{currentScreen.purpose}</p>
                  </div>
                  <div>
                    <strong className="text-[#203125] block text-[11px] uppercase tracking-wide">Tugas Pengguna:</strong>
                    <p className="mt-0.5">{currentScreen.userGoal}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EDF3ED]">
                  <strong className="text-[#203125] block text-[11px] uppercase tracking-wide mb-1.5">
                    Komponen Utama:
                  </strong>
                  <ul className="text-xs space-y-1 text-[#4F6956]">
                    {currentScreen.keyComponents.map((comp, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#537D5C] shrink-0 mt-0.5" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BEDAH TEORI DESAIN */}
      {activeTab === 'critique' && (
        <DvcBreakdown
          currentScreen={currentScreen}
          selectedAnnotation={selectedAnnotation}
          onSelectAnnotation={(idx) => setSelectedAnnotation(idx)}
        />
      )}

      {/* 3. USER FLOW */}
      {activeTab === 'flow' && <UserFlowDiagram />}

      {/* 4. SISTEM KOMPONEN */}
      {activeTab === 'components' && <ComponentSystemView />}

      {/* 5. PANDUAN & TOKEN FIGMA (BENCHMARK SOLMA) */}
      {activeTab === 'figma' && <FigmaDesignSystemView />}

      {/* 6. EKSPOR LAPORAN */}
      {activeTab === 'export' && <AssignmentExport />}
    </div>
  );
};
