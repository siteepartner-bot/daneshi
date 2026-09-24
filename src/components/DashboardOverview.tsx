import React from 'react';
import { ViewTab, StudentProfile, Course, AnnouncementItem } from '../types';
import { toPersianDigits, formatTomans } from '../utils/formatters';
import { 
  GraduationCap, 
  CreditCard, 
  BookOpenCheck, 
  Calendar, 
  FileSpreadsheet, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  TrendingUp, 
  Building, 
  Sparkles,
  MapPin,
  ChevronLeft,
  CalendarCheck
} from 'lucide-react';

interface DashboardOverviewProps {
  student: StudentProfile;
  enrolledCourses: Course[];
  announcements: AnnouncementItem[];
  onNavigate: (tab: ViewTab) => void;
  onOpenPaymentModal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  student,
  enrolledCourses,
  announcements,
  onNavigate,
  onOpenPaymentModal
}) => {
  const totalUnits = enrolledCourses.reduce((sum, c) => sum + c.units, 0);

  // Today's classes mockup based on a typical day (e.g. شنبه / دوشنبه)
  const todayClasses = enrolledCourses.filter(c => 
    c.schedule.some(s => s.day === 'شنبه' || s.day === 'دوشنبه')
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Student Welcome Banner / Identification Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 rounded-2xl p-5 sm:p-6 text-white shadow-md border border-blue-800">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-blue-800/80 border-2 border-amber-400/80 shadow-md shrink-0">
              <img
                src={student.avatarUrl}
                alt={student.firstName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  {student.firstName} {student.lastName}
                </h1>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-md font-medium">
                  {student.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-200">
                {student.degree} {student.major} · ورودی {toPersianDigits(student.entranceYear)}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-300 pt-1">
                <span>شماره دانشجویی: <strong className="text-white font-mono tabular-nums">{toPersianDigits(student.studentCode)}</strong></span>
                <span>کد ملی: <strong className="text-white font-mono tabular-nums">{toPersianDigits(student.nationalCode)}</strong></span>
                <span>ترم تحصیلی: <strong className="text-white font-mono tabular-nums">{toPersianDigits(student.currentTermNumber)}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onNavigate('registration')}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpenCheck className="w-4 h-4" />
              ورود به انتخاب واحد
            </button>
            <button
              onClick={onOpenPaymentModal}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-emerald-300" />
              تسویه آنلاین شهریه
            </button>
          </div>
        </div>

        {/* Decorative subtle ambient pattern */}
        <div className="absolute top-0 left-0 -mt-8 -ml-8 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* High-Level Metric Tiles (Tabular figures, 4 key stats) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Metric 1: Financial Balance */}
        <div 
          onClick={() => onNavigate('tuition')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>مانده بدهی شهریه</span>
            <div className="p-1.5 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100 transition-colors">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-slate-900">
            {student.tuitionBalance > 0 ? (
              <span className="text-red-600">{formatTomans(student.tuitionBalance)}</span>
            ) : (
              <span className="text-emerald-600">تسویه کامل (۰ تومان)</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <span>شهریه ثابت و متغیر</span>
            <span className="text-blue-600 font-medium group-hover:underline flex items-center">
              پرداخت <ChevronLeft className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 2: Enrolled Units */}
        <div 
          onClick={() => onNavigate('registration')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>واحدهای ثبت شده ترم</span>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
              <BookOpenCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-slate-900">
            {toPersianDigits(totalUnits)} <span className="text-xs font-normal text-slate-500">از {toPersianDigits(student.maxSelectableUnits)} واحد مجاز</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <span>تعداد {toPersianDigits(enrolledCourses.length)} عنوان درس</span>
            <span className="text-blue-600 font-medium group-hover:underline flex items-center">
              ویرایش <ChevronLeft className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 3: Academic GPA */}
        <div 
          onClick={() => onNavigate('transcript')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>معدل کل دانشجو</span>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-100 transition-colors">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-slate-900">
            {toPersianDigits(student.totalGpa)} <span className="text-xs font-normal text-emerald-600">(دانشجوی ممتاز الف)</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <span>واحدهای گذرانده: {toPersianDigits(student.totalPassedUnits)}</span>
            <span className="text-blue-600 font-medium group-hover:underline flex items-center">
              ریز نمرات <ChevronLeft className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 4: Exam Schedule Status */}
        <div 
          onClick={() => onNavigate('exams')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>کارت ورود به جلسه</span>
            <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-100 transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-1.5">
            <span className="text-emerald-600 text-sm sm:text-base font-bold">صادر شده</span>
            <span className="text-xs text-slate-500 font-normal">({toPersianDigits(enrolledCourses.length)} آزمون)</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <span>سالن‌های شماره ۱ و ۲</span>
            <span className="text-blue-600 font-medium group-hover:underline flex items-center">
              دریافت کارت <ChevronLeft className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>

      {/* Main 2-Column Portal Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Classes today & Course Schedule Snapshot */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Classes Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">کلاس‌های برنامه هفتگی جاری</h3>
              </div>
              <button
                onClick={() => onNavigate('schedule')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>مشاهده جدول هفتگی کامل</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {enrolledCourses.slice(0, 4).map((course) => {
                const primarySlot = course.schedule[0];
                return (
                  <div key={course.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 rounded-xl px-2 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{course.name}</span>
                        <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono tabular-nums">
                          {toPersianDigits(course.units)} واحد {course.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        مدرس: <strong className="text-slate-700">{course.professor}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {primarySlot && (
                        <div className="bg-blue-50 border border-blue-100 text-blue-900 px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{primarySlot.day} ({toPersianDigits(primarySlot.startTime)} تا {toPersianDigits(primarySlot.endTime)})</span>
                        </div>
                      )}
                      <div className="hidden sm:flex items-center gap-1 text-slate-500 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{primarySlot?.room}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Access Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Quick action 1: Course Registration */}
            <div 
              onClick={() => onNavigate('registration')}
              className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">سامانه انتخاب واحد</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                مشاهده لیست دروس ارائه‌شده ترم، بررسی ظرفیت کلاس‌ها، کنترل پیش‌نیازها و ثبت نهایی واحدها.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 mt-3 group-hover:translate-x-[-4px] transition-transform">
                ورود به انتخاب واحد <ChevronLeft className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Quick action 2: Tuition Payment */}
            <div 
              onClick={() => onNavigate('tuition')}
              className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">امور مالی و پرداخت شهریه</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                مشاهده ریز محاسبات شهریه ثابت و متغیر، درخواست تقسیط شهریه، پرداخت برخط از درگاه شتاب و دریافت فیش.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-3 group-hover:translate-x-[-4px] transition-transform">
                مدیریت شهریه <ChevronLeft className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>

        </div>

        {/* Right 1 Column: Announcements & Academic Timeline */}
        <div className="space-y-6">
          
          {/* Important Notices */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                اطلاعیه‌های آموزشی مهم
              </h3>
              <button
                onClick={() => onNavigate('announcements')}
                className="text-xs text-blue-600 hover:underline cursor-pointer"
              >
                آرشیو
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {announcements.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => onNavigate('announcements')}
                  className="py-3 group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono tabular-nums">
                    <span className="text-blue-700 font-sans font-medium">{item.category}</span>
                    <span>{toPersianDigits(item.date)}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Calendar / Semester Milestones */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              تقویم آموزشی نیمسال اول ۱۴۰۴ - ۱۴۰۵
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-800">بازه انتخاب واحد اینترنتی</p>
                  <p className="text-slate-500 text-[11px] font-mono tabular-nums">۲۵ بهمن تا ۲۹ بهمن ۱۴۰۳</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-800">شروع کلاس‌های نیمسال</p>
                  <p className="text-slate-500 text-[11px] font-mono tabular-nums">۴ اسفند ۱۴۰۳</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-800">حذف و اضافه (ترمیم واحد)</p>
                  <p className="text-slate-500 text-[11px] font-mono tabular-nums">۱۱ تا ۱۵ اسفند ۱۴۰۳</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-800">شروع امتحانات پایان‌ترم</p>
                  <p className="text-slate-500 text-[11px] font-mono tabular-nums">۱۸ خرداد ۱۴۰۴</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
