import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Moon, 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  FileText, 
  Clock, 
  HeartHandshake,
  MessageSquare
} from 'lucide-react';
import { MainNavPage } from '../App';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: MainNavPage) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('tidur');

  if (!isOpen) return null;

  const totalSteps = 4;

  const handleFinish = (targetPage?: MainNavPage) => {
    try {
      localStorage.setItem('ruangtenang_onboarding_seen', 'true');
    } catch {
      // ignore storage error
    }
    onClose();
    if (targetPage && onNavigate) {
      onNavigate(targetPage);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-lg rounded-2xl border border-[#DCE7DD] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar: Progress & Skip Button (Zero Dark Pattern Sesi 02) */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-[#EDF3ED]">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D6647]">
              Panduan Pengguna Baru · {currentStep} dari {totalSteps}
            </span>
          </div>

          <button
            onClick={() => handleFinish()}
            className="text-xs font-semibold text-[#6C8A74] hover:text-[#182C1F] transition-colors px-2 py-1 rounded-md hover:bg-[#F2F7F2] cursor-pointer"
          >
            Lewati Panduan
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="w-full bg-[#EEF4EF] h-1">
          <div 
            className="bg-[#2A4D33] h-1 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* ================= STEP 1: SELAMAT DATANG ================= */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EB] text-[#24432C] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-[#162A1D] font-heading">
                  Selamat Datang di RuangTenang
                </h2>
                <p className="text-xs sm:text-sm text-[#4E6B56] leading-relaxed">
                  Ruang mandiri dan aman bagi mahasiswa Indonesia untuk mengambil jeda di sela beban perkuliahan, menata jam istirahat, serta menemukan rekan diskusi terpercaya.
                </p>
              </div>

              {/* 3 Keunggulan Utama (Sesi 05 Copywriting Berbasis Manfaat) */}
              <div className="space-y-2.5 pt-2">
                <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#E3EDE5] flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    01
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#182C1F]">Layanan Mandiri Bebas Biaya</h3>
                    <p className="text-[11px] text-[#55735D] mt-0.5">Dapat diakses secara gratis oleh seluruh mahasiswa tanpa biaya langganan.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#E3EDE5] flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    02
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#182C1F]">Bebas Stigma Akademik</h3>
                    <p className="text-[11px] text-[#55735D] mt-0.5">Aktivitas di aplikasi tidak terhubung ke nilai, IPK, atau rekam riwayat kampus.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#E3EDE5] flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    03
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#182C1F]">Dukungan Praktis Tepat Sasaran</h3>
                    <p className="text-[11px] text-[#55735D] mt-0.5">Solusi nyata untuk mengatasi insomnia tugas, buntu skripsi, dan adaptasi rantau.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: JAMINAN PRIVASI (SESI 02 ETIKA HCD) ================= */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EB] text-[#24432C] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-[#162A1D] font-heading">
                  Privasimu Terjaga Sepenuhnya
                </h2>
                <p className="text-xs sm:text-sm text-[#4E6B56] leading-relaxed">
                  Kami mengutamakan rasa aman (*psychological safety*). Kamu berhak mendapatkan bantuan tanpa khawatir identitasmu bocor.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D7E6D9] space-y-1">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#2A4D33]" />
                    <span className="text-xs font-bold text-[#183120]">Mode Anonimitas Sejati</span>
                  </div>
                  <p className="text-[11px] text-[#405C47] pl-6 leading-relaxed">
                    Kamu dapat menggunakan nama samaran dan avatar ilustrasi saat berkonsultasi atau menulis di forum.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D7E6D9] space-y-1">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#2A4D33]" />
                    <span className="text-xs font-bold text-[#183120]">Kerahasiaan Konseling</span>
                  </div>
                  <p className="text-[11px] text-[#405C47] pl-6 leading-relaxed">
                    Konselor sebaya dan psikolog kampus terikat kode etik kerahasiaan ketat. Isi percakapan tidak dapat dilihat publik.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D7E6D9] space-y-1">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#2A4D33]" />
                    <span className="text-xs font-bold text-[#183120]">Kontrol Data Mandiri</span>
                  </div>
                  <p className="text-[11px] text-[#405C47] pl-6 leading-relaxed">
                    Catatan tidur dan preferensimu tersimpan lokal di perangkat dan dapat direset kapan saja.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: KEBUTUHAN UTAMA (PERSONALISASI) ================= */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EB] text-[#24432C] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-[#162A1D] font-heading">
                  Apa Kebutuhan Utamamu Saat Ini?
                </h2>
                <p className="text-xs sm:text-sm text-[#4E6B56] leading-relaxed">
                  Pilih kondisi yang paling relevan agar kami dapat menyiapkan rekomendasi yang paling tepat:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  {
                    id: 'tidur',
                    icon: Clock,
                    title: 'Lelah & Kurang Tidur',
                    desc: 'Ingin memperbaiki pola tidur & menurunkan stres fisik.'
                  },
                  {
                    id: 'skripsi',
                    icon: FileText,
                    title: 'Beban Tugas & Skripsi',
                    desc: 'Mengurai kebuntuan bimbingan & deadline mepet.'
                  },
                  {
                    id: 'rantau',
                    icon: Compass,
                    title: 'Adaptasi Perantauan',
                    desc: 'Menemukan teman seperjuangan di kota baru.'
                  },
                  {
                    id: 'konseling',
                    icon: MessageSquare,
                    title: 'Perlu Teman Cerita',
                    desc: 'Obrolan 1-on-1 dengan konselor sebaya terlatih.'
                  }
                ].map((opt) => {
                  const isChosen = selectedGoal === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedGoal(opt.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isChosen
                          ? 'bg-[#F2F7F3] border-[#294B32] ring-1 ring-[#294B32]'
                          : 'bg-[#FAFBF9] border-[#E2EBE3] hover:border-[#CADACD]'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center ${
                            isChosen ? 'bg-[#1E3B27] text-white' : 'bg-[#EBF3EC] text-[#294B32]'
                          }`}>
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          {isChosen && (
                            <span className="text-[10px] font-bold text-[#23452D]">Terpilih</span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-[#182C1F]">{opt.title}</h4>
                        <p className="text-[11px] text-[#55735D] leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 4: TIGA LAYANAN SIAP DIGUNAKAN ================= */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EB] text-[#24432C] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-[#162A1D] font-heading">
                  Kamu Siap Menggunakan RuangTenang
                </h2>
                <p className="text-xs sm:text-sm text-[#4E6B56] leading-relaxed">
                  Tiga pintu layanan utama sudah siap diakses kapan pun kamu butuh ruang jeda:
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div 
                  onClick={() => handleFinish('konsultasi')}
                  className="p-3 rounded-xl bg-[#FAFBF9] border border-[#E3EDE5] hover:border-[#294B32] transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#182C1F] group-hover:text-[#294B32]">
                        Teman Cerita & Konselor Sebaya
                      </h4>
                      <p className="text-[11px] text-[#55735D]">Konsultasi privat 1-on-1 dengan konselor mahasiswa terlatih.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A9681] group-hover:text-[#294B32] shrink-0" />
                </div>

                <div 
                  onClick={() => handleFinish('forum')}
                  className="p-3 rounded-xl bg-[#FAFBF9] border border-[#E3EDE5] hover:border-[#294B32] transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#182C1F] group-hover:text-[#294B32]">
                        Forum Mahasiswa Anonim
                      </h4>
                      <p className="text-[11px] text-[#55735D]">Ruang berbagi cerita seputar dinamika kampus & skripsi.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A9681] group-hover:text-[#294B32] shrink-0" />
                </div>

                <div 
                  onClick={() => handleFinish('tidur')}
                  className="p-3 rounded-xl bg-[#FAFBF9] border border-[#E3EDE5] hover:border-[#294B32] transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EBF3EC] text-[#294B32] flex items-center justify-center shrink-0">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#182C1F] group-hover:text-[#294B32]">
                        Catatan Ritme Jam Tidur
                      </h4>
                      <p className="text-[11px] text-[#55735D]">Pantau jam istirahat untuk memulihkan energi fisik harian.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A9681] group-hover:text-[#294B32] shrink-0" />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 bg-[#FAFBF9] border-t border-[#EDF3ED] flex items-center justify-between">
          <div>
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3C5E45] hover:bg-[#EBF3EC] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>
            ) : (
              <span className="text-[11px] text-[#7A9382]">
                Panduan singkat 1 menit
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={nextStep}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#213F29] text-white hover:bg-[#152B1B] transition-all cursor-pointer shadow-xs"
            >
              <span>{currentStep === totalSteps ? 'Masuk ke Beranda' : 'Lanjut'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
