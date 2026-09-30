import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Volume2, 
  VolumeX, 
  Headphones, 
  CheckCircle2, 
  AlertCircle,
  Play,
  Square
} from 'lucide-react';
import { playCalmingRain, stopCalmingAudio } from '../utils/audioCalm';

export interface SleepRecord {
  id: string;
  date: string;
  startTime: string;
  wakeTime: string;
  totalText: string;
  totalHours: number;
  quality: 'Kurang' | 'Cukup' | 'Optimal';
}

const HIGH_FI_SLEEP_RECORDS: SleepRecord[] = [
  { id: '1', date: '18 Sep 2026', startTime: '05:10', wakeTime: '09:10', totalText: '4j 00m', totalHours: 4.0, quality: 'Kurang' },
  { id: '2', date: '19 Sep 2026', startTime: '04:00', wakeTime: '08:00', totalText: '4j 00m', totalHours: 4.0, quality: 'Kurang' },
  { id: '3', date: '20 Sep 2026', startTime: '02:30', wakeTime: '07:00', totalText: '4j 30m', totalHours: 4.5, quality: 'Kurang' },
  { id: '4', date: '21 Sep 2026', startTime: '02:00', wakeTime: '07:00', totalText: '5j 00m', totalHours: 5.0, quality: 'Kurang' },
  { id: '5', date: '22 Sep 2026', startTime: '03:00', wakeTime: '07:00', totalText: '4j 00m', totalHours: 4.0, quality: 'Kurang' },
  { id: '6', date: '23 Sep 2026', startTime: '00:30', wakeTime: '07:00', totalText: '6j 30m', totalHours: 6.5, quality: 'Cukup' },
  { id: '7', date: '24 Sep 2026', startTime: '01:45', wakeTime: '07:45', totalText: '6j 00m', totalHours: 6.0, quality: 'Cukup' },
  { id: '8', date: '25 Sep 2026', startTime: '23:30', wakeTime: '07:00', totalText: '7j 30m', totalHours: 7.5, quality: 'Optimal' },
  { id: '9', date: '26 Sep 2026', startTime: '02:00', wakeTime: '07:00', totalText: '5j 00m', totalHours: 5.0, quality: 'Kurang' }
];

