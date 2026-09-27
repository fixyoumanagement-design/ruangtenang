import React, { useState } from 'react';
import { ScreenData, DvcPrincipleNote } from '../types';
import { 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Eye, 
  ShieldCheck, 
  Scale, 
  Maximize2,
  FileCheck2,
  BookOpen
} from 'lucide-react';

interface DvcBreakdownProps {
  currentScreen: ScreenData;
  selectedAnnotation: number | null;
  onSelectAnnotation: (index: number) => void;
}

export const DvcBreakdown: React.FC<DvcBreakdownProps> = ({
  currentScreen,
  selectedAnnotation,
  onSelectAnnotation
}) => {
  const [activeTab, setActiveTab] = useState<'principles' | 'checklist' | 'theory' | 'psychology'>('principles');

  return (
    <div className="bg-white rounded-3xl border border-[#E3ECE3] shadow-xs p-5 md:p-7 space-y-6">
      {/* Header section with expert badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EDF3ED]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF4ED] text-[#34523C] border border-[#DCE7DC]">
              BEDAH DVC SESI 1–4
            </span>
            <span className="text-xs text-[#7B9582] font-mono">From Research to Structure</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-[#1E2E23] mt-1 font-heading">
            Analisis Rasional: {currentScreen.title}
          </h2>
          <p className="text-xs text-[#5D7765] mt-0.5">
            Menghubungkan riset pengguna (Sesi 3) dengan arsitektur wireframe (Sesi 4) secara teoritis dan rasional.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-[#EDF3ED] p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('principles')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'principles' ? 'bg-white text-[#294231] shadow-xs font-bold' : 'text-[#587360] hover:text-[#294231]'
            }`}
          >
            Prinsip Desain (CRAP)
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'checklist' ? 'bg-white text-[#294231] shadow-xs font-bold' : 'text-[#587360] hover:text-[#294231]'
            }`}
          >
            Checklist Sesi 4
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'theory' ? 'bg-white text-[#294231] shadow-xs font-bold' : 'text-[#587360] hover:text-[#294231]'
            }`}
          >
            Warna & Tipografi
          </button>
          <button
            onClick={() => setActiveTab('psychology')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'psychology' ? 'bg-white text-[#294231] shadow-xs font-bold' : 'text-[#587360] hover:text-[#294231]'
            }`}
          >
            Etika & HCD
          </button>
        </div>
      </div>

      {/* TAB 1: PRINSIP CRAP & RASIONALISASI DESAIN */}
      {activeTab === 'principles' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900">Fondasi Teori (Robin Williams, 2015 & Don Norman, 2013):</span>
            Setiap komponen pada wireframe ini diletakkan bukan atas dasar "terlihat bagus", melainkan untuk mengurangi beban kognitif (cognitive load) mahasiswa yang sedang berada di bawah tekanan emosional dan akademik.
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentScreen.dvcNotes.map((note, idx) => {
              const isSelected = selectedAnnotation === (idx + 1);
              return (
                <div
                  key={note.target}
                  onClick={() => onSelectAnnotation(idx + 1)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-200'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-sm text-neutral-900">{note.target}</span>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      Prinsip: {note.principle}
                    </span>
                  </div>

                  {/* Rationale explanation */}
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed pl-7 mb-2">
                    {note.rationale}
                  </p>

                  <div className="pl-7 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100 text-slate-500">
                    <div>
                      <strong className="text-slate-700">Hubungan Riset Sesi 3: </strong>
                      {note.researchLink}
                    </div>
                    <div>
                      <strong className="text-slate-700">Referensi Materi: </strong>
                      {note.lessonRef}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CHECKLIST EVALUASI WIREFRAME SESI 04 */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            <span className="font-bold">Checklist Sesi 04 (Slide 13):</span> Gunakan 4 parameter ini sebelum memindahkan wireframe ke tahap High-Fidelity atau riset pengujian lanjutan.
          </div>

          <div className="space-y-3">
            {currentScreen.testingChecklist.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs md:text-sm">
                  <h4 className="font-bold text-slate-900 mb-0.5">{item.question}</h4>
                  <p className="text-slate-600 leading-relaxed text-xs">{item.explanation}</p>
                </div>
              </div>
            ))}

            {/* General Evaluative Checklist */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Skor Evaluasi Menyeluruh untuk Halaman Ini:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-600 font-black text-sm block">100%</span>
                  <span className="text-[10px] text-slate-500">Kesesuaian Riset</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-600 font-black text-sm block">A+</span>
                  <span className="text-[10px] text-slate-500">Prinsip CRAP</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-600 font-black text-sm block">Konsisten</span>
                  <span className="text-[10px] text-slate-500">Komponen & Grid</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-600 font-black text-sm block">&lt; 3 Detik</span>
                  <span className="text-[10px] text-slate-500">Kejelasan CTA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WARNA & TIPOGRAFI (SESI 01) */}
      {activeTab === 'theory' && (
        <div className="space-y-4 text-xs md:text-sm text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Color 60-30-10 Rule */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                <Scale className="w-4 h-4 text-indigo-600" />
                <span>Aturan Praktis Warna 60-30-10 (Sesi 01)</span>
              </h3>
              
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">60% Dominan (Latar Bersih)</span>
                    <span className="text-slate-500">Soft Light Neutral (#F8FAFC)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="w-[60%] h-full bg-slate-200"></div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Memberikan ruang napas visual dan mengurangi ketegangan mata bagi mahasiswa yang kurang tidur.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">30% Pendukung (Struktur & Kartu)</span>
                    <span className="text-slate-500">Slate / Deep Navy (#1E293B)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="w-[30%] h-full bg-slate-600"></div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Memberikan kontur hierarki pada container, teks judul, dan pembatas konten.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">10% Aksen (CTA & Status)</span>
                    <span className="text-slate-500">Teal Ketenangan & Rose Darurat</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="w-[10%] h-full bg-teal-500"></div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hanya dipakai untuk tombol tindakan penting ("Mulai Chat", "SOS Darurat"). Tidak saling berebut perhatian.
                  </p>
                </div>
              </div>
            </div>

            {/* Typography Hierarchy */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Sistem Tipografi & Uji 3 Detik (Sesi 01)</span>
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-mono text-indigo-700 block">HEADING 1 · 24-28px Semi-Bold</span>
                  <span className="font-bold text-sm text-slate-900">Judul Layanan & Sapaan Mahasiswa</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-mono text-indigo-700 block">SUBHEADING · 16-18px Medium</span>
                  <span className="font-medium text-xs text-slate-800">Nama Konselor / Kategori Diskusi</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-mono text-indigo-700 block">BODY TEXT · 14px Regular (Line-height 1.5)</span>
                  <span className="text-xs text-slate-600">Isi curhat forum, penjelasan durasi tidur</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-mono text-indigo-700 block">CAPTION / BADGE · 10-12px Muted</span>
                  <span className="text-[11px] text-slate-500">Cap waktu, status enkripsi, rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ETIKA BISNIS DIGITAL & HUMAN-CENTERED DESIGN (SESI 02) */}
      {activeTab === 'psychology' && (
        <div className="space-y-4 text-xs md:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
            <h3 className="font-bold text-sm mb-1 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Pencegahan Dark Pattern pada Produk Kesehatan Mental (Sesi 02)</span>
            </h3>
            <p className="text-xs leading-relaxed">
              Mahasiswa dalam kondisi stres atau panik sangat rentan terhadap manipulasi antarmuka. Produk ini menerapkan prinsip Zero Dark-Pattern secara ketat:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h4 className="font-bold text-rose-700 mb-1">✕ Anti Confirmshaming</h4>
              <p className="text-slate-600">
                Tidak ada teks manipulatif seperti: <em>"Tidak, saya memilih membiarkan masalah skripsi saya memburuk"</em> ketika pengguna ingin menutup tawaran bimbingan.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h4 className="font-bold text-rose-700 mb-1">✕ Anti Roach Motel & Forced Login</h4>
              <p className="text-slate-600">
                Pengguna tidak dipaksa mengisi 15 kolom formulir atau login via media sosial sebelum dapat mengakses tombol hotline krisis atau membaca panduan tidur.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h4 className="font-bold text-rose-700 mb-1">✓ Privasi Anonimitas Murni</h4>
              <p className="text-slate-600">
                Data tidur dan postingan curhat dienkripsi dengan ID hash unik tanpa menautkan NIM (Nomor Induk Mahasiswa) ke database publik kampus.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h4 className="font-bold text-rose-700 mb-1">✓ Transparansi Bantuan Krisis</h4>
              <p className="text-slate-600">
                Nomor kontak darurat 119 dan satgas kampus ditampilkan tanpa tautan afiliasi komersial berbayar (100% didanai kampus/kemenkes).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
