import { ControlSize } from './form-field.types';
const CONTROL_FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary';

const CONTROL_BASE =
  'w-full rounded-md border bg-ui-surface transition outline-none ' +
  'placeholder:text-ui-muted ';

const CONTROL_SIZES: Record<ControlSize, string> = {
  sm: 'h-8 text-xs px-3',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
};

const CONTROL_STATES = {
  default: 'border-ui-border',
  error: 'border-status-danger focus-visible:ring-status-danger',
  disabled: 'bg-ui-surfaceAlt text-ui-muted cursor-not-allowed opacity-70',
};

export const FORM_FIELD_STYLES = {
  focus: CONTROL_FOCUS,
  base: CONTROL_BASE,
  size: CONTROL_SIZES,
  state: CONTROL_STATES,
};
