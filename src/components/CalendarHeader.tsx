
import React from 'react';
import { Button } from '@/components/ui/button';
import { formatMonth, formatWeek } from '@/utils/calendarUtils';
import { Calendar, ChevronLeft, ChevronRight, Search, Settings, HelpCircle, Grid } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onTodayClick: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousWeek,
  onNextWeek,
  onTodayClick,
}) => {
  return (
    <div className="w-full flex flex-col space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            className="rounded-full calendar-header-button" 
            onClick={onTodayClick}
          >
            Today
          </Button>
          
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full calendar-header-button" 
              onClick={onPreviousWeek}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full calendar-header-button" 
              onClick={onNextWeek}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="ml-4">
            <h2 className="text-2xl font-medium text-gray-900">{formatMonth(currentDate)}</h2>
            <div className="text-sm text-gray-500">{formatWeek(currentDate)}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full calendar-header-button">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full calendar-header-button">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full calendar-header-button">
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center ml-4 border rounded-full p-1 bg-gray-50">
            <Button variant="outline" className="rounded-full h-8">
              Week <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
            <Button variant="ghost" className="rounded-full ml-1 h-8">
              <Calendar className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="rounded-full ml-1 h-8">
              <Grid className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
