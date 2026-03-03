import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';

@Component({
  selector: 'ui-ticket-create-page',
  imports: [TicketFormComponent],
  templateUrl: './ticket-create-page.component.html',
  styleUrl: './ticket-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketCreatePageComponent {}
