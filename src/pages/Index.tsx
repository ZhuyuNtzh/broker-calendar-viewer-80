
import React, { useState, useMemo } from 'react';
import CalendarHeader from '@/components/CalendarHeader';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import { addWeeks, subWeeks } from 'date-fns';
import { generateMockTimeSlots } from '@/data/mockData';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Calendar as CalendarIcon } from 'lucide-react';

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState<string>("ALL");
  const allTimeSlots = generateMockTimeSlots(currentDate);
  
  const projectBrokerMap = useMemo(() => {
    const map = new Map<string, string>();
    allTimeSlots
      .filter(slot => !slot.isBrokerEvent && slot.broker)
      .forEach(slot => {
        map.set(slot.projectName, slot.broker!);
      });
    return map;
  }, [allTimeSlots]);
  
  const projectNames = useMemo(() => {
    return Array.from(projectBrokerMap.keys());
  }, [projectBrokerMap]);
  
  const filteredTimeSlots = useMemo(() => {
    return allTimeSlots.filter(slot => {
      if (selectedProject === "ALL") {
        // Show only property events, no broker events
        return !slot.isBrokerEvent;
      }
      
      // For specific property, show both property events for that property
      // and the related broker's personal events
      if (!slot.isBrokerEvent) {
        return slot.projectName === selectedProject;
      }
      
      // Show broker events if they match the selected property's broker
      if (slot.isBrokerEvent && slot.broker) {
        return projectBrokerMap.get(selectedProject) === slot.broker;
      }
      
      return false;
    });
  }, [allTimeSlots, selectedProject, projectBrokerMap]);

  const handlePreviousWeek = () => {
    setCurrentDate(prev => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => addWeeks(prev, 1));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
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
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
            <WeeklyCalendar 
              currentDate={currentDate} 
              timeSlots={filteredTimeSlots} 
            />
          </div>
          
          <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-fade-in">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium mb-3">Properties</h3>
              
              <RadioGroup 
                value={selectedProject} 
                onValueChange={setSelectedProject} 
                className="space-y-3 max-h-[400px] overflow-y-auto pr-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ALL" id="project-all" />
                  <Label 
                    htmlFor="project-all"
                    className="text-sm cursor-pointer font-medium"
                  >
                    ALL Properties
                  </Label>
                </div>
                
                <Separator className="my-2" />
                
                {projectNames.map((projectName) => {
                  const brokerName = projectBrokerMap.get(projectName);
                  return (
                    <div key={projectName} className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={projectName} 
                          id={`project-${projectName}`} 
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
              </RadioGroup>
              
              {selectedProject !== "ALL" && (
                <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
                  <div className="flex items-center mb-1">
                    <CalendarIcon size={12} className="mr-1.5" />
                    <span className="font-medium">Realworks Data</span>
                  </div>
                  Showing Realworks calendar data for {projectBrokerMap.get(selectedProject)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
