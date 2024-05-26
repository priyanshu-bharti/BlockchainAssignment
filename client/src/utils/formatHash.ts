export function formatHash(hash: string) {
  const start = hash.slice(0, 6);
  const end = hash.slice(hash.length - 6, hash.length);
  return start + "..." + end;
}
