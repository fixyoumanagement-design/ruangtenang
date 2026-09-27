import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, User, Sparkles, Building2, Eye, EyeOff } from 'lucide-react';
import { RuangTenangLogo } from './RuangTenangLogo';

export interface UserProfile {
  name: string;
  emailOrId: string;
  isAnonymous: boolean;
  campus?: string;
  role?: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'sso' | 'anonymous'>('sso');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [maskIdentity, setMaskIdentity] = useState(true);
  const [campus, setCampus] = useState('Universitas Terbuka');

  if (!isOpen) return null;

  const handleSsoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = maskIdentity 
      ? 'Teman Mahasiswa (Anonim)' 
      : (email.split('@')[0] || 'Mahasiswa');
    
    onLoginSuccess({
      name: displayName,
      emailOrId: email || 'mahasiswa@kampus.ac.id',
      isAnonymous: maskIdentity,
      campus: campus,
      role: 'Mahasiswa Aktif'
    });
    onClose();
  };

  const handleQuickDemoSso = () => {
    onLoginSuccess({
      name: maskIdentity ? 'Mahasiswa Sehat #814' : 'Ahmad Fauzi',
      emailOrId: 'ahmad.fauzi@mhs.ac.id',
      isAnonymous: maskIdentity,
      campus: 'Institut Teknologi & Seni',
      role: 'Mahasiswa Tingkat 3'
    });
    onClose();
  };

  const handleAnonymousLogin = () => {
    const randomCode = Math.floor(100 + Math.random() * 900);
    onLoginSuccess({
      name: `Sahabat Tenang #${randomCode}`,
      emailOrId: `anon-${randomCode}`,
      isAnonymous: true,
      campus: 'Kampus Mahasiswa (Anonim)',
      role: 'Tamu Rahasia'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl border border-[#D5E2D5] max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#EDF3ED]">
          <div className="flex items-center space-x-3">
            <RuangTenangLogo variant="icon" size={42} />
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#4D7356]"></span>
                <span className="text-[10px] font-bold text-[#4D7356] tracking-wider uppercase">
                  Portal Masuk Mahasiswa
                </span>
              </div>
              <h3 className="font-comfortaa font-bold text-lg text-[#213728] mt-0.5">
                RuangTenang
              </h3>
              <p className="text-xs text-[#526B5A]">
                Akses riwayat catatan rehat dan layanan konseling
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F2F6F2] text-[#4A6452] flex items-center justify-center text-xs font-bold hover:bg-[#E5ECE5] transition-colors shrink-0"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F0F4F0] rounded-2xl text-xs font-semibold text-[#4A6452]">
          <button
            type="button"
            onClick={() => setActiveTab('sso')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'sso'
                ? 'bg-white text-[#213526] font-bold shadow-2xs'
                : 'hover:text-[#213526]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Akun Kampus / SSO</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('anonymous')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'anonymous'
                ? 'bg-white text-[#213526] font-bold shadow-2xs'
                : 'hover:text-[#213526]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Anonim</span>
          </button>
        </div>

        {activeTab === 'sso' ? (
          <form onSubmit={handleSsoLogin} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-[#2C3E32] mb-1">
                Pilih Kampus
              </label>
              <select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D5E2D5] bg-[#FAFBF9] text-[#2C3E32] focus:outline-none focus:ring-2 focus:ring-[#4D7356]"
              >
                <option value="Universitas Indonesia">Universitas Indonesia (UI)</option>
                <option value="Institut Teknologi Bandung">Institut Teknologi Bandung (ITB)</option>
                <option value="Universitas Gadjah Mada">Universitas Gadjah Mada (UGM)</option>
                <option value="Universitas Terbuka">Universitas Terbuka (UT)</option>
                <option value="Kampus Lainnya (SSO Dikti)">Kampus Lainnya (SSO Terintegrasi)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#2C3E32] mb-1">
                Email Mahasiswa (.ac.id) atau NIM
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7A9382] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="contoh: budi.s@mahasiswa.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D5E2D5] bg-[#FAFBF9] text-[#2C3E32] focus:outline-none focus:ring-2 focus:ring-[#4D7356]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#2C3E32] mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7A9382] absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 rounded-xl border border-[#D5E2D5] bg-[#FAFBF9] text-[#2C3E32] focus:outline-none focus:ring-2 focus:ring-[#4D7356]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#7A9382] hover:text-[#2C3E32]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start space-x-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={maskIdentity}
                onChange={(e) => setMaskIdentity(e.target.checked)}
                className="mt-0.5 rounded text-[#37523E] focus:ring-[#4D7356]"
              />
              <span className="text-[11px] text-[#4A6452] leading-tight">
                <strong>Mode Anonim Otomatis:</strong> Sembunyikan nama asli & NIM saya saat menulis di forum atau berkonsultasi.
              </span>
            </label>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#37523E] hover:bg-[#2C4232] text-white font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"
              >
                <span>Masuk dengan Akun Kampus</span>
              </button>

              <button
                type="button"
                onClick={handleQuickDemoSso}
                className="w-full py-2 rounded-xl bg-[#EDF4ED] hover:bg-[#E0ECE0] text-[#2F4D36] border border-[#CCDCCD] font-semibold transition-all flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4D7356]" />
                <span>Masuk Cepat (Akun Uji Coba Mahasiswa)</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F4F8F4] border border-[#D8E6D8] space-y-2">
              <div className="flex items-center space-x-2 text-[#2B4733] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#4D7356]" />
                <span>Tanpa Registrasi Data Pribadi</span>
              </div>
              <p className="text-[11px] text-[#526B5A] leading-relaxed">
                Kamu tidak perlu memasukkan email atau nama. Sistem akan menetapkan kode acak agar kamu dapat membaca forum dan mengakses konseling secara anonim.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E3ECE3] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#7A9382] uppercase tracking-wider block font-bold">
                  Kode Identitas Sementara
                </span>
                <span className="font-heading font-bold text-[#1E2E23] text-sm">
                  Mahasiswa #{Math.floor(100 + Math.random() * 900)}
                </span>
              </div>
              <span className="px-2 py-0.5 bg-[#EDF4ED] text-[#34523C] rounded-full text-[10px] font-semibold border border-[#CCE0CC]">
                Anonim
              </span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleAnonymousLogin}
                className="w-full py-2.5 rounded-xl bg-[#37523E] hover:bg-[#2C4232] text-white font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Masuk sebagai Tamu Anonim</span>
              </button>
            </div>
          </div>
        )}

        <div className="text-center pt-1 border-t border-[#EDF3ED]">
          <p className="text-[11px] text-[#6B8573]">
            Perlindungan privasi konseling tunduk pada kode etik kerahasiaan mahasiswa.
          </p>
        </div>
      </div>
    </div>
  );
};
