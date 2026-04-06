import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { TicketService } from '../services/ticket.service';
import { TicketModel, CreateTicketDto, UpdateTicketDto } from '../../../lib/models/ticket.models';

@Component({
  selector: 'ui-ticket-edit-page',
  imports: [MatCardModule, MatProgressSpinnerModule, TicketFormComponent, NgIf],
  templateUrl: './ticket-edit-page.component.html',
  styleUrl: './ticket-edit-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketEditPageComponent implements OnInit {
  private readonly ticketService = inject(TicketService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly ticket = signal<TicketModel | null>(null);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  private get ticketId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadTicket();
  }

  private loadTicket(): void {
    this.isLoading.set(true);
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (ticket) => {
        this.ticket.set(ticket);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  onSave(dto: CreateTicketDto | UpdateTicketDto): void {
    const updateDto = dto as UpdateTicketDto;
    this.isSaving.set(true);
    this.errorMessage.set(null);

    this.ticketService.updateTicket(this.ticketId, updateDto).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.router.navigate(['/tickets', this.ticketId]);
      },
      error: (err: Error) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.message);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/tickets', this.ticketId]);
  }
}
