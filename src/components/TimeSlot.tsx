
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { calculateTimeSlotPosition, formatTime, getProjectColor, getTextColor, type TimeSlot } from '@/utils/calendarUtils';
import TimeSlotOverlay from './TimeSlotOverlay';
import { useTimeSlot } from '@/contexts/TimeSlotContext';

interface TimeSlotProps {
  slot: TimeSlot;
  allTimeSlots?: TimeSlot[];
}

const TimeSlotComponent: React.FC<TimeSlotProps> = ({ slot, allTimeSlots = [] }) => {
  const { activeSlotId, setActiveSlotId, isSlotActive, lastClickTime } = useTimeSlot();
  
  const { top, height } = calculateTimeSlotPosition(slot.startTime, slot.endTime);
  
  // Get color based on project and event type, taking into account the associated project for broker events
  const projectName = slot.isBrokerEvent ? slot.associatedProject || slot.projectName : slot.projectName;
  const bgColor = getProjectColor(projectName, slot.isBrokerEvent);
  const textColor = getTextColor(bgColor);
  
  // Calculate width based on column information (for overlapping events)
  const width = slot.columnCount ? `${100 / slot.columnCount}%` : '100%';
  const left = slot.column ? `${(slot.column * 100) / slot.columnCount!}%` : '0';
  
  // Clean up effect - if this time slot is unmounted while active, clear the active slot
  useEffect(() => {
    return () => {
      if (isSlotActive(slot.id)) {
        setActiveSlotId(null);
      }
    };
  }, [slot.id, isSlotActive, setActiveSlotId]);
  
  // Handle click to always set this slot as active
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    
    const now = Date.now();
    // Ensure we don't have double-click issues causing the panel to close
    lastClickTime.current = now;
    
    // Always set this slot as active, replacing any other active slot
    setActiveSlotId(slot.id);
  };
  
  return (
    <>
      <div
        className={cn(
          "absolute rounded-md px-2 py-1 text-xs font-medium flex flex-col justify-start overflow-hidden",
          slot.isBooked ? "border" : ""
        )}
        style={{
          top: `${top}px`,
          height: `${height}px`,
          width,
          left,
          backgroundColor: bgColor,
          color: textColor,
          borderColor: slot.isBooked ? (slot.isBrokerEvent ? 'transparent' : 'rgba(0,0,0,0.1)') : 'transparent',
        }}
        onClick={handleClick}
      >
        <div className="font-semibold truncate">{slot.projectName}</div>
        <div className="truncate">
          {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
        </div>
        {slot.isBrokerEvent && slot.broker && (
          <div className="text-[10px] mt-0.5 opacity-80 truncate">
            {slot.broker}
          </div>
        )}
      </div>
      
      <TimeSlotOverlay 
        slot={slot} 
        isOpen={isSlotActive(slot.id)}
        onClose={() => setActiveSlotId(null)}
        allTimeSlots={allTimeSlots}
      />
    </>
  );
};

export default TimeSlotComponent;
