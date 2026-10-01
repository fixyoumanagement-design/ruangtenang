/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalmExperience } from './components/CalmExperience';
import { ConsultationView } from './components/ConsultationView';
import { ForumView } from './components/ForumView';
import { SleepView } from './components/SleepView';
import { SettingsProfileView } from './components/SettingsProfileView';
import { LoginModal, UserProfile } from './components/LoginModal';
import { OnboardingModal } from './components/OnboardingModal';
import { RuangTenangLogo } from './components/RuangTenangLogo';
import { 
  Home, 
  MessageSquare, 
  Users, 
  Moon, 
  PhoneCall, 
  Heart, 
  Shield, 
  LogIn, 
  LogOut, 
  User, 
  Settings, 
  X,
  HelpCircle
} from 'lucide-react';

export type MainNavPage = 'beranda' | 'konsultasi' | 'forum' | 'tidur' | 'pengaturan';

export default function App() {
  const [currentPage, setCurrentPage] = useState<MainNavPage>('beranda');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ruangtenang_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [showCrisisModal, setShowCrisisModal] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ruangtenang_onboarding_seen') !== 'true';
    } catch {
      return false;
    }
  });

  // Sync user state to localStorage
  const handleSetCurrentUser = (user: UserProfile | null) => {
    setCurrentUser(user);
    try {
      if (user) {
        localStorage.setItem('ruangtenang_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('ruangtenang_user');
      }
    } catch {
      // LocalStorage error fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#1E3024] flex flex-col font-sans selection:bg-[#2C5237] selection:text-white relative">
      
      {/* 
        AMBIENT PASTEL MESH GRADIENTS (BEHIND ALL CONTENT WITH -z-10, HIDDEN ON SMALL MOBILE TO PREVENT OVERLAP & SCROLL LAG)
      */}
      <div className="fixed inset-0 pointer-events-none touch-none select-none overflow-hidden -z-10 hidden sm:block">
        <div className="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-[#D6E8D8]/40 blur-3xl animate-ambient-float-1" />
        <div className="absolute top-1/3 -right-28 w-96 h-96 rounded-full bg-[#FFE7DC]/35 blur-3xl animate-ambient-float-2" />
        <div className="absolute -bottom-20 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#E8EEFA]/35 blur-3xl animate-ambient-float-1" />
      </div>

      {/* 
        TOP NAVIGATION HEADER
        Unified, clean visual layout across mobile and desktop
      */}
      <header className="sticky top-0 z-40 bg-[#FAFBF9]/90 backdrop-blur-xl border-b border-[#E3ECE3]/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => setCurrentPage('beranda')}
            className="flex items-center text-left group shrink-0 transition-opacity hover:opacity-90 cursor-pointer"
            title="Kembali ke Beranda"
          >
            <RuangTenangLogo variant="horizontal" size={34} />
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#EBEFEB] p-1 rounded-xl text-xs font-semibold text-[#4A6452]">
              <button
                onClick={() => setCurrentPage('beranda')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  currentPage === 'beranda'
                    ? 'bg-white text-[#253D2C] shadow-xs font-bold'
                    : 'hover:text-[#1F3325]'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </button>

              <button
                onClick={() => setCurrentPage('konsultasi')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  currentPage === 'konsultasi'
                    ? 'bg-white text-[#253D2C] shadow-xs font-bold'
                    : 'hover:text-[#1F3325]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Konsultasi</span>
              </button>

              <button
                onClick={() => setCurrentPage('forum')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  currentPage === 'forum'
                    ? 'bg-white text-[#253D2C] shadow-xs font-bold'
                    : 'hover:text-[#1F3325]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Forum Anonim</span>
              </button>

              <button
                onClick={() => setCurrentPage('tidur')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  currentPage === 'tidur'
                    ? 'bg-white text-[#253D2C] shadow-xs font-bold'
                    : 'hover:text-[#1F3325]'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Track Tidur</span>
              </button>

              <button
                onClick={() => setCurrentPage('pengaturan')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  currentPage === 'pengaturan'
                    ? 'bg-white text-[#253D2C] shadow-xs font-bold'
                    : 'hover:text-[#1F3325]'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Pengaturan</span>
              </button>
            </nav>

          {/* Right Action Tools (Unified & Responsive) */}
          <div className="flex items-center space-x-2">
            {/* Onboarding Guide Trigger */}
            <button
              onClick={() => setShowOnboarding(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAFBF9] border border-[#CCDCCD] text-[#243D2A] hover:bg-[#EAEFEA] transition-all flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              title="Buka Panduan Pengguna Baru (Onboarding)"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#37523E]" />
              <span className="hidden sm:inline">Panduan</span>
            </button>

            {/* User Profile / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#EDF4ED] border border-[#CCDCCD] text-[#243D2A] hover:bg-[#E2EDE2] transition-all flex items-center space-x-1.5 shadow-2xs"
                  title="Menu Profil Mahasiswa"
                >
                  <div className="w-5 h-5 rounded-full bg-[#37523E] text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.isAnonymous ? 'A' : currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                </button>

                {/* User Dropdown */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-[#D5E2D5] shadow-xl p-3 z-50 space-y-2 animate-in fade-in zoom-in-95">
                    <div className="pb-2 border-b border-[#EDF3ED]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A9382] block">
                        Akun Mahasiswa
                      </span>
                      <p className="text-xs font-bold text-[#1E2E23] truncate">
                        {currentUser.name}
                      </p>
                      <div className="mt-1">
                        <span className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          currentUser.isAnonymous 
                            ? 'bg-[#EDF4ED] text-[#2F4D36] border border-[#CCE0CC]' 
                            : 'bg-[#EBF2FC] text-[#224A80] border border-[#CADDF7]'
                        }`}>
                          {currentUser.isAnonymous ? 'Mode Anonim' : 'Akun SSO Aktif'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowOnboarding(true);
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#2F4D36] hover:bg-[#F2F7F2] rounded-lg transition-colors flex items-center space-x-1.5 font-medium cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Buka Panduan (Onboarding)</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage('pengaturan');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#2F4D36] hover:bg-[#F2F7F2] rounded-lg transition-colors flex items-center space-x-1.5 font-medium cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Edit Profil & Pengaturan</span>
                    </button>

                    <button
                      onClick={() => {
                        handleSetCurrentUser({
                          ...currentUser,
                          isAnonymous: !currentUser.isAnonymous,
                          name: !currentUser.isAnonymous ? 'Teman Mahasiswa (Anonim)' : 'Budi Pratama'
                        });
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#2F4D36] hover:bg-[#F2F7F2] rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>{currentUser.isAnonymous ? 'Pakai Nama Asli' : 'Samarkan Anonim'}</span>
                    </button>

                    <button
                      onClick={() => {
                        handleSetCurrentUser(null);
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center space-x-1.5 font-medium transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#D5E2D5] text-[#34523C] hover:bg-[#F0F5F0] transition-all flex items-center space-x-1 shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5 text-[#4D7356]" />
                <span>Masuk</span>
              </button>
            )}

            {/* Crisis SOS Help Trigger (High-Fi Style) */}
            <button
              onClick={() => setShowCrisisModal(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FAECE8] text-[#A63C2E] border border-[#F2D0C9] hover:bg-[#F5DFDD] transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Bantuan 24/7</span>
              <span className="xs:hidden">SOS</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN WEBSITE CONTENT CONTAINER */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-6 py-4 md:py-6 pb-28 md:pb-8 space-y-5 sm:space-y-6">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'beranda' && (
              <CalmExperience onNavigate={(page) => setCurrentPage(page)} />
            )}
            {currentPage === 'konsultasi' && <ConsultationView />}
            {currentPage === 'forum' && (
              <ForumView
                currentUser={currentUser}
                onOpenCrisisModal={() => setShowCrisisModal(true)}
                onOpenLoginModal={() => setShowLoginModal(true)}
                onNavigate={(page) => setCurrentPage(page)}
              />
            )}
            {currentPage === 'tidur' && <SleepView />}
            {currentPage === 'pengaturan' && (
              <SettingsProfileView
                currentUser={currentUser}
                onUpdateUser={handleSetCurrentUser}
                onOpenLoginModal={() => setShowLoginModal(true)}
                onOpenOnboarding={() => setShowOnboarding(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* MOBILE MODERN BOTTOM APP BAR (ERGONOMIC NATIVE APP EXPERIENCE FOR HP) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAFBF9]/95 backdrop-blur-xl border-t border-[#DDE7DE] shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
          <button
            onClick={() => setCurrentPage('beranda')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              currentPage === 'beranda'
                ? 'bg-[#E5EFE6] text-[#1E3B27] font-bold shadow-2xs'
                : 'text-[#5A7563] hover:text-[#253D2C]'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Beranda</span>
          </button>

          <button
            onClick={() => setCurrentPage('konsultasi')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
              currentPage === 'konsultasi'
                ? 'bg-[#E5EFE6] text-[#1E3B27] font-bold shadow-2xs'
                : 'text-[#5A7563] hover:text-[#253D2C]'
            }`}
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 mb-0.5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] tracking-tight">Konseling</span>
          </button>

          <button
            onClick={() => setCurrentPage('forum')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              currentPage === 'forum'
                ? 'bg-[#E5EFE6] text-[#1E3B27] font-bold shadow-2xs'
                : 'text-[#5A7563] hover:text-[#253D2C]'
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Forum</span>
          </button>

          <button
            onClick={() => setCurrentPage('tidur')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              currentPage === 'tidur'
                ? 'bg-[#E5EFE6] text-[#1E3B27] font-bold shadow-2xs'
                : 'text-[#5A7563] hover:text-[#253D2C]'
            }`}
          >
            <Moon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Tidur</span>
          </button>

          <button
            onClick={() => setCurrentPage('pengaturan')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              currentPage === 'pengaturan'
                ? 'bg-[#E5EFE6] text-[#1E3B27] font-bold shadow-2xs'
                : 'text-[#5A7563] hover:text-[#253D2C]'
            }`}
          >
            <Settings className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Akun</span>
          </button>
        </div>
      </nav>

      {/* 24-HOUR EMERGENCY CRISIS MODAL (HUMAN, GENTLE & COMPASSIONATE) */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#D5E2D5] max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDF3ED]">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <h3 className="font-semibold text-base text-[#213728] font-heading">
                  Bantuan & Pendampingan Cepat
                </h3>
              </div>
              <button
                onClick={() => setShowCrisisModal(false)}
                className="w-8 h-8 rounded-full bg-[#F2F6F2] text-[#4A6452] flex items-center justify-center text-xs font-bold hover:bg-[#E5ECE5]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#526B5A] leading-relaxed">
              Jika kamu membutuhkan bantuan medis segera atau pendampingan saat kondisi krisis, hubungi kontak darurat resmi bebas pulsa berikut:
            </p>

            <div className="space-y-2.5">
              <a
                href="tel:119"
                className="p-3.5 rounded-2xl bg-[#FAECEB] border border-[#F2CFCC] flex items-center justify-between text-[#8E2F2B] hover:bg-[#F5DFDD] transition-all"
              >
                <div className="flex items-center space-x-3">
                  <PhoneCall className="w-5 h-5 text-rose-600" />
                  <div>
                    <strong className="text-xs block font-bold">Layanan Krisis Nasional (Kemenkes)</strong>
                    <span className="text-[11px] text-[#A14B47]">Bebas Pulsa · Buka 24 Jam</span>
                  </div>
                </div>
                <span className="text-sm font-black bg-rose-600 text-white px-3 py-1 rounded-xl">
                  119 Ext 8
                </span>
              </a>

              <div className="p-3.5 rounded-2xl bg-[#EDF4ED] border border-[#DCE8DC] flex items-center justify-between text-[#2F4D36]">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#4D7356]" />
                  <div>
                    <strong className="text-xs block font-bold">Satgas Konseling & Dokter Kampus</strong>
                    <span className="text-[11px] text-[#5A7562]">Unit Pelayanan Kesehatan Mahasiswa</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#2A4431]">
                  Gedung Student Center Lt. 1
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowCrisisModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#37523E] hover:bg-[#2B4131] text-white text-xs font-bold transition-all shadow-xs"
              >
                Kembali ke Ruang Tenang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT LOGIN / SSO MODAL */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(user) => {
          handleSetCurrentUser(user);
          setShowLoginModal(false);
        }}
      />

      {/* ONBOARDING MODAL (PANDUAN PENGGUNA BARU) */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onNavigate={(page) => setCurrentPage(page)}
      />

      {/* Minimal Calming Footer */}
      <footer className="border-t border-[#E3ECE3] bg-white py-8 px-4 text-center text-xs text-[#6B8573] mt-12 pb-8 flex flex-col items-center justify-center space-y-3">
        <RuangTenangLogo variant="vertical" size={54} />
        <p className="max-w-md mx-auto leading-relaxed text-[#55705E]">
          Ruang aman untuk rehat sejenak, berbagi cerita, dan menenangkan pikiran.
        </p>
        <span className="text-[11px] text-[#869E8E]">© 2026 RuangTenang</span>
      </footer>
    </div>
  );
}
