
import React from 'react';
import { X, MapPin, Clock, Calendar } from 'lucide-react';
import { formatTime } from '@/utils/calendarUtils';
import { Separator } from '@/components/ui/separator';
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
              
              {/* Time Slots Section - Only shown if available */}
              {slot.parties && slot.duration && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div className="font-medium">Time Slots</div>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1 ml-2">
                      {/* Time slots would be mapped here if needed */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSlotOverlay;
