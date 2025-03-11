
import React, { useState, useMemo } from 'react';
import CalendarHeader from '@/components/CalendarHeader';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import { addWeeks, subWeeks } from 'date-fns';
import { generateMockTimeSlots } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const allTimeSlots = generateMockTimeSlots(currentDate);
  
  // Extract unique project names for filtering
  const projectNames = useMemo(() => {
    const uniqueProjects = new Set(
      allTimeSlots
        .filter(slot => !slot.isBrokerEvent)
        .map(slot => slot.projectName)
    );
    return Array.from(uniqueProjects);
  }, [allTimeSlots]);
  
  // Extract unique broker names for filtering
  const brokerNames = useMemo(() => {
    const uniqueBrokers = new Set(
      allTimeSlots
        .filter(slot => slot.broker)
        .map(slot => slot.broker!)
    );
    return Array.from(uniqueBrokers);
  }, [allTimeSlots]);
  
  // State for filter selections - default all selected
  const [selectedProjects, setSelectedProjects] = useState<string[]>(projectNames);
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>(brokerNames);
  const [showBrokerEvents, setShowBrokerEvents] = useState(true);
  
  // Filter time slots based on selected projects and brokers
  const filteredTimeSlots = useMemo(() => {
    return allTimeSlots.filter(slot => {
      // For property slots
      if (!slot.isBrokerEvent) {
        return selectedProjects.includes(slot.projectName);
      }
      
      // For broker events
      return showBrokerEvents && slot.broker && selectedBrokers.includes(slot.broker);
    });
  }, [allTimeSlots, selectedProjects, selectedBrokers, showBrokerEvents]);

  const handleProjectFilterChange = (projectName: string, checked: boolean) => {
    if (checked) {
      setSelectedProjects(prev => [...prev, projectName]);
    } else {
      setSelectedProjects(prev => prev.filter(name => name !== projectName));
    }
  };

  const handleBrokerFilterChange = (brokerName: string, checked: boolean) => {
    if (checked) {
      setSelectedBrokers(prev => [...prev, brokerName]);
    } else {
      setSelectedBrokers(prev => prev.filter(name => name !== brokerName));
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

  const handleSelectAllBrokers = () => {
    setSelectedBrokers(brokerNames);
  };

  const handleClearAllBrokers = () => {
    setSelectedBrokers([]);
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
              
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
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
              
              <Separator className="my-4" />
              
              {/* Brokers Section */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">Brokers</h3>
                <div className="flex items-center">
                  <Checkbox 
                    id="show-broker-events"
                    checked={showBrokerEvents}
                    onCheckedChange={(checked) => setShowBrokerEvents(checked === true)}
                  />
                  <Label 
                    htmlFor="show-broker-events"
                    className="text-xs ml-2 cursor-pointer"
                  >
                    Show events
                  </Label>
                </div>
              </div>
              
              {/* Select/Clear All for Brokers */}
              <div className="flex justify-between text-sm mb-3">
                <button 
                  onClick={handleSelectAllBrokers}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Select All
                </button>
                <button 
                  onClick={handleClearAllBrokers}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                {brokerNames.map((brokerName) => (
                  <div key={brokerName} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`broker-${brokerName}`}
                      checked={selectedBrokers.includes(brokerName)}
                      onCheckedChange={(checked) => 
                        handleBrokerFilterChange(brokerName, checked === true)
                      }
                    />
                    <Label 
                      htmlFor={`broker-${brokerName}`}
                      className="text-sm cursor-pointer"
                    >
                      {brokerName}
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
