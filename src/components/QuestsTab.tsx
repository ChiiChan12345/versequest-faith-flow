import { useState } from 'react';
import { CheckCircle, Circle, Clock, Calendar, Flame, PlusCircle, Trophy, Star, Gift, RotateCcw } from 'lucide-react';
import { sampleQuests, userProgress, type Quest } from '@/data/questData';
import { WeeklyQuestChallenge } from '@/components/WeeklyQuestChallenge';
import { SeasonalQuest } from '@/components/SeasonalQuest';
import { QuestCompletionCelebration } from '@/components/QuestCompletionCelebration';
import { QuestCalendarView } from '@/components/QuestCalendarView';

type QuestSubTab = 'today' | 'weekly' | 'seasonal';

export const QuestsTab = () => {
  const [quests, setQuests] = useState(sampleQuests);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'gentle' | 'challenge' | 'bold' | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<QuestSubTab>('today');
  const [showCelebration, setShowCelebration] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const toggleQuestComplete = (questId: number) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, completed: !quest.completed } : quest
    ));
    
    // Show celebration for completed quest
    const quest = quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
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

  const getSubTabButtonClass = (tab: QuestSubTab) => {
    const baseClass = "flex-1 py-3 px-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 border-2";
    return activeSubTab === tab 
      ? `${baseClass} bg-slate-800 text-white border-slate-800 shadow-lg`
      : `${baseClass} bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm`;
  };

  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const renderQuestContent = () => {
    switch (activeSubTab) {
      case 'today':
        return (
          <div className="space-y-6">
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

            {/* Today's Quest List */}
            <div className="space-y-4">
              {selectedDifficulty && (
                <button 
                  onClick={() => setSelectedDifficulty(null)}
                  className="text-sm text-blue-600 hover:text-blue-700 underline transition-colors"
                >
                  Show All
                </button>
              )}
              
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
          </div>
        );
      
      case 'weekly':
        return <WeeklyQuestChallenge />;
      
      case 'seasonal':
        return <SeasonalQuest />;
      
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6 animate-gentle-fade-in">
      {/* Quest Completion Celebration */}
      {showCelebration && <QuestCompletionCelebration />}

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

      {/* Main Flip Card */}
      <div className="relative h-[600px] perspective-1000">
        <div 
          className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isCardFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side - Today's Verse with Landscape Background */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div 
              className="relative rounded-2xl shadow-xl h-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={handleCardFlip}
            >
              {/* Background Image with Blur */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
              />
              
              {/* Blur Overlay */}
              <div className="absolute inset-0 backdrop-blur-[2px] bg-black/30" />
              
              {/* Content Overlay */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
                <div className="text-center space-y-6 max-w-md">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                    <span className="text-3xl mr-3">✨</span>
                    Today's Verse
                  </h2>
                  <p className="text-xl leading-relaxed font-serif mb-6 text-shadow-lg">
                    "Therefore encourage one another and build each other up, just as in fact you are doing."
                  </p>
                  <p className="text-lg opacity-90 mb-8">1 Thessalonians 5:11</p>
                  
                  <div className="flex items-center justify-center text-white/80 animate-soft-pulse">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    <span className="text-sm">Tap to view quests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side - Quests */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="bg-white rounded-2xl shadow-xl h-full overflow-hidden">
              {/* Header with flip button */}
              <div className="bg-gradient-to-r from-slate-700 to-blue-700 text-white p-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg flex items-center">
                  <span className="text-xl mr-2">📋</span>
                  Quests
                </h3>
                <button 
                  onClick={handleCardFlip}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Tab Navigation */}
              <div className="p-4 border-b border-slate-100">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveSubTab('today')}
                    className={getSubTabButtonClass('today')}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setActiveSubTab('weekly')}
                    className={getSubTabButtonClass('weekly')}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setActiveSubTab('seasonal')}
                    className={getSubTabButtonClass('seasonal')}
                  >
                    Seasonal
                  </button>
                </div>
              </div>

              {/* Quest Content */}
              <div className="p-4 h-full overflow-y-auto pb-20">
                {renderQuestContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View - Only show when card is NOT flipped */}
      {!isCardFlipped && (
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <QuestCalendarView />
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 gentle-hover">
        <PlusCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
