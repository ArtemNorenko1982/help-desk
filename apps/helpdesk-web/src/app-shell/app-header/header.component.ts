import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';

import { ButtonComponent, InputComponent, AuthStateService } from '@shared-ui';
import { RouterLink } from '@angular/router';
import { NavItem } from '../../app-nav-menu/nav-item';
import { AppNavMenuComponent } from '../../app-nav-menu/app-nav-menu.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: '📊', link: '/dashboard' },
  { label: 'Tickets', icon: '🎫', link: '/tickets' },
  { label: 'Reports', icon: '📈', link: '/reports', requiresAuth: true },
  { label: 'Settings', icon: '⚙️', link: '/settings', requiresAuth: true },
];

@Component({
  selector: 'app-header',
  imports: [
    ButtonComponent,
    InputComponent,
    AppNavMenuComponent,
    RouterLink,
    NgTemplateOutlet,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent {
  private readonly authStateService = inject(AuthStateService);
  isAuthorized = false;

  constructor() {
    this.authStateService.currentUser$.subscribe((user) => {
      this.isAuthorized = !!user;
      console.log('Auth state changed, current user:', user);
      console.log('User is authorized:', this.isAuthorized);
    });
  }

  navItems = navItems;

  @Input({ required: true }) title = '';
  @Input() showMenu = false;

  @Output() menuClick = new EventEmitter<void>();
  @Output() requestAssistance = new EventEmitter<void>();
  @Output() searchInput = new EventEmitter<Event>();
  @Output() loginClick = new EventEmitter<void>();

  // might be taken from service in real app
  protected assistanceButtonLabel = 'Request Assistance';
  protected loginButtonLabel = 'Login';

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    console.log('Menu toggled:', this.showMenu);
  }
}
