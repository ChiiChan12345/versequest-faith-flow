
import { useState } from 'react';
import { QuestsTab } from '@/components/QuestsTab';
import { BibleTab } from '@/components/BibleTab';
import { JournalTab } from '@/components/JournalTab';
import { CommunityTab } from '@/components/CommunityTab';
import { SettingsTab } from '@/components/SettingsTab';
import { TabNavigation } from '@/components/TabNavigation';

type Tab = 'quests' | 'bible' | 'journal' | 'community' | 'settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('quests');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'quests':
        return <QuestsTab />;
      case 'bible':
        return <BibleTab />;
      case 'journal':
        return <JournalTab />;
      case 'community':
        return <CommunityTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <QuestsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto">
      {/* Main Content Area */}
      <div className="flex-1 pb-20">
        {renderActiveTab()}
      </div>
      
      {/* Bottom Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
