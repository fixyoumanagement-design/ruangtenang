import { ScreenData, UserFlowStep } from '../types';

export const PROJECT_BRIEF = {
  name: "RuangTenang Mahasiswa (KampusCare)",
  tagline: "Ekosistem Kesehatan Mental & Manajemen Kesejahteraan Mahasiswa Indonesia",
  background: "Berdasarkan Journal of Mental Health Concerns Vol.4 No.2 (2025), 16.7% mahasiswa Indonesia mengalami kecemasan berat akibat beban skripsi, adaptasi merantau, dan gangguan tidur.",
  targetSegment: [
    { title: "Mahasiswa Tingkat Akhir / Skripsi", desc: "Mengalami sindrom burnout, kebuntuan bimbingan, dan kecemasan masa depan." },
    { title: "Mahasiswa Perantau", desc: "Jauh dari sistem pendukung keluarga, rentan isolasi sosial dan krisis kesepian." },
    { title: "Mahasiswa dengan Gangguan Tidur", desc: "Mengalami insomnia, ritme sirkadian terbalik karena begadang dan screen-time berlebih." }
  ],
  pillars: [
    { name: "Konsultasi Terverifikasi", desc: "Chat privat dengan konselor sebaya (peer supporter) terlatih atau psikolog kampus." },
    { name: "Forum Aman Anonim", desc: "Ruang curhat bebas penghakiman khusus skripsi, adaptasi rantau, dan isu anti-bullying." },
    { name: "Sleep & Mood Tracker", desc: "Pencatatan kualitas tidur harian dan hubungannya dengan tingkat stres akademik." },
    { name: "Jalur Darurat & Eskalasi", desc: "Tombol SOS 1-klik terhubung langsung dengan hotline krisis dan Satgas kampus 24 jam." }
  ],
  ethicalGuidelines: "Zero Dark-Pattern: Privasi mutlak dengan enkripsi end-to-end, tombol batalkan/keluar yang setara, tidak ada confirmshaming, dan mode anonimitas sejati."
};

