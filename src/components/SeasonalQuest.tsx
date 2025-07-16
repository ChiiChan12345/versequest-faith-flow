
import { useState } from 'react';
import { CheckCircle, Circle, Gift, Snowflake, Clock, Star } from 'lucide-react';

const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
};

const getSeasonalQuest = (season: string) => {
  const quests = {
    winter: {
      title: "Winter Light Challenge",
      description: "Bring warmth and light to others during the darkest season",
      icon: Snowflake,
      color: "from-blue-500 to-cyan-600",
      accentColor: "text-cyan-400",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      tasks: [
        { id: 1, title: "Light a Candle for Prayer", description: "Dedicate time each evening for candlelit prayer and reflection", completed: false },
        { id: 2, title: "Warm Someone's Heart", description: "Provide warm meals or clothing to those in need", completed: true },
        { id: 3, title: "Share Holiday Joy", description: "Organize or participate in holiday celebrations for the community", completed: false },
        { id: 4, title: "Practice Gratitude Daily", description: "Keep a gratitude journal throughout the winter season", completed: false },
        { id: 5, title: "Be a Light", description: "Encourage someone who is struggling with seasonal depression", completed: false }
      ]
    },
    spring: {
      title: "Renewal & Growth Challenge",
      description: "Embrace new beginnings and spiritual growth this spring",
      icon: Gift,
      color: "from-green-500 to-emerald-600",
      accentColor: "text-emerald-400",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      tasks: [
        { id: 1, title: "Plant Seeds of Faith", description: "Start a spiritual practice or deepen an existing one", completed: false },
        { id: 2, title: "Spring Cleaning", description: "Declutter your space and donate items to those in need", completed: false },
        { id: 3, title: "Cultivate Relationships", description: "Reconnect with old friends and nurture existing relationships", completed: false },
        { id: 4, title: "Nature Meditation", description: "Spend time in nature reflecting on God's creation", completed: false },
        { id: 5, title: "New Life Celebration", description: "Celebrate Easter and the resurrection with your community", completed: false }
      ]
    }
  };
  
  return quests[season as keyof typeof quests] || quests.winter;
};

const getNextSeasonCountdown = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  let nextSeasonDate: Date;
  let nextSeasonName: string;
  
  if (currentMonth < 2) {
    nextSeasonDate = new Date(currentYear, 2, 20); // Spring
    nextSeasonName = "Spring";
  } else if (currentMonth < 5) {
    nextSeasonDate = new Date(currentYear, 5, 21); // Summer
    nextSeasonName = "Summer";
  } else if (currentMonth < 8) {
    nextSeasonDate = new Date(currentYear, 8, 22); // Fall
    nextSeasonName = "Fall";
  } else if (currentMonth < 11) {
    nextSeasonDate = new Date(currentYear, 11, 21); // Winter
    nextSeasonName = "Winter";
  } else {
    nextSeasonDate = new Date(currentYear + 1, 2, 20); // Next Spring
    nextSeasonName = "Spring";
  }
  
  const timeDiff = nextSeasonDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return { daysLeft, nextSeasonName };
};

export const SeasonalQuest = () => {
  const currentSeason = getCurrentSeason();
  const seasonalQuest = getSeasonalQuest(currentSeason);
  const [tasks, setTasks] = useState(seasonalQuest.tasks);
  const { daysLeft, nextSeasonName } = getNextSeasonCountdown();
  
  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = (completedCount / tasks.length) * 100;
  const IconComponent = seasonalQuest.icon;

  return (
    <div className="space-y-6">
      {/* Seasonal Quest Header */}
      <div className={`bg-gradient-to-br ${seasonalQuest.color} rounded-2xl p-6 text-white shadow-xl`}>
        <div className="flex items-center mb-4">
          <IconComponent className="w-8 h-8 mr-3 text-white animate-soft-pulse" />
          <div>
            <h2 className="text-xl font-bold">{seasonalQuest.title}</h2>
            <p className="text-white/80 text-sm">{seasonalQuest.description}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-3 mb-3">
          <div 
            className="bg-white/80 h-3 rounded-full transition-all duration-500 animate-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-white/80">
          <span>{completedCount} of {tasks.length} completed</span>
          <span className="capitalize">{currentSeason} Season</span>
        </div>
      </div>

      {/* Seasonal Tasks */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div 
            key={task.id}
            className={`bg-white rounded-xl p-5 shadow-md border ${seasonalQuest.borderColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-gentle-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start space-x-4">
              <button 
                onClick={() => toggleTask(task.id)}
                className="mt-1 transition-all duration-300 transform hover:scale-110"
              >
                {task.completed ? (
                  <CheckCircle className="w-7 h-7 text-emerald-500 animate-gentle-bounce" />
                ) : (
                  <Circle className={`w-7 h-7 ${seasonalQuest.accentColor} hover:scale-110`} />
                )}
              </button>
              
              <div className="flex-1">
                <h4 className={`font-semibold text-lg mb-2 ${
                  task.completed ? 'line-through text-slate-500' : 'text-slate-800'
                }`}>
                  {task.title}
                </h4>
                <p className={`text-base leading-relaxed ${
                  task.completed ? 'text-slate-500' : 'text-slate-700'
                }`}>
                  {task.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Season Completion Reward */}
      {completedCount === tasks.length && (
        <div className={`bg-gradient-to-br ${seasonalQuest.color} rounded-2xl p-6 text-white text-center animate-soft-scale-in`}>
          <Star className="w-12 h-12 mx-auto mb-3 animate-soft-pulse" />
          <h3 className="text-xl font-bold mb-2">Season Complete!</h3>
          <p className="text-white/80">You've embraced the spirit of {currentSeason} beautifully. Your dedication shines bright!</p>
        </div>
      )}

      {/* Next Season Countdown */}
      <div className="bg-slate-100 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Clock className="w-5 h-5 mr-2 text-slate-600" />
          <h4 className="font-semibold text-slate-800">Next Season Quest</h4>
        </div>
        <p className="text-slate-600">
          {nextSeasonName} quests unlock in <span className="font-bold text-slate-800">{daysLeft} days</span>
        </p>
      </div>
    </div>
  );
};
