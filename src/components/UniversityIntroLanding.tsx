import React from 'react';
import { ViewTab } from '../types';
import { toPersianDigits } from '../utils/formatters';
import { ASSETS } from '../assets';
import { 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowLeft, 
  CreditCard, 
  CalendarDays, 
  FileSpreadsheet,
  Globe,
  Library,
  Cpu
} from 'lucide-react';

interface UniversityIntroLandingProps {
  onEnterPortal: (tab: ViewTab) => void;
}

export const UniversityIntroLanding: React.FC<UniversityIntroLandingProps> = ({
  onEnterPortal
}) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <div className="relative h-[360px] sm:h-[440px] w-full">
          <img
            src={ASSETS.campusHero}
            alt="پردیس دانشگاهی موسسه آموزش عالی سپاهان"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Graceful fallback
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-white max-w-4xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-lg">
                تحت نظارت وزارت علوم، تحقیقات و فناوری
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
              موسسه آموزش عالی غیرانتفاعی سپاهان
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl mb-6">
              قطب آموزش مهندسی و علوم نوین در استان اصفهان با بیش از دو دهه سابقه درخشان در تربیت مهندسان و دانش‌آموختگان سرآمد در حوزه‌های نرم‌افزار، هوش مصنوعی، معماری و مدیریت.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onEnterPortal('dashboard')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>ورود به پرتال جامع دانشجویی</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEnterPortal('registration')}
                className="px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-colors cursor-pointer"
              >
                سامانه انتخاب واحد
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => onEnterPortal('registration')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">انتخاب واحد برخط</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            ثبت سریع دروس، کنترل پیش‌نیازها و پیشگیری هوشمند از تداخل کلاسی و امتحانی.
          </p>
        </div>

        <div 
          onClick={() => onEnterPortal('tuition')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">پرداخت شهریه شتابی</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            تسویه آنی شهریه ثابت و متغیر، تقسیط و صدور فیش‌های واریزی الکترونیک.
          </p>
        </div>

        <div 
          onClick={() => onEnterPortal('schedule')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <CalendarDays className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">برنامه هفتگی کلاسی</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            جدول زمان‌بندی دقیق تشکیل کلاس‌ها به تفکیک روز، ساعت، استاد و شماره سالن.
          </p>
        </div>

        <div 
          onClick={() => onEnterPortal('exams')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">کارت ورود به آزمون</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            مشاهده تاریخ دقیق، شماره صندلی، سالن امتحانات و دریافت کارت رسمی عکس‌دار.
          </p>
        </div>

      </div>

      {/* Faculties & Academic Programs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              دانشکده‌ها و رشته‌های تحصیلی موسسه سپاهان
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              ارائه مدارک معتبر کارشناسی و کارشناسی ارشد مورد تایید وزارت علوم
            </p>
          </div>
          <span className="text-xs bg-blue-50 text-blue-900 px-3 py-1 rounded-lg font-bold">
            بیش از ۲۰ کد رشته تحصیلی
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Faculty 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-blue-700" />
              <h3 className="font-bold text-slate-900 text-sm">دانشکده مهندسی و علوم کامپیوتر</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>مهندسی کامپیوتر (نرم‌افزار، هوش مصنوعی)</li>
              <li>مهندسی فناوری اطلاعات (IT)</li>
              <li>مهندسی برق و الکترونیک</li>
              <li>علوم داده و رایانش ابری</li>
            </ul>
          </div>

          {/* Faculty 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-indigo-700" />
              <h3 className="font-bold text-slate-900 text-sm">دانشکده معماری و عمران</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>مهندسی معماری و طراحی شهری</li>
              <li>مهندسی عمران و سازه‌های بتنی</li>
              <li>طراحی داخلی و گرافیک محیطی</li>
              <li>مرمت بناهای تاریخی اصفهان</li>
            </ul>
          </div>

          {/* Faculty 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <Library className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-sm">دانشکده مدیریت و علوم مالی</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>مدیریت بازرگانی و کسب و کار (MBA)</li>
              <li>حسابداری و مدیریت مالی</li>
              <li>مهندسی صنایع و بهینه‌سازی سیستم‌ها</li>
              <li>حقوق و مدیریت دولتی</li>
            </ul>
          </div>

        </div>
      </div>

      {/* University Contact & Location Footer Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              موسسه آموزش عالی غیرانتفاعی سپاهان
            </h4>
            <p className="text-slate-400 leading-relaxed">
              اصفهان، بهارستان، خیابان فرهنگ، پردیس موسسه آموزش عالی غیرانتفاعی سپاهان
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-white">راه‌های ارتباطی و دبیرخانه:</h4>
            <div className="space-y-1.5 text-slate-300 font-mono tabular-nums">
              <p className="flex items-center gap-2 font-sans">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>تلفن گویای موسسه: {toPersianDigits('031-36800000')}</span>
              </p>
              <p className="flex items-center gap-2 font-sans">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>پست الکترونیک: info@sepahan.ac.ir</span>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-white">ساعات پاسخگویی اداری:</h4>
            <p className="text-slate-400 leading-relaxed">
              شنبه تا چهارشنبه: ساعت ۰۸:۰۰ الی ۱۶:۰۰
              <br />
              پنج‌شنبه‌ها: ساعت ۰۸:۰۰ الی ۱۲:۳۰
            </p>
          </div>

        </div>

        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
          کلیه حقوق این پرتال متعلق به موسسه آموزش عالی غیرانتفاعی سپاهان می‌باشد © ۱۴۰۳ - ۱۴۰۴
        </div>
      </div>

    </div>
  );
};
