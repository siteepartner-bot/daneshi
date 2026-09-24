import { StudentProfile, Course, PaymentTransaction, SemesterGrade, AnnouncementItem, StudentRequest } from '../types';
import { ASSETS } from '../assets';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'std_40112345',
  studentCode: '9912040112',
  nationalCode: '1270984512',
  firstName: 'امیرحسین',
  lastName: 'رضایی سپاهانی',
  major: 'مهندسی کامپیوتر - نرم‌افزار',
  faculty: 'دانشکده مهندسی و علوم فنی',
  degree: 'کارشناسی پیوسته',
  entranceYear: '۱۴۰۱',
  currentSemester: 'نیمسال اول ۱۴۰۴ - ۱۴۰۵',
  currentTermNumber: 5,
  totalGpa: 17.84,
  lastSemesterGpa: 18.25,
  totalPassedUnits: 76,
  maxSelectableUnits: 20, // GPA > 17 gets 24, but standard 20
  minSelectableUnits: 12,
  tuitionBalance: 32500000, // 3,250,000 Tomans (32,500,000 Rials)
  fixedTuition: 18000000,   // 1,800,000 Tomans
  variableTuitionPerUnit: 1200000, // 120,000 Tomans per unit
  avatarUrl: ASSETS.studentAvatar,
  status: 'اشتغال به تحصیل',
  supervisor: 'دکتر مهران کاظمی (عضو هیئت علمی گروه کامپیوتر)'
};

