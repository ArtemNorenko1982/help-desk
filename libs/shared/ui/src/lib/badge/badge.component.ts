import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import cn from '../utils/cn';
import { BadgeSize, BadgeVariant } from './badge.types';
import { BADGE_STYLES } from './badge.styles';

@Component({
  selector: 'ui-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() componentId?: string;
  @Input() variant: BadgeVariant = 'primary';
  @Input() size: BadgeSize = 'md';
  @Input() class = '';

  get classes(): string {
    return cn(
      BADGE_STYLES.base,
      BADGE_STYLES.sizes[this.size],
      BADGE_STYLES.variants[this.variant],
      this.class
    );
  }
}