export const SCREENS: ScreenData[] = [
  {
    id: 'home',
    number: 1,
    title: "Beranda Utama & Akses Cepat (Home & Crisis Bar)",
    purpose: "Menjadi landing space yang tenang, memberikan evaluasi cepat kondisi emosional (mood check-in), serta jalur akses instan ke 3 pilar layanan dan tombol krisis darurat.",
    userGoal: "Menemukan bantuan tanpa merasa terintimidasi, melihat status kesejahteraan dirinya, dan dapat menekan tombol bantuan darurat dalam hitungan detik jika sedang panik.",
    keyComponents: [
      "Top Bar: Navigasi Profil Anonim & Tombol Merah Krisis SOS",
      "Header Sapaan Empatik & Indikator Cuaca Emosional (Mood Check-in)",
      "Grid 3 Kartu Layanan Inti (Konsultasi, Forum, Tracker Tidur)",
      "Widget Ringkasan Kualitas Tidur Semalam",
      "Kutipan Edukatif / Tips Regulasi Emosi Singkat"
    ],
    dvcNotes: [
      {
        principle: 'Contrast',
        target: 'Tombol Krisis Darurat (SOS)',
        rationale: 'Menggunakan kontras tertinggi (latar merah terang/aksen tebal) di sudut kanan atas agar dalam kondisi panik kognitif ekstrem, tombol langsung tertangkap retina (< 1 detik).',
        researchLink: 'Kebutuhan jalur eskalasi darurat pada mahasiswa yang mengalami episode depresi/panik akut.',
        lessonRef: 'Sesi 01 (Slide 6) - Contrast tinggi membuat informasi darurat langsung terlihat tanpa berebut perhatian.'
      },
      {
        principle: 'Alignment',
        target: 'Tata Letak Kartu Layanan (Grid 3 Kolom Kiri)',
        rationale: 'Semua judul modul, teks pengantar, dan ikon disejajarkan rata kiri (Left-aligned). Mengikuti F-pattern pemindaian mata alami manusia sehingga otak mahasiswa yang lelah tidak terbebani membaca layout acak.',
        researchLink: 'Beban kognitif mahasiswa skripsi yang sudah tinggi memerlukan pemindaian visual effortless.',
        lessonRef: 'Sesi 01 (Slide 8) - Alignment menjaga kerapian dan membuat audiens mudah memindai konten.'
      },
      {
        principle: 'Proximity',
        target: 'Mood Check-in Selector',
        rationale: '5 emotikon status mood ditempatkan dalam satu kontainer rapat dengan label keterangan yang melekat pada masing-masing ikon, memberi kesan satu kelompok tugas interaksi.',
        researchLink: 'Mempermudah pelaporan self-reported mood harian mahasiswa dalam 1 kali sentuhan.',
        lessonRef: 'Sesi 01 (Slide 9) - Proximity mengelompokkan elemen terkait tanpa perlu label panjang.'
      },
      {
        principle: 'Etika & HCD',
        target: 'Privasi & Tanpa Dark Pattern',
        rationale: 'Tidak menampilkan nama asli mahasiswa di layar depan; hanya menggunakan avatar ilustrasi atau alias unik kampus untuk menjamin rasa aman (psychological safety).',
        researchLink: 'Ethical consideration: Memperketat privasi dan enkripsi untuk menghilangkan rasa takut distigma.',
        lessonRef: 'Sesi 02 (Slide 13-14) - Etika bisnis digital: transparansi & perlindungan privasi data pengguna.'
      },
      {
        principle: 'Copywriting Visual',
        target: 'Headline, Body & CTA Seluruh Kontainer',
        rationale: 'Menerapkan Uji 3 Detik pada headline ("Ambil Jeda, Pulihkan Fokus Kuliah"), struktur Headline-Body-CTA aktif ("Putar Audio Hujan", "Catat Jam Tidur Sekarang"), serta framework PAS (Problem-Agitate-Solve) pada saran kondisi mahasiswa tanpa kata mubazir.',
        researchLink: 'Copywriting yang singkat, jelas, dan berorientasi manfaat nyata bagi mahasiswa mencegah cognitive overload.',
        lessonRef: 'Sesi 05 (Slide 3-15) - Copywriting untuk Visual: Headline-Body-CTA, Framework PAS, & Uji 3 Detik.'
      }
    ],
    testingChecklist: [
      { question: "Apakah tombol bantuan krisis dapat ditemukan dalam < 3 detik?", passed: true, explanation: "Diletakkan di sticky header kanan atas dengan kontras tajam (Uji 3 Detik Sesi 01)." },
      { question: "Apakah hierarki memandu dari mood check-in ke pilihan layanan utama?", passed: true, explanation: "Heading menyapa -> Check-in singkat -> 3 Kartu Layanan Besar -> Ringkasan Tidur." },
      { question: "Apakah ruang kosong (negative space) cukup agar tidak memicu kecemasan visual?", passed: true, explanation: "Padding kontainer 24px, gap 16px, tanpa elemen dekoratif berlebih." }
    ]
  },
  {
    id: 'consultation',
    number: 2,
    title: "Layanan Konsultasi & Pilih Peer Supporter",
    purpose: "Menghubungkan mahasiswa dengan konselor sebaya terlatih atau psikolog profesional dengan filter isu spesifik (skripsi, adaptasi rantau, kecemasan).",
    userGoal: "Memilih konselor yang cocok dengan latar belakang masalahnya secara transparan dan membuat janji chat privat tanpa prosedur berbelit.",
    keyComponents: [
      "Filter Topik Masalah (Chips: #Skripsi, #Perantau, #GangguanTidur, #Relasi)",
      "Kartu Daftar Konselor (Foto siluet anonim/avatar, status online, rating empati, latar belakang fakultas)",
      "Informasi Garansi Kerahasiaan (Privacy Badge)",
      "Tombol Jadwalkan Chat / Mulai Sesi Instan"
    ],
    dvcNotes: [
      {
        principle: 'Hierarki',
        target: 'Kartu Konselor (Name, Expertise, CTA)',
        rationale: 'Ukuran nama konselor (18px Semi-Bold) -> Spesialisasi (14px Regular) -> Jadwal Ketersediaan (12px Muted) -> Tombol "Pilih Jadwal" (Warna Aksen 10%). Hierarki visual tegas memandu mata dari pengenalan ke tindakan.',
        researchLink: 'Mahasiswa butuh kepastian bahwa konselor memahami spesifikasi masalahnya (misal sama-sama mahasiswa akhir).',
        lessonRef: 'Sesi 01 (Slide 18-20) - Sistem tipografi membangun urutan baca logis.'
      },
      {
        principle: 'Repetition',
        target: 'Komponen Kartu Konselor (Card Component)',
        rationale: 'Setiap kartu konselor memakai struktur layout identik: foto di kiri, kredensial di tengah, tombol CTA di kanan bawah. Pengulangan ini mempercepat pembandingan antar konselor.',
        researchLink: 'Mengurangi rasa bingung (decision paralysis) saat mahasiswa sedang gelisah.',
        lessonRef: 'Sesi 04 (Slide 9-10) - Satu component dipakai berulang menjaga konsistensi desain sejak wireframe.'
      },
      {
        principle: 'Etika & HCD',
        target: 'Transparansi Ketersediaan & Biaya',
        rationale: 'Layanan tertera jelas 100% Gratis & Didanai Kampus / Subsidi. Tidak ada jebakan biaya tersembunyi (No Sneak into Basket) atau pengisian data 15 formulir di muka.',
        researchLink: 'Mahasiswa perantau sangat sensitif terhadap isu finansial dan kejelasan komitmen waktu.',
        lessonRef: 'Sesi 02 (Slide 14) - Menghindari dark pattern Misdirection dan Sneak into Basket.'
      }
    ],
    testingChecklist: [
      { question: "Apakah ada filter cepat untuk 3 segmentasi riset (skripsi/rantau/tidur)?", passed: true, explanation: "Disediakan Chips filter di bagian atas halaman." },
      { question: "Apakah CTA di setiap kartu memiliki penekanan visual yang seragam?", passed: true, explanation: "Menggunakan Button Component varian Primary dengan ukuran 40px." },
      { question: "Apakah kerahasiaan data dijamin sebelum pengguna klik booking?", passed: true, explanation: "Ada security badge '100% Terenkripsi & Anonim' di dekat tombol konfirmasi." }
    ]
  },
  {
    id: 'forum',
    number: 3,
    title: "Forum Komunitas Aman & Anti-Bullying",
    purpose: "Ruang diskusi komunitas moderasi ketat di mana mahasiswa dapat berbagi cerita, mencari solusi bersama, serta saling menguatkan dengan rasa aman dari penghakiman dan cyberbullying.",
    userGoal: "Membaca pengalaman sesama pejuang skripsi/perantau, membagikan keresahan dengan alias anonim, dan mendapatkan validasi emosional.",
    keyComponents: [
      "Panduan Komunitas & Janji Anti-Bullying (Community Safety Notice)",
      "Input Box 'Tulis Curhat Aman' dengan toggle [Posting sebagai Anonim]",
      "Filter Kategori Diskusi (#CurhatSkripsi, #HomesickRantau, #TipsInsomnia)",
      "Feed Kartu Postingan (Alias anonim, cap waktu, isi curhat, tombol Dukung & Komentar)",
      "Tombol 'Laporkan Postingan' yang mudah diakses untuk pencegahan bullying"
    ],
    dvcNotes: [
      {
        principle: 'Contrast',
        target: 'Notice Kotak Moderasi Aman',
        rationale: 'Diberi bingkai latar dengan kontras lembut (soft muted background) untuk menekankan norma ruang aman tanpa membuat pengguna merasa diawasi seperti penjara.',
        researchLink: 'Hasil riset: mahasiswa enggan curhat di media sosial konvensional karena takut diejek atau discreenshot.',
        lessonRef: 'Sesi 01 (Slide 6) - Contrast digunakan untuk menonjolkan batas konteks ruang aman.'
      },
      {
        principle: 'Proximity',
        target: 'Tombol Interaksi Postingan (Dukungan Semangat & Balas)',
        rationale: 'Jumlah dukungan Peluk Online dan ikon Balas ditaruh tepat di bawah teks cerita dengan jarak rapat (8px), memisahkan konten postingan dengan postingan berikutnya melalui divider 24px.',
        researchLink: 'Mengelompokkan reaksi sosial dengan pesan asli agar makna respons tidak tertukar.',
        lessonRef: 'Sesi 01 (Slide 9) - Proximity kedekatan elemen memperjelas hubungan informasi.'
      },
      {
        principle: 'Etika & HCD',
        target: 'Pelaporan 1-Klik Anti-Bullying',
        rationale: 'Tombol laporkan diberi ikon bendera di sudut tiap post, langsung memicu moderasi AI otomatis tanpa mempermalukan pembuat laporan.',
        researchLink: 'Initial Solution #2: Forum Aman bebas intimidasi dan tekanan akademik.',
        lessonRef: 'Sesi 02 (Slide 13) - Aksesibilitas dan keamanan ruang digital mahasiswa.'
      }
    ],
    testingChecklist: [
      { question: "Apakah identitas penulis terlindungi secara default?", passed: true, explanation: "Toggle 'Posting sebagai Anonim' aktif secara otomatis." },
      { question: "Apakah tombol pelaporan terpisah jelas dari tombol interaksi positif?", passed: true, explanation: "Ikon report diletakkan di menu opsi tersendiri agar tidak salah klik." }
    ]
  },
  {
    id: 'sleep',
    number: 4,
    title: "Tracker Kualitas Tidur & Ritme Sirkadian",
    purpose: "Membantu mahasiswa mendata durasi tidur, jam tidur/bangun, serta mengidentifikasi faktor pemicu insomnia (misal revisi skripsi larut malam atau kafein).",
    userGoal: "Melihat pola tidur mingguan secara visual dan mendapatkan rekomendasi personal agar tidak lesu saat kuliah pagi.",
    keyComponents: [
      "Input Sederhana: Jam Mulai Tidur, Jam Bangun, dan Skala Kesegaran (1-5)",
      "Grafik Batang Pola Tidur 7 Hari Terakhir (Target: 7-8 Jam)",
      "Checklist Faktor Pengganggu (Screen-time, Kopi/Energi, Cemas Skripsi)",
      "Kartu Insight Berbasis Riset: 'Korelasi Begadang & Tingkat Stres'",
      "CTA Audio Terapi: 'Dengarkan Suara Hujan Relaksasi 15 Menit'"
    ],
    dvcNotes: [
      {
        principle: 'Alignment',
        target: 'Visualisasi Grafik Batang & Label Hari',
        rationale: 'Setiap batang hari Senin-Minggu disejajarkan pada baseline horizontal yang sama dengan garis putus-putus target tidur 7 jam, memudahkan mata membandingkan defisit tidur seketika.',
        researchLink: 'Segmen 3: Mahasiswa dengan gangguan tidur membutuhkan umpan balik visual yang objektif dan mudah dipahami.',
        lessonRef: 'Sesi 01 (Slide 8) & Sesi 04 (Slide 6) - Alignment garis dasar pada diagram.'
      },
      {
        principle: 'Hierarki',
        target: 'Metrik Utama (Rata-rata Durasi Tidur: 5.2 Jam/Malam)',
        rationale: 'Angka metrik ditampilkan besar (36px Bold) dengan status warna netral-peringatan, diikuti penjelasan ukuran lebih kecil (14px).',
        researchLink: 'Memberikan informasi kunci langsung tanpa memaksa pengguna menghitung manual.',
        lessonRef: 'Sesi 01 (Slide 18) - Klasifikasi font dan pembagian heading vs body text.'
      },
      {
        principle: 'Ruang Kosong',
        target: 'Spacing Antar Sesi Input dan Grafik',
        rationale: 'Memberi padding minimal 20px antara input harian dan grafik statistik agar layar tidak terasa padat dan membingungkan (cognitive overload).',
        researchLink: 'Pengguna yang kurang tidur memiliki rentang konsentrasi lebih pendek.',
        lessonRef: 'Sesi 01 (Slide 10) - Ruang kosong memberi napas pada elemen penting.'
      }
    ],
    testingChecklist: [
      { question: "Apakah proses pencatatan tidur selesai dalam kurang dari 30 detik?", passed: true, explanation: "Hanya 3 input cepat (jam tidur, bangun, dan centang faktor)." },
      { question: "Apakah ada korelasi yang jelas antara kurang tidur dan rekomendasi solusi?", passed: true, explanation: "Disertai kartu insight relaksasi audio di bagian bawah." }
    ]
  },
  {
    id: 'emergency',
    number: 5,
    title: "Modal Jalur Darurat & Eskalasi Krisis (Hotline 24 Jam)",
    purpose: "Jalur darurat instan berprioritas tinggi jika terdeteksi indikasi krisis depresi akut, self-harm, atau kekerasan bullying di lingkungan kampus.",
    userGoal: "Mendapatkan bantuan manusia secara langsung dalam hitungan detik tanpa hambatan teknis atau pertanyaan berbelit.",
    keyComponents: [
      "Header Status Siaga: 'Kamu Tidak Sendiri. Bantuan Tersedia Sekarang.'",
      "Tombol Panggil Darurat 1-Klik (Hotline Kesehatan Jiwa Nasional 119 ext 8 & Satgas Kampus)",
      "Pilihan Chat Cepat dengan Psikolog Siaga",
      "Latihan Pernapasan Cepat (Grounding Exercise 4-7-8) untuk meredakan serangan panik",
      "Tombol Tutup / Kembali yang Tenang dan Mudah Dijangkau"
    ],
    dvcNotes: [
      {
        principle: 'Contrast',
        target: 'Tombol Panggilan 119 / Tim Siaga',
        rationale: 'Menggunakan kontras maksimal latar warna aksen hangat dengan teks putih tegas. Ukuran tombol memenuhi lebar layar (full-width 48px height) agar mudah ditekan bahkan saat tangan bergetar karena panik.',
        researchLink: 'Initial Solution #3: Deteksi & Eskalasi layanan darurat saat mahasiswa berada di fase krisis.',
        lessonRef: 'Sesi 01 (Slide 6) - Contrast tinggi untuk CTA krusial penyelamat hidup.'
      },
      {
        principle: 'Hierarki',
        target: 'Penataan Urutan Bantuan',
        rationale: '1. Telepon Bantuan Langsung (Paling Cepat) -> 2. Chat Psikolog Siaga -> 3. Tombol Relaksasi Mandiri. Penataan ini memprioritaskan keselamatan pengguna di atas eksplorasi mandiri.',
        researchLink: 'Kecepatan respons penanganan adalah indikator sukses utama di dokumen brief (Scope 7).',
        lessonRef: 'Sesi 04 (Slide 6) - Susun elemen sesuai hierarki kebutuhan, bukan urutan yang sekadar menarik.'
      },
      {
        principle: 'Etika & HCD',
        target: 'Bebas Hambatan & Tanpa Formulir',
        rationale: 'Tidak meminta login ulang, tidak meminta pengisian data pribadi, dan tidak ada jeda verifikasi. Hak hidup dan keselamatan adalah prioritas etis tertinggi.',
        researchLink: 'Zero dark-pattern; penghapusan semua friction dalam situasi darurat.',
        lessonRef: 'Sesi 02 (Slide 13) - Human-Centered Design mengutamakan keselamatan dan empati sejati.'
      }
    ],
    testingChecklist: [
      { question: "Apakah tombol telepon langsung memicu panggilan tanpa formulir lanjutan?", passed: true, explanation: "Direct call action (tel: protocol) terpasang langsung." },
      { question: "Apakah ada opsi pembatalan jika pengguna tidak sengaja menekan?", passed: true, explanation: "Tombol 'Kembali ke Beranda' tersedia jelas di bagian bawah." }
    ]
  }
];