export const AVAILABLE_COURSES: Course[] = [
  {
    id: 'crs_01',
    code: '14-110-301',
    group: '01',
    name: 'طراحی الگوریتم‌ها',
    units: 3,
    type: 'تخصصی',
    professor: 'دکتر احسان صادقی',
    capacity: 35,
    enrolledCount: 28,
    prerequisites: ['ساختمان داده‌ها'],
    corequisites: [],
    schedule: [
      {
        day: 'شنبه',
        dayIndex: 0,
        startTime: '08:00',
        endTime: '10:00',
        room: 'کلاس ۲۰۱ (طبقه دوم)',
        building: 'ساختمان خوارزمی'
      },
      {
        day: 'دوشنبه',
        dayIndex: 2,
        startTime: '08:00',
        endTime: '10:00',
        room: 'کلاس ۲۰۱ (طبقه دوم)',
        building: 'ساختمان خوارزمی'
      }
    ],
    examDate: '1404/03/20',
    examTime: '08:30 - 10:30',
    examRoom: 'سالن شماره ۱ امتحانات (سالن ابن‌سینا)',
    examSeatNumber: 'A-42',
    tuitionFee: 3600000,
    description: 'مباحث پیشرفته طراحی الگوریتم، روش‌های حریصانه، برنامه‌نویسی پویا و تحلیل پیچیدگی محاسباتی.'
  },
  {
    id: 'crs_02',
    code: '14-110-304',
    group: '01',
    name: 'سیستم‌های عامل',
    units: 3,
    type: 'تخصصی',
    professor: 'دکتر مریم نوری',
    capacity: 40,
    enrolledCount: 38,
    prerequisites: ['معماری کامپیوتر'],
    corequisites: [],
    schedule: [
      {
        day: 'یکشنبه',
        dayIndex: 1,
        startTime: '10:00',
        endTime: '12:00',
        room: 'کلاس ۲۰۴',
        building: 'ساختمان خوارزمی'
      },
      {
        day: 'سه‌شنبه',
        dayIndex: 3,
        startTime: '10:00',
        endTime: '12:00',
        room: 'کلاس ۲۰۴',
        building: 'ساختمان خوارزمی'
      }
    ],
    examDate: '1404/03/24',
    examTime: '11:00 - 13:00',
    examRoom: 'سالن شماره ۲ امتحانات',
    examSeatNumber: 'B-18',
    tuitionFee: 3600000,
    description: 'مدیریت حافظه، زمان‌بندی پردازنده‌ها، بن‌بست‌ها و همزمانی سیستم‌های عامل مدرن.'
  },
  {
    id: 'crs_03',
    code: '14-110-308',
    group: '01',
    name: 'پایگاه داده‌ها',
    units: 3,
    type: 'تخصصی',
    professor: 'مهندس فرشید نیک‌نام',
    capacity: 35,
    enrolledCount: 31,
    prerequisites: ['ساختمان داده‌ها'],
    corequisites: [],
    schedule: [
      {
        day: 'شنبه',
        dayIndex: 0,
        startTime: '13:30',
        endTime: '15:30',
        room: 'سایت تخصصی کامپیوتر ۲',
        building: 'ساختمان ابوریحان'
      },
      {
        day: 'چهارشنبه',
        dayIndex: 4,
        startTime: '10:00',
        endTime: '12:00',
        room: 'کلاس ۱۰۸',
        building: 'ساختمان خوارزمی'
      }
    ],
    examDate: '1404/03/28',
    examTime: '08:30 - 10:30',
    examRoom: 'سالن شماره ۱ امتحانات (سالن ابن‌سینا)',
    examSeatNumber: 'A-89',
    tuitionFee: 3600000,
    description: 'مدل رابطه‌ای، زبان SQL پیشرفته، بهینه‌سازی پرس‌وجو، نرمال‌سازی و تراکنش‌های پایگاه داده.'
  },
  {
    id: 'crs_04',
    code: '14-110-312',
    group: '02',
    name: 'مهندسی نرم‌افزار ۱',
    units: 3,
    type: 'تخصصی',
    professor: 'دکتر بهمن حیدری',
    capacity: 30,
    enrolledCount: 22,
    prerequisites: ['برنامه‌نویسی پیشرفته'],
    corequisites: [],
    schedule: [
      {
        day: 'دوشنبه',
        dayIndex: 2,
        startTime: '13:30',
        endTime: '16:30',
        room: 'کلاس ۲۰۵',
        building: 'ساختمان خوارزمی'
      }
    ],
    examDate: '1404/04/02',
    examTime: '14:00 - 16:00',
    examRoom: 'سالن اصلی غدیر',
    examSeatNumber: 'C-05',
    tuitionFee: 3600000,
    description: 'متدولوژی‌های چابک (Agile/Scrum)، الگوهای طراحی شی‌گرا، معماری نرم‌افزار و آزمون نرم‌افزار.'
  },
  {
    id: 'crs_05',
    code: '14-110-320',
    group: '01',
    name: 'آزمایشگاه سیستم‌های عامل',
    units: 1,
    type: 'عملی / آزمایشگاهی',
    professor: 'مهندس سارا باقری',
    capacity: 20,
    enrolledCount: 16,
    prerequisites: [],
    corequisites: ['سیستم‌های عامل'],
    schedule: [
      {
        day: 'سه‌شنبه',
        dayIndex: 3,
        startTime: '13:30',
        endTime: '15:30',
        room: 'آزمایشگاه تخصصی لینوکس',
        building: 'ساختمان ابوریحان'
      }
    ],
    examDate: '1404/03/18',
    examTime: '10:00 - 12:00',
    examRoom: 'آزمایشگاه تخصصی لینوکس',
    examSeatNumber: 'L-12',
    tuitionFee: 1800000,
    description: 'کار عملی با شل لینوکس، اسکریپت‌نویسی Bash، سوکت پروگرمینگ و مدیریت پروسس‌ها.'
  },
  {
    id: 'crs_06',
    code: '12-001-105',
    group: '03',
    name: 'اندیشه اسلامی ۲',
    units: 2,
    type: 'عمومی',
    professor: 'حجت‌الاسلام دکتر موسوی',
    capacity: 50,
    enrolledCount: 44,
    prerequisites: ['اندیشه اسلامی ۱'],
    corequisites: [],
    schedule: [
      {
        day: 'چهارشنبه',
        dayIndex: 4,
        startTime: '13:30',
        endTime: '15:30',
        room: 'سالن آمفی تئاتر مطهری',
        building: 'ساختمان مرکزی'
      }
    ],
    examDate: '1404/04/05',
    examTime: '08:30 - 10:00',
    examRoom: 'سالن شماره ۲ امتحانات',
    examSeatNumber: 'B-77',
    tuitionFee: 2400000,
    description: 'مباحث نبوت، امامت، معادشناسی و فلسفه دین در جهان معاصر.'
  },
  {
    id: 'crs_07',
    code: '14-110-330',
    group: '01',
    name: 'شبکه‌های کامپیوتری',
    units: 3,
    type: 'تخصصی',
    professor: 'دکتر علیرضا کاظمی',
    capacity: 35,
    enrolledCount: 25,
    prerequisites: ['سیستم‌های عامل'],
    corequisites: [],
    schedule: [
      {
        day: 'یکشنبه',
        dayIndex: 1,
        startTime: '15:30',
        endTime: '17:30',
        room: 'کلاس ۲۰۱',
        building: 'ساختمان خوارزمی'
      },
      {
        day: 'سه‌شنبه',
        dayIndex: 3,
        startTime: '15:30',
        endTime: '17:30',
        room: 'کلاس ۲۰۱',
        building: 'ساختمان خوارزمی'
      }
    ],
    examDate: '1404/04/09',
    examTime: '11:00 - 13:00',
    examRoom: 'سالن اصلی غدیر',
    examSeatNumber: 'C-34',
    tuitionFee: 3600000,
    description: 'پروتکل‌های اینترنت TCP/IP، مسیریابی، لایه‌های مدل OSI و امنیت انتقال داده.'
  },
  {
    id: 'crs_08',
    code: '11-100-202',
    group: '01',
    name: 'ریاضی مهندسی',
    units: 3,
    type: 'پایه',
    professor: 'دکتر محمد صفا',
    capacity: 40,
    enrolledCount: 33,
    prerequisites: ['معادلات دیفرانسیل', 'ریاضی عمومی ۲'],
    corequisites: [],
    schedule: [
      {
        day: 'شنبه',
        dayIndex: 0,
        startTime: '10:00',
        endTime: '12:00',
        room: 'کلاس ۱۰۲',
        building: 'ساختمان علوم پایه'
      },
      {
        day: 'دوشنبه',
        dayIndex: 2,
        startTime: '10:00',
        endTime: '12:00',
        room: 'کلاس ۱۰۲',
        building: 'ساختمان علوم پایه'
      }
    ],
    examDate: '1404/04/12',
    examTime: '08:30 - 11:00',
    examRoom: 'سالن شماره ۱ امتحانات (سالن ابن‌سینا)',
    examSeatNumber: 'A-15',
    tuitionFee: 3600000,
    description: 'سری فوریه، تبدیل فوریه، توابع مختلط و معادلات با مشتقات جزئی (PDE).'
  },
  {
    id: 'crs_09',
    code: '14-110-340',
    group: '01',
    name: 'هوش مصنوعی و سیستم‌های خبره',
    units: 3,
    type: 'تخصصی',
    professor: 'دکتر نسترن شجاعی',
    capacity: 30,
    enrolledCount: 29,
    prerequisites: ['طراحی الگوریتم‌ها'],
    corequisites: [],
    schedule: [
      {
        day: 'یکشنبه',
        dayIndex: 1,
        startTime: '08:00',
        endTime: '10:00',
        room: 'کلاس ۲۰۳',
        building: 'ساختمان خوارزمی'
      },
      {
        day: 'سه‌شنبه',
        dayIndex: 3,
        startTime: '08:00',
        endTime: '10:00',
        room: 'کلاس ۲۰۳',
        building: 'ساختمان خوارزمی'
      }
    ],
    examDate: '1404/04/15',
    examTime: '14:00 - 16:30',
    examRoom: 'سالن شماره ۲ امتحانات',
    examSeatNumber: 'B-50',
    tuitionFee: 3600000,
    description: 'جستجوی اکتشافی (A*, Minimax)، منطق مرتبه اول، یادگیری ماشین مقدماتی و پردازش زبان طبیعی.'
  },
  {
    id: 'crs_10',
    code: '12-001-101',
    group: '04',
    name: 'زبان فارسی عمومی',
    units: 2,
    type: 'عمومی',
    professor: 'دکتر علی اکبر دهقانی',
    capacity: 45,
    enrolledCount: 40,
    prerequisites: [],
    corequisites: [],
    schedule: [
      {
        day: 'چهارشنبه',
        dayIndex: 4,
        startTime: '08:00',
        endTime: '10:00',
        room: 'کلاس ۱۰۵',
        building: 'ساختمان مرکزی'
      }
    ],
    examDate: '1404/04/18',
    examTime: '08:30 - 10:00',
    examRoom: 'سالن اصلی غدیر',
    examSeatNumber: 'C-91',
    tuitionFee: 2400000,
    description: 'شعر و نثر کهن و معاصر فارسی، آیین نگارش و درست‌نویسی مقالات علمی.'
  }
];

