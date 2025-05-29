'use client';

import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // ✅ Required for dateClick
import { formatDate } from '@fullcalendar/core';
import MobileBottomNav from '@/components/MobileBottomNav';

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
  ]);

  const [selectedDateInfo, setSelectedDateInfo] = useState<AttendanceEvent[] | null>(null);
  const calendarRef = useRef<FullCalendar | null>(null);

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

  return (
    <>
      <div className="relative min-h-screen bg-white pb-24">
        <div className="p-6">
          <div className="calendar-container overflow-y-auto max-h-[calc(100vh-6rem)]">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]} // ✅ use interactionPlugin
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
                const viewYear = arg.date.marker.getFullYear();
                return formatDate(arg.date.marker, {
                  month: 'long',
                  ...(viewYear !== currentYear && { year: 'numeric' }),
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
          {selectedDateInfo && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">
                Details for {selectedDateInfo[0].date}
              </h3>
              <ul className="space-y-2">
                {selectedDateInfo.map((event, index) => (
                  <li key={index}>
                    <div className="font-medium">{event.title}</div>
                    {event.checkIn && (
                      <div className="text-sm text-gray-600">Check-in: {event.checkIn}</div>
                    )}
                    {event.checkOut && (
                      <div className="text-sm text-gray-600">Check-out: {event.checkOut}</div>
                    )}
                    {!event.checkIn && !event.checkOut && event.title !== 'No Record' && (
                      <div className="text-sm text-gray-500 italic">No time recorded</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <MobileBottomNav />
    </>
  );
}