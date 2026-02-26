import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Input } from '@angular/core';
import cn from '../../utils/cn';
import { CARD_STYLES } from '../card.styles';

@Component({
  selector: 'ui-card-header',
  imports: [],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() class = '';

  get classes(): string {
    return cn(CARD_STYLES.header, this.class);
  }
}
