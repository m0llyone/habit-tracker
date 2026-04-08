import { Plus, Archive } from 'lucide-react';
import type { FilterType } from '../types';

interface Props {
  filter: FilterType;
  onAdd: () => void;
}

export function EmptyState({ filter, onAdd }: Props) {
  if (filter === 'archived') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
          <Archive className="w-5 h-5 text-neutral-400" />
        </div>
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          No archived habits
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
          Archive a habit from the menu on any card
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="text-4xl mb-4">🌱</div>
      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">
        No habits yet
      </p>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-5">
        Start tracking your first habit today
      </p>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add habit
      </button>
    </div>
  );
}
