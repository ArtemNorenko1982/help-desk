export type NavItem = {
  label: string;
  icon: string;
  link: string;
  requiresAuth?: boolean;
};

export const NAVIGATION_MENU: NavItem[] = [
  { label: 'Dashboard', icon: '📊', link: '/dashboard' },
  { label: 'Users', icon: '👥', link: '/users', requiresAuth: true },
  { label: 'Tickets', icon: '🎫', link: '/tickets' },
  { label: 'Reports', icon: '📈', link: '/reports', requiresAuth: true },
  { label: 'Settings', icon: '⚙️', link: '/settings', requiresAuth: true },
];
