export type NavItem = {
  label: string;
  icon: string;
  link: string;
  requiresAuth?: boolean;
  roles?: string[];
};

// implemet role filtering in the future, for now we have only 2 roles and they have the same access level, so we can skip it for now
export const NAVIGATION_MENU: NavItem[] = [
  { label: 'Dashboard', icon: '📊', link: '/dashboard', roles: ["admin", "user"] },
  { label: 'Users', icon: '👥', link: '/users', requiresAuth: true },
  { label: 'Tickets', icon: '🎫', link: '/tickets' },
  { label: 'Reports', icon: '📈', link: '/reports', requiresAuth: true },
  { label: 'Settings', icon: '⚙️', link: '/settings', requiresAuth: true },
];