export const USER_FLOW_STEPS: UserFlowStep[] = [
  {
    stepNumber: 1,
    screenTitle: "Screen 1: Beranda Mahasiswa",
    userAction: "Mahasiswa membuka aplikasi saat merasa kewalahan dengan beban skripsi/kurang tidur.",
    systemResponse: "Menampilkan sapaan empatik anonim, evaluasi cepat mood hari ini, dan tombol SOS Krisis di bagian atas.",
    decisionPoint: "Apakah mahasiswa butuh bicara dengan orang (Konsultasi), ingin membaca pengalaman sesama (Forum), mengecek kondisi fisik (Tracker), atau butuh bantuan darurat (SOS)?",
    researchEvidence: "Brief riset: Mahasiswa butuh ruang yang dapat diakses dengan cepat dan tidak menakutkan (Goal 4)."
  },
  {
    stepNumber: 2,
    screenTitle: "Screen 2: Konsultasi / Screen 3: Forum",
    userAction: "Mahasiswa memilih 'Konsultasi Sebaya' atau masuk ke 'Forum Curhat Anonim'.",
    systemResponse: "Sistem menyaring daftar peer-supporter sesuai topik #Skripsi, atau membuka feed forum yang telah dimoderasi AI.",
    decisionPoint: "Apakah ingin chat 1-on-1 privat sekarang juga atau membaca diskusi anonim terlebih dahulu?",
    researchEvidence: "16.7% mahasiswa kecemasan berat seringkali butuh validasi bahwa mereka tidak berjuang sendirian."
  },
  {
    stepNumber: 3,
    screenTitle: "Screen 4: Sleep Tracker / Sesi Konsultasi",
    userAction: "Mahasiswa mencatat durasi tidur setelah sesi konsultasi, menghubungkan kualitas tidur dengan tingkat kecemasannya.",
    systemResponse: "Grafik menampilkan tren defisit tidur mingguan dan memberikan rekomendasi intervensi relaksasi.",
    decisionPoint: "Apakah mahasiswa ingin mengatur pengingat jam tidur atau mendengar audio relaksasi?",
    researchEvidence: "Gangguan tidur adalah pemicu fisiologis utama depresi pada mahasiswa perantau."
  },
  {
    stepNumber: 4,
    screenTitle: "Screen 5: Jalur Eskalasi / Selesai",
    userAction: "Bila terdeteksi indikasi krisis berat, sistem langsung menampilkan modal SOS 1-klik untuk hotline 24 jam.",
    systemResponse: "Panggilan terhubung ke konselor krisis darurat kampus atau nomor 119.",
    decisionPoint: "Panggilan darurat tersambung atau pengguna melakukan teknik pernapasan grounding.",
    researchEvidence: "Indikator keberhasilan: kecepatan respons & penanganan darurat tanpa hambatan."
  }
];

