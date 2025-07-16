
import { useState } from 'react';
import { Bell, Globe, User, Heart, Smartphone, Shield, Gift, ChevronRight } from 'lucide-react';

export const SettingsTab = () => {
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    communityUpdates: true,
    achievements: true,
    prayerRequests: false
  });

  const [language, setLanguage] = useState('English');
  const [translation, setTranslation] = useState('NTV');

  const settingsGroups = [
    {
      title: 'Spiritual Preferences',
      icon: Heart,
      color: 'text-red-500',
      items: [
        { label: 'Focus Areas', value: 'Family, Service, Courage', action: true },
        { label: 'Quest Difficulty', value: 'Mixed', action: true },
        { label: 'Bible Translation', value: translation, action: true },
        { label: 'Daily Reminder Time', value: '8:00 AM', action: true }
      ]
    },
    {
      title: 'Personal Settings',
      icon: User,
      color: 'text-blue-500',
      items: [
        { label: 'Profile Information', value: 'Sarah M.', action: true },
        { label: 'Privacy Level', value: 'Community Visible', action: true },
        { label: 'Data Backup', value: 'Weekly', action: true }
      ]
    },
    {
      title: 'Technical Settings',
      icon: Smartphone,
      color: 'text-gray-500',
      items: [
        { label: 'Language', value: language, action: true },
        { label: 'Text Size', value: 'Medium', action: true },
        { label: 'Offline Downloads', value: 'Enabled', action: true }
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-sm opacity-90">Customize your spiritual journey</p>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            SM
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">Sarah M.</h3>
            <p className="text-sm text-gray-600">12-day streak • 156 quests completed</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">Consistent Seeker</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Community Encourager</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-800">Notifications</h3>
        </div>
        
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <button
                onClick={() => setNotifications(prev => ({...prev, [key]: !value}))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Groups */}
      {settingsGroups.map(group => {
        const Icon = group.icon;
        return (
          <div key={group.title} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Icon className={`w-5 h-5 ${group.color}`} />
              <h3 className="font-semibold text-gray-800">{group.title}</h3>
            </div>
            
            <div className="space-y-3">
              {group.items.map(item => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.value}</p>
                  </div>
                  {item.action && <ChevronRight className="w-4 h-4 text-gray-400" />}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Support VerseQuest */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-100">
        <div className="flex items-center space-x-3 mb-3">
          <Gift className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-800">Support VerseQuest</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Help us keep this spiritual community thriving and accessible to all believers.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            One-time Gift
          </button>
          <button className="px-4 py-2 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
            Monthly Support
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          100% of donations support app development and community features
        </p>
      </div>

      {/* App Info */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-3">
          <Shield className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-800">App Information</h3>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>Version</span>
            <span>1.2.3</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Privacy Policy</span>
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="flex justify-between items-center">
            <span>Terms of Service</span>
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="flex justify-between items-center">
            <span>Contact Support</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
