import {
  ChangeDetectionStrategy,
  Component,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../../lib/button/button.component';
import { TicketFormType } from './ticket-form.type';

@Component({
  selector: 'ui-ticket-form',
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFormComponent {
  protected submitButtonLabel = 'Submit';
  protected formTitleLabel = 'Title';
  private fb = inject(FormBuilder);

  @Output()
  save = new EventEmitter<TicketFormType>();

  readonly form = this.fb.group({
    title: [''],
    description: ['Ticket description'],
    priority: ['low'],
  });

  submit() {
    this.save.emit(this.form.getRawValue() as TicketFormType);
  }
}
