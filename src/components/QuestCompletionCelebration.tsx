
import { CheckCircle, Star, Sparkles, Trophy } from 'lucide-react';

const celebrationMessages = [
  "Wonderful! Your faith in action inspires others! ✨",
  "Amazing work! You're making a real difference! 🌟",
  "Fantastic! Your spiritual journey is beautiful to witness! 🙏",
  "Incredible! Keep shining your light for others! 💫",
  "Outstanding! Your dedication is truly inspiring! 🌟"
];

export const QuestCompletionCelebration = () => {
  const randomMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-8 shadow-xl text-white text-center max-w-sm mx-4 animate-soft-scale-in pointer-events-auto">
        {/* Celebration Icons */}
        <div className="flex justify-center space-x-2 mb-4">
          <Star className="w-8 h-8 text-yellow-300 animate-soft-pulse" />
          <CheckCircle className="w-10 h-10 text-white animate-gentle-bounce" />
          <Sparkles className="w-8 h-8 text-yellow-300 animate-soft-pulse" />
        </div>
        
        {/* Celebration Message */}
        <h3 className="text-xl font-bold mb-3">Quest Completed!</h3>
        <p className="text-emerald-100 text-base leading-relaxed mb-4">
          {randomMessage}
        </p>
        
        {/* Trophy Icon */}
        <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <Trophy className="w-8 h-8 text-yellow-300 animate-soft-pulse" />
        </div>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 animate-gentle-fade-in"></div>
    </div>
  );
};
