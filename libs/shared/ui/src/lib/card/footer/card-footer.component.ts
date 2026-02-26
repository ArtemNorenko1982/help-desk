import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import cn from '../../utils/cn';
import { CARD_STYLES } from '../card.styles';

@Component({
  selector: 'ui-card-footer',
  imports: [],
  templateUrl: './card-footer.component.html',
  styleUrl: './card-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent {
  @Input() class = '';

  get classes(): string {
    return cn(CARD_STYLES.footer, this.class);
  }
}
