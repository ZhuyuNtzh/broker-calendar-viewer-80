
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
    },
    // Adding more events for Sarah Johnson
    {
      id: getUniqueId(),
      startTime: '09:30',
      endTime: '10:30',
      day: 2, // Tuesday
      projectName: 'Market Research',
      isBooked: true,
      broker: brokers[0],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '14:30',
      endTime: '15:30',
      day: 5, // Friday
      projectName: 'Weekly Planning',
      isBooked: true,
      broker: brokers[0],
      isBrokerEvent: true,
    },
    // Overlapping with property showing
    {
      id: getUniqueId(),
      startTime: '10:00',
      endTime: '10:45',
      day: 1, // Monday - overlaps with Oceanview showing
      projectName: 'Emergency Call',
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
    },
    // Adding more events for Michael Chen
    {
      id: getUniqueId(),
      startTime: '11:30',
      endTime: '12:30',
      day: 1, // Monday
      projectName: 'Client Meeting',
      isBooked: true,
      broker: brokers[1],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '16:00',
      endTime: '17:00',
      day: 3, // Wednesday
      projectName: 'Professional Development',
      isBooked: true,
      broker: brokers[1],
      isBrokerEvent: true,
    },
    // Overlapping event
    {
      id: getUniqueId(),
      startTime: '14:00',
      endTime: '14:45',
      day: 1, // Monday - overlaps with property showing
      projectName: 'Urgent Client Call',
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
    },
    // Adding more events for Emma Williams
    {
      id: getUniqueId(),
      startTime: '08:30',
      endTime: '09:30',
      day: 1, // Monday
      projectName: 'Morning Review',
      isBooked: true,
      broker: brokers[2],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '15:00',
      endTime: '16:00',
      day: 3, // Wednesday
      projectName: 'Marketing Meeting',
      isBooked: true,
      broker: brokers[2],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '11:00',
      endTime: '12:30',
      day: 2, // Tuesday - overlaps with property showing
      projectName: 'Professional Photoshoot',
      isBooked: true,
      broker: brokers[2],
      isBrokerEvent: true,
    }
  );

  // David Rodriguez's events
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '08:00',
      endTime: '09:00',
      day: 1, // Monday
      projectName: 'Team Breakfast',
      isBooked: true,
      broker: brokers[3],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '12:30',
      endTime: '13:30',
      day: 3, // Wednesday
      projectName: 'Lunch and Learn',
      isBooked: true,
      broker: brokers[3],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '15:30',
      endTime: '16:15',
      day: 2, // Tuesday - overlaps with property event
      projectName: 'Virtual Tour Recording',
      isBooked: true,
      broker: brokers[3],
      isBrokerEvent: true,
    }
  );

  // Jessica Kim's events
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '10:00',
      endTime: '11:00',
      day: 2, // Tuesday
      projectName: 'Strategy Session',
      isBooked: true,
      broker: brokers[4],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '14:00',
      endTime: '15:00',
      day: 4, // Thursday
      projectName: 'New Listing Review',
      isBooked: true,
      broker: brokers[4],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '09:30',
      endTime: '10:45',
      day: 3, // Wednesday - overlaps with her own property showing
      projectName: 'Personal Appointment',
      isBooked: true,
      broker: brokers[4],
      isBrokerEvent: true,
    }
  );

  // Add events for the remaining brokers
  // Robert Taylor (broker 5)
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '11:00',
      endTime: '12:00',
      day: 1, // Monday
      projectName: 'Property Valuation',
      isBooked: true,
      broker: brokers[5],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '13:30',
      endTime: '14:30',
      day: 3, // Wednesday
      projectName: 'Department Meeting',
      isBooked: true,
      broker: brokers[5],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '08:45',
      endTime: '09:30',
      day: 4, // Thursday - overlaps with property showing
      projectName: 'Client Breakfast',
      isBooked: true,
      broker: brokers[5],
      isBrokerEvent: true,
    }
  );

  // Lisa Garcia (broker 6)
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '09:00',
      endTime: '10:00',
      day: 1, // Monday
      projectName: 'Staff Meeting',
      isBooked: true,
      broker: brokers[6],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '16:00',
      endTime: '17:00',
      day: 2, // Tuesday
      projectName: 'Client Follow-ups',
      isBooked: true,
      broker: brokers[6],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '11:30',
      endTime: '12:15',
      day: 5, // Friday - overlaps with property showing
      projectName: 'Quick Check-in',
      isBooked: true,
      broker: brokers[6],
      isBrokerEvent: true,
    }
  );

  // John Smith (broker 7)
  mockSlots.push(
    {
      id: getUniqueId(),
      startTime: '10:30',
      endTime: '11:30',
      day: 3, // Wednesday
      projectName: 'Networking Event',
      isBooked: true,
      broker: brokers[7],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '13:00',
      endTime: '14:00',
      day: 4, // Thursday
      projectName: 'Property Tour',
      isBooked: true,
      broker: brokers[7],
      isBrokerEvent: true,
    },
    {
      id: getUniqueId(),
      startTime: '15:45',
      endTime: '16:30',
      day: 5, // Friday - overlaps with property showing
      projectName: 'Client Meeting',
      isBooked: true,
      broker: brokers[7],
      isBrokerEvent: true,
    }
  );

  return mockSlots;
};
