
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const getQuestActivityData = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Sample data for demonstration
  const activities = {
    // Dates with daily quest completion
    questDates: [
      new Date(currentYear, currentMonth, 1),
      new Date(currentYear, currentMonth, 3),
      new Date(currentYear, currentMonth, 5),
      new Date(currentYear, currentMonth, 8),
      new Date(currentYear, currentMonth, 12),
      new Date(currentYear, currentMonth, 15),
      new Date(currentYear, currentMonth, 18),
      new Date(currentYear, currentMonth, 22),
    ],
    // Dates with journal entries
    journalDates: [
      new Date(currentYear, currentMonth, 2),
      new Date(currentYear, currentMonth, 5),
      new Date(currentYear, currentMonth, 9),
      new Date(currentYear, currentMonth, 13),
      new Date(currentYear, currentMonth, 16),
      new Date(currentYear, currentMonth, 20),
    ],
    // Dates with community participation
    communityDates: [
      new Date(currentYear, currentMonth, 7),
      new Date(currentYear, currentMonth, 14),
      new Date(currentYear, currentMonth, 21),
    ]
  };
  
  return activities;
};

export const QuestCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const activities = getQuestActivityData();
  
  const getDateActivities = (date: Date) => {
    const dateStr = date.toDateString();
    const activities = [];
    
    if (getQuestActivityData().questDates.some(d => d.toDateString() === dateStr)) {
      activities.push('quest');
    }
    if (getQuestActivityData().journalDates.some(d => d.toDateString() === dateStr)) {
      activities.push('journal');
    }
    if (getQuestActivityData().communityDates.some(d => d.toDateString() === dateStr)) {
      activities.push('community');
    }
    
    return activities;
  };

  const renderDayContent = (date: Date) => {
    const dayActivities = getDateActivities(date);
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <span className="text-sm">{date.getDate()}</span>
        
        {/* Activity Dots */}
        {dayActivities.length > 0 && (
          <div className="flex space-x-1 mt-1">
            {dayActivities.includes('quest') && (
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-soft-pulse"></div>
            )}
            {dayActivities.includes('journal') && (
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-soft-pulse"></div>
            )}
            {dayActivities.includes('community') && (
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-soft-pulse"></div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-800 flex items-center justify-center text-lg">
        <span className="text-xl mr-2">📅</span>
        Your Spiritual Journey
      </h3>
      
      {/* Legend */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100">
        <h4 className="font-medium text-slate-700 mb-3 text-center">Activity Legend</h4>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
            <span className="text-slate-600">Daily Quest</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-slate-600">Journal Entry</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-slate-600">Community</span>
          </div>
        </div>
      </div>
      
      {/* Calendar */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          showOutsideDays={false}
          className="mx-auto"
          components={{
            Day: ({ date }) => renderDayContent(date)
          }}
        />
      </div>
      
      {/* Selected Date Info */}
      {selectedDate && (
        <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 animate-gentle-fade-in">
          <h4 className="font-semibold text-slate-800 mb-2">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          {getDateActivities(selectedDate).length > 0 ? (
            <div className="space-y-2">
              {getDateActivities(selectedDate).map((activity, index) => (
                <div key={index} className="flex items-center text-sm text-slate-600">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    activity === 'quest' ? 'bg-emerald-500' :
                    activity === 'journal' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="capitalize">
                    {activity === 'quest' ? 'Completed daily quest' :
                     activity === 'journal' ? 'Made journal entry' :
                     'Participated in community'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No activities recorded for this day</p>
          )}
        </div>
      )}
    </div>
  );
};
