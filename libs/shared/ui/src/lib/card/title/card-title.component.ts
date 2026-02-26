import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import cn from '../../utils/cn';
import { CARD_STYLES } from '../card.styles';

@Component({
  selector: 'ui-card-title',
  imports: [],
  templateUrl: './card-title.component.html',
  styleUrl: './card-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent {
  @Input() class = '';
  get classes(): string {
    return cn(CARD_STYLES.title, this.class);
  }
}
