import React, { useState } from 'react';
import { SemesterGrade, StudentProfile } from '../types';
import { toPersianDigits } from '../utils/formatters';
import { 
  GraduationCap, 
  Printer, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  FileText
} from 'lucide-react';

interface TranscriptViewProps {
  student: StudentProfile;
  history: SemesterGrade[];
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({
  student,
  history
}) => {
  const [expandedSemester, setExpandedSemester] = useState<number | null>(history[history.length - 1]?.termNumber || 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-700" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                کارنامه و سوابق تحصیلی دانشجو
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              موسسه آموزش عالی غیرانتفاعی سپاهان · ریز نمرات نیمسال‌های گذشته
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ کارنامه کل</span>
          </button>
        </div>

        {/* High level stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono tabular-nums">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-sans block">معدل کل دانشجو:</span>
            <span className="text-base font-bold text-emerald-700">{toPersianDigits(student.totalGpa)}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-sans block">معدل ترم گذشته:</span>
            <span className="text-base font-bold text-blue-800">{toPersianDigits(student.lastSemesterGpa)}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-sans block">مجموع واحدهای گذرانده:</span>
            <span className="text-base font-bold text-slate-800">{toPersianDigits(student.totalPassedUnits)} واحد</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-sans block">وضعیت علمی دانشجو:</span>
            <span className="text-base font-bold text-amber-700 font-sans">دانشجوی استعداد درخشان</span>
          </div>
        </div>
      </div>

      {/* Semesters Accordion */}
      <div className="space-y-4">
        {history.map((semester) => {
          const isExpanded = expandedSemester === semester.termNumber;

          return (
            <div key={semester.termNumber} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              
              {/* Semester Accordion Header */}
              <div 
                onClick={() => setExpandedSemester(isExpanded ? null : semester.termNumber)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs font-mono">
                    {toPersianDigits(semester.termNumber)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {semester.termName}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono tabular-nums">
                      تعداد واحد گذرانده: {toPersianDigits(semester.passedUnits)} واحد
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left font-mono tabular-nums">
                    <span className="text-[11px] text-slate-400 font-sans block">معدل نیمسال:</span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base text-blue-800">
                      {toPersianDigits(semester.termGpa.toFixed(2))}
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {/* Semester Courses Table */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-4 sm:p-5 overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <th className="py-2.5 px-3">کد درس</th>
                        <th className="py-2.5 px-3">نام درس</th>
                        <th className="py-2.5 px-3 font-mono text-center">تعداد واحد</th>
                        <th className="py-2.5 px-3 font-mono text-center">نمره نهایی</th>
                        <th className="py-2.5 px-3 text-center">نتیجه</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                      {semester.courses.map((course, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70">
                          <td className="py-2.5 px-3 text-slate-500">{course.code}</td>
                          <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">{course.name}</td>
                          <td className="py-2.5 px-3 text-center text-slate-700">{toPersianDigits(course.units)}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-blue-900">{toPersianDigits(course.grade.toFixed(1))}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-sans text-[11px] font-semibold">
                              <CheckCircle2 className="w-3 h-3" />
                              {course.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
