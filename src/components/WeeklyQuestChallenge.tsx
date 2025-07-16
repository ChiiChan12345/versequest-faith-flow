
import { useState } from 'react';
import { CheckCircle, Circle, Trophy, Star, Target } from 'lucide-react';

interface WeeklyCheckpoint {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  day: number;
}

const weeklyQuest = {
  title: "Acts of Compassion Challenge",
  description: "Spread kindness and compassion throughout your week with meaningful acts of service",
  totalDays: 7,
  currentDay: 3,
  checkpoints: [
    { id: 1, title: "Listen Deeply", description: "Have a meaningful conversation with someone who needs to be heard", completed: true, day: 1 },
    { id: 2, title: "Serve Anonymously", description: "Perform an act of service without seeking recognition", completed: true, day: 2 },
    { id: 3, title: "Encourage the Discouraged", description: "Send encouragement to someone going through a difficult time", completed: false, day: 3 },
    { id: 4, title: "Share Your Resources", description: "Give generously of your time, talents, or treasures", completed: false, day: 4 },
    { id: 5, title: "Practice Forgiveness", description: "Extend forgiveness to someone who has hurt you", completed: false, day: 5 },
    { id: 6, title: "Build Community", description: "Bring people together for fellowship and connection", completed: false, day: 6 },
    { id: 7, title: "Reflect and Celebrate", description: "Journal about your week of compassion and give thanks", completed: false, day: 7 }
  ] as WeeklyCheckpoint[]
};

export const WeeklyQuestChallenge = () => {
  const [checkpoints, setCheckpoints] = useState(weeklyQuest.checkpoints);
  
  const toggleCheckpoint = (checkpointId: number) => {
    setCheckpoints(prev => prev.map(checkpoint => 
      checkpoint.id === checkpointId ? { ...checkpoint, completed: !checkpoint.completed } : checkpoint
    ));
  };

  const completedCount = checkpoints.filter(c => c.completed).length;
  const progressPercentage = (completedCount / checkpoints.length) * 100;

  return (
    <div className="space-y-6">
      {/* Weekly Quest Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center mb-4">
          <Trophy className="w-8 h-8 mr-3 text-yellow-300" />
          <div>
            <h2 className="text-xl font-bold">{weeklyQuest.title}</h2>
            <p className="text-purple-100 text-sm">{weeklyQuest.description}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-purple-400/30 rounded-full h-3 mb-3">
          <div 
            className="bg-gradient-to-r from-yellow-300 to-orange-300 h-3 rounded-full transition-all duration-500 animate-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-purple-100">
          <span>{completedCount} of {checkpoints.length} completed</span>
          <span>Day {weeklyQuest.currentDay} of {weeklyQuest.totalDays}</span>
        </div>
      </div>

      {/* Weekly Checkpoints */}
      <div className="space-y-3">
        {checkpoints.map((checkpoint, index) => (
          <div 
            key={checkpoint.id}
            className={`bg-white rounded-xl p-5 shadow-md border transition-all duration-300 hover:scale-[1.02] ${
              checkpoint.day <= weeklyQuest.currentDay 
                ? 'border-purple-200 hover:shadow-lg' 
                : 'border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => checkpoint.day <= weeklyQuest.currentDay && toggleCheckpoint(checkpoint.id)}
                  className={`transition-all duration-300 transform hover:scale-110 ${
                    checkpoint.day > weeklyQuest.currentDay ? 'cursor-not-allowed' : ''
                  }`}
                  disabled={checkpoint.day > weeklyQuest.currentDay}
                >
                  {checkpoint.completed ? (
                    <CheckCircle className="w-7 h-7 text-emerald-500 animate-gentle-bounce" />
                  ) : checkpoint.day <= weeklyQuest.currentDay ? (
                    <Circle className="w-7 h-7 text-purple-400 hover:text-purple-600" />
                  ) : (
                    <Circle className="w-7 h-7 text-slate-300" />
                  )}
                </button>
                <span className={`text-xs mt-1 font-medium ${
                  checkpoint.day <= weeklyQuest.currentDay ? 'text-purple-600' : 'text-slate-400'
                }`}>
                  Day {checkpoint.day}
                </span>
              </div>
              
              <div className="flex-1">
                <h4 className={`font-semibold text-lg mb-2 ${
                  checkpoint.completed ? 'line-through text-slate-500' : 
                  checkpoint.day <= weeklyQuest.currentDay ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  {checkpoint.title}
                </h4>
                <p className={`text-base leading-relaxed ${
                  checkpoint.completed ? 'text-slate-500' : 
                  checkpoint.day <= weeklyQuest.currentDay ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {checkpoint.description}
                </p>
                
                {checkpoint.day === weeklyQuest.currentDay && !checkpoint.completed && (
                  <div className="mt-3 flex items-center text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-lg w-fit">
                    <Target className="w-4 h-4 mr-2" />
                    Today's Focus
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Completion Reward */}
      {completedCount === checkpoints.length && (
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white text-center animate-soft-scale-in">
          <Star className="w-12 h-12 mx-auto mb-3 animate-soft-pulse" />
          <h3 className="text-xl font-bold mb-2">Week Complete!</h3>
          <p className="text-yellow-100">You've shown incredible compassion this week. Your kindness has made a difference!</p>
        </div>
      )}
    </div>
  );
};
