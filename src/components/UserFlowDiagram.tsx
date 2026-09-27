import React from 'react';
import { USER_FLOW_STEPS } from '../data/dvcData';
import { ArrowRight, CheckCircle, HelpCircle, Shield, CornerDownRight } from 'lucide-react';

export const UserFlowDiagram: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E3ECE3] shadow-xs p-5 md:p-7 space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF4ED] text-[#34523C] border border-[#DCE7DC]">
            TUGAS 4 · POIN 1: TENTUKAN USER FLOW
          </span>
          <span className="text-xs text-[#7B9582] font-mono">From Research to Structure</span>
        </div>
        <h2 className="text-lg md:text-xl font-bold text-[#1E2E23] mt-1 font-heading">
          Diagram Alur Pengguna (User Flow) RuangTenang
        </h2>
        <p className="text-xs text-[#5D7765] mt-0.5">
          Gagasan alur utama mahasiswa mengatasi krisis mental: Home → Evaluasi Masalah → Pilih Solusi (Konsultasi/Forum/Tracker) → Penanganan Selesai.
        </p>
      </div>

      {/* Visual Flowchart Summary */}
      <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#E3ECE3] overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] text-xs">
          <div className="px-3.5 py-2.5 bg-[#37523E] text-white rounded-xl font-bold text-center shadow-xs">
            Mulai: Mahasiswa Merasa Kewalahan
          </div>
          <ArrowRight className="w-4 h-4 text-[#8BA491]" />
          <div className="px-3.5 py-2.5 bg-white border border-[#D5E2D5] text-[#294231] rounded-xl font-semibold text-center shadow-2xs">
            Screen 1: Beranda & Mood Check-in
          </div>
          <ArrowRight className="w-4 h-4 text-[#8BA491]" />
          <div className="px-3.5 py-2.5 bg-[#EDF4ED] border border-[#CCDCCD] text-[#304B37] rounded-xl font-semibold text-center">
            Titik Keputusan Kebutuhan
          </div>
          <ArrowRight className="w-4 h-4 text-[#8BA491]" />
          <div className="px-3.5 py-2.5 bg-white border border-[#D5E2D5] text-[#294231] rounded-xl font-semibold text-center shadow-2xs">
            Screen 2 / 3 / 4 (Solusi Spesifik)
          </div>
          <ArrowRight className="w-4 h-4 text-[#8BA491]" />
          <div className="px-3.5 py-2.5 bg-[#4D7356] text-white rounded-xl font-bold text-center shadow-xs">
            Peredaan Stres / Penanganan Selesai
          </div>
        </div>
      </div>

      {/* Step by Step Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {USER_FLOW_STEPS.map((step) => (
          <div key={step.stepNumber} className="p-5 rounded-2xl border border-[#E3ECE3] bg-[#FAFBF9] space-y-3 hover:border-[#CCDCCD] transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF4ED] text-[#34523C]">
                LANGKAH 0{step.stepNumber}
              </span>
              <span className="text-xs font-bold text-[#1F2F23] font-heading">{step.screenTitle}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-[#203125] block text-[11px] uppercase tracking-wide">Aksi Pengguna:</strong>
                <p className="text-[#556E5D] mt-0.5">{step.userAction}</p>
              </div>

              <div>
                <strong className="text-[#203125] block text-[11px] uppercase tracking-wide">Respons Sistem:</strong>
                <p className="text-[#556E5D] mt-0.5">{step.systemResponse}</p>
              </div>

              {step.decisionPoint && (
                <div className="p-3 rounded-xl bg-white border border-[#D8E6D8] text-[#294231]">
                  <strong className="block text-[11px] font-bold">Titik Percabangan Logika:</strong>
                  <p className="text-[11px] mt-0.5 text-[#556E5D]">{step.decisionPoint}</p>
                </div>
              )}

              <div className="pt-2 border-t border-[#EAEFEA] text-[11px] text-[#6E8875]">
                <span className="font-semibold text-[#37523E]">Rasional Riset: </span>
                {step.researchEvidence}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
