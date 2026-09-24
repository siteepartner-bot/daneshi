// Utility functions for Persian numbers, currency formatting, and schedule conflict calculations

export function toPersianDigits(n: number | string): string {
  if (n === null || n === undefined) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().replace(/\d/g, (x) => persianDigits[parseInt(x, 10)]);
}

export function formatRials(amount: number): string {
  const formatted = amount.toLocaleString('en-US');
  return `${toPersianDigits(formatted)} ریال`;
}

export function formatTomans(amountInRials: number): string {
  const tomans = Math.round(amountInRials / 10);
  const formatted = tomans.toLocaleString('en-US');
  return `${toPersianDigits(formatted)} تومان`;
}

export function parseTimeToMinutes(timeStr: string): number {
  // expects "HH:MM"
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  conflictType?: 'class_schedule' | 'exam_time';
  conflictingCourseName?: string;
  details?: string;
}

export function checkScheduleConflict(
  targetCourse: {
    id: string;
    name: string;
    schedule: { day: string; startTime: string; endTime: string }[];
    examDate: string;
    examTime: string;
  },
  existingCourses: {
    id: string;
    name: string;
    schedule: { day: string; startTime: string; endTime: string }[];
    examDate: string;
    examTime: string;
  }[]
): ConflictCheckResult {
  for (const existing of existingCourses) {
    if (existing.id === targetCourse.id) continue;

    // 1. Check Class Schedule Conflict
    for (const targetSlot of targetCourse.schedule) {
      for (const existingSlot of existing.schedule) {
        if (targetSlot.day === existingSlot.day) {
          const tStart = parseTimeToMinutes(targetSlot.startTime);
          const tEnd = parseTimeToMinutes(targetSlot.endTime);
          const eStart = parseTimeToMinutes(existingSlot.startTime);
          const eEnd = parseTimeToMinutes(existingSlot.endTime);

          // Overlap check
          if (Math.max(tStart, eStart) < Math.min(tEnd, eEnd)) {
            return {
              hasConflict: true,
              conflictType: 'class_schedule',
              conflictingCourseName: existing.name,
              details: `تداخل ساعت کلاسی در روز ${targetSlot.day} (${toPersianDigits(targetSlot.startTime)} تا ${toPersianDigits(targetSlot.endTime)}) با درس «${existing.name}»`
            };
          }
        }
      }
    }

    // 2. Check Exam Time Conflict
    if (targetCourse.examDate && existing.examDate && targetCourse.examDate === existing.examDate) {
      if (targetCourse.examTime && existing.examTime && targetCourse.examTime === existing.examTime) {
        return {
          hasConflict: true,
          conflictType: 'exam_time',
          conflictingCourseName: existing.name,
          details: `تداخل تاریخ و ساعت امتحان در تاریخ ${toPersianDigits(targetCourse.examDate)} (ساعت ${toPersianDigits(targetCourse.examTime)}) با درس «${existing.name}»`
        };
      }
    }
  }

  return { hasConflict: false };
}
