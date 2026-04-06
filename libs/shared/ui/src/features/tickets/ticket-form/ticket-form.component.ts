import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
  inject,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import {
  TICKET_PRIORITIES as priorities,
  TICKET_STATUSES as statuses,
} from './ticket-form.type';
import { CreateTicketDto, UpdateTicketDto, TicketModel } from '../../../lib/models/ticket.models';

export type TicketFormMode = 'create' | 'edit';

export interface TicketFormValue {
  title: string;
  description: string;
  priority: string;
  status?: string;
}

@Component({
  selector: 'ui-ticket-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf,
  ],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  @Input() mode: TicketFormMode = 'create';
  @Input() ticket: TicketModel | null = null;
  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;

  @Output() save = new EventEmitter<CreateTicketDto | UpdateTicketDto>();
  @Output() cancel = new EventEmitter<void>();

  readonly ticketPriorities = priorities;
  readonly ticketStatuses = statuses;

  readonly ticketForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    priority: ['medium', Validators.required],
    status: ['new', Validators.required],
  });

  get submitLabel(): string {
    return this.mode === 'create' ? 'Create Ticket' : 'Save Changes';
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  ngOnInit(): void {
    if (this.ticket && this.mode === 'edit') {
      this.ticketForm.patchValue({
        title: this.ticket.title,
        description: this.ticket.description,
        priority: this.ticket.priority,
        status: this.ticket.status,
      });
    }
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const { title, description, priority, status } = this.ticketForm.getRawValue();

    if (this.mode === 'create') {
      const dto: CreateTicketDto = {
        title: title!,
        description: description!,
        priority: priority!,
      };
      this.save.emit(dto);
    } else {
      const dto: UpdateTicketDto = {
        title: title ?? undefined,
        description: description ?? undefined,
        priority: priority ?? undefined,
        status: status ?? undefined,
      };
      this.save.emit(dto);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
