import { TimeSlot, getUniqueId } from '../utils/calendarUtils';

// Generate mock data for a week
export const generateMockTimeSlots = (currentDate: Date): TimeSlot[] => {
  const mockSlots: TimeSlot[] = [];
  
  // Projects
  const projects = [
    'Oceanview Residences',
    'Highland Park Towers',
    'Central Heights Condos',
    'Riverside Apartments',
    'Metro Lofts',
    'Parkside Gardens',
    'Sunset Hills Estate',
    'Downtown Collection',
  ];
  
  // Locations
  const locations = [
    'Main Office',
    'On-site Location',
    'Client Office',
    'Virtual Meeting',
    'Property Site',
  ];

  // Brokers
  const brokers = [
    'Sarah Johnson',
    'Michael Chen',
    'Emma Williams',
    'David Rodriguez',
    'Jessica Kim',
    'Robert Taylor',
    'Lisa Garcia',
    'John Smith',
  ];

  // Property time slots (existing slots)
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '09:00',
      endTime: '11:00',
      day: 1, // Monday
      projectName: projects[0],
      location: locations[0],
      isBooked: true,
      parties: 2,
      duration: 20,
      broker: brokers[0],
    },
    {
      id: getUniqueId(),
      startTime: '13:30',
      endTime: '15:00',
      day: 1, // Monday
      projectName: projects[1],
      location: locations[2],
      isBooked: false,
      parties: 3,
      duration: 30,
      broker: brokers[1],
    }
  );

  // Tuesday slots (day 2)
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '10:00',
      endTime: '12:30',
      day: 2, // Tuesday
      projectName: projects[2],
      location: locations[1],
      isBooked: true,
      parties: 1,
      duration: 25,
      broker: brokers[2],
    },
    {
      id: getUniqueId(),
      startTime: '15:00',
      endTime: '16:00',
      day: 2, // Tuesday
      projectName: projects[3],
      location: locations[0],
      isBooked: false,
      parties: 2,
      duration: 30,
      broker: brokers[3],
    }
  );

  // Wednesday slots (day 3)
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '09:30',
      endTime: '11:30',
      day: 3, // Wednesday
      projectName: projects[4],
      location: locations[3],
      isBooked: false,
      parties: 2,
      duration: 60,
      broker: brokers[4],
    }
  );

  // Thursday slots (day 4)
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '08:00',
      endTime: '10:00',
      day: 4, // Thursday
      projectName: projects[5],
      location: locations[4],
      isBooked: true,
      parties: 3,
      duration: 40,
      broker: brokers[5],
    },
    {
      id: getUniqueId(),
      startTime: '14:00',
      endTime: '16:30',
      day: 4, // Thursday
      projectName: projects[0],
      location: locations[2],
      isBooked: true,
      parties: 4,
      duration: 15,
      broker: brokers[0],
    }
  );

  // Friday slots (day 5)
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '11:00',
      endTime: '13:00',
      day: 5, // Friday
      projectName: projects[6],
      location: locations[1],
      isBooked: false,
      parties: 2,
      duration: 30,
      broker: brokers[6],
    },
    {
      id: getUniqueId(),
      startTime: '15:30',
      endTime: '17:00',
      day: 5, // Friday
      projectName: projects[7],
      location: locations[0],
      isBooked: true,
      parties: 1,
      duration: 90,
      broker: brokers[7],
    }
  );

  // Add broker events (personal calendar items)
  // Sarah Johnson's events
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '12:00',
      endTime: '13:00',
      day: 1, // Monday
      projectName: 'Lunch with Client',
      isBooked: true,
      broker: brokers[0],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '16:00',
      endTime: '17:00',
      day: 3, // Wednesday
      projectName: 'Team Meeting',
      isBooked: true,
      broker: brokers[0],
      isBrokerEvent: true,
    }
  );
  
  // Michael Chen's events
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '09:00',
      endTime: '10:00',
      day: 2, // Tuesday
      projectName: 'Property Inspection',
      isBooked: true,
      broker: brokers[1],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '14:00',
      endTime: '15:30',
      day: 5, // Friday
      projectName: 'Contract Review',
      isBooked: true,
      broker: brokers[1],
      isBrokerEvent: true,
    }
  );
  
  // Emma Williams's events
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '13:00',
      endTime: '14:00',
      day: 4, // Thursday
      projectName: 'Client Call',
      isBooked: true,
      broker: brokers[2],
      isBrokerEvent: true,
    }
  );

  return mockSlots;
};
