// utils/khmerDate.ts

export  const khmerDays = ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
export  const khmerMonths = [
  'មករា', 'កម្ភៈ', 'មិនា', 'មេសា', 'ឧសភា', 'មិថុនា',
  'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
];

const khmerNumbers: Record<string, string> = {
  '0': '០', '1': '១', '2': '២', '3': '៣', '4': '៤',
  '5': '៥', '6': '៦', '7': '៧', '8': '៨', '9': '៩'
};

// ✅ Updated: support leading zero
export const convertToKhmerNumber = (num: number, padLength: number = 0): string => {
  const padded = num.toString().padStart(padLength, '0');
  return padded.split('').map(d => khmerNumbers[d] || d).join('');
};

export const formatDateToKhmer = (
  date: Date,
  options?: { showDayName?: boolean; showYear?: boolean }
): string => {
  const showDayName = options?.showDayName ?? false;
  const showYear = options?.showYear ?? true;

  const parts: string[] = [];

  const day = convertToKhmerNumber(date.getDate(), 2); // ✅ always 2 digits
  if (showDayName) {
    const dayName = khmerDays[date.getDay()];
    parts.push(`${dayName} ${day}`);
  } else {
    parts.push(day);
  }

  const month = khmerMonths[date.getMonth()];
  parts.push(month);

  if (showYear) {
    const year = convertToKhmerNumber(date.getFullYear());
    parts.push(year);
  }

  return parts.join(' ');
};