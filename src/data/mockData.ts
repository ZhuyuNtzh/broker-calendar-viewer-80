import { addDays, format, startOfWeek, parse, isToday } from 'date-fns';
import { getUniqueId, organizeTimeSlots } from '@/utils/calendarUtils';
import type { TimeSlot } from '@/utils/calendarUtils';

// Helper function to generate a time slot
const createTimeSlot = (
  day: number,
  startTime: string,
  endTime: string,
  projectName: string,
  isBooked: boolean = false,
  location?: string,
  parties?: number,
  duration?: number,
  broker?: string,
  isBrokerEvent: boolean = false,
  associatedProject?: string
): TimeSlot => ({
  id: getUniqueId(),
  startTime,
  endTime,
  day,
  projectName,
  isBooked,
  location,
  parties,
  duration,
  broker,
  isBrokerEvent,
  associatedProject,
});

export const generateMockTimeSlots = (date: Date): TimeSlot[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Start on Monday
  
  // Calculate the date for each day of the week
  const monday = start;
  const tuesday = addDays(start, 1);
  const wednesday = addDays(start, 2);
  const thursday = addDays(start, 3);
  const friday = addDays(start, 4);

  // Format the dates to a readable string (e.g., "Jan 1, 2024")
  const mondayDate = format(monday, 'MMM d, yyyy');
  const tuesdayDate = format(tuesday, 'MMM d, yyyy');
  const wednesdayDate = format(wednesday, 'MMM d, yyyy');
  const thursdayDate = format(thursday, 'MMM d, yyyy');
  const fridayDate = format(friday, 'MMM d, yyyy');

  // Create property time slots
  const propertyTimeSlots: TimeSlot[] = [
    // Monday time slots
    createTimeSlot(0, "09:00", "10:00", "Sunset Apartments", true, "123 Main Street", 2, 30),
    createTimeSlot(0, "11:00", "12:30", "Ocean View Villas", false, "456 Beach Road", 3, 45),
    createTimeSlot(0, "14:00", "16:00", "Central Park Residences", true, "789 Park Avenue", 4, 60),
    
    // Tuesday time slots
    {
      id: getUniqueId(),
      startTime: "09:00",
      endTime: "11:30",
      day: 2, // Tuesday
      projectName: "Lakeside Villas",
      isBooked: true,
      location: "123 Lake Avenue",
      parties: 4,
      duration: 30
    },
    {
      id: getUniqueId(),
      startTime: "13:00",
      endTime: "14:30",
      day: 2, // Tuesday
      projectName: "Maple Terrace",
      isBooked: true,
      location: "456 Maple Street",
      parties: 3,
      duration: 25
    },
    
    // Wednesday time slots
    createTimeSlot(3, "10:00", "11:00", "Green Valley Estates", false, "321 Hilltop Road", 2, 20),
    createTimeSlot(3, "13:00", "14:30", "Pine Ridge Condos", true, "654 Forest Lane", 3, 35),
    createTimeSlot(3, "15:00", "17:00", "Sunset Apartments", false, "123 Main Street", 4, 50),
    
    // Thursday time slots
    {
      id: getUniqueId(),
      startTime: "10:00",
      endTime: "12:00",
      day: 4, // Thursday
      projectName: "Maple Terrace",
      isBooked: true,
      location: "456 Maple Street",
      parties: 3,
      duration: 25
    },
    {
      id: getUniqueId(),
      startTime: "14:00",
      endTime: "15:30",
      day: 4, // Thursday
      projectName: "Central Park Residences",
      isBooked: true,
      location: "789 Central Avenue",
      parties: 2,
      duration: 40
    },
    
    // Friday time slots
    createTimeSlot(5, "09:30", "11:00", "Ocean View Villas", true, "456 Beach Road", 3, 45),
    createTimeSlot(5, "12:00", "13:30", "Lakeside Villas", false, "123 Lake Avenue", 4, 60),
    createTimeSlot(5, "14:30", "16:00", "Green Valley Estates", true, "321 Hilltop Road", 2, 30),
  ];

  // Create broker event time slots
  const brokerTimeSlots: TimeSlot[] = [
    // Monday broker events
    createTimeSlot(1, "10:00", "11:00", "Client Meeting", true, undefined, undefined, undefined, "John Broker", true, "Sunset Apartments"),
    createTimeSlot(1, "14:00", "15:00", "Property Viewing", false, undefined, undefined, undefined, "Sarah Agent", true, "Ocean View Villas"),
    
    // Tuesday broker events
    {
      id: getUniqueId(),
      startTime: "09:00",
      endTime: "10:00",
      day: 2, // Tuesday
      projectName: "Broker Meeting",
      isBooked: true,
      isBrokerEvent: true,
      broker: "John Broker",
      associatedProject: "Lakeside Villas"
    },
    {
      id: getUniqueId(),
      startTime: "10:30",
      endTime: "11:30",
      day: 2, // Tuesday
      projectName: "Broker Training",
      isBooked: true,
      isBrokerEvent: true,
      broker: "Sarah Agent",
      associatedProject: "Maple Terrace"
    },
    
    // Thursday broker events
    {
      id: getUniqueId(),
      startTime: "09:00",
      endTime: "10:00",
      day: 4, // Thursday
      projectName: "Team Meeting",
      isBooked: true,
      isBrokerEvent: true,
      broker: "Sarah Agent",
      associatedProject: "Maple Terrace"
    },
    {
      id: getUniqueId(),
      startTime: "11:00",
      endTime: "12:00",
      day: 4, // Thursday
      projectName: "Client Call",
      isBooked: true,
      isBrokerEvent: true,
      broker: "Alex Realtor",
      associatedProject: "Central Park Residences"
    }
  ];

  // Combine all time slots
  let allTimeSlots = [...propertyTimeSlots, ...brokerTimeSlots];
  
  // Filter slots for the current week
  allTimeSlots = allTimeSlots.filter(slot => {
    const slotDate = addDays(start, slot.day);
    return slotDate >= start && slotDate < addDays(start, 5); // Only Monday to Friday
  });
  
  allTimeSlots = organizeTimeSlots(allTimeSlots);
  
  return allTimeSlots;
};
