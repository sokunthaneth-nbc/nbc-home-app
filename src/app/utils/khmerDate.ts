// utils/khmerDate.ts
const khmerDays = ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
const khmerMonths = [
	'មករា', 'កម្ភៈ', 'មិនា', 'មេសា', 'ឧសភា', 'មិថុនា',
	'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
];

const khmerNumbers: Record<string, string> = {
	'0': '០', '1': '១', '2': '២', '3': '៣', '4': '៤',
	'5': '៥', '6': '៦', '7': '៧', '8': '៨', '9': '៩'
};

const convertToKhmerNumber = (num: number): string => {
  	return num.toString().split('').map(d => khmerNumbers[d] || d).join('');
};

export const formatDateToKhmer = (
	date: Date,
	options?: { showDay?: boolean; showYear?: boolean }
): string => {
	const showDay = options?.showDay ?? true;
	const showYear = options?.showYear ?? true;

	const parts: string[] = [];

	if (showDay) {
		const dayName = khmerDays[date.getDay()];
		const day = convertToKhmerNumber(date.getDate());
		parts.push(`${dayName} ${day}`);
	}

	const month = khmerMonths[date.getMonth()];
	parts.push(month);

	if (showYear) {
		const year = convertToKhmerNumber(date.getFullYear());
		parts.push(year);
	}

	return parts.join(' ');
};