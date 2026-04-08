export type HabitColor =
  | 'indigo'
  | 'emerald'
  | 'rose'
  | 'amber'
  | 'sky'
  | 'violet'
  | 'orange'
  | 'teal';

export type HabitFrequency = 'daily' | 'weekdays' | 'weekends';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  color: HabitColor;
  emoji: string;
  frequency: HabitFrequency;
  createdAt: string; // ISO date string YYYY-MM-DD
  archived: boolean;
  completedDates: string[]; // array of ISO date strings YYYY-MM-DD
}

export type FilterType = 'active' | 'archived' | 'all';

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  completionRate: number; // 0-100
  totalCompleted: number;
  totalDays: number;
}

export interface AppState {
  habits: Habit[];
  theme: 'light' | 'dark';
  filter: FilterType;
}
