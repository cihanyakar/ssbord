export function formatNumericDisplay(num: number, decimalPlaces: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  }).format(num);
}

export function parseTurkishNumericInput(input: string): number | null {
  const cleaned = input
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  if (cleaned === "" || cleaned === "-") {
    return null;
  }

  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? null : parsed;
}
