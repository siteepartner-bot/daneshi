import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { toPersianDigits } from '../utils/formatters';
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
  HelpCircle,
  PhoneCall
} from 'lucide-react';

interface AuthLoginViewProps {
  onLoginSuccess: (student: StudentProfile) => void;
  currentStudent: StudentProfile;
  onOpenExcelManager: () => void;
}

export const AuthLoginView: React.FC<AuthLoginViewProps> = ({
  onLoginSuccess,
  currentStudent,
  onOpenExcelManager
}) => {
  const [studentCode, setStudentCode] = useState(currentStudent.studentCode || '9912040112');
  const [password, setPassword] = useState(currentStudent.nationalCode || '1270984512');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('8349');
  const [userRole, setUserRole] = useState<'student' | 'professor' | 'staff'>('student');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      // Login with current student profile or update code
      onLoginSuccess({
        ...currentStudent,
        studentCode: studentCode.trim(),
        nationalCode: password.trim()
      });
    }, 450);
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
                  سامانه جامع خدمات الکترونیک آموزشی
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400/20 border border-amber-400/30 rounded-lg text-[11px] font-bold text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                درگاه احراز هویت متمرکز (SSO)
              </span>
            </div>
          </div>

          {/* Center Info Card */}
          <div className="relative z-10 my-6 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs space-y-2.5">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              خدمات فعال در پرتال دانشجویی:
            </h3>
            <ul className="text-[11px] text-blue-100 space-y-1.5 list-disc list-inside">
              <li>انتخاب واحد آنلاین و تثبیت دروس نیمسال</li>
              <li>پرداخت اینترنتی شهریه با درگاه شاپرک</li>
              <li>دریافت برنامه هفتگی و کارت ورود به جلسه امتحانات</li>
              <li>مشاهده کارنامه، ریز نمرات و سوابق تحصیلی</li>
            </ul>
          </div>

          {/* Bottom Security / Support Note */}
          <div className="relative z-10 text-[11px] text-blue-200/80 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              اتصال امن ۲۵۶ بیتی SSL
            </span>
            <span>نسخه ۴.۲</span>
          </div>
        </div>

        {/* Left / Bottom Login Form Area */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          
          <div>
            {/* Role Switcher */}
            <div className="flex items-center justify-between gap-1 p-1 bg-slate-100 rounded-xl mb-6">
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
                کادر اداری و آموزش
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
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Username / Student Code */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {userRole === 'student' ? 'شماره دانشجویی:' : 'کد پرسنلی / نام کاربری:'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={studentCode}
                    onChange={(e) => setStudentCode(e.target.value)}
                    placeholder="مثال: 9912040112"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-left"
                    dir="ltr"
                    required
                  />
                  <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Password / National Code */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    کلمه عبور (کد ملی بدون خط تیره):
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('دانشجوی گرامی، کلمه عبور پیش‌فرض شما همان «کد ملی ۱۰ رقمی» می‌باشد. در صورت فراموشی با اداره آموزش موسسه سپاهان تماس حاصل فرمایید.');
                    }}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    فراموشی رمز عبور؟
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    inputMode="numeric"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-left tracking-widest"
                    dir="ltr"
                    required
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Captcha Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl text-xs sm:text-sm font-mono font-bold focus:ring-2 focus:ring-blue-100 outline-hidden transition-all text-center tracking-widest"
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
                className="w-full py-3 bg-blue-800 hover:bg-blue-900 active:scale-[0.99] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RotateCw className="w-4 h-4 animate-spin" />
                    در حال احراز هویت...
                  </span>
                ) : (
                  <>
                    <span>ورود به پرتال دانشجویی</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Actions & Demo Login */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>ورود سریع آزمایشی (دانشجو دمو)</span>
              </button>

              <button
                type="button"
                onClick={onOpenExcelManager}
                className="py-2 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-700" />
                <span>ورود اطلاعات جدید / اکسل</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              پشتیبانی پرتال: ساختمان مرکزی موسسه سپاهان · تلفن: ۰۳۱-۳۶۷۰۵۰۰۰
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
