export const getRandom = (arr: string[], n: number) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

export const INTERIOR_LABELS = ["interior_front", "interior_rear", "dashboard"];

export const formatCurrency = (
  amount: number,
  currency = "INR",
  locale = "en-IN",
) => {
  if (!amount || amount <= 0) return "Ask for Price";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(amount);
};
