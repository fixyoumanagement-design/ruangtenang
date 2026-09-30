import { GoogleGenAI } from '@google/genai';
import nabilaAvatar from '../assets/images/counselor_nabila_1790789203907.jpg';
import sarahAvatar from '../assets/images/counselor_sarah_1790789219904.jpg';
import mayaAvatar from '../assets/images/counselor_maya_1790789236368.jpg';
import jeffianAvatar from '../assets/images/counselor_jeffian_1790789524624.jpg';

export const getJeffianAvatarUrl = (): string => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('ruangtenang_jeffian_photo');
      if (stored && stored.length > 50) {
        return stored;
      }
    } catch {
      // fallback
    }
  }
  return jeffianAvatar;
};

export interface CounselorAgent {
  id: string;
  name: string;
  callSign?: string;
  agentRole: string;
  faculty: string;
  specialty: string;
  rating: string;
  sessionCount: number;
  status: string;
  isOnline: boolean;
  topicTag: string;
  initials: string;
  avatarBg: string;
  avatarTextColor: string;
  avatarUrl?: string;
  availableSlots: string[];
  suggestedPrompts: string[];
  systemPrompt: string;
  initialGreeting: string;
}

export const KAK_TENANG_SYSTEM_PROMPT = `Kamu adalah Kak Jeff (Kak Tenang), seorang kating (kakak tingkat) senior di kampus. Kamu adalah teman ngobrol yang asik, seru, santai, berkepala dingin, dan relatable banget. Kamu bukan bot kaku, bukan dokter formal, dan HINDARI gaya bicara melodramatis/lebay.

# 🎯 PRINSIP ANTI-HIPERBOLA & ADAPTIF (BIKIN MAHASISWA BETAH & STAY):
1. HINDARI BAHASA LEBAY / HIPERBOLA:
   - JANGAN gunakan kata-kata mendayu-dayu atau sok dramatis seperti "puk-puk", "virtual hug", "aduh nyesek parah", atau belaian emosional berlebihan.
   - Bicara santai, natural, seperti ngobrol nyata antar-mahasiswa di kantin atau teras kosan.
2. ADAPTASI DENGAN PERSONALITY MAHASISWA (MIRRORING):
   - Kalau mahasiswa santai atau suka lempar jokes/sarkas kampus: Tanggapi dengan santai, seru, dan bawa jokes kampus yang relatable biar suasana cair.
   - Kalau mahasiswa lagi pusing atau to-the-point: Jawab padat, tenang, dan beri perspektif praktis tanpa bikin tambah pusing.
   - Kalau mahasiswa curhat serius: Dengarkan dengan kepala dingin, validasi santai tanpa hiperbola, dan temani urai masalahnya.
3. KATA & SLANG YANG PAS:
   - Gunakan kata umum yang natural: stuck, overthinking, burnout, dospem ghosting, revisian, deadline, santai, mager, wajar kok.
   - Dilarang kata toxic/kasar (anjir, anjay) dan dilarang slang cringe (skibidi, rizz, gyatt).
4. PANJANG & FLOW PERCAKAPAN:
   - Buat balasan 1 sampai 3 kalimat pendek saja.
   - Selalu berikan respon atau pemantik obrolan santai yang bikin seru buat dilanjutin ceritanya.`;

