import React, { useState } from 'react';
import { StudentProfile, PaymentTransaction, Course } from '../types';
import { 
  toPersianDigits, 
  formatTomans, 
  formatRials 
} from '../utils/formatters';
import { 
  CreditCard, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Printer, 
  ArrowUpRight, 
  Calendar, 
  ShieldCheck, 
  FileText,
  Building2,
  Check,
  ChevronDown
} from 'lucide-react';

interface TuitionPaymentProps {
  student: StudentProfile;
  enrolledCourses: Course[];
  paymentHistory: PaymentTransaction[];
  onOpenPaymentModal: (amount: number, description: string) => void;
}

export const TuitionPayment: React.FC<TuitionPaymentProps> = ({
  student,
  enrolledCourses,
  paymentHistory,
  onOpenPaymentModal
}) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState<'full' | 'fixed' | 'installment' | 'custom'>('full');
  const [customAmountTomans, setCustomAmountTomans] = useState<string>('1000000');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);

  const totalUnits = enrolledCourses.reduce((sum, c) => sum + c.units, 0);
  const variableTuitionTotal = totalUnits * student.variableTuitionPerUnit;
  const insuranceAndWelfare = 450000; // 45,000 Tomans
  const totalSemesterCost = student.fixedTuition + variableTuitionTotal + insuranceAndWelfare;

  // Calculate installment values
  const installment1Amount = Math.round(student.tuitionBalance / 2);
  const installment2Amount = student.tuitionBalance - installment1Amount;

  const handleStartPayment = () => {
    let amountToPay = 0;
    let description = '';

    if (selectedPaymentType === 'full') {
      amountToPay = student.tuitionBalance;
      description = 'تسویه کامل مانده بدهی شهریه نیمسال اول ۱۴۰۴ - ۱۴۰۵';
    } else if (selectedPaymentType === 'fixed') {
      amountToPay = student.fixedTuition;
      description = 'پرداخت شهریه ثابت نیمسال اول ۱۴۰۴ - ۱۴۰۵';
    } else if (selectedPaymentType === 'installment') {
      amountToPay = installment1Amount;
      description = 'پرداخت قسط اول شهریه نیمسال اول ۱۴۰۴ - ۱۴۰۵';
    } else {
      const tomans = parseInt(customAmountTomans.replace(/\D/g, '') || '0', 10);
      amountToPay = tomans * 10; // Convert to Rials
      description = `پرداخت علی‌الحساب شهریه به مبلغ ${toPersianDigits(tomans.toLocaleString())} تومان`;
    }

    if (amountToPay <= 0) return;
    onOpenPaymentModal(amountToPay, description);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-emerald-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                امور مالی و پرداخت الکترونیکی شهریه
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              موسسه آموزش عالی غیرانتفاعی سپاهان · درگاه پرداخت یکپارچه شتاب و شاپرک
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              پرداخت امن متصل به شبکه شتاب
            </span>
          </div>
        </div>

        {/* Financial Status Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          
          {/* Current Debt / Balance */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-200">
            <span className="text-xs text-red-700 block font-medium">مانده کل بدهی شهریه:</span>
            <div className="text-xl sm:text-2xl font-black text-red-700 mt-1 font-mono tabular-nums">
              {student.tuitionBalance > 0 ? formatTomans(student.tuitionBalance) : 'تسویه کامل (۰ تومان)'}
            </div>
            <p className="text-[11px] text-red-600/80 mt-1 font-mono tabular-nums">
              معادل {formatRials(student.tuitionBalance)}
            </p>
          </div>

          {/* Fixed Tuition */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block font-medium">شهریه ثابت مصوب وزارت علوم:</span>
            <div className="text-xl font-bold text-slate-800 mt-1 font-mono tabular-nums">
              {formatTomans(student.fixedTuition)}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              الزامی برای تایید نهایی انتخاب واحد
            </p>
          </div>

          {/* Variable Tuition */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block font-medium">شهریه متغیر ({toPersianDigits(totalUnits)} واحد اخذ شده):</span>
            <div className="text-xl font-bold text-slate-800 mt-1 font-mono tabular-nums">
              {formatTomans(variableTuitionTotal)}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-mono tabular-nums">
              نرخ هر واحد: {formatTomans(student.variableTuitionPerUnit)}
            </p>
          </div>

        </div>
      </div>

      {/* Payment Gateway Trigger Box & Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Payment Action Selector (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2 pb-3 border-b border-slate-100">
            <CreditCard className="w-5 h-5 text-blue-600" />
            انتخاب شیوه و مبلغ پرداخت
          </h3>

          <div className="space-y-3">
            {/* Option 1: Full Balance */}
            <label className={`block p-4 rounded-xl border transition-all cursor-pointer ${
              selectedPaymentType === 'full' 
                ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-400' 
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentType"
                    checked={selectedPaymentType === 'full'}
                    onChange={() => setSelectedPaymentType('full')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                      تسویه کامل کل مانده بدهی
                    </span>
                    <span className="text-xs text-slate-500">
                      پرداخت یکجای شهریه ثابت و متغیر نیمسال
                    </span>
                  </div>
                </div>
                <span className="font-bold text-emerald-700 text-sm font-mono tabular-nums">
                  {formatTomans(student.tuitionBalance)}
                </span>
              </div>
            </label>

            {/* Option 2: Fixed Tuition Only */}
            <label className={`block p-4 rounded-xl border transition-all cursor-pointer ${
              selectedPaymentType === 'fixed' 
                ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-400' 
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentType"
                    checked={selectedPaymentType === 'fixed'}
                    onChange={() => setSelectedPaymentType('fixed')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                      فقط پرداخت شهریه ثابت
                    </span>
                    <span className="text-xs text-slate-500">
                      حداقل مبلغ لازم برای باز شدن پورتال انتخاب واحد
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-800 text-sm font-mono tabular-nums">
                  {formatTomans(student.fixedTuition)}
                </span>
              </div>
            </label>

            {/* Option 3: Installment */}
            <label className={`block p-4 rounded-xl border transition-all cursor-pointer ${
              selectedPaymentType === 'installment' 
                ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-400' 
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentType"
                    checked={selectedPaymentType === 'installment'}
                    onChange={() => setSelectedPaymentType('installment')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                      پرداخت قسط اول (طرح تقسیط ۵۰٪)
                    </span>
                    <span className="text-xs text-slate-500">
                      سررسید قسط دوم: ۲۵ فروردین ۱۴۰۴
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-800 text-sm font-mono tabular-nums">
                  {formatTomans(installment1Amount)}
                </span>
              </div>
            </label>

            {/* Option 4: Custom Amount */}
            <label className={`block p-4 rounded-xl border transition-all cursor-pointer ${
              selectedPaymentType === 'custom' 
                ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-400' 
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentType"
                  checked={selectedPaymentType === 'custom'}
                  onChange={() => setSelectedPaymentType('custom')}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                    پرداخت مبلغ دلخواه (علی‌الحساب)
                  </span>
                  {selectedPaymentType === 'custom' && (
                    <div className="mt-2.5 flex items-center gap-2">
                      <input
                        type="text"
                        value={customAmountTomans}
                        onChange={(e) => setCustomAmountTomans(e.target.value)}
                        placeholder="مبلغ به تومان"
                        className="w-48 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-left focus:ring-2 focus:ring-emerald-500 outline-hidden"
                      />
                      <span className="text-xs text-slate-500">تومان</span>
                    </div>
                  )}
                </div>
              </div>
            </label>
          </div>

          <button
            onClick={handleStartPayment}
            disabled={student.tuitionBalance <= 0 && selectedPaymentType !== 'custom'}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed mt-4"
          >
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <span>اتصال به درگاه پرداخت الکترونیک بانک ملت (شاپرک)</span>
          </button>
        </div>

        {/* Detailed Itemized Tuition Invoice (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Receipt className="w-4 h-4 text-slate-500" />
              صورتحساب مالی ترم جاری
            </h3>
            <span className="text-[11px] text-slate-400 font-mono tabular-nums">
              نیمسال اول ۱۴۰۴ - ۱۴۰۵
            </span>
          </div>

          <div className="space-y-3 text-xs divide-y divide-slate-100 font-mono tabular-nums">
            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-600 font-sans">شهریه ثابت مصوب:</span>
              <span className="font-semibold text-slate-900">{formatTomans(student.fixedTuition)}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-600 font-sans">
                شهریه متغیر ({toPersianDigits(totalUnits)} واحد):
              </span>
              <span className="font-semibold text-slate-900">{formatTomans(variableTuitionTotal)}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-600 font-sans">حق بیمه حوادث و خدمات رفاهی:</span>
              <span className="font-semibold text-slate-900">{formatTomans(insuranceAndWelfare)}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-600 font-sans">مجموع بدهی ترم جاری:</span>
              <span className="font-bold text-slate-900">{formatTomans(totalSemesterCost)}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-emerald-700 font-sans font-medium">مبالغ واریز شده قبلی:</span>
              <span className="font-bold text-emerald-700">
                - {formatTomans(totalSemesterCost - student.tuitionBalance)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 text-sm">
              <span className="text-slate-900 font-sans font-bold">مانده قابل پرداخت:</span>
              <span className="font-black text-red-600">
                {student.tuitionBalance > 0 ? formatTomans(student.tuitionBalance) : '۰ تومان'}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
            <p>
              * بر اساس مصوبه هیئت امنای موسسه آموزش عالی سپاهان، در صورت پرداخت کامل شهریه پیش از اتمام مهلت انتخاب واحد، مشمول ۵٪ تخفیف خوش‌حسابی در ترم آینده خواهید شد.
            </p>
          </div>
        </div>

      </div>

      {/* Payment History & Digital Receipts Table */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              سوابق و ریز تراکنش‌های واریز شهریه
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {toPersianDigits(paymentHistory.length)} فیش ثبت شده
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="py-3 px-3 font-semibold">ردیف</th>
                <th className="py-3 px-3 font-semibold">کد رهگیری</th>
                <th className="py-3 px-3 font-semibold">شرح پرداخت</th>
                <th className="py-3 px-3 font-semibold">درگاه بانکی</th>
                <th className="py-3 px-3 font-semibold">تاریخ و ساعت</th>
                <th className="py-3 px-3 font-semibold">مبلغ پرداختی</th>
                <th className="py-3 px-3 font-semibold">وضعیت</th>
                <th className="py-3 px-3 font-semibold text-center">رسید دیجیتال</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {paymentHistory.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 text-slate-500">{toPersianDigits(idx + 1)}</td>
                  <td className="py-3 px-3 font-bold text-blue-900">{item.trackingCode}</td>
                  <td className="py-3 px-3 font-sans text-slate-800">{item.description}</td>
                  <td className="py-3 px-3 font-sans text-slate-600">{item.gateway}</td>
                  <td className="py-3 px-3 text-slate-500">{toPersianDigits(item.date)} - {toPersianDigits(item.time)}</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">{formatTomans(item.amount)}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-sans text-[11px] font-semibold">
                      <Check className="w-3 h-3" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => setSelectedReceipt(item)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-sans font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>مشاهده فیش</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Printable Digital Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* University Seal & Receipt Header */}
            <div className="text-center pb-3 border-b border-slate-200 space-y-1">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-xl flex items-center justify-center mx-auto mb-1.5 shadow-xs">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-black text-base text-slate-900">موسسه آموزش عالی غیرانتفاعی سپاهان</h3>
              <p className="text-xs text-slate-500 font-medium">رسید دیجیتال واریز وجه و تسویه شهریه</p>
            </div>

            {/* Receipt Details Grid */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs font-mono tabular-nums">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">شماره فیش / رسید:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">کد پیگیری شاپرک:</span>
                <span className="font-bold text-blue-900">{selectedReceipt.trackingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">شماره مرجع بانکی:</span>
                <span className="font-bold text-slate-800">{selectedReceipt.referenceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">نام و شماره دانشجویی:</span>
                <span className="font-bold text-slate-900 font-sans">{student.firstName} {student.lastName} ({toPersianDigits(student.studentCode)})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">رشته تحصیلی:</span>
                <span className="font-bold text-slate-900 font-sans">{student.major}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">تاریخ و زمان پرداخت:</span>
                <span className="text-slate-800">{toPersianDigits(selectedReceipt.date)} ساعت {toPersianDigits(selectedReceipt.time)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">درگاه پرداخت / کارت:</span>
                <span className="text-slate-800 font-sans">{selectedReceipt.gateway} ({selectedReceipt.cardNumberMasked})</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm">
                <span className="text-slate-900 font-sans font-bold">مبلغ واریز شده:</span>
                <span className="font-black text-emerald-700">{formatTomans(selectedReceipt.amount)}</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-400">
              این رسید الکترونیکی معتبر بوده و نیاز به مهر و امضای دستی ندارد.
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                چاپ فیش واریزی
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
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
