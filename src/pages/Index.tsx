
import React, { useState, useMemo } from 'react';
import CalendarHeader from '@/components/CalendarHeader';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import { addWeeks, subWeeks } from 'date-fns';
import { generateMockTimeSlots } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const allTimeSlots = generateMockTimeSlots(currentDate);
  
  // Create a map of project names to broker names
  const projectBrokerMap = useMemo(() => {
    const map = new Map<string, string>();
    allTimeSlots
      .filter(slot => !slot.isBrokerEvent && slot.broker)
      .forEach(slot => {
        map.set(slot.projectName, slot.broker!);
      });
    return map;
  }, [allTimeSlots]);
  
  // Extract unique project names for filtering
  const projectNames = useMemo(() => {
    return Array.from(projectBrokerMap.keys());
  }, [projectBrokerMap]);
  
  // State for filter selections - default all selected
  const [selectedProjects, setSelectedProjects] = useState<string[]>(projectNames);
  
  // Filter time slots based on selected projects and their associated brokers
  const filteredTimeSlots = useMemo(() => {
    return allTimeSlots.filter(slot => {
      // For property slots
      if (!slot.isBrokerEvent) {
        return selectedProjects.includes(slot.projectName);
      }
      
      // For broker events - show only if the broker's property is selected
      if (slot.broker) {
        // Find if any of the selected projects has this broker
        return selectedProjects.some(projectName => 
          projectBrokerMap.get(projectName) === slot.broker
        );
      }
      
      return false;
    });
  }, [allTimeSlots, selectedProjects, projectBrokerMap]);

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

  const handleSelectAllProjects = () => {
    setSelectedProjects(projectNames);
  };

  const handleClearAllProjects = () => {
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
          
          {/* Filter Panel */}
          <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-fade-in">
            <div className="flex flex-col">
              {/* Properties Section */}
              <h3 className="text-lg font-medium mb-3">Properties</h3>
              
              {/* Select/Clear All for Properties */}
              <div className="flex justify-between text-sm mb-3">
                <button 
                  onClick={handleSelectAllProjects}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Select All
                </button>
                <button 
                  onClick={handleClearAllProjects}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {projectNames.map((projectName) => {
                  const brokerName = projectBrokerMap.get(projectName);
                  return (
                    <div key={projectName} className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`project-${projectName}`}
                          checked={selectedProjects.includes(projectName)}
                          onCheckedChange={(checked) => 
                            handleProjectFilterChange(projectName, checked === true)
                          }
                        />
                        <Label 
                          htmlFor={`project-${projectName}`}
                          className="text-sm cursor-pointer font-medium"
                        >
                          {projectName}
                        </Label>
                      </div>
                      
                      {brokerName && (
                        <div className="ml-6 mt-1 flex items-center text-xs text-gray-600">
                          <User size={12} className="mr-1" />
                          <span>{brokerName}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
