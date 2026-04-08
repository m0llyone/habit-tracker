import { useCallback } from 'react';
import type { Habit, HabitColor, HabitFrequency, FilterType } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/habitUtils';
import { todayStr } from '../utils/dateUtils';

export interface NewHabitPayload {
  name: string;
  description?: string;
  color: HabitColor;
  emoji: string;
  frequency: HabitFrequency;
}

const SEED_HABITS: Habit[] = [
  {
    id: generateId(),
    name: 'Morning Run',
    description: '30 minutes outdoor jog',
    color: 'emerald',
    emoji: '🏃',
    frequency: 'weekdays',
    createdAt: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 14);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${dd}`;
    })(),
    archived: false,
    completedDates: (() => {
      const dates: string[] = [];
      const today = new Date();
      for (let i = 14; i >= 1; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dow = d.getDay();
        if (dow >= 1 && dow <= 5 && Math.random() > 0.25) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          dates.push(`${y}-${m}-${dd}`);
        }
      }
      return dates;
    })(),
  },
  {
    id: generateId(),
    name: 'Read 20 pages',
    description: 'Any book counts',
    color: 'indigo',
    emoji: '📚',
    frequency: 'daily',
    createdAt: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 10);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${dd}`;
    })(),
    archived: false,
    completedDates: (() => {
      const dates: string[] = [];
      const today = new Date();
      for (let i = 10; i >= 1; i--) {
        if (Math.random() > 0.3) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          dates.push(`${y}-${m}-${dd}`);
        }
      }
      return dates;
    })(),
  },
  {
    id: generateId(),
    name: 'Drink 2L water',
    color: 'sky',
    emoji: '💧',
    frequency: 'daily',
    createdAt: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${dd}`;
    })(),
    archived: false,
    completedDates: [],
  },
];

export function useHabits() {
  const [habits, setHabits] = useLocalStorage<Habit[]>('ht-habits', SEED_HABITS);
  const [filter, setFilter] = useLocalStorage<FilterType>('ht-filter', 'active');

  /* ── CRUD ─────────────────────────────────────────────── */

  const addHabit = useCallback(
    (payload: NewHabitPayload) => {
      const habit: Habit = {
        id: generateId(),
        name: payload.name,
        description: payload.description,
        color: payload.color,
        emoji: payload.emoji,
        frequency: payload.frequency,
        createdAt: todayStr(),
        archived: false,
        completedDates: [],
      };
      setHabits((prev) => [habit, ...prev]);
    },
    [setHabits],
  );

  const updateHabit = useCallback(
    (id: string, changes: Partial<Omit<Habit, 'id' | 'completedDates' | 'createdAt'>>) => {
      setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...changes } : h)));
    },
    [setHabits],
  );

  const deleteHabit = useCallback(
    (id: string) => {
      setHabits((prev) => prev.filter((h) => h.id !== id));
    },
    [setHabits],
  );

  const archiveHabit = useCallback(
    (id: string) => {
      setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, archived: true } : h)));
    },
    [setHabits],
  );

  const unarchiveHabit = useCallback(
    (id: string) => {
      setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, archived: false } : h)));
    },
    [setHabits],
  );

  /* ── Completion toggle ────────────────────────────────── */

  const toggleCompletion = useCallback(
    (id: string, date: string) => {
      setHabits((prev) =>
        prev.map((h) => {
          if (h.id !== id) return h;
          const has = h.completedDates.includes(date);
          return {
            ...h,
            completedDates: has
              ? h.completedDates.filter((d) => d !== date)
              : [...h.completedDates, date],
          };
        }),
      );
    },
    [setHabits],
  );

  /* ── Derived ──────────────────────────────────────────── */

  const filteredHabits = habits.filter((h) => {
    if (filter === 'active') return !h.archived;
    if (filter === 'archived') return h.archived;
    return true;
  });

  const activeCount = habits.filter((h) => !h.archived).length;
  const archivedCount = habits.filter((h) => h.archived).length;

  return {
    habits,
    filteredHabits,
    filter,
    setFilter,
    activeCount,
    archivedCount,
    addHabit,
    updateHabit,
    deleteHabit,
    archiveHabit,
    unarchiveHabit,
    toggleCompletion,
  };
}
