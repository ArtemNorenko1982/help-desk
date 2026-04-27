export interface CommentDto {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  userId: number;
  username: string;
}

export interface CreateCommentDto {
  content: string;
}

export interface UpdateCommentDto {
  content: string;
}

export interface TicketModel {
  readonly id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt?: string;
  userId: number;
  username: string;
  comments: CommentDto[];
}

export interface CreateTicketDto {
  title: string;
  description: string;
  priority: string;
}

export interface UpdateTicketDto {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
}
