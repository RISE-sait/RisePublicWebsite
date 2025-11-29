const Values = {
  API:
    process.env.NODE_ENV === "test"
      ? "https://localhost:3000/"
      : "http://localhost:80/",
} as const;

type ValueKey = keyof typeof Values;

export default function getValue(value: ValueKey): string {
  return Values[value];
}
