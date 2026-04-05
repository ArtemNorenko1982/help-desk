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

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, InputComponent, RouterLink],
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
    });
  }

  @Input({ required: true }) title = '';
  @Input() showMenu = false;

  @Output() menuButtonClick = new EventEmitter<boolean>();
  @Output() requestAssistance = new EventEmitter<void>();
  @Output() searchInput = new EventEmitter<Event>();
  @Output() loginClick = new EventEmitter<void>();

  // might be taken from service in real app
  protected assistanceButtonLabel = 'Request Assistance';
  protected loginButtonLabel = 'Login';

  onMenuClick(): void {
    this.menuButtonClick.emit(!this.showMenu);
  }
}
