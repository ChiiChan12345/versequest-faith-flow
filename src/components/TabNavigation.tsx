
import { Home, Book, BookOpen, Users, Settings } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: 'quests' | 'bible' | 'journal' | 'community' | 'settings') => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: 'quests', label: 'Quests', icon: Home, color: 'text-blue-600' },
    { id: 'bible', label: 'Bible', icon: Book, color: 'text-amber-600' },
    { id: 'journal', label: 'Journal', icon: BookOpen, color: 'text-green-600' },
    { id: 'community', label: 'Community', icon: Users, color: 'text-purple-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? `${tab.color} bg-blue-50` 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
