import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../../lib/services/http.service';
import { TicketModel, CreateTicketDto, UpdateTicketDto } from '../../../lib/models/ticket.models';
import { V1_API_ROUTES } from '../../../lib/constants/v1.api.routes';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly httpService = inject(HttpService);

  getMyTickets(): Observable<TicketModel[]> {
    return this.httpService.get<TicketModel[]>(V1_API_ROUTES.TICKETS.GET_MY);
  }

  getAllTickets(): Observable<TicketModel[]> {
    return this.httpService.get<TicketModel[]>(V1_API_ROUTES.TICKETS.GET_ALL);
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

  updateTicket(
    id: number,
    data: UpdateTicketDto
  ): Observable<TicketModel> {
    return this.httpService.put<TicketModel>(
      V1_API_ROUTES.TICKETS.UPDATE(id),
      data
    );
  }

  deleteTicket(id: number): Observable<void> {
    return this.httpService.delete<void>(V1_API_ROUTES.TICKETS.DELETE(id));
  }
}
