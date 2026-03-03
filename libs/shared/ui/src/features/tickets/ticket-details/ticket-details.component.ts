import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-ticket-details',
  imports: [],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailsComponent {}
