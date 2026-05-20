export type Currency = "FCFA" | "EUR" | "USD";

export const currencies: {
  value: Currency;
  label: string;
  symbol: string;
}[] = [
  { value: "FCFA", label: "FCFA", symbol: "FCFA" },
  { value: "EUR", label: "Euro", symbol: "€" },
  { value: "USD", label: "Dollar", symbol: "$" }
];

// Fixed conversion rates relative to 1 USD. Edit anytime.
export const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  FCFA: 600
};

export function convert(amountUsd: number, to: Currency) {
  return amountUsd * rates[to];
}

// Format an amount stored in USD into the chosen display currency.
export function formatMoney(amountUsd: number, currency: Currency = "USD") {
  const value = convert(amountUsd, currency);
  if (currency === "FCFA") {
    return `${Math.round(value).toLocaleString("fr-FR")} FCFA`;
  }
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function currencyLabel(currency: Currency) {
  return currencies.find((c) => c.value === currency)?.label ?? currency;
}
