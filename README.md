# Habit Tracker

A modern, minimal habit tracking web app. Built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ **Add/Delete Habits** - Create habits with name, description, emoji, and color
- 📅 **Weekly Calendar** - Visual calendar with daily check-ins
- 📊 **Statistics** - Current streak, longest streak, completion rate
- 🏷️ **Filters** - View active, archived, or all habits
- 🎨 **Dark/Light Mode** - Smooth theme switching
- 💾 **Auto-Save** - All data persisted in localStorage
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Smooth Animations** - Polished UI interactions

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or download the project
git clone <repo-url>
cd habit-tracker

# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## How to Use

### Adding a Habit

1. Click **"New habit"** button
2. Select emoji or choose from picker
3. Enter habit name and optional description
4. Choose frequency: **Daily**, **Weekdays**, or **Weekends**
5. Pick a color
6. Click **"Add habit"**

### Tracking Progress

- Click any date in the weekly calendar to mark as complete
- Click again to unmark
- Progress is saved automatically

### Managing Habits

| Action      | Steps                                       |
| ----------- | ------------------------------------------- |
| **Edit**    | Click ⋮ → Edit → Save changes               |
| **Archive** | Click ⋮ → Archive (hidden from active list) |
| **Restore** | Filter to Archived → Click ⋮ → Restore      |
| **Delete**  | Click ⋮ → Delete (permanent)                |

## Project Structure

```
src/
├── components/          # UI components (presentational)
│   ├── Header.tsx       # Top bar with theme toggle
│   ├── FilterBar.tsx    # Active/Archived/All filter tabs
│   ├── HabitForm.tsx    # Modal for add/edit habit
│   ├── HabitCard.tsx    # Habit card with stats & calendar
│   ├── WeekCalendar.tsx # Weekly view with check-ins
│   ├── StatsBar.tsx     # Stats display (streak, rate, etc)
│   ├── GlobalStats.tsx  # Overview stats all habits
│   └── EmptyState.tsx   # Empty state placeholder
├── hooks/               # Custom React hooks
│   ├── useHabits.ts     # Habit CRUD & filtering logic
│   ├── useTheme.ts      # Light/dark theme management
│   └── useLocalStorage.ts # Persistent state hook
├── utils/               # Pure utility functions
│   ├── dateUtils.ts     # Date parsing, formatting, navigation
│   └── habitUtils.ts    # Stats calculations, colors, emojis
├── types/               # TypeScript interfaces
│   └── index.ts         # Type definitions
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Tailwind + global styles
```

## Architecture

### State Management

```
App (root)
├── useTheme()       → theme, toggle
├── useHabits()      → habits, filter, CRUD actions
└── Local UI state   → showForm, editingHabit
```

All data synced to localStorage automatically via `useLocalStorage` hook.

**localStorage keys:**

- `ht-habits` - Array of all habits
- `ht-filter` - Current filter (active/archived/all)
- `ht-theme` - Light/dark theme preference

### Statistics

- **Streak**: Days completed consecutively (counting backwards from today)
- **Best**: Longest unbroken streak ever
- **Rate**: Percentage of scheduled days completed
- **Done**: Number of completed / total scheduled days

### Frequency Options

- **Daily** - Every single day
- **Weekdays** - Monday through Friday
- **Weekends** - Saturday and Sunday

### Key Features

**WeekCalendar**

- Week view with day navigation
- Highlights completed days in habit color
- Respects frequency settings
- Prevents marking future dates

**Utilities**

- **dateUtils.ts** - Pure date handling (parse, format, week nav)
- **habitUtils.ts** - Stats calculations, color palettes, emojis

## Tech Stack

| Layer        | Technology           |
| ------------ | -------------------- |
| UI Framework | React 19             |
| Language     | TypeScript 6         |
| Build Tool   | Vite 8               |
| CSS          | Tailwind CSS v4      |
| Icons        | Lucide React         |
| Storage      | Browser localStorage |

## Development

```bash
# Type check
npx tsc --noEmit

# Build
npm run build

# Lint (if added)
npm run lint
```

## License

MIT - Use freely in personal and commercial projects.

---
