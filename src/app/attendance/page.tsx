'use client';
import '../../styles/attendance.css';
import { useEffect, useRef, useState, Fragment } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/core';
import MobileBottomNav from '@/components/MobileBottomNav';
import { formatDateToKhmer } from '../utils/khmerDate';

type AttendanceEvent = {
	title: string;
	date: string;
	checkIn?: string;
	checkOut?: string;
};

export default function AttendancePage() {
	const [attendanceData] = useState<AttendanceEvent[]>([
		{ title: 'Present', date: '2025-05-28', checkIn: '08:00 AM', checkOut: '05:00 PM' },
		{ title: 'Absent', date: '2025-05-27' },
		{ title: 'Present', date: '2025-05-26', checkIn: '08:15 AM', checkOut: '04:55 PM' },
		{ title: 'Present', date: '2025-05-29', checkIn: '08:15 AM', checkOut: '' },
		{ title: 'Present', date: '2025-05-30', checkIn: '', checkOut: '04:55 PM' },
		{ title: 'Present', date: new Date().toISOString().split('T')[0], checkIn: '06:55 AM', checkOut: '' },
	]);

	const [selectedDateInfo, setSelectedDateInfo] = useState<AttendanceEvent[] | null>(null);
	const calendarRef = useRef<FullCalendar | null>(null);

	useEffect(() => {
		const todayStr = new Date().toISOString().split('T')[0];
		handleDateClick({ dateStr: todayStr });
	}, []);

	const handleDateClick = (arg: { dateStr: string }) => {
		const selectedDate = new Date(arg.dateStr);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		selectedDate.setHours(0, 0, 0, 0);

		const allDayCells = document.querySelectorAll('.fc-daygrid-day');
		allDayCells.forEach((cell) =>
			cell.classList.remove('bg-blue-100', 'ring-2', 'ring-blue-400')
		);

		const clickedCell = document.querySelector(`.fc-daygrid-day[data-date="${arg.dateStr}"]`);
		if (clickedCell) {
			clickedCell.classList.add('bg-blue-100', 'ring-2', 'ring-blue-400');
		}

		if (selectedDate > today) {
			setSelectedDateInfo([{ title: 'Further', date: arg.dateStr }]);
		} else {
			const matched = attendanceData.filter((item) => item.date === arg.dateStr);
			setSelectedDateInfo(matched.length ? matched : [{ title: 'No Record', date: arg.dateStr }]);
		}
	};

	function formatSimpleDate(dateStr: string) {
		const date = new Date(dateStr);
		const day = date.getDate();
		const weekday = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
		return `${day} ${weekday}`;
	}

	return (
		<>
			<div className="relative bg-white dark:bg-[#001346] pb-[60px]">
				<div className="p-6">
					<div className="calendar-container overflow-y-auto max-h-[calc(100vh-6rem)]">
						<FullCalendar
							ref={calendarRef}
							plugins={[dayGridPlugin, interactionPlugin]}
							initialView="dayGridMonth"
							initialDate={new Date()}
							events={attendanceData}
							contentHeight="auto"
							headerToolbar={{
								left: 'prev',
								center: 'title',
								right: 'customToday',
							}}
							customButtons={{
								customToday: {
									text: 'Today',
									click: () => {
										const calendarApi = calendarRef.current?.getApi();
										if (!calendarApi) return;

										const today = new Date();
										const todayStr = today.toISOString().split('T')[0];

										calendarApi.today(); // Jump to today
										handleDateClick({ dateStr: todayStr }); // Highlight + show info
									},
								},
							}}
							titleFormat={(arg) => {
								const currentYear = new Date().getFullYear();
								const viewYear = arg.date.marker.getFullYear();
								return formatDateToKhmer(arg.date.marker, {
									showDay: false,
									showYear: viewYear !== currentYear,
								});
							}}
							firstDay={1}
							dayMaxEventRows={2}
							dateClick={handleDateClick}
							dayHeaderContent={(args) => {
								const shortName = args.date.toLocaleDateString('en-US', {
									weekday: 'short',
								}).charAt(0);
								const isSunday = args.date.getDay() === 0;
								return {
									html: `<span style="color: ${isSunday ? '#EF4444' : 'inherit'}">${shortName}</span>`,
								};
							}}
							eventDidMount={(info) => {
								info.el.style.backgroundColor = 'transparent';
								info.el.style.border = 'none';
								info.el.style.padding = '0';
								info.el.style.margin = '0';
								info.el.style.display = 'block';
								info.el.style.height = '4px';

								if (info.event.title === 'Present') {
									info.el.style.borderBottom = '4px solid #34D399';
								} else if (info.event.title === 'Absent') {
									info.el.style.borderBottom = '4px solid #F87171';
								} else {
									info.el.style.borderBottom = '4px solid #9CA3AF';
								}
							}}
						/>
					</div>
				</div>

				{/* Attendance Info Section */}
				{selectedDateInfo?.[0]?.date && (
					<div className="bg-[#00134608] pt-2 px-4 min-h-[250px] w-full">
						<div className="flex justify-between items-center">
							<h3 className="text-[16px]">
								<span className="font-semibold text-[26px]">
									{new Date(selectedDateInfo[0].date).getDate()}
								</span>{' '}
								{new Date(selectedDateInfo[0].date).toLocaleString('en-US', { weekday: 'short' }).toUpperCase()}
							</h3>
							<p className="text-[14px]">
								{selectedDateInfo.some(e => e.title === 'Further')
									? 'នេះជាអនាគត'
									: selectedDateInfo.some(e => e.checkIn && e.checkOut)
									? 'អ្នក​មាន​វត្តមាន​ពេញ​មួយ​ថ្ងៃ​នេះ!'
									: selectedDateInfo.some(e => e.checkIn && !e.checkOut)
									? 'អ្នកមិនបានស្កេនចេញនៅថ្ងៃនេះទេ!'
									: selectedDateInfo.some(e => !e.checkIn && e.checkOut)
									? 'អ្នកមិនបានស្កេនចូលនៅថ្ងៃនេះទេ!'
									: 'អ្នកអវត្តមាន​ពេញ​មួយ​ថ្ងៃនេះ!'}
							</p>
						</div>

						<table className="min-w-full text-sm text-left text-gray-600">
							<tbody className="divide-y">
								{selectedDateInfo.map((event, index) => (
									<Fragment key={index}>
										<tr className='border-b border-[#00134608] dark:border-white h-[56px]'>
											<td className="w-[96px] py-2 font-semibold text-[#001346] dark:text-white">ម៉ោងចូល</td>
											<td className="w-[4px] px-2">
												<div className={`h-[24px] w-[4px] rounded-[8px] ${event.checkIn ? 'bg-[#34D399]' : 'bg-[red]'}`}></div>
											</td>
											<td className="px-4 py-2 text-center text-[#001346] dark:text-white" colSpan={3}>
												{event.checkIn || <span className="italic">--</span>}
											</td>
										</tr>

										<tr className='border-b border-[#00134608] dark:border-white'>
											<td className="py-2 font-semibold text-[#001346] dark:text-white">ម៉ោងចេញ</td>
											<td className="w-[4px] px-2">
												<div className={`h-[24px] w-[4px] rounded-[8px] ${event.checkOut ? 'bg-[#34D399]' : 'bg-[red]'}`}></div>
											</td>
											<td className="px-4 py-2 text-center text-[#001346] dark:text-white" colSpan={3}>
												{event.checkOut || <span className="italic">--</span>}
											</td>
										</tr>

										{event.title === 'Further' && (
											<tr className="border-b border-[#00134608] dark:border-white">
												<td colSpan={5} className="py-4 text-center">
													<img
														src="/images/img-further.png"
														alt="Future"
														className="mx-auto h-24 pb-[20px] object-contain"
													/>
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

			<MobileBottomNav />
		</>
	);
}
