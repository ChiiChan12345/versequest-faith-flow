
import { useState } from 'react';
import { CheckCircle, Circle, Clock, Calendar, Flame, PlusCircle } from 'lucide-react';
import { sampleQuests, userProgress, type Quest } from '@/data/questData';

export const QuestsTab = () => {
  const [quests, setQuests] = useState(sampleQuests);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'gentle' | 'challenge' | 'bold' | null>(null);

  const toggleQuestComplete = (questId: number) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, completed: !quest.completed } : quest
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'gentle': return 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100';
      case 'challenge': return 'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100';
      case 'bold': return 'bg-rose-50 text-rose-700 border-rose-200 shadow-rose-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'gentle': return 'Gentle Growth';
      case 'challenge': return 'Faithful Challenge';
      case 'bold': return 'Bold Faith';
      default: return difficulty;
    }
  };

  const filteredQuests = selectedDifficulty 
    ? quests.filter(quest => quest.difficulty === selectedDifficulty)
    : quests;

  return (
    <div className="p-4 space-y-6 animate-gentle-fade-in">
      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-4 text-center shadow-lg text-white transform transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-2">
            <Flame className="w-5 h-5 mr-1 animate-soft-pulse" />
            <span className="text-2xl font-bold">{userProgress.currentStreak}</span>
          </div>
          <p className="text-xs opacity-90">Day Streak</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 text-center shadow-lg text-white transform transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 mr-1" />
            <span className="text-2xl font-bold">{userProgress.weeklyProgress}%</span>
          </div>
          <p className="text-xs opacity-90">Weekly Goal</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 text-center shadow-lg text-white transform transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 mr-1" />
            <span className="text-2xl font-bold">{userProgress.totalQuestsCompleted}</span>
          </div>
          <p className="text-xs opacity-90">Completed</p>
        </div>
      </div>

      {/* Daily Verse Section */}
      <div className="bg-gradient-to-br from-slate-700 via-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-xl animate-soft-scale-in">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <span className="text-2xl mr-2">✨</span>
          Today's Verse
        </h2>
        <p className="text-base leading-relaxed font-serif mb-3 text-blue-50">
          "Therefore encourage one another and build each other up, just as in fact you are doing."
        </p>
        <p className="text-sm opacity-90 text-blue-200">1 Thessalonians 5:11</p>
      </div>

      {/* Difficulty Filter */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-800 flex items-center text-lg">
          <span className="text-xl mr-2">🎯</span>
          Choose Your Path
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(['gentle', 'challenge', 'bold'] as const).map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 gentle-hover ${
                selectedDifficulty === difficulty 
                  ? getDifficultyColor(difficulty) 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
              }`}
            >
              <p className="text-sm font-semibold">{getDifficultyLabel(difficulty)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quest List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 flex items-center text-lg">
            <span className="text-xl mr-2">📋</span>
            Today's Quests
          </h3>
          {selectedDifficulty && (
            <button 
              onClick={() => setSelectedDifficulty(null)}
              className="text-sm text-blue-600 hover:text-blue-700 underline transition-colors"
            >
              Show All
            </button>
          )}
        </div>
        
        {filteredQuests.map((quest, index) => (
          <div 
            key={quest.id} 
            className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 quest-card animate-gentle-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start space-x-4">
              <button 
                onClick={() => toggleQuestComplete(quest.id)}
                className="mt-1 transition-all duration-300 transform hover:scale-110"
              >
                {quest.completed ? (
                  <CheckCircle className="w-7 h-7 text-emerald-500 animate-gentle-bounce" />
                ) : (
                  <Circle className="w-7 h-7 text-slate-400 hover:text-slate-600" />
                )}
              </button>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold text-lg ${quest.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {quest.title}
                  </h4>
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getDifficultyColor(quest.difficulty)}`}>
                    {getDifficultyLabel(quest.difficulty)}
                  </span>
                </div>
                
                <p className={`text-base leading-relaxed ${quest.completed ? 'text-slate-500' : 'text-slate-700'}`}>
                  {quest.description}
                </p>
                
                <div className="flex items-center text-sm text-slate-500 bg-slate-50 px-3 py-2 rounded-lg w-fit">
                  <Clock className="w-4 h-4 mr-2 text-slate-400" />
                  {quest.estimatedTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 gentle-hover">
        <PlusCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