export const INITIAL_ENROLLED_COURSES: Course[] = [
  AVAILABLE_COURSES[0], // طراحی الگوریتم‌ها (3)
  AVAILABLE_COURSES[1], // سیستم‌های عامل (3)
  AVAILABLE_COURSES[2], // پایگاه داده‌ها (3)
  AVAILABLE_COURSES[3], // مهندسی نرم‌افزار ۱ (3)
  AVAILABLE_COURSES[4], // آزمایشگاه سیستم‌های عامل (1)
  AVAILABLE_COURSES[5], // اندیشه اسلامی ۲ (2)
]; // Total: 15 units

export const INITIAL_PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'pay_01',
    trackingCode: 'SEP-7821940',
    referenceNumber: '89102459114',
    amount: 18000000,
    date: '1403/11/15',
    time: '14:23:10',
    description: 'پرداخت شهریه ثابت نیمسال اول ۱۴۰۴ - ۱۴۰۵',
    gateway: 'به‌پرداخت ملت',
    status: 'موفق',
    cardNumberMasked: '۶۰۳۷-۹۹**-****-۴۴۱۸',
    receiptNumber: 'REC-1403-9082'
  },
  {
    id: 'pay_02',
    trackingCode: 'SEP-6591023',
    referenceNumber: '44501298412',
    amount: 15000000,
    date: '1403/07/10',
    time: '09:45:32',
    description: 'قسط اول شهریه متغیر نیمسال گذشته',
    gateway: 'سداد ملی',
    status: 'موفق',
    cardNumberMasked: '۶۰۳۷-۹۹**-****-۴۴۱۸',
    receiptNumber: 'REC-1403-3419'
  },
  {
    id: 'pay_03',
    trackingCode: 'SEP-4109824',
    referenceNumber: '11294801934',
    amount: 12000000,
    date: '1403/04/22',
    time: '18:11:05',
    description: 'تسویه حساب ترم تابستان ۱۴۰۳',
    gateway: 'سامان کیش',
    status: 'موفق',
    cardNumberMasked: '۵۸۹۲-۱۰**-****-۱۲۰۹',
    receiptNumber: 'REC-1403-1102'
  }
];

