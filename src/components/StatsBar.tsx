import { Flame, Trophy, CheckCircle, Calendar } from 'lucide-react';
import type { HabitStats } from '../types';
import { COLOR_MAP } from '../utils/habitUtils';

interface Props {
  stats: HabitStats;
  color: string;
}

export function StatsBar({ stats, color }: Props) {
  const palette = COLOR_MAP[color];

  const items = [
    {
      icon: <Flame className="w-3.5 h-3.5" />,
      label: 'Streak',
      value: `${stats.currentStreak}d`,
    },
    {
      icon: <Trophy className="w-3.5 h-3.5" />,
      label: 'Best',
      value: `${stats.longestStreak}d`,
    },
    {
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      label: 'Rate',
      value: `${stats.completionRate}%`,
    },
    {
      icon: <Calendar className="w-3.5 h-3.5" />,
      label: 'Done',
      value: `${stats.totalCompleted}/${stats.totalDays}`,
    },
  ];

  return (
    <div className="flex items-center gap-3 mt-2">
      {/* Progress bar */}
      <div className="flex-1 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${palette.bg} rounded-full transition-all duration-500`}
          style={{ width: `${stats.completionRate}%` }}
        />
      </div>

      {/* Stats chips */}
      <div className="flex items-center gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <span className={`${palette.text}`}>{item.icon}</span>
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
