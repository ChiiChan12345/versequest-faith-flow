
export interface Quest {
  id: number;
  verse: string;
  difficulty: 'gentle' | 'challenge' | 'bold';
  title: string;
  description: string;
  estimatedTime: string;
  category: string;
  completed: boolean;
}

export const sampleQuests: Quest[] = [
  {
    id: 1,
    verse: "Therefore encourage one another and build each other up - 1 Thessalonians 5:11",
    difficulty: "gentle",
    title: "Share Encouragement",
    description: "Send a thoughtful message to someone who might need encouragement today",
    estimatedTime: "10 minutes",
    category: "community",
    completed: false
  },
  {
    id: 2,
    verse: "Therefore encourage one another and build each other up - 1 Thessalonians 5:11", 
    difficulty: "challenge",
    title: "Active Community Building",
    description: "Organize a small gathering or reach out to 3 people you haven't spoken to recently",
    estimatedTime: "30 minutes",
    category: "community", 
    completed: false
  },
  {
    id: 3,
    verse: "Be still and know that I am God - Psalm 46:10",
    difficulty: "gentle",
    title: "Quiet Reflection",
    description: "Spend 15 minutes in silent prayer and meditation on God's presence",
    estimatedTime: "15 minutes",
    category: "prayer",
    completed: false
  },
  {
    id: 4,
    verse: "Love your neighbor as yourself - Mark 12:31",
    difficulty: "bold",
    title: "Acts of Service",
    description: "Perform three acts of service for neighbors or community members without recognition",
    estimatedTime: "2 hours",
    category: "service",
    completed: false
  }
];

export interface UserProgress {
  currentStreak: number;
  longestStreak: number;
  totalQuestsCompleted: number;
  weeklyProgress: number;
  badges: string[];
  spiritualFocusAreas: string[];
  journalEntries: number;
}

export const userProgress: UserProgress = {
  currentStreak: 12,
  longestStreak: 45,
  totalQuestsCompleted: 156,
  weeklyProgress: 85,
  badges: ["consistent-seeker", "community-encourager", "season-celebrant"],
  spiritualFocusAreas: ["family", "service", "courage"],
  journalEntries: 89
};
