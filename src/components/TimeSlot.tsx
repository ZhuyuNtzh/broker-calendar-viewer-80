
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatTime, calculateTimeSlotPosition, getProjectColor, getTextColor } from '@/utils/calendarUtils';
import type { TimeSlot as TimeSlotType } from '@/utils/calendarUtils';
import TimeSlotOverlay from './TimeSlotOverlay';

interface TimeSlotProps {
  slot: TimeSlotType;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ slot }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { top, height } = calculateTimeSlotPosition(slot.startTime, slot.endTime);
  
  // Get the project name to use for coloring
  const colorSource = slot.associatedProject || slot.projectName;
  
  // Get dynamic color based on project name
  const backgroundColor = getProjectColor(colorSource, slot.isBrokerEvent);
  const textColor = getTextColor(backgroundColor);
  
  // Calculate width and position for overlapping events
  const columnCount = slot.columnCount || 1;
  const column = slot.column || 0;
  
  // Calculate width and left position as percentages
  const width = `calc(${100 / columnCount}% - 4px)`;  // Subtract a bit for spacing
  const left = `calc(${(column * 100) / columnCount}% + 2px)`; // Add a bit of margin
  
  const handleClick = () => {
    setIsOverlayOpen(true);
  };
  
  // Determine border style for broker events
  const borderStyle = slot.isBrokerEvent ? 
    { borderLeft: `3px solid ${getProjectColor(colorSource, false)}` } : {};
  
  // Add specific styling for cross-week events
  const crossWeekStyles = slot.isCrossWeek ? {
    borderRight: '4px dashed rgba(0,0,0,0.2)',
    borderBottom: '4px dashed rgba(0,0,0,0.2)',
  } : {};
  
  return (
    <>
      <div
        className={cn(
          'calendar-event absolute animate-scale-in cursor-pointer hover:brightness-95 transition-all',
          slot.isCrossWeek && 'cross-week-event'
        )}
        style={{ 
          top: `${top}px`, 
          height: `${height}px`,
          width,
          left,
          backgroundColor,
          color: textColor,
          ...borderStyle,
          ...crossWeekStyles
        }}
        onClick={handleClick}
      >
        <div className="p-2 h-full flex flex-col justify-between overflow-hidden">
          <div>
            <h4 className="font-medium text-sm truncate">
              {slot.projectName}
              {slot.isCrossWeek && <span className="ml-1">↪</span>}
            </h4>
            <div className="text-xs mt-1">
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
            </div>
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
