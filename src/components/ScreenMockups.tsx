import React, { useState } from 'react';
import { ScreenId, FidelityMode } from '../types';
import { 
  PhoneCall, 
  MessageSquare, 
  Moon, 
  Users, 
  Heart, 
  ShieldCheck, 
  ChevronRight, 
  Search, 
  Lock, 
  Sparkles,
  ArrowRight,
  Send,
  Flag,
  Calendar,
  Clock,
  ThumbsUp,
  AlertTriangle,
  Info,
  Headphones
} from 'lucide-react';

interface ScreenMockupsProps {
  screenId: ScreenId;
  fidelity: FidelityMode;
  onSelectScreen?: (id: ScreenId) => void;
  selectedAnnotation?: number | null;
  onSelectAnnotation?: (index: number) => void;
}

export const ScreenMockups: React.FC<ScreenMockupsProps> = ({
  screenId,
  fidelity,
  onSelectScreen,
  selectedAnnotation,
  onSelectAnnotation
}) => {
  const isLoFi = fidelity === 'low-fi';
  const isAnnotated = fidelity === 'annotated';

  // Interactive mock state
  const [selectedMood, setSelectedMood] = useState<string>('Netral');
  const [consultationFilter, setConsultationFilter] = useState<string>('Semua');
  const [forumFilter, setForumFilter] = useState<string>('Semua');
  const [isAnonymousPost, setIsAnonymousPost] = useState<boolean>(true);
  const [sleepHours, setSleepHours] = useState<number>(6.5);
  const [showCrisisModal, setShowCrisisModal] = useState<boolean>(screenId === 'emergency');

  // Annotation Badge component
  const Badge = ({ num, text }: { num: number; text: string }) => {
    if (!isAnnotated) return null;
    const isSelected = selectedAnnotation === num;
    return (
      <button
        onClick={() => onSelectAnnotation?.(num)}
        title={text}
        className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full transition-transform z-20 shadow-md ${
          isSelected 
            ? 'bg-amber-500 text-white scale-125 ring-2 ring-amber-300' 
            : 'bg-rose-600 text-white hover:bg-rose-700 hover:scale-110'
        }`}
      >
        {num}
      </button>
    );
  };

  // Wireframe Placeholder Box
  const WireframePlaceholder = ({ 
    className = "", 
    height = "h-24", 
    label = "Image / Media Box" 
  }: { 
    className?: string; 
    height?: string; 
    label?: string; 
  }) => {
    if (!isLoFi && !isAnnotated) return null;
    return (
      <div className={`relative border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-mono select-none ${height} ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <span className="bg-gray-200 px-2 py-0.5 rounded text-[11px] font-medium z-10">{label}</span>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Device Chrome / Browser Frame */}
      <div className={`rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border ${
        isLoFi 
          ? 'bg-neutral-50 border-neutral-300' 
          : 'bg-slate-900/5 border-slate-200'
      }`}>
        {/* Top Browser Bar */}
        <div className={`px-4 py-3 flex items-center justify-between border-b ${
          isLoFi ? 'bg-neutral-200 border-neutral-300' : 'bg-slate-100 border-slate-200'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="ml-2 text-xs font-mono text-neutral-600 hidden sm:inline">
              https://ruangtenang.kampus.ac.id/{screenId}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              isLoFi ? 'bg-neutral-300 text-neutral-800' : 'bg-teal-100 text-teal-800'
            }`}>
              {isLoFi ? 'MODE: WIREFRAME LOW-FIDELITY (SESI 04)' : 'MODE: HIGH-FIDELITY INTERACTIVE'}
            </span>
          </div>
        </div>

        {/* Mock Application Container */}
        <div className={`p-4 md:p-6 min-h-[640px] ${isLoFi ? 'bg-neutral-100 text-neutral-900 font-sans' : 'bg-slate-50 text-slate-800'}`}>
          
          {/* App Header Bar (Consistent Component across all screens) */}
          <header className={`flex items-center justify-between pb-4 mb-6 border-b ${
            isLoFi ? 'border-neutral-300' : 'border-slate-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                isLoFi ? 'bg-neutral-400 text-white' : 'bg-teal-600 text-white shadow-sm'
              }`}>
                RT
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-bold text-base md:text-lg tracking-tight">RuangTenang</h1>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    isLoFi ? 'bg-neutral-300 text-neutral-700' : 'bg-teal-50 text-teal-700 border border-teal-200'
                  }`}>
                    KampusCare
                  </span>
                </div>
                <p className="text-xs text-neutral-500">Kesehatan Mental & Kesejahteraan Mahasiswa</p>
              </div>
            </div>

            {/* Quick Actions & Emergency Hotline Trigger */}
            <div className="flex items-center space-x-3">
              {/* Privacy badge */}
              <div className="hidden sm:flex items-center space-x-1 text-xs text-neutral-500 bg-neutral-200/60 px-2 py-1 rounded">
                <Lock className="w-3.5 h-3.5 text-neutral-600" />
                <span>Anonim & Enkripsi E2E</span>
              </div>

              {/* SOS Emergency Button */}
              <div className="relative">
                <Badge num={1} text="Prinsip Contrast: Tombol SOS kontras tinggi untuk pemindaian instan saat krisis" />
                <button
                  id="header-crisis-sos-btn"
                  onClick={() => setShowCrisisModal(true)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all shadow-sm ${
                    isLoFi 
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800 ring-2 ring-neutral-400' 
                      : 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-rose-500/25 ring-2 ring-rose-300'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                  <span>SOS KRISIS 24J</span>
                </button>
              </div>
            </div>
          </header>

          {/* SCREEN CONTENT CONDITIONAL RENDERING */}

          {/* SCREEN 1: BERANDA MAHASISWA */}
          {screenId === 'home' && (
            <div className="space-y-6">
              {/* Mood Check-In Widget (Empathize & Proximity) */}
              <div className={`p-4 rounded-xl border relative ${
                isLoFi ? 'bg-white border-neutral-300' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-sm md:text-base font-bold text-neutral-900 font-heading">
                      Bagaimana perasaanmu hari ini, Teman?
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Check-in 5 detik untuk membantu melacak stres akademik & tidurmu.
                    </p>
                  </div>
                  <Badge num={2} text="Prinsip Proximity: Menempatkan input emotikon mood dalam satu kontainer rapat" />
                </div>

                <div className="grid grid-cols-5 gap-2 pt-1">
                  {[
                    { level: '1', label: 'Tenang' },
                    { level: '2', label: 'Biasa' },
                    { level: '3', label: 'Cemas' },
                    { level: '4', label: 'Kewalahan' },
                    { level: '5', label: 'Kurang Tidur' }
                  ].map((m) => (
                    <button
                      key={m.label}
                      onClick={() => setSelectedMood(m.label)}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        selectedMood === m.label
                          ? isLoFi
                            ? 'bg-neutral-800 text-white border-neutral-900 font-bold'
                            : 'bg-[#E2EFE3] border-[#3C5E45] text-[#1C2D22] font-bold ring-2 ring-[#4A7053]/20'
                          : isLoFi
                            ? 'bg-neutral-100 border-neutral-200 hover:bg-neutral-200 text-neutral-800'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="font-mono text-sm font-bold block mb-1">Skala {m.level}</span>
                      <span className="text-[11px] block truncate">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Core Services Section (Alignment & Card Hierarchy) */}
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
                      3 Layanan Inti Mahasiswa (Solusi Riset Sesi 3)
                    </h3>
                  </div>
                  <Badge num={3} text="Prinsip Alignment & Repetition: Grid 3 kolom dengan struktur visual konsisten" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Konsultasi */}
                  <div 
                    onClick={() => onSelectScreen?.('consultation')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] ${
                      isLoFi ? 'bg-white border-neutral-300 hover:border-neutral-500' : 'bg-white border-slate-200 hover:border-[#3C5E45] hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isLoFi ? 'bg-neutral-300 text-neutral-800' : 'bg-[#E2EFE3] text-[#2D4B36]'
                      }`}>
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Online (14 Konselor)
                      </span>
                    </div>
                    <h4 className="font-bold text-sm md:text-base mb-1 font-heading">Konsultasi Sebaya</h4>
                    <p className="text-xs text-neutral-500 mb-4 line-clamp-2">
                      Chat privat & rahasia bersama peer supporter atau psikolog kampus terverifikasi.
                    </p>
                    <button className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 ${
                      isLoFi ? 'bg-neutral-900 text-white' : 'bg-[#2D4B36] text-white hover:bg-[#1E3626]'
                    }`}>
                      <span>Cari Konselor</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 2: Forum Anonim */}
                  <div 
                    onClick={() => onSelectScreen?.('forum')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] ${
                      isLoFi ? 'bg-white border-neutral-300 hover:border-neutral-500' : 'bg-white border-slate-200 hover:border-[#A64F2C] hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isLoFi ? 'bg-neutral-300 text-neutral-800' : 'bg-[#FFF0E8] text-[#A64F2C]'
                      }`}>
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFF2EB] text-[#A64F2C]">
                        Moderasi Ketat
                      </span>
                    </div>
                    <h4 className="font-bold text-sm md:text-base mb-1 font-heading">Forum Aman Anonim</h4>
                    <p className="text-xs text-neutral-500 mb-4 line-clamp-2">
                      Ruang curhat bebas intimidasi seputar stres skripsi, perantauan, dan anti-bullying.
                    </p>
                    <button className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 ${
                      isLoFi ? 'bg-neutral-900 text-white' : 'bg-[#A64F2C] text-white hover:bg-[#883C1E]'
                    }`}>
                      <span>Buka Diskusi</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 3: Tracker Tidur */}
                  <div 
                    onClick={() => onSelectScreen?.('sleep')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] ${
                      isLoFi ? 'bg-white border-neutral-300 hover:border-neutral-500' : 'bg-white border-slate-200 hover:border-[#344E82] hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isLoFi ? 'bg-neutral-300 text-neutral-800' : 'bg-[#E8EEFA] text-[#344E82]'
                      }`}>
                        <Moon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EFF3FB] text-[#344E82]">
                        Target 7-8 Jam
                      </span>
                    </div>
                    <h4 className="font-bold text-sm md:text-base mb-1 font-heading">Tracker Tidur & Mood</h4>
                    <p className="text-xs text-neutral-500 mb-4 line-clamp-2">
                      Pantau ritme sirkadian dan hubungan antara jam begadang dengan konsentrasi kuliah.
                    </p>
                    <button className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 ${
                      isLoFi ? 'bg-neutral-900 text-white' : 'bg-[#344E82] text-white hover:bg-[#253961]'
                    }`}>
                      <span>Catat Tidur</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Insight Card (Negative Space & Visual Balance) */}
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isLoFi ? 'bg-neutral-200 border-neutral-300' : 'bg-[#24392B] text-white border-[#1B2C21]'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isLoFi ? 'bg-neutral-400 text-white' : 'bg-white/15 text-[#D2E7D5]'
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm font-heading">Temuan Riset Mahasiswa Cakrawala (2025)</h4>
                    <p className={`text-xs ${isLoFi ? 'text-neutral-600' : 'text-[#CCDED0]'}`}>
                      "16.7% mahasiswa mengalami kecemasan berat saat skripsi. Kamu tidak sendirian berjuang."
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onSelectScreen?.('forum')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap ${
                    isLoFi ? 'bg-neutral-900 text-white' : 'bg-white text-[#203627] hover:bg-[#F2F6F2]'
                  }`}
                >
                  Baca Cerita Teman Sebaya
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 2: LAYANAN KONSULTASI */}
          {screenId === 'consultation' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base md:text-lg font-bold">Pilih Peer Supporter & Konselor</h2>
                  <p className="text-xs text-neutral-500">
                    Teman sebaya terverifikasi yang siap mendengarkan tanpa menghakimi.
                  </p>
                </div>
                <Badge num={1} text="Prinsip Filter Proximity: Mengelompokkan chip topik masalah mahasiswa" />
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
                {['Semua', 'Stres Skripsi', 'Adaptasi Perantau', 'Gangguan Tidur', 'Keluarga & Relasi'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setConsultationFilter(tab)}
                    className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                      consultationFilter === tab
                        ? isLoFi
                          ? 'bg-neutral-800 text-white font-bold'
                          : 'bg-teal-600 text-white font-bold'
                        : isLoFi
                          ? 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Counselor Card List (Repetition of Card Component) */}
              <div className="space-y-3 relative">
                <Badge num={2} text="Prinsip Hierarki & Repetition: Desain kartu konselor konsisten dengan alur CTA jelas" />
                
                {[
                  {
                    name: "Nabila, S.Psi (Peer Supporter)",
                    faculty: "Alumni Psikologi · Konselor Sebaya Terlatih",
                    specialty: "Spesialisasi: Burnout Skripsi & Perfeksionisme",
                    rating: "4.9 (84 sesi)",
                    status: "Tersedia Hari Ini (14.00 - 17.00)",
                    isOnline: true
                  },
                  {
                    name: "Dimas Arya (Konselor Mahasiswa)",
                    faculty: "Fakultas Teknik · Mahasiswa Perantau",
                    specialty: "Spesialisasi: Homesick, Adaptasi Rantau, Isolasi Sosial",
                    rating: "4.8 (62 sesi)",
                    status: "Tersedia Malam Ini (19.00 - 21.00)",
                    isOnline: true
                  },
                  {
                    name: "dr. Sarah Sp.KJ (Konsultan Medis)",
                    faculty: "Layanan Kesehatan Kampus",
                    specialty: "Spesialisasi: Gangguan Tidur Kronis & Kecemasan Klinis",
                    rating: "5.0 (120 sesi)",
                    status: "Besok (09.00 - 12.00)",
                    isOnline: false
                  }
                ].map((c, idx) => (
                  <div
                    key={c.name}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                      isLoFi ? 'bg-white border-neutral-300' : 'bg-white border-slate-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {isLoFi ? (
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-neutral-400 bg-neutral-200 flex items-center justify-center text-[10px] font-mono text-neutral-600 shrink-0">
                          Foto
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-800 font-bold shrink-0">
                          {c.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-sm md:text-base">{c.name}</h4>
                          <span className={`w-2 h-2 rounded-full ${c.isOnline ? 'bg-emerald-500' : 'bg-neutral-400'}`}></span>
                        </div>
                        <p className="text-xs text-neutral-500">{c.faculty}</p>
                        <p className="text-xs font-medium text-neutral-700 mt-1">{c.specialty}</p>
                        <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-neutral-500">
                          <span>★ {c.rating}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{c.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                      <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        100% Subsidi Kampus
                      </span>
                      <button 
                        onClick={() => alert(`Memulai alur reservasi chat privat dengan ${c.name}. Identitasmu terlindungi secara anonim.`)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          isLoFi 
                            ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
                            : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                        }`}
                      >
                        Pilih Jadwal Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 3: FORUM AMAN ANONIM */}
          {screenId === 'forum' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base md:text-lg font-bold">Forum Diskusi Anonim & Anti-Bullying</h2>
                  <p className="text-xs text-neutral-500">
                    Bebas berekspresi tanpa takut dihakimi. Moderasi aktif 24 jam dengan AI Filter.
                  </p>
                </div>
                <Badge num={1} text="Etika Digital & Anti-Bullying: Menampilkan standar komunitas & tombol pelaporan" />
              </div>

              {/* Safety Guideline Alert */}
              <div className={`p-3 rounded-lg border text-xs flex items-start space-x-2.5 ${
                isLoFi ? 'bg-neutral-200 border-neutral-300 text-neutral-800' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
              }`}>
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Ruang Bebas Penghakiman:</span>
                  Dilarang menyebarkan identitas pribadi (doxing), ujaran kebencian, atau meremehkan perjuangan akademik orang lain.
                </div>
              </div>

              {/* Post Input Box Component */}
              <div className={`p-4 rounded-xl border space-y-3 relative ${
                isLoFi ? 'bg-white border-neutral-300' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <Badge num={2} text="Prinsip HCD: Toggle anonimitas aktif secara default untuk rasa aman" />
                <textarea
                  rows={2}
                  placeholder="Ceritakan keresahanmu... (misal: kebuntuan revisi skripsi bab 4, rasa sepi di kosan)"
                  className="w-full text-xs md:text-sm p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-neutral-50/50"
                ></textarea>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2 cursor-pointer text-xs">
                      <input 
                        type="checkbox" 
                        checked={isAnonymousPost} 
                        onChange={(e) => setIsAnonymousPost(e.target.checked)}
                        className="rounded text-teal-600 focus:ring-teal-500" 
                      />
                      <span className="font-semibold text-neutral-700">Posting sebagai Anonim (#PejuangSkripsi44)</span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <select className="text-xs p-1.5 rounded border border-neutral-300 bg-white">
                      <option>#CurhatSkripsi</option>
                      <option>#HomesickRantau</option>
                      <option>#TipsInsomnia</option>
                      <option>#KesehatanMental</option>
                    </select>
                    <button 
                      onClick={() => alert("Curhat berhasil dikirim secara anonim dan masuk moderasi AI.")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 ${
                        isLoFi ? 'bg-neutral-900 text-white' : 'bg-teal-600 text-white hover:bg-teal-700'
                      }`}
                    >
                      <Send className="w-3 h-3" />
                      <span>Kirim Aman</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Forum Feed List */}
              <div className="space-y-3">
                {[
                  {
                    alias: "Anonim Pejuang Bab 4",
                    time: "15 menit lalu",
                    tag: "#CurhatSkripsi",
                    content: "Sudah seminggu revisian gak dibalas dosen pembimbing, tidur tiap malam jam 3 pagi karena kepikiran terus. Ada yang ngerasain hal sama? Rasanya mau nyerah tapi sayang orang tua di kampung.",
                    hugs: 28,
                    comments: 9
                  },
                  {
                    alias: "Anak Rantau Sumatera",
                    time: "1 jam lalu",
                    tag: "#HomesickRantau",
                    content: "Pertama kali sakit tipes sendirian di kosan. Kangen masakan ibu dan gak berani cerita ke rumah biar orang tua gak cemas. Makasih buat teman-teman di sini yang selalu saling semangatin.",
                    hugs: 45,
                    comments: 14
                  }
                ].map((post, idx) => (
                  <div 
                    key={post.alias}
                    className={`p-4 rounded-xl border transition-all ${
                      isLoFi ? 'bg-white border-neutral-300' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-neutral-300 flex items-center justify-center text-[10px] font-bold">
                          ?
                        </div>
                        <span className="text-xs font-bold">{post.alias}</span>
                        <span className="text-[11px] text-neutral-400">• {post.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-medium">
                          {post.tag}
                        </span>
                        <button title="Laporkan Pelanggaran" className="text-neutral-400 hover:text-red-500">
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-neutral-800 leading-relaxed mb-3">
                      {post.content}
                    </p>

                    <div className="flex items-center space-x-4 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
                      <button className="flex items-center space-x-1.5 hover:text-rose-600 transition-colors">
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        <span>Kirim Peluk ({post.hugs})</span>
                      </button>
                      <button className="flex items-center space-x-1.5 hover:text-teal-600 transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Komentar ({post.comments})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 4: SLEEP TRACKER */}
          {screenId === 'sleep' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base md:text-lg font-bold">Tracker Kualitas Tidur & Ritme Sirkadian</h2>
                  <p className="text-xs text-neutral-500">
                    Memantau pola tidur dan pengaruhnya pada tingkat stres mahasiswa.
                  </p>
                </div>
                <Badge num={1} text="Prinsip Alignment: Diagram grafik dan baseline selaras rata horizontal" />
              </div>

              {/* Quick Input Bar */}
              <div className={`p-4 rounded-xl border relative ${
                isLoFi ? 'bg-white border-neutral-300' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500 mb-3">
                  Catat Jam Tidur Semalam
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-neutral-600 block mb-1">Mulai Tidur</label>
                    <input 
                      type="time" 
                      defaultValue="01:30"
                      className="w-full text-xs p-2 rounded border border-neutral-300 bg-neutral-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-600 block mb-1">Jam Bangun</label>
                    <input 
                      type="time" 
                      defaultValue="07:45"
                      className="w-full text-xs p-2 rounded border border-neutral-300 bg-neutral-50"
                    />
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={() => alert("Data tidur tersimpan! Kualitas tidur: 6 Jam 15 Menit.")}
                      className={`w-full py-2 rounded text-xs font-bold ${
                        isLoFi ? 'bg-neutral-900 text-white' : 'bg-amber-600 text-white hover:bg-amber-700'
                      }`}
                    >
                      Simpan Log Tidur
                    </button>
                  </div>
                </div>
              </div>

              {/* 7-Day Sleep Chart Wireframe Visualization */}
              <div className={`p-4 rounded-xl border relative ${
                isLoFi ? 'bg-white border-neutral-300' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-sm">Tren Pola Tidur 7 Hari Terakhir</h3>
                    <p className="text-xs text-neutral-500">Rata-rata minggu ini: 5.4 Jam / Malam (Defisit 1.6 Jam)</p>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Kurang Tidur (Insomnia Ringan)
                  </span>
                </div>

                {/* Bar Graph Simulation */}
                <div className="h-44 flex items-end justify-between pt-6 pb-2 px-2 border-b border-neutral-300 gap-2">
                  {[
                    { day: 'Sen', hours: 4.5, isBelow: true },
                    { day: 'Sel', hours: 5.0, isBelow: true },
                    { day: 'Rab', hours: 4.0, isBelow: true },
                    { day: 'Kam', hours: 6.5, isBelow: false },
                    { day: 'Jum', hours: 5.2, isBelow: true },
                    { day: 'Sab', hours: 7.5, isBelow: false },
                    { day: 'Min', hours: 5.0, isBelow: true },
                  ].map((bar) => {
                    const heightPercent = (bar.hours / 9) * 100;
                    return (
                      <div key={bar.day} className="flex-1 flex flex-col items-center h-full justify-end group">
                        <span className="text-[10px] text-neutral-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {bar.hours}j
                        </span>
                        <div 
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full max-w-[36px] rounded-t transition-all ${
                            isLoFi
                              ? bar.isBelow ? 'bg-neutral-400' : 'bg-neutral-800'
                              : bar.isBelow ? 'bg-amber-400 hover:bg-amber-500' : 'bg-teal-600 hover:bg-teal-700'
                          }`}
                        ></div>
                        <span className="text-[11px] font-bold text-neutral-600 mt-2">{bar.day}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Target line indicator */}
                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-0.5 bg-teal-600 inline-block"></span>
                    <span>Target Sehat: 7.0 - 8.0 Jam</span>
                  </div>
                  <span>Pemicu dominan: Screen-time skripsi larut malam (71%)</span>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                isLoFi ? 'bg-neutral-200 border-neutral-300' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                    <Headphones className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Rekomendasi Relaksasi Sebelum Tidur</h4>
                    <p className="text-xs text-neutral-500">Audio Gelombang Theta & Suara Hujan Deras 15 Menit</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Memutar audio relaksasi pereda stres.")}
                  className={`px-3 py-1.5 rounded text-xs font-bold ${
                    isLoFi ? 'bg-neutral-900 text-white' : 'bg-amber-600 text-white'
                  }`}
                >
                  Putar Audio
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 5: MODAL JALUR DARURAT / KRISIS SOS */}
          {screenId === 'emergency' && (
            <div className="max-w-xl mx-auto py-4 space-y-5">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center mx-auto text-rose-600 animate-bounce">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h2 className="text-lg md:text-xl font-black text-rose-900">
                  Kamu Tidak Sendirian. Bantuan Tersedia Sekarang.
                </h2>
                <p className="text-xs md:text-sm text-neutral-600 max-w-md mx-auto">
                  Jika kamu atau temanmu sedang mengalami krisis emosional berat, serangan panik, atau dorongan menyakiti diri, hubungi saluran darurat 24 jam ini langsung.
                </p>
              </div>

              <div className="space-y-3 relative">
                <Badge num={1} text="Prinsip Contrast & Hierarki Ekstrem: Tombol darurat full-width 48px tanpa formulir" />

                {/* Emergency CTA 1: Hotline Nasional */}
                <a
                  href="tel:119"
                  onClick={(e) => { e.preventDefault(); alert("Menghubungi Hotline Sejiwa (Kemenkes) 119 ekstensi 8..."); }}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${
                    isLoFi
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700 shadow-lg shadow-rose-600/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <PhoneCall className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm md:text-base">Hotline Sejiwa (Kemenkes 119 ext 8)</h4>
                      <p className="text-xs text-white/80">Layanan Gratis 24 Jam Bebas Pulsa Nasional</p>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-white text-rose-700 px-3 py-1.5 rounded-lg group-hover:scale-105 transition-transform">
                    PANGGIL SEKARANG
                  </span>
                </a>

                {/* Emergency CTA 2: Satgas Kampus Cakrawala */}
                <a
                  href="tel:081299990000"
                  onClick={(e) => { e.preventDefault(); alert("Menghubungi Satgas Pencegahan Kekerasan & Krisis Kampus Cakrawala..."); }}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    isLoFi
                      ? 'bg-neutral-200 text-neutral-900 border-neutral-300'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Satgas Krisis & Anti-Bullying Kampus</h4>
                      <p className="text-xs text-neutral-500">Respons Cepat Tim Tanggap Darurat Kampus</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                    isLoFi ? 'bg-neutral-900 text-white' : 'bg-amber-600 text-white'
                  }`}>
                    Hubungi Satgas
                  </span>
                </a>

                {/* Emergency CTA 3: Fast Grounding Breathing Exercise */}
                <div className={`p-4 rounded-xl border ${
                  isLoFi ? 'bg-neutral-100 border-neutral-200' : 'bg-teal-50 border-teal-200'
                }`}>
                  <h4 className="font-bold text-xs text-teal-900 mb-1">
                    Sedang Mengalami Serangan Panik? Coba Teknik 4-7-8:
                  </h4>
                  <p className="text-xs text-teal-800 mb-3">
                    Tarik napas perlahan selama 4 detik, tahan 7 detik, dan hembuskan perlahan 8 detik.
                  </p>
                  <button 
                    onClick={() => alert("Memulai panduan audio pernapasan 60 detik...")}
                    className="w-full py-2 bg-teal-600 text-white font-bold text-xs rounded-lg hover:bg-teal-700"
                  >
                    Mulai Panduan Pernapasan Cepat
                  </button>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => onSelectScreen?.('home')}
                  className="text-xs text-neutral-500 hover:text-neutral-900 font-medium underline"
                >
                  Kembali ke Beranda Utama
                </button>
              </div>
            </div>
          )}

          {/* Bottom Persistent Navigation (Component Requirement: Navigation) */}
          <nav className={`mt-8 pt-4 border-t flex items-center justify-around text-xs ${
            isLoFi ? 'border-neutral-300 text-neutral-700' : 'border-slate-200 text-slate-600'
          }`}>
            {[
              { id: 'home', label: 'Beranda', icon: Heart },
              { id: 'consultation', label: 'Konsultasi', icon: MessageSquare },
              { id: 'forum', label: 'Forum Aman', icon: Users },
              { id: 'sleep', label: 'Tracker Tidur', icon: Moon },
            ].map(item => {
              const Icon = item.icon;
              const isActive = screenId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectScreen?.(item.id as ScreenId)}
                  className={`flex flex-col items-center py-1 px-3 rounded-lg transition-all ${
                    isActive
                      ? isLoFi
                        ? 'font-bold text-neutral-950 underline decoration-2'
                        : 'font-bold text-teal-600'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-[11px]">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
