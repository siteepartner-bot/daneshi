import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Course, StudentProfile } from '../types';
import { 
  toPersianDigits, 
  formatTomans, 
  checkScheduleConflict 
} from '../utils/formatters';
import { 
  BookOpenCheck, 
  Search, 
  Plus, 
  Trash2, 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Printer, 
  Info, 
  Users, 
  Check, 
  AlertTriangle,
  Sparkles,
  ArrowUpDown,
  Filter
} from 'lucide-react';

interface CourseRegistrationProps {
  student: StudentProfile;
  availableCourses: Course[];
  enrolledCourses: Course[];
  onEnrollCourse: (course: Course) => void;
  onDropCourse: (courseId: string) => void;
  onFinalizeEnrollment: () => void;
}

export const CourseRegistration: React.FC<CourseRegistrationProps> = ({
  student,
  availableCourses,
  enrolledCourses,
  onEnrollCourse,
  onDropCourse,
  onFinalizeEnrollment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFinalizedModal, setShowFinalizedModal] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  const enrolledIds = new Set(enrolledCourses.map(c => c.id));
  const currentUnits = enrolledCourses.reduce((sum, c) => sum + c.units, 0);
  const maxUnits = student.maxSelectableUnits;
  const minUnits = student.minSelectableUnits;
  const remainingUnits = maxUnits - currentUnits;

  // Filter courses
  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.includes(searchQuery) ||
      course.professor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = 
      selectedType === 'all' || course.type === selectedType;

    return matchesSearch && matchesType;
  });

  const handleEnroll = (course: Course) => {
    setConflictWarning(null);

    // 1. Check unit limit
    if (currentUnits + course.units > maxUnits) {
      setConflictWarning(`سقف مجاز انتخاب واحد شما در این ترم ${toPersianDigits(maxUnits)} واحد است. امکان اخذ این درس (${toPersianDigits(course.units)} واحد) وجود ندارد.`);
      return;
    }

    // 2. Check schedule & exam conflict
    const conflict = checkScheduleConflict(course, enrolledCourses);
    if (conflict.hasConflict) {
      setConflictWarning(`خطای تداخل: ${conflict.details}`);
      return;
    }

    // 3. Enroll
    onEnrollCourse(course);
  };

  const handleFinalize = () => {
    if (currentUnits < minUnits) {
      setConflictWarning(`حداقل تعداد واحد مجاز برای ثبت در نیمسال ${toPersianDigits(minUnits)} واحد است. شما ${toPersianDigits(currentUnits)} واحد انتخاب نموده‌اید.`);
      return;
    }

    onFinalizeEnrollment();
    setShowFinalizedModal(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Info & Unit Limits */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BookOpenCheck className="w-6 h-6 text-blue-700" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                سامانه انتخاب واحد و ترمیم دروس
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              نیمسال اول سال تحصیلی ۱۴۰۴ - ۱۴۰۵ · دانشکده مهندسی و علوم فنی
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFinalize}
              disabled={enrolledCourses.length === 0}
              className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" />
              ثبت نهایی و تایید انتخاب واحد
            </button>
          </div>
        </div>

        {/* Units Counter & Live Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono tabular-nums">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-sans block">واحدهای انتخاب شده:</span>
            <span className="text-base font-bold text-blue-800">{toPersianDigits(currentUnits)} واحد</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-sans block">سقف مجاز این ترم:</span>
            <span className="text-base font-bold text-slate-800">{toPersianDigits(maxUnits)} واحد</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-sans block">حداقل واحد مجاز:</span>
            <span className="text-base font-bold text-slate-800">{toPersianDigits(minUnits)} واحد</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-sans block">ظرفیت واحد باقیمانده:</span>
            <span className={`text-base font-bold ${remainingUnits > 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
              {toPersianDigits(remainingUnits)} واحد
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>درصد تکمیل سقف مجاز انتخاب واحد:</span>
            <span className="font-mono tabular-nums">{toPersianDigits(Math.round((currentUnits / maxUnits) * 100))}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                currentUnits > maxUnits ? 'bg-red-500' : currentUnits >= minUnits ? 'bg-emerald-500' : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(100, (currentUnits / maxUnits) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Warning Callout if conflict detected */}
        {conflictWarning && (
          <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">عدم امکان اخذ درس به دلیل تداخل یا محدودیت</p>
              <p className="mt-0.5">{conflictWarning}</p>
            </div>
            <button 
              onClick={() => setConflictWarning(null)} 
              className="text-red-500 hover:text-red-700 font-bold px-1"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Course Catalog & Enrolled Units (2-Column Desktop Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Available Offerings List (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو بر اساس نام درس، کد یا استاد مدرس..."
                className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-hidden transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'همه دروس' },
                { id: 'تخصصی', label: 'تخصصی' },
                { id: 'پایه', label: 'پایه' },
                { id: 'عمومی', label: 'عمومی' },
                { id: 'عملی / آزمایشگاهی', label: 'عملی' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedType === tab.id
                      ? 'bg-blue-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Courses List */}
          <div className="space-y-3">
            {filteredCourses.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                <Info className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold">هیچ درسی با مشخصات وارد شده یافت نشد.</p>
                <p className="text-xs text-slate-400 mt-1">لطفاً عبارت جستجو را تغییر دهید یا فیلتر دسته‌بندی را بازنشانی کنید.</p>
              </div>
            ) : (
              filteredCourses.map((course) => {
                const isEnrolled = enrolledIds.has(course.id);
                const conflict = !isEnrolled ? checkScheduleConflict(course, enrolledCourses) : { hasConflict: false };
                const isFull = course.enrolledCount >= course.capacity;

                return (
                  <div
                    key={course.id}
                    className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all ${
                      isEnrolled 
                        ? 'border-blue-300 ring-1 ring-blue-200 bg-blue-50/20' 
                        : conflict.hasConflict
                        ? 'border-amber-200 bg-amber-50/10'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      
                      {/* Course Title & Metadata */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                            {course.name}
                          </h3>
                          <span className="text-xs text-slate-500 font-mono tabular-nums">
                            کد: {course.code} (گروه {toPersianDigits(course.group)})
                          </span>
                          <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {course.type}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600">
                          استاد: <strong className="text-slate-800 font-semibold">{course.professor}</strong>
                        </p>

                        {/* Prerequisites & Corequisites */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 pt-1">
                          <span>
                            پیش‌نیاز: {course.prerequisites.length > 0 ? course.prerequisites.join('، ') : 'ندارد'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">
                            تعداد واحد: {toPersianDigits(course.units)} واحد
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1 font-mono tabular-nums">
                            <Users className="w-3 h-3 text-slate-400" />
                            ظرفیت: {toPersianDigits(course.enrolledCount)}/{toPersianDigits(course.capacity)}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {isEnrolled ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              اخذ شده
                            </span>
                            <button
                              onClick={() => onDropCourse(course.id)}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
                              title="حذف این درس"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>حذف</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEnroll(course)}
                            disabled={isFull}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                              conflict.hasConflict
                                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                                : isFull
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                            <span>{isFull ? 'ظرفیت تکمیل' : 'اخذ درس'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Schedule & Exam Information Strip */}
                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      
                      {/* Class Slots */}
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-mono tabular-nums">
                          زمان کلاس: {course.schedule.map(s => `${s.day} (${toPersianDigits(s.startTime)}-${toPersianDigits(s.endTime)})`).join(' و ')}
                        </span>
                      </div>

                      {/* Exam Slot */}
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-mono tabular-nums">
                          امتحان: {toPersianDigits(course.examDate)} (ساعت {toPersianDigits(course.examTime)})
                        </span>
                      </div>

                    </div>

                    {/* Conflict notification if applicable */}
                    {conflict.hasConflict && (
                      <div className="mt-2.5 p-2 bg-amber-50 rounded-lg text-[11px] text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>هشدار: {conflict.details}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Current Enrolled Basket / Registration Summary (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>لیست دروس انتخابی این ترم</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-mono tabular-nums">
                  {toPersianDigits(enrolledCourses.length)}
                </span>
              </h3>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                <BookOpenCheck className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p>هنوز هیچ درسی اخذ نکرده‌اید.</p>
                <p className="mt-1">از لیست سمت راست، دروس مورد نظر را به سبد اضافه فرمایید.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto mt-2">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="py-2.5 flex items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-xs text-slate-900">{course.name}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono tabular-nums">
                        <span>{toPersianDigits(course.units)} واحد</span>
                        <span>·</span>
                        <span>{course.professor}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onDropCourse(course.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                      title="حذف درس"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Total Units and Action */}
            <div className="mt-4 pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">مجموع واحدهای انتخابی:</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums text-sm">
                  {toPersianDigits(currentUnits)} از {toPersianDigits(maxUnits)} واحد
                </span>
              </div>

              <button
                onClick={handleFinalize}
                disabled={enrolledCourses.length === 0}
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ثبت نهایی و تایید آموزش</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Finalized Modal Confirmation */}
      {showFinalizedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">انتخاب واحد شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-slate-600">
                تعداد {toPersianDigits(enrolledCourses.length)} عنوان درس ({toPersianDigits(currentUnits)} واحد) در سامانه جامع آموزشی موسسه غیرانتفاعی سپاهان ثبت گردید.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 font-mono tabular-nums">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">کد پیگیری انتخاب واحد:</span>
                <span className="font-bold text-blue-900">ENR-1404-{Math.floor(10000 + Math.random() * 90000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">تاریخ ثبت:</span>
                <span className="text-slate-800 font-sans">۱۴۰۳/۱۱/۲۵ - ساعت ۱۰:۱۵</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                چاپ برگه تاییدیه انتخاب واحد
              </button>
              <button
                onClick={() => setShowFinalizedModal(false)}
                className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
