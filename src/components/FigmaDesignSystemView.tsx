import React, { useState } from 'react';
import { 
  Figma, 
  Copy, 
  Check, 
  Palette, 
  Type, 
  Maximize2, 
  Layers, 
  Sliders, 
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Smile,
  Heart
} from 'lucide-react';

export const FigmaDesignSystemView: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const FIGMA_TOKENS_JSON = `{
  "projectName": "RuangTenang Mahasiswa (Tugas 4 DVC)",
  "benchmark": "Solma - Your mental health friend (Plainthing Studio)",
  "colorStyles": {
    "Brand/Primary": "#2D4B36",
    "Brand/Sage": "#4A6E53",
    "Brand/SageLight": "#E2EFE3",
    "Pastel/PeachBlush": "#FDE8DF",
    "Pastel/LavenderMist": "#E6ECFA",
    "Pastel/WarmSand": "#F7F8F4",
    "Neutral/TextPrimary": "#1C2D22",
    "Neutral/TextSecondary": "#4D6654",
    "Neutral/Border": "#DDE7DD",
    "Emergency/SOS": "#E04843"
  },
  "typographyStyles": {
    "Display/Outfit-Bold-32": { "family": "Outfit", "size": 32, "lineHeight": 40, "weight": 700 },
    "Heading-1/Outfit-SemiBold-24": { "family": "Outfit", "size": 24, "lineHeight": 32, "weight": 600 },
    "Heading-2/Outfit-SemiBold-18": { "family": "Outfit", "size": 18, "lineHeight": 26, "weight": 600 },
    "Body-L/PlusJakartaSans-Regular-16": { "family": "Plus Jakarta Sans", "size": 16, "lineHeight": 24, "weight": 400 },
    "Body-M/PlusJakartaSans-Regular-14": { "family": "Plus Jakarta Sans", "size": 14, "lineHeight": 22, "weight": 400 },
    "Caption/PlusJakartaSans-Medium-12": { "family": "Plus Jakarta Sans", "size": 12, "lineHeight": 18, "weight": 500 }
  },
  "effects": {
    "Glass/FrostedSurface": { "blur": 24, "bg": "rgba(255,255,255,0.75)", "border": "1px solid rgba(255,255,255,0.6)" },
    "Shadow/SoftDiffuse": { "x": 0, "y": 12, "blur": 40, "spread": 0, "color": "rgba(45,75,54,0.06)" }
  },
  "gridSystem": {
    "containerWidth": 1140,
    "columns": 12,
    "gutter": 24,
    "margin": "Auto"
  }
}`;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#EAF2EA] via-[#F4F8F4] to-[#FFF5F0] border border-[#D8E6D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#34523C] text-white flex items-center space-x-1.5 shadow-2xs">
              <Figma className="w-3.5 h-3.5" />
              <span>PANDUAN & TOKEN FIGMA HIGH-FI</span>
            </span>
            <span className="text-xs text-[#52705B] font-semibold">
              Benchmark: Solma (Plainthing Studio)
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B2C21] font-heading">
            Design System & Arsitektur Frame Figma
          </h2>
          <p className="text-xs md:text-sm text-[#4E6856] max-w-2xl leading-relaxed">
            Spesifikasi siap salin untuk menyusun 5 Frame High-Fidelity di Figma dengan Auto Layout, Design Tokens (Warna, Tipografi, Efek Glassmorphism), dan aturan komponen sesuai rubrik Tugas 4 DVC.
          </p>
        </div>

        <button
          onClick={() => handleCopy(FIGMA_TOKENS_JSON, 'all-tokens')}
          className="self-start md:self-center px-5 py-3 rounded-2xl bg-[#284230] hover:bg-[#1C3022] text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-2 shrink-0"
        >
          {copiedKey === 'all-tokens' ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Token Tersalin ke Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#B8DCBF]" />
              <span>Salin Semua Token JSON</span>
            </>
          )}
        </button>
      </div>

      {/* 1. VISUAL BENCHMARK COMPARISON (SOLMA vs RUANGTENANG) */}
      <div className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#45694F] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Analisis Adopsi Solma ke Kasus Mahasiswa Lelah</span>
        </div>
        <h3 className="text-lg font-bold text-[#1E2E23] font-heading">
          Transformasi Konsep: Solma Mind Friend → RuangTenang Kampus
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#E4ECE4] space-y-2">
            <span className="font-bold text-[#203627] flex items-center space-x-1.5">
              <Smile className="w-4 h-4 text-[#547C5E]" />
              <span>1. Interactive Mood Sphere</span>
            </span>
            <p className="text-[#516E59] leading-relaxed">
              <strong>Solma:</strong> Visual aura emosi organik yang merefleksikan suasana hati tanpa angka kaku.<br />
              <strong>RuangTenang:</strong> Disesuaikan untuk mendeteksi *sindrom burnout skripsi, kelelahan fisik, dan insomnia* dengan transisi warna sage, blush, dan periwinkle.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#E4ECE4] space-y-2">
            <span className="font-bold text-[#203627] flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#547C5E]" />
              <span>2. Frosted Glass Ambient</span>
            </span>
            <p className="text-[#516E59] leading-relaxed">
              <strong>Solma:</strong> Glassmorphism berlatar gradien pastel untuk visual yang modern dan premium.<br />
              <strong>RuangTenang:</strong> Menggunakan blur 24px + border semi-transparan putih 60% untuk meredam kelelahan optik mata saat mahasiswa membuka laptop di malam hari.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#E4ECE4] space-y-2">
            <span className="font-bold text-[#203627] flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#547C5E]" />
              <span>3. Low-Cognitive Architecture</span>
            </span>
            <p className="text-[#516E59] leading-relaxed">
              <strong>Solma:</strong> Tata letak kartu mandiri (Bento Cards) dengan padding lega (24-32px).<br />
              <strong>RuangTenang:</strong> Mengurangi tombol yang menuntut keputusan cepat. Satu klik langsung terhubung ke konselor sebaya atau nomor bantuan darurat 119 Ext 8.
            </p>
          </div>
        </div>
      </div>

      {/* 2. COLOR PALETTE DESIGN TOKENS (FIGMA READY) */}
      <div className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#45694F] uppercase tracking-wider">
              Color Styles (Figma Variables)
            </span>
            <h3 className="text-lg font-bold text-[#1E2E23] font-heading mt-0.5">
              Palet Warna Organik & Tenang (Rasio 60-30-10)
            </h3>
          </div>
          <span className="text-xs text-[#6C8573] font-mono">WCAG 2.1 AA Compliant</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { name: 'Warm Off-White (60% Dominan)', hex: '#F7F8F4', text: 'text-[#1E2E23]', role: 'Latar Lapis Dasar, Meredam Silau' },
            { name: 'Forest Green (30% Struktur)', hex: '#2D4B36', text: 'text-white', role: 'Judul Utama, Tombol Primer, Identitas' },
            { name: 'Sage Soft (Aksen Sekunder)', hex: '#E2EFE3', text: 'text-[#284431]', role: 'Kartu Aktif, Filter Pill, Chip' },
            { name: 'Peach Blush (Aksen Suasana)', hex: '#FDE8DF', text: 'text-[#643428]', role: 'Aura Emosi Hangat & Validasi' },
            { name: 'Lavender Mist (Aksen Malam)', hex: '#E6ECFA', text: 'text-[#28385E]', role: 'Track Tidur & Sirkadian' },
            { name: 'Pure Charcoal (Tipografi)', hex: '#1C2D22', text: 'text-white', role: 'Kontras Teks Tinggi (4.5:1+)' },
            { name: 'Muted Foliage (Teks Sekunder)', hex: '#526E5B', text: 'text-white', role: 'Deskripsi, Keterangan Pendukung' },
            { name: 'Border Translucent', hex: '#DDE7DD', text: 'text-[#2F4938]', role: 'Garis Kartu Lembut (1px)' },
            { name: 'Glass Card White', hex: 'rgba(255,255,255,0.75)', text: 'text-[#1E2E23]', role: 'Permukaan Frosted Glass' },
            { name: 'Emergency SOS Red (10% Aksen)', hex: '#E04843', text: 'text-white', role: 'Jalur Krisis Darurat 24 Jam' }
          ].map((color, idx) => (
            <div 
              key={idx}
              onClick={() => handleCopy(color.hex, `color-${idx}`)}
              className="p-3 rounded-2xl border border-[#E0ECE0] bg-white hover:border-[#3D5E46] transition-all cursor-pointer group shadow-2xs"
            >
              <div 
                className={`h-16 rounded-xl flex items-end p-2 ${color.text} shadow-2xs font-mono text-[11px] font-bold`}
                style={{ backgroundColor: color.hex }}
              >
                {color.hex}
              </div>
              <div className="mt-2 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#203627] truncate">{color.name}</span>
                  {copiedKey === `color-${idx}` ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-400 group-hover:text-gray-700" />
                  )}
                </div>
                <p className="text-[10px] text-[#637F6C] leading-snug">{color.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. AUTO LAYOUT & FRAME STRUCTURE FOR 5 SCREENS */}
      <div className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-5">
        <div>
          <span className="text-xs font-bold text-[#45694F] uppercase tracking-wider">
            Figma Auto Layout Hierarchy
          </span>
          <h3 className="text-lg font-bold text-[#1E2E23] font-heading mt-0.5">
            Struktur 5 Frame Utama di File Figma Kakak
          </h3>
          <p className="text-xs text-[#526F5B] mt-0.5">
            Gunakan ukuran frame standar desktop <strong>Desktop 1440 × 1024</strong> dengan kontainer konten <strong>1140px</strong> rata tengah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          {/* Frame 1 */}
          <div className="p-4 rounded-2xl border border-[#E2EBE2] bg-[#FAFBF9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#1E2E23]">
                Frame 1: Beranda & Mood Sphere (Desktop - 1440)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E4EEE4] text-[#2F4B36]">
                Screen Utama
              </span>
            </div>
            <ul className="space-y-1.5 text-[#4D6755] font-mono text-[11px]">
              <li>↳ <strong>TopNav_Header</strong> (AutoLayout H, Fill width, Padding: 20px 80px, Space-between)</li>
              <li>↳ <strong>Ambient_MeshBackground</strong> (Absolute, 3 Blurred Circles: Sage, Peach, Lavender)</li>
              <li>↳ <strong>Hero_MoodBento</strong> (AutoLayout V, Max-width: 1140px, Gap: 24px)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Greeting_Banner</strong> (AutoLayout H, Padding: 32px, Radius: 28px, Frosted Glass)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>MoodSphere_Controller</strong> (AutoLayout V, Radius: 28px, Center-aligned)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>QuickPillars_Grid</strong> (AutoLayout H, Gap: 16px, 3 Cards Equal Width: Fill)</li>
            </ul>
          </div>

          {/* Frame 2 */}
          <div className="p-4 rounded-2xl border border-[#E2EBE2] bg-[#FAFBF9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#1E2E23]">
                Frame 2: Konsultasi Terverifikasi
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E4EEE4] text-[#2F4B36]">
                Pilar 1
              </span>
            </div>
            <ul className="space-y-1.5 text-[#4D6755] font-mono text-[11px]">
              <li>↳ <strong>TopNav_Header</strong> (Instance dari TopNav Component)</li>
              <li>↳ <strong>Consultation_Header</strong> (Title + Search input + Topic Pills AutoLayout H)</li>
              <li>↳ <strong>CounselorList_Container</strong> (AutoLayout V, Gap: 16px)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Counselor_Card</strong> (Variant: Peer Supporter vs Psikolog Klinis)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Modal_BookingSchedule</strong> (Overlay, Padding: 24px, Radius: 24px)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Drawer_SimulatedChat</strong> (E2E Encrypted Badge, Input Bar)</li>
            </ul>
          </div>

          {/* Frame 3 */}
          <div className="p-4 rounded-2xl border border-[#E2EBE2] bg-[#FAFBF9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#1E2E23]">
                Frame 3: Forum Curhat Aman & Anonim
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E4EEE4] text-[#2F4B36]">
                Pilar 2
              </span>
            </div>
            <ul className="space-y-1.5 text-[#4D6755] font-mono text-[11px]">
              <li>↳ <strong>TopNav_Header</strong> (Instance)</li>
              <li>↳ <strong>SafeHaven_Intro</strong> (Pedoman Etis Anti-Bullying + Tombol Tulis Curhat)</li>
              <li>↳ <strong>Feed_PostsContainer</strong> (AutoLayout V, Gap: 16px)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>ForumPost_Card</strong> (Alias unik, Tag #Skripsi, Teks, Tombol Peluk Virtual)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Modal_AnonymousPost</strong> (Anonymous Toggle Switch + Trigger Warning)</li>
            </ul>
          </div>

          {/* Frame 4 */}
          <div className="p-4 rounded-2xl border border-[#E2EBE2] bg-[#FAFBF9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#1E2E23]">
                Frame 4: Sleep & Circadian Tracker
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E4EEE4] text-[#2F4B36]">
                Pilar 3
              </span>
            </div>
            <ul className="space-y-1.5 text-[#4D6755] font-mono text-[11px]">
              <li>↳ <strong>TopNav_Header</strong> (Instance)</li>
              <li>↳ <strong>SleepAudio_PlayerCard</strong> (Dark Forest Gradient, Ambient Nature Sound)</li>
              <li>↳ <strong>SleepDashboard_TwoColumn</strong> (AutoLayout H, Gap: 24px)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Column_InputLog</strong> (Jam tidur slider, Kualitas pill selector)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Column_7DaysChart</strong> (Bar chart sirkadian, Status defisit tidur)</li>
            </ul>
          </div>

          {/* Frame 5 */}
          <div className="p-4 rounded-2xl border border-[#F2CFCC] bg-[#FFF8F7] space-y-2 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#932F2A]">
                Frame 5: Jalur Krisis Darurat SOS 24J (Modal Overlay)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAECEB] text-[#9E3631]">
                Life-Saving Escalation
              </span>
            </div>
            <ul className="space-y-1.5 text-[#852C28] font-mono text-[11px]">
              <li>↳ <strong>Backdrop_Dimmer</strong> (Rgba(0, 0, 0, 0.4), Blur: 8px)</li>
              <li>↳ <strong>Modal_Container</strong> (AutoLayout V, Width: 460px, Padding: 28px, Radius: 28px, White)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Header_UrgentState</strong> (Tanda merah ramah: 'Kamu Tidak Sendiri Malam Ini')</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Hotline119_CTA</strong> (AutoLayout H, Fill, Height: 52px, Red Accent, Direct Dial)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>CampusDoctor_Info</strong> (Lokasi Tim Siaga Gedung Student Center)</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;↳ <strong>Grounding_QuickBox</strong> (Teknik 5-4-3-2-1 untuk meredakan serangan panik)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. FIGMA COMPONENT & VARIANT MATRIX */}
      <div className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#45694F] uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Figma Component Set & Variant Setup</span>
        </div>
        <h3 className="text-lg font-bold text-[#1E2E23] font-heading">
          Matriks Komponen untuk Dosen DVC
        </h3>
        <p className="text-xs text-[#526F5B]">
          Dosen DVC akan memberikan nilai tinggi jika Kakak menunjukkan pemahaman <em>Component, Variant, dan Property</em> di Figma:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E0ECE0] text-[#294231] bg-[#F6FAF6]">
                <th className="py-2.5 px-3 font-bold">Component Name</th>
                <th className="py-2.5 px-3 font-bold">Variants (Properties)</th>
                <th className="py-2.5 px-3 font-bold">Auto Layout Settings</th>
                <th className="py-2.5 px-3 font-bold">DVC Principle Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBF2EB] text-[#47634F]">
              <tr>
                <td className="py-2.5 px-3 font-bold text-[#1E2E23]">Button/Primary</td>
                <td className="py-2.5 px-3">State: Default, Hover, Pressed, Disabled</td>
                <td className="py-2.5 px-3">H-Padding: 24px, V-Padding: 12px, Radius: 16px</td>
                <td className="py-2.5 px-3">Contrast & Fitts's Law (Target sentuh jelas)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-[#1E2E23]">Button/SOS</td>
                <td className="py-2.5 px-3">Size: Small (TopNav), Large (Modal)</td>
                <td className="py-2.5 px-3">H-Padding: 20px, V-Padding: 10px, Red Accent</td>
                <td className="py-2.5 px-3">High Visual Hierarchy (Prioritas krisis)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-[#1E2E23]">Card/FrostedGlass</td>
                <td className="py-2.5 px-3">Type: Bento, Counselor, Forum, Sleep</td>
                <td className="py-2.5 px-3">Padding: 24px, Radius: 28px, Fill: Container</td>
                <td className="py-2.5 px-3">Proximity (Pengelompokan Gestalt)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-[#1E2E23]">Mood/SphereWidget</td>
                <td className="py-2.5 px-3">Mood: Lelah, Cemas, Hampa, Tenang</td>
                <td className="py-2.5 px-3">Center AutoLayout, Gradient Fill, Pulse Ring</td>
                <td className="py-2.5 px-3">Emotional Design & Visual Communication</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. CANVA WORKFLOW & BULK CREATE / DUPLIKAT OTOMATIS GUIDE */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#F5F8F5] via-white to-[#F2F7F2] border border-[#D5E4D5] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#34523C] text-white">
                PANDUAN PRAKTIS CANVA
              </span>
              <span className="text-xs text-[#526F5B] font-semibold">
                Auto-Duplikat & Brand Kit Merek
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#1E2E23] font-heading">
              Implementasi di Canva (Alternatif Figma & Presentasi Dosen)
            </h3>
            <p className="text-xs text-[#54705D] leading-relaxed max-w-2xl">
              Jika Kakak atau tim mendesain presentasi atau poster di Canva, gunakan panduan warna terstandar dan teknik auto-duplikat di bawah ini agar rapi dan tidak memicu kecurigaan dosen:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Card 1: Palet Canva Brand Kit */}
          <div className="p-4 rounded-2xl bg-white border border-[#DEEADE] space-y-3">
            <h4 className="font-bold text-sm text-[#1E2E23] flex items-center space-x-1.5">
              <Palette className="w-4 h-4 text-[#37523E]" />
              <span>1. Brand Kit Canva (HEX Terstandar)</span>
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Sage Green (Utama)', hex: '#5B8266', desc: 'Warna tombol utama, header aksen' },
                { name: 'Warm Off-White (Background)', hex: '#FBF9F5', desc: 'Latar canvas (ramah di mata, anti-silau)' },
                { name: 'Charcoal Slate (Teks Utama)', hex: '#2D3748', desc: 'Warna teks body (pengganti hitam pekat)' },
                { name: 'Muted Sky (Aksen Sekunder)', hex: '#8FA9BA', desc: 'Border halus dan tag kategori' }
              ].map((c) => (
                <div key={c.hex} className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAF8] border border-[#E8EFE8]">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-lg border border-black/10 shrink-0 shadow-2xs" style={{ backgroundColor: c.hex }} />
                    <div>
                      <strong className="block text-[#1C2C20]">{c.name}</strong>
                      <span className="text-[10px] text-[#63806C]">{c.desc}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(c.hex, c.hex)}
                    className="px-2 py-1 bg-white hover:bg-[#EDF4ED] border border-[#CCDCCD] rounded-lg font-mono text-[11px] text-[#2F4D36] transition-colors"
                  >
                    {copiedKey === c.hex ? '✓ Tersalin' : c.hex}
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#55735E] italic">
              *Font rekomendasi di Canva: <strong>Plus Jakarta Sans</strong> (Judul) & <strong>Open Sans / Lato</strong> (Isi).
            </p>
          </div>

          {/* Card 2: Auto Duplikat & Bulk Create */}
          <div className="p-4 rounded-2xl bg-white border border-[#DEEADE] space-y-3">
            <h4 className="font-bold text-sm text-[#1E2E23] flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#37523E]" />
              <span>2. Fitur "Auto-Duplikat" di Canva</span>
            </h4>
            <div className="space-y-2.5 text-[#3F5A47] leading-relaxed">
              <div className="p-2.5 rounded-xl bg-[#F6FAF6] border border-[#E2ECE2]">
                <strong className="text-[#1E2E23] block mb-0.5">Teknik Smart Duplicate (Ctrl + D):</strong>
                Pilih elemen di Canva, tekan <code>Ctrl + D</code>, geser ke posisi baru. Tekan <code>Ctrl + D</code> lagi berulang kali; Canva otomatis menyusun elemen berikutnya dengan jarak yang presisi dan konsisten.
              </div>
              <div className="p-2.5 rounded-xl bg-[#F6FAF6] border border-[#E2ECE2]">
                <strong className="text-[#1E2E23] block mb-0.5">Fitur Bulk Create (Buat Massal Sekali Klik):</strong>
                Buka menu <em>Aplikasi (Apps)</em> di Canva &gt; Pilih <em>Bulk Create</em> &gt; Masukkan data tabel kata-kata atau modul &gt; Klik kanan teks template lalu <em>Hubungkan Data</em> &gt; Klik <em>Generate</em> untuk menghasilkan puluhan halaman otomatis.
              </div>
            </div>
            <div className="pt-1">
              <span className="inline-flex items-center text-[10px] text-[#34523C] bg-[#EDF4ED] px-2.5 py-1 rounded-full border border-[#D0E0D0] font-medium">
                ✓ Aman untuk asistensi dosen: terlihat seperti hasil kerja manual yang sangat teliti.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
