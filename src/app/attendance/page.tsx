'use client';
import '../../styles/attendance.css'; 
import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // ✅ Required for dateClick
import { formatDate } from '@fullcalendar/core';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Fragment } from 'react';
import { formatDateToKhmer } from '../utils/khmerDate';

type AttendanceEvent = {
	title: string;
	date: string;
	checkIn?: string;
	checkOut?: string;
};

export default function AttendancePage() {
	const [attendanceData] = useState<AttendanceEvent[]>([
		{
			title: 'Present',
			date: '2025-05-28',
			checkIn: '08:00 AM',
			checkOut: '05:00 PM',
		},
		{
			title: 'Absent',
			date: '2025-05-27',
		},
		{
			title: 'Present',
			date: '2025-05-26',
			checkIn: '08:15 AM',
			checkOut: '04:55 PM',
		},
		{
			title: 'Present',
			date: '2025-05-29',
			checkIn: '08:15 AM',
			checkOut: '',
		},
		{
			title: 'Present',
			date: '2025-05-30',
			checkIn: '',
			checkOut: '04:55 PM',
		},
	]);

  	const [selectedDateInfo, setSelectedDateInfo] = useState<AttendanceEvent[] | null>(null);
	const calendarRef = useRef<FullCalendar | null>(null);

	//Function click on Data
	const handleDateClick = (arg: { dateStr: string }) => {
		// Remove highlight from all day cells
		const allDayCells = document.querySelectorAll('.fc-daygrid-day');
		allDayCells.forEach((cell) =>
		cell.classList.remove('bg-blue-100', 'ring-2', 'ring-blue-400')
		);

		// Add highlight to clicked cell
		const clickedCell = document.querySelector(`.fc-daygrid-day[data-date="${arg.dateStr}"]`);
		if (clickedCell) {
		clickedCell.classList.add('bg-blue-100', 'ring-2', 'ring-blue-400');
		}

		// Show event detail
		const matched = attendanceData.filter((item) => item.date === arg.dateStr);
		setSelectedDateInfo(matched.length ? matched : [{ title: 'No Record', date: arg.dateStr }]);
	};

	//Formate Date Deatil
	function formatSimpleDate(dateStr: string) {
		const date = new Date(dateStr);
		const day = date.getDate();
		const weekday = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
		return `${day} ${weekday}`;
	}

  	return (
    	<>
		<div className="relative min-h-screen bg-white pb-24">
			<div className="p-6">
				<div className="calendar-container overflow-y-auto max-h-[calc(100vh-6rem)]">
					<FullCalendar
						ref={calendarRef}
						plugins={[dayGridPlugin, interactionPlugin]} //use interactionPlugin
						initialView="dayGridMonth"
						events={attendanceData}
						contentHeight="auto"
						headerToolbar={{
							left: '',
							center: 'title',
							right: '',
						}}
						titleFormat={(arg) => {
							const currentYear = new Date().getFullYear();
							const viewYear = arg.date.marker.getFullYear();

							return formatDateToKhmer(arg.date.marker, {
								showDay: false,
								showYear: viewYear !== currentYear
							});
						}}
						firstDay={1}
						dayMaxEventRows={2}
						dateClick={handleDateClick} // ✅ handle day click
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

				{/* Attendance Detail Section */}
				{selectedDateInfo?.[0]?.date && (
					<div className=" bg-[#00134608] pt-2 px-4 absolute w-full left-0 h-full">
						<div className="flex justify-between items-center">
							<h3 className="text-[16px]">
								<span className="font-semibold text-[26px]">{new Date(selectedDateInfo[0].date).getDate()}</span>{' '}
								{new Date(selectedDateInfo[0].date).toLocaleString('en-US', { weekday: 'short' }).toUpperCase()}
							</h3>
							<p className="text-[14px]">
								{selectedDateInfo.some(e => e.checkIn && e.checkOut)
									? 'អ្នក​មាន​វត្តមាន​ពេញ​មួយ​ថ្ងៃ​នេះ!' // Full attendance
									: selectedDateInfo.some(e => e.checkIn && !e.checkOut)
									? 'អ្នកមិនបានស្កេនចេញនៅថ្ងៃនេះទេ!' // Only check-in
									: selectedDateInfo.some(e => !e.checkIn && e.checkOut)
									? 'អ្នកមិនបានស្កេនចូលនៅថ្ងៃនេះទេ!' // Only check-out
									: 'អ្នកអវត្តមាន​ពេញ​មួយ​ថ្ងៃនេះ!'} {/* Absent */}
							</p>
						</div>
						<table className="min-w-full text-sm text-left text-gray-600">
							<tbody className="divide-y">
								{selectedDateInfo.map((event, index) => (
								<Fragment key={index}>
									{/* Check-in row */}
									<tr className='border-b border-[#00134608] h-[56px]'>
										<td className="w-[96px] py-2 font-semibold text-gray-700">ម៉ោងចូល</td>
										<td className="w-[4px] px-2">
											<div
												className={`h-[24px] w-[4px] rounded-[8px] ${
												selectedDateInfo.some(e => e.checkIn) ? 'bg-[#34D399]' : 'bg-[red]'
												}`}
											></div>
										</td>
										<td className="px-4 py-2 text-center" colSpan={3}>
											{event.checkIn ? event.checkIn : <span className="italic text-gray-400">--</span>}
										</td>
									</tr>
									
									{/* Check-out row */}
									<tr className='border-b border-[#00134608]'>
										<td className="py-2 font-semibold text-gray-700">ម៉ោងចេញ</td>
										<td className="w-[4px] px-2">
											<div
												className={`h-[24px] w-[4px] rounded-[8px] ${
												selectedDateInfo.some(e => e.checkOut) ? 'bg-[#34D399]' : 'bg-[red]'
												}`}
											></div>
										</td>
										<td className="px-4 py-2 text-center" colSpan={3}>
											{event.checkOut ? event.checkOut : <span className="italic text-gray-400">--</span>}
										</td>
									</tr>

									{/* Optional note row if no check-in/out and not 'No Record' */}
									{/* {!event.checkIn && !event.checkOut && event.title !== 'No Record' && (
									<tr className='border-0'>
										<td className="py-2 font-semibold text-gray-700">Note</td>
										<td className="px-4 py-2 italic text-gray-500" colSpan={3}>
											No time recorded
										</td>
									</tr>
									)} */}
								</Fragment>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
		<MobileBottomNav />
    	</>
  	);
}