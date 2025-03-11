
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatTime, calculateTimeSlotPosition } from '@/utils/calendarUtils';
import { User } from 'lucide-react';
import type { TimeSlot as TimeSlotType } from '@/utils/calendarUtils';
import TimeSlotOverlay from './TimeSlotOverlay';

interface TimeSlotProps {
  slot: TimeSlotType;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ slot }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { top, height } = calculateTimeSlotPosition(slot.startTime, slot.endTime);
  
  // Determine status class
  let statusClass = '';
  if (slot.isBrokerEvent) {
    statusClass = 'broker-event';
  } else {
    statusClass = slot.isBooked ? 'booked' : 'available';
  }
  
  // Calculate width and left position based on column information
  const columnCount = slot.columnCount || 1;
  const column = slot.column || 0;
  
  // Calculate width as a percentage (minus small gap)
  const width = `calc(${100 / columnCount}% - 4px)`;
  
  // Calculate left position
  const left = `calc(${(column * 100) / columnCount}% + 2px)`;
  
  const handleClick = () => {
    setIsOverlayOpen(true);
  };
  
  return (
    <>
      <div
        className={cn(
          'calendar-event animate-scale-in cursor-pointer hover:brightness-95 transition-all',
          statusClass
        )}
        style={{ 
          top: `${top}px`, 
          height: `${height}px`,
          width,
          left,
          maxWidth: 'calc(100% - 4px)' // Ensure it doesn't overflow the cell
        }}
        onClick={handleClick}
      >
        <div className="p-2 h-full flex flex-col justify-between overflow-hidden">
          <div>
            <h4 className={cn(
              "font-medium text-sm truncate",
            )}>
              {slot.projectName}
            </h4>
            <div className={cn(
              "text-xs mt-1",
              slot.isBrokerEvent ? "text-gray-600" : "text-white/90"
            )}>
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </div>
            {slot.broker && (
              <div className={cn(
                "flex items-center text-xs mt-1",
                slot.isBrokerEvent ? "text-gray-600" : "text-white/90"
              )}>
                <User size={12} className="mr-1" />
                <span className="truncate">{slot.broker}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <TimeSlotOverlay 
        slot={slot}
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </>
  );
};

export default TimeSlot;
