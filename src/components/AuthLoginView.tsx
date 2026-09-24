import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { toPersianDigits, formatTomans } from '../utils/formatters';
import { ASSETS } from '../assets';
import { 
  Building2, 
  Lock, 
  UserCheck, 
  KeyRound, 
  ShieldCheck, 
  Sparkles, 
  RotateCw, 
  AlertCircle, 
  ArrowLeft, 
  CheckCircle2,
  FileSpreadsheet,
  GraduationCap,
  UserPlus,
  Users,
  ChevronDown
} from 'lucide-react';

interface AuthLoginViewProps {
  onLoginSuccess: (student: StudentProfile) => void;
  currentStudent: StudentProfile;
  onOpenExcelManager: () => void;
}

// Sample student directory for instant selection
const SAMPLE_STUDENTS_LIST: Partial<StudentProfile>[] = [
  {
    firstName: 'حسن',
    lastName: 'رحیم زاده خراسانی',
    studentCode: '44162424',
    nationalCode: '0250680424',
    major: 'حسابداری و مدیریت مالی',
    faculty: 'دانشکده علوم انسانی و مدیریت',
    currentTermNumber: 3,
    totalGpa: 17.95,
    tuitionBalance: 70000000,
    supervisor: 'دکتر سید محسن حسینی'
  },
  {
    firstName: 'امیرحسین',
    lastName: 'رضایی سپاهانی',
    studentCode: '9912040112',
    nationalCode: '1270984512',
    major: 'مهندسی کامپیوتر - نرم‌افزار',
    faculty: 'دانشکده مهندسی و علوم فنی',
    currentTermNumber: 5,
    totalGpa: 17.84,
    tuitionBalance: 32500000,
    supervisor: 'دکتر احسان صادقی'
  },
  {
    firstName: 'سارا',
    lastName: 'کاظمی',
    studentCode: '9912040113',
    nationalCode: '1280145621',
    major: 'مهندسی معماری',
    faculty: 'دانشکده هنر و معماری',
    currentTermNumber: 3,
    totalGpa: 18.40,
    tuitionBalance: 18000000,
    supervisor: 'دکتر بهمن حیدری'
  },
  {
    firstName: 'محمد',
    lastName: 'مهدوی',
    studentCode: '40102566',
    nationalCode: '1290334455',
    major: 'مهندسی عمران',
    faculty: 'دانشکده مهندسی و علوم فنی',
    currentTermNumber: 4,
    totalGpa: 16.70,
    tuitionBalance: 45000000,
    supervisor: 'دکتر ناصر فلاحی'
  },
  {
    firstName: 'نیلوفر',
    lastName: 'صادقی',
    studentCode: '40211890',
    nationalCode: '1274567890',
    major: 'مدیریت بازرگانی (MBA)',
    faculty: 'دانشکده علوم انسانی و مدیریت',
    currentTermNumber: 2,
    totalGpa: 19.10,
    tuitionBalance: 0,
    supervisor: 'دکتر فرشته کریمی'
  }
];

