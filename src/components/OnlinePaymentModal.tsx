import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { toPersianDigits, formatTomans, formatRials } from '../utils/formatters';
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  RotateCw, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  X, 
  ArrowRight,
  Smartphone
} from 'lucide-react';

interface OnlinePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number; // in Rials
  description: string;
  studentName: string;
  studentCode: string;
  onPaymentSuccess: (transaction: {
    trackingCode: string;
    referenceNumber: string;
    amount: number;
    gateway: 'به‌پرداخت ملت' | 'سداد ملی' | 'سامان کیش';
    cardNumberMasked: string;
  }) => void;
}

export const OnlinePaymentModal: React.FC<OnlinePaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  description,
  studentName,
  studentCode,
  onPaymentSuccess
}) => {
  const [cardNumber, setCardNumber] = useState('6037991845124418');
  const [cvv2, setCvv2] = useState('742');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('06');
  const [dynamicOtp, setDynamicOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(120);
  const [captchaCode, setCaptchaCode] = useState('8419');
  const [userCaptcha, setUserCaptcha] = useState('8419');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Randomize captcha
  const generateCaptcha = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaCode(code);
    setUserCaptcha(code); // pre-fill for convenience
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setPaymentState('idle');
      setOtpSent(false);
      setDynamicOtp('');
      setErrorMessage('');
    }
  }, [isOpen]);

  // OTP Countdown timer
  useEffect(() => {
    let timer: any;
    if (otpSent && otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    } else if (otpCountdown === 0) {
      setOtpSent(false);
      setOtpCountdown(120);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpCountdown]);

  const handleRequestOtp = () => {
    setOtpSent(true);
    setOtpCountdown(120);
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setTimeout(() => {
      setDynamicOtp(mockOtp);
    }, 800);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cardNumber.replace(/\D/g, '').length < 16) {
      setErrorMessage('شماره کارت باید ۱۶ رقم باشد.');
      return;
    }
    if (!cvv2 || cvv2.length < 3) {
      setErrorMessage('کد CVV2 نامعتبر است.');
      return;
    }
    if (!dynamicOtp) {
      setErrorMessage('لطفاً ابتدا رمز دوم پویا را دریافت و وارد نمایید.');
      return;
    }
    if (userCaptcha !== captchaCode) {
      setErrorMessage('کد امنیتی تصویر صحیح نیست.');
      return;
    }

    setIsProcessing(true);
    setPaymentState('processing');

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentState('success');
      
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // confetti fallback
      }

      const rawNum = cardNumber.replace(/\D/g, '');
      const masked = `${rawNum.slice(0, 4)}-${rawNum.slice(4, 6)}**-****-${rawNum.slice(12, 16)}`;
      const trackingCode = `SEP-${Math.floor(1000000 + Math.random() * 9000000)}`;
      const referenceNumber = `${Math.floor(10000000000 + Math.random() * 90000000000)}`;

      onPaymentSuccess({
        trackingCode,
        referenceNumber,
        amount,
        gateway: 'به‌پرداخت ملت',
        cardNumberMasked: toPersianDigits(masked)
      });
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Gateway Header */}
        <div className="bg-gradient-to-l from-red-700 via-red-600 to-rose-700 text-white p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-xs">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">درگاه پرداخت اینترنتی شاپرک</h3>
                <p className="text-xs text-rose-100 opacity-90 mt-0.5">به‌پرداخت ملت | موسسه غیرانتفاعی سپاهان</p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Payment Summary Box */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">پذیرنده:</span>
              <span className="font-semibold text-slate-800">موسسه آموزش عالی سپاهان</span>
            </div>
            <div>
              <span className="text-slate-500 block">دانشجو:</span>
              <span className="font-semibold text-slate-800">{studentName} ({toPersianDigits(studentCode)})</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-slate-600 font-medium">مبلغ قابل پرداخت:</span>
              <div className="text-left">
                <span className="font-bold text-base sm:text-lg text-emerald-700 font-mono tabular-nums">
                  {formatTomans(amount)}
                </span>
                <span className="text-[11px] text-slate-400 block font-mono tabular-nums">
                  ({formatRials(amount)})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on payment state */}
        {paymentState === 'processing' ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <h4 className="text-base font-bold text-slate-800">در حال برقراری ارتباط با سامانه شاپرک و کسر وجه...</h4>
            <p className="text-xs text-slate-500">لطفاً تا پایان فرآیند صفحه را نبندید و کلید بازگشت را نزنید.</p>
          </div>
        ) : paymentState === 'success' ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-in zoom-in-50 duration-300">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">پرداخت با موفقیت انجام شد</h4>
            <p className="text-xs text-slate-600">
              تراکنش با موفقیت در سیستم مالی موسسه آموزش عالی سپاهان ثبت گردید و حساب شما به‌روزرسانی شد.
            </p>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-right text-xs space-y-1 font-mono tabular-nums">
              <div className="flex justify-between">
                <span className="text-slate-600 font-sans">مبلغ پرداختی:</span>
                <span className="font-bold text-emerald-900">{formatTomans(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-sans">وضعیت:</span>
                <span className="text-emerald-700 font-sans font-bold">تایید شده توسط بانک مرکزی</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition-colors cursor-pointer shadow-xs"
            >
              بازگشت به پرتال دانشجویی
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-4 sm:p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Card Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                شماره کارت بانکی (۱۶ رقمی)
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  dir="ltr"
                  className="w-full pl-10 pr-3 py-2 text-sm font-mono tracking-wider text-left bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-hidden"
                />
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* CVV2 and Expiration Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  کد شناسایی دوم (CVV2)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv2}
                    onChange={(e) => setCvv2(e.target.value)}
                    placeholder="3 یا 4 رقم"
                    dir="ltr"
                    className="w-full pl-8 pr-3 py-2 text-sm font-mono text-left bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-hidden"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  تاریخ انقضا (ماه / سال)
                </label>
                <div className="flex items-center gap-1.5" dir="ltr">
                  <input
                    type="text"
                    maxLength={2}
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                    placeholder="ماه"
                    className="w-1/2 px-2 py-2 text-sm font-mono text-center bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-hidden"
                  />
                  <span className="text-slate-400 font-bold">/</span>
                  <input
                    type="text"
                    maxLength={2}
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                    placeholder="سال"
                    className="w-1/2 px-2 py-2 text-sm font-mono text-center bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic SMS OTP */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  رمز دوم پویا (پیامکی)
                </label>
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={otpSent && otpCountdown > 0}
                  className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer disabled:text-slate-400"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  {otpSent ? `ارسال مجدد (${toPersianDigits(otpCountdown)} ثانیه)` : 'دریافت رمز پویا'}
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  maxLength={6}
                  value={dynamicOtp}
                  onChange={(e) => setDynamicOtp(e.target.value)}
                  placeholder="رمز ارسالی به تلفن همراه"
                  dir="ltr"
                  className="w-full px-3 py-2 text-sm font-mono text-left bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-hidden"
                />
              </div>
              {otpSent && dynamicOtp && (
                <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  پیامک حاوی رمز پویا دریافت و در فیلد درج شد ({toPersianDigits(dynamicOtp)})
                </p>
              )}
            </div>

            {/* Security Captcha */}
            <div className="grid grid-cols-2 gap-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  کد امنیتی تصویر
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  placeholder="کد تصویر"
                  dir="ltr"
                  className="w-full px-3 py-2 text-sm font-mono text-center bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-hidden"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-slate-200 tracking-widest text-slate-800 font-mono font-bold text-lg px-3 py-1.5 rounded-xl select-none line-through border border-slate-300 flex-1 text-center">
                  {captchaCode}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  title="تغییر کد تصویر"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="pt-3 border-t border-slate-200 flex gap-3">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>پرداخت نهایی</span>
                <span className="text-xs bg-red-700 px-2 py-0.5 rounded font-mono tabular-nums">
                  {formatTomans(amount)}
                </span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </form>
        )}

        {/* Trust Footer */}
        <div className="bg-slate-100 px-4 py-2.5 text-center text-[10px] text-slate-500 border-t border-slate-200">
          سامانه پرداخت الکترونیک شاپرک تحت نظارت بانک مرکزی جمهوری اسلامی ایران
        </div>
      </div>
    </div>
  );
};
