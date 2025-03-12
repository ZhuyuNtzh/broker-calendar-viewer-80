
import React, { createContext, useContext, useState } from 'react';
import type { TimeSlot } from '@/utils/calendarUtils';

interface TimeSlotContextType {
  activeSlotId: string | null;
  setActiveSlotId: (id: string | null) => void;
  isSlotActive: (id: string) => boolean;
}

const TimeSlotContext = createContext<TimeSlotContextType | undefined>(undefined);

export const TimeSlotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);

  const isSlotActive = (id: string): boolean => {
    return activeSlotId === id;
  };

  return (
    <TimeSlotContext.Provider value={{ activeSlotId, setActiveSlotId, isSlotActive }}>
      {children}
    </TimeSlotContext.Provider>
  );
};

export const useTimeSlot = (): TimeSlotContextType => {
  const context = useContext(TimeSlotContext);
  if (context === undefined) {
    throw new Error('useTimeSlot must be used within a TimeSlotProvider');
  }
  return context;
};
