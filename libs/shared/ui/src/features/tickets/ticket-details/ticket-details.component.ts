import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TicketService } from '../services/ticket.service';
import { TicketModel } from '../../../lib/models/ticket.models';

@Component({
  selector: 'ui-ticket-details',
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    TitleCasePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailsComponent implements OnInit {
  private readonly ticketService = inject(TicketService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly ticket = signal<TicketModel | null>(null);
  readonly isLoading = signal(false);
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

  getPriorityColor(priority: string): string {
    const map: Record<string, string> = {
      critical: 'warn',
      high: 'warn',
      medium: 'accent',
      low: 'primary',
    };
    return map[priority?.toLowerCase()] ?? 'primary';
  }

  onEdit(): void {
    this.router.navigate(['/tickets', this.ticketId, 'edit']);
  }

  onBack(): void {
    this.router.navigate(['/tickets']);
  }
}
