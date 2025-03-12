
import React, { useMemo } from 'react';
import { HOURS, TimeSlot, getWeekDays, formatDay, formatDayNumber, checkIsToday, organizeTimeSlots } from '@/utils/calendarUtils';
import TimeSlotComponent from './TimeSlot';
import { cn } from '@/lib/utils';

interface WeeklyCalendarProps {
  currentDate: Date;
  timeSlots: TimeSlot[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ currentDate, timeSlots }) => {
  const weekDays = getWeekDays(currentDate);
  
  // Organize time slots to handle overlaps
  const organizedTimeSlots = useMemo(() => {
    return organizeTimeSlots(timeSlots);
  }, [timeSlots]);
  
  return (
    <div className="w-full overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-[60px_repeat(5,1fr)] border-b">
        <div className="time-column"></div>
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={cn(
              "day-column p-2 text-center border-l",
              checkIsToday(day) && "bg-calendar-today-highlight"
            )}
          >
            <div className="text-sm uppercase font-medium text-gray-500">{formatDay(day)}</div>
            <div className={cn(
              "text-2xl font-medium mt-1",
              checkIsToday(day) ? "text-blue-500" : "text-gray-700"
            )}>
              {formatDayNumber(day)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="calendar-grid-container relative grid grid-cols-[60px_repeat(5,1fr)] overflow-y-auto no-scrollbar">
        {/* Time labels */}
        <div className="time-column">
          {HOURS.map((hour) => (
            <div key={hour} className="h-[60px] text-right pr-2 text-xs text-gray-500 font-medium relative">
              <span className="absolute top-[-9px] right-2">
                {hour === 12 ? '12:00 PM' : hour < 12 ? `${hour}:00 AM` : `${hour-12}:00 PM`}
              </span>
            </div>
          ))}
        </div>
        
        {/* Day columns */}
        {weekDays.map((day, dayIndex) => (
          <div 
            key={dayIndex} 
            className={cn(
              "day-column relative border-l",
              checkIsToday(day) && "bg-calendar-today-highlight"
            )}
          >
            {/* Hour grid lines */}
            {HOURS.map((hour) => (
              <div key={hour} className="h-[60px] border-b border-gray-100"></div>
            ))}
            
            {/* Time slots for this day */}
            {organizedTimeSlots
              .filter(slot => {
                // Filter by weekday (Monday=1, Tuesday=2, etc.)
                const slotDay = slot.day;
                // Only show slots for Monday-Friday (day 1-5)
                return slotDay >= 1 && slotDay <= 5;
              })
              .filter(slot => slot.day === dayIndex + 1) // Our day index is 1-based (Monday=1)
              .map(slot => (
                <TimeSlotComponent key={slot.id} slot={slot} />
              ))
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
