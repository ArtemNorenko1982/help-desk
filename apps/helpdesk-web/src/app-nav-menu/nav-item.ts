export type NavItem = {
  label: string;
  icon: string;
  link: string;
  requiresAuth?: boolean;
  roles?: string[];
};

// implemet role filtering in the future, for now we have only 2 roles and they have the same access level, so we can skip it for now
export const NAVIGATION_MENU: NavItem[] = [
  { label: 'Dashboard', icon: '📊', link: '/dashboard', roles: ["admin", "agent"] },
  { label: 'Users', icon: '👥', link: '/users', requiresAuth: true, roles: ["admin"] },
  { label: 'Tickets', icon: '🎫', link: '/tickets', requiresAuth: true, roles: ["admin","agent", "user"] },
  { label: 'Reports', icon: '📈', link: '/reports', requiresAuth: true, roles: ["admin", "agent"] },
  { label: 'Settings', icon: '⚙️', link: '/settings', requiresAuth: true, roles: ["admin", "agent", "user"] },
];
