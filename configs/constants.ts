const Values = {
  API: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:80/",
} as const;

type ValueKey = keyof typeof Values;

export default function getValue(value: ValueKey): string {
  return Values[value];
}
