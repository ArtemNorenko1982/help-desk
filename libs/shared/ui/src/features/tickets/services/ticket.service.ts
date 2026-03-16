import { V1_API_ROUTES } from '../../../lib/constants/v1.api.routes';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../../lib/services/http.service';
import { AuthService } from '@lib/services/auth.service';
import { TicketModel } from '../../../lib/models/ticket.models';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly httpService = inject(HttpService);
  private readonly authToken = inject(AuthService).getToken() || '';

  private setAuthHeaders() {
    return {
      Authorization: `Bearer ${this.authToken}`,
    };
  }

  getMyTickets(): Observable<TicketModel[]> {
    return this.httpService.get<TicketModel[]>(V1_API_ROUTES.TICKETS.GET_MY, {
      headers: this.setAuthHeaders(),
    });
  }


}
