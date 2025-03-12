
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { calculateTimeSlotPosition, formatTime, getProjectColor, getTextColor, type TimeSlot } from '@/utils/calendarUtils';
import TimeSlotOverlay from './TimeSlotOverlay';

interface TimeSlotProps {
  slot: TimeSlot;
  allTimeSlots?: TimeSlot[]; // Added to pass all time slots
}

const TimeSlotComponent: React.FC<TimeSlotProps> = ({ slot, allTimeSlots = [] }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
  const { top, height } = calculateTimeSlotPosition(slot.startTime, slot.endTime);
  
  // Get color based on project and event type
  const bgColor = slot.isBrokerEvent && slot.associatedProject
    ? getProjectColor(slot.associatedProject, true) // Use the light variant for broker events
    : getProjectColor(slot.projectName, slot.isBrokerEvent);
    
  const textColor = getTextColor(bgColor);
  
  // Calculate width based on column information (for overlapping events)
  const width = slot.columnCount ? `${100 / slot.columnCount}%` : '100%';
  const left = slot.column ? `${(slot.column * 100) / slot.columnCount!}%` : '0';
  
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
        onClick={() => setShowDetails(true)}
      >
        <div className="font-semibold truncate">{slot.projectName}</div>
        <div className="truncate">
          {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
        </div>
        {/* Render broker name for broker events */}
        {slot.isBrokerEvent && slot.broker && (
          <div className="text-[10px] mt-0.5 opacity-80 truncate">
            {slot.broker}
          </div>
        )}
      </div>
      
      <TimeSlotOverlay 
        slot={slot} 
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        allTimeSlots={allTimeSlots}
      />
    </>
  );
};

export default TimeSlotComponent;
