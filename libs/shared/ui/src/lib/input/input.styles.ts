import { InputSize } from './input.types';

const INPUT_BASE =
  'w-full rounded-md border bg-ui-surface px-3 text-sm transition outline-none ' +
  'placeholder:text-ui-muted focus-visible:ring-2 focus-visible:ring-brand-primary';

const INPUT_SIZES: Record<InputSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

const INPUT_STATES = {
  default: 'border-ui-border',
  error: 'border-status-danger focus-visible:ring-status-danger',
  disabled: 'bg-ui-surfaceAlt text-ui-muted cursor-not-allowed opacity-70',
};

export const INPUT_STYLES = {
  base: INPUT_BASE,
  sizes: INPUT_SIZES,
  states: INPUT_STATES,
};
