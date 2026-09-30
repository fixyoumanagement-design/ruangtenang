import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Moon, 
  Wind, 
  Headphones, 
  Clock, 
  ArrowRight,
  Users,
  Compass,
  CheckCircle2,
  FileText,
  MessageSquare
} from 'lucide-react';
import { playCalmingRain, stopCalmingAudio } from '../utils/audioCalm';
import { MainNavPage } from '../App';

interface CalmExperienceProps {
  onNavigate?: (page: MainNavPage) => void;
}

export const CalmExperience: React.FC<CalmExperienceProps> = ({ onNavigate }) => {
  // Ambient Sound State
  const [isPlayingRain, setIsPlayingRain] = useState<boolean>(false);

  // Breathing Guide State (4-7-8)
  const [breathingActive, setBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'tarik' | 'tahan' | 'hembuskan'>('tarik');
  const [breathCount, setBreathCount] = useState<number>(4);

  // Condition Selection State
  const [selectedFeeling, setSelectedFeeling] = useState<string>('lelah');

  const toggleRain = () => {
    if (isPlayingRain) {
      stopCalmingAudio();
      setIsPlayingRain(false);
    } else {
      const ok = playCalmingRain();
      if (ok) setIsPlayingRain(true);
    }
  };

  useEffect(() => {
    return () => {
      stopCalmingAudio();
    };
  }, []);

  // Breathing cycle logic (Inhale 4s, Hold 7s, Exhale 8s)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (breathingActive) {
      if (breathPhase === 'tarik') {
        setBreathCount(4);
        timer = setTimeout(() => {
          setBreathPhase('tahan');
        }, 4000);
      } else if (breathPhase === 'tahan') {
        setBreathCount(7);
        timer = setTimeout(() => {
          setBreathPhase('hembuskan');
        }, 7000);
      } else if (breathPhase === 'hembuskan') {
        setBreathCount(8);
        timer = setTimeout(() => {
          setBreathPhase('tarik');
        }, 8000);
      }
    }
    return () => clearTimeout(timer);
  }, [breathingActive, breathPhase]);

  // Breathing countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingActive && breathCount > 1) {
      interval = setInterval(() => {
        setBreathCount((prev) => Math.max(1, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathCount]);

  // 4 Kondisi Mahasiswa Persis High-Fi
  const conditionOptions = [
    {
      id: 'lelah',
      number: '01',
      icon: Clock,
      title: 'Lelah & Kurang Tidur',
      subtitle: 'Begadang tugas, tubuh lemas dan sulit terlelap.'
    },
    {
      id: 'skripsi',
      number: '02',
      icon: FileText,
      title: 'Beban Tugas & Skripsi',
      subtitle: 'Revisi menumpuk, deadline mepet, dan pikiran buntu.'
    },
    {
      id: 'rantau',
      number: '03',
      icon: Compass,
      title: 'Adaptasi Perantauan',
      subtitle: 'Rindu suasana rumah dan canggung di kampus baru.'
    },
    {
      id: 'diskusi',
      number: '04',
      icon: MessageSquare,
      title: 'Perlu Teman Cerita',
      subtitle: 'Pikiran penuh dan butuh didengarkan tanpa dinilai.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* 
        ========================================================================
        KONTAINER 1 (PERSIS HIGH-FI):
        Header Sapaan + Box Audio Relaksasi di Kanan
        Judul: "Ruang tenang untuk jeda sejenak"
        Subtitle: "Temukan kembali ketenangan di tengah padatnya aktivitas kuliah."
        Tombol: "[Volume] Hentikan Audio" / "[Headphones] Putar Audio"
        ========================================================================
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          
          <div className="space-y-1.5 max-w-lg">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#162A1D] font-heading leading-tight">
              Ruang tenang untuk jeda sejenak
            </h1>
            <p className="text-xs sm:text-sm text-[#4C6654] leading-relaxed">
              Temukan kembali ketenangan di tengah padatnya aktivitas kuliah.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={toggleRain}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            >
              {isPlayingRain ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-300" />
                  <span>Hentikan Audio</span>
                </>
              ) : (
                <>
                  <Headphones className="w-4 h-4 text-emerald-200" />
                  <span>Putar Audio</span>
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        KONTAINER 2 (PERSIS HIGH-FI):
        Latihan Pernapasan 4-7-8 Terpusat
        Judul: "Panduan Ritme Napas 4-7-8"
        Subtitle: "Menurunkan detak jantung dan merilekskan tubuh"
        Center Circle: "Latihan 1 Menit" / Fase hitungan mundur
        Tombol Bawah: "Mulai" / "Hentikan Latihan"
        ========================================================================
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-6 sm:p-7 shadow-xs text-center space-y-4">
        <div className="max-w-md mx-auto space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-[#162A1D] font-heading">
            Panduan Ritme Napas 4-7-8
          </h2>
          <p className="text-xs text-[#55725D] leading-relaxed">
            Menurunkan detak jantung dan merilekskan tubuh
          </p>
        </div>

        {/* Lingkaran Visual Pusat */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative flex items-center justify-center w-48 h-48 sm:w-52 sm:h-52">
            
            {/* Outer Halo */}
            <div 
              className={`absolute rounded-full transition-all duration-1000 ease-in-out ${
                breathingActive
                  ? breathPhase === 'tarik'
                    ? 'w-48 h-48 sm:w-52 sm:h-52 bg-[#DCEADB] opacity-90 scale-105'
                    : breathPhase === 'tahan'
                    ? 'w-48 h-48 sm:w-52 sm:h-52 bg-[#CCE0CA] opacity-95 scale-105'
                    : 'w-36 h-36 bg-[#E8F2E7] opacity-60 scale-95'
                  : 'w-40 h-40 bg-[#EDF5EC]'
              }`}
            />

            {/* Core Circle */}
            <div 
              className={`relative z-10 flex flex-col items-center justify-center rounded-full text-white shadow-sm transition-all duration-1000 ease-in-out ${
                breathingActive
                  ? breathPhase === 'tarik'
                    ? 'w-32 h-32 bg-[#2C5237] scale-105'
                    : breathPhase === 'tahan'
                    ? 'w-32 h-32 bg-[#1D3B25] scale-105 ring-2 ring-[#8FB995]'
                    : 'w-28 h-28 bg-[#3D6E4A] scale-90'
                  : 'w-32 h-32 bg-[#284332]'
              }`}
            >
              {breathingActive ? (
                <>
                  <span className="text-[10px] font-medium tracking-wide text-emerald-100 uppercase">
                    {breathPhase === 'tarik' && 'Tarik'}
                    {breathPhase === 'tahan' && 'Tahan'}
                    {breathPhase === 'hembuskan' && 'Hembuskan'}
                  </span>
                  <span className="text-2xl font-bold font-mono mt-0.5">
                    {breathCount}s
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Wind className="w-5 h-5 text-emerald-200" />
                  <span className="text-xs font-semibold text-white">Latihan 1 Menit</span>
                </div>
              )}
            </div>
          </div>

          {/* Tombol Terpusat: "Mulai" / "Hentikan Latihan" */}
          <div className="mt-2">
            <button
              onClick={() => {
                if (breathingActive) {
                  setBreathingActive(false);
                  setBreathPhase('tarik');
                } else {
                  setBreathingActive(true);
                  setBreathPhase('tarik');
                }
              }}
              className="px-8 py-2 rounded-xl font-bold text-xs tracking-wide transition-all shadow-xs bg-[#284332] hover:bg-[#1C3225] text-white cursor-pointer"
            >
              {breathingActive ? 'Hentikan Latihan' : 'Mulai'}
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        KONTAINER 3 (PERSIS HIGH-FI):
        Pemeriksaan Kondisi & Bar Saran Praktis
        Judul: "Apa yang sedang kamu rasakan?"
        Subtitle: "Pilih salah satu kondisi di bawah untuk melihat saran penanganan langsung"
        Grid 4 Kartu + Bar Horizontal
        ========================================================================
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-6 sm:p-7 shadow-xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#162A1D] font-heading">
            Apa yang sedang kamu rasakan?
          </h2>
          <p className="text-xs text-[#526F5A] mt-0.5">
            Pilih salah satu kondisi di bawah untuk melihat saran penanganan langsung
          </p>
        </div>

        {/* 4 Kartu dalam Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {conditionOptions.map((item) => {
            const isSelected = selectedFeeling === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedFeeling(item.id)}
                className={`p-3.5 sm:p-4 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#F4F8F4] border-[#2A4D33] ring-1 ring-[#2A4D33] shadow-xs'
                    : 'bg-[#FAFBF9] border-[#E2EBE3] hover:border-[#CADACD]'
                }`}
              >
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#182C1F]">{item.title}</h3>
                  <p className="text-[11px] sm:text-xs text-[#526F5A] mt-1 leading-relaxed">{item.subtitle}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#E8F0E9] text-[11px]">
                  <span className={isSelected ? 'font-bold text-[#23452D]' : 'text-[#7B9582]'}>
                    {isSelected ? '✓ Terpilih' : 'Pilih kondisi'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bar Rekomendasi Horizontal Persis High-Fi */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#F6FAF7] border border-[#D7E6D9] text-[#243F2B] space-y-3">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2A4D33] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs leading-relaxed">
              {selectedFeeling === 'lelah' && (
                <>
                  <p className="font-bold text-[#183120]">
                    Solusi: Pulihkan Jam Tidur Anda
                  </p>
                  <p className="text-[#3E5C46]">
                    Begadang berkepanjangan menurunkan konsentrasi dan memicu kelelahan kronis. Beri jeda screen time 30 menit sebelum tidur, redupkan lampu kamar, dan catat jam tidurmu untuk memantau pemulihan fisik.
                  </p>
                </>
              )}

              {selectedFeeling === 'skripsi' && (
                <>
                  <p className="font-bold text-[#183120]">
                    Solusi: Urai Beban Pengerjaan Tugas
                  </p>
                  <p className="text-[#3E5C46]">
                    Memaksakan menulis saat pikiran buntu justru memperlambat progres tugas akhir. Pecah revisi menjadi target 45 menit per sesi, ambil jeda peregangan, atau diskusikan kebuntuanmu dengan konselor sebaya yang pernah melewatinya.
                  </p>
                </>
              )}

              {selectedFeeling === 'rantau' && (
                <>
                  <p className="font-bold text-[#183120]">
                    Solusi: Jaga Koneksi & Adaptasi Bertahap
                  </p>
                  <p className="text-[#3E5C46]">
                    Merasa asing di kota baru adalah proses adaptasi yang wajar. Hubungi keluarga secara berkala, luangkan waktu untuk hal yang kamu sukai di luar kuliah, dan temukan cerita sesama mahasiswa rantau di forum komunitas.
                  </p>
                </>
              )}

              {selectedFeeling === 'diskusi' && (
                <>
                  <p className="font-bold text-[#183120]">
                    Solusi: Tumpahkan Cerita Tanpa Penghakiman
                  </p>
                  <p className="text-[#3E5C46]">
                    Menyimpan beban pikiran sendirian membuat kepala cepat penuh. Ruang obrolan konselor sebaya kami 100% anonim, aman, bebas biaya, dan terikat kode etik kerahasiaan kampus tanpa rekam akademik.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="pl-0 sm:pl-6.5 pt-1 sm:pt-0.5">
            {selectedFeeling === 'lelah' && (
              <button
                onClick={() => onNavigate?.('tidur')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer"
              >
                <span>Catat jam tidur sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {selectedFeeling === 'skripsi' && (
              <button
                onClick={() => onNavigate?.('konsultasi')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer"
              >
                <span>Konsultasi dengan Peer Supporter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {selectedFeeling === 'rantau' && (
              <button
                onClick={() => onNavigate?.('forum')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer"
              >
                <span>Buka Forum Diskusi Rantau</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {selectedFeeling === 'diskusi' && (
              <button
                onClick={() => onNavigate?.('konsultasi')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold bg-[#284332] text-white hover:bg-[#1E3426] transition-all cursor-pointer"
              >
                <span>Pilih Rekan Diskusi Sebaya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        KONTAINER 4 (PERSIS HIGH-FI):
        Tiga Layanan Pendukung Mahasiswa
        Card 1: Konseling -> "Pilih Teman Cerita ->"
        Card 2: Forum Anonim -> "Masuk Forum Diskusi ->"
        Card 3: Tracker Tidur -> "Lihat Catatan Tidur ->"
        ========================================================================
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-6 sm:p-7 shadow-xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#162A1D] font-heading">
            Tiga Layanan Pendukung Mahasiswa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          
          {/* Pilar 1: Konseling */}
          <div className="bg-[#FAFBF9] rounded-xl border border-[#E2EBE3] p-4 flex flex-col justify-between space-y-3.5">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#172D1E] font-heading">
                  Konseling
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-[#4F6C57] leading-relaxed">
                Ngobrol privat bersama konselor terlatih. Rahasia terjamin tanpa rekam data akademik.
              </p>
            </div>
            
            <button
              onClick={() => onNavigate?.('konsultasi')}
              className="w-full inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#EDF4ED] text-[#24432C] border border-[#D8E6D9] transition-all cursor-pointer"
            >
              <span>Pilih Teman Cerita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pilar 2: Forum Anonim */}
          <div className="bg-[#FAFBF9] rounded-xl border border-[#E2EBE3] p-4 flex flex-col justify-between space-y-3.5">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#172D1E] font-heading">
                  Forum Anonim
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-[#4F6C57] leading-relaxed">
                Ruang berbagi cerita seputar kehidupan kampus. Terbebas dari rasa cemas dan dihakimi, menjaga setiap perbincangan.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.('forum')}
              className="w-full inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#EDF4ED] text-[#24432C] border border-[#D8E6D9] transition-all cursor-pointer"
            >
              <span>Masuk Forum Diskusi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pilar 3: Tracker Tidur */}
          <div className="bg-[#FAFBF9] rounded-xl border border-[#E2EBE3] p-4 flex flex-col justify-between space-y-3.5">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center">
                  <Moon className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#172D1E] font-heading">
                  Tracker Tidur
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-[#4F6C57] leading-relaxed">
                Pantau jam istirahat harian dan pola hidup mahasiswa saat kuliah.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.('tidur')}
              className="w-full inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#EDF4ED] text-[#24432C] border border-[#D8E6D9] transition-all cursor-pointer"
            >
              <span>Lihat Catatan Tidur</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
