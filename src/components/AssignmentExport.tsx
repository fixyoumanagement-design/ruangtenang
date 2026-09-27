import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Sparkles } from 'lucide-react';
import { SCREENS, USER_FLOW_STEPS } from '../data/dvcData';

export const AssignmentExport: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const fullReportText = `================================================================================
LAPORAN TUGAS SESI 04: DIGITAL VISUAL COMMUNICATION (DVC)
Mata Kuliah: Digital Visual Communication
Program Studi: Bisnis Digital · Universitas Cakrawala
Topik: Wireframe - From Research to Structure
Nama Proyek: RuangTenang Mahasiswa (KampusCare)
================================================================================

1. LATAR BELAKANG & KEBUTUHAN PENGGUNA (DARI RISET SESI 03)
--------------------------------------------------------------------------------
Berdasarkan Journal of Mental Health Concerns Vol.4 No.2 (2025), 16.7% mahasiswa
di Indonesia mengalami kecemasan berat akibat akumulasi tekanan akademik/skripsi,
kondisi perantauan yang jauh dari keluarga, serta gangguan tidur (insomnia).

Tujuan Utama Produk:
Menghadirkan webapp dan ruang aman digital yang dapat diakses dengan cepat,
mudah, dan bebas dari stigma oleh mahasiswa aktif di Indonesia.

Segmentasi Pengguna:
a. Mahasiswa yang sedang menyusun skripsi (burnout & cemas masa depan)
b. Mahasiswa perantau (isolasi sosial & homesick)
c. Mahasiswa dengan gangguan tidur akibat stres akademik

--------------------------------------------------------------------------------
2. TENTUKAN USER FLOW (ALUR UTAMA PENGGUNA)
--------------------------------------------------------------------------------
Alur Utama:
[Mulai: Mahasiswa Mengalami Tekanan / Krisis]
  ↓
[Screen 1: Beranda Mahasiswa & Mood Check-in 5 Detik]
  ↓ (Pilihan Kebutuhan Mahasiswa)
  ├──> Jalur A: [Screen 2: Konsultasi Privat bersama Peer Supporter]
  ├──> Jalur B: [Screen 3: Forum Aman Anonim & Anti-Bullying]
  ├──> Jalur C: [Screen 4: Sleep Tracker & Ritme Sirkadian]
  └──> Jalur Darurat: [Screen 5: Modal Jalur Darurat Hotline 24 Jam]
  ↓
[Selesai: Validasi Emosional / Jadwal Konsultasi / Tindakan Krisis Tertangani]

Rasionalisasi Alur:
Dalam kondisi stres atau panik, alur tidak boleh berbelit-belit (maksimal 3 langkah
menuju solusi). Semua modul dapat diakses langsung dari Beranda tanpa memaksa
login identitas asli atau pengisian formulir panjang (Zero Dark-Pattern).

--------------------------------------------------------------------------------
3. DAFTAR 5 SCREEN WIREFRAME LOW-FIDELITY & HIERARKI
--------------------------------------------------------------------------------
SCREEN 1: BERANDA MAHASISWA & QUICK SOS BAR
- Tujuan: Memberikan evaluasi cepat kondisi emosional (mood check-in) dan akses
  cepat ke 3 pilar layanan serta tombol darurat.
- Elemen Inti:
  1. Sticky Top Bar: Logo, Indikator Anonim, dan Tombol SOS Krisis 24 Jam (Kontras Tinggi)
  2. Mood Check-in 5 Emotikon (Proximity rapat untuk pelaporan 1-sentuhan)
  3. 3 Kartu Layanan Inti (Konsultasi, Forum, Tracker Tidur) dengan left-alignment
  4. Banner edukasi riset kesehatan mental mahasiswa

SCREEN 2: LAYANAN KONSULTASI & PEER SUPPORTER
- Tujuan: Menghubungkan mahasiswa dengan konselor sebaya terlatih secara privat.
- Elemen Inti:
  1. Chip Filter Kategori (#Skripsi, #Perantau, #GangguanTidur)
  2. Kartu Konselor (Avatar siluet anonim, status ketersediaan, rating empati)
  3. Badge Subsidi Kampus 100% Gratis (Transparansi finansial)
  4. Tombol CTA Varian Primary "Pilih Jadwal Chat"

SCREEN 3: FORUM AMAN ANONIM & ANTI-BULLYING
- Tujuan: Ruang curhat bebas penghakiman dan intimidasi dengan perlindungan privasi.
- Elemen Inti:
  1. Notice Aturan Komunitas & Janji Anti-Bullying
  2. Kotak Input Cerita dengan Toggle [Posting sebagai Anonim] aktif secara default
  3. Feed Diskusi dengan reaksi positif ("Peluk Online") dan tombol laporkan (Flag)

SCREEN 4: SLEEP TRACKER & RITME SIRKADIAN
- Tujuan: Mencatat jam tidur dan mengidentifikasi korelasi antara begadang dan kecemasan.
- Elemen Inti:
  1. Form input cepat (Jam tidur, jam bangun, skala kesegaran tubuh)
  2. Grafik batang pola tidur 7 hari terakhir dengan garis target 7-8 jam
  3. Kartu rekomendasi relaksasi audio theta waves 15 menit

SCREEN 5: MODAL JALUR DARURAT & ESKALASI KRISIS (HOTLINE 24 JAM)
- Tujuan: Intervensi darurat instan saat terdeteksi indikasi depresi akut / panik berat.
- Elemen Inti:
  1. Headline status siaga yang menenangkan ("Kamu Tidak Sendiri")
  2. Tombol Panggilan 1-Klik ke Hotline Sejiwa 119 ext 8 & Satgas Kampus
  3. Panduan latihan pernapasan cepat (Teknik 4-7-8) untuk meredakan serangan panik
  4. Akses langsung tanpa hambatan login atau formulir

--------------------------------------------------------------------------------
4. PENERAPAN 4 PRINSIP DESAIN VISUAL (CRAP) & RASIONALNYA
--------------------------------------------------------------------------------
1. CONTRAST (Sesi 01 Slide 6):
   - Tombol "SOS KRISIS 24J" di header dan tombol panggil 119 di Modal Darurat
     diberi kontras warna tertinggi (aksen merah pada latar netral) sehingga
     langsung tertangkap mata dalam waktu < 1 detik (Lulus Uji 3 Detik).
   - Kartu layanan memiliki kontras batas (border 1px) yang membedakan kartu
     dengan latar belakang abu-abu terang.

2. REPETITION (Sesi 01 Slide 7 & Sesi 04 Slide 9-10):
   - Menggunakan Component Card yang identik untuk seluruh daftar konselor dan postingan forum.
   - Bentuk tombol (border-radius 8px, padding vertikal 10px, padding horizontal 20px)
     diulang secara seragam di seluruh halaman.

3. ALIGNMENT (Sesi 01 Slide 8):
   - Seluruh teks heading, deskripsi, dan tombol CTA menggunakan penataan rata kiri
     (Left-Aligned Grid). Mengikuti pola baca alami F-pattern sehingga mahasiswa
     yang sedang lelah tidak mengalami disorientasi visual.
   - Sumbu grafik batang pada Sleep Tracker disejajarkan pada baseline horizontal seragam.

4. PROXIMITY (Sesi 01 Slide 9):
   - Emotikon mood check-in dikelompokkan berdekatan dalam satu kontainer rapat.
   - Nama konselor, spesialisasi, dan status waktu ditempatkan berdekatan dengan fotonya,
     terpisah dari tombol aksi di sisi kanan.

5. ATURAN WARNA 60-30-10 & TIPOGRAFI:
   - 60% Dominan: Putih & Abu-abu terang (#F8FAFC) untuk ruang kosong dan latar bersih.
   - 30% Pendukung: Slate Navy (#1E293B) untuk teks utama, border kartu, dan struktur.
   - 10% Aksen: Teal untuk CTA reguler dan Rose Merah untuk tombol krisis darurat.
   - Tipografi: Maksimal 2 keluarga font sans-serif dengan rasio hierarki teratur
     (Heading 24-28px, Subheading 16-18px, Body 14px, Caption 11-12px).

--------------------------------------------------------------------------------
5. ETIKA DIGITAL & PENCEGAHAN DARK PATTERN (SESI 02)
--------------------------------------------------------------------------------
- Privasi & Anonimitas: Pengguna tidak dipaksa menghubungkan akun media sosial atau
  menginput nama lengkap/NIM untuk mengakses layanan bantuan awal.
- Anti-Confirmshaming: Tombol pembatalan/penolakan menggunakan kalimat netral
  ("Kembali ke Beranda"), bukan kalimat yang membuat merasa bersalah.
- Anti-Roach Motel: Pengguna dapat menutup sesi atau keluar kapan saja tanpa hambatan.
- Aksesibilitas: Teks memiliki kontras rasio minimal 4.5:1 (WCAG AA).

--------------------------------------------------------------------------------
6. CHECKLIST EVALUASI WIREFRAME (SESI 04 SLIDE 13)
--------------------------------------------------------------------------------
[✓] Kesesuaian Kebutuhan Pengguna:
    Menjawab problem 16.7% mahasiswa cemas berat melalui 3 solusi terintegrasi
    (Konsultasi, Forum Anti-Bullying, Tracker Tidur) + Jalur Eskalasi Darurat.
[✓] Prinsip Desain Visual:
    Contrast, Repetition, Alignment, dan Proximity diterapkan secara rasional.
[✓] Konsistensi Komponen:
    Button, Card, Navigation, dan Input didefinisikan sebagai komponen dasar reusable.
[✓] Kejelasan Alur & CTA:
    Mahasiswa paham langkah selanjutnya di setiap screen dalam waktu kurang dari 3 detik.

================================================================================
Disusun untuk Tugas Sesi 04 DVC · Universitas Cakrawala
================================================================================`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullReportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              EKSPOR DOKUMEN TUGAS 4
            </span>
            <span className="text-xs text-neutral-400 font-mono">2–3 Halaman Format Siap Kumpul</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-neutral-900 mt-1">
            Laporan Tugas Sesi 4: From Research to Structure
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Draf teks lengkap berstandar akademik yang merangkum User Flow, 5 Wireframe Screen, Rasional DVC (CRAP), Sistem Komponen, dan Checklist Evaluasi.
          </p>
        </div>

        <button
          onClick={copyToClipboard}
          className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm ${
            copied
              ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Tersalin ke Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Salin Semua Teks Laporan</span>
            </>
          )}
        </button>
      </div>

      {/* Structured Preview */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-[500px] overflow-y-auto leading-relaxed border border-slate-800">
        <pre className="whitespace-pre-wrap">{fullReportText}</pre>
      </div>

      <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-start space-x-3">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold mb-1">Panduan Penggunaan untuk Tugas 4 Anda:</strong>
          <ul className="list-disc pl-4 space-y-1 text-indigo-900">
            <li><strong>Di Figma / Adobe XD:</strong> Buat 5 Frame (ukuran Mobile 390x844px atau Desktop 1440x1024px), gambarkan kotak wireframe abu-abu mengikuti hierarki di tab Wireframe, lalu tambahkan anotasi stiker di samping kanvas.</li>
            <li><strong>Di Dokumen PDF (2–3 Halaman):</strong> Salin teks di atas, sertakan tangkapan layar (screenshot) wireframe yang telah dibuat, lalu sertakan bagian evaluasi checklist.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