export const TRANSCRIPT_HISTORY: SemesterGrade[] = [
  {
    termName: 'نیمسال اول ۱۴۰۱ - ۱۴۰۲',
    termNumber: 1,
    passedUnits: 18,
    termGpa: 17.50,
    courses: [
      { code: '11-100-101', name: 'ریاضی عمومی ۱', units: 3, grade: 18.5, status: 'قبول' },
      { code: '11-100-103', name: 'فیزیک ۱ (مکانیک)', units: 3, grade: 16.0, status: 'قبول' },
      { code: '14-110-101', name: 'مبانی کامپیوتر و برنامه‌نویسی', units: 3, grade: 19.5, status: 'قبول' },
      { code: '14-110-102', name: 'کارگاه کامپیوتر', units: 1, grade: 20.0, status: 'قبول' },
      { code: '12-001-100', name: 'زبان عمومی', units: 3, grade: 17.0, status: 'قبول' },
      { code: '12-001-103', name: 'تربیت بدنی ۱', units: 1, grade: 18.0, status: 'قبول' },
      { code: '12-001-104', name: 'اندیشه اسلامی ۱', units: 2, grade: 16.5, status: 'قبول' },
      { code: '12-001-106', name: 'اخلاق اسلامی', units: 2, grade: 17.0, status: 'قبول' },
    ]
  },
  {
    termName: 'نیمسال دوم ۱۴۰۱ - ۱۴۰۲',
    termNumber: 2,
    passedUnits: 19,
    termGpa: 17.90,
    courses: [
      { code: '11-100-102', name: 'ریاضی عمومی ۲', units: 3, grade: 17.0, status: 'قبول' },
      { code: '11-100-104', name: 'فیزیک ۲ (الکتریسیته و مغناطیس)', units: 3, grade: 16.5, status: 'قبول' },
      { code: '14-110-201', name: 'برنامه‌نویسی پیشرفته (Java)', units: 3, grade: 19.0, status: 'قبول' },
      { code: '14-110-203', name: 'ساختمان‌های گسسته', units: 3, grade: 18.5, status: 'قبول' },
      { code: '14-110-205', name: 'مدارهای منطقی', units: 3, grade: 17.5, status: 'قبول' },
      { code: '14-110-206', name: 'آزمایشگاه مدارهای منطقی', units: 1, grade: 19.0, status: 'قبول' },
      { code: '12-001-107', name: 'تاریخ تحلیلی صدر اسلام', units: 2, grade: 18.0, status: 'قبول' },
      { code: '12-001-108', name: 'ورزش ۱', units: 1, grade: 19.5, status: 'قبول' },
    ]
  },
  {
    termName: 'نیمسال اول ۱۴۰۲ - ۱۴۰۳',
    termNumber: 3,
    passedUnits: 19,
    termGpa: 18.10,
    courses: [
      { code: '14-110-202', name: 'ساختمان داده‌ها', units: 3, grade: 19.0, status: 'قبول' },
      { code: '14-110-204', name: 'معماری کامپیوتر', units: 3, grade: 17.5, status: 'قبول' },
      { code: '14-110-207', name: 'مدارهای الکتریکی', units: 3, grade: 16.5, status: 'قبول' },
      { code: '11-100-201', name: 'معادلات دیفرانسیل', units: 3, grade: 18.0, status: 'قبول' },
      { code: '11-100-203', name: 'آمار و احتمالات مهندسی', units: 3, grade: 19.5, status: 'قبول' },
      { code: '12-001-109', name: 'تفسیر موضوعی قرآن', units: 2, grade: 18.5, status: 'قبول' },
      { code: '14-110-208', name: 'آزمایشگاه معماری کامپیوتر', units: 1, grade: 18.0, status: 'قبول' },
      { code: '12-001-110', name: 'دانش خانواده و جمعیت', units: 1, grade: 17.5, status: 'قبول' },
    ]
  },
  {
    termName: 'نیمسال دوم ۱۴۰۲ - ۱۴۰۳',
    termNumber: 4,
    passedUnits: 20,
    termGpa: 18.25,
    courses: [
      { code: '14-110-210', name: 'زبان‌های ماشین و برنامه‌سازی سیستم', units: 3, grade: 18.0, status: 'قبول' },
      { code: '14-110-212', name: 'سیگنال‌ها و سیستم‌ها', units: 3, grade: 17.5, status: 'قبول' },
      { code: '14-110-215', name: 'نظریه زبان‌ها و اتوماتا', units: 3, grade: 19.0, status: 'قبول' },
      { code: '14-110-216', name: 'اصول طراحی کامپایلر', units: 3, grade: 18.5, status: 'قبول' },
      { code: '14-110-218', name: 'روش‌های محاسبات عددی', units: 2, grade: 18.0, status: 'قبول' },
      { code: '14-110-219', name: 'آزمایشگاه شبکه‌های محلی', units: 1, grade: 20.0, status: 'قبول' },
      { code: '12-001-111', name: 'انقلاب اسلامی ایران', units: 2, grade: 17.5, status: 'قبول' },
      { code: '14-110-220', name: 'زبان تخصصی کامپیوتر', units: 3, grade: 19.0, status: 'قبول' },
    ]
  }
];

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'anc_01',
    title: 'دستورالعمل و زمان‌بندی انتخاب واحد نیمسال اول سال تحصیلی ۱۴۰۴ - ۱۴۰۵',
    category: 'آموزشی',
    date: '۱۴۰۳/۱۱/۲۰',
    isImportant: true,
    content: 'به اطلاع کلیه دانشجویان گرامی موسسه آموزش عالی غیرانتفاعی سپاهان می‌رساند فرآیند انتخاب واحد از تاریخ ۲۵ بهمن‌ماه طبق جدول زمان‌بندی ورودی‌ها در پرتال آموزشی آغاز خواهد شد. دانشجویانی که بدهی شهریه دارند لازم است پیش از موعد اقدام به تسویه نمایند.',
    author: 'معاونت آموزشی و تحصیلات تکمیلی موسسه سپاهان'
  },
  {
    id: 'anc_02',
    title: 'اطلاعیه تقسیط شهریه و اعطای وام دانشجویی صندوق رفاه وزارت علوم',
    category: 'مالی و شهریه',
    date: '۱۴۰۳/۱۱/۱۸',
    isImportant: false,
    content: 'دانشجویان متقاضی پرداخت اقساطی شهریه یا دریافت وام شهریه صندوق رفاه، می‌توانند از طریق بخش امور مالی پرتال درخواست خود را ثبت و مدارک را بارگذاری نمایند.',
    author: 'مدیریت امور مالی و صندوق رفاه دانشجویی'
  },
  {
    id: 'anc_03',
    title: 'ضوابط شرکت در آزمون‌های پایان‌ترم و دریافت کارت ورود به جلسه',
    category: 'امتحانات',
    date: '۱۴۰۳/۱۱/۱۰',
    isImportant: true,
    content: 'به همراه داشتن پرینت کارت ورود به جلسه (عکس‌دار) و کارت دانشجویی در کلیه جلسات آزمون الزامی است. ورود تلفن همراه و وسایل الکترونیکی به سالن‌های امتحانات اکیداً ممنوع می‌باشد.',
    author: 'ستاد برگزاری آزمون‌های موسسه سپاهان'
  },
  {
    id: 'anc_04',
    title: 'برگزاری کارگاه تخصصی مهندسی نرم‌افزار و معماری ابری در سالن همایش‌ها',
    category: 'عمومی و رفاهی',
    date: '۱۴۰۳/۱۱/۰۵',
    isImportant: false,
    content: 'انجمن علمی گروه کامپیوتر موسسه سپاهان کارگاه آموزشی ۳ روزه پیرامون معماری مایکروسرویس و Docker برگزار می‌نماید. جهت ثبت‌نام به دفتر انجمن مراجعه نمایید.',
    author: 'روابط عمومی و امور فرهنگی موسسه آموزش عالی سپاهان'
  }
];

