
import { useState } from 'react';
import { Heart, Calendar, Smile, Meh, Frown, Save, Search } from 'lucide-react';

export const JournalTab = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<'joyful' | 'peaceful' | 'thoughtful' | null>(null);
  const [viewMode, setViewMode] = useState<'write' | 'entries'>('write');

  const moods = [
    { id: 'joyful', label: 'Joyful', icon: Smile, color: 'text-green-500 bg-green-50' },
    { id: 'peaceful', label: 'Peaceful', icon: Heart, color: 'text-blue-500 bg-blue-50' },
    { id: 'thoughtful', label: 'Thoughtful', icon: Meh, color: 'text-purple-500 bg-purple-50' }
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
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Spiritual Journal</h1>
        <p className="text-sm opacity-90">Reflect on your faith journey</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setViewMode('write')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'write' 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Write Entry
        </button>
        <button
          onClick={() => setViewMode('entries')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'entries' 
              ? 'bg-white text-gray-800 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Past Entries
        </button>
      </div>

      {viewMode === 'write' ? (
        <div className="space-y-6">
          {/* Today's Prompt */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Today's Reflection Prompt</h3>
            <p className="text-gray-600 italic">"{samplePrompts[0]}"</p>
          </div>

          {/* Mood Selection */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">How are you feeling spiritually?</h3>
            <div className="grid grid-cols-3 gap-3">
              {moods.map(mood => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.id;
                return (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id as any)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected 
                        ? `${mood.color} border-current` 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? '' : 'text-gray-400'}`} />
                    <p className="text-sm font-medium">{mood.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Writing Area */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Your Reflection</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{currentEntry.length} characters</span>
                <span>•</span>
                <span>~{Math.ceil(currentEntry.split(' ').length / 200)} min read</span>
              </div>
            </div>
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Share your thoughts, prayers, insights, and reflections here..."
              className="w-full h-40 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500">Auto-saved • Private & secure</span>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Entry</span>
              </button>
            </div>
          </div>

          {/* AI Devotional */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
            <h3 className="font-semibold text-gray-800 mb-3">Today's AI Devotional</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Based on your reflection and today's verse, here's an encouraging thought: 
              Building each other up is one of the most beautiful ways we can live out our faith. 
              When we encourage others, we're reflecting God's love and creating a community of hope.
            </p>
            <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full inline-block">
              ✓ Theologically reviewed
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your reflections..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Entries List */}
          <div className="space-y-3">
            {sampleEntries.map(entry => {
              const mood = moods.find(m => m.id === entry.mood);
              const MoodIcon = mood?.icon || Heart;
              
              return (
                <div key={entry.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-800">{entry.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MoodIcon className={`w-4 h-4 ${mood?.color.split(' ')[0] || 'text-gray-400'}`} />
                      <span className="text-xs text-gray-500 capitalize">{entry.mood}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{entry.preview}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{entry.wordCount} words</span>
                    <button className="text-green-600 hover:text-green-700 font-medium">Read more →</button>
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
