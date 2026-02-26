import { BadgeSize, BadgeVariant } from './badge.types';

const BADGE_BASE =
  'inline-flex items-center rounded-full font-semibold select-none';

const BADGE_SIZES: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
};

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  primary: 'bg-ui-surfaceAlt text-ui-text border border-ui-border',
  info: 'bg-brand-primarySubtle text-brand-primary',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
};
export const BADGE_STYLES = {
  base: BADGE_BASE,
  sizes: BADGE_SIZES,
  variants: BADGE_VARIANTS,
};
