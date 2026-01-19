import type { IncomeTaxConfig } from "../types";
import { roundToTwoDecimals } from "../utils/math.utils";

export function calculateIncomeTax(
  taxableIncome: number,
  taxConfig: IncomeTaxConfig
): number {
  if (taxableIncome <= 0) {
    return 0;
  }

  const sortedBrackets = [...taxConfig.brackets].sort(
    (a, b) => a.minIncome - b.minIncome
  );

  let totalTax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of sortedBrackets) {
    const bracketMin = bracket.minIncome;
    const bracketMax = bracket.maxIncome ?? Infinity;

    if (remainingIncome <= 0) {
      break;
    }

    if (taxableIncome <= bracketMin) {
      break;
    }

    const bracketWidth = bracketMax - bracketMin;
    const incomeInBracket = Math.min(
      Math.max(0, taxableIncome - bracketMin),
      bracketWidth
    );

    if (incomeInBracket > 0) {
      totalTax += incomeInBracket * bracket.rate;
    }
  }

  return roundToTwoDecimals(totalTax);
}