export const COMPONENT_SYSTEM = {
  buttons: [
    { name: "Button Primary (CTA)", use: "Aksi utama seperti 'Mulai Konsultasi' atau 'Kirim Curhat'", visual: "Warna Aksen Solid (10% Palet), Teks Kontras, Radius 8-12px, Padding 12px 24px (Rasio 1:2)" },
    { name: "Button Secondary (Ghost/Outline)", use: "Aksi alternatif seperti 'Pilih Jadwal Lain' atau 'Batal'", visual: "Border 1px abu-abu, Latar transparan, Teks netral gelap" },
    { name: "Button Emergency (Crisis SOS)", use: "Khusus jalur darurat 24 jam", visual: "Merah mencolok, teks tebal putih, icon peringatan/telepon, efek visual tegas" }
  ],
  cards: [
    { name: "Service Card (Kartu Layanan)", use: "Pintu masuk Beranda ke Konsultasi, Forum, dan Tracker", visual: "Background netral terang, border 1px subtle, icon di kiri atas, judul + deskripsi ringkas" },
    { name: "Counselor Card", use: "Menampilkan profil peer supporter terverifikasi", visual: "Avatar di kiri, badge rating & fakultas, tombol booking di kanan bawah" },
    { name: "Forum Post Card", use: "Menampilkan curhat anonim di feed", visual: "Tag topik pill, avatar acak, isi teks, counter peluk online & balas" },
    { name: "Sleep Metric Card", use: "Menampilkan angka jam tidur & grafik mini", visual: "Angka display besar (32px), label satuan, bar progress horizontal" }
  ],
  navigation: [
    { name: "Top Header Navigation", use: "Navigasi utama desktop & mobile web", visual: "Logo di kiri, Status Mood/Koneksi di tengah, Tombol SOS Krisis di kanan" },
    { name: "Bottom App Navigation", use: "Navigasi cepat satu jempol pada layar smartphone", visual: "4 Tab: Beranda, Konsultasi, Forum, Tracker Tidur (Tinggi 64px, target tap 44px+)" }
  ],
  inputs: [
    { name: "Text Input / Text Area", use: "Ketik pesan curhat atau catatan tidur", visual: "Border abu-abu netral, focus ring kontras, placeholder netral informatif" },
    { name: "Anonymous Toggle Switch", use: "Memastikan identitas terlindungi saat posting", visual: "Switch toggle dengan label jelas: 'Posting sebagai Anonim (Disarankan)'" },
    { name: "Filter Chips", use: "Filter topik cepat (#Skripsi, #Perantau)", visual: "Pill rounded penuh, background abu muda jika inaktif, aksen solid jika aktif" }
  ]
};