export const AuthLoginView: React.FC<AuthLoginViewProps> = ({
  onLoginSuccess,
  currentStudent,
  onOpenExcelManager
}) => {
  const [studentCode, setStudentCode] = useState(currentStudent.studentCode || '');
  const [password, setPassword] = useState(currentStudent.nationalCode || '');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('8349');
  const [userRole, setUserRole] = useState<'student' | 'professor' | 'staff'>('student');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickDirectory, setShowQuickDirectory] = useState(false);

  // Regenerate random 4-digit captcha
  const refreshCaptcha = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaCode(randomCode);
    setCaptchaInput('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!studentCode.trim()) {
      setErrorMessage('لطفاً شماره دانشجویی یا نام کاربری خود را وارد فرمایید.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('لطفاً کلمه عبور (کد ملی) را وارد فرمایید.');
      return;
    }

    if (captchaInput.trim() !== captchaCode) {
      setErrorMessage('کد امنیتی وارد شده اشتباه است. لطفاً مجدداً امتحان کنید.');
      refreshCaptcha();
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      // Check if matches one of the sample directory profiles
      const matched = SAMPLE_STUDENTS_LIST.find(s => s.studentCode === studentCode.trim());

      if (matched) {
        onLoginSuccess({
          ...currentStudent,
          ...matched,
          studentCode: studentCode.trim(),
          nationalCode: password.trim()
        } as StudentProfile);
      } else {
        onLoginSuccess({
          ...currentStudent,
          studentCode: studentCode.trim(),
          nationalCode: password.trim()
        });
      }
    }, 400);
  };

  // Quick select a student from directory
  const handleSelectStudent = (std: Partial<StudentProfile>) => {
    setStudentCode(std.studentCode || '');
    setPassword(std.nationalCode || '');
    setCaptchaInput(captchaCode); // Auto-fill captcha for easy 1-click test
    setShowQuickDirectory(false);
  };

  // Quick 1-Click Demo Login
  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(currentStudent);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-slate-100 flex items-center justify-center p-3 sm:p-6 lg:p-8">
      
      {/* Container Box */}
      <div className="w-full max-w-4xl bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* Right / Top Brand Visual Banner */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Brand Identity */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="font-black text-base sm:text-lg leading-tight tracking-tight text-white">
                  موسسه آموزش عالی سپاهان
                </h1>
                <p className="text-xs text-blue-200 font-medium">
                  سامانه احراز هویت متمرکز پرتال دانشجویی (SSO)
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400/20 border border-amber-400/30 rounded-lg text-[11px] font-bold text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                درگاه خدمات الکترونیک یکپارچه
              </span>
            </div>
          </div>

          {/* Center Info Card */}
          <div className="relative z-10 my-6 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs space-y-2.5">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              راهنمای ورود به سامانه:
            </h3>
            <ul className="text-[11px] text-blue-100 space-y-1.5 list-disc list-inside">
              <li><strong>نام کاربری:</strong> شماره دانشجویی معتبر</li>
              <li><strong>کلمه عبور:</strong> کد ملی ۱۰ رقمی (بدون خط تیره)</li>
              <li>در صورت عدم داشتن پرونده، دکمه <strong>«ثبت‌نام دانشجو جدید»</strong> را بزنید.</li>
            </ul>
          </div>

          {/* Bottom Security Note */}
          <div className="relative z-10 text-[11px] text-blue-200/80 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              اتصال امن SSL
            </span>
            <span>سال تحصیلی ۱۴۰۴ - ۱۴۰۵</span>
          </div>
        </div>

        {/* Left / Bottom Login Form Area */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          
          <div>
            {/* Role Switcher */}
            <div className="flex items-center justify-between gap-1 p-1 bg-slate-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setUserRole('student')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  userRole === 'student'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ورود دانشجو
              </button>
              <button
                type="button"
                onClick={() => setUserRole('professor')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  userRole === 'professor'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ورود اساتید
              </button>
              <button
                type="button"
                onClick={() => setUserRole('staff')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  userRole === 'staff'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                کادر آموزش
              </button>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-3.5">
              
              {/* Username / Student Code */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {userRole === 'student' ? 'شماره دانشجویی:' : 'کد پرسنلی:'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={studentCode}
                    onChange={(e) => setStudentCode(e.target.value)}
                    placeholder="شماره دانشجویی را وارد کنید"
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-left"
                    dir="ltr"
                    required
                  />
                  <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Password / National Code */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    کلمه عبور (کد ملی):
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('کلمه عبور پیش‌فرض دانشجویان، کد ملی ۱۰ رقمی ثبت‌شده در پرونده می‌باشد.');
                    }}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    راهنمای رمز عبور
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    inputMode="numeric"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="کد ملی ۱۰ رقمی"
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-left tracking-widest"
                    dir="ltr"
                    required
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Captcha Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  کد امنیتی داخل تصویر:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="کد ۴ رقمی"
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl text-xs sm:text-sm font-mono font-bold focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-center tracking-widest"
                    dir="ltr"
                    required
                  />

                  {/* Visual Captcha Box */}
                  <div className="flex items-center gap-1.5 bg-slate-200/80 border border-slate-300 px-3 py-1.5 rounded-xl select-none">
                    <span className="font-mono text-base font-black tracking-widest text-slate-800 line-through decoration-blue-500 decoration-2 italic">
                      {captchaCode}
                    </span>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-1 text-slate-600 hover:text-blue-700 hover:bg-slate-300 rounded-md transition-colors cursor-pointer"
                      title="تغییر کد امنیتی"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-blue-800 hover:bg-blue-900 active:scale-[0.99] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RotateCw className="w-4 h-4 animate-spin" />
                    در حال احراز هویت...
                  </span>
                ) : (
                  <>
                    <span>ورود به سامانه</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Registration & Sample Student Picker */}
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
            
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              
              {/* Register / Excel Button */}
              <button
                type="button"
                onClick={onOpenExcelManager}
                className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-950 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-blue-700" />
                <span>ثبت‌نام دانشجو جدید / تنظیم مشخصات</span>
              </button>

              {/* Quick Directory Toggle */}
              <button
                type="button"
                onClick={() => setShowQuickDirectory(!showQuickDirectory)}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-slate-600" />
                <span>انتخاب دانشجو نمونه</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showQuickDirectory ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Quick Students Dropdown Picker */}
            {showQuickDirectory && (
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl space-y-1 animate-in fade-in duration-150">
                <p className="text-[11px] font-bold text-slate-600 px-1">انتخاب سریع پرونده برای تست ورود:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-36 overflow-y-auto">
                  {SAMPLE_STUDENTS_LIST.map((std) => (
                    <button
                      key={std.studentCode}
                      type="button"
                      onClick={() => handleSelectStudent(std)}
                      className="text-right p-1.5 rounded-lg hover:bg-white hover:shadow-xs border border-transparent hover:border-slate-200 text-xs transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{std.firstName} {std.lastName}</span>
                        <span className="text-[10px] text-blue-700 block">{std.major} (ترم {toPersianDigits(std.currentTermNumber || 1)})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{std.studentCode}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>پشتیبانی پرتال: ۰۳۱-۳۶۷۰۵۰۰۰</span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-emerald-700 hover:underline font-bold cursor-pointer"
              >
                ورود سریع آزمایشی →
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
