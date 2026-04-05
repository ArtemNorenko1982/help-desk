export type TicketStatus = 'new' | 'in-progress' | 'closed';

export interface DashboardTicket {
  readonly id: number;
  title: string;
  status: TicketStatus;
  createdAt: Date;
  closedAt?: Date;
  userId: number;
}

export interface DashboardUser {
  readonly id: number;
  name: string;
  email: string;
  role: string;
  ticketCount: number;
}

export interface TicketStat {
  date: string;
  newCount: number;
  closedCount: number;
  inProgressCount: number;
}

const _now = new Date();
const _todayBase = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());
const dayMs = 24 * 60 * 60 * 1000;

function daysAgo(n: number): Date {
  return new Date(_todayBase.getTime() - n * dayMs);
}

function todayAt(hours: number, minutes: number): Date {
  return new Date(_todayBase.getFullYear(), _todayBase.getMonth(), _todayBase.getDate(), hours, minutes, 0, 0);
}

export const MOCK_TICKETS: DashboardTicket[] = [
  // Today's new tickets
  { id: 1, title: 'Login page broken on Safari', status: 'new', createdAt: todayAt(8, 10), userId: 1 },
  { id: 2, title: 'Export CSV fails for large datasets', status: 'new', createdAt: todayAt(9, 25), userId: 2 },
  { id: 3, title: 'Notification emails not sending', status: 'new', createdAt: todayAt(10, 5), userId: 3 },
  // Today's closed tickets
  { id: 4, title: 'Dark mode flicker on load', status: 'closed', createdAt: daysAgo(1), closedAt: todayAt(11, 0), userId: 4 },
  { id: 5, title: 'Password reset link expired', status: 'closed', createdAt: daysAgo(2), closedAt: todayAt(13, 30), userId: 1 },
  // In-progress tickets
  { id: 6, title: 'Improve dashboard load time', status: 'in-progress', createdAt: daysAgo(3), userId: 2 },
  { id: 7, title: 'Add bulk ticket assignment', status: 'in-progress', createdAt: daysAgo(4), userId: 3 },
  { id: 8, title: 'Fix table sorting on mobile', status: 'in-progress', createdAt: daysAgo(2), userId: 5 },
  { id: 9, title: 'Integrate Slack notifications', status: 'in-progress', createdAt: daysAgo(5), userId: 4 },
  // Historical tickets for chart
  { id: 10, title: 'Search returns wrong results', status: 'closed', createdAt: daysAgo(6), closedAt: daysAgo(5), userId: 1 },
  { id: 11, title: 'Attachment upload fails on Firefox', status: 'closed', createdAt: daysAgo(5), closedAt: daysAgo(4), userId: 2 },
  { id: 12, title: 'Wrong timezone on timestamps', status: 'new', createdAt: daysAgo(4), userId: 5 },
  { id: 13, title: 'Role permissions not saving', status: 'closed', createdAt: daysAgo(3), closedAt: daysAgo(2), userId: 3 },
  { id: 14, title: 'Duplicate ticket IDs after merge', status: 'new', createdAt: daysAgo(3), userId: 4 },
  { id: 15, title: 'API rate limiting not enforced', status: 'new', createdAt: daysAgo(2), userId: 5 },
];

export const MOCK_USERS: DashboardUser[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Agent', ticketCount: 3 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Agent', ticketCount: 3 },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'User', ticketCount: 3 },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'User', ticketCount: 3 },
  { id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'Agent', ticketCount: 3 },
];

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

const _fixedNewCounts = [2, 3, 1, 4, 2, 5, 3, 1, 4, 2, 3, 5, 3, 2];
const _fixedClosedCounts = [1, 2, 3, 1, 4, 2, 3, 2, 1, 3, 2, 2, 4, 2];
const _fixedInProgressCounts = [3, 2, 4, 2, 3, 1, 2, 3, 4, 2, 1, 3, 2, 4];

export const MOCK_TICKET_STATS: TicketStat[] = Array.from({ length: 14 }, (_, i) => {
  const date = daysAgo(13 - i);
  const dateStr = toDateString(date);
  return {
    date: dateStr,
    newCount: _fixedNewCounts[i],
    closedCount: _fixedClosedCounts[i],
    inProgressCount: _fixedInProgressCounts[i],
  };
});
