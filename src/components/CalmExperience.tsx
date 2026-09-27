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

  // Condition Selection State (Grounded in Student Survey & Sesi 05 PAS Framework)
  const [selectedFeeling, setSelectedFeeling] = useState<string>('lelah');

  // Ambient rain audio toggle
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

  // Sesi 05: 4 Kondisi Mahasiswa (Headline ringkas, lolos uji 3 detik, bahasa audiens)
  const conditionOptions = [
    {
      id: 'lelah',
      number: '01',
      icon: Clock,
      title: 'Lelah & Kurang Tidur',
      subtitle: 'Begadang tugas, tubuh lemas, dan sulit terlelap.'
    },
    {
      id: 'skripsi',
      number: '02',
      icon: FileText,
      title: 'Beban Tugas & Skripsi',
      subtitle: 'Revisi menumpuk, tenggat mepet, dan pikiran buntu.'
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
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* 
        ========================================================================
        KONTAINER 1 (WIREFRAME HOME - BAGIAN ATAS):
        Header Sapaan + Box Audio Relaksasi di Kanan
        Penerapan Sesi 05:
        - Headline lolos uji 3 detik: "Ambil Jeda, Pulihkan Fokus Kuliah"
        - Body: Singkat, jelas, tanpa kata mubazir
        - CTA aktif & spesifik: "Putar Audio Hujan"
        ========================================================================
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Sisi Kiri: Headline & Body */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3C6446]">
              <span>Ruang Rehat Mahasiswa</span>
              <span aria-hidden="true">·</span>
              <span>Layanan Mandiri Kampus</span>
            </div>

            {/* Headline Sesi 05: Menarik perhatian, lolos uji 3 detik */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#162A1D] font-heading leading-tight">
              Ambil Jeda, Pulihkan Fokus Kuliah
            </h1>

            {/* Body Sesi 05: Menjelaskan manfaat konkret tanpa kata mubazir */}
            <p className="text-xs sm:text-sm text-[#4C6654] leading-relaxed">
              Ruang mandiri untuk menenangkan pikiran di sela tugas kuliah, merapikan ritme tidur, serta terhubung dengan konselor sebaya tanpa rekam data akademik.
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5D7A66] pt-1 font-medium">
              <span>Privat & Anonim</span>
              <span aria-hidden="true">·</span>
              <span>100% Bebas Biaya</span>
              <span aria-hidden="true">·</span>
              <span>Terbuka untuk Seluruh Mahasiswa</span>
            </div>
          </div>

          {/* Sisi Kanan: Widget Audio Relaksasi Sesuai Wireframe */}
          <div className="shrink-0 bg-[#F4F8F4] rounded-xl p-4 sm:p-5 border border-[#D5E3D6] flex flex-col justify-between space-y-3 min-w-[240px]">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1E3B27] block">
                Audio Relaksasi Alam
              </span>
              <p className="text-[11px] text-[#55755E]">
                {isPlayingRain ? 'Suasana hujan sedang diputar' : 'Suara hujan pereda kebisingan pikiran'}
              </p>
            </div>

            {/* CTA Sesi 05: Aktif dan Spesifik (Bukan 'Klik di sini') */}
            <button
              onClick={toggleRain}
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                isPlayingRain 
                  ? 'bg-[#1E3B27] text-white'
                  : 'bg-white text-[#26442F] hover:bg-[#EAEFEA] border border-[#CCDCCD]'
              }`}
            >
              {isPlayingRain ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-300" />
                  <span>Hentikan Audio</span>
                  <span className="flex items-center gap-0.5 h-3">
                    <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-1 h-3 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  </span>
                </>
              ) : (
                <>
                  <Headphones className="w-4 h-4 text-[#3C6446]" />
                  <span>Putar Audio Hujan</span>
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        KONTAINER 2 (WIREFRAME HOME - BAGIAN KEDUA):
        Latihan Pernapasan 4-7-8 Terpusat
        Penerapan Sesi 05:
        - Headline: "Redakan Ketegangan dalam 1 Menit" (Lolos uji 3 detik)
        - Body: "Panduan ritme napas 4-7-8 untuk menurunkan detak jantung."
        - CTA: "Mulai Latihan Napas (1 Menit)"
        ========================================================================
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-6 sm:p-8 shadow-xs text-center space-y-5">
        <div className="max-w-md mx-auto space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3D6647] block">
            Jeda Fisik 1 Menit
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#162A1D] font-heading">
            Redakan Ketegangan dalam 1 Menit
          </h2>
          <p className="text-xs text-[#55725D] leading-relaxed">
            Panduan ritme napas 4-7-8 untuk menurunkan detak jantung dan merilekskan otot tubuh yang kaku.
          </p>

          {/* Indikator Ritme Terbaca Cepat */}
          <div className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-[#466B50]">
            <span className={`px-2.5 py-1 rounded-md transition-colors ${
              breathingActive && breathPhase === 'tarik' ? 'bg-[#1E3B27] text-white font-bold' : 'bg-[#F2F7F3]'
            }`}>
              Tarik (4d)
            </span>
            <span className="text-[#89AC91]">·</span>
            <span className={`px-2.5 py-1 rounded-md transition-colors ${
              breathingActive && breathPhase === 'tahan' ? 'bg-[#1E3B27] text-white font-bold' : 'bg-[#F2F7F3]'
            }`}>
              Tahan (7d)
            </span>
            <span className="text-[#89AC91]">·</span>
            <span className={`px-2.5 py-1 rounded-md transition-colors ${
              breathingActive && breathPhase === 'hembuskan' ? 'bg-[#1E3B27] text-white font-bold' : 'bg-[#F2F7F3]'
            }`}>
              Hembuskan (8d)
            </span>
          </div>
        </div>

        {/* Lingkaran Visual Sesuai Wireframe Lingkaran Besar di Tengah */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative flex items-center justify-center w-52 h-52 sm:w-56 sm:h-56">
            
            {/* Outer Halo */}
            <div 
              className={`absolute rounded-full transition-all duration-1000 ease-in-out ${
                breathingActive
                  ? breathPhase === 'tarik'
                    ? 'w-52 h-52 sm:w-56 sm:h-56 bg-[#DCEADB] opacity-90 scale-105'
                    : breathPhase === 'tahan'
                    ? 'w-52 h-52 sm:w-56 sm:h-56 bg-[#CCE0CA] opacity-95 scale-105'
                    : 'w-36 h-36 bg-[#E8F2E7] opacity-60 scale-95'
                  : 'w-44 h-44 bg-[#EDF5EC]'
              }`}
            />

            {/* Core Circle */}
            <div 
              className={`relative z-10 flex flex-col items-center justify-center rounded-full text-white shadow-sm transition-all duration-1000 ease-in-out ${
                breathingActive
                  ? breathPhase === 'tarik'
                    ? 'w-36 h-36 bg-[#2C5237] scale-105'
                    : breathPhase === 'tahan'
                    ? 'w-36 h-36 bg-[#1D3B25] scale-105 ring-2 ring-[#8FB995]'
                    : 'w-30 h-30 bg-[#3D6E4A] scale-90'
                  : 'w-36 h-36 bg-[#2B4B34]'
              }`}
            >
              {breathingActive ? (
                <>
                  <span className="text-[10px] font-medium tracking-wide text-emerald-100 uppercase">
                    {breathPhase === 'tarik' && 'Tarik napas'}
                    {breathPhase === 'tahan' && 'Tahan napas'}
                    {breathPhase === 'hembuskan' && 'Hembuskan'}
                  </span>
                  <span className="text-3xl font-bold font-mono mt-0.5">
                    {breathCount}s
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Wind className="w-6 h-6 text-emerald-200" />
                  <span className="text-xs font-bold text-white">4-7-8</span>
                </div>
              )}
            </div>
          </div>

          {/* Tombol Terpusat Sesuai Wireframe */}
          <div className="mt-3">
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
              className="px-6 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-xs bg-[#1F3D27] hover:bg-[#14291A] text-white cursor-pointer"
            >
              {breathingActive ? 'Hentikan Latihan' : 'Mulai Latihan Napas (1 Menit)'}
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        KONTAINER 3 (WIREFRAME HOME - BAGIAN KETIGA):
        Pemeriksaan Kondisi & Bar Saran Praktis
        Penerapan Sesi 05:
        - Layout: 4 Kartu dalam Grid 2×2 Sesuai Wireframe
        - Framework Persuasi: PAS (Problem - Agitate - Solve) di Bar Horizontal!
        - CTA Aktif & Spesifik di setiap solusi
        ========================================================================
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-6 sm:p-8 shadow-xs space-y-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#162A1D] font-heading">
            Apa yang Sedang Kamu Rasakan Hari Ini?
          </h2>
          <p className="text-xs text-[#526F5A] mt-0.5">
            Pilih salah satu kondisi di bawah untuk melihat saran penanganan langsung:
          </p>
        </div>

        {/* 4 Kartu dalam Grid 2x2 Persis Gambar Wireframe Canva Dosen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {conditionOptions.map((item) => {
            const isSelected = selectedFeeling === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedFeeling(item.id)}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#F4F8F4] border-[#2A4D33] ring-1 ring-[#2A4D33] shadow-xs'
                    : 'bg-[#FAFBF9] border-[#E2EBE3] hover:border-[#CADACD]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#1E3B27] text-white' : 'bg-[#EBF3EC] text-[#294B32]'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#6C8A74]">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#182C1F]">{item.title}</h3>
                  <p className="text-xs text-[#526F5A] mt-1 leading-relaxed">{item.subtitle}</p>
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

        {/* 
          BAR REKOMENDASI HORIZONTAL (Sesuai Wireframe Canva)
          Menerapkan Framework PAS Sesi 05 (Problem - Agitate - Solve):
          - Problem: Masalah audiens yang relevan
          - Agitate: Konsekuensi singkat tanpa hiperbola
          - Solve: Solusi praktis dan menenangkan
          - Action: CTA spesifik mengundang tindakan segera
        */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#F6FAF7] border border-[#D7E6D9] text-[#243F2B] space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2A4D33] shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
              {selectedFeeling === 'lelah' && (
                <>
                  <p className="font-bold text-[#183120]">
                    Solusi: Pulihkan Jam Tidur Alami
                  </p>
                  <p className="text-[#3E5C46]">
                    Begadang berkepanjangan menurunkan konsentrasi kuliah pagi dan memicu kelelahan kronis. Beri jeda dari layar gawai 30 menit sebelum tidur, redupkan lampu kamar, dan catat jam tidurmu untuk memantau pemulihan fisik.
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

          {/* CTA Sesi 05: Aktif dan Spesifik (Bukan 'Klik di sini') */}
          <div className="pl-8 pt-0.5 flex flex-wrap items-center gap-2">
            {selectedFeeling === 'lelah' && (
              <button
                onClick={() => onNavigate?.('tidur')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#213F29] text-white hover:bg-[#152B1B] transition-all cursor-pointer"
              >
                <span>Catat Jam Tidur Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {selectedFeeling === 'skripsi' && (
              <button
                onClick={() => onNavigate?.('konsultasi')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#213F29] text-white hover:bg-[#152B1B] transition-all cursor-pointer"
              >
                <span>Jadwalkan Konsultasi Sebaya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {selectedFeeling === 'rantau' && (
              <button
                onClick={() => onNavigate?.('forum')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#213F29] text-white hover:bg-[#152B1B] transition-all cursor-pointer"
              >
                <span>Buka Forum Diskusi Rantau</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {selectedFeeling === 'diskusi' && (
              <button
                onClick={() => onNavigate?.('konsultasi')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#213F29] text-white hover:bg-[#152B1B] transition-all cursor-pointer"
              >
                <span>Pilih Teman Cerita Anonim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        KONTAINER 4 (WIREFRAME HOME - BAGIAN KEEMPAT):
        Tiga Layanan Inti Mahasiswa (3 Kolom Berdampingan Sesuai Wireframe Canva)
        Penerapan Sesi 05:
        - Struktur: Headline menarik, Body menjelaskan manfaat, CTA spesifik
        ========================================================================
      */}
      <section className="bg-white rounded-2xl border border-[#DCE6DD] p-6 sm:p-8 shadow-xs space-y-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3D6647] block mb-0.5">
            Layanan Utama
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#162A1D] font-heading">
            Tiga Layanan Pendukung Mahasiswa
          </h2>
          <p className="text-xs text-[#55725D] mt-0.5">
            Fasilitas mandiri yang dirancang berdasarkan hasil riset kebutuhan mahasiswa.
          </p>
        </div>

        {/* 3 Kolom Kartu Berdampingan Sesuai Wireframe Canva */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Pilar 1: Konsultasi Sebaya */}
          <div className="bg-[#FAFBF9] rounded-xl border border-[#E2EBE3] p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#172D1E] font-heading">
                Konseling Sebaya 1-on-1
              </h3>
              <p className="text-xs text-[#4F6C57] leading-relaxed">
                Ngobrol privat bersama konselor sebaya terlatih atau psikolog kampus. Rahasia terjamin tanpa rekam data akademik.
              </p>
            </div>
            
            <button
              onClick={() => onNavigate?.('konsultasi')}
              className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#EDF4ED] text-[#24432C] border border-[#D8E6D9] transition-all cursor-pointer"
            >
              <span>Pilih Teman Cerita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pilar 2: Forum Mahasiswa */}
          <div className="bg-[#FAFBF9] rounded-xl border border-[#E2EBE3] p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#172D1E] font-heading">
                Forum Curhat Anonim
              </h3>
              <p className="text-xs text-[#4F6C57] leading-relaxed">
                Ruang berbagi cerita seputar dinamika kampus, tips skripsi, hingga keluh kesah rantau dengan perlindungan bebas perundungan.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.('forum')}
              className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#EDF4ED] text-[#24432C] border border-[#D8E6D9] transition-all cursor-pointer"
            >
              <span>Masuk ke Forum Diskusi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pilar 3: Sleep Tracker */}
          <div className="bg-[#FAFBF9] rounded-xl border border-[#E2EBE3] p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#172D1E] font-heading">
                Catatan Jam Tidur
              </h3>
              <p className="text-xs text-[#4F6C57] leading-relaxed">
                Pantau jam istirahat harian untuk memulihkan ritme sirkadian tubuh agar tetap berenergi saat kuliah pagi.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.('tidur')}
              className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#EDF4ED] text-[#24432C] border border-[#D8E6D9] transition-all cursor-pointer"
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
