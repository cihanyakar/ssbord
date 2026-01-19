import type { TaxConfig, SalaryCalculationResult } from "../types";
import { calculateNetFromGross } from "./net-calculator";

/**
 * Calculate gross salary from net salary using iterative approach
 * Uses Newton-Raphson-like iteration for convergence
 */
export function calculateGrossFromNet(
  targetNet: number,
  config: TaxConfig
): SalaryCalculationResult {
  if (targetNet <= 0) {
    throw new Error("Net maaş pozitif olmalıdır");
  }

  // Initial estimate: assume ~30% total deductions
  let grossEstimate = targetNet / 0.7;

  const maxIterations = 100;
  const tolerance = 0.01; // 1 kuruş precision

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const result = calculateNetFromGross(grossEstimate, config);

    const netDifference = targetNet - result.net;

    // Close enough?
    if (Math.abs(netDifference) < tolerance) {
      return {
        ...result,
        net: targetNet // Use exact target for precision
      };
    }

    // Adjust estimate proportionally
    // Calculate adjustment factor based on effective deduction rate
    const effectiveDeductionRate = 1 - (result.net / result.gross);
    const adjustmentFactor = 1 / (1 - effectiveDeductionRate);

    // Move towards target
    grossEstimate = grossEstimate + (netDifference * adjustmentFactor * 0.8);

    // Safety: prevent negative or unreasonably high values
    if (grossEstimate <= 0) {
      grossEstimate = targetNet;
    }
    if (grossEstimate > targetNet * 5) {
      grossEstimate = targetNet * 2;
    }
  }

  throw new Error(
    `${maxIterations} iterasyon sonra yakınsama sağlanamadı. ` +
    "Bu aşırı değerler veya geçersiz yapılandırma nedeniyle olabilir."
  );
}
