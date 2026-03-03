import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TicketsListPageComponent } from './tickets-list-page/tickets-list-page.component';

@Component({
  selector: 'ui-tickets-shell',
  imports: [TicketsListPageComponent],
  templateUrl: './tickets-shell.component.html',
  styleUrl: './tickets-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsShellComponent {}
