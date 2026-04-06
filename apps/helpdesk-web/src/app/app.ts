import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../app-shell/app-header/header.component';
import { FooterComponent } from '../app-shell/app-footer/footer.component';
import { ContentComponent } from '../app-shell/app-content/content.component';
import { AuthService, AuthStateService } from '@shared-ui';
import { AsyncPipe, NgIf } from '@angular/common';
import { AppNavMenuComponent } from '../app-nav-menu/app-nav-menu.component';
import { NAVIGATION_MENU, NavItem } from '../app-nav-menu/nav-item';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AsyncPipe,
    NgIf,
    AppNavMenuComponent,
    MatProgressSpinner,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'Help Desk';
  private router = inject(Router);

  private authService = inject(AuthService);
  protected readonly authState = inject(AuthStateService);
  showMenu = false;
  isAuthorized = false;

  navItems = NAVIGATION_MENU;

  ngOnInit(): void {
    this.authService.restoreSession().subscribe((response) => {
      this.isAuthorized = !!response;
      console.log('Session restored:', response);
    });
  }

  toggleMenu(value: boolean): void {
    this.showMenu = value;
    this.authState.currentUser$
      .subscribe((user) => console.log('Current user:', user))
      .unsubscribe();
  }

  @HostListener('document:keydown.escape')
  closeNavMenuOnEscape(): void {
    this.showMenu = false;
  }

  assistanceRequestHandler(): void {
    this.router.navigate(['tickets', 'create']);
  }

  loginHandler(): void {
    this.authService.logout();
    this.isAuthorized = false;
    this.router.navigate(['/login']);
  }

  searchHandler(value: Event): void {
    alert('Searched for: ' + (value.target as HTMLInputElement).value);
  }

  onMenuClose(value: boolean): void {
    this.showMenu = value;
  }

  onItemClicked(item: NavItem): void {
    this.showMenu = false; // Close the menu after an item is clicked
  }
}
