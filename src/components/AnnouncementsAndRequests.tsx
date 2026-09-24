import React, { useState } from 'react';
import { AnnouncementItem, StudentRequest } from '../types';
import { toPersianDigits } from '../utils/formatters';
import { 
  Bell, 
  Send, 
  CheckCircle2, 
  Clock, 
  Plus, 
  FileText, 
  Search, 
  ShieldAlert,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface AnnouncementsAndRequestsProps {
  announcements: AnnouncementItem[];
  requests: StudentRequest[];
  onSubmitRequest: (req: { title: string; type: StudentRequest['type']; description: string }) => void;
}

export const AnnouncementsAndRequests: React.FC<AnnouncementsAndRequestsProps> = ({
  announcements,
  requests,
  onSubmitRequest
}) => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'requests'>('announcements');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [reqTitle, setReqTitle] = useState('');
  const [reqType, setReqType] = useState<StudentRequest['type']>('گواهی اشتغال به تحصیل');
  const [reqDesc, setReqDesc] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle.trim() || !reqDesc.trim()) return;

    onSubmitRequest({
      title: reqTitle,
      type: reqType,
      description: reqDesc
    });

    setReqTitle('');
    setReqDesc('');
    setShowNewRequestModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Tabs */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              تابلو اعلانات و میز درخواست‌های دانشجویی
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              موسسه آموزش عالی غیرانتفاعی سپاهان · ارتباط مستقیم با امور آموزشی، مالی و اداری
            </p>
          </div>

          {/* Segmented Tab Bar */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'announcements'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>اطلاعیه‌ها و اخبار</span>
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'requests'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>درخواست‌های الکترونیک</span>
            </button>
          </div>
        </div>

        {activeTab === 'requests' && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowNewRequestModal(true)}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت درخواست جدید</span>
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Announcements */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAnnouncement(item)}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono tabular-nums">
                  <span className="bg-blue-50 text-blue-800 font-sans font-semibold px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span>{toPersianDigits(item.date)}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                  {item.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>مرجع صدور: {item.author}</span>
                <span className="text-blue-600 font-medium group-hover:underline">مشاهده متن کامل ←</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                لیست درخواست‌های ثبت شده شما
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {requests.map((req) => (
                <div key={req.id} className="p-4 sm:p-5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{req.title}</span>
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {req.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono tabular-nums">
                      <span className="text-slate-500 font-sans">کد پیگیری: <strong>{req.trackingCode}</strong></span>
                      <span className={`px-2 py-0.5 rounded font-sans font-semibold text-[11px] ${
                        req.status === 'تایید شده'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                    <strong>شرح دانشجو:</strong> {req.description}
                  </p>

                  {req.adminResponse && (
                    <div className="text-xs text-emerald-900 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200 leading-relaxed">
                      <strong>پاسخ آموزش و امور اداری:</strong> {req.adminResponse}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              ثبت درخواست الکترونیکی جدید
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                نوع درخواست
              </label>
              <select
                value={reqType}
                onChange={(e) => setReqType(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-hidden"
              >
                <option value="گواهی اشتغال به تحصیل">گواهی اشتغال به تحصیل (جهت ارگان‌ها / نظام وظیفه)</option>
                <option value="درخواست تقسیط شهریه">درخواست تقسیط شهریه</option>
                <option value="تطبیق واحد">تطبیق واحد دروس انتقالی</option>
                <option value="معرفی‌نامه کارآموزی">معرفی‌نامه کارآموزی تابستانه</option>
                <option value="اعتراض به نمره">اعتراض به نمره آزمون پایان‌ترم</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                عنوان مختصر درخواست
              </label>
              <input
                type="text"
                value={reqTitle}
                onChange={(e) => setReqTitle(e.target.value)}
                placeholder="مثال: صدور گواهی اشتغال برای سازمان تامین اجتماعی"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                توضیحات و جزئیات درخواست
              </label>
              <textarea
                rows={4}
                value={reqDesc}
                onChange={(e) => setReqDesc(e.target.value)}
                placeholder="توضیحات تکمیلی خود را بنویسید..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
              ></textarea>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                ارسال درخواست به کارتابل آموزش
              </button>
              <button
                type="button"
                onClick={() => setShowNewRequestModal(false)}
                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono tabular-nums">
                <span className="bg-blue-50 text-blue-800 font-sans font-semibold px-2 py-0.5 rounded">
                  {selectedAnnouncement.category}
                </span>
                <span>{toPersianDigits(selectedAnnouncement.date)}</span>
              </div>
              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {selectedAnnouncement.title}
              </h3>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
              {selectedAnnouncement.content}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>{selectedAnnouncement.author}</span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
