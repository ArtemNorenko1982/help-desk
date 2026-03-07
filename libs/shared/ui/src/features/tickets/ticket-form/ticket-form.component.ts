import {
  ChangeDetectionStrategy,
  Component,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../../lib/button/button.component';
import {
  TicketForm,
  TICKET_PRIORITIES as priorities,
  TICKET_STATUSES as statuses,
} from './ticket-form.type';
import { FormFieldComponent } from '../../../lib/form-field/form-field.component';

@Component({
  selector: 'ui-ticket-form',
  imports: [
    FormFieldComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFormComponent {
  protected submitButtonLabel = 'Submit';
  private formBuilder = inject(FormBuilder);
  readonly ticketPriorities = priorities;
  readonly ticketStatuses = statuses;
  @Output()
  save = new EventEmitter<TicketForm>();

  readonly ticketForm = this.formBuilder.group({
    title: ['Help Desk Request form'],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.email],
    details: ['', Validators.required],
    priority: ['', Validators.required],
    status: ['new', Validators.required],
  });

  submit() {
    this.save.emit(this.ticketForm.getRawValue() as TicketForm);
  }
}
