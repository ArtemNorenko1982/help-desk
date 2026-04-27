import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserRole } from '../../../lib/models/auth.models';
import { CommentDto } from '../../../lib/models/ticket.models';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'ui-ticket-comments',
  imports: [
    DatePipe,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './ticket-comments.component.html',
  styleUrl: './ticket-comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketCommentsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly commentService = inject(CommentService);

  @Input({ required: true }) ticketId!: number;
  @Input() comments: CommentDto[] = [];
  @Input() currentUsername: string | null = null;
  @Input() currentUserRole: UserRole | null = null;

  @Output() commentsChanged = new EventEmitter<void>();

  readonly isSaving = signal(false);
  readonly deletingCommentId = signal<number | null>(null);
  readonly editingCommentId = signal<number | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly commentForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(2)]],
  });

  readonly editForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(2)]],
  });

  canManage(comment: CommentDto): boolean {
    return (
      this.currentUserRole === UserRole.Admin ||
      (!!this.currentUsername && comment.username === this.currentUsername)
    );
  }

  startEdit(comment: CommentDto): void {
    this.errorMessage.set(null);
    this.editingCommentId.set(comment.id);
    this.editForm.setValue({ content: comment.content });
  }

  cancelEdit(): void {
    this.editingCommentId.set(null);
    this.editForm.reset({ content: '' });
  }

  createComment(): void {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    const content = this.commentForm.controls.content.value?.trim();
    if (!content) {
      this.commentForm.controls.content.setErrors({ required: true });
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.commentService.createComment(this.ticketId, { content }).subscribe({
      next: () => {
        this.commentForm.reset({ content: '' });
        this.isSaving.set(false);
        this.commentsChanged.emit();
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.isSaving.set(false);
      },
    });
  }

  updateComment(commentId: number): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const content = this.editForm.controls.content.value?.trim();
    if (!content) {
      this.editForm.controls.content.setErrors({ required: true });
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.commentService.updateComment(commentId, { content }).subscribe({
      next: () => {
        this.cancelEdit();
        this.isSaving.set(false);
        this.commentsChanged.emit();
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.isSaving.set(false);
      },
    });
  }

  deleteComment(commentId: number): void {
    this.deletingCommentId.set(commentId);
    this.errorMessage.set(null);
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.deletingCommentId.set(null);
        this.commentsChanged.emit();
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.deletingCommentId.set(null);
      },
    });
  }
}
