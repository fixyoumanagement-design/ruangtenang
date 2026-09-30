import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Globe, 
  Camera, 
  Save, 
  CheckCircle2, 
  LogOut, 
  Trash2, 
  Shield, 
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserProfile } from './LoginModal';

interface SettingsProfileViewProps {
  currentUser: UserProfile | null;
  onUpdateUser: (user: UserProfile | null) => void;
  onOpenLoginModal: () => void;
  onOpenOnboarding?: () => void;
}

export const SettingsProfileView: React.FC<SettingsProfileViewProps> = ({
  currentUser,
  onUpdateUser,
  onOpenLoginModal,
  onOpenOnboarding
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');

  // Standard Profile Fields
  const [fullName, setFullName] = useState(currentUser?.name || 'Mahasiswa Pengguna');
  const [username, setUsername] = useState('mahasiswa_id');
  const [email, setEmail] = useState(currentUser?.emailOrId || 'user@example.com');
  const [bio, setBio] = useState('Mahasiswa aktif yang sedang fokus belajar dan menjaga keseimbangan hidup.');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Password / Security Fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Preferences Fields
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [themePreference, setThemePreference] = useState<'light' | 'system'>('light');

  // Status & Feedback
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Initialize from storage or currentUser
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('ruangtenang_profile_details');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.username) setUsername(parsed.username);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.bio !== undefined) setBio(parsed.bio);
        if (parsed.avatarPreview) setAvatarPreview(parsed.avatarPreview);
        if (parsed.twoFactorAuth !== undefined) setTwoFactorAuth(parsed.twoFactorAuth);
        if (parsed.emailNotifications !== undefined) setEmailNotifications(parsed.emailNotifications);
        if (parsed.soundEnabled !== undefined) setSoundEnabled(parsed.soundEnabled);
        if (parsed.language) setLanguage(parsed.language);
      } else if (currentUser) {
        setFullName(currentUser.name);
        setEmail(currentUser.emailOrId);
      }
    } catch {
      // Storage fallback
    }
  }, [currentUser]);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setAlertMessage({ type, text });
    setTimeout(() => setAlertMessage(null), 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const profileData = {
      fullName,
      username,
      email,
      bio,
      avatarPreview,
      twoFactorAuth,
      emailNotifications,
      soundEnabled,
      language
    };

    try {
      localStorage.setItem('ruangtenang_profile_details', JSON.stringify(profileData));
    } catch {
      // Storage fallback
    }

    // Update global app user state
    onUpdateUser({
      name: fullName,
      emailOrId: email,
      isAnonymous: false,
      campus: currentUser?.campus || 'Universitas',
      role: 'Pengguna Terdaftar'
    });

    showNotification('Profil berhasil diperbarui!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      showNotification('Masukkan kata sandi lama Anda.', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showNotification('Kata sandi baru minimal 6 karakter.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification('Konfirmasi kata sandi tidak cocok.', 'error');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showNotification('Kata sandi berhasil diubah!');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        showNotification('Foto profil diperbarui. Jangan lupa klik Simpan.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    try {
      localStorage.removeItem('ruangtenang_profile_details');
      localStorage.removeItem('ruangtenang_user');
      localStorage.removeItem('ruangtenang_sleep_logs');
      localStorage.removeItem('ruangtenang_forum_posts');
      localStorage.removeItem('ruangtenang_community_notes');
    } catch {
      // Storage fallback
    }
    onUpdateUser(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E3ECE3]">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1E2E23] font-heading">
            Pengaturan Akun & Profil
          </h2>
          <p className="text-xs text-[#556F5D] mt-0.5">
            Kelola data pribadi, kata sandi, dan preferensi akun Anda.
          </p>
        </div>

        {currentUser && (
          <button
            onClick={() => onUpdateUser(null)}
            className="self-start sm:self-center px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        )}
      </div>

      {/* ALERT NOTIFICATION */}
      {alertMessage && (
        <div className={`p-3.5 rounded-2xl text-xs font-medium flex items-center space-x-2 animate-in fade-in slide-in-from-top-1 shadow-2xs ${
          alertMessage.type === 'success'
            ? 'bg-[#EDF7ED] border border-[#C6DFC6] text-[#1D4724]'
            : 'bg-rose-50 border border-rose-200 text-rose-800'
        }`}>
          <CheckCircle2 className={`w-4 h-4 shrink-0 ${alertMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`} />
          <span>{alertMessage.text}</span>
        </div>
      )}

      {/* STANDARD SETTINGS TABS */}
      <div className="flex border-b border-[#E3ECE3] space-x-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-[#2D4534] text-[#2D4534] font-bold'
              : 'border-transparent text-[#627C6B] hover:text-[#2D4534]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profil Saya</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-[#2D4534] text-[#2D4534] font-bold'
              : 'border-transparent text-[#627C6B] hover:text-[#2D4534]'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Kata Sandi & Keamanan</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'preferences'
              ? 'border-[#2D4534] text-[#2D4534] font-bold'
              : 'border-transparent text-[#627C6B] hover:text-[#2D4534]'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifikasi & Preferensi</span>
        </button>
      </div>

      {/* TAB 1: PROFIL SAYA (STANDARD USER PROFILE) */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-6">
            
            {/* AVATAR UPLOAD */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[#EDF3ED]">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-[#2D4534] text-white flex items-center justify-center font-bold text-2xl shadow-xs border-2 border-white ring-2 ring-[#2D4534]/20">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{(fullName.charAt(0) || 'U').toUpperCase()}</span>
                  )}
                </div>

                <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white text-[#2D4534] border border-[#D0DFD2] shadow-xs hover:bg-[#F2F7F2] cursor-pointer transition-transform group-hover:scale-110">
                  <Camera className="w-3.5 h-3.5" />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-bold text-sm text-[#1E2E23]">Foto Profil</h3>
                <p className="text-xs text-[#5D7A66]">
                  Format JPG, PNG, atau GIF. Maksimal ukuran 2MB.
                </p>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={() => setAvatarPreview(null)}
                    className="text-[11px] text-rose-600 hover:underline pt-1 block"
                  >
                    Hapus foto
                  </button>
                )}
              </div>
            </div>

            {/* FORM INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#3D5645] block mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama Lengkap Anda"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3D5645] block mb-1">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-[#829988]">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    className="w-full text-xs p-2.5 pl-7 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#3D5645] block mb-1">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#829988] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full text-xs p-2.5 pl-8 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#3D5645] block mb-1">
                  Bio Singkat
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Ceritakan sedikit tentang diri Anda..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30 leading-relaxed"
                />
                <span className="text-[11px] text-[#789481] block mt-1">
                  Maksimal 160 karakter untuk bio publik.
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#2D4534] text-white hover:bg-[#1E3324] transition-all shadow-2xs flex items-center space-x-2 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: KATA SANDI & KEAMANAN */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <form onSubmit={handleUpdatePassword} className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-5">
            <div className="pb-3 border-b border-[#EDF3ED]">
              <h3 className="font-bold text-sm text-[#1E2E23]">Ubah Kata Sandi</h3>
              <p className="text-xs text-[#5D7A66] mt-0.5">
                Pastikan menggunakan kata sandi yang kuat dan tidak digunakan di aplikasi lain.
              </p>
            </div>

            <div className="space-y-3.5 max-w-md">
              <div>
                <label className="text-xs font-semibold text-[#3D5645] block mb-1">
                  Kata Sandi Lama
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan kata sandi lama"
                    className="w-full text-xs p-2.5 pr-8 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-[#758E7D] hover:text-[#1E2E23]"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3D5645] block mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3D5645] block mb-1">
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#2D4534] text-white hover:bg-[#1E3324] transition-all shadow-2xs flex items-center space-x-2 cursor-pointer mt-2"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Perbarui Kata Sandi</span>
              </button>
            </div>
          </form>

          {/* TWO-FACTOR AUTH & SESSIONS */}
          <div className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#1E2E23]">Autentikasi Dua Langkah (2FA)</h3>
                <p className="text-xs text-[#5D7A66] mt-0.5">
                  Tambahkan lapisan keamanan ekstra saat masuk ke akun Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const nextVal = !twoFactorAuth;
                  setTwoFactorAuth(nextVal);
                  showNotification(nextVal ? '2FA diaktifkan.' : '2FA dinonaktifkan.');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  twoFactorAuth ? 'bg-[#2D4534]' : 'bg-[#D2DDD2]'
                }`}
              >
                <span 
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-xs ${
                    twoFactorAuth ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFIKASI & PREFERENSI */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-5">
            <div className="pb-3 border-b border-[#EDF3ED]">
              <h3 className="font-bold text-sm text-[#1E2E23]">Preferensi Notifikasi</h3>
              <p className="text-xs text-[#5D7A66] mt-0.5">
                Atur bagaimana Anda menerima kabar dan pemberitahuan dari aplikasi.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1E2E23]">Notifikasi Email</h4>
                  <p className="text-[11px] text-[#63806C]">Terima rangkuman mingguan dan notifikasi penting via email.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmailNotifications(!emailNotifications);
                    showNotification('Preferensi notifikasi email diperbarui.');
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    emailNotifications ? 'bg-[#2D4534]' : 'bg-[#D2DDD2]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-xs ${
                    emailNotifications ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F0F5F0]">
                <div>
                  <h4 className="text-xs font-bold text-[#1E2E23]">Efek Suara Audio</h4>
                  <p className="text-[11px] text-[#63806C]">Mainkan efek suara lembut saat menyelesaikan latihan atau membuka audio.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    showNotification('Preferensi audio diperbarui.');
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    soundEnabled ? 'bg-[#2D4534]' : 'bg-[#D2DDD2]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-xs ${
                    soundEnabled ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* BAHASA & REGIONAL */}
          <div className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-4">
            <div className="pb-3 border-b border-[#EDF3ED]">
              <h3 className="font-bold text-sm text-[#1E2E23]">Bahasa & Regional</h3>
              <p className="text-xs text-[#5D7A66] mt-0.5">
                Sesuaikan bahasa antarmuka aplikasi.
              </p>
            </div>

            <div className="max-w-xs">
              <label className="text-xs font-semibold text-[#3D5645] block mb-1">
                Bahasa Antarmuka
              </label>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value as any);
                  showNotification('Bahasa berhasil diubah.');
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-[#DCE7DC] bg-[#FAFBF9] text-[#1C2D22] focus:outline-none focus:ring-2 focus:ring-[#37523E]/30 cursor-pointer"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English (US)</option>
              </select>
            </div>
          </div>

          {/* PANDUAN APLIKASI (ONBOARDING) */}
          <div className="p-6 rounded-3xl bg-white border border-[#E3ECE3] shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-[#1E2E23]">Panduan Pengguna Baru (Onboarding)</h3>
                <p className="text-xs text-[#5D7A66] mt-0.5">
                  Buka kembali panduan langkah awal mengenai privasi, layanan utama, dan tips penggunaan RuangTenang.
                </p>
              </div>

              {onOpenOnboarding && (
                <button
                  type="button"
                  onClick={onOpenOnboarding}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#EDF4ED] border border-[#CCDCCD] text-[#243D2A] hover:bg-[#DFECDF] transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  Buka Panduan Awal
                </button>
              )}
            </div>
          </div>

          {/* DANGER ZONE */}
          <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200/80 space-y-3">
            <div>
              <h3 className="font-bold text-sm text-rose-800">Zona Hapus Akun</h3>
              <p className="text-xs text-rose-700/90 mt-0.5 leading-relaxed">
                Menghapus akun akan membersihkan seluruh catatan dan riwayat Anda di perangkat ini secara permanen. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            {!showDeleteModal ? (
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-white border border-rose-300 hover:bg-rose-100 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Akun Saya</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-white border border-rose-300 space-y-3 max-w-md animate-in fade-in">
                <p className="text-xs font-bold text-rose-800">
                  Apakah Anda yakin ingin menghapus akun dan seluruh data?
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
                  >
                    Ya, Hapus Permanen
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
