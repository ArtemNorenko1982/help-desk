import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import cn from '../utils/cn';
import { FORM_FIELD_STYLES } from './form-field.styles';

@Component({
  selector: 'ui-form-field',
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() required = false;
  @Input() hintText = '';
  @Input() errorText = '';
  @Input() class = '';
  @Input() controlId = '';

  get hasError(): boolean {
    return !!this.errorText;
  }

  get classes(): string {
    return cn(
      FORM_FIELD_STYLES.base,
      FORM_FIELD_STYLES.focus,
      FORM_FIELD_STYLES.size.md,
      FORM_FIELD_STYLES.state.default,
      this.class
    );
  }
}
