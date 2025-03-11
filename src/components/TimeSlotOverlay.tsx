
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
          
          {/* For future implementation - time slots within booking */}
          {/* 
          <Separator />
          <div className="space-y-2">
            <div className="font-medium text-gray-700">Time Slots</div>
            <div className="space-y-2">
              <div className="p-2 bg-gray-50 rounded-md">
                <div className="font-medium">9:00 AM - 9:30 AM</div>
                <div className="text-sm text-gray-600">John Doe</div>
              </div>
            </div>
          </div>
          */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeSlotOverlay;
