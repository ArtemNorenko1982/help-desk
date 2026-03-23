import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../app-shell/app-header/header.component';
import { FooterComponent } from '../app-shell/app-footer/footer.component';
import { ContentComponent } from '../app-shell/app-content/content.component';
import { AuthService, AuthStateService } from '@shared-ui';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AsyncPipe,
    NgIf,
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

  ngOnInit(): void {
    this.authService.restoreSession().subscribe((response) => {
      this.isAuthorized = !!response;
      console.log('Session restored:', response);
    });
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    this.authState.currentUser$.subscribe((user) =>
      console.log('Current user:', user)
    );
    console.log('Menu toggled:', this.showMenu);
  }

  @HostListener('document:keydown.escape')
  closeNavMenuOnEscape(): void {
    this.showMenu = false;
  }

  assistanceRequestHandler(): void {
    this.router.navigate(['tickets', 'create']);
  }

  loginHandler(): void {
    this.router.navigate(['/login']);
  }

  searchHandler(value: Event): void {
    alert('Searched for: ' + (value.target as HTMLInputElement).value);
  }
}
