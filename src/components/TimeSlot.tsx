
import React from 'react';
import { cn } from '@/lib/utils';
import { formatTime, TimeSlot, calculateTimeSlotPosition } from '@/utils/calendarUtils';
import { Clock, MapPin } from 'lucide-react';

interface TimeSlotProps {
  slot: TimeSlot;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ slot }) => {
  const { top, height } = calculateTimeSlotPosition(slot.startTime, slot.endTime);
  
  const statusClass = slot.isBooked ? 'booked' : 'available';
  
  return (
    <div
      className={cn(
        'calendar-event animate-scale-in',
        statusClass
      )}
      style={{ 
        top: `${top}px`, 
        height: `${height}px` 
      }}
    >
      <div className="p-2 h-full flex flex-col justify-between overflow-hidden">
        <div>
          <h4 className="font-medium text-sm truncate">{slot.projectName}</h4>
          <div className="flex items-center text-xs text-gray-600 mt-1">
            <Clock size={12} className="mr-1" />
            <span>
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </span>
          </div>
          {slot.location && (
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <MapPin size={12} className="mr-1" />
              <span className="truncate">{slot.location}</span>
            </div>
          )}
        </div>
        
        <div className="mt-1 text-xs">
          {slot.parties && slot.duration && (
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="calendar-slot-pill">
                {slot.parties} {slot.parties === 1 ? 'party' : 'parties'}
              </span>
              <span className="calendar-slot-pill">
                {slot.duration} min each
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSlot;
