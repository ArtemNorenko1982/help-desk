import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  DashboardTicket,
  DashboardUser,
  TicketStat,
  MOCK_TICKETS,
  MOCK_USERS,
  MOCK_TICKET_STATS,
} from '../mock-data/dashboard.mock';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private getTodayStart(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private getTodayEnd(): Date {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d;
  }

  getTodaysNewTickets(): Observable<DashboardTicket[]> {
    const start = this.getTodayStart();
    const end = this.getTodayEnd();
    const result = MOCK_TICKETS.filter(
      (t) => t.status === 'new' && t.createdAt >= start && t.createdAt <= end
    );
    return of(result);
  }

  getTodaysClosedTickets(): Observable<DashboardTicket[]> {
    const start = this.getTodayStart();
    const end = this.getTodayEnd();
    const result = MOCK_TICKETS.filter(
      (t) => t.status === 'closed' && t.closedAt && t.closedAt >= start && t.closedAt <= end
    );
    return of(result);
  }

  getAllInProgressTickets(): Observable<DashboardTicket[]> {
    const result = MOCK_TICKETS.filter((t) => t.status === 'in-progress');
    return of(result);
  }

  getTicketStats(): Observable<TicketStat[]> {
    return of(MOCK_TICKET_STATS);
  }

  getUsersWithTickets(): Observable<DashboardUser[]> {
    return of(MOCK_USERS);
  }
}
