import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { DashboardService } from './services/dashboard.service';
import { DashboardTicket, DashboardUser } from './mock-data/dashboard.mock';
import { TicketStatsChartComponent, ChartFilter } from './ticket-stats-chart/ticket-stats-chart.component';

@Component({
  selector: 'ui-dashboard',
  standalone: true,
  imports: [
    NgClass,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    TicketStatsChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly activeFilter = signal<ChartFilter>(null);

  readonly todaysNewTickets = toSignal(
    this.dashboardService.getTodaysNewTickets(),
    { initialValue: [] as DashboardTicket[] }
  );
  readonly todaysClosedTickets = toSignal(
    this.dashboardService.getTodaysClosedTickets(),
    { initialValue: [] as DashboardTicket[] }
  );
  readonly inProgressTickets = toSignal(
    this.dashboardService.getAllInProgressTickets(),
    { initialValue: [] as DashboardTicket[] }
  );
  readonly users = toSignal(
    this.dashboardService.getUsersWithTickets(),
    { initialValue: [] as DashboardUser[] }
  );
  readonly stats = toSignal(this.dashboardService.getTicketStats(), { initialValue: [] });

  readonly usersDisplayedColumns = ['name', 'email', 'role', 'ticketCount'];

  selectFilter(filter: ChartFilter): void {
    this.activeFilter.update((current) => (current === filter ? null : filter));
  }

  isFilterActive(filter: ChartFilter): boolean {
    return this.activeFilter() === filter;
  }
}

