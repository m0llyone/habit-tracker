/**
 * Returns today's date as YYYY-MM-DD string in local time
 */
export function todayStr(): string {
  return toDateStr(new Date());
}

/**
 * Converts a Date to YYYY-MM-DD string in local time
 */
export function toDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Parses YYYY-MM-DD into a local Date object (no timezone shift)
 */
export function parseDate(str: string): Date {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Returns array of YYYY-MM-DD strings for the last `n` days (including today)
 */
export function lastNDays(n: number): string[] {
  const result: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    result.push(toDateStr(d));
  }
  return result;
}

/**
 * Returns array of YYYY-MM-DD strings for the calendar week containing `dateStr`
 * Week starts on Monday
 */
export function getWeekDays(dateStr: string): string[] {
  const date = parseDate(dateStr);
  const day = date.getDay(); // 0=Sun … 6=Sat
  const diffToMon = (day === 0 ? -6 : 1 - day);
  const result: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(date);
    d.setDate(date.getDate() + diffToMon + i);
    result.push(toDateStr(d));
  }
  return result;
}

/**
 * Returns the start of week (Monday) for a given date string
 */
export function weekStart(dateStr: string): string {
  return getWeekDays(dateStr)[0];
}

/**
 * Returns a human-readable label like "Mon 3" for a date string
 */
export function dayLabel(dateStr: string): { weekday: string; day: number } {
  const d = parseDate(dateStr);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return { weekday: weekdays[d.getDay()], day: d.getDate() };
}

/**
 * Returns the month name and year for a date string, e.g. "June 2025"
 */
export function monthYearLabel(dateStr: string): string {
  const d = parseDate(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Formats a date string to a short readable format, e.g. "Jun 3"
 */
export function shortDate(dateStr: string): string {
  const d = parseDate(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Returns true if dateStr1 < dateStr2
 */
export function isBefore(dateStr1: string, dateStr2: string): boolean {
  return dateStr1 < dateStr2;
}

/**
 * Moves a reference date by `delta` weeks (can be negative)
 */
export function shiftWeek(dateStr: string, delta: number): string {
  const d = parseDate(dateStr);
  d.setDate(d.getDate() + delta * 7);
  return toDateStr(d);
}
