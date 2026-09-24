import React, { useState } from 'react';
import { Course, StudentProfile } from '../types';
import { toPersianDigits } from '../utils/formatters';
import { 
  FileSpreadsheet, 
  Printer, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  QrCode, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Hourglass,
  HelpCircle,
  FileText
} from 'lucide-react';

interface ExamScheduleProps {
  student: StudentProfile;
  enrolledCourses: Course[];
}

export const ExamSchedule: React.FC<ExamScheduleProps> = ({
  student,
  enrolledCourses
}) => {
  const [showAdmitCard, setShowAdmitCard] = useState(false);

  // Sort courses by exam date
  const sortedExams = [...enrolledCourses].sort((a, b) => {
    return (a.examDate || '').localeCompare(b.examDate || '');
  });

  const nextExam = sortedExams[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-amber-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                برنامه امتحانات پایان‌ترم و کارت ورود به جلسه
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              موسسه آموزش عالی غیرانتفاعی سپاهان · نیمسال اول ۱۴۰۴ - ۱۴۰۵
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAdmitCard(!showAdmitCard)}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <QrCode className="w-4 h-4 text-amber-300" />
              <span>{showAdmitCard ? 'مشاهده جدول امتحانات' : 'مشاهده و چاپ کارت ورود به جلسه'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">چاپ</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights: Next Exam Countdown Banner */}
        {nextExam && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500 text-white rounded-xl shrink-0">
                <Hourglass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  اولین آزمون پیش‌رو:
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {nextExam.name} ({nextExam.professor})
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono tabular-nums">
              <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-200 text-amber-900 font-bold">
                تاریخ: {toPersianDigits(nextExam.examDate)}
              </div>
              <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-200 text-slate-700">
                ساعت: {toPersianDigits(nextExam.examTime)}
              </div>
              <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-200 text-blue-900 font-sans">
                شماره صندلی: <strong className="font-mono">{toPersianDigits(nextExam.examSeatNumber || 'A-1')}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mode 1: Official Printable Admit Card */}
      {showAdmitCard ? (
        <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
          
          {/* Header with University Emblem */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-800 pb-4">
            <div className="flex items-center gap-3 text-right">
              <div className="w-14 h-14 bg-blue-950 text-white rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950">
                  موسسه آموزش عالی غیرانتفاعی سپاهان
                </h2>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  کارت ورود به جلسه آزمون‌های پایان‌ترم (نیمسال اول ۱۴۰۴ - ۱۴۰۵)
                </p>
              </div>
            </div>

            {/* Barcode Mock */}
            <div className="text-center">
              <div className="bg-slate-100 px-4 py-2 rounded-lg border border-slate-300 font-mono tracking-widest text-xs font-bold select-none">
                |||| | ||||| || |||||| | |||
              </div>
              <span className="text-[10px] text-slate-400 font-mono tabular-nums block mt-1">
                {student.studentCode}-1404
              </span>
            </div>
          </div>

          {/* Student Profile Info Grid on the Admit Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-6 text-xs flex-1">
              <div>
                <span className="text-slate-500 block">نام و نام خانوادگی:</span>
                <span className="font-bold text-slate-900 text-sm">{student.firstName} {student.lastName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">شماره دانشجویی:</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums text-sm">{toPersianDigits(student.studentCode)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">کد ملی:</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums text-sm">{toPersianDigits(student.nationalCode)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">رشته و مقطع:</span>
                <span className="font-semibold text-slate-800">{student.degree} {student.major}</span>
              </div>
              <div>
                <span className="text-slate-500 block">دانشکده:</span>
                <span className="font-semibold text-slate-800">{student.faculty}</span>
              </div>
              <div>
                <span className="text-slate-500 block">وضعیت مالی:</span>
                <span className="font-bold text-emerald-700">مجاز به شرکت در آزمون</span>
              </div>
            </div>

            {/* Student Photo */}
            <div className="w-20 h-24 rounded-lg overflow-hidden border-2 border-slate-300 shrink-0 bg-slate-200">
              <img
                src={student.avatarUrl}
                alt={student.firstName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Exams List Table */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">لیست عناوین امتحانات مصوب:</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <th className="py-2.5 px-3 border-l border-slate-200 w-12 text-center">ردیف</th>
                    <th className="py-2.5 px-3 border-l border-slate-200">عنوان درس</th>
                    <th className="py-2.5 px-3 border-l border-slate-200">استاد مدرس</th>
                    <th className="py-2.5 px-3 border-l border-slate-200 font-mono tabular-nums text-center">تعداد واحد</th>
                    <th className="py-2.5 px-3 border-l border-slate-200 font-mono tabular-nums text-center">تاریخ آزمون</th>
                    <th className="py-2.5 px-3 border-l border-slate-200 font-mono tabular-nums text-center">ساعت آزمون</th>
                    <th className="py-2.5 px-3 border-l border-slate-200 text-center">محل آزمون</th>
                    <th className="py-2.5 px-3 text-center font-mono tabular-nums">شماره صندلی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono tabular-nums">
                  {sortedExams.map((course, idx) => (
                    <tr key={course.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 text-center text-slate-500 border-l border-slate-200">{toPersianDigits(idx + 1)}</td>
                      <td className="py-2.5 px-3 font-sans font-bold text-slate-900 border-l border-slate-200">{course.name}</td>
                      <td className="py-2.5 px-3 font-sans text-slate-700 border-l border-slate-200">{course.professor}</td>
                      <td className="py-2.5 px-3 text-center border-l border-slate-200">{toPersianDigits(course.units)}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-blue-900 border-l border-slate-200">{toPersianDigits(course.examDate)}</td>
                      <td className="py-2.5 px-3 text-center border-l border-slate-200">{toPersianDigits(course.examTime)}</td>
                      <td className="py-2.5 px-3 font-sans text-center text-slate-700 border-l border-slate-200">{course.examRoom}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-red-700 bg-red-50/50">{toPersianDigits(course.examSeatNumber || 'A-01')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Exam Rules & Regulations */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              تذکرات مهم انضباطی آزمون:
            </h4>
            <p>۱. همراه داشتن پرینت فیزیکی این کارت و کارت دانشجویی در تمام جلسات آزمون الزامی است.</p>
            <p>۲. ورود هرگونه کیف، کتاب، جزوه، تلفن همراه و ساعت هوشمند به سالن امتحانات اکیداً ممنوع بوده و مصداق تقلب است.</p>
            <p>۳. درب سالن‌های آزمون ۱۵ دقیقه پیش از شروع بسته شده و از ورود دانشجویان با تاخیر ممانعت به عمل خواهد آمد.</p>
          </div>

          {/* Sign & Seal Placeholder */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs text-slate-500">
            <span>تاریخ صدور کارت: ۱۴۰۳/۱۱/۲۵</span>
            <span className="font-bold text-slate-700">مهر و امضای اداره آموزش و آزمون‌های موسسه سپاهان</span>
          </div>

        </div>
      ) : (
        /* Mode 2: Interactive Card Table View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              جدول زمان‌بندی و شماره صندلی امتحانات
            </h3>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              مجموع: {toPersianDigits(sortedExams.length)} آزمون
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                  <th className="py-3.5 px-4">ردیف</th>
                  <th className="py-3.5 px-4">عنوان درس</th>
                  <th className="py-3.5 px-4">استاد</th>
                  <th className="py-3.5 px-4">تاریخ برگزاری</th>
                  <th className="py-3.5 px-4">ساعت شروع و پایان</th>
                  <th className="py-3.5 px-4">سالن و محل آزمون</th>
                  <th className="py-3.5 px-4 text-center">شماره صندلی</th>
                  <th className="py-3.5 px-4 text-center">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                {sortedExams.map((course, idx) => (
                  <tr key={course.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-slate-400">{toPersianDigits(idx + 1)}</td>
                    <td className="py-3.5 px-4 font-sans font-bold text-slate-900 text-sm">
                      {course.name}
                      <span className="text-[11px] text-slate-400 font-mono block">کد: {course.code}</span>
                    </td>
                    <td className="py-3.5 px-4 font-sans text-slate-700">{course.professor}</td>
                    <td className="py-3.5 px-4 font-bold text-blue-900 text-sm">
                      {toPersianDigits(course.examDate)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {toPersianDigits(course.examTime)}
                    </td>
                    <td className="py-3.5 px-4 font-sans text-slate-700">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{course.examRoom}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg font-bold text-sm">
                        {toPersianDigits(course.examSeatNumber || 'A-1')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-sans text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        نهایی
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
