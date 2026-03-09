import { V1_API_ROUTES, AUTH_TOKEN_KEY } from '../../../lib/constants/v1.api.routes';';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../../lib/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly httpService = inject(HttpService);
  private readonly authToken = inject(AuthService).getToken();

  getMyTickets(): Observable<Ticket[]> {
    return this.httpService.get<Ticket[]>(V1_API_ROUTES.TICKETS.GET_MY, {
      headers: { Authorization: `Bearer ${this.authToken}` },
    });
  }


}
