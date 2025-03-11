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
  broker?: string; // New field for broker name
};

export const HOURS = Array.from({ length: 15 }, (_, i) => i + 6); // 6am to 8pm

export const formatTime = (time: string): string => {
  // Convert "HH:mm" to "h:mm a" (e.g., "9:00 AM")
  return format(parse(time, 'HH:mm', new Date()), 'h:mm a');
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Start on Monday
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
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
