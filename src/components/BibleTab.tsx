
import { useState } from 'react';
import { Search, ChevronDown, BookOpen, Share2, Sparkles } from 'lucide-react';

export const BibleTab = () => {
  const [selectedTranslation, setSelectedTranslation] = useState('NTV');
  const [currentBook, setCurrentBook] = useState('1 Thessalonians');
  const [currentChapter, setCurrentChapter] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const translations = ['NTV', 'King James', 'ESV', 'NIV'];
  
  const books = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
    'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
    'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
    'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
    'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
    'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew',
    'Mark', 'Luke', 'John', 'Acts', 'Romans',
    '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians',
    'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy',
    'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter',
    '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
  ];

  const getChaptersForBook = (book: string) => {
    // This would normally come from backend - using sample data
    const chapterCounts: { [key: string]: number } = {
      '1 Thessalonians': 5,
      'Matthew': 28,
      'Genesis': 50,
      'Psalms': 150,
      'John': 21
    };
    return chapterCounts[book] || 10;
  };

  const chapters = Array.from({ length: getChaptersForBook(currentBook) }, (_, i) => i + 1);
  
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
    <div className="p-4 space-y-6 animate-gentle-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-xl animate-soft-scale-in">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <span className="text-3xl mr-3">📖</span>
          Holy Bible
        </h1>
        <p className="text-sm opacity-90">Study God's Word with purpose</p>
      </div>

      {/* Translation & Search */}
      <div className="space-y-4">
        <div className="relative">
          <select 
            value={selectedTranslation}
            onChange={(e) => setSelectedTranslation(e.target.value)}
            className="w-full p-4 bg-white border-2 border-blue-200 rounded-xl appearance-none text-slate-800 font-medium shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:shadow-md"
          >
            {translations.map(translation => (
              <option key={translation} value={translation}>{translation}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
          <input
            type="text"
            placeholder="Search verses or references..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all duration-300 hover:shadow-md"
          />
        </div>
      </div>

      {/* Book and Chapter Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Book</label>
          <select 
            value={currentBook}
            onChange={(e) => {
              setCurrentBook(e.target.value);
              setCurrentChapter(1);
            }}
            className="w-full p-4 bg-white border-2 border-purple-200 rounded-xl appearance-none text-slate-800 font-medium shadow-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 hover:shadow-md"
          >
            {books.map(book => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 bottom-4 w-5 h-5 text-purple-500" />
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Chapter</label>
          <select 
            value={currentChapter}
            onChange={(e) => setCurrentChapter(Number(e.target.value))}
            className="w-full p-4 bg-white border-2 border-purple-200 rounded-xl appearance-none text-slate-800 font-medium shadow-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 hover:shadow-md"
          >
            {chapters.map(chapter => (
              <option key={chapter} value={chapter}>{chapter}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 bottom-4 w-5 h-5 text-purple-500" />
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 shadow-sm border-2 border-blue-100 animate-soft-scale-in">
        <div className="flex items-center text-sm text-blue-700 mb-2">
          <BookOpen className="w-5 h-5 mr-2" />
          <span className="font-medium">{currentBook} • Chapter {currentChapter}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">{currentBook} {currentChapter}</h2>
        <p className="text-xs text-slate-600 mt-2 bg-amber-50 px-3 py-1 rounded-lg inline-block">
          📝 Chapter navigation functionality will be added in backend integration
        </p>
      </div>

      {/* Bible Content */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100">
        <div className="space-y-6">
          {sampleVerses.map((verseData, index) => (
            <div key={verseData.verse} className="group animate-gentle-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="flex items-start space-x-4">
                <span className="text-sm font-bold text-amber-600 mt-1 min-w-[32px] bg-amber-50 px-3 py-2 rounded-full border border-amber-200">
                  {verseData.verse}
                </span>
                <p className="text-slate-800 leading-relaxed font-serif text-lg flex-1">
                  {verseData.text}
                </p>
              </div>
              
              {/* Verse Actions */}
              <div className="flex items-center space-x-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pl-12">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm hover:from-blue-100 hover:to-purple-100 transition-all duration-300 border border-blue-200 shadow-sm hover:shadow-md transform hover:scale-105">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Generate Quest</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-sm hover:bg-slate-100 transition-all duration-300 border border-slate-200 shadow-sm hover:shadow-md transform hover:scale-105">
                  <Share2 className="w-4 h-4" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Navigation */}
      <div className="flex justify-between items-center">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
          <span className="text-sm font-semibold">← Previous</span>
        </button>
        
        <div className="text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          Chapter {currentChapter}
        </div>
        
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
          <span className="text-sm font-semibold">Next →</span>
        </button>
      </div>
    </div>
  );
};
