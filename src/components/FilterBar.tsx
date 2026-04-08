import type { FilterType } from '../types';

interface Props {
  filter: FilterType;
  onChange: (f: FilterType) => void;
  activeCount: number;
  archivedCount: number;
}

const TABS: { label: string; value: FilterType }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
  { label: 'All', value: 'all' },
];

export function FilterBar({ filter, onChange, activeCount, archivedCount }: Props) {
  const countFor = (v: FilterType) => {
    if (v === 'active') return activeCount;
    if (v === 'archived') return archivedCount;
    return activeCount + archivedCount;
  };

  return (
    <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl w-fit">
      {TABS.map((tab) => {
        const active = filter === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                active
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }
            `}
          >
            {tab.label}
            <span
              className={`
                text-xs px-1.5 py-0.5 rounded-full font-medium
                ${
                  active
                    ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500'
                }
              `}
            >
              {countFor(tab.value)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
