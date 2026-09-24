import { StudentProfile, Course, PaymentTransaction, SemesterGrade, AnnouncementItem, StudentRequest } from '../types';
import { ASSETS } from '../assets';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'std_44162424',
  studentCode: '44162424',
  nationalCode: '0250680424',
  firstName: 'حسن',
  lastName: 'رحیم زاده خراسانی',
  major: 'حسابداری و مدیریت مالی',
  faculty: 'دانشکده علوم انسانی و مدیریت',
  degree: 'کارشناسی پیوسته',
  entranceYear: '۱۴۰۲',
  currentSemester: 'نیمسال اول ۱۴۰۴ - ۱۴۰۵',
  currentTermNumber: 3,
  totalGpa: 17.95,
  lastSemesterGpa: 18.30,
  totalPassedUnits: 42,
  maxSelectableUnits: 24, // GPA > 17 gets 24 units
  minSelectableUnits: 12,
  tuitionBalance: 70000000, // 7,000,000 Tomans (70,000,000 Rials)
  fixedTuition: 22000000,   // 2,200,000 Tomans
  variableTuitionPerUnit: 1200000, // 120,000 Tomans per unit
  avatarUrl: ASSETS.studentAvatar,
  status: 'اشتغال به تحصیل',
  supervisor: 'دکتر سید محسن حسینی (عضو هیئت علمی گروه حسابداری)'
};

