import React, { useState } from 'react';
import { Course, StudentProfile } from '../types';
import { toPersianDigits } from '../utils/formatters';
import { 
  CalendarDays, 
  Printer, 
  Clock, 
  MapPin, 
  User, 
  ListFilter, 
  LayoutGrid, 
  Info,
  CalendarCheck2,
  Building,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

interface WeeklyScheduleProps {
  student: StudentProfile;
  enrolledCourses: Course[];
}

const DAYS_OF_WEEK = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'] as const;

const TIME_SLOTS = [
  { label: '۰۸:۰۰ - ۱۰:۰۰', start: '08:00', end: '10:00' },
  { label: '۱۰:۰۰ - ۱۲:۰۰', start: '10:00', end: '12:00' },
  { label: '۱۳:۳۰ - ۱۵:۳۰', start: '13:30', end: '15:30' },
  { label: '۱۵:۳۰ - ۱۷:۳۰', start: '15:30', end: '17:30' },
  { label: '۱۷:۳۰ - ۱۹:۳۰', start: '17:30', end: '19:30' }
];

// Color palette for courses
const COURSE_COLORS = [
  { bg: 'bg-blue-50 border-blue-200 text-blue-900', badge: 'bg-blue-600 text-white' },
  { bg: 'bg-emerald-50 border-emerald-200 text-emerald-900', badge: 'bg-emerald-600 text-white' },
  { bg: 'bg-purple-50 border-purple-200 text-purple-900', badge: 'bg-purple-600 text-white' },
  { bg: 'bg-amber-50 border-amber-200 text-amber-900', badge: 'bg-amber-600 text-white' },
  { bg: 'bg-teal-50 border-teal-200 text-teal-900', badge: 'bg-teal-600 text-white' },
  { bg: 'bg-rose-50 border-rose-200 text-rose-900', badge: 'bg-rose-600 text-white' },
];

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  student,
  enrolledCourses
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('all');
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);

  // Map courses to colors
  const courseColorMap = new Map<string, typeof COURSE_COLORS[0]>();
  enrolledCourses.forEach((course, idx) => {
    courseColorMap.set(course.id, COURSE_COLORS[idx % COURSE_COLORS.length]);
  });

  // Calculate total units
  const totalUnits = enrolledCourses.reduce((sum, c) => sum + c.units, 0);

  // Helper to find courses for a day and time slot
  const getCoursesForSlot = (day: string, slotStart: string) => {
    return enrolledCourses.filter(course => 
      course.schedule.some(s => s.day === day && s.startTime === slotStart)
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Schedule Header & Controls */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-6 h-6 text-indigo-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                برنامه هفتگی تشکیل کلاس‌ها
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              موسسه آموزش عالی غیرانتفاعی سپاهان · نیمسال اول ۱۴۰۴ - ۱۴۰۵ · {student.major}
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">جدول هفتگی</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">لیست روزانه</span>
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title="چاپ برنامه هفتگی"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">چاپ برنامه</span>
            </button>
          </div>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 text-xs">
          <div className="flex items-center gap-4 text-slate-600 font-mono tabular-nums">
            <span>تعداد دروس: <strong className="text-slate-900">{toPersianDigits(enrolledCourses.length)} درس</strong></span>
            <span>مجموع واحدها: <strong className="text-slate-900">{toPersianDigits(totalUnits)} واحد</strong></span>
          </div>

          {/* Day Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedDayFilter('all')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                selectedDayFilter === 'all'
                  ? 'bg-blue-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              همه روزها
            </button>
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDayFilter(day)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                  selectedDayFilter === day
                    ? 'bg-blue-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Timetable View */}
      {viewMode === 'grid' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-right">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-xs text-slate-700 font-bold">
                  <th className="py-3.5 px-4 w-32 border-l border-slate-200 text-center">روز / ساعت</th>
                  {TIME_SLOTS.map((slot, idx) => (
                    <th key={idx} className="py-3.5 px-3 text-center border-l border-slate-200 last:border-l-0 font-mono tabular-nums">
                      {slot.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {DAYS_OF_WEEK.filter(d => selectedDayFilter === 'all' || selectedDayFilter === d).map((day) => (
                  <tr key={day} className="hover:bg-slate-50/50 transition-colors">
                    {/* Day Column */}
                    <td className="py-4 px-4 bg-slate-50/80 font-bold text-slate-900 border-l border-slate-200 text-center">
                      {day}
                    </td>

                    {/* Time Slot Columns */}
                    {TIME_SLOTS.map((slot, sIdx) => {
                      const coursesInSlot = getCoursesForSlot(day, slot.start);

                      return (
                        <td 
                          key={sIdx} 
                          className="p-2 border-l border-slate-200 last:border-l-0 align-top min-w-[140px] h-28"
                        >
                          {coursesInSlot.length > 0 ? (
                            coursesInSlot.map((course) => {
                              const colors = courseColorMap.get(course.id) || COURSE_COLORS[0];
                              const scheduleItem = course.schedule.find(s => s.day === day && s.startTime === slot.start);

                              return (
                                <div
                                  key={course.id}
                                  onClick={() => setSelectedCourseDetail(course)}
                                  className={`p-2.5 rounded-xl border ${colors.bg} hover:shadow-md transition-all cursor-pointer space-y-1.5 h-full flex flex-col justify-between`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="font-bold text-xs leading-snug line-clamp-1">
                                        {course.name}
                                      </span>
                                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono font-semibold shrink-0 ${colors.badge}`}>
                                        {toPersianDigits(course.units)} واحد
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 truncate mt-0.5">
                                      {course.professor}
                                    </p>
                                  </div>

                                  <div className="pt-1 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                                    <span className="truncate">{scheduleItem?.room}</span>
                                    <span className="text-[9px] bg-white/80 px-1 py-0.5 rounded border border-slate-200">
                                      گروه {toPersianDigits(course.group)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="h-full rounded-xl border border-dashed border-slate-100 flex items-center justify-center text-slate-300 text-[11px]">
                              —
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* List / Daily Agenda View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {DAYS_OF_WEEK.filter(d => selectedDayFilter === 'all' || selectedDayFilter === d).map((day) => {
            const dayCourses = enrolledCourses.filter(c => c.schedule.some(s => s.day === day));

            return (
              <div key={day} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    برنامه کلاسی روز {day}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono tabular-nums">
                    {toPersianDigits(dayCourses.length)} کلاس آموزشی
                  </span>
                </div>

                {dayCourses.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">
                    در روز {day} کلاسی برای شما تعریف نشده است.
                  </p>
                ) : (
                  <div className="divide-y divide-slate-100 mt-2">
                    {dayCourses.map((course) => {
                      const slot = course.schedule.find(s => s.day === day);
                      const colors = courseColorMap.get(course.id) || COURSE_COLORS[0];

                      return (
                        <div 
                          key={course.id}
                          onClick={() => setSelectedCourseDetail(course)}
                          className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2 transition-colors cursor-pointer"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{course.name}</span>
                              <span className={`text-[11px] px-2 py-0.5 rounded font-mono ${colors.badge}`}>
                                {toPersianDigits(course.units)} واحد {course.type}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">
                              مدرس: <strong className="text-slate-800">{course.professor}</strong> · کد درس: {course.code}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-xs font-mono tabular-nums">
                            {slot && (
                              <div className="bg-blue-50 border border-blue-100 text-blue-900 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-blue-600" />
                                <span>{toPersianDigits(slot.startTime)} تا {toPersianDigits(slot.endTime)}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 text-slate-600 font-sans">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{slot?.room} ({slot?.building})</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourseDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">{selectedCourseDetail.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  کد درس: {selectedCourseDetail.code} · گروه {toPersianDigits(selectedCourseDetail.group)} · {selectedCourseDetail.type}
                </p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-lg font-mono tabular-nums">
                {toPersianDigits(selectedCourseDetail.units)} واحد
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">استاد مدرس:</span>
                <p className="font-semibold text-slate-800 text-sm">{selectedCourseDetail.professor}</p>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">جلسات کلاسی هفتگی:</span>
                <div className="space-y-1.5">
                  {selectedCourseDetail.schedule.map((slot, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between font-mono tabular-nums">
                      <span className="font-bold text-blue-900 font-sans">{slot.day}</span>
                      <span>ساعت {toPersianDigits(slot.startTime)} الی {toPersianDigits(slot.endTime)}</span>
                      <span className="text-slate-600 font-sans">{slot.room} ({slot.building})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">زمان و مکان امتحان پایان ترم:</span>
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-center justify-between font-mono tabular-nums">
                  <span>تاریخ: {toPersianDigits(selectedCourseDetail.examDate)}</span>
                  <span>ساعت: {toPersianDigits(selectedCourseDetail.examTime)}</span>
                  <span className="font-sans font-semibold">{selectedCourseDetail.examRoom}</span>
                </div>
              </div>

              {selectedCourseDetail.description && (
                <div>
                  <span className="text-slate-500 block mb-1">سرفصل آموزشی:</span>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    {selectedCourseDetail.description}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedCourseDetail(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
