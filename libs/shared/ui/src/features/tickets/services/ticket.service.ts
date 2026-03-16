import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService, authHeader } from '../../../lib/services/http.service';
import { AuthService } from '../../auth/services/auth.service';
import { TicketModel } from '../../../lib/models/ticket.models';
import { V1_API_ROUTES } from '../../../lib/constants/v1.api.routes';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly httpService = inject(HttpService);
  private readonly authService = inject(AuthService);

  private getAuthHeaders() {
    return authHeader(this.authService.getToken());
  }

  getMyTickets(): Observable<TicketModel[]> {
    return this.httpService.get<TicketModel[]>(V1_API_ROUTES.TICKETS.GET_MY, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllTickets(): Observable<TicketModel[]> {
    return this.httpService.get<TicketModel[]>(V1_API_ROUTES.TICKETS.GET_ALL, {
      headers: this.getAuthHeaders(),
    });
  }

  getTicketById(id: number): Observable<TicketModel> {
    return this.httpService.get<TicketModel>(
      V1_API_ROUTES.TICKETS.GET_BY_ID(id),
      { headers: this.getAuthHeaders() }
    );
  }

  createTicket(data: Omit<TicketModel, 'id'>): Observable<TicketModel> {
    return this.httpService.post<TicketModel>(
      V1_API_ROUTES.TICKETS.CREATE,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  updateTicket(
    id: number,
    data: Partial<Omit<TicketModel, 'id'>>
  ): Observable<TicketModel> {
    return this.httpService.put<TicketModel>(
      V1_API_ROUTES.TICKETS.UPDATE(id),
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteTicket(id: number): Observable<void> {
    return this.httpService.delete<void>(V1_API_ROUTES.TICKETS.DELETE(id), {
      headers: this.getAuthHeaders(),
    });
  }
}
