import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { V1_API_ROUTES } from '../../../lib/constants/v1.api.routes';
import {
  CommentDto,
  CreateCommentDto,
  UpdateCommentDto,
} from '../../../lib/models/ticket.models';
import { HttpService } from '../../../lib/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly httpService = inject(HttpService);

  getTicketComments(ticketId: number): Observable<CommentDto[]> {
    return this.httpService.get<CommentDto[]>(
      V1_API_ROUTES.COMMENTS.GET_BY_TICKET(ticketId)
    );
  }

  getCommentById(id: number): Observable<CommentDto> {
    return this.httpService.get<CommentDto>(
      V1_API_ROUTES.COMMENTS.GET_BY_ID(id)
    );
  }

  createComment(
    ticketId: number,
    data: CreateCommentDto
  ): Observable<CommentDto> {
    return this.httpService.post<CommentDto>(
      V1_API_ROUTES.COMMENTS.CREATE(ticketId),
      data
    );
  }

  updateComment(id: number, data: UpdateCommentDto): Observable<CommentDto> {
    return this.httpService.put<CommentDto>(
      V1_API_ROUTES.COMMENTS.UPDATE(id),
      data
    );
  }

  deleteComment(id: number): Observable<void> {
    return this.httpService.delete<void>(V1_API_ROUTES.COMMENTS.DELETE(id));
  }
}