export const INITIAL_STUDENT_REQUESTS: StudentRequest[] = [
  {
    id: 'req_01',
    trackingCode: 'REQ-403-9912',
    title: 'صدور گواهی اشتغال به تحصیل با درج شماره معافیت تحصیلی',
    type: 'گواهی اشتغال به تحصیل',
    createdAt: '۱۴۰۳/۱۱/۱۴',
    status: 'تایید شده',
    description: 'جهت ارائه به پلیس +۱۰ و سازمان نظام وظیفه عمومی اصفهان',
    adminResponse: 'گواهی صادر گردید. می‌توانید نسخه رسمی ممهور به مهر دیجیتال را از بخش مکاتبات پرتال دانلود نمایید.'
  },
  {
    id: 'req_02',
    trackingCode: 'REQ-403-8821',
    title: 'درخواست تقسیط شهریه متغیر در ۳ قسط مساوی',
    type: 'درخواست تقسیط شهریه',
    createdAt: '۱۴۰۳/۱۱/۱۷',
    status: 'تایید شده',
    description: 'به دلیل تاخیر در دریافت حقوق، درخواست تقسیط مانده بدهی شهریه متغیر به ۳ مرحله را دارم.',
    adminResponse: 'موافقت شد. اقساط در جدول پرداخت‌های شهریه با سررسیدهای اسفند، فروردین و اردیبهشت تعریف شد.'
  }
];
