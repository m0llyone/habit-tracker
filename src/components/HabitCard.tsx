import { useState } from 'react';
import {
  MoreHorizontal,
  Pencil,
  Archive,
  Trash2,
  ArchiveRestore,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { Habit } from '../types';
import { WeekCalendar } from './WeekCalendar';
import { StatsBar } from './StatsBar';
import { getHabitStats, COLOR_MAP } from '../utils/habitUtils';

interface Props {
  habit: Habit;
  onToggle: (habitId: string, date: string) => void;
  onEdit: (habit: Habit) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
  onDelete: (id: string) => void;
}

const FREQ_LABEL: Record<string, string> = {
  daily: 'Daily',
  weekdays: 'Weekdays',
  weekends: 'Weekends',
};

export function HabitCard({ habit, onToggle, onEdit, onArchive, onUnarchive, onDelete }: Props) {
  const [expanded, setExpanded] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = getHabitStats(habit);
  const color = COLOR_MAP[habit.color];

  return (
    <div
      className={`
        group relative bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        rounded-2xl transition-all duration-200
        hover:border-neutral-300 dark:hover:border-neutral-700
        hover:shadow-sm animate-slide-up
        ${habit.archived ? 'opacity-60' : ''}
      `}
    >
      {/* Color accent strip */}
      <div className={`absolute left-0 top-3 bottom-3 w-0.75 ${color.bg} rounded-full ml-3`} />

      <div className="pl-7 pr-4 pt-4 pb-4">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl leading-none">{habit.emoji}</span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate leading-snug">
                {habit.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {habit.description && (
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 truncate max-w-45">
                    {habit.description}
                  </span>
                )}
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400`}
                >
                  {FREQ_LABEL[habit.frequency]}
                </span>
                {habit.archived && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    Archived
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0 ml-2">
            {/* Expand toggle */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-300 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Context menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-300 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-8 z-20 w-44 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden animate-slide-down">
                    <button
                      onClick={() => {
                        onEdit(habit);
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5 text-neutral-400" /> Edit
                    </button>

                    {habit.archived ? (
                      <button
                        onClick={() => {
                          onUnarchive(habit.id);
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <ArchiveRestore className="w-3.5 h-3.5 text-neutral-400" /> Restore
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onArchive(habit.id);
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <Archive className="w-3.5 h-3.5 text-neutral-400" /> Archive
                      </button>
                    )}

                    <div className="h-px bg-neutral-100 dark:bg-neutral-700 mx-2" />

                    <button
                      onClick={() => {
                        onDelete(habit.id);
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <StatsBar stats={stats} color={habit.color} />

        {/* Expanded: week calendar */}
        {expanded && (
          <div className="mt-4 animate-slide-down">
            <WeekCalendar habit={habit} onToggle={(date) => onToggle(habit.id, date)} />
          </div>
        )}
      </div>
    </div>
  );
}
