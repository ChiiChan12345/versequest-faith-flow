
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
      case 'gentle': return 'bg-green-100 text-green-800 border-green-200';
      case 'challenge': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'bold': return 'bg-red-100 text-red-800 border-red-200';
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
      {/* Daily Verse Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Today's Verse</h2>
        <p className="text-sm leading-relaxed font-serif mb-3">
          "Therefore encourage one another and build each other up, just as in fact you are doing."
        </p>
        <p className="text-xs opacity-90">1 Thessalonians 5:11</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="flex items-center justify-center mb-2">
            <Flame className="w-5 h-5 text-orange-500 mr-1" />
            <span className="text-2xl font-bold text-gray-800">{userProgress.currentStreak}</span>
          </div>
          <p className="text-xs text-gray-600">Day Streak</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-green-500 mr-1" />
            <span className="text-2xl font-bold text-gray-800">{userProgress.weeklyProgress}%</span>
          </div>
          <p className="text-xs text-gray-600">Weekly Goal</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-blue-500 mr-1" />
            <span className="text-2xl font-bold text-gray-800">{userProgress.totalQuestsCompleted}</span>
          </div>
          <p className="text-xs text-gray-600">Completed</p>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">Choose Your Path</h3>
        <div className="grid grid-cols-3 gap-2">
          {(['gentle', 'challenge', 'bold'] as const).map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedDifficulty === difficulty 
                  ? getDifficultyColor(difficulty) 
                  : 'bg-white border-gray-200 hover:border-gray-300'
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
          <h3 className="font-semibold text-gray-800">Today's Quests</h3>
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
          <div key={quest.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-3">
              <button 
                onClick={() => toggleQuestComplete(quest.id)}
                className="mt-1 transition-colors"
              >
                {quest.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
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
                
                <p className="text-sm text-gray-600 font-serif italic">"{quest.verse}"</p>
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
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
        <PlusCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
