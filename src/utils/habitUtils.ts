import type { Habit, HabitFrequency, HabitStats } from '../types';
import { parseDate, toDateStr, todayStr } from './dateUtils';

/**
 * Returns true if the habit should be performed on the given date
 */
export function isScheduledOn(date: string, frequency: HabitFrequency): boolean {
  const d = parseDate(date);
  const dow = d.getDay(); // 0=Sun, 6=Sat
  if (frequency === 'daily') return true;
  if (frequency === 'weekdays') return dow >= 1 && dow <= 5;
  if (frequency === 'weekends') return dow === 0 || dow === 6;
  return true;
}

/**
 * Calculates streak and stats for a habit
 */
export function getHabitStats(habit: Habit): HabitStats {
  const completedSet = new Set(habit.completedDates);
  const today = todayStr();
  const createdDate = parseDate(habit.createdAt);

  // Build an ordered list of scheduled dates from createdAt to today
  const scheduled: string[] = [];
  const cursor = new Date(createdDate);
  const todayDate = parseDate(today);

  while (cursor <= todayDate) {
    const str = toDateStr(cursor);
    if (isScheduledOn(str, habit.frequency)) {
      scheduled.push(str);
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  const totalDays = scheduled.length;
  const totalCompleted = scheduled.filter((d) => completedSet.has(d)).length;
  const completionRate = totalDays > 0 ? Math.round((totalCompleted / totalDays) * 100) : 0;

  // Current streak: count backwards from today
  let currentStreak = 0;
  for (let i = scheduled.length - 1; i >= 0; i--) {
    if (completedSet.has(scheduled[i])) {
      currentStreak++;
    } else {
      // Allow today to be incomplete without breaking streak
      if (scheduled[i] === today) continue;
      break;
    }
  }

  // Longest streak
  let longestStreak = 0;
  let runningStreak = 0;
  for (const d of scheduled) {
    if (completedSet.has(d)) {
      runningStreak++;
      longestStreak = Math.max(longestStreak, runningStreak);
    } else if (d !== today) {
      runningStreak = 0;
    }
  }

  return { currentStreak, longestStreak, completionRate, totalCompleted, totalDays };
}

/**
 * Returns a color palette for a habit color key
 */
export const COLOR_MAP: Record<string, { bg: string; ring: string; text: string; dot: string }> = {
  indigo: {
    bg: 'bg-indigo-500',
    ring: 'ring-indigo-500/40',
    text: 'text-indigo-500',
    dot: 'bg-indigo-500',
  },
  emerald: {
    bg: 'bg-emerald-500',
    ring: 'ring-emerald-500/40',
    text: 'text-emerald-500',
    dot: 'bg-emerald-500',
  },
  rose: {
    bg: 'bg-rose-500',
    ring: 'ring-rose-500/40',
    text: 'text-rose-500',
    dot: 'bg-rose-500',
  },
  amber: {
    bg: 'bg-amber-500',
    ring: 'ring-amber-500/40',
    text: 'text-amber-500',
    dot: 'bg-amber-500',
  },
  sky: {
    bg: 'bg-sky-500',
    ring: 'ring-sky-500/40',
    text: 'text-sky-500',
    dot: 'bg-sky-500',
  },
  violet: {
    bg: 'bg-violet-500',
    ring: 'ring-violet-500/40',
    text: 'text-violet-500',
    dot: 'bg-violet-500',
  },
  orange: {
    bg: 'bg-orange-500',
    ring: 'ring-orange-500/40',
    text: 'text-orange-500',
    dot: 'bg-orange-500',
  },
  teal: {
    bg: 'bg-teal-500',
    ring: 'ring-teal-500/40',
    text: 'text-teal-500',
    dot: 'bg-teal-500',
  },
};

export const EMOJI_OPTIONS = [
  '🏃',
  '📚',
  '💧',
  '🧘',
  '🍎',
  '💤',
  '✍️',
  '🎸',
  '🏋️',
  '🧹',
  '💊',
  '🌿',
  '🎯',
  '🧠',
  '🚴',
  '🥗',
  '📝',
  '🎨',
  '🎤',
  '🏊',
  '🌅',
  '🛌',
  '🤸',
  '🧗',
];

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
