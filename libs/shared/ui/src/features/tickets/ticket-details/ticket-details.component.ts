import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TicketService } from '../services/ticket.service';
import { TicketModel } from '../../../lib/models/ticket.models';
import { AuthStateService } from '../../auth/services/auth-state.service';
import { UserRole } from '../../../lib/models/auth.models';
import { TicketCommentsComponent } from '../ticket-comments/ticket-comments.component';

@Component({
  selector: 'ui-ticket-details',
  imports: [
    NgIf,
    DatePipe,
    TitleCasePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    TicketCommentsComponent,
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailsComponent implements OnInit {
  private readonly ticketService = inject(TicketService);
  private readonly authStateService = inject(AuthStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly ticket = signal<TicketModel | null>(null);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  private get ticketId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  get currentUsername(): string | null {
    return this.authStateService.currentUser?.username ?? null;
  }

  get currentUserRole(): UserRole | null {
    return this.authStateService.currentUser?.role ?? null;
  }

  ngOnInit(): void {
    this.loadTicket();
  }

  onCommentsChanged(): void {
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
