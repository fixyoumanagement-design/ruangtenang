import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sparkles, 
  Clock, 
  Volume2, 
  VolumeX, 
  Bed, 
  Activity,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Download,
  Calendar
} from 'lucide-react';
import { audioCalm } from '../utils/audioCalm';

export interface SleepLog {
  id: string;
  date: string;
  dayName: string;
  startTime: string;
  wakeTime: string;
  totalMinutes: number;
  durationHours: number;
  durationText: string;
  status: 'optimal' | 'cukup' | 'kurang';
  note?: string;
}

const DEFAULT_LOGS: SleepLog[] = [
  { id: '1', date: '21 Sep 2026', dayName: 'Sen', startTime: '02:30', wakeTime: '07:00', totalMinutes: 270, durationHours: 4.5, durationText: '4 Jam 30 Menit', status: 'kurang' },
  { id: '2', date: '22 Sep 2026', dayName: 'Sel', startTime: '02:00', wakeTime: '07:00', totalMinutes: 300, durationHours: 5.0, durationText: '5 Jam 00 Menit', status: 'kurang' },
  { id: '3', date: '23 Sep 2026', dayName: 'Rab', startTime: '03:00', wakeTime: '07:00', totalMinutes: 240, durationHours: 4.0, durationText: '4 Jam 00 Menit', status: 'kurang' },
  { id: '4', date: '24 Sep 2026', dayName: 'Kam', startTime: '00:30', wakeTime: '07:00', totalMinutes: 390, durationHours: 6.5, durationText: '6 Jam 30 Menit', status: 'cukup' },
  { id: '5', date: '25 Sep 2026', dayName: 'Jum', startTime: '01:45', wakeTime: '07:00', totalMinutes: 315, durationHours: 5.2, durationText: '5 Jam 15 Menit', status: 'kurang' },
  { id: '6', date: '26 Sep 2026', dayName: 'Sab', startTime: '23:30', wakeTime: '07:00', totalMinutes: 450, durationHours: 7.5, durationText: '7 Jam 30 Menit', status: 'optimal' },
  { id: '7', date: '27 Sep 2026', dayName: 'Min', startTime: '02:00', wakeTime: '07:00', totalMinutes: 300, durationHours: 5.0, durationText: '5 Jam 00 Menit', status: 'kurang' }
];

function calculateSleepDuration(start: string, wake: string): { totalMinutes: number; durationHours: number; durationText: string; status: 'optimal' | 'cukup' | 'kurang' } {
  const [startH, startM] = start.split(':').map(Number);
  const [wakeH, wakeM] = wake.split(':').map(Number);

  let startTotal = (startH || 0) * 60 + (startM || 0);
  let wakeTotal = (wakeH || 0) * 60 + (wakeM || 0);

  if (wakeTotal <= startTotal) {
    wakeTotal += 24 * 60;
  }

  const diffMinutes = wakeTotal - startTotal;
  const hoursOnly = Math.floor(diffMinutes / 60);
  const minutesOnly = diffMinutes % 60;
  const durationHours = parseFloat((diffMinutes / 60).toFixed(1));

  let status: 'optimal' | 'cukup' | 'kurang' = 'optimal';
  if (durationHours < 6) {
    status = 'kurang';
  } else if (durationHours < 7) {
    status = 'cukup';
  } else {
    status = 'optimal';
  }

  const durationText = minutesOnly > 0 
    ? `${hoursOnly} Jam ${minutesOnly} Menit`
    : `${hoursOnly} Jam`;

  return { totalMinutes: diffMinutes, durationHours, durationText, status };
}

