import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Input } from '@angular/core';
import { CardVariant } from './card.types';
import cn from '../utils/cn';
import { CARD_STYLES } from './card.styles';

@Component({
  selector: 'ui-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() componentId?: string;
  @Input() variant: CardVariant = 'default';
  @Input() class = '';

  get classes(): string {
    return cn(CARD_STYLES.base, CARD_STYLES.variants[this.variant], this.class);
  }
}
