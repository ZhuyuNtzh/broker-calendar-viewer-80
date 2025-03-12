import { addDays, format, startOfWeek, parse, isToday } from 'date-fns';

export type TimeSlot = {
  id: string;
  startTime: string; // format: "HH:mm"
  endTime: string; // format: "HH:mm"
  day: number; // 0-6 (Sunday-Saturday)
  projectName: string;
  location?: string;
  isBooked: boolean;
  parties?: number;
  duration?: number; // in minutes
  broker?: string; // Broker name
  isBrokerEvent?: boolean; // Flag to identify broker events
  
  // Added fields for positioning
  column?: number; // For positioning when events overlap
  columnCount?: number; // Total number of columns needed
};

export const HOURS = Array.from({ length: 15 }, (_, i) => i + 6); // 6am to 8pm

export const formatTime = (time: string): string => {
  // Convert "HH:mm" to "h:mm a" (e.g., "9:00 AM")
  return format(parse(time, 'HH:mm', new Date()), 'h:mm a');
};

// Modified to return only Monday to Friday (5 days)
export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Start on Monday
  return Array.from({ length: 5 }, (_, i) => addDays(start, i)); // Only return 5 days
};

export const formatDay = (date: Date): string => {
  return format(date, 'EEE');
};

export const formatDayNumber = (date: Date): string => {
  return format(date, 'd');
};

export const formatMonth = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatWeek = (date: Date): string => {
  const weekNumber = Math.ceil(Number(format(date, 'w')));
  return `Week ${weekNumber}`;
};

export const checkIsToday = (date: Date): boolean => {
  return isToday(date);
};

export const calculateTimeSlotPosition = (
  startTime: string,
  endTime: string
): { top: number; height: number } => {
  // Convert time strings to minutes since 6am (our first hour)
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startMinutesSince6am = (startHour - 6) * 60 + startMinute;
  const endMinutesSince6am = (endHour - 6) * 60 + endMinute;
  
  // Calculate position (1 hour = 60px height)
  const top = (startMinutesSince6am / 60) * 60;
  const height = ((endMinutesSince6am - startMinutesSince6am) / 60) * 60;

  return { top, height };
};

export const getUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// New function to organize time slots by calculating overlaps
export const organizeTimeSlots = (slots: TimeSlot[]): TimeSlot[] => {
  if (!slots.length) return [];
  
  // Group slots by day
  const slotsByDay: Record<number, TimeSlot[]> = {};
  slots.forEach(slot => {
    if (!slotsByDay[slot.day]) {
      slotsByDay[slot.day] = [];
    }
    slotsByDay[slot.day].push(slot);
  });
  
  // Process each day's slots
  Object.keys(slotsByDay).forEach(dayKey => {
    const day = Number(dayKey);
    const daySlots = slotsByDay[day];
    
    // Sort slots by start time
    daySlots.sort((a, b) => {
      // Convert times to minutes for easy comparison
      const aStart = timeToMinutes(a.startTime);
      const bStart = timeToMinutes(b.startTime);
      
      if (aStart !== bStart) {
        return aStart - bStart;
      }
      
      // If start times are equal, sort by duration (shorter first)
      const aEnd = timeToMinutes(a.endTime);
      const bEnd = timeToMinutes(b.endTime);
      
      return (aEnd - aStart) - (bEnd - bStart);
    });
    
    // Find overlapping slots and assign columns
    assignColumns(daySlots);
  });
  
  // Flatten the grouped slots back to a single array
  return Object.values(slotsByDay).flat();
};

// Helper function to convert "HH:mm" time string to minutes
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Function to check if two time slots overlap
const doSlotsOverlap = (slot1: TimeSlot, slot2: TimeSlot): boolean => {
  const slot1Start = timeToMinutes(slot1.startTime);
  const slot1End = timeToMinutes(slot1.endTime);
  const slot2Start = timeToMinutes(slot2.startTime);
  const slot2End = timeToMinutes(slot2.endTime);
  
  // Two events overlap if one starts before the other ends and ends after the other starts
  return (slot1Start < slot2End && slot1End > slot2Start);
};

// Function to assign columns to overlapping slots
const assignColumns = (slots: TimeSlot[]): void => {
  if (!slots.length) return;
  
  // Create groups of overlapping events
  const groups: TimeSlot[][] = [];
  
  slots.forEach(slot => {
    // Try to find a group where this slot doesn't overlap with any slot
    let foundGroup = false;
    
    for (const group of groups) {
      // Check if the current slot overlaps with any slot in this group
      const hasOverlap = group.some(existingSlot => doSlotsOverlap(slot, existingSlot));
      
      if (!hasOverlap) {
        // If no overlap, add to this group
        group.push(slot);
        foundGroup = true;
        break;
      }
    }
    
    // If no suitable group found, create a new group
    if (!foundGroup) {
      groups.push([slot]);
    }
  });
  
  // For each slot, determine its column and the total columns needed
  const slotToColumnMap = new Map<string, { column: number, totalColumns: number }>();
  
  slots.forEach(slot => {
    // Find all slots that overlap with this one
    const overlappingSlots = slots.filter(otherSlot => 
      slot.id !== otherSlot.id && doSlotsOverlap(slot, otherSlot)
    );
    
    // If there are overlapping slots, assign columns
    if (overlappingSlots.length > 0) {
      // Find the max column among overlapping slots
      const usedColumns = new Set<number>();
      
      overlappingSlots.forEach(overlapSlot => {
        const info = slotToColumnMap.get(overlapSlot.id);
        if (info) {
          usedColumns.add(info.column);
        }
      });
      
      // Find the first available column
      let column = 0;
      while (usedColumns.has(column)) {
        column++;
      }
      
      // Calculate the total columns needed for this group
      const totalColumns = Math.max(
        ...Array.from(slotToColumnMap.values())
          .filter(info => overlappingSlots.some(s => slotToColumnMap.get(s.id)?.totalColumns === info.totalColumns))
          .map(info => info.totalColumns),
        column + 1
      );
      
      // Store the column info
      slotToColumnMap.set(slot.id, { column, totalColumns });
    } else {
      // If no overlaps, use column 0 with total columns of 1
      slotToColumnMap.set(slot.id, { column: 0, totalColumns: 1 });
    }
  });
  
  // Update slots with column information
  slots.forEach(slot => {
    const info = slotToColumnMap.get(slot.id);
    if (info) {
      slot.column = info.column;
      slot.columnCount = info.totalColumns;
    } else {
      slot.column = 0;
      slot.columnCount = 1;
    }
  });
};
