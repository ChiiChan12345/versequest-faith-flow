
import { useState } from 'react';
import { Heart, MessageCircle, Send, Users, Star, Flame, Award } from 'lucide-react';
import { sampleCommunityPosts } from '@/data/communityData';

export const CommunityTab = () => {
  const [newPost, setNewPost] = useState('');
  const [postType, setPostType] = useState<'reflection' | 'prayer_request' | 'victory'>('reflection');

  const getReactionIcon = (type: string) => {
    switch (type) {
      case 'praying': return '🙏';
      case 'blessed': return '✨';
      case 'encouraged': return '💪';
      case 'amen': return '🙌';
      default: return '❤️';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case '30-day-streak': return <Flame className="w-3 h-3" />;
      case 'prayer-warrior': return <Heart className="w-3 h-3" />;
      case 'faithful-reader': return <Star className="w-3 h-3" />;
      case 'community-builder': return <Users className="w-3 h-3" />;
      case 'encourager': return <MessageCircle className="w-3 h-3" />;
      case 'consistent-seeker': return <Award className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'victory': return 'border-l-green-500 bg-green-50/50';
      case 'prayer_request': return 'border-l-blue-500 bg-blue-50/50';
      case 'milestone': return 'border-l-yellow-500 bg-yellow-50/50';
      case 'reflection': return 'border-l-purple-500 bg-purple-50/50';
      default: return 'border-l-gray-300 bg-white';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Faith Community</h1>
        <p className="text-sm opacity-90">Share your journey with others</p>
      </div>

      {/* Post Composer */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="space-y-4">
          <div className="flex space-x-2">
            {(['reflection', 'prayer_request', 'victory'] as const).map(type => (
              <button
                key={type}
                onClick={() => setPostType(type)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  postType === type
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type === 'prayer_request' ? 'Prayer Request' : 
                 type === 'victory' ? 'Victory' : 'Reflection'}
              </button>
            ))}
          </div>
          
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder={
              postType === 'prayer_request' 
                ? "Share what you'd like the community to pray for..."
                : postType === 'victory'
                ? "Celebrate God's goodness in your life..."
                : "Share your spiritual reflections..."
            }
            className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Share with love and respect</span>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newPost.trim()}>
              <Send className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Community Updates</h3>
        
        {sampleCommunityPosts.map(post => (
          <div key={post.id} className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${getPostTypeColor(post.type)}`}>
            {/* User Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {post.user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-800">{post.user.name}</h4>
                    <div className="flex space-x-1">
                      {post.user.badges.slice(0, 2).map(badge => (
                        <div key={badge} className="flex items-center space-x-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                          {getBadgeIcon(badge)}
                          <span className="hidden sm:inline">{badge.replace('-', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-3">
              <p className="text-gray-800 leading-relaxed mb-2">{post.content}</p>
              {post.verse && (
                <p className="text-sm text-purple-600 font-serif italic">"{post.verse}"</p>
              )}
            </div>

            {/* Reactions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                {Object.entries(post.reactions).map(([reaction, count]) => (
                  <button
                    key={reaction}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-full text-sm transition-colors"
                  >
                    <span>{getReactionIcon(reaction)}</span>
                    <span className="text-gray-600">{count}</span>
                  </button>
                ))}
              </div>
              
              <button className="text-gray-500 hover:text-gray-700 text-sm">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