export const SleepView: React.FC = () => {
  const [startTime, setStartTime] = useState<string>('01:30');
  const [wakeTime, setWakeTime] = useState<string>('07:45');
  const [isPlayingRain, setIsPlayingRain] = useState<boolean>(false);
  const [recentSavedLog, setRecentSavedLog] = useState<SleepLog | null>(null);

  // Load persistent sleep logs from localStorage
  const [logs, setLogs] = useState<SleepLog[]>(() => {
    try {
      const stored = localStorage.getItem('ruangtenang_sleep_logs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_LOGS;
  });

  // Save to localStorage whenever logs state changes
  useEffect(() => {
    try {
      localStorage.setItem('ruangtenang_sleep_logs', JSON.stringify(logs));
    } catch {
      // Storage error fallback
    }
  }, [logs]);

  const handleToggleRain = () => {
    if (isPlayingRain) {
      audioCalm.stopRain();
      setIsPlayingRain(false);
    } else {
      audioCalm.playRain();
      setIsPlayingRain(true);
    }
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const calculated = calculateSleepDuration(startTime, wakeTime);

    const now = new Date();
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const currentDayName = dayNames[now.getDay()];
    const dateFormatted = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()}`;

    const newEntry: SleepLog = {
      id: Date.now().toString(),
      date: dateFormatted,
      dayName: currentDayName,
      startTime,
      wakeTime,
      totalMinutes: calculated.totalMinutes,
      durationHours: calculated.durationHours,
      durationText: calculated.durationText,
      status: calculated.status
    };

    setLogs(prev => [newEntry, ...prev]);
    setRecentSavedLog(newEntry);
    setTimeout(() => setRecentSavedLog(null), 4500);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(prev => prev.filter(item => item.id !== id));
  };

  const handleResetToDefault = () => {
    setLogs(DEFAULT_LOGS);
  };

  // 7-day display: pick the last 7 logged entries in chronological order
  const displayChartData = [...logs].slice(0, 7).reverse();
  const averageHours = logs.length > 0 
    ? (displayChartData.reduce((acc, curr) => acc + curr.durationHours, 0) / displayChartData.length).toFixed(1)
    : '0';

  const isInsomniaRange = Number(averageHours) < 6.0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* 
        HEADER
      */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E3ECE3]">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-[#213728] font-heading">
            Catatan Jam Tidur
          </h2>
          <p className="text-xs text-[#526D5A] mt-0.5">
            Pantau pola tidur harianmu agar istirahat malam lebih teratur.
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E8EEFA] text-[#344E82] text-xs font-bold border border-[#CCD7EF]">
          <Moon className="w-3.5 h-3.5 text-[#344E82]" />
          <span>Pola Istirahat</span>
        </div>
      </div>

      {/* 
        QUICK INPUT BAR (CATAT JAM TIDUR SEMALAM)
      */}
      <form onSubmit={handleSaveLog} className="p-5 md:p-6 rounded-3xl backdrop-blur-xl bg-white/80 border border-white/70 shadow-[0_8px_30px_rgba(45,75,54,0.04)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#52735B] flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-[#4D7356]" />
            <span>Catat Jam Tidur Semalam</span>
          </h3>
          <span className="text-[11px] text-[#698471] font-mono">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label className="text-xs text-[#4F6A58] block mb-1 font-semibold">Mulai Tidur</label>
            <input 
              type="time" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30"
              required
            />
          </div>

          <div>
            <label className="text-xs text-[#4F6A58] block mb-1 font-semibold">Jam Bangun</label>
            <input 
              type="time" 
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30"
              required
            />
          </div>

          <div className="flex items-end">
            <button 
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#2D4B36] text-white hover:bg-[#1E3626] transition-all shadow-2xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Log Tidur</span>
            </button>
          </div>
        </div>

        {recentSavedLog && (
          <div className="p-3.5 rounded-2xl bg-[#EDF7ED] border border-[#CDE5CE] text-xs text-[#1E3D24] flex items-center justify-between animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Log tersimpan:</strong> Durasi tidur semalam <strong>{recentSavedLog.durationText}</strong> ({recentSavedLog.startTime} – {recentSavedLog.wakeTime}). Tersimpan di memori browser.
              </span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              recentSavedLog.status === 'optimal' 
                ? 'bg-emerald-100 text-emerald-800' 
                : recentSavedLog.status === 'cukup'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
            }`}>
              {recentSavedLog.status === 'optimal' ? 'Optimal' : recentSavedLog.status === 'cukup' ? 'Cukup' : 'Kurang'}
            </span>
          </div>
        )}
      </form>

      {/* 
        7-DAY SLEEP CHART
      */}
      <div className="p-5 md:p-6 rounded-3xl backdrop-blur-xl bg-white/80 border border-white/70 shadow-[0_8px_30px_rgba(45,75,54,0.04)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm md:text-base text-[#213728] font-heading">
              Tren Pola Tidur {displayChartData.length} Hari Terakhir
            </h3>
            <p className="text-xs text-[#526D5A]">
              Rata-rata catatan: <strong>{averageHours} Jam</strong> / Malam {Number(averageHours) < 7.0 && `(Defisit ${(7.0 - Number(averageHours)).toFixed(1)} Jam dari standar sehat 7-8 jam)`}
            </p>
          </div>
          <span className={`self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full border ${
            isInsomniaRange
              ? 'text-[#8C5E1E] bg-[#FFF5E5] border-[#F8E2C4]'
              : 'text-[#2D4B36] bg-[#EAF2EA] border-[#CFE1D0]'
          }`}>
            {isInsomniaRange ? 'Kurang Tidur (Perlu Istirahat)' : 'Pola Tidur Cukup Terjaga'}
          </span>
        </div>

        {/* Bar Graph */}
        <div className="h-44 flex items-end justify-between pt-6 pb-2 px-3 border-b border-[#E3ECE3] gap-2">
          {displayChartData.map((bar, idx) => {
            const heightPercent = Math.min(100, Math.max(15, (bar.durationHours / 9) * 100));
            const isDeficit = bar.durationHours < 6.0;
            return (
              <div key={bar.id || idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] text-[#6E8875] mb-1 font-mono">
                  {bar.durationHours}j
                </span>
                <div 
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[42px] rounded-t-xl transition-all ${
                    isDeficit 
                      ? 'bg-[#E08A63]/85 hover:bg-[#E08A63]' 
                      : 'bg-[#2D4B36]/85 hover:bg-[#2D4B36]'
                  }`}
                  title={`${bar.dayName} (${bar.date}): ${bar.durationText}`}
                />
                <span className="text-xs font-bold text-[#2A4433] mt-2">{bar.dayName}</span>
              </div>
            );
          })}
        </div>

        {/* Target line indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-[#5F7C68] pt-1">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1 bg-[#2D4B36] rounded-full inline-block"></span>
            <span>Target Sehat: 7.0 - 8.0 Jam per Malam</span>
          </div>
          <span>Pemicu dominan: Screen-time skripsi & begadang larut malam (71%)</span>
        </div>
      </div>

      {/* 
        DAFTAR RIWAYAT LOG TIDUR TERSIMPAN (PERSISTENT HISTORY)
      */}
      <div className="p-5 md:p-6 rounded-3xl backdrop-blur-xl bg-white/80 border border-white/70 shadow-[0_8px_30px_rgba(45,75,54,0.04)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-[#4D7356]" />
            <h3 className="font-semibold text-sm md:text-base text-[#213728] font-heading">
              Riwayat Log Tidur Tersimpan ({logs.length} Catatan)
            </h3>
          </div>
          <button
            onClick={handleResetToDefault}
            className="text-[11px] text-[#5F7C68] hover:text-[#213728] underline cursor-pointer"
          >
            Reset Contoh
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#6B8572] bg-[#FAFBF9] rounded-2xl border border-dashed border-[#D5E2D5]">
            Belum ada catatan log tidur tersimpan. Silakan isi form di atas dan klik &quot;Simpan Log Tidur&quot;.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E3ECE3] text-[#5B7563]">
                  <th className="pb-2 font-semibold">Tanggal</th>
                  <th className="pb-2 font-semibold">Jam Tidur</th>
                  <th className="pb-2 font-semibold">Jam Bangun</th>
                  <th className="pb-2 font-semibold">Durasi</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF3ED]">
                {logs.slice(0, 10).map((log) => (
                  <tr key={log.id} className="hover:bg-[#F7FAF7] transition-colors">
                    <td className="py-2.5 font-medium text-[#213728] flex items-center space-x-1.5">
                      <span className="w-7 text-[10px] font-bold text-[#5B7563] bg-[#E8EFE8] px-1 py-0.5 rounded text-center">
                        {log.dayName}
                      </span>
                      <span>{log.date}</span>
                    </td>
                    <td className="py-2.5 font-mono text-[#4F6A58]">{log.startTime}</td>
                    <td className="py-2.5 font-mono text-[#4F6A58]">{log.wakeTime}</td>
                    <td className="py-2.5 font-bold text-[#213728]">{log.durationText}</td>
                    <td className="py-2.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'optimal'
                          ? 'bg-[#E2F0E4] text-[#24572D]'
                          : log.status === 'cukup'
                            ? 'bg-[#FEF3D6] text-[#7A540E]'
                            : 'bg-[#FCE8E6] text-[#8C231C]'
                      }`}>
                        {log.status === 'optimal' ? 'Optimal (7j+)' : log.status === 'cukup' ? 'Cukup (6-7j)' : 'Kurang (<6j)'}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="p-1 rounded-lg text-[#8A9F8E] hover:text-[#992222] hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus log ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 
        RECOMMENDATION CARD
      */}
      <div className="p-4 md:p-5 rounded-3xl bg-[#FAFBF9] border border-[#E0ECE0] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#E8EEFA] text-[#344E82] flex items-center justify-center font-bold text-sm shrink-0">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#1E2E23]">
              Rekomendasi Relaksasi Sebelum Tidur
            </h4>
            <p className="text-xs text-[#556F5D]">
              Audio Gelombang Theta & Suara Hujan Lembut (Membantu otak masuk ke fase lelap)
            </p>
          </div>
        </div>

        <button 
          onClick={handleToggleRain}
          className="self-stretch sm:self-center px-4 py-2 rounded-xl text-xs font-bold bg-[#2D4B36] text-white hover:bg-[#1E3626] transition-all flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
        >
          {isPlayingRain ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#A8D8AC]" />
              <span>Hentikan Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Putar Audio</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};

