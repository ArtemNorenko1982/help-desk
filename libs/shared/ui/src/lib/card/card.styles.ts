import { CardVariant } from './card.types';

const CARD_BASE =
  'rounded-xl bg-ui-surface text-ui-text shadow-sm border border-ui-border';

const CARD_VARIANTS: Record<CardVariant, string> = {
  default: '',
  subtle: 'bg-ui-surfaceAlt',
  outline: 'shadow-none bg-transparent',
};

const CARD_HEADER = 'p-4 sm:p-5 border-b border-ui-border';
const CARD_CONTENT = 'p-4 sm:p-5';
const CARD_FOOTER =
  'p-4 sm:p-5 border-t border-ui-border flex items-center gap-2';
const CARD_TITLE = 'text-base sm:text-lg font-semibold leading-tight';
const CARD_SUBTITLE = 'mt-1 text-sm text-ui-muted';

export const CARD_STYLES = {
  base: CARD_BASE,
  variants: CARD_VARIANTS,
  header: CARD_HEADER,
  content: CARD_CONTENT,
  footer: CARD_FOOTER,
  title: CARD_TITLE,
  subtitle: CARD_SUBTITLE,
};
