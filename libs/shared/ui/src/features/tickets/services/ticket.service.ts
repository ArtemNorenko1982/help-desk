import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../../lib/services/http.service';
import {
  TicketModel,
  CreateTicketDto,
  UpdateTicketDto,
} from '../../../lib/models/ticket.models';
import { V1_API_ROUTES } from '../../../lib/constants/v1.api.routes';
import { AuthStateService } from '../../auth/services/auth-state.service';
import { UserRole } from '../../../lib/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly httpService = inject(HttpService);
  private readonly authStateService = inject(AuthStateService);
  private currentUser = this.authStateService.loadStoredUser();
  getMyTickets(): Observable<TicketModel[]> {
    return this.httpService.get<TicketModel[]>(V1_API_ROUTES.TICKETS.GET_MY);
  }

  getAllTickets(): Observable<TicketModel[]> {
    return this.httpService.get<TicketModel[]>(V1_API_ROUTES.TICKETS.GET_ALL);
  }

  getTickets(): Observable<TicketModel[]> {
    if (this.currentUser?.role === UserRole.Admin) {
      return this.getAllTickets();
    } else {
      return this.getMyTickets();
    }
  }

  getTicketById(id: number): Observable<TicketModel> {
    return this.httpService.get<TicketModel>(
      V1_API_ROUTES.TICKETS.GET_BY_ID(id)
    );
  }

  createTicket(data: CreateTicketDto): Observable<TicketModel> {
    return this.httpService.post<TicketModel>(
      V1_API_ROUTES.TICKETS.CREATE,
      data
    );
  }

  updateTicket(id: number, data: UpdateTicketDto): Observable<TicketModel> {
    return this.httpService.put<TicketModel>(
      V1_API_ROUTES.TICKETS.UPDATE(id),
      data
    );
  }

  deleteTicket(id: number): Observable<void> {
    return this.httpService.delete<void>(V1_API_ROUTES.TICKETS.DELETE(id));
  }
}
