
import React, { useState, useMemo } from 'react';
import CalendarHeader from '@/components/CalendarHeader';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import { addWeeks, subWeeks } from 'date-fns';
import { generateMockTimeSlots } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const allTimeSlots = generateMockTimeSlots(currentDate);
  
  // Extract unique project names for filtering
  const projectNames = useMemo(() => {
    const uniqueProjects = new Set(allTimeSlots.map(slot => slot.projectName));
    return Array.from(uniqueProjects);
  }, [allTimeSlots]);
  
  // State for filter selections - default all selected
  const [selectedProjects, setSelectedProjects] = useState<string[]>(projectNames);
  
  // Filter time slots based on selected projects
  const filteredTimeSlots = useMemo(() => {
    return allTimeSlots.filter(slot => selectedProjects.includes(slot.projectName));
  }, [allTimeSlots, selectedProjects]);

  const handleProjectFilterChange = (projectName: string, checked: boolean) => {
    if (checked) {
      setSelectedProjects(prev => [...prev, projectName]);
    } else {
      setSelectedProjects(prev => prev.filter(name => name !== projectName));
    }
  };

  const handlePreviousWeek = () => {
    setCurrentDate(prev => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => addWeeks(prev, 1));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleSelectAll = () => {
    setSelectedProjects(projectNames);
  };

  const handleClearAll = () => {
    setSelectedProjects([]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-screen-2xl">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
          onTodayClick={handleTodayClick}
        />
        
        <div className="flex gap-6 mt-4">
          {/* Calendar Container */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
            <WeeklyCalendar 
              currentDate={currentDate} 
              timeSlots={filteredTimeSlots} 
            />
          </div>
          
          {/* Property Filter Panel */}
          <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-fade-in">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium mb-3">Properties</h3>
              
              {/* Select/Clear All */}
              <div className="flex justify-between text-sm mb-3">
                <button 
                  onClick={handleSelectAll}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Select All
                </button>
                <button 
                  onClick={handleClearAll}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {projectNames.map((projectName) => (
                  <div key={projectName} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`project-${projectName}`}
                      checked={selectedProjects.includes(projectName)}
                      onCheckedChange={(checked) => 
                        handleProjectFilterChange(projectName, checked === true)
                      }
                    />
                    <Label 
                      htmlFor={`project-${projectName}`}
                      className="text-sm cursor-pointer"
                    >
                      {projectName}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
