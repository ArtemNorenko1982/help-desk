import { ButtonSize, ButtonVariant } from './button.types';

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 font-medium rounded-md ' +
  'transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ' +
  'disabled:opacity-50 disabled:cursor-not-allowed select-none';

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

const ICON_ONLY_SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 w-8 p-0',
  md: 'h-10 w-10 p-0',
  lg: 'h-12 w-12 p-0',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-ui-text3 hover:bg-brand-primaryHover active:bg-brand-primaryActive',
  secondary:
    'bg-brand-secondary text-ui-text3 hover:bg-brand-secondaryHover active:bg-brand-secondaryActive',
  ghost:
    'bg-ui-surface border border-ui-border text-ui-text hover:bg-ui-surfaceAlt active:bg-ui-surfaceAlt',
  danger: 'bg-status-danger text-ui-text3 hover:opacity-90 active:opacity-80',
};

export const BUTTON_STYLES = {
  base: BUTTON_BASE,
  sizes: SIZES,
  variants: VARIANTS,
  iconOnlySizes: ICON_ONLY_SIZES,
};
