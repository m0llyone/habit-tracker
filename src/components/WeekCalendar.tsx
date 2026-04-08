import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Habit } from '../types';
import { todayStr, getWeekDays, dayLabel, shiftWeek, monthYearLabel } from '../utils/dateUtils';
import { isScheduledOn } from '../utils/habitUtils';
import { COLOR_MAP } from '../utils/habitUtils';

interface Props {
  habit: Habit;
  onToggle: (date: string) => void;
}

export function WeekCalendar({ habit, onToggle }: Props) {
  const [weekAnchor, setWeekAnchor] = useState(todayStr());

  const today = todayStr();
  const weekDays = getWeekDays(weekAnchor);
  const completedSet = new Set(habit.completedDates);
  const color = COLOR_MAP[habit.color];

  const canGoNext = weekDays[6] < today;

  return (
    <div className="space-y-1">
      {/* Week nav */}
      <div className="flex items-center justify-between mb-1">
        <button
          onClick={() => setWeekAnchor((d) => shiftWeek(d, -1))}
          className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          {monthYearLabel(weekDays[0])}
        </span>
        <button
          onClick={() => canGoNext && setWeekAnchor((d) => shiftWeek(d, 1))}
          disabled={!canGoNext}
          className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((date) => {
          const { weekday, day } = dayLabel(date);
          const isScheduled = isScheduledOn(date, habit.frequency);
          const isCompleted = completedSet.has(date);
          const isToday = date === today;
          const isFuture = date > today;
          const isPast = date < habit.createdAt;

          return (
            <div key={date} className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase">
                {weekday}
              </span>

              <button
                onClick={() => {
                  if (!isScheduled || isFuture || isPast) return;
                  onToggle(date);
                }}
                disabled={!isScheduled || isFuture || isPast}
                className={`
                  w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-150
                  ${isToday ? 'ring-1 ring-offset-1 ring-offset-white dark:ring-offset-neutral-900 ring-neutral-300 dark:ring-neutral-600' : ''}
                  ${
                    !isScheduled || isPast
                      ? 'opacity-25 cursor-default bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600'
                      : isFuture
                        ? 'opacity-40 cursor-default bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500'
                        : isCompleted
                          ? `${color.bg} text-white shadow-sm hover:opacity-90 active:scale-95`
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95'
                  }
                `}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