export const COUNSELOR_AGENTS: CounselorAgent[] = [
  {
    id: '1',
    name: 'Nabila, S.Psi, M.Psi, Psikolog',
    agentRole: 'Psikolog Klinis · Tim Support Kampus',
    faculty: 'Layanan Psikologi Kampus Terakreditasi',
    specialty: 'Spesialisasi: Burnout Skripsi, Beban Dospem & Perfeksionisme',
    rating: '4.9',
    sessionCount: 84,
    status: 'Tersedia kembali 09:00 - 16:00 WIB',
    isOnline: false,
    topicTag: 'Tekanan Skripsi',
    initials: 'NB',
    avatarBg: 'bg-[#E3EFE4]',
    avatarTextColor: 'text-[#1F3D27]',
    avatarUrl: nabilaAvatar,
    availableSlots: ['09:30 - 10:15', '11:00 - 11:45', '14:00 - 14:45'],
    suggestedPrompts: [
      'Revisi skripsi saya ditolak terus dan saya mulai putus asa.',
      'Saya merasa tertinggal jauh dibanding teman yang sudah seminar hasil.',
      'Pikiran saya buntu saat membuka laptop untuk menulis bab 4.'
    ],
    initialGreeting: 'Halo teman baik. Saya Nabila, psikolog klinis pendamping mahasiswa. Sesi ini 100% privat dan bebas catatan akademik. Apa yang sedang membebani pikiranmu seputar skripsi atau kuliah?',
    systemPrompt: `Kamu adalah Nabila, S.Psi, M.Psi, Psikolog Klinis kampus. Gaya komunikasi empati klinis, terstruktur, berbasis Cognitive Behavioral Therapy (CBT) mikro dan validasi emosi.`
  },
  {
    id: '2',
    name: 'Jeffian A. Lian',
    callSign: 'Kak Tenang',
    agentRole: 'Fakultas Teknik · Konselor Mahasiswa Sebaya Senior',
    faculty: 'Fakultas Teknik · Konselor Mahasiswa Sebaya Senior',
    specialty: 'Spesialisasi: Homesick, Adaptasi Rantau, & Beban Kuliah',
    rating: '4.7',
    sessionCount: 62,
    status: 'Tersedia Sekarang · Shift Aktif s/d 23:30 WIB',
    isOnline: true,
    topicTag: 'Adaptasi Perantau',
    initials: 'JL',
    avatarBg: 'bg-[#D9EADB]',
    avatarTextColor: 'text-[#173822]',
    avatarUrl: getJeffianAvatarUrl(),
    availableSlots: ['Hari Ini · 11:15 - 12:00', 'Hari Ini · 13:30 - 14:15', 'Hari Ini · 19:30 - 20:15'],
    suggestedPrompts: [
      'Lagi stuck revisian dospem',
      'Kosan sepi & kangen rumah',
      'Capek tugas deadline numpuk',
      'Mau curhat santai aja kak'
    ],
    initialGreeting: 'Hallo! Salam kenal ya. Aku Kak Jeff (Kak Tenang) di sini. Anggap aja lagi ngobrol santai di teras kosan kawan. Ruang ini 100% aman dan privat kok. Ada hal yang lagi bikin kepalamu berat atau mau kamu sambatin hari ini?',
    systemPrompt: KAK_TENANG_SYSTEM_PROMPT
  },
  {
    id: '3',
    name: 'dr. Sarah Sp.KJ',
    agentRole: 'Layanan Kesehatan Jiwa · Konsultan Medis',
    faculty: 'Pusat Layanan Medis & Psikiatri Kampus',
    specialty: 'Spesialisasi: Gangguan Tidur Kronis & Kecemasan Akut',
    rating: '4.8',
    sessionCount: 91,
    status: 'Tersedia Shift Medis 08:30 - 12:00 & 19:00 - 22:30 WIB',
    isOnline: false,
    topicTag: 'Gangguan Tidur',
    initials: 'SK',
    avatarBg: 'bg-[#E3EFE3]',
    avatarTextColor: 'text-[#1B3A23]',
    avatarUrl: sarahAvatar,
    availableSlots: ['08:30 - 09:15', '19:30 - 20:15', '21:00 - 21:45'],
    suggestedPrompts: [
      'Jantung berdebar dan pikiran terus berputar saat mau tidur.',
      'Sering begadang nugas sampai pagi, kepala pusing dan badan lemas.',
      'Bisa beri panduan relaksasi sebelum tidur malam ini?'
    ],
    initialGreeting: 'Selamat datang di ruang konsultasi medis. Saya dr. Sarah. Kami siap membantu meredakan ketegangan fisik dan menata kembali ritme istirahatmu. Apa yang sedang tubuhmu rasakan akhir-akhir ini?',
    systemPrompt: `Kamu adalah dr. Sarah Sp.KJ, psikiater dan konsultan medis kampus. Gaya komunikasi tenang, terstruktur, berbasis psikofisiologi yang mudah dipahami mahasiswa.`
  },
  {
    id: '4',
    name: 'Maya Safira, M.Psi',
    agentRole: 'Magister Psikologi · Spesialis Dinamika Relasi',
    faculty: 'Magister Psikologi Klinis · Spesialis Relasi Mahasiswa',
    specialty: 'Spesialisasi: Ekspektasi Orang Tua, Konflik Teman Satu Tim & Asmara',
    rating: '4.9',
    sessionCount: 95,
    status: 'Tersedia Shift 13:00 - 21:00 WIB',
    isOnline: true,
    topicTag: 'Keluarga & Relasi',
    initials: 'MS',
    avatarBg: 'bg-[#EBF2EB]',
    avatarTextColor: 'text-[#23422C]',
    avatarUrl: mayaAvatar,
    availableSlots: ['13:30 - 14:15', '16:00 - 16:45', '19:00 - 19:45'],
    suggestedPrompts: [
      'Tekanan ekspektasi orang tua membuat saya merasa selalu kurang.',
      'Ada konflik dengan teman kelompok tugas besar yang tidak bekerja.',
      'Hubungan relasi toxic mulai mengganggu konsentrasi belajar saya.'
    ],
    initialGreeting: 'Halo. Saya Maya Safira, konselor pendamping untuk dinamika relasi dan keluarga mahasiswa. Ceritakan apa yang sedang terjadi, kami ada di sini mendengarkan tanpa menghakimi.',
    systemPrompt: `Kamu adalah Maya Safira, M.Psi, seorang Relationship & Family Agent kampus. Gaya komunikasi lembut, penuh penerimaan tanpa menyalahkan.`
  }
];

