export type ViewTab = 
  | 'dashboard'
  | 'registration'
  | 'tuition'
  | 'schedule'
  | 'exams'
  | 'transcript'
  | 'announcements'
  | 'requests'
  | 'university-intro';

export interface StudentProfile {
  id: string;
  studentCode: string;
  nationalCode: string;
  firstName: string;
  lastName: string;
  major: string;
  faculty: string;
  degree: 'کارشناسی پیوسته' | 'کارشناسی ناپیوسته' | 'کارشناسی ارشد';
  entranceYear: string;
  currentSemester: string;
  currentTermNumber: number;
  totalGpa: number;
  lastSemesterGpa: number;
  totalPassedUnits: number;
  maxSelectableUnits: number;
  minSelectableUnits: number;
  tuitionBalance: number; // Positive = owes money, negative = credit
  fixedTuition: number;
  variableTuitionPerUnit: number;
  avatarUrl: string;
  status: 'اشتغال به تحصیل' | 'فارغ‌التحصیل' | 'مرخصی تحصیلی';
  supervisor: string;
}

export interface ClassScheduleSlot {
  day: 'شنبه' | 'یکشنبه' | 'دوشنبه' | 'سه‌شنبه' | 'چهارشنبه' | 'پنج‌شنبه';
  dayIndex: number; // 0 for Saturday, 5 for Thursday
  startTime: string; // e.g. "08:00"
  endTime: string;   // e.g. "10:00"
  room: string;
  building: string;
}

export interface Course {
  id: string;
  code: string;
  group: string;
  name: string;
  units: number;
  type: 'تخصصی' | 'پایه' | 'عمومی' | 'عملی / آزمایشگاهی';
  professor: string;
  capacity: number;
  enrolledCount: number;
  prerequisites: string[]; // Course names or codes
  corequisites: string[];
  schedule: ClassScheduleSlot[];
  examDate: string; // e.g. "1404/03/24"
  examTime: string; // e.g. "09:00 - 11:00"
  examRoom: string;
  examSeatNumber?: string;
  tuitionFee: number;
  description?: string;
}

export interface EnrolledCourseItem {
  courseId: string;
  course: Course;
  enrolledAt: string;
  status: 'ثبت نهایی' | 'در انتظار تایید آموزش' | 'حذف شده';
}

export interface PaymentTransaction {
  id: string;
  trackingCode: string;
  referenceNumber: string;
  amount: number;
  date: string;
  time: string;
  description: string;
  gateway: 'به‌پرداخت ملت' | 'سداد ملی' | 'سامان کیش' | 'پارسیان';
  status: 'موفق' | 'ناموفق' | 'در حال پردازش';
  cardNumberMasked: string;
  receiptNumber: string;
}

export interface SemesterGrade {
  termName: string;
  termNumber: number;
  passedUnits: number;
  termGpa: number;
  courses: {
    code: string;
    name: string;
    units: number;
    grade: number;
    status: 'قبول' | 'مردود' | 'حذف اضطراری';
  }[];
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'آموزشی' | 'مالی و شهریه' | 'امتحانات' | 'عمومی و رفاهی';
  date: string;
  isImportant?: boolean;
  content: string;
  author: string;
}

export interface StudentRequest {
  id: string;
  trackingCode: string;
  title: string;
  type: 'گواهی اشتغال به تحصیل' | 'تطبیق واحد' | 'درخواست تقسیط شهریه' | 'اعتراض به نمره' | 'معرفی‌نامه کارآموزی';
  createdAt: string;
  status: 'در حال بررسی' | 'تایید شده' | 'رد شده';
  description: string;
  adminResponse?: string;
}
