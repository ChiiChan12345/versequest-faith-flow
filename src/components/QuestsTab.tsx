
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
      case 'gentle': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'challenge': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'bold': return 'bg-rose-100 text-rose-800 border-rose-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <div className="p-4 space-y-6">
      {/* Progress Stats - Moved to top */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-4 text-center shadow-lg text-white">
          <div className="flex items-center justify-center mb-2">
            <Flame className="w-6 h-6 mr-1" />
            <span className="text-2xl font-bold">{userProgress.currentStreak}</span>
          </div>
          <p className="text-xs opacity-90">Day Streak</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl p-4 text-center shadow-lg text-white">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-6 h-6 mr-1" />
            <span className="text-2xl font-bold">{userProgress.weeklyProgress}%</span>
          </div>
          <p className="text-xs opacity-90">Weekly Goal</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-4 text-center shadow-lg text-white">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-6 h-6 mr-1" />
            <span className="text-2xl font-bold">{userProgress.totalQuestsCompleted}</span>
          </div>
          <p className="text-xs opacity-90">Completed</p>
        </div>
      </div>

      {/* Daily Verse Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <span className="text-2xl mr-2">✨</span>
          Today's Verse
        </h2>
        <p className="text-sm leading-relaxed font-serif mb-3">
          "Therefore encourage one another and build each other up, just as in fact you are doing."
        </p>
        <p className="text-xs opacity-90">1 Thessalonians 5:11</p>
      </div>

      {/* Difficulty Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <span className="text-xl mr-2">🎯</span>
          Choose Your Path
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {(['gentle', 'challenge', 'bold'] as const).map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedDifficulty === difficulty 
                  ? getDifficultyColor(difficulty) 
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              <p className="text-sm font-medium">{getDifficultyLabel(difficulty)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quest List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <span className="text-xl mr-2">📋</span>
            Today's Quests
          </h3>
          {selectedDifficulty && (
            <button 
              onClick={() => setSelectedDifficulty(null)}
              className="text-sm text-blue-600 underline"
            >
              Show All
            </button>
          )}
        </div>
        
        {filteredQuests.map(quest => (
          <div key={quest.id} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-3">
              <button 
                onClick={() => toggleQuestComplete(quest.id)}
                className="mt-1 transition-colors"
              >
                {quest.completed ? (
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                )}
              </button>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${quest.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {quest.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(quest.difficulty)}`}>
                    {getDifficultyLabel(quest.difficulty)}
                  </span>
                </div>
                
                <p className="text-sm text-blue-700 font-serif italic">"{quest.verse}"</p>
                <p className={`text-sm ${quest.completed ? 'text-gray-500' : 'text-gray-700'}`}>
                  {quest.description}
                </p>
                
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {quest.estimatedTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
        <PlusCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
