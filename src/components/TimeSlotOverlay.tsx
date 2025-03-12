
import React from 'react';
import { X, User, MapPin, Clock, ArrowRight, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatTime } from '@/utils/calendarUtils';
import { Separator } from '@/components/ui/separator';
import type { TimeSlot } from '@/utils/calendarUtils';
import { format } from 'date-fns';

interface TimeSlotOverlayProps {
  slot: TimeSlot | null;
  isOpen: boolean;
  onClose: () => void;
}

const TimeSlotOverlay: React.FC<TimeSlotOverlayProps> = ({ slot, isOpen, onClose }) => {
  if (!slot) return null;

  // Generate dummy time slots/parties if slot has parties and duration
  const timeSlots = [];
  if (slot.parties && slot.duration) {
    const startTimeMinutes = timeStringToMinutes(slot.startTime);
    const totalSlots = Math.floor(
      (timeStringToMinutes(slot.endTime) - startTimeMinutes) / slot.duration
    );
    
    // Generate dummy names based on slot info
    const partyNames = generatePartyNames(slot.projectName, slot.parties * totalSlots);
    
    for (let i = 0; i < totalSlots; i++) {
      const slotStartMinutes = startTimeMinutes + i * slot.duration;
      const slotEndMinutes = slotStartMinutes + slot.duration;
      
      const startTimeFormatted = minutesToTimeString(slotStartMinutes);
      const endTimeFormatted = minutesToTimeString(slotEndMinutes);
      
      const partiesForThisSlot = [];
      for (let j = 0; j < slot.parties; j++) {
        const partyIndex = i * slot.parties + j;
        if (partyIndex < partyNames.length) {
          partiesForThisSlot.push(partyNames[partyIndex]);
        }
      }
      
      timeSlots.push({
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
        parties: partiesForThisSlot
      });
    }
  }

  // Get today's date or mock date for display
  const today = new Date();
  const mockDate = today;

  // Mock zipcode for the location
  const zipcode = "10001"; // Default zipcode

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <DialogTitle className="text-xl font-semibold m-0">{slot.projectName}</DialogTitle>
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
        </DialogHeader>
        
        <div className="space-y-5 pt-2">
          {/* Time & Date Section */}
          <div className="flex items-center gap-6 ml-[52px]">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <div className="text-sm">
                <span className="font-medium">{formatTime(slot.startTime)}</span>
                <ArrowRight className="inline-block h-3 w-3 mx-1" />
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
          
          {timeSlots.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="font-medium">Time Slots</div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1 ml-2">
                  {timeSlots.map((timeSlot, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded-md">
                      <div className="font-medium text-sm">
                        {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
                      </div>
                      <div className="space-y-1 mt-1">
                        {timeSlot.parties.map((party, partyIndex) => (
                          <div key={partyIndex} className="text-sm text-gray-600">
                            {party}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper functions for time calculations
const timeStringToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTimeString = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Generate dummy party names
const generatePartyNames = (projectName: string, count: number): string[] => {
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 
    'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 
    'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 
    'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King'
  ];
  
  const parties = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * lastNames.length);
    parties.push(`${lastNames[randomIndex]} family`);
  }
  
  return parties;
};

export default TimeSlotOverlay;
