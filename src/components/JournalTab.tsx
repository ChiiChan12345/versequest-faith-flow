
import { useState } from 'react';
import { Heart, Calendar, Smile, Meh, Frown, Save, Search } from 'lucide-react';

export const JournalTab = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<'joyful' | 'peaceful' | 'thoughtful' | null>(null);
  const [viewMode, setViewMode] = useState<'write' | 'entries'>('write');

  const moods = [
    { 
      id: 'joyful', 
      label: 'Joyful', 
      icon: '😊', 
      color: 'text-yellow-700 bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-300 shadow-yellow-100',
      hoverColor: 'hover:from-yellow-100 hover:to-orange-200',
      activeColor: 'from-yellow-200 to-orange-300 border-yellow-400 shadow-yellow-200'
    },
    { 
      id: 'peaceful', 
      label: 'Peaceful', 
      icon: '🕊️', 
      color: 'text-blue-700 bg-gradient-to-br from-blue-50 to-sky-100 border-blue-300 shadow-blue-100',
      hoverColor: 'hover:from-blue-100 hover:to-sky-200',
      activeColor: 'from-blue-200 to-sky-300 border-blue-400 shadow-blue-200'
    },
    { 
      id: 'thoughtful', 
      label: 'Thoughtful', 
      icon: '🤔', 
      color: 'text-purple-700 bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-300 shadow-purple-100',
      hoverColor: 'hover:from-purple-100 hover:to-indigo-200',
      activeColor: 'from-purple-200 to-indigo-300 border-purple-400 shadow-purple-200'
    }
  ];

  const samplePrompts = [
    "How did today's verse speak to your heart?",
    "What are you grateful for today?",
    "How did you see God working in your life?",
    "What spiritual challenge are you facing?",
    "How can you apply today's scripture tomorrow?"
  ];

  const sampleEntries = [
    {
      id: 1,
      date: 'Today',
      mood: 'joyful',
      preview: 'Reflecting on 1 Thessalonians 5:11 really challenged me to reach out to my sister...',
      wordCount: 234
    },
    {
      id: 2,
      date: 'Yesterday',
      mood: 'peaceful',
      preview: 'God\'s presence felt so real during my morning prayer time. The verse about being still...',
      wordCount: 189
    },
    {
      id: 3,
      date: '2 days ago',
      mood: 'thoughtful',
      preview: 'Struggling with forgiveness today. But remembering how Christ forgave me...',
      wordCount: 156
    }
  ];

  return (
    <div className="p-4 space-y-6 animate-gentle-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl animate-soft-scale-in">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <span className="text-3xl mr-3">📝</span>
          Spiritual Journal
        </h1>
        <p className="text-sm opacity-90">Reflect on your faith journey</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-1 shadow-inner">
        <button
          onClick={() => setViewMode('write')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
            viewMode === 'write' 
              ? 'bg-white text-slate-800 shadow-md transform scale-105' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          ✍️ Write Entry
        </button>
        <button
          onClick={() => setViewMode('entries')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
            viewMode === 'entries' 
              ? 'bg-white text-slate-800 shadow-md transform scale-105' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          📚 Past Entries
        </button>
      </div>

      {viewMode === 'write' ? (
        <div className="space-y-6">
          {/* Today's Prompt */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-5 shadow-md border-2 border-blue-200 animate-soft-scale-in">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-lg">
              <span className="text-2xl mr-3">💭</span>
              Today's Reflection Prompt
            </h3>
            <p className="text-slate-700 italic font-medium text-base">"{samplePrompts[0]}"</p>
          </div>

          {/* Mood Selection */}
          <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center text-lg">
              <span className="text-2xl mr-3">💫</span>
              How are you feeling spiritually?
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {moods.map(mood => {
                const isSelected = selectedMood === mood.id;
                return (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id as any)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 shadow-md ${
                      isSelected 
                        ? `${mood.color.replace('from-', 'from-').replace('to-', 'to-')} ${mood.activeColor} scale-105` 
                        : `bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-lg ${mood.hoverColor}`
                    }`}
                  >
                    <div className="text-3xl mb-2 animate-gentle-bounce">{mood.icon}</div>
                    <p className="text-sm font-semibold">{mood.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Writing Area */}
          <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 flex items-center text-lg">
                <span className="text-2xl mr-3">✨</span>
                Your Reflection
              </h3>
              <div className="flex items-center space-x-3 text-sm text-slate-500">
                <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200 font-medium">{currentEntry.length} characters</span>
                <span>•</span>
                <span className="bg-green-50 px-3 py-1 rounded-full border border-green-200 font-medium">~{Math.ceil(currentEntry.split(' ').length / 200)} min read</span>
              </div>
            </div>
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Share your thoughts, prayers, insights, and reflections here..."
              className="w-full h-40 p-4 border-2 border-green-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-slate-800 shadow-sm transition-all duration-300 hover:shadow-md"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-slate-500 flex items-center">
                <span className="text-green-500 mr-2">🔒</span>
                Auto-saved • Private & secure
              </span>
              <button className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                <Save className="w-4 h-4" />
                <span className="font-semibold">Save Entry</span>
              </button>
            </div>
          </div>

          {/* AI Devotional */}
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-2xl p-5 border-2 border-purple-200 shadow-md animate-soft-scale-in">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-lg">
              <span className="text-2xl mr-3">🤖</span>
              Today's AI Devotional
            </h3>
            <p className="text-slate-700 text-base leading-relaxed mb-4">
              Based on your reflection and today's verse, here's an encouraging thought: 
              Building each other up is one of the most beautiful ways we can live out our faith. 
              When we encourage others, we're reflecting God's love and creating a community of hope.
            </p>
            <div className="text-sm text-purple-700 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-xl inline-flex items-center border border-purple-200">
              <span className="mr-2">✅</span>
              <span className="font-medium">Theologically reviewed</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
            <input
              type="text"
              placeholder="Search your reflections..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 shadow-sm transition-all duration-300 hover:shadow-md"
            />
          </div>

          {/* Entries List */}
          <div className="space-y-4">
            {sampleEntries.map((entry, index) => {
              const mood = moods.find(m => m.id === entry.mood);
              
              return (
                <div 
                  key={entry.id} 
                  className="bg-white rounded-2xl p-5 shadow-md border-2 border-slate-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-gentle-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-semibold text-slate-800">{entry.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                      <span className="text-xl">{mood?.icon || '😊'}</span>
                      <span className="text-sm text-slate-600 capitalize font-medium">{entry.mood}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-base mb-3 leading-relaxed">{entry.preview}</p>
                  <div className="flex justify-between items-center text-sm text-slate-500">
                    <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200 font-medium">{entry.wordCount} words</span>
                    <button className="text-green-600 hover:text-green-700 font-semibold flex items-center transition-colors duration-200">
                      <span className="mr-1">📖</span>
                      Read more →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