export const SleepView: React.FC = () => {
  const [wentToSleep, setWentToSleep] = useState<string>('01:30');
  const [wakeUp, setWakeUp] = useState<string>('09:00');
  const [isPlayingRain, setIsPlayingRain] = useState<boolean>(false);
  const [records, setRecords] = useState<SleepRecord[]>(() => {
    try {
      const stored = localStorage.getItem('ruangtenang_sleep_hifi_records');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return HIGH_FI_SLEEP_RECORDS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ruangtenang_sleep_hifi_records', JSON.stringify(records));
    } catch {
      // Fallback
    }
  }, [records]);

  const toggleRain = () => {
    if (isPlayingRain) {
      stopCalmingAudio();
      setIsPlayingRain(false);
    } else {
      const ok = playCalmingRain();
      if (ok) setIsPlayingRain(true);
    }
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const [startH, startM] = wentToSleep.split(':').map(Number);
    const [wakeH, wakeM] = wakeUp.split(':').map(Number);
    let startTotal = (startH || 0) * 60 + (startM || 0);
    let wakeTotal = (wakeH || 0) * 60 + (wakeM || 0);
    if (wakeTotal <= startTotal) wakeTotal += 24 * 60;

    const diff = wakeTotal - startTotal;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    const hoursNum = parseFloat((diff / 60).toFixed(1));

    let quality: 'Kurang' | 'Cukup' | 'Optimal' = 'Kurang';
    if (hoursNum >= 7) quality = 'Optimal';
    else if (hoursNum >= 6) quality = 'Cukup';

    const newRecord: SleepRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      startTime: wentToSleep,
      wakeTime: wakeUp,
      totalText: `${h}j ${m < 10 ? '0' : ''}${m}m`,
      totalHours: hoursNum,
      quality
    };

    setRecords([newRecord, ...records]);
  };

  // Weekly chart bars (Sen, Sel, Rab, Kam, Jum, Sab, Min)
  const chartDays = [
    { day: 'Sen', hours: 4.5, percent: 56 },
    { day: 'Sel', hours: 5.0, percent: 62 },
    { day: 'Rab', hours: 4.0, percent: 50 },
    { day: 'Kam', hours: 6.5, percent: 81 },
    { day: 'Jum', hours: 5.2, percent: 65 },
    { day: 'Sab', hours: 7.5, percent: 93 },
    { day: 'Min', hours: 5.0, percent: 62 }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* 
        HEADER PERSIS HIGH-FI:
        Judul: "Tracker Tidur"
        Subtitle: "Pantau pola tidur harian"
      */}
      <div className="space-y-1 pb-1">
        <h1 className="text-xl sm:text-2xl font-bold text-[#162A1D] font-heading">
          Tracker Tidur
        </h1>
        <p className="text-xs sm:text-sm text-[#526F5A]">
          Pantau pola tidur harian
        </p>
      </div>

      {/* 
        KONTAINER 1: CATAT JAM TIDUR SEMALAM (PERSIS HIGH-FI)
        Went to sleep (dropdown) | Wake up (dropdown) | [Clock] Simpan Log Tidur
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-5 sm:p-6 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#35583E] mb-3.5">
          Catat Jam Tidur Semalam
        </h2>

        <form onSubmit={handleSaveLog} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#46654F]">
              Went to sleep
            </label>
            <input
              type="time"
              value={wentToSleep}
              onChange={(e) => setWentToSleep(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAFBF9] border border-[#CCDCCD] text-xs font-semibold text-[#182C1F] focus:outline-none focus:ring-1 focus:ring-[#284332]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#46654F]">
              Wake up
            </label>
            <input
              type="time"
              value={wakeUp}
              onChange={(e) => setWakeUp(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAFBF9] border border-[#CCDCCD] text-xs font-semibold text-[#182C1F] focus:outline-none focus:ring-1 focus:ring-[#284332]"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Simpan Log Tidur</span>
          </button>
        </form>
      </section>

      {/* 
        KONTAINER 2: SLEEP QUALITY (PERSIS HIGH-FI)
        Title: Sleep Quality
        Badge kanan: "Kurang Tidur (Perlu Istirahat)"
        Subtitle: "Avg: 4.7 jam/malam (Defisit 2.3 jam dari standar sehat 7-8 jam)"
        Weekly Chart + Target 7-8 jam + Pemicu dominan
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#162A1D] font-heading">
              Sleep Quality
            </h2>
            <p className="text-xs text-[#526F5A] mt-0.5">
              Avg: 4.7 jam/malam (Defisit 2.3 jam dari standar sehat 7-8 jam)
            </p>
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FAECE8] text-[#A63C2E] border border-[#F2D0C9] self-start sm:self-auto">
            Kurang Tidur (Perlu Istirahat)
          </span>
        </div>

        {/* Bar Chart Sesuai High-Fi */}
        <div className="pt-3 pb-2 space-y-2">
          {/* Target line */}
          <div className="relative border-b-2 border-dashed border-[#8EB095] pb-1 flex justify-between text-[10px] text-[#4A6E53] font-semibold">
            <span>Target: 7-8 jam</span>
            <span>Standar Sehat</span>
          </div>

          {/* 7 Columns */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 pt-2 h-36 items-end">
            {chartDays.map((d, idx) => (
              <div key={idx} className="flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-bold text-[#35583E] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.hours}j
                </span>
                <div 
                  className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                    d.hours >= 7 
                      ? 'bg-[#284332]' 
                      : d.hours >= 6 
                      ? 'bg-[#4C7558]' 
                      : 'bg-[#89AB92]'
                  }`}
                  style={{ height: `${Math.min(100, Math.max(20, (d.hours / 8) * 100))}%` }}
                />
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#506E58] mt-2">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note pemicu dominan */}
        <div className="pt-2 border-t border-[#EDF3ED] text-right">
          <span className="text-[11px] text-[#698572]">
            Pemicu dominan: Screen-time & begadang skripsi (71%)
          </span>
        </div>
      </section>

      {/* 
        KONTAINER 3: RIWAYAT TIDUR (PERSIS HIGH-FI 9 HARI TERCATAT)
        Tabel 9 baris persis + Card Relaksasi Malam di bawahnya
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#162A1D] font-heading">
            Riwayat Tidur
          </h2>
          <p className="text-xs text-[#526F5A] mt-0.5">
            {records.length} hari tercatat
          </p>
        </div>

        {/* Mobile View: Card List (< sm) */}
        <div className="sm:hidden space-y-2.5">
          {records.map((r) => (
            <div key={r.id} className="p-3.5 rounded-xl bg-[#FAFBF9] border border-[#E5ECE5] flex items-center justify-between text-xs">
              <div className="space-y-1">
                <span className="font-bold text-[#1A2E20] block">{r.date}</span>
                <span className="text-[11px] text-[#55735E]">
                  Pukul {r.startTime} — {r.wakeTime}
                </span>
              </div>
              <div className="text-right space-y-1">
                <span className="font-bold text-[#182C1F] block text-sm">{r.totalText}</span>
                <span 
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    r.quality === 'Optimal'
                      ? 'bg-[#E3EFE4] text-[#1F3D27] border border-[#CFDFD1]'
                      : r.quality === 'Cukup'
                      ? 'bg-[#FEF3E2] text-[#9A621E] border border-[#F5E2C4]'
                      : 'bg-[#FAECE8] text-[#A63C2E] border border-[#F2D0C9]'
                  }`}
                >
                  {r.quality}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Full Table (>= sm) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5ECE5] text-[#55735E] font-semibold">
                <th className="py-2.5 px-3">Tanggal</th>
                <th className="py-2.5 px-3">Mulai tidur</th>
                <th className="py-2.5 px-3">Bangun</th>
                <th className="py-2.5 px-3">Total</th>
                <th className="py-2.5 px-3 text-right">Kualitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDF3ED]">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-[#FAFBF9] transition-colors">
                  <td className="py-2.5 px-3 font-medium text-[#1A2E20]">{r.date}</td>
                  <td className="py-2.5 px-3 text-[#4B6754]">{r.startTime}</td>
                  <td className="py-2.5 px-3 text-[#4B6754]">{r.wakeTime}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#182C1F]">{r.totalText}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span 
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        r.quality === 'Optimal'
                          ? 'bg-[#E3EFE4] text-[#1F3D27] border border-[#CFDFD1]'
                          : r.quality === 'Cukup'
                          ? 'bg-[#FEF3E2] text-[#9A621E] border border-[#F5E2C4]'
                          : 'bg-[#FAECE8] text-[#A63C2E] border border-[#F2D0C9]'
                      }`}
                    >
                      {r.quality}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 
          Banner Relaksasi Malam di Bawah Tabel (Persis High-Fi)
          "[Headphones] Relaksasi Malam: Suara hujan & mode fokus untuk tidur lebih pulas"
          Tombol: "Putar Sekarang" / "Hentikan"
        */}
        <div className="p-4 rounded-xl bg-[#F4F8F4] border border-[#D5E3D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E2EFE3] text-[#284332] flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#182C1F]">
                Relaksasi Malam
              </h3>
              <p className="text-[11px] text-[#55735D]">
                Suara hujan & mode fokus untuk tidur lebih pulas
              </p>
            </div>
          </div>

          <button
            onClick={toggleRain}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer shadow-2xs self-start sm:self-auto shrink-0"
          >
            {isPlayingRain ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Hentikan</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white text-white" />
                <span>Putar Sekarang</span>
              </>
            )}
          </button>
        </div>

      </section>

    </div>
  );
};
