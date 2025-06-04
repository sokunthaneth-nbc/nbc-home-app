'use client';
import '../../styles/attendance.css';
import { useEffect, useRef, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import MobileBottomNav from '@/components/MobileBottomNav';
import { khmerMonths, convertToKhmerNumber } from '../utils/khmerDate';
import { getAccessToken } from "@/lib/auth";

export default function AttendancePage() {
	const router = useRouter();
	const calendarRef = useRef<FullCalendar | null>(null);

	// State to store attendance data and selected date info
	const [attendance, setAttendance] = useState<any | null>(null);
	const [selectedDateInfo, setSelectedDateInfo] = useState<AttendanceEvent[] | null>(null);

	// Track currently displayed month
	const [currentMonth, setCurrentMonth] = useState<string>(() => new Date().toISOString().slice(0, 7));

	// Type for an attendance event
	type AttendanceEvent = {
		title: string;
		date: string;
		checkIn?: string;
		checkOut?: string;
	};

	const today = new Date();

	// Transform raw attendance data into FullCalendar event format
	const attendanceData: AttendanceEvent[] = attendance?.data?.map((data: any) => {
		const attendanceDate = new Date(data.attendanceDate);
		let title = '';
		if (attendanceDate > today) title = 'Future';
		else if (data.checkInTime || data.checkOutTime) title = 'Present';
		else title = 'Absent';
		return {
			title,
			date: data.attendanceDate,
			checkIn: data.checkInTime,
			checkOut: data.checkOutTime,
		};
	}).filter((event: AttendanceEvent) => event.title !== 'Future') || [];

	// Handle click on a calendar date
	const handleDateClick = (arg: { dateStr: string }) => {
		const selectedDate = new Date(arg.dateStr);
		selectedDate.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);

		// Remove previous highlights
		document.querySelectorAll('.fc-daygrid-day').forEach(cell =>
			cell.classList.remove('bg-blue-100', 'ring-2', 'ring-blue-400')
		);

		// Highlight clicked date
		const clickedCell = document.querySelector(`.fc-daygrid-day[data-date="${arg.dateStr}"]`);
		if (clickedCell) clickedCell.classList.add('bg-blue-100', 'ring-2', 'ring-blue-400');

		// Check if the selected date is in the future or has attendance records
		if (selectedDate > today) {
			setSelectedDateInfo([{ title: 'Further', date: arg.dateStr }]);
		} else {
			const matched = attendanceData.filter(item => item.date === arg.dateStr);
			setSelectedDateInfo(matched.length ? matched : [{ title: 'No Record', date: arg.dateStr }]);
		}
	};

	// Fetch attendance data on component mount or when month changes
	useEffect(() => {
		const fetchAttendance = async () => {
			const staff_id = localStorage.getItem("staff_id");
			const token = getAccessToken();
			if (!staff_id) return router.push('/login');

			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/attendance`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ staff_id, date: currentMonth }),
				});
				if (!res.ok) throw new Error("Failed to fetch attendance");

				const data = await res.json();
				setAttendance(data);
			} catch (err) {
				console.error("Attendance fetch error:", err);
			}
		};
		fetchAttendance();
	}, [router, currentMonth]);

	// Automatically select today's date after attendance is loaded
	useEffect(() => {
		if (attendance) {
			handleDateClick({ dateStr: new Date().toISOString().split('T')[0] });
		}
	}, [attendance]);

	// Manually fetch attendance when navigating calendar months
	const fetchAttendanceByMonth = async (month: string) => {
		const staff_id = localStorage.getItem("staff_id");
		const token = getAccessToken();
		if (!staff_id) return router.push('/login');
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/attendance`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ staff_id, date: month }),
			});
			if (!res.ok) throw new Error("Failed to fetch monthly attendance");
			const data = await res.json();
			setAttendance(data);
			setCurrentMonth(month);
		} catch (err) {
			console.error("Month fetch error:", err);
		}
	};

	return (
		<>
			<div className="relative bg-white dark:bg-[#001346] pb-[60px]">
				<div className="p-6">
					{/* Calendar Display */}
					<div className="calendar-container overflow-y-auto max-h-[calc(100vh-6rem)]">
						<FullCalendar
							ref={calendarRef}
							plugins={[dayGridPlugin, interactionPlugin]}
							initialView="dayGridMonth"
							initialDate={new Date()}
							events={attendanceData}
							contentHeight="auto"
							headerToolbar={{ left: 'customPrev', center: 'title', right: 'customToday' }}
							customButtons={{
								// Custom "Previous Month" Button
								customPrev: {
									text: '« ខែមុន',
									click: () => {
										const api = calendarRef.current?.getApi();
										if (!api) return;
										api.prev();
										setTimeout(() => {
											const d = api.getDate();
											const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
											fetchAttendanceByMonth(m);
										}, 0);
									},
								},
								// Custom "Today" Button
								customToday: {
									text: 'ថ្ងៃនេះ',
									click: () => {
										const api = calendarRef.current?.getApi();
										if (!api) return;
										api.today();
										setTimeout(() => {
											const d = new Date();
											const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
											fetchAttendanceByMonth(m);
											handleDateClick({ dateStr: d.toISOString().split('T')[0] });
										}, 0);
									},
								},
							}}
							// Custom title format in Khmer
							titleFormat={(arg) => {
								const y = arg.date.marker.getFullYear();
								const m = khmerMonths[arg.date.marker.getMonth()];
								return `${m}${y !== today.getFullYear() ? ' ' + convertToKhmerNumber(y) : ''}`;
							}}
							firstDay={1}
							dayMaxEventRows={2}
							dateClick={handleDateClick}
							// Customize day headers (Sun should be red)
							dayHeaderContent={(args) => {
								const s = args.date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
								const red = args.date.getDay() === 0;
								return { html: `<span style="color: ${red ? '#EF4444' : 'inherit'}">${s}</span>` };
							}}
							// Render colored bars under dates based on status
							eventDidMount={(info) => {
								info.el.style.cssText = 'background-color:transparent;border:none;padding:0;margin:0;display:block;height:4px;';
								const color = info.event.title === 'Present' ? '#34D399' : info.event.title === 'Absent' ? '#F87171' : '#9CA3AF';
								info.el.style.borderBottom = `4px solid ${color}`;
							}}
						/>
					</div>
				</div>

				{/* Display selected date's detail */}
				{selectedDateInfo?.[0]?.date && (
					<div className="bg-[#00134608] pt-2 px-4 min-h-[250px] w-full">
						<div className="flex justify-between items-center">
							<h3 className="text-[16px]">
								<span className="font-semibold text-[26px]">{new Date(selectedDateInfo[0].date).getDate()}</span>
								{' '}{new Date(selectedDateInfo[0].date).toLocaleString('en-US', { weekday: 'short' }).toUpperCase()}
							</h3>
							<p className="text-[14px]">
								{/* Dynamic summary based on check-in/check-out */}
								{selectedDateInfo.some(e => e.title === 'Further') ? 'នេះជាអនាគត' :
								selectedDateInfo.some(e => e.checkIn && e.checkOut) ? 'អ្នក​មាន​វត្តមាន​ពេញ​មួយ​ថ្ងៃ​នេះ!' :
								selectedDateInfo.some(e => e.checkIn && !e.checkOut) ? 'អ្នកមិនបានស្កេនចេញនៅថ្ងៃនេះទេ!' :
								selectedDateInfo.some(e => !e.checkIn && e.checkOut) ? 'អ្នកមិនបានស្កេនចូលនៅថ្ងៃនេះទេ!' :
								'អ្នកអវត្តមាន​ពេញ​មួយ​ថ្ងៃនេះ!'}
							</p>
						</div>

						{/* Attendance Detail Table */}
						<table className="min-w-full text-sm text-left text-gray-600">
							<tbody className="divide-y">
								{selectedDateInfo.map((event, index) => (
									<Fragment key={index}>
										<tr className='border-b border-[#00134608] dark:border-white h-[56px]'>
											<td className="w-[96px] py-2 font-semibold text-[#001346] dark:text-white">ម៉ោងចូល</td>
											<td className="w-[4px] px-2">
												<div className={`h-[24px] w-[4px] rounded-[8px] ${event.checkIn ? 'bg-[#34D399]' : 'bg-[red]'}`}></div>
											</td>
											<td className="px-4 py-2 text-center text-[#001346] dark:text-white" colSpan={3}>{event.checkIn || <span className="italic">--</span>}</td>
										</tr>
										<tr className='border-b border-[#00134608] dark:border-white'>
											<td className="py-2 font-semibold text-[#001346] dark:text-white">ម៉ោងចេញ</td>
											<td className="w-[4px] px-2">
												<div className={`h-[24px] w-[4px] rounded-[8px] ${event.checkOut ? 'bg-[#34D399]' : 'bg-[red]'}`}></div>
											</td>
											<td className="px-4 py-2 text-center text-[#001346] dark:text-white" colSpan={3}>{event.checkOut || <span className="italic">--</span>}</td>
										</tr>
										{/* Message for future dates */}
										{event.title === 'Further' && (
											<tr className="border-b border-[#00134608] dark:border-white">
												<td colSpan={5} className="py-4 text-center">
													<img src="/images/img-further.png" alt="Future" className="mx-auto h-24 pb-[20px] object-contain" />
													<p className="mt-2 text-[#001346] dark:text-white text-sm">មិនមានកំណត់ត្រាទេ</p>
												</td>
											</tr>
										)}
									</Fragment>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Bottom navigation for mobile */}
			<MobileBottomNav />
		</>
	);
}