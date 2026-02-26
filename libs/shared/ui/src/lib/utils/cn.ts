export default function cn(...classes: any[]) {
  return classes.flat(Infinity).filter(Boolean).join(' ');
}
