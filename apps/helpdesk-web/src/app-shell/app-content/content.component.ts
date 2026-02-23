import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import {
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  CardContentComponent,
  CardFooterComponent,
  CardHeaderComponent,
  CardSubtitleComponent,
  CardTitleComponent,
  InputComponent,
} from '@shared-ui';

type NavItem = { label: string; icon: string; link: string };

@Component({
  selector: 'app-content',
  imports: [
    RouterOutlet,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardHeaderComponent,
    CardFooterComponent,
    CardTitleComponent,
    CardSubtitleComponent,
    CardContentComponent,
    InputComponent,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  @Input() isSidebarCollapsed = false;
}
