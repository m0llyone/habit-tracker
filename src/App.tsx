import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { HabitCard } from './components/HabitCard';
import { HabitForm } from './components/HabitForm';
import { GlobalStats } from './components/GlobalStats';
import { EmptyState } from './components/EmptyState';
import { useHabits } from './hooks/useHabits';
import { useTheme } from './hooks/useTheme';
import type { Habit } from './types';

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const {
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
  } = useHabits();

  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingHabit(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Global Stats */}
        <GlobalStats habits={habits} />

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <FilterBar
            filter={filter}
            onChange={setFilter}
            activeCount={activeCount}
            archivedCount={archivedCount}
          />

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition-colors shadow-sm hover:shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            New habit
          </button>
        </div>

        {/* Habit list */}
        {filteredHabits.length === 0 ? (
          <EmptyState filter={filter} onAdd={() => setShowForm(true)} />
        ) : (
          <div className="space-y-3">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleCompletion}
                onEdit={handleEdit}
                onArchive={archiveHabit}
                onUnarchive={unarchiveHabit}
                onDelete={deleteHabit}
              />
            ))}
          </div>
        )}

        <div className="h-8" />
      </main>

      {/* Modal form */}
      {showForm && (
        <HabitForm
          onSubmit={addHabit}
          onClose={handleCloseForm}
          editingHabit={editingHabit}
          onUpdate={updateHabit}
        />
      )}
    </div>
  );
}
