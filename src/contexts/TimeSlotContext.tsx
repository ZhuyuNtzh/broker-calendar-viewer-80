
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import type { TimeSlot } from '@/utils/calendarUtils';

interface TimeSlotContextType {
  activeSlotId: string | null;
  setActiveSlotId: (id: string | null) => void;
  isSlotActive: (id: string) => boolean;
  lastClickTime: React.MutableRefObject<number>;
}

const TimeSlotContext = createContext<TimeSlotContextType | undefined>(undefined);

export const TimeSlotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  // Track the last click time to prevent accidental double-clicks from closing the panel
  const lastClickTime = useRef<number>(0);

  const isSlotActive = (id: string): boolean => {
    return activeSlotId === id;
  };

  return (
    <TimeSlotContext.Provider value={{ activeSlotId, setActiveSlotId, isSlotActive, lastClickTime }}>
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