export const AVAILABLE_COURSES: Course[] = [
  {
    id: 'crs_acc_01',
    code: '15-110-201',
    group: '01',
    name: 'اصول حسابداری ۲',
    units: 3,
    type: 'پایه',
    professor: 'دکتر سید محسن حسینی',
    capacity: 40,
    enrolledCount: 34,
    prerequisites: ['اصول حسابداری ۱'],
    corequisites: [],
    schedule: [
      {
        day: 'شنبه',
        dayIndex: 0,
        startTime: '08:00',
        endTime: '10:00',
        room: 'کلاس ۳۰۱ (طبقه سوم)',
        building: 'ساختمان خوارزمی'
      },
      {
        day: 'دوشنبه',
        dayIndex: 2,
        startTime: '08:00',
        endTime: '10:00',
        room: 'کلاس ۳۰۱ (طبقه سوم)',
        building: 'ساختمان خوارزمی'
      }
    ],
    examDate: '1404/03/20',
    examTime: '08:30 - 10:30',
    examRoom: 'سالن اصلی امتحانات (سالن غدیر)',
    examSeatNumber: 'A-12',
    tuitionFee: 3600000,
    description: 'حسابداری شرکت‌های سهامی، تضامنی، اوراق قرضه، صورت جریان وجوه نقد و استهلاک دارایی‌ها.'
  },
  {
    id: 'crs_acc_02',
    code: '15-110-301',
    group: '01',
    name: 'حسابداری میانه ۱',
    units: 3,
    type: 'تخصصی',
    professor: 'دکتر مژگان صراف',
    capacity: 35,
    enrolledCount: 30,
    prerequisites: ['اصول حسابداری ۲'],
    corequisites: [],
    schedule: [
      {
        day: 'یکشنبه',
        dayIndex: 1,
        startTime: '10:00',
        endTime: '12:00',
        room: 'کلاس ۳۰۴',
        building: 'ساختمان خوارزمی'
      },
      {
        day: 'سه‌شنبه',
        dayIndex: 3,
        startTime: '10:00',
        endTime: '12:00',
        room: 'کلاس ۳۰۴',
        building: 'ساختمان خوارزمی'
      }
    ],
    examDate: '1404/03/24',
    examTime: '11:00 - 13:00',
    examRoom: 'سالن شماره ۱ امتحانات (ابن‌سینا)',
    examSeatNumber: 'B-08',
    tuitionFee: 3600000,
    description: 'مفاهیم نظری حسابداری مالی، استانداردهای حسابداری ایران، دارایی‌های جاری و موجودی کالا.'
  },
  {
    id: 'crs_acc_03',
    code: '15-110-305',
    group: '02',
    name: 'حسابداری صنعتی ۱ (بهایابی ۱)',
    units: 3,
    type: 'تخصصی',
    professor: 'دکتر بهزاد کمالی',
    capacity: 35,
    enrolledCount: 29,
    prerequisites: ['اصول حسابداری ۲'],
    corequisites: [],
    schedule: [
      {
        day: 'شنبه',
        dayIndex: 0,
        startTime: '13:30',
        endTime: '15:30',
        room: 'کلاس ۲۰۲',
        building: 'ساختمان مدیریت'
      },
      {
        day: 'چهارشنبه',
        dayIndex: 4,
        startTime: '10:00',
        endTime: '12:00',
        room: 'کلاس ۲۰۲',
        building: 'ساختمان مدیریت'
      }
    ],
    examDate: '1404/03/28',
    examTime: '08:30 - 10:30',
    examRoom: 'سالن اصلی غدیر',
    examSeatNumber: 'A-44',
    tuitionFee: 3600000,
    description: 'طبقه‌بندی هزینه‌ها، بهایابی مواد، دستمزد و سربار، و سیستم بهایابی سفارش کار.'
  },
  {
    id: 'crs_acc_04',
    code: '15-110-210',
    group: '01',
    name: 'ریاضیات و کاربرد آن در مدیریت و حسابداری',
    units: 3,
    type: 'پایه',
    professor: 'دکتر علیرضا محمدی',
    capacity: 45,
    enrolledCount: 38,
    prerequisites: [],
    corequisites: [],
    schedule: [
      {
        day: 'دوشنبه',
        dayIndex: 2,
        startTime: '13:30',
        endTime: '16:30',
        room: 'کلاس ۱۰۳',
        building: 'ساختمان مدیریت'
      }
    ],
    examDate: '1404/04/02',
    examTime: '14:00 - 16:00',
    examRoom: 'سالن شماره ۲ امتحانات',
    examSeatNumber: 'C-19',
    tuitionFee: 3600000,
    description: 'ماتریس‌ها و دترمینان، مشتق و کاربرد آن در تحلیل هزینه‌ها و درآمد نهایی، انتگرال‌های کاربردی.'
  },
  {
    id: 'crs_acc_05',
    code: '15-110-220',
    group: '01',
    name: 'مبانی سازمان و مدیریت',
    units: 3,
    type: 'پایه',
    professor: 'دکتر فرشته کریمی',
    capacity: 50,
    enrolledCount: 42,
    prerequisites: [],
    corequisites: [],
    schedule: [
      {
        day: 'سه‌شنبه',
        dayIndex: 3,
        startTime: '13:30',
        endTime: '16:30',
        room: 'کلاس ۲۰۱',
        building: 'ساختمان مدیریت'
      }
    ],
    examDate: '1404/04/06',
    examTime: '10:00 - 12:00',
    examRoom: 'سالن شماره ۱ امتحانات',
    examSeatNumber: 'B-31',
    tuitionFee: 3600000,
    description: 'نظریه‌های مدیریت، برنامه‌ریزی استراتژیک، ساختارهای سازمانی و انگیزش پرسنل.'
  },
  {
    id: 'crs_gen_01',
    code: '12-001-105',
    group: '03',
    name: 'اندیشه اسلامی ۲',
    units: 2,
    type: 'عمومی',
    professor: 'حجت‌الاسلام دکتر موسوی',
    capacity: 55,
    enrolledCount: 48,
    prerequisites: ['اندیشه اسلامی ۱'],
    corequisites: [],
    schedule: [
      {
        day: 'چهارشنبه',
        dayIndex: 4,
        startTime: '13:30',
        endTime: '15:30',
        room: 'سالن آمفی‌تئاتر مطهری',
        building: 'ساختمان مرکزی'
      }
    ],
    examDate: '1404/04/10',
    examTime: '08:30 - 10:00',
    examRoom: 'سالن اصلی غدیر',
    examSeatNumber: 'C-72',
    tuitionFee: 2400000,
    description: 'مباحث نبوت، امامت، معادشناسی و فلسفه دین در جهان معاصر.'
  },
  {
    id: 'crs_acc_06',
    code: '15-110-315',
    group: '01',
    name: 'حقوق بازرگانی و تجارت',
    units: 2,
    type: 'پایه',
    professor: 'دکتر مسعود دهکردی',
    capacity: 45,
    enrolledCount: 35,
    prerequisites: [],
    corequisites: [],
    schedule: [
      {
        day: 'یکشنبه',
        dayIndex: 1,
        startTime: '15:30',
        endTime: '17:30',
        room: 'کلاس ۲۰۵',
        building: 'ساختمان مدیریت'
      }
    ],
    examDate: '1404/04/14',
    examTime: '11:00 - 13:00',
    examRoom: 'سالن شماره ۲ امتحانات',
    examSeatNumber: 'A-22',
    tuitionFee: 2400000,
    description: 'قوانین تجارت ایران، اسناد تجاری (چک، سفته، برات)، ورشکستگی و قراردادهای بازرگانی.'
  }
];

