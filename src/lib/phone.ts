export function splitPhoneNumbers(input: string): string[] {
  return input
    .split(/[;,]/)
    .map((p) => p.trim())
    .filter(Boolean);
}
