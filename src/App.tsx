/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ViewTab, 
  StudentProfile, 
  Course, 
  PaymentTransaction, 
  AnnouncementItem, 
  StudentRequest 
} from './types';
import { 
  INITIAL_STUDENT_PROFILE, 
  AVAILABLE_COURSES, 
  INITIAL_ENROLLED_COURSES, 
  INITIAL_PAYMENT_TRANSACTIONS, 
  TRANSCRIPT_HISTORY, 
  ANNOUNCEMENTS, 
  INITIAL_STUDENT_REQUESTS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { CourseRegistration } from './components/CourseRegistration';
import { TuitionPayment } from './components/TuitionPayment';
import { WeeklySchedule } from './components/WeeklySchedule';
import { ExamSchedule } from './components/ExamSchedule';
import { TranscriptView } from './components/TranscriptView';
import { AnnouncementsAndRequests } from './components/AnnouncementsAndRequests';
import { UniversityIntroLanding } from './components/UniversityIntroLanding';
import { OnlinePaymentModal } from './components/OnlinePaymentModal';
import { StudentDataManagementModal } from './components/StudentDataManagementModal';
import { AuthLoginView } from './components/AuthLoginView';
import { 
  Home, 
  BookOpenCheck, 
  CreditCard, 
  CalendarDays, 
  FileSpreadsheet, 
  Building2,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('sepahan_is_logged_in');
    return saved === 'true'; // Default to login screen so user sees authentication immediately
  });

  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [studentManagerOpen, setStudentManagerOpen] = useState(false);

  // Persistent student profile
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('sepahan_student_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.studentCode === '9912040112' || !parsed.studentCode) {
          return INITIAL_STUDENT_PROFILE;
        }
        return parsed;
      } catch (e) {
        return INITIAL_STUDENT_PROFILE;
      }
    }
    return INITIAL_STUDENT_PROFILE;
  });

  // Persistent enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('sepahan_enrolled_courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((c: any) => c.id === 'crs_01')) {
          return INITIAL_ENROLLED_COURSES;
        }
        return parsed;
      } catch (e) {
        return INITIAL_ENROLLED_COURSES;
      }
    }
    return INITIAL_ENROLLED_COURSES;
  });

  // Persistent payment history
  const [paymentHistory, setPaymentHistory] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('sepahan_payment_history');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENT_TRANSACTIONS;
  });

  // Persistent student requests
  const [studentRequests, setStudentRequests] = useState<StudentRequest[]>(() => {
    const saved = localStorage.getItem('sepahan_student_requests');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_REQUESTS;
  });

  // Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pendingPaymentAmount, setPendingPaymentAmount] = useState(0);
  const [pendingPaymentDesc, setPendingPaymentDesc] = useState('');

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('sepahan_is_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('sepahan_student_profile', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('sepahan_enrolled_courses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('sepahan_payment_history', JSON.stringify(paymentHistory));
  }, [paymentHistory]);

  useEffect(() => {
    localStorage.setItem('sepahan_student_requests', JSON.stringify(studentRequests));
  }, [studentRequests]);

  // Handlers for Course Registration
  const handleEnrollCourse = (course: Course) => {
    if (!enrolledCourses.some(c => c.id === course.id)) {
      setEnrolledCourses(prev => [...prev, course]);
    }
  };

  const handleDropCourse = (courseId: string) => {
    setEnrolledCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const handleFinalizeEnrollment = () => {
    // Recalculate variable tuition
    const totalUnits = enrolledCourses.reduce((sum, c) => sum + c.units, 0);
    const variableTuition = totalUnits * student.variableTuitionPerUnit;
    const newBalance = student.fixedTuition + variableTuition;
    setStudent(prev => ({
      ...prev,
      tuitionBalance: newBalance
    }));
  };

  // Handlers for Tuition Payment
  const handleOpenPaymentModal = (amount?: number, desc?: string) => {
    const payAmount = amount && amount > 0 ? amount : student.tuitionBalance;
    setPendingPaymentAmount(payAmount);
    setPendingPaymentDesc(desc || 'تسویه حساب شهریه نیمسال اول ۱۴۰۴ - ۱۴۰۵');
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (tx: {
    trackingCode: string;
    referenceNumber: string;
    amount: number;
    gateway: 'به‌پرداخت ملت' | 'سداد ملی' | 'سامان کیش';
    cardNumberMasked: string;
  }) => {
    // Deduct amount from balance
    setStudent(prev => ({
      ...prev,
      tuitionBalance: Math.max(0, prev.tuitionBalance - tx.amount)
    }));

    const newTx: PaymentTransaction = {
      id: `pay_${Date.now()}`,
      trackingCode: tx.trackingCode,
      referenceNumber: tx.referenceNumber,
      amount: tx.amount,
      date: '۱۴۰۳/۱۱/۲۵',
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      description: pendingPaymentDesc,
      gateway: tx.gateway,
      status: 'موفق',
      cardNumberMasked: tx.cardNumberMasked,
      receiptNumber: `REC-1403-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setPaymentHistory(prev => [newTx, ...prev]);
  };

  // Handlers for Student Requests
  const handleSubmitRequest = (req: { title: string; type: StudentRequest['type']; description: string }) => {
    const newReq: StudentRequest = {
      id: `req_${Date.now()}`,
      trackingCode: `REQ-403-${Math.floor(1000 + Math.random() * 9000)}`,
      title: req.title,
      type: req.type,
      createdAt: '۱۴۰۳/۱۱/۲۵',
      status: 'در حال بررسی',
      description: req.description,
      adminResponse: 'درخواست شما در کارتابل دبیرخانه آموزش ثبت شد و حداکثر ظرف ۴۸ ساعت اداری بررسی می‌گردد.'
    };

    setStudentRequests(prev => [newReq, ...prev]);
  };

  // If user is not logged in, render the authentic University Login View
  if (!isLoggedIn) {
    return (
      <>
        <AuthLoginView
          currentStudent={student}
          onLoginSuccess={(loggedInStudent) => {
            setStudent(loggedInStudent);
            setIsLoggedIn(true);
          }}
          onOpenExcelManager={() => setStudentManagerOpen(true)}
        />

        <StudentDataManagementModal
          isOpen={studentManagerOpen}
          onClose={() => setStudentManagerOpen(false)}
          currentStudent={student}
          onUpdateStudentProfile={(updated) => {
            setStudent(updated);
            setIsLoggedIn(true);
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 pb-20 lg:pb-8">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        student={student}
        announcements={ANNOUNCEMENTS}
        onOpenStudentManager={() => setStudentManagerOpen(true)}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            student={student}
            enrolledCourses={enrolledCourses}
            announcements={ANNOUNCEMENTS}
            onNavigate={setActiveTab}
            onOpenPaymentModal={() => handleOpenPaymentModal()}
          />
        )}

        {activeTab === 'registration' && (
          <CourseRegistration
            student={student}
            availableCourses={AVAILABLE_COURSES}
            enrolledCourses={enrolledCourses}
            onEnrollCourse={handleEnrollCourse}
            onDropCourse={handleDropCourse}
            onFinalizeEnrollment={handleFinalizeEnrollment}
          />
        )}

        {activeTab === 'tuition' && (
          <TuitionPayment
            student={student}
            enrolledCourses={enrolledCourses}
            paymentHistory={paymentHistory}
            onOpenPaymentModal={handleOpenPaymentModal}
          />
        )}

        {activeTab === 'schedule' && (
          <WeeklySchedule
            student={student}
            enrolledCourses={enrolledCourses}
          />
        )}

        {activeTab === 'exams' && (
          <ExamSchedule
            student={student}
            enrolledCourses={enrolledCourses}
          />
        )}

        {activeTab === 'transcript' && (
          <TranscriptView
            student={student}
            history={TRANSCRIPT_HISTORY}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsAndRequests
            announcements={ANNOUNCEMENTS}
            requests={studentRequests}
            onSubmitRequest={handleSubmitRequest}
          />
        )}

        {activeTab === 'requests' && (
          <AnnouncementsAndRequests
            announcements={ANNOUNCEMENTS}
            requests={studentRequests}
            onSubmitRequest={handleSubmitRequest}
          />
        )}

        {activeTab === 'university-intro' && (
          <UniversityIntroLanding
            onEnterPortal={setActiveTab}
          />
        )}
      </main>

      {/* Online Payment Modal */}
      <OnlinePaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        amount={pendingPaymentAmount}
        description={pendingPaymentDesc}
        studentName={`${student.firstName} ${student.lastName}`}
        studentCode={student.studentCode}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Student Profile & Excel Management Modal */}
      <StudentDataManagementModal
        isOpen={studentManagerOpen}
        onClose={() => setStudentManagerOpen(false)}
        currentStudent={student}
        onUpdateStudentProfile={(updated) => {
          setStudent(updated);
        }}
      />

      {/* Mobile Bottom Navigation Bar for rapid thumb access */}
      <nav className="no-print lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 shadow-lg flex items-center justify-around">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'dashboard' ? 'text-blue-700 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>میز کار</span>
        </button>

        <button
          onClick={() => setActiveTab('registration')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'registration' ? 'text-blue-700 font-bold' : 'text-slate-500'
          }`}
        >
          <BookOpenCheck className="w-5 h-5" />
          <span>انتخاب واحد</span>
        </button>

        <button
          onClick={() => setActiveTab('tuition')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'tuition' ? 'text-blue-700 font-bold' : 'text-slate-500'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span>شهریه</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'schedule' ? 'text-blue-700 font-bold' : 'text-slate-500'
          }`}
        >
          <CalendarDays className="w-5 h-5" />
          <span>برنامه هفتگی</span>
        </button>

        <button
          onClick={() => setActiveTab('exams')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'exams' ? 'text-blue-700 font-bold' : 'text-slate-500'
          }`}
        >
          <FileSpreadsheet className="w-5 h-5" />
          <span>امتحانات</span>
        </button>
      </nav>

    </div>
  );
}