export const INITIAL_ENROLLED_COURSES: Course[] = [
  AVAILABLE_COURSES[0], // اصول حسابداری ۲ (3)
  AVAILABLE_COURSES[1], // حسابداری میانه ۱ (3)
  AVAILABLE_COURSES[2], // حسابداری صنعتی ۱ (3)
  AVAILABLE_COURSES[3], // ریاضیات و کاربرد آن در حسابداری (3)
  AVAILABLE_COURSES[4], // مبانی سازمان و مدیریت (3)
  AVAILABLE_COURSES[5], // اندیشه اسلامی ۲ (2)
]; // Total: 17 units

export const INITIAL_PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx_01',
    trackingCode: 'SHP-994827103',
    referenceNumber: 'REF-789012345678',
    amount: 15000000, // 1,500,000 Tomans
    date: '۱۴۰۳/۱۱/۱۵',
    time: '۱۴:۳۲:۱۸',
    gateway: 'سامان کیش',
    status: 'موفق',
    description: 'پرداخت علی‌الحساب شهریه ثابت نیمسال اول ۱۴۰۴ - ۱۴۰۵',
    cardNumberMasked: '۶۲۱۹-****-****-۴۴۵۲',
    receiptNumber: 'RCP-883921'
  },
  {
    id: 'tx_02',
    trackingCode: 'SHP-883920194',
    referenceNumber: 'REF-554123987654',
    amount: 12000000, // 1,200,000 Tomans
    date: '۱۴۰۳/۰۷/۱۰',
    time: '۰۹:۱۵:۴۴',
    gateway: 'به‌پرداخت ملت',
    status: 'موفق',
    description: 'تسویه بدهی نیمسال دوم سال تحصیلی ۱۴۰۲ - ۱۴۰۳',
    cardNumberMasked: '۶۱۰۴-****-****-۱۱۸۹',
    receiptNumber: 'RCP-661092'
  }
];

