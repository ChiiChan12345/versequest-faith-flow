
import { useState } from 'react';
import { Search, ChevronDown, BookOpen, Share2, Sparkles } from 'lucide-react';

export const BibleTab = () => {
  const [selectedTranslation, setSelectedTranslation] = useState('NTV');
  const [currentBook, setCurrentBook] = useState('1 Thessalonians');
  const [currentChapter, setCurrentChapter] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const translations = ['NTV', 'King James', 'ESV', 'NIV'];
  
  const sampleVerses = [
    {
      verse: 9,
      text: "But you, brothers and sisters, are not in darkness so that this day should surprise you like a thief."
    },
    {
      verse: 10,
      text: "They died for us so that, whether we are awake or asleep, we may live together with him."
    },
    {
      verse: 11,
      text: "Therefore encourage one another and build each other up, just as in fact you are doing."
    },
    {
      verse: 12,
      text: "Now we ask you, brothers and sisters, to acknowledge those who work hard among you, who care for you in the Lord and who admonish you."
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Holy Bible</h1>
        <p className="text-sm opacity-90">Study God's Word with purpose</p>
      </div>

      {/* Translation & Search */}
      <div className="space-y-4">
        <div className="relative">
          <select 
            value={selectedTranslation}
            onChange={(e) => setSelectedTranslation(e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-lg appearance-none text-gray-800 font-medium"
          >
            {translations.map(translation => (
              <option key={translation} value={translation}>{translation}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search verses or references..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <BookOpen className="w-4 h-4 mr-2" />
          <span>{currentBook} • Chapter {currentChapter}</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">{currentBook} {currentChapter}</h2>
      </div>

      {/* Bible Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-4">
          {sampleVerses.map(verseData => (
            <div key={verseData.verse} className="group">
              <div className="flex items-start space-x-3">
                <span className="text-sm font-bold text-amber-600 mt-1 min-w-[24px]">
                  {verseData.verse}
                </span>
                <p className="text-gray-800 leading-relaxed font-serif text-base flex-1">
                  {verseData.text}
                </p>
              </div>
              
              {/* Verse Actions */}
              <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pl-9">
                <button className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition-colors">
                  <Sparkles className="w-3 h-3" />
                  <span>Generate Quest</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs hover:bg-gray-100 transition-colors">
                  <Share2 className="w-3 h-3" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Navigation */}
      <div className="flex justify-between items-center">
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-sm font-medium text-gray-700">← Previous</span>
        </button>
        
        <div className="text-sm text-gray-500">
          Chapter {currentChapter}
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-sm font-medium text-gray-700">Next →</span>
        </button>
      </div>
    </div>
  );
};
