import { useState } from 'react';
import { X } from 'lucide-react';
import type { Habit, HabitColor, HabitFrequency } from '../types';
import type { NewHabitPayload } from '../hooks/useHabits';
import { COLOR_MAP, EMOJI_OPTIONS } from '../utils/habitUtils';

interface Props {
  onSubmit: (payload: NewHabitPayload) => void;
  onClose: () => void;
  editingHabit?: Habit | null;
  onUpdate?: (id: string, changes: Partial<Habit>) => void;
}

const COLORS: HabitColor[] = [
  'indigo',
  'emerald',
  'rose',
  'amber',
  'sky',
  'violet',
  'orange',
  'teal',
];
const FREQUENCIES: { label: string; value: HabitFrequency }[] = [
  { label: 'Every day', value: 'daily' },
  { label: 'Weekdays', value: 'weekdays' },
  { label: 'Weekends', value: 'weekends' },
];

export function HabitForm({ onSubmit, onClose, editingHabit, onUpdate }: Props) {
  const [name, setName] = useState(editingHabit?.name ?? '');
  const [description, setDescription] = useState(editingHabit?.description ?? '');
  const [color, setColor] = useState<HabitColor>(editingHabit?.color ?? 'indigo');
  const [emoji, setEmoji] = useState(editingHabit?.emoji ?? '🏃');
  const [frequency, setFrequency] = useState<HabitFrequency>(editingHabit?.frequency ?? 'daily');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editingHabit && onUpdate) {
      onUpdate(editingHabit.id, { name: name.trim(), description, color, emoji, frequency });
    } else {
      onSubmit({ name: name.trim(), description, color, emoji, frequency });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {editingHabit ? 'Edit habit' : 'New habit'}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Emoji + Name row */}
          <div className="flex gap-3">
            {/* Emoji picker trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker((v) => !v)}
                className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {emoji}
              </button>
              {showEmojiPicker && (
                <div className="absolute top-12 left-0 z-10 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg p-2 grid grid-cols-8 gap-1 w-52 animate-slide-down">
                  {EMOJI_OPTIONS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => {
                        setEmoji(e);
                        setShowEmojiPicker(false);
                      }}
                      className={`w-6 h-6 flex items-center justify-center rounded-md text-base hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors ${emoji === e ? 'bg-neutral-100 dark:bg-neutral-700' : ''}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Name input */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Habit name…"
              required
              maxLength={60}
              className="flex-1 h-11 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm font-medium border-none outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow"
            />
          </div>

          {/* Description */}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            maxLength={120}
            className="w-full h-10 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm border-none outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow"
          />

          {/* Frequency */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
              Frequency
            </label>
            <div className="flex gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFrequency(f.value)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    frequency === f.value
                      ? 'bg-indigo-500 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-all ${COLOR_MAP[c].bg} ${
                    color === c
                      ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 ' +
                        COLOR_MAP[c].ring.replace('/40', '')
                      : 'opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            {editingHabit ? 'Save changes' : 'Add habit'}
          </button>
        </form>
      </div>
    </div>
  );
}
