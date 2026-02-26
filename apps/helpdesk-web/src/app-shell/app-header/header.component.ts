import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonComponent, InputComponent } from '@shared-ui';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, InputComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) title = '';

  @Output() menuClick = new EventEmitter<void>();
  @Output() requestAssistance = new EventEmitter<void>();
  @Output() searchInput = new EventEmitter<Event>();
  @Output() loginClick = new EventEmitter<void>();

  // might be taken from service in real app
  protected assistanceButtonLabel = 'Request Assistance';
  protected loginButtonLabel = 'Login';
}
