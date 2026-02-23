import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';

import { HeaderComponent } from './app-header/header.component';
import { ContentComponent } from './app-content/content.component';
import { FooterComponent } from './app-footer/footer.component';
import { AsideComponent, ButtonComponent } from '@shared-ui';
import { RouterLink } from '@angular/router';
import { AppNavMenuComponent } from '../app-nav-menu/app-nav-menu.component';

type NavItem = { label: string; icon: string; link: string };

@Component({
  selector: 'app-shell',
  imports: [
    AsideComponent,
    RouterLink,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ButtonComponent,
    AppNavMenuComponent,
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  // might be taken from service in real app
  protected title = 'Help Desk';

  nav: NavItem[] = [
    { label: 'Dashboard', icon: '📊', link: '/dashboard' },
    { label: 'Tickets', icon: '🎫', link: '/tickets' },
    { label: 'Reports', icon: '📈', link: '/reports' },
    { label: 'Settings', icon: '⚙️', link: '/settings' },
  ];

  isSidebarCollapsed = false;
  isDrawerOpened = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleDrawer(): void {
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  @HostListener('document:keydown.escape')
  closeDrawerOnEscape(): void {
    this.isDrawerOpened = false;
  }

  assistanceRequestHandler(): void {
    alert('Assistance requested!');
  }

  loginHandler(): void {
    alert('Login clicked!');
  }

  searchHandler(value: Event): void {
    alert('Searched for: ' + (value.target as HTMLInputElement).value);
  }
}
