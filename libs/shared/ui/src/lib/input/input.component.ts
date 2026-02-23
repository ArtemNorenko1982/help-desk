import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { InputSize, InputTypes } from './input.types';
import cn from '../utils/cn';
import { INPUT_STYLES } from './input.styles';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() componentId?: string;
  @Input() type: InputTypes = 'text';
  @Input() size: InputSize = 'md';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() error = false;
  @Input() class = '';

  value = '';

  private onChange: any = (value: any) => {
    // Implementation provided by registerOnChange
  };

  onTouched: () => void = () => {
    // Implementation provided by registerOnTouched
  };

  get classes(): string {
    return cn(
      INPUT_STYLES.base,
      INPUT_STYLES.sizes[this.size],
      this.error ? INPUT_STYLES.states.error : INPUT_STYLES.states.default,
      this.disabled && INPUT_STYLES.states.disabled,
      this.class
    );
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }
}