export const TRANSCRIPT_HISTORY: SemesterGrade[] = [
  {
    termName: 'نیمسال اول ۱۴۰۲ - ۱۴۰۳',
    termNumber: 1,
    passedUnits: 20,
    termGpa: 17.60,
    courses: [
      { code: '15-110-101', name: 'اصول حسابداری ۱', units: 3, grade: 18.5, status: 'قبول' },
      { code: '15-110-102', name: 'کلیات اقتصاد خرد', units: 3, grade: 17.0, status: 'قبول' },
      { code: '15-110-103', name: 'ریاضیات پایه', units: 3, grade: 18.0, status: 'قبول' },
      { code: '12-001-101', name: 'فارسی عمومی', units: 3, grade: 19.0, status: 'قبول' },
      { code: '12-001-102', name: 'زبان انگلیسی عمومی', units: 3, grade: 17.5, status: 'قبول' },
      { code: '12-001-103', name: 'اندیشه اسلامی ۱', units: 2, grade: 18.0, status: 'قبول' },
      { code: '12-001-104', name: 'تربیت بدنی ۱', units: 1, grade: 20.0, status: 'قبول' },
      { code: '15-110-104', name: 'مهارت‌های کاربردی رایانه در حسابداری', units: 2, grade: 19.0, status: 'قبول' },
    ]
  },
  {
    termName: 'نیمسال دوم ۱۴۰۲ - ۱۴۰۳',
    termNumber: 2,
    passedUnits: 22,
    termGpa: 18.30,
    courses: [
      { code: '15-110-105', name: 'کلیات اقتصاد کلان', units: 3, grade: 18.0, status: 'قبول' },
      { code: '15-110-106', name: 'روش‌های آماری در حسابداری و مدیریت', units: 3, grade: 19.0, status: 'قبول' },
      { code: '15-110-107', name: 'روانشناسی کار و سازمانی', units: 2, grade: 17.5, status: 'قبول' },
      { code: '15-110-108', name: 'روش تحقیق در حسابداری', units: 2, grade: 18.5, status: 'قبول' },
      { code: '12-001-107', name: 'تاریخ تحلیلی صدر اسلام', units: 2, grade: 18.0, status: 'قبول' },
      { code: '12-001-108', name: 'ورزش ۱', units: 1, grade: 19.5, status: 'قبول' },
      { code: '12-001-109', name: 'تفسیر موضوعی قرآن', units: 2, grade: 18.5, status: 'قبول' },
      { code: '12-001-110', name: 'دانش خانواده و جمعیت', units: 1, grade: 18.0, status: 'قبول' },
      { code: '15-110-109', name: 'مالیه عمومی و بودجه‌ریزی', units: 3, grade: 17.5, status: 'قبول' },
      { code: '15-110-110', name: 'اخلاق حرفه‌ای در حسابداری', units: 3, grade: 19.5, status: 'قبول' },
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
    content: 'به اطلاع دانشجویان محترم رشته حسابداری و مدیریت موسسه آموزش عالی سپاهان می‌رساند فرآیند انتخاب واحد طبق جدول زمان‌بندی در پرتال آموزشی آغاز شده است.',
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
    content: 'به همراه داشتن پرینت کارت ورود به جلسه (عکس‌دار) و کارت دانشجویی در کلیه جلسات آزمون الزامی است.',
    author: 'ستاد برگزاری آزمون‌های موسسه سپاهان'
  }
];

export const INITIAL_STUDENT_REQUESTS: StudentRequest[] = [
  {
    id: 'req_01',
    trackingCode: 'REQ-401089',
    title: 'گواهی اشتغال به تحصیل با درج معدل',
    type: 'گواهی اشتغال به تحصیل',
    createdAt: '۱۴۰۳/۱۱/۱۲',
    status: 'تایید شده',
    description: 'درخواست صدور گواهی اشتغال به تحصیل جهت ارائه به سازمان نظام وظیفه و بانک.',
    adminResponse: 'گواهی اشتغال به تحصیل صادر گردید و با مهر دیجیتال دانشگاه در سامانه ثبت شد.'
  },
  {
    id: 'req_02',
    trackingCode: 'REQ-401095',
    title: 'درخواست پرداخت اقساطی شهریه',
    type: 'درخواست تقسیط شهریه',
    createdAt: '۱۴۰۳/۱۱/۱۴',
    status: 'در حال بررسی',
    description: 'درخواست تقسیط مانده بدهی شهریه متغیر به دو قسط متوالی.',
    adminResponse: 'درخواست در کارتابل امور مالی دانشگاه در حال بررسی می‌باشد.'
  }
];
