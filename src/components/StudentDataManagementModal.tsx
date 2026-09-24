import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { StudentProfile } from '../types';
import { toPersianDigits, formatTomans, formatRials } from '../utils/formatters';
import { ASSETS } from '../assets';
import { 
  FileSpreadsheet, 
  Upload, 
  UserPlus, 
  CheckCircle2, 
  X, 
  Download, 
  Users, 
  FileText,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Database,
  GraduationCap,
  CreditCard,
  Building2,
  BookOpen
} from 'lucide-react';

interface StudentDataManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: StudentProfile;
  onUpdateStudentProfile: (profile: StudentProfile) => void;
}

const SEPAHAN_MAJORS = [
  'مهندسی کامپیوتر - نرم‌افزار',
  'مهندسی فناوری اطلاعات (IT)',
  'مهندسی معماری',
  'مهندسی عمران',
  'مهندسی برق و الکترونیک',
  'مدیریت بازرگانی (BBA / MBA)',
  'حسابداری و مدیریت مالی',
  'روانشناسی عمومی',
  'حقوق',
  'طراحی صنعتی و دکوراسیون داخلی',
  'مهندسی صنایع'
];

export const StudentDataManagementModal: React.FC<StudentDataManagementModalProps> = ({
  isOpen,
  onClose,
  currentStudent,
  onUpdateStudentProfile
}) => {
  const [activeMode, setActiveMode] = useState<'manual' | 'excel'>('manual');
  
  // Manual Form State
  const [formData, setFormData] = useState<Partial<StudentProfile>>({
    firstName: currentStudent.firstName,
    lastName: currentStudent.lastName,
    studentCode: currentStudent.studentCode,
    nationalCode: currentStudent.nationalCode,
    major: currentStudent.major,
    degree: currentStudent.degree,
    entranceYear: currentStudent.entranceYear,
    currentTermNumber: currentStudent.currentTermNumber,
    totalGpa: currentStudent.totalGpa,
    lastSemesterGpa: currentStudent.lastSemesterGpa,
    totalPassedUnits: currentStudent.totalPassedUnits,
    tuitionBalance: currentStudent.tuitionBalance,
    supervisor: currentStudent.supervisor,
    faculty: currentStudent.faculty,
    status: currentStudent.status
  });

  // Debt in Tomans for intuitive input
  const [debtTomansInput, setDebtTomansInput] = useState<string>(
    String(Math.round(currentStudent.tuitionBalance / 10))
  );

  // Excel parsed records
  const [parsedStudents, setParsedStudents] = useState<StudentProfile[]>([]);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle manual profile save
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.studentCode) {
      setErrorMessage('لطفاً نام، نام خانوادگی و شماره دانشجویی را کامل وارد فرمایید.');
      return;
    }

    const tomans = parseInt(debtTomansInput.replace(/\D/g, '') || '0', 10);
    const balanceInRials = tomans * 10;
    const gpa = Number(formData.totalGpa) || 17.5;
    
    // Auto-calculate max units based on Iranian Ministry of Science regulations (GPA >= 17 gets 24 units, GPA < 12 gets 14 units conditional)
    let maxUnits = 20;
    if (gpa >= 17) maxUnits = 24;
    else if (gpa < 12) maxUnits = 14;

    const updated: StudentProfile = {
      ...currentStudent,
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      studentCode: formData.studentCode || '',
      nationalCode: formData.nationalCode || '',
      major: formData.major || 'مهندسی کامپیوتر - نرم‌افزار',
      degree: (formData.degree as any) || 'کارشناسی پیوسته',
      entranceYear: formData.entranceYear || '۱۴۰۱',
      currentTermNumber: Number(formData.currentTermNumber) || 5,
      totalGpa: gpa,
      lastSemesterGpa: Number(formData.lastSemesterGpa) || gpa,
      totalPassedUnits: Number(formData.totalPassedUnits) || (Number(formData.currentTermNumber || 5) - 1) * 18,
      maxSelectableUnits: maxUnits,
      minSelectableUnits: 12,
      tuitionBalance: balanceInRials,
      fixedTuition: 18000000,
      variableTuitionPerUnit: 1200000,
      supervisor: formData.supervisor || 'دکتر احسان صادقی',
      faculty: formData.major?.includes('معماری') ? 'دانشکده هنر و معماری' : formData.major?.includes('مدیریت') || formData.major?.includes('حسابداری') ? 'دانشکده علوم انسانی و مدیریت' : 'دانشکده مهندسی و علوم فنی',
      status: (formData.status as any) || 'اشتغال به تحصیل'
    };

    onUpdateStudentProfile(updated);
    setUploadSuccessMessage(`مشخصات «${updated.firstName} ${updated.lastName}» (رشته ${updated.major}، ترم ${toPersianDigits(updated.currentTermNumber)}) با موفقیت اعمال شد!`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  // Quick preset buttons for tuition
  const setQuickDebt = (amountTomans: number) => {
    setDebtTomansInput(amountTomans.toString());
  };

  // Handle Excel file upload and parsing
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setUploadSuccessMessage(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData = XLSX.utils.sheet_to_json<any>(ws);

        if (rawData.length === 0) {
          setErrorMessage('فایل اکسل انتخاب‌شده خالی است.');
          return;
        }

        // Map excel columns to StudentProfile
        const importedList: StudentProfile[] = rawData.map((row: any, index: number) => {
          const gpa = Number(row['معدل'] || row['gpa'] || 17.5);
          const term = Number(row['ترم'] || row['term'] || 5);
          const rawDebt = row['بدهی شهریه (تومان)'] ? Number(row['بدهی شهریه (تومان)']) * 10 : (Number(row['بدهی شهریه (ریال)'] || row['tuitionBalance']) || 25000000);
          
          return {
            id: `std_imported_${index}_${Date.now()}`,
            firstName: row['نام'] || row['firstName'] || `دانشجو ${index + 1}`,
            lastName: row['نام خانوادگی'] || row['lastName'] || 'سپاهانی',
            studentCode: String(row['شماره دانشجویی'] || row['studentCode'] || (4011000 + index)),
            nationalCode: String(row['کد ملی'] || row['nationalCode'] || '1270000000'),
            major: row['رشته'] || row['major'] || 'مهندسی کامپیوتر',
            faculty: row['دانشکده'] || 'دانشکده مهندسی و علوم فنی',
            degree: row['مقطع'] || 'کارشناسی پیوسته',
            entranceYear: String(row['سال ورود'] || '۱۴۰۱'),
            currentSemester: 'نیمسال اول ۱۴۰۴ - ۱۴۰۵',
            currentTermNumber: term,
            totalGpa: gpa,
            lastSemesterGpa: Number(row['معدل ترم قبل']) || gpa,
            totalPassedUnits: Number(row['واحدهای گذرانده']) || (term - 1) * 18,
            maxSelectableUnits: gpa >= 17 ? 24 : gpa < 12 ? 14 : 20,
            minSelectableUnits: 12,
            tuitionBalance: rawDebt,
            fixedTuition: 18000000,
            variableTuitionPerUnit: 1200000,
            avatarUrl: ASSETS.studentAvatar,
            status: 'اشتغال به تحصیل',
            supervisor: row['استاد راهنما'] || 'دکتر مهران کاظمی'
          };
        });

        setParsedStudents(importedList);
        setUploadSuccessMessage(`تعداد ${toPersianDigits(importedList.length)} پرونده دانشجویی از فایل اکسل دانشگاه بازخوانی شد!`);
      } catch (err: any) {
        setErrorMessage('خطا در خواندن فایل اکسل. لطفاً از فرمت معتبر xlsx یا csv استفاده فرمایید.');
      }
    };

    reader.readAsBinaryString(file);
  };

  // Download complete sample Excel template
  const handleDownloadTemplate = () => {
    const sampleData = [
      {
        'شماره دانشجویی': '9912040112',
        'کد ملی': '1270984512',
        'نام': 'امیرحسین',
        'نام خانوادگی': 'رضایی',
        'رشته': 'مهندسی کامپیوتر - نرم‌افزار',
        'مقطع': 'کارشناسی پیوسته',
        'سال ورود': '۱۴۰۱',
        'ترم': 5,
        'معدل': 17.84,
        'بدهی شهریه (تومان)': 3250000,
        'واحدهای گذرانده': 76,
        'استاد راهنما': 'دکتر احسان صادقی'
      },
      {
        'شماره دانشجویی': '9912040113',
        'کد ملی': '1280145621',
        'نام': 'سارا',
        'نام خانوادگی': 'کاظمی',
        'رشته': 'مهندسی معماری',
        'مقطع': 'کارشناسی پیوسته',
        'سال ورود': '۱۴۰۲',
        'ترم': 3,
        'معدل': 18.40,
        'بدهی شهریه (تومان)': 1800000,
        'واحدهای گذرانده': 42,
        'استاد راهنما': 'دکتر بهمن حیدری'
      },
      {
        'شماره دانشجویی': '9912040114',
        'کد ملی': '1290876543',
        'نام': 'محمد',
        'نام خانوادگی': 'طاهری',
        'رشته': 'مدیریت بازرگانی',
        'مقطع': 'کارشناسی ارشد',
        'سال ورود': '۱۴۰۳',
        'ترم': 1,
        'معدل': 16.50,
        'بدهی شهریه (تومان)': 4500000,
        'واحدهای گذرانده': 0,
        'استاد راهنما': 'دکتر نسترن شجاعی'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'دانشجویان سپاهان');
    XLSX.writeFile(wb, 'sepahan_students_full_database.xlsx');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Database className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                تنظیم اطلاعات دانشجو (رشته، ترم، بدهی، مقطع، معدل)
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                موسسه آموزش عالی غیرانتفاعی سپاهان · مدیریت مشخصات و همگام‌سازی
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2 shrink-0">
          <button
            onClick={() => setActiveMode('manual')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'manual'
                ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UserPlus className="w-4 h-4 text-blue-600" />
            <span>ثبت مشخصات من (فرم اختصاصی)</span>
          </button>

          <button
            onClick={() => setActiveMode('excel')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'excel'
                ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>ورود گروهی از اکسل دانشگاه (شامل ترم، بدهی، رشته)</span>
          </button>
        </div>

        {/* Success/Error Alerts */}
        <div className="px-5 pt-3 space-y-2 shrink-0">
          {uploadSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadSuccessMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeMode === 'manual' ? (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              
              {/* Section 1: Identity */}
              <div>
                <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
                  <GraduationCap className="w-4 h-4 text-blue-700" />
                  مشخصات فردی و هویتی
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">نام:</label>
                    <input
                      type="text"
                      value={formData.firstName || ''}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="مثال: امیرحسین"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">نام خانوادگی:</label>
                    <input
                      type="text"
                      value={formData.lastName || ''}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="مثال: رضایی"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">شماره دانشجویی:</label>
                    <input
                      type="text"
                      value={formData.studentCode || ''}
                      onChange={(e) => setFormData({ ...formData, studentCode: e.target.value })}
                      placeholder="مثال: 9912040112"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-hidden text-left"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">کد ملی:</label>
                    <input
                      type="text"
                      value={formData.nationalCode || ''}
                      onChange={(e) => setFormData({ ...formData, nationalCode: e.target.value })}
                      placeholder="مثال: 1270984512"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-hidden text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Major, Term, Degree */}
              <div className="pt-2">
                <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
                  <Building2 className="w-4 h-4 text-indigo-700" />
                  رشته، ترم و وضعیت تحصیلی
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Major */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">رشته تحصیلی:</label>
                    <select
                      value={formData.major || 'مهندسی کامپیوتر - نرم‌افزار'}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden font-medium"
                    >
                      {SEPAHAN_MAJORS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  {/* Degree */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">مقطع تحصیلی:</label>
                    <select
                      value={formData.degree || 'کارشناسی پیوسته'}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden font-medium"
                    >
                      <option value="کاردانی">کاردانی</option>
                      <option value="کارشناسی پیوسته">کارشناسی پیوسته</option>
                      <option value="کارشناسی ناپیوسته">کارشناسی ناپیوسته</option>
                      <option value="کارشناسی ارشد">کارشناسی ارشد</option>
                    </select>
                  </div>

                  {/* Current Term Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ترم تحصیلی فعلی:</label>
                    <select
                      value={formData.currentTermNumber || 5}
                      onChange={(e) => setFormData({ ...formData, currentTermNumber: parseInt(e.target.value, 10) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden font-bold text-blue-900"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
                        <option key={t} value={t}>ترم {toPersianDigits(t)} {t === 1 ? '(ورودی جدید)' : ''}</option>
                      ))}
                    </select>
                  </div>

                  {/* Entrance Year */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">سال ورود به دانشگاه:</label>
                    <select
                      value={formData.entranceYear || '۱۴۰۱'}
                      onChange={(e) => setFormData({ ...formData, entranceYear: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden font-medium"
                    >
                      <option value="۱۴۰۴">۱۴۰۴</option>
                      <option value="۱۴۰۳">۱۴۰۳</option>
                      <option value="۱۴۰۲">۱۴۰۲</option>
                      <option value="۱۴۰۱">۱۴۰۱</option>
                      <option value="۱۴۰۰">۱۴۰۰</option>
                      <option value="۱۳۹۹">۱۳۹۹</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">وضعیت تحصیلی:</label>
                    <select
                      value={formData.status || 'اشتغال به تحصیل'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden font-medium"
                    >
                      <option value="اشتغال به تحصیل">اشتغال به تحصیل</option>
                      <option value="مرخصی تحصیلی">مرخصی تحصیلی</option>
                      <option value="فارغ‌التحصیل">فارغ‌التحصیل</option>
                    </select>
                  </div>

                  {/* GPA */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">معدل کل دانشجو:</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="20"
                      value={formData.totalGpa || 17.84}
                      onChange={(e) => setFormData({ ...formData, totalGpa: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-hidden font-bold"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      {Number(formData.totalGpa || 0) >= 17 ? 'مجاز به اخذ ۲۴ واحد (ممتاز الف)' : Number(formData.totalGpa || 0) < 12 ? 'حداکثر ۱۴ واحد (مشروط)' : 'مجاز به اخذ ۲۰ واحد'}
                    </span>
                  </div>

                  {/* Passed Units */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">تعداد واحدهای گذرانده:</label>
                    <input
                      type="number"
                      min="0"
                      max="150"
                      value={formData.totalPassedUnits || 76}
                      onChange={(e) => setFormData({ ...formData, totalPassedUnits: parseInt(e.target.value, 10) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                  </div>

                  {/* Supervisor */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">استاد راهنما:</label>
                    <input
                      type="text"
                      value={formData.supervisor || 'دکتر احسان صادقی'}
                      onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
                    />
                  </div>

                </div>
              </div>

              {/* Section 3: Financial & Tuition Debt */}
              <div className="pt-2">
                <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5 mb-2 pb-1 border-b border-slate-100">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  وضعیت بدهی شهریه دانشجو
                </h4>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">مانده بدهی شهریه (به تومان):</label>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setQuickDebt(0)}
                        className="text-[10px] bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2 py-0.5 rounded cursor-pointer font-medium"
                      >
                        تسویه (۰ تومان)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDebt(1800000)}
                        className="text-[10px] bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-0.5 rounded cursor-pointer font-medium"
                      >
                        فقط شهریه ثابت (۱.۸ م)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDebt(3250000)}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer font-medium"
                      >
                        ۳,۲۵۰,۰۰۰ تومان
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={debtTomansInput}
                      onChange={(e) => setDebtTomansInput(e.target.value)}
                      placeholder="مبلغ به تومان مثلاً 3250000"
                      className="w-full pl-16 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-red-600 focus:ring-2 focus:ring-emerald-500 outline-hidden text-left"
                      dir="ltr"
                    />
                    <span className="absolute left-3 top-2 text-xs text-slate-400">تومان</span>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-200 flex gap-2.5">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  ذخیره و همگام‌سازی اطلاعات در سراسر سایت
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  بستن
                </button>
              </div>
            </form>
          ) : (
            /* Excel Mode */
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-blue-700" />
                    <h4 className="font-bold text-xs sm:text-sm text-blue-950">
                      قالب کامل اکسل دانشجویان دانشگاه سپاهان (شامل ترم، رشته، بدهی)
                    </h4>
                  </div>
                  <button
                    onClick={handleDownloadTemplate}
                    className="px-3 py-1.5 bg-white hover:bg-blue-100 text-blue-800 border border-blue-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دانلود فایل اکسل چندستونه</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  فایل نمونه شامل ستون‌های: <strong>شماره دانشجویی، کد ملی، نام، نام خانوادگی، رشته، ترم، بدهی شهریه (تومان)، مقطع، معدل و استاد راهنما</strong> می‌باشد.
                </p>
              </div>

              {/* Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-slate-800">
                  انتخاب فایل اکسل دیتابیس دانشجویان
                </h5>
                <p className="text-[11px] text-slate-500">
                  فرمت‌های مجاز: .xlsx یا .csv
                </p>
              </div>

              {/* Parsed Students List */}
              {parsedStudents.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-bold text-xs text-slate-900 flex items-center justify-between">
                    <span>دانشجویان استخراج شده ({toPersianDigits(parsedStudents.length)} نفر):</span>
                    <span className="text-[11px] text-slate-400">روی هر دانشجو کلیک کنید تا سایت با اطلاعات او لود شود</span>
                  </h5>
                  <div className="max-h-52 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl">
                    {parsedStudents.map((std) => (
                      <div
                        key={std.id}
                        onClick={() => {
                          onUpdateStudentProfile(std);
                          setUploadSuccessMessage(`سایت با مشخصات «${std.firstName} ${std.lastName}» (ترم ${toPersianDigits(std.currentTermNumber)} ${std.major} - بدهی: ${formatTomans(std.tuitionBalance)}) فعال شد.`);
                        }}
                        className="p-3 hover:bg-blue-50 flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{std.firstName} {std.lastName}</span>
                            <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono">
                              ترم {toPersianDigits(std.currentTermNumber)}
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                              {std.major}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-mono tabular-nums">
                            شماره دانشجویی: {toPersianDigits(std.studentCode)} · بدهی شهریه: <strong className="text-red-600">{formatTomans(std.tuitionBalance)}</strong>
                          </p>
                        </div>
                        <button className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold shrink-0">
                          انتخاب این دانشجو
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
