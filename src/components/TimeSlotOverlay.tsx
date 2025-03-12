
import React from 'react';
import { X, MapPin, Clock, Calendar, User, ExternalLink } from 'lucide-react';
import { formatTime } from '@/utils/calendarUtils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import type { TimeSlot } from '@/utils/calendarUtils';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TimeSlotOverlayProps {
  slot: TimeSlot | null;
  isOpen: boolean;
  onClose: () => void;
}

const TimeSlotOverlay: React.FC<TimeSlotOverlayProps> = ({ slot, isOpen, onClose }) => {
  if (!slot) return null;

  // Get today's date or mock date for display
  const today = new Date();
  const mockDate = today;

  // Mock zipcode for the location
  const zipcode = "10001"; // Default zipcode

  // Mock time slot data
  const mockTimeSlots = [
    { time: '2:30 to 2:50', slot1: 'John Snow', slot2: 'Regula Jansen' },
    { time: '2:55 to 3:15', slot1: 'Arya Stark', slot2: 'Mark Zukerberg' },
    { time: '3:20 to 3:40', slot1: 'Tyrion Lannister', slot2: 'Tim Cook' },
    { time: '3:45 to 4:05', slot1: 'Daenerys Targaryen', slot2: 'Bill Gates' },
    { time: '4:10 to 4:30', slot1: 'Jon Snow', slot2: 'Steve Jobs' },
  ];

  // Generate time slots based on start and end time if duration and parties are provided
  const timeSlots = slot.parties && slot.duration ? 
    generateTimeSlots(slot.startTime, slot.endTime, slot.duration, slot.parties) : 
    mockTimeSlots;

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full bg-white shadow-lg z-50 w-full max-w-md transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <h2 className="text-xl font-semibold">{slot.projectName}</h2>
              </div>
              <button 
                className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-500 text-sm ml-[52px]">
              {slot.location || "No description provided"}
            </p>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-5">
              {/* Time & Date Section */}
              <div className="flex items-center gap-6 ml-[52px]">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <div className="text-sm">
                    <span className="font-medium">{formatTime(slot.startTime)}</span>
                    <span className="mx-1">-</span>
                    <span className="font-medium">{formatTime(slot.endTime)}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <div className="text-sm font-medium">
                    {format(mockDate, 'dd MMM yyyy')}
                  </div>
                </div>
              </div>
              
              {/* Location Section with Zipcode */}
              <div className="flex items-center ml-[52px]">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <div className="text-sm font-medium">{zipcode}</div>
              </div>
              
              {/* View Project Button */}
              <div className="ml-[52px] mt-2">
                <Button 
                  className="bg-black hover:bg-black/90 text-white"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Project
                </Button>
              </div>
              
              {/* Time Slots Section */}
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="font-medium">Time Slots</div>
                <div className="space-y-2">
                  {timeSlots.map((timeSlot, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <div className="text-sm font-medium text-gray-700 mb-2">{timeSlot.time}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-xs flex items-center">
                          <User className="h-3 w-3 mr-1 text-gray-500" />
                          <span>Slot 1: {timeSlot.slot1}</span>
                        </div>
                        <div className="text-xs flex items-center">
                          <User className="h-3 w-3 mr-1 text-gray-500" />
                          <span>Slot 2: {timeSlot.slot2}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to generate time slots
function generateTimeSlots(startTime: string, endTime: string, duration: number, parties: number) {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // Convert to minutes since midnight
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  
  // Total event time in minutes
  const totalTime = endMinutes - startMinutes;
  
  // Number of slots we can fit
  const numSlots = Math.floor(totalTime / duration);
  
  // Generate mock names for slots
  const names = [
    'John Snow', 'Arya Stark', 'Tyrion Lannister', 'Daenerys Targaryen',
    'Jon Snow', 'Sansa Stark', 'Cersei Lannister', 'Jaime Lannister',
    'Regula Jansen', 'Mark Zukerberg', 'Tim Cook', 'Bill Gates', 'Steve Jobs'
  ];
  
  // Generate time slots
  const slots = [];
  for (let i = 0; i < numSlots; i++) {
    const slotStartMinutes = startMinutes + i * duration;
    const slotEndMinutes = slotStartMinutes + duration - 5; // 5 minutes less to allow for transition
    
    const slotStartHour = Math.floor(slotStartMinutes / 60);
    const slotStartMinute = slotStartMinutes % 60;
    const slotEndHour = Math.floor(slotEndMinutes / 60);
    const slotEndMinute = slotEndMinutes % 60;
    
    const formatTimeNumber = (num: number) => num.toString().padStart(2, '0');
    
    const slotStartFormatted = `${slotStartHour > 12 ? slotStartHour - 12 : slotStartHour}:${formatTimeNumber(slotStartMinute)}`;
    const slotEndFormatted = `${slotEndHour > 12 ? slotEndHour - 12 : slotEndHour}:${formatTimeNumber(slotEndMinute)}`;
    
    // Randomly select names for each slot
    const randomIndex1 = Math.floor(Math.random() * names.length);
    let randomIndex2 = Math.floor(Math.random() * names.length);
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * names.length);
    }
    
    slots.push({
      time: `${slotStartFormatted} to ${slotEndFormatted}`,
      slot1: names[randomIndex1],
      slot2: names[randomIndex2]
    });
  }
  
  return slots;
}

export default TimeSlotOverlay;
