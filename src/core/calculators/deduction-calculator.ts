import { roundToTwoDecimals } from "../utils/math.utils";

export function calculateDeduction(
  baseAmount: number,
  rate: number
): number {
  if (baseAmount < 0) {
    throw new Error("Tutar negatif olamaz");
  }

  if (rate < 0 || rate > 1) {
    throw new Error("Oran 0 ile 1 arasında olmalıdır");
  }

  return roundToTwoDecimals(baseAmount * rate);
}

export function calculateSGKDeduction(
  grossSalary: number,
  rate: number,
  ceiling: number
): number {
  const cappedAmount = Math.min(grossSalary, ceiling);

  return calculateDeduction(cappedAmount, rate);
}
