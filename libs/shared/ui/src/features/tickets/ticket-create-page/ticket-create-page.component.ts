import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { TicketService } from '../services/ticket.service';
import { CreateTicketDto, UpdateTicketDto } from '../../../lib/models/ticket.models';

@Component({
  selector: 'ui-ticket-create-page',
  imports: [MatCardModule, TicketFormComponent],
  templateUrl: './ticket-create-page.component.html',
  styleUrl: './ticket-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketCreatePageComponent {
  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  onSave(dto: CreateTicketDto | UpdateTicketDto): void {
    const createDto = dto as CreateTicketDto;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.ticketService.createTicket(createDto).subscribe({
      next: (ticket) => {
        this.isLoading.set(false);
        this.router.navigate(['/tickets', ticket.id]);
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/tickets']);
  }
}
