import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import cn from '../../utils/cn';
import { CARD_STYLES } from '../card.styles';

@Component({
  selector: 'ui-card-subtitle',
  imports: [],
  templateUrl: './card-subtitle.component.html',
  styleUrl: './card-subtitle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSubtitleComponent {
  @Input() class = '';
  get classes(): string {
    return cn(CARD_STYLES.subtitle, this.class);
  }
}
