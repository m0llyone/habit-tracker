import { Flame, TrendingUp, CheckCircle2, Layers } from 'lucide-react';
import type { Habit } from '../types';
import { getHabitStats } from '../utils/habitUtils';

interface Props {
  habits: Habit[];
}

export function GlobalStats({ habits }: Props) {
  const activeHabits = habits.filter((h) => !h.archived);
  if (activeHabits.length === 0) return null;

  const allStats = activeHabits.map((h) => getHabitStats(h));

  const bestStreak = Math.max(...allStats.map((s) => s.currentStreak), 0);
  const avgRate =
    allStats.length > 0
      ? Math.round(allStats.reduce((acc, s) => acc + s.completionRate, 0) / allStats.length)
      : 0;
  // Today's completion
  const today = new Date().toISOString().slice(0, 10);
  const todayDone = activeHabits.filter((h) => h.completedDates.includes(today)).length;

  const items = [
    {
      icon: <Layers className="w-4 h-4" />,
      label: 'Active',
      value: activeHabits.length,
      suffix: '',
    },
    { icon: <Flame className="w-4 h-4" />, label: 'Best streak', value: bestStreak, suffix: 'd' },
    { icon: <TrendingUp className="w-4 h-4" />, label: 'Avg rate', value: avgRate, suffix: '%' },
    {
      icon: <CheckCircle2 className="w-4 h-4" />,
      label: 'Today',
      value: `${todayDone}/${activeHabits.length}`,
      suffix: '',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-4 py-3 flex flex-col gap-1 animate-scale-in"
        >
          <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </div>
          <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-none">
            {item.value}
            {item.suffix}
          </div>
        </div>
      ))}
    </div>
  );
}