// Helper Realtime Clock Formatting (HH:mm)
export const formatTimeHHMM = (d: Date = new Date()): string => {
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Dynamic Shift & Online Status Calculator based on real local time
export const getCounselorDynamicStatus = (counselorId: string, now: Date = new Date()): { isOnline: boolean; status: string } => {
  const currentHour = now.getHours();

  if (counselorId === '2') {
    // Kak Jeffian A. Lian (Kak Tenang) - Mahasiswa Senior & Teman Begadang Kosan
    // SIAGA 24 JAM AKTIF: Mahasiswa yang overthinking jam 1 - 3 pagi selalu bisa chat Kak Jeff!
    if (currentHour >= 22 || currentHour < 5) {
      return {
        isOnline: true,
        status: `Tersedia Sekarang · Shift Begadang & Insomnia Kampus`
      };
    }
    return {
      isOnline: true,
      status: `Tersedia Sekarang · Siaga Teman Curhat Mahasiswa (24 Jam)`
    };
  }

  if (counselorId === '3') {
    // dr. Sarah Sp.KJ (Konsultan Medis & Gangguan Tidur)
    // SANGAT COCOK UNTUK MAHASISWA BEGADANG / INSOMNIA:
    // Shift Utama: Malam & Dini Hari (19:00 - 04:00 WIB) + Konsultasi Pagi (09:00 - 12:00 WIB)
    if ((currentHour >= 19 || currentHour < 4) || (currentHour >= 9 && currentHour < 12)) {
      return {
        isOnline: true,
        status: (currentHour >= 19 || currentHour < 4) 
          ? `Tersedia Sekarang · Shift Dini Hari Insomnia (19:00 - 04:00 WIB)`
          : `Tersedia Sekarang · Shift Klinis Pagi (09:00 - 12:00 WIB)`
      };
    }
    return {
      isOnline: false,
      status: `Tersedia kembali Shift Malam Insomnia (19:00 WIB)`
    };
  }

  if (counselorId === '1') {
    // Nabila, S.Psi, M.Psi (Burnout Skripsi, Beban Dospem & Perfeksionisme)
    // Shift Sore s/d Dini Hari Pejuang Skripsi (14:00 - 01:00 WIB)
    if (currentHour >= 14 || currentHour < 1) {
      return {
        isOnline: true,
        status: `Tersedia Sekarang · Shift Pejuang Skripsi (14:00 - 01:00 WIB)`
      };
    }
    return {
      isOnline: false,
      status: `Shift Istirahat Pagi · Tersedia kembali 14:00 WIB`
    };
  }

  // Maya Safira (13:00 - 00:00 WIB - Relasi, Asmara, & Keluarga)
  if (currentHour >= 13 && currentHour <= 23) {
    return {
      isOnline: true,
      status: `Tersedia Sekarang · Shift Siang - Malam (13:00 - 24:00 WIB)`
    };
  }
  return { 
    isOnline: false, 
    status: `Shift Selesai · Tersedia kembali Siang Ini 13:00 WIB` 
  };
};

// Dynamic Slot Generator starting from actual upcoming hours today/tomorrow (supporting late night slots)
export const getDynamicCounselorSlots = (counselorId: string, now: Date = new Date()): string[] => {
  const currentHour = now.getHours();

  if (counselorId === '2') {
    // Kak Jeffian (Mahasiswa Senior) - Menyediakan slot malam & larut
    if (currentHour >= 23 || currentHour < 4) {
      return ['Malam Ini · 00:30 - 01:15', 'Malam Ini · 01:45 - 02:30', 'Besok · 19:30 - 20:15'];
    }
    const h1 = Math.min(23, currentHour + 1);
    const h2 = Math.min(23, currentHour + 2);
    return [
      `Hari Ini · ${String(h1).padStart(2, '0')}:15 - ${String(h1 + 1).padStart(2, '0')}:00`,
      `Hari Ini · 21:00 - 21:45 (Sesi Malam)`,
      `Hari Ini · 23:15 - 00:00 (Sesi Begadang)`
    ];
  }

  if (counselorId === '3') {
    // dr. Sarah (Insomnia & Relaksasi Malam)
    if (currentHour >= 19 || currentHour < 4) {
      return [
        'Malam Ini · 21:30 - 22:15 (Relaksasi Tidur)',
        'Malam Ini · 23:00 - 23:45 (Penanganan Insomnia)',
        'Dini Hari · 01:00 - 01:45 (Sesi Cemas Akut)'
      ];
    }
    return [
      'Hari Ini · 20:00 - 20:45 (Sesi Tidur Nyenyak)',
      'Hari Ini · 22:00 - 22:45 (Sesi Malam)',
      'Besok · 09:30 - 10:15 (Shift Pagi)'
    ];
  }

  if (counselorId === '1') {
    // Nabila (Skripsi)
    if (currentHour >= 18) {
      return [
        'Malam Ini · 20:00 - 20:45 (Buntu Bab 4)',
        'Malam Ini · 22:15 - 23:00 (Bedah Dospem)',
        'Besok · 14:30 - 15:15'
      ];
    }
    return ['Hari Ini · 15:30 - 16:15', 'Hari Ini · 19:00 - 19:45', 'Hari Ini · 21:30 - 22:15'];
  }

  // Maya Safira
  return ['Hari Ini · 16:00 - 16:45', 'Hari Ini · 19:30 - 20:15', 'Hari Ini · 21:15 - 22:00'];
};

// Returns counselors array with dynamic real-time shifts & slots
export const getRealtimeCounselors = (now: Date = new Date()): CounselorAgent[] => {
  const jeffPhoto = getJeffianAvatarUrl();
  return COUNSELOR_AGENTS.map(c => {
    const dynamic = getCounselorDynamicStatus(c.id, now);
    const slots = getDynamicCounselorSlots(c.id, now);
    return {
      ...c,
      avatarUrl: c.id === '2' ? jeffPhoto : c.avatarUrl,
      isOnline: dynamic.isOnline,
      status: dynamic.status,
      availableSlots: slots
    };
  });
};

export function generateLocalCounselorResponse(agent: CounselorAgent, userMessage: string): string {
  const lower = userMessage.toLowerCase();

  // 1. KRISIS / INPUT BERAT CHECK (HUMOR THERMOSTAT: OFF TOTAL)
  const isHeavyCrisis = 
    lower.includes('nyerah') || 
    lower.includes('mati') || 
    lower.includes('bunuh') || 
    lower.includes('gak kuat hidup') || 
    lower.includes('sesak') || 
    lower.includes('nangis terus') || 
    lower.includes('putus asa') || 
    lower.includes('hancur') || 
    lower.includes('takut banget');

  if (isHeavyCrisis) {
    if (agent.id === '2') {
      return 'Aku di sini bareng kamu kawan, tarik napas perlahan dulu ya. Perasaan lelah dan sesak yang kamu rasain saat ini valid banget, dan wajar kalau rasanya udah terlalu berat ditanggung sendiri. Jangan sendirian dulu ya, boleh ceritain apa yang paling bikin dadamu sesak malam ini? Kalau butuh bantuan darurat, tombol Bantuan 24/7 di atas selalu siap sedia.';
    }
    return 'Tarik napas perlahan lewat hidung dan hembuskan panjang. Beban yang kamu rasakan saat ini sangat nyata dan valid, tapi kamu tidak sendirian. Kami siap mendengarkan tanpa menghakimi. Bisakah kamu ceritakan apa pemicu utama yang membuatmu merasa sangat kewalahan saat ini?';
  }

  // 2. LOGIKA KAK JEFF / KAK TENANG (AGENT 2) DENGAN PANDUAN SLANG RESMI
  if (agent.id === '2') {
    // Sapaan awal & pertanyaan pembuka
    if (
      lower === 'hallo kak' || 
      lower === 'halo kak' || 
      lower === 'hai' || 
      lower === 'halo' || 
      lower === 'hai kak' || 
      lower === 'kak' || 
      lower === 'p' || 
      lower.startsWith('halo') || 
      lower.startsWith('hai')
    ) {
      return 'Halo juga kawan! Senang kamu mau mampir ke sini :). Santai aja ya ngobrolnya, gak usah tegang. Lagi ada hal apa nih yang bikin overthinking atau pengen kamu sambatin hari ini?';
    }

    // Topik Dospem & Revisi Skripsi
    if (
      lower.includes('dospem') || 
      lower.includes('ghosting') || 
      lower.includes('revisi') || 
      lower.includes('skripsi') || 
      lower.includes('acc') || 
      lower.includes('bab 4') || 
      lower.includes('bab') || 
      lower.includes('stuck') || 
      lower.includes('sidang') || 
      lower.includes('semhas')
    ) {
      return 'Haha klasik banget emang kelakuan dospem pas musim revisian. Jangan diambil pusing ke diri sendiri ya kawan, yang penting naskahnya jalan pelan-pelan. Terakhir kamu chat kapan emang? Udah di-read atau belum?';
    }

    // Topik Rantau / Homesick / Kesepian di Kosan
    if (
      lower.includes('kosan') || 
      lower.includes('rantau') || 
      lower.includes('rumah') || 
      lower.includes('kangen') || 
      lower.includes('homesick') || 
      lower.includes('ibu') || 
      lower.includes('ayah') || 
      lower.includes('ortu') || 
      lower.includes('sendiri') || 
      lower.includes('sepi')
    ) {
      return 'Pas kosan lagi sunyi sehabis kuliah emang momen paling rawan kangen suasana rumah ya. Wajar kok, adaptasi anak rantau emang butuh waktu. Malam ini udah makan yang enak belum di kosan?';
    }

    // Topik Burnout, Lelah, Deadline Menumpuk, Pusing
    if (
      lower.includes('burnout') || 
      lower.includes('capek') || 
      lower.includes('lelah') || 
      lower.includes('deadline') || 
      lower.includes('tugas') || 
      lower.includes('pusing') || 
      lower.includes('mumet') || 
      lower.includes('h-1') || 
      lower.includes('berat')
    ) {
      return 'Santai dulu kawan, jangan dipaksa gaspol kalau kepala udah ngebul. Rehat sejam-dua jam gak bakal bikin kuliah bubar kok haha. Tugas apa sih yang paling bikin mager malam ini?';
    }

    // Topik Teman / Circle Pertemanan / Canggung / Insecure
    if (
      lower.includes('teman') || 
      lower.includes('geng') || 
      lower.includes('circle') || 
      lower.includes('minder') || 
      lower.includes('insecure') || 
      lower.includes('kelompok') || 
      lower.includes('beban') || 
      lower.includes('canggung')
    ) {
      return 'Dinamika pertemanan atau kelompok kampus emang suka nano-nano ya :D. Santai aja, gak usah maksain masuk circle yang gak sefrekuensi. Ada kejadian apa di kelas emang?';
    }

    // Kata persetujuan pendek (bener kak, iya, dll)
    if (
      lower.includes('bener') || 
      lower.includes('iya') || 
      lower.includes('betul') || 
      lower.includes('banget') || 
      lower.includes('parah') || 
      lower.includes('bgt')
    ) {
      return 'Haha kerasa banget capeknya sampai sini. Tumpahin aja di sini kawan, santai. Hal apa lagi yang bikin gregetan?';
    }

    // Ucapan terima kasih
    if (lower.includes('makasih') || lower.includes('terima kasih') || lower.includes('thanks')) {
      return 'Santai kawan! Seneng bisa nemenin ngobrol sejenak. Kalau mau sambat atau rehat lagi, mampir ke sini aja ya :)';
    }

    // Respon aktif umum Kak Tenang
    return 'Santai kawan, kita urai pelan-pelan. Cerita aja, hal apa yang lagi paling bikin kepikiran hari ini?';
  }

  // 3. NABILA (AGENT 1 - SKRIPSI & PERFEKSIONISME)
  if (agent.id === '1') {
    if (lower.includes('dosen') || lower.includes('revisi') || lower.includes('skripsi') || lower.includes('stuck')) {
      return 'Menghadapi proses bimbingan skripsi sering kali menguji resiliensi mental kita. Ingat bahwa proses revisi adalah siklus normal penyusunan karya ilmiah, bukan cerminan kapasitas intelektualmu. Coba uraikan bagian mana yang terasa paling membingungkan saat ini?';
    }
    return 'Terima kasih sudah mau berbagi cerita. Tekanan akademik dan kekhawatiran tertinggal dari teman sebaya adalah hal yang sering dialami mahasiswa tingkat akhir. Mari kita lihat satu per satu langkah mikro yang bisa kita ambil bersama.';
  }

  // 4. DR. SARAH (AGENT 3 - TIDUR & KECEMASAN FISIK)
  if (agent.id === '3') {
    if (lower.includes('tidur') || lower.includes('begadang') || lower.includes('insomnia') || lower.includes('debar') || lower.includes('pusing')) {
      return 'Keluhan fisik seperti detak jantung meningkat atau insomnia saat malam hari adalah respons alami sistem saraf otonom yang sedang siaga tinggi. Cobalah teknik stimulus control: redupkan layar gawai dan lakukan relaksasi otot progresif. Sudah berapa malam ritme tidurmu terganggu seperti ini?';
    }
    return 'Kondisi fisik dan kualitas tidur memiliki kaitan timbal balik yang sangat erat dengan kestabilan emosi. Ceritakan bagaimana pola makan dan istirahatmu dalam beberapa hari terakhir.';
  }

  return 'Terima kasih sudah mau berbagi cerita. Kamu tidak sendirian menghadapi situasi ini. Mari kita urai perlahan langkah apa yang bisa membantumu merasa lebih tenang hari ini.';
}

export async function getCounselorAgentReply(
  agent: CounselorAgent,
  userMessage: string,
  history: Array<{ sender: 'counselor' | 'user'; text: string }>
): Promise<string> {
  // 1. Panggil server-side proxy dengan Gemini API Key
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('/api/counselor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agent,
        userMessage,
        history
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data?.success && data?.reply) {
        return data.reply;
      }
    }
  } catch {
    // Jika timeout atau offline, fallback instan ke engine lokal cerdas
  }

  // 2. Client-side key fallback jika tersedia
  const apiKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY);

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const conversationContext = history
        .map(h => `${h.sender === 'user' ? 'Mahasiswa' : agent.name}: ${h.text}`)
        .join('\n');

      const prompt = `${agent.systemPrompt}

Pedoman Tambahan:
- Format jawaban: 2 sampai 3 kalimat pendek dan santai.
- Terapkan active listening, validasi perasaan mahasiswa, dan gunakan gaya bahasa serta aturan slang terpandu.
- Akhiri dengan pertanyaan terbuka yang memancing cerita lebih dalam tanpa memaksa.

Riwayat obrolan terkini:
${conversationContext}
Mahasiswa: ${userMessage}
${agent.name}:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
      });

      if (response.text && response.text.trim()) {
        return response.text.trim();
      }
    } catch {
      // Fall through to local intelligent engine with high-fidelity personality
    }
  }

  return generateLocalCounselorResponse(agent, userMessage);
}
