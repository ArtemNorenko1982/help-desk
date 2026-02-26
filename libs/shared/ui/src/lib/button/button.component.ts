import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import cn from '../utils/cn';
import { ButtonSize, ButtonType, ButtonVariant } from './button.types';
import { BUTTON_STYLES } from './button.styles';

@Component({
  selector: 'ui-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() componentId?: string;
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() iconOnly = false;
  @Input() class = '';

  @Output() buttonClick = new EventEmitter<Event>();

  get classes(): string {
    return cn(
      BUTTON_STYLES.base,
      this.iconOnly
        ? BUTTON_STYLES.iconOnlySizes[this.size]
        : BUTTON_STYLES.sizes[this.size],
      BUTTON_STYLES.variants[this.variant],
      this.class
    );
  }

  handleClick(event: Event): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
