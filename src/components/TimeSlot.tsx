
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatTime, calculateTimeSlotPosition, getProjectColor, getTextColor } from '@/utils/calendarUtils';
import { User } from 'lucide-react';
import type { TimeSlot as TimeSlotType } from '@/utils/calendarUtils';
import TimeSlotOverlay from './TimeSlotOverlay';

interface TimeSlotProps {
  slot: TimeSlotType;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ slot }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { top, height } = calculateTimeSlotPosition(slot.startTime, slot.endTime);
  
  // Get dynamic color based on project name
  const backgroundColor = getProjectColor(slot.projectName, slot.isBrokerEvent);
  const textColor = slot.isBrokerEvent ? '#4b5563' : 'white';
  
  // Calculate width and position for overlapping events
  const columnCount = slot.columnCount || 1;
  const column = slot.column || 0;
  
  // Calculate width and left position as percentages
  const width = `calc(${100 / columnCount}% - 4px)`;  // Subtract a bit for spacing
  const left = `calc(${(column * 100) / columnCount}% + 2px)`; // Add a bit of margin
  
  // Check if this slot has multiple parties and time slots
  const hasBookingSlots = !slot.isBrokerEvent && slot.parties && slot.duration;
  
  const handleClick = () => {
    setIsOverlayOpen(true);
  };
  
  // Determine border style for broker events
  const borderStyle = slot.isBrokerEvent ? 
    { borderLeft: `3px solid ${getProjectColor(slot.projectName, false)}` } : {};
  
  return (
    <>
      <div
        className={cn(
          'calendar-event absolute animate-scale-in cursor-pointer hover:brightness-95 transition-all',
          hasBookingSlots && 'has-booking-slots'
        )}
        style={{ 
          top: `${top}px`, 
          height: `${height}px`,
          width,
          left,
          backgroundColor,
          color: textColor,
          ...borderStyle
        }}
        onClick={handleClick}
      >
        <div className="p-2 h-full flex flex-col justify-between overflow-hidden">
          <div>
            <h4 className="font-medium text-sm truncate">
              {slot.projectName}
            </h4>
            <div className="text-xs mt-1">
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </div>
            {slot.broker && (
              <div className="flex items-center text-xs mt-1">
                <User size={12} className="mr-1" />
                <span className="truncate">{slot.broker}</span>
              </div>
            )}
          </div>
          
          {hasBookingSlots && (
            <div className="text-xs mt-1">
              {Math.floor((timeToMinutes(slot.endTime) - timeToMinutes(slot.startTime)) / slot.duration)} time slots
            </div>
          )}
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

// Helper function to convert "HH:mm" to minutes since midnight
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export default TimeSlot;
