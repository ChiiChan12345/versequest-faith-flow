
export interface CommunityPost {
  id: number;
  user: {
    name: string;
    badges: string[];
  };
  content: string;
  verse?: string;
  reactions: {
    praying: number;
    blessed: number;
    encouraged: number;
    amen?: number;
  };
  timestamp: string;
  type: 'victory' | 'prayer_request' | 'reflection' | 'milestone';
}

export const sampleCommunityPosts: CommunityPost[] = [
  {
    id: 1,
    user: { name: "Sarah M.", badges: ["30-day-streak", "prayer-warrior"] },
    content: "Feeling so grateful for this community! Today's quest about forgiveness really challenged me to reach out to someone I'd been avoiding. God is good! 🙏",
    verse: "Ephesians 4:32",
    reactions: { praying: 12, blessed: 8, encouraged: 15, amen: 6 },
    timestamp: "2 hours ago",
    type: "victory"
  },
  {
    id: 2,
    user: { name: "Michael R.", badges: ["faithful-reader", "community-builder"] },
    content: "Struggling with consistency lately. Would appreciate prayers for motivation to stay in God's word daily.",
    reactions: { praying: 24, encouraged: 6, blessed: 3 },
    timestamp: "4 hours ago", 
    type: "prayer_request"
  },
  {
    id: 3,
    user: { name: "Grace L.", badges: ["encourager", "consistent-seeker"] },
    content: "Just hit my 50-day streak! The daily quests have completely transformed my spiritual life. Thank you Lord for this community that keeps me accountable! ✨",
    verse: "Hebrews 10:25",
    reactions: { praying: 8, blessed: 18, encouraged: 12, amen: 15 },
    timestamp: "6 hours ago",
    type: "milestone"
  },
  {
    id: 4,
    user: { name: "David K.", badges: ["scripture-seeker"] },
    content: "Today's verse about building each other up hit different. Spent some time reflecting on how I can be more encouraging to my family. Sometimes the smallest words make the biggest impact.",
    verse: "1 Thessalonians 5:11",
    reactions: { praying: 5, blessed: 9, encouraged: 8 },
    timestamp: "8 hours ago",
    type: "reflection"
  }
];
