import React, { useState } from 'react';
import { 
  MessageSquare, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Heart, 
  Search, 
  CheckCircle2, 
  Lock,
  Send,
  X,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface Counselor {
  id: string;
  name: string;
  faculty: string;
  specialty: string;
  rating: string;
  status: string;
  isOnline: boolean;
  topicTag: string;
  initials: string;
}

export const ConsultationView: React.FC = () => {
  const [consultationFilter, setConsultationFilter] = useState<string>('Semua');
  const [activeChatCounselor, setActiveChatCounselor] = useState<Counselor | null>(null);
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ sender: 'counselor' | 'user'; text: string; time: string }>>([
    {
      sender: 'counselor',
      text: 'Halo teman baik. Terima kasih sudah mau mampir. Ruang ini 100% anonim, identitas aslimu tidak tercatat di kampus. Kamu boleh ceritakan apa pun yang bikin kepalamu berat perlahan ya...',
      time: 'Baru saja'
    }
  ]);

  const counselors: Counselor[] = [
    {
      id: '1',
      name: "Nabila, S.Psi (Peer Supporter)",
      faculty: "Alumni Psikologi · Konselor Sebaya Terlatih",
      specialty: "Spesialisasi: Burnout Skripsi, Beban Dospem & Perfeksionisme",
      rating: "4.9 (84 sesi)",
      status: "Tersedia Hari Ini (14.00 - 17.00)",
      isOnline: true,
      topicTag: 'Stres Skripsi',
      initials: 'NB'
    },
    {
      id: '2',
      name: "Dimas Arya (Konselor Mahasiswa)",
      faculty: "Fakultas Teknik · Mahasiswa Perantau",
      specialty: "Spesialisasi: Homesick, Adaptasi Rantau, Isolasi Sosial",
      rating: "4.8 (62 sesi)",
      status: "Tersedia Malam Ini (19.00 - 21.00)",
      isOnline: true,
      topicTag: 'Adaptasi Perantau',
      initials: 'DA'
    },
    {
      id: '3',
      name: "dr. Sarah Sp.KJ (Konsultan Medis)",
      faculty: "Layanan Kesehatan Jiwa Kampus",
      specialty: "Spesialisasi: Gangguan Tidur Kronis & Kecemasan Klinis Akut",
      rating: "5.0 (120 sesi)",
      status: "Tersedia Besok (09.00 - 12.00)",
      isOnline: false,
      topicTag: 'Gangguan Tidur',
      initials: 'SK'
    }
  ];

  const filterTabs = ['Semua', 'Stres Skripsi', 'Adaptasi Perantau', 'Gangguan Tidur', 'Keluarga & Relasi'];

  const filteredCounselors = counselors.filter((c) => {
    if (consultationFilter === 'Semua') return true;
    return c.topicTag === consultationFilter;
  });

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Baru saja' }]);
    setChatInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'counselor',
          text: 'Terima kasih sudah mau berbagi. Apa yang kamu rasakan itu sangat wajar dan valid. Tarik napas dulu sebentar yuk, kita urai masalah ini bersama pelan-pelan.',
          time: 'Baru saja'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-12">
      
      {/* 
        SUSUNAN WIREFRAME ASLI SCREEN 2: HEADER DENGAN JUDUL & SUBTITLE
        Warna Solma (Forest Green & Muted Foliage) + Wording Empati
      */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E3ECE3]">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-[#213728] font-heading">
            Teman Cerita & Konselor
          </h2>
          <p className="text-xs text-[#526D5A] mt-0.5">
            Pilih teman sebaya atau konselor yang siap mendengarkan keluh kesahmu.
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E2EFE3] text-[#2D4B36] text-xs font-semibold border border-[#CFDFD0]">
          <Lock className="w-3.5 h-3.5 text-[#3C5E45]" />
          <span>Privasi Aman</span>
        </div>
      </div>

      {/* 
        SUSUNAN WIREFRAME ASLI SCREEN 2: CHIPS FILTER KATEGORI (PROXIMITY)
      */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setConsultationFilter(tab)}
            className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              consultationFilter === tab
                ? 'bg-[#2D4B36] text-white shadow-2xs'
                : 'bg-white hover:bg-[#F2F6F2] text-[#4A6452] border border-[#DCE7DC]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 
        SUSUNAN WIREFRAME ASLI SCREEN 2: DAFTAR KARTU KONSELOR (REPETITION)
        Foto / Avatar bulat -> Nama + Status Online -> Fakultas -> Spesialisasi -> Rating & Jam -> Subsidi Kampus -> Tombol Pilih Jadwal Chat
      */}
      <div className="space-y-3.5">
        {filteredCounselors.map((c) => (
          <div
            key={c.name}
            className="p-5 rounded-3xl backdrop-blur-xl bg-white/80 border border-white/70 shadow-[0_8px_30px_rgba(45,75,54,0.04)] hover:shadow-[0_12px_40px_rgba(45,75,54,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-start space-x-3.5">
              {/* Avatar Bulat (sesuai wireframe) */}
              <div className="w-12 h-12 rounded-2xl bg-[#E2EFE3] text-[#2D4B36] flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
                {c.initials}
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-sm md:text-base text-[#1E2E23]">{c.name}</h4>
                  <span className={`w-2.5 h-2.5 rounded-full ${c.isOnline ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-neutral-300'}`}></span>
                </div>
                <p className="text-xs text-[#5E7966]">{c.faculty}</p>
                <p className="text-xs font-semibold text-[#2D4534] pt-0.5">{c.specialty}</p>
                
                <div className="flex items-center space-x-3 pt-1 text-[11px] text-[#698471]">
                  <span className="font-semibold text-[#8C5E1E]">Nilai {c.rating}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{c.status}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Badge 100% Subsidi Kampus & Tombol Pilih Jadwal Chat */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EDF3ED]">
              <span className="text-[11px] text-[#2D4B36] font-bold bg-[#E2EFE3] px-2.5 py-0.5 rounded-full border border-[#D0E2D1]">
                100% Subsidi Kampus
              </span>
              <button 
                onClick={() => setActiveChatCounselor(c)}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold transition-all bg-[#2D4B36] text-white hover:bg-[#1E3626] shadow-2xs whitespace-nowrap"
              >
                Pilih Jadwal Chat
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL SIMULASI CHAT PRIVAT SAAT TOMBOL DIKLIK */}
      {activeChatCounselor && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#D5E2D5] max-w-lg w-full shadow-2xl flex flex-col h-[500px] overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 bg-[#F7FAF7] border-b border-[#E3ECE3] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#2D4B36] text-white flex items-center justify-center font-bold text-xs">
                  {activeChatCounselor.initials}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#1E2E23] flex items-center space-x-1.5">
                    <span>{activeChatCounselor.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </h4>
                  <p className="text-[10px] text-[#63806C]">Sesi Privat Anonim · Tanpa Rekam Akademik</p>
                </div>
              </div>
              <button
                onClick={() => setActiveChatCounselor(null)}
                className="w-7 h-7 rounded-full bg-[#EBF0EB] text-[#476350] flex items-center justify-center text-xs font-bold hover:bg-[#DCE5DC]"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FCFDFC]">
              <div className="p-2 rounded-xl bg-[#EDF4ED] text-[11px] text-[#36523E] text-center max-w-xs mx-auto">
                Enkripsi ujung-ke-ujung aktif. Konselor terikat kode etik kerahasiaan kampus.
              </div>

              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#2D4B36] text-white rounded-tr-none'
                        : 'bg-[#F0F4F0] text-[#1E2E23] rounded-tl-none border border-[#E0ECE0]'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className={`text-[9px] block mt-1 ${m.sender === 'user' ? 'text-white/70 text-right' : 'text-[#7B9582]'}`}>
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-[#E3ECE3] flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ketik ceritamu pelan-pelan..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F7F9F7] border border-[#DCE7DC] text-xs text-[#1E2E23] placeholder-[#809B87] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="p-2.5 rounded-xl bg-[#2D4B36] text-white disabled:opacity-40 hover:bg-[#1E3626]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
