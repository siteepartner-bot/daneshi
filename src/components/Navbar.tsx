import React, { useState } from 'react';
import { ViewTab, StudentProfile, AnnouncementItem } from '../types';
import { toPersianDigits } from '../utils/formatters';
import { 
  Bell, 
  User, 
  Menu, 
  X, 
  Building2, 
  LogOut, 
  CheckCircle2, 
  CreditCard, 
  CalendarDays, 
  FileSpreadsheet, 
  BookOpenCheck,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  student: StudentProfile;
  announcements: AnnouncementItem[];
  onOpenStudentManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  student,
  announcements,
  onOpenStudentManager
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const importantAnnouncements = announcements.filter(a => a.isImportant);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark / University Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onTabChange('university-intro')}
              className="flex items-center gap-2.5 text-right group cursor-pointer focus:outline-hidden"
              title="صفحه اصلی و معرفی موسسه سپاهان"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-900 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-800 transition-colors">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                  موسسه آموزش عالی سپاهان
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  سامانه جامع خدمات دانشجویی
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Fast Desktop Navigation Links (Clean single-line text links) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 text-blue-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              میز کار دانشجو
            </button>

            <button
              onClick={() => onTabChange('registration')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'registration'
                  ? 'bg-blue-50 text-blue-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpenCheck className="w-4 h-4 text-blue-600" />
              انتخاب واحد
            </button>

            <button
              onClick={() => onTabChange('tuition')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tuition'
                  ? 'bg-blue-50 text-blue-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-600" />
              پرداخت شهریه
            </button>

            <button
              onClick={() => onTabChange('schedule')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'schedule'
                  ? 'bg-blue-50 text-blue-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CalendarDays className="w-4 h-4 text-indigo-600" />
              برنامه هفتگی
            </button>

            <button
              onClick={() => onTabChange('exams')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'exams'
                  ? 'bg-blue-50 text-blue-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-600" />
              برنامه امتحانات
            </button>

            <button
              onClick={() => onTabChange('university-intro')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'university-intro'
                  ? 'bg-blue-50 text-blue-900 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              معرفی دانشگاه
            </button>
          </nav>

          {/* Zone 3: Actions (Notifications, Student Profile Pill / Dropdown, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Direct Data Management / Excel button */}
            <button
              onClick={onOpenStudentManager}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="ثبت اطلاعات خودم یا بارگذاری فایل اکسل دانشجویان"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>ورود اطلاعات من / اکسل</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-hidden"
                title="اطلاعیه‌ها و پیام‌های دانشگاه"
                aria-label="اطلاعیه‌ها"
              >
                <Bell className="w-5 h-5" />
                {importantAnnouncements.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Popup Dropdown */}
              {showNotifications && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="font-bold text-sm text-slate-900">اعلانات و اطلاعیه‌های موسسه</span>
                    <button 
                      onClick={() => {
                        setShowNotifications(false);
                        onTabChange('announcements');
                      }}
                      className="text-xs text-blue-600 hover:underline cursor-pointer"
                    >
                      مشاهده همه
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {announcements.slice(0, 3).map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => {
                          setShowNotifications(false);
                          onTabChange('announcements');
                        }}
                        className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span className="font-medium text-blue-700">{item.category}</span>
                          <span>{toPersianDigits(item.date)}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Student Profile Quick View */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 pr-2.5 sm:pr-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer focus:outline-hidden"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 ring-1 ring-slate-300 shrink-0">
                  <img
                    src={student.avatarUrl}
                    alt={student.firstName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                    {student.firstName} {student.lastName}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                    شماره: {toPersianDigits(student.studentCode)}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
                  <div className="p-3 bg-slate-50 rounded-lg mb-2">
                    <p className="font-bold text-xs text-slate-900">{student.firstName} {student.lastName}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{student.major}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-200">
                      <span>معدل کل:</span>
                      <span className="font-bold text-slate-800 font-mono tabular-nums">{toPersianDigits(student.totalGpa)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenStudentManager();
                    }}
                    className="w-full text-right px-3 py-2 text-xs text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 rounded-lg font-bold cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <span>ورود مشخصات من / آپلود اکسل</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onTabChange('dashboard');
                    }}
                    className="w-full text-right px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg font-medium cursor-pointer transition-colors"
                  >
                    پروفایل و مشخصات آموزشی
                  </button>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onTabChange('transcript');
                    }}
                    className="w-full text-right px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg font-medium cursor-pointer transition-colors"
                  >
                    کارنامه و سوابق تحصیلی
                  </button>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onTabChange('requests');
                    }}
                    className="w-full text-right px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg font-medium cursor-pointer transition-colors"
                  >
                    درخواست‌های آموزشی و گواهی
                  </button>

                  <div className="my-1 border-t border-slate-100"></div>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onTabChange('university-intro');
                    }}
                    className="w-full text-right px-3 py-2 text-xs text-blue-700 hover:bg-blue-50 rounded-lg font-medium cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <span>صفحه معرفی موسسه</span>
                    <Building2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="منوی سایت"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="p-3 bg-blue-50/70 rounded-xl mb-3 flex items-center justify-between text-xs text-blue-950">
            <div>
              <p className="font-bold">{student.firstName} {student.lastName}</p>
              <p className="text-slate-600 text-[11px]">{student.major}</p>
            </div>
            <span className="font-mono tabular-nums text-blue-800 bg-blue-100 px-2 py-0.5 rounded text-[11px]">
              {toPersianDigits(student.studentCode)}
            </span>
          </div>

          <button
            onClick={() => {
              onTabChange('dashboard');
              setShowMobileMenu(false);
            }}
            className={`w-full text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'dashboard' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            میز کار دانشجو (داشبورد)
          </button>

          <button
            onClick={() => {
              onTabChange('registration');
              setShowMobileMenu(false);
            }}
            className={`w-full text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
              activeTab === 'registration' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpenCheck className="w-4 h-4 text-blue-600" />
              انتخاب واحد و ثبت دروس
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">فعال</span>
          </button>

          <button
            onClick={() => {
              onTabChange('tuition');
              setShowMobileMenu(false);
            }}
            className={`w-full text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
              activeTab === 'tuition' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              پرداخت شهریه و امور مالی
            </span>
          </button>

          <button
            onClick={() => {
              onTabChange('schedule');
              setShowMobileMenu(false);
            }}
            className={`w-full text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'schedule' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CalendarDays className="w-4 h-4 text-indigo-600" />
            برنامه هفتگی کلاسی
          </button>

          <button
            onClick={() => {
              onTabChange('exams');
              setShowMobileMenu(false);
            }}
            className={`w-full text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'exams' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-600" />
            برنامه امتحانات و کارت ورود
          </button>

          <button
            onClick={() => {
              onTabChange('transcript');
              setShowMobileMenu(false);
            }}
            className={`w-full text-right px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'transcript' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            کارنامه تحصیلی
          </button>

          <button
            onClick={() => {
              onTabChange('university-intro');
              setShowMobileMenu(false);
            }}
            className="w-full text-right px-3 py-2.5 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 flex items-center justify-between mt-2 pt-2 border-t border-slate-100"
          >
            <span>معرفی و پرتال عمومی دانشگاه</span>
            <Building2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
