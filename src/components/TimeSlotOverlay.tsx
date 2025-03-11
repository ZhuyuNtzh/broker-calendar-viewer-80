
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatTime } from '@/utils/calendarUtils';
import { Separator } from '@/components/ui/separator';
import type { TimeSlot } from '@/utils/calendarUtils';

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{slot.projectName}</DialogTitle>
          <button 
            className="absolute top-4 right-4 rounded-full p-1.5 hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="font-medium text-gray-700">Time</div>
            <div>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</div>
          </div>
          
          {slot.broker && (
            <div className="space-y-2">
              <div className="font-medium text-gray-700">Broker</div>
              <div>{slot.broker}</div>
            </div>
          )}
          
          <Separator />
          
          <div className="space-y-2">
            <div className="font-medium text-gray-700">Meta Information</div>
            <div className="space-y-1 text-sm">
              {slot.parties && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Simultaneous parties:</span>
                  <span>{slot.parties}</span>
                </div>
              )}
              {slot.duration && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Minutes per slot:</span>
                  <span>{slot.duration}</span>
                </div>
              )}
              {slot.location && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span>{slot.location}</span>
                </div>
              )}
            </div>
          </div>
          
          {timeSlots.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="font-medium text-gray-700">Time Slots</div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
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
