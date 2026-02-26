import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CARD_STYLES } from '../card.styles';
import cn from '../../utils/cn';

@Component({
  selector: 'ui-card-content',
  imports: [],
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent {
  @Input() class = '';

  get classes(): string {
    return cn(CARD_STYLES.content, this.class);
  }
}
