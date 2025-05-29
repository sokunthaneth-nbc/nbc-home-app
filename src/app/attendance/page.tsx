'use client';

import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import MobileBottomNav from '@/components/MobileBottomNav';
import { formatDate } from '@fullcalendar/core';

export default function AttendancePage() {
	const [attendanceData] = useState([
		{ title: 'Present', date: '2025-05-28', backgroundColor: '#34D399' },
		{ title: 'Absent', date: '2025-05-27', backgroundColor: '#F87171' },
		{ title: 'Present', date: '2025-05-26', backgroundColor: '#34D399' },
	  ]);
	
	  const calendarRef = useRef<FullCalendar | null>(null);

	return (
		<>
			<div className="relative min-h-screen bg-white pb-24">
				<div className="p-6">
				<div className="calendar-container overflow-y-auto max-h-[calc(100vh-6rem)]">
					<FullCalendar
					ref={calendarRef}
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					events={attendanceData}
					contentHeight="auto"
					headerToolbar={{
						left: 'today',
						center: 'title',
						right: 'prev,next',
					}}
					titleFormat={(arg) => {
						const currentYear = new Date().getFullYear();
						const viewYear = arg.date.marker.getFullYear(); // ✅ marker is a native Date
					
						return formatDate(arg.date.marker, {
						  month: 'long',
						  ...(viewYear !== currentYear && { year: 'numeric' }), // ✅ adds year if needed
						});
					  }}
					firstDay={1}
					dayMaxEventRows={2}
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
						// Reset styles
						info.el.style.backgroundColor = 'transparent';
						info.el.style.border = 'none';
						info.el.style.padding = '0';
						info.el.style.margin = '0';
						info.el.style.display = 'block';
						info.el.style.height = '4px';
					  
						// Apply bottom border by title
						if (info.event.title === 'Present') {
						  info.el.style.borderBottom = '4px solid #34D399'; // Green
						} else if (info.event.title === 'Absent') {
						  info.el.style.borderBottom = '4px solid #F87171'; // Red
						} else {
						  info.el.style.borderBottom = '4px solid #9CA3AF'; // Optional: gray default
						}
					  }}
					  
					/>
				</div>
				</div>
			</div>
			<MobileBottomNav />
			</>	
	);
}
