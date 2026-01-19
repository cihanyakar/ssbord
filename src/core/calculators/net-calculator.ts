import type { TaxConfig, SalaryCalculationResult } from "../types";
import { roundToTwoDecimals } from "../utils/math.utils";
import { calculateSGKDeduction, calculateDeduction } from "./deduction-calculator";
import { calculateIncomeTax } from "./tax-calculator";

/**
 * Calculate net salary from gross salary
 */
export function calculateNetFromGross(
  gross: number,
  config: TaxConfig
): SalaryCalculationResult {
  if (gross <= 0) {
    throw new Error("Brüt maaş pozitif olmalıdır");
  }

  // Step 1: SGK employee deduction (from gross, capped at ceiling)
  const sgkEmployee = calculateSGKDeduction(
    gross,
    config.sgk.employeeRate,
    config.sgkCeiling
  );

  // Step 2: Unemployment employee deduction (from gross, capped at ceiling)
  const unemploymentEmployee = calculateSGKDeduction(
    gross,
    config.unemployment.employeeRate,
    config.sgkCeiling
  );

  // Step 3: Calculate taxable income before exemption
  const taxableIncomePreExemption = gross - sgkEmployee - unemploymentEmployee;

  // Step 4: Calculate minimum wage tax exemption
  const minWageSgk = calculateSGKDeduction(
    config.minimumWage.gross,
    config.sgk.employeeRate,
    config.sgkCeiling
  );
  const minWageUnemployment = calculateSGKDeduction(
    config.minimumWage.gross,
    config.unemployment.employeeRate,
    config.sgkCeiling
  );
  const minWageTaxableIncome = config.minimumWage.gross - minWageSgk - minWageUnemployment;
  const minimumWageTaxExemption = calculateIncomeTax(minWageTaxableIncome, config.incomeTax);

  // Step 5: Calculate income tax (with exemption applied as deduction from tax, not from income)
  const incomeTaxBeforeExemption = calculateIncomeTax(taxableIncomePreExemption, config.incomeTax);
  const incomeTax = Math.max(0, incomeTaxBeforeExemption - minimumWageTaxExemption);

  // Step 6: Stamp duty with minimum wage exemption
  const stampDutyBeforeExemption = calculateDeduction(gross, config.stampDuty.rate);
  const minimumWageStampDutyExemption = calculateDeduction(
    config.minimumWage.gross,
    config.stampDuty.rate
  );
  const stampDuty = Math.max(0, stampDutyBeforeExemption - minimumWageStampDutyExemption);

  // Step 7: Total deductions
  const totalDeductions = sgkEmployee + unemploymentEmployee + incomeTax + stampDuty;

  // Step 8: Net salary
  const net = gross - totalDeductions;

  // Step 9: Employer costs
  const sgkEmployerBeforeIncentive = calculateSGKDeduction(
    gross,
    config.sgk.employerRate,
    config.sgkCeiling
  );
  const sgkIncentive = calculateSGKDeduction(
    gross,
    config.sgk.employerIncentiveRate,
    config.sgkCeiling
  );
  const sgkEmployer = sgkEmployerBeforeIncentive - sgkIncentive;
  const unemploymentEmployer = calculateSGKDeduction(
    gross,
    config.unemployment.employerRate,
    config.sgkCeiling
  );
  const totalEmployerCosts = sgkEmployer + unemploymentEmployer;

  return {
    gross: roundToTwoDecimals(gross),
    net: roundToTwoDecimals(net),
    deductions: {
      sgkEmployee: roundToTwoDecimals(sgkEmployee),
      unemploymentEmployee: roundToTwoDecimals(unemploymentEmployee),
      incomeTaxBase: roundToTwoDecimals(taxableIncomePreExemption),
      incomeTax: roundToTwoDecimals(incomeTax),
      stampDuty: roundToTwoDecimals(stampDuty),
      minimumWageTaxExemption: roundToTwoDecimals(minimumWageTaxExemption),
      minimumWageStampDutyExemption: roundToTwoDecimals(minimumWageStampDutyExemption),
      total: roundToTwoDecimals(totalDeductions)
    },
    employerCosts: {
      sgkEmployer: roundToTwoDecimals(sgkEmployer),
      sgkIncentive: roundToTwoDecimals(sgkIncentive),
      unemploymentEmployer: roundToTwoDecimals(unemploymentEmployer),
      total: roundToTwoDecimals(totalEmployerCosts)
    },
    totalCost: roundToTwoDecimals(gross + totalEmployerCosts)
  };
}
