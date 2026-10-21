/** Wraps a tab index past either end of a tab list (0…last) around to the other end. */
export function wrapIndex(i: number, last: number) {
  if (i < 0) return last
  if (i > last) return 0
  return i
}
