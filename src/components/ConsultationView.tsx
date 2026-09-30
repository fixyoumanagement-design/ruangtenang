import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Clock, 
  Send, 
  X, 
  Lock,
  Calendar,
  Sparkles,
  PhoneCall,
  Check,
  CalendarCheck2
} from 'lucide-react';
import { 
  CounselorAgent, 
  COUNSELOR_AGENTS, 
  getCounselorAgentReply,
  getRealtimeCounselors,
  formatTimeHHMM,
  getJeffianAvatarUrl
} from '../services/counselorAgentService';

export const ConsultationView: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [consultationFilter, setConsultationFilter] = useState<string>('Semua');
  const [activeChatCounselor, setActiveChatCounselor] = useState<CounselorAgent | null>(null);
  const [activeBookingCounselor, setActiveBookingCounselor] = useState<CounselorAgent | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultationMedium, setConsultationMedium] = useState<'chat' | 'audio'>('chat');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');
  const jeffianFileInputRef = useRef<HTMLInputElement>(null);

  // Live timer tick every 10 seconds so shifts are always real-time and never lag
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Compute dynamic counselor list based on exact current clock time
  const realtimeCounselors = getRealtimeCounselors(currentTime);

  // Hidden secret photo selector for owner
  const handleDirectPhotoSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        localStorage.setItem('ruangtenang_jeffian_photo', dataUrl);
        setCurrentTime(new Date());
        if (activeChatCounselor && activeChatCounselor.id === '2') {
          setActiveChatCounselor(prev => prev ? { ...prev, avatarUrl: dataUrl } : null);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Chat conversation state
  const [chatInput, setChatInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ sender: 'counselor' | 'user'; text: string; time?: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    if (activeChatCounselor) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeChatCounselor]);

  // High-Fi Category Chips
  const filterTabs = ['Semua', 'Tekanan Skripsi', 'Adaptasi Perantau', 'Gangguan Tidur', 'Keluarga & Relasi'];

  const filteredCounselors = realtimeCounselors.filter((c) => {
    if (consultationFilter === 'Semua') return true;
    return c.topicTag === consultationFilter;
  });

  // Open Chat with specific counselor (e.g. Jeffian A. Lian)
  const handleOpenChat = (counselor: CounselorAgent) => {
    const freshCounselor = realtimeCounselors.find(c => c.id === counselor.id) || counselor;
    const finalCounselor = freshCounselor.id === '2' 
      ? { ...freshCounselor, avatarUrl: getJeffianAvatarUrl() } 
      : freshCounselor;
    setActiveChatCounselor(finalCounselor);
    const nowTimeStr = formatTimeHHMM();

    if (counselor.id === '2') {
      // Real-time dynamic initial state: timestamps follow user's current clock
      setMessages([
        {
          sender: 'user',
          text: 'Hallo kak',
          time: nowTimeStr
        },
        {
          sender: 'counselor',
          text: counselor.initialGreeting,
          time: nowTimeStr
        }
      ]);
    } else {
      setMessages([
        {
          sender: 'counselor',
          text: counselor.initialGreeting,
          time: nowTimeStr
        }
      ]);
    }
  };

  // Open Agenda booking modal
  const handleOpenBooking = (counselor: CounselorAgent) => {
    const freshCounselor = realtimeCounselors.find(c => c.id === counselor.id) || counselor;
    setActiveBookingCounselor(freshCounselor);
    setSelectedSlot(freshCounselor.availableSlots[0] || '');
    setBookingSuccess(false);
    setBookingNotes('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    const ticketId = `RT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingId(ticketId);
    setBookingSuccess(true);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || !activeChatCounselor || isTyping) return;

    const userMsg = textToSend.trim();
    const sendTime = formatTimeHHMM();
    const newMessages = [...messages, { sender: 'user' as const, text: userMsg, time: sendTime }];
    setMessages(newMessages);
    setChatInput('');
    setIsTyping(true);

    try {
      const reply = await getCounselorAgentReply(activeChatCounselor, userMsg, newMessages);
      const replyTime = formatTimeHHMM();
      setMessages(prev => [
        ...prev,
        {
          sender: 'counselor',
          text: reply,
          time: replyTime
        }
      ]);
    } catch {
      const replyTime = formatTimeHHMM();
      setMessages(prev => [
        ...prev,
        {
          sender: 'counselor',
          text: 'Pesanmu telah diterima. Ambil jeda sejenak, dan sampaikan hal spesifik yang ingin kamu obrolkan lebih lanjut.',
          time: replyTime
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(chatInput);
  };

  const todayDateStr = currentTime.toLocaleDateString('id-ID', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* 
        HEADER PERSIS HIGH-FI DENGAN REALTIME SHIFT SYNC:
      */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-[#162A1D] font-heading">
            Teman Cerita & Konselor
          </h1>
          <p className="text-xs sm:text-sm text-[#526F5A]">
            Pilih konselor untuk mendengarkan keluh kesahmu
          </p>
        </div>

        {/* Live Shift Status Indicator */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EBF3EC] text-[#294B33] text-xs font-semibold border border-[#CCE0CF] shadow-2xs self-start sm:self-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {currentTime.getHours() >= 21 || currentTime.getHours() < 5
              ? `🌙 Shift Begadang & Insomnia Aktif · ${formatTimeHHMM(currentTime)} WIB`
              : `☀️ Siaga Mahasiswa Aktif · ${formatTimeHHMM(currentTime)} WIB`}
          </span>
        </div>
      </div>

      {/* Night Owl Banner info khusus mahasiswa yang sering begadang */}
      <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#F0F6F1] to-[#E8F2EA] border border-[#D5E3D7] flex items-center justify-between gap-3 text-xs text-[#2A4B33]">
        <div className="flex items-center space-x-2.5">
          <span className="text-base">🌙</span>
          <div>
            <span className="font-bold text-[#183421]">Siaga Malam & Dini Hari: </span>
            <span className="text-[#3F6149]">
              Revisian buntu tengah malam atau overthinking di kosan sepi? Kak Jeffian & Konselor Insomnia siap nemenin tanpa takut dihakimi.
            </span>
          </div>
        </div>
      </div>

      {/* 
        CHIPS FILTER PERSIS HIGH-FI:
        ["Semua", "Tekanan Skripsi", "Adaptasi Perantau", "Gangguan Tidur", "Keluarga & Relasi"]
      */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs -mx-3.5 px-3.5 sm:mx-0 sm:px-0 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setConsultationFilter(tab)}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              consultationFilter === tab
                ? 'bg-[#284332] text-white shadow-2xs font-semibold'
                : 'bg-white hover:bg-[#F2F7F2] text-[#4A6452] border border-[#DCE7DC]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 
        DAFTAR KARTU KONSELOR PERSIS HIGH-FI:
        Card 1: Nabila, S.Psi, M.Psi, Psikolog -> Button Offline
        Card 2: Jeffian A. Lian -> Button Chat (Aktif)
        Card 3: dr. Sarah Sp.KJ -> Button Offline
      */}
      <div className="space-y-3.5">
        {filteredCounselors.map((c) => (
          <div
            key={c.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE7DD] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 transition-all"
          >
            <div className="flex items-start space-x-3.5">
              {/* Avatar dengan inisial & frame high-fi */}
              <div className="relative shrink-0">
                <div 
                  onClick={() => {
                    if (c.id === '2') {
                      jeffianFileInputRef.current?.click();
                    }
                  }}
                  className={`w-12 h-12 rounded-full ${c.avatarBg} ${c.avatarTextColor} flex items-center justify-center font-bold text-sm border border-[#CAD8CC] shadow-2xs overflow-hidden ${c.id === '2' ? 'cursor-pointer hover:opacity-90' : ''}`}
                  title={c.id === '2' ? 'Klik avatar untuk pasang / ubah foto Kak Jeffian' : c.name}
                >
                  {c.avatarUrl ? (
                    <img 
                      src={c.avatarUrl} 
                      alt={c.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        const fallback = getJeffianAvatarUrl();
                        if (e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                    />
                  ) : (
                    c.initials
                  )}
                </div>
                {c.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>

              <div className="space-y-0.5 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-[#182C1F] leading-tight truncate">
                  {c.name}
                </h3>
                <p className="text-xs text-[#5C7965] truncate">{c.agentRole}</p>
                <p className="text-xs text-[#2A4732] font-medium pt-0.5 line-clamp-1">{c.specialty}</p>
                
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[11px] text-[#698471]">
                  <span className="font-semibold text-[#8C5E1E]">★ {c.rating} ({c.sessionCount} Sesi)</span>
                  <span>·</span>
                  <span className="flex items-center space-x-1 text-[#43624D]">
                    <Clock className="w-3 h-3 text-[#50755C] shrink-0" />
                    <span className="truncate">{c.status}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Action Button Sesuai High-Fi (Mobile Full-Width, Desktop Inline) */}
            <div className="flex items-center space-x-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EDF3ED] sm:self-center shrink-0">
              {c.isOnline ? (
                <button
                  onClick={() => handleOpenChat(c)}
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-2 rounded-xl text-xs font-bold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer shadow-2xs text-center"
                >
                  Chat Sekarang
                </button>
              ) : (
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    disabled
                    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl text-xs font-semibold bg-[#F0F3F0] text-[#869E8D] border border-[#DBE3DC] cursor-not-allowed text-center"
                  >
                    Offline
                  </button>
                  <button
                    onClick={() => handleOpenBooking(c)}
                    className="flex-1 sm:flex-initial px-4 sm:px-3 py-2.5 sm:py-2 rounded-xl text-xs font-semibold text-[#32523C] hover:bg-[#F2F7F2] border border-[#CCDCCD] transition-colors cursor-pointer text-center"
                    title="Jadwalkan sesi konsultasi"
                  >
                    Jadwal
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hidden secret file input for owner to attach/refresh Jeffian photo */}
      <input 
        ref={jeffianFileInputRef}
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleDirectPhotoSelect(file);
        }}
      />

      {/* 
        MODAL CHAT PERSIS HIGH-FI (Jeffian A. Lian):
        Header: Avatar, Jeffian A. Lian, "Sesi Privat Anonim · Tanpa Rekam Akademik", Close Button
        Banner: "Konselor terikat kode etik kerahasiaan data user"
        Date: "Tue, 24 Jun"
        Message: "Hallo kak" (Right bubble dark green) + respons ramah
        Bottom: "Send message" input
      */}
      {activeChatCounselor && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl border border-[#D5E2D5] max-w-lg w-full shadow-2xl flex flex-col h-[90vh] sm:h-[560px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95">
            
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-white border-b border-[#EDF3ED] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 rounded-full ${activeChatCounselor.avatarBg} ${activeChatCounselor.avatarTextColor} flex items-center justify-center font-bold text-xs border border-[#CCDCCD] overflow-hidden`}>
                  {activeChatCounselor.avatarUrl ? (
                    <img 
                      src={activeChatCounselor.avatarUrl} 
                      alt={activeChatCounselor.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        const fallback = getJeffianAvatarUrl();
                        if (e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                    />
                  ) : (
                    activeChatCounselor.initials
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#182C1F] flex items-center space-x-1.5">
                    <span>{activeChatCounselor.name}</span>
                    {activeChatCounselor.callSign && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E5EFE6] text-[#294E34]">
                        {activeChatCounselor.callSign}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-[10px] text-[#52715B]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="font-medium text-[#294B33]">{activeChatCounselor.status}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveChatCounselor(null)}
                className="w-7 h-7 rounded-full bg-[#F0F4F0] text-[#476350] hover:bg-[#E2EDE2] flex items-center justify-center transition-colors cursor-pointer text-xs"
                title="Tutup Chat"
              >
                ✕
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAFBF9]">
              
              {/* Privacy Banner Pill Persis High-Fi */}
              <div className="flex justify-center">
                <div className="px-3.5 py-1.5 rounded-full bg-[#EAF2EB] text-[#294933] text-[11px] font-medium border border-[#D4E3D5] text-center shadow-2xs">
                  Konselor terikat kode etik kerahasiaan data user
                </div>
              </div>

              {/* Date Stamp Dinamis Hari Ini */}
              <div className="flex justify-center">
                <span className="text-[10px] font-semibold text-[#769380] uppercase tracking-wider">
                  {todayDateStr}
                </span>
              </div>

              {/* Messages list */}
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#284332] text-white rounded-tr-xs shadow-2xs'
                        : 'bg-white text-[#182C1F] rounded-tl-xs border border-[#DDE7DD] shadow-2xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.time && (
                      <span
                        className={`text-[9px] block mt-1 ${
                          m.sender === 'user' ? 'text-emerald-200 text-right' : 'text-[#77957F]'
                        }`}
                      >
                        {m.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-2.5 rounded-2xl rounded-tl-none bg-white border border-[#DDE7DD] text-xs text-[#5E7966] flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3C6446] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3C6446] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3C6446] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3.5 py-1.5 bg-white border-t border-[#EDF3ED] overflow-x-auto flex items-center space-x-1.5 text-xs">
              {activeChatCounselor.suggestedPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-[#F2F7F3] hover:bg-[#E4EFE6] text-[#24432C] text-[11px] whitespace-nowrap border border-[#D5E3D6] transition-colors cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Bottom Input Persis High-Fi: placeholder "Send message" */}
            <form onSubmit={handleFormSubmit} className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3 bg-white border-t border-[#E3ECE3] flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Send message"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAFBF9] border border-[#CCDCCD] text-xs text-[#1A2E20] placeholder-[#76937E] focus:outline-none focus:ring-1 focus:ring-[#2C5237]"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#284332] text-white disabled:opacity-40 hover:bg-[#1C3225] transition-all cursor-pointer shadow-2xs"
                title="Kirim pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* MODAL JADWAL / BOOKING */}
      {activeBookingCounselor && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl border border-[#D5E2D5] max-w-lg w-full shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 space-y-4">
            
            <div className="flex items-start justify-between border-b border-[#EDF3ED] pb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-11 h-11 rounded-full ${activeBookingCounselor.avatarBg} ${activeBookingCounselor.avatarTextColor} flex items-center justify-center font-bold text-xs border border-[#CCDCCD] overflow-hidden shrink-0`}>
                  {activeBookingCounselor.avatarUrl ? (
                    <img 
                      src={activeBookingCounselor.avatarUrl} 
                      alt={activeBookingCounselor.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        const fallback = getJeffianAvatarUrl();
                        if (e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                    />
                  ) : (
                    activeBookingCounselor.initials
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D6647]">
                    Reservasi Jadwal Konsultasi
                  </span>
                  <h3 className="text-base font-bold text-[#162A1D] font-heading mt-0.5">
                    {activeBookingCounselor.name}
                  </h3>
                  <p className="text-xs text-[#526F5A]">{activeBookingCounselor.agentRole}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveBookingCounselor(null)}
                className="w-7 h-7 rounded-full bg-[#EAF0EA] text-[#3D5B45] hover:bg-[#DCE5DC] flex items-center justify-center transition-colors cursor-pointer text-xs shrink-0"
              >
                ✕
              </button>
            </div>

            {!bookingSuccess ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#182C1F]">
                    Pilih Slot Jam Konsultasi
                  </label>
                  <div className="space-y-2">
                    {activeBookingCounselor.availableSlots.map((slot) => (
                      <label
                        key={slot}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all text-xs ${
                          selectedSlot === slot
                            ? 'bg-[#F2F7F3] border-[#25452E] ring-1 ring-[#25452E] font-semibold text-[#183120]'
                            : 'bg-[#FAFBF9] border-[#E2EBE3] hover:border-[#CADACD] text-[#3A5642]'
                        }`}
                      >
                        <span>{slot}</span>
                        <input
                          type="radio"
                          name="slot"
                          value={slot}
                          checked={selectedSlot === slot}
                          onChange={() => setSelectedSlot(slot)}
                          className="accent-[#213F29]"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#EDF3ED]">
                  <span className="text-[11px] text-[#5C7965]">
                    100% Bebas Biaya Kampus
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer shadow-2xs"
                  >
                    <CalendarCheck2 className="w-4 h-4" />
                    <span>Konfirmasi Jadwal</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 py-2 text-center animate-in fade-in">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3EB] text-[#24432C] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#162A1D] font-heading">
                    Jadwal Berhasil Dikonfirmasi!
                  </h4>
                  <p className="text-xs text-[#4F6C57] leading-relaxed max-w-sm mx-auto">
                    Sesi konsultasimu dengan <strong>{activeBookingCounselor.name}</strong> telah dijadwalkan pada {selectedSlot}.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D7E6D9] text-left max-w-xs mx-auto text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#607D69]">ID Tiket Anonim:</span>
                    <span className="font-mono font-bold text-[#183120]">{confirmedBookingId}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveBookingCounselor(null)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
