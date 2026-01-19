import { describe, it, expect } from "vitest";
import { DEFAULT_TAX_CONFIG } from "../../config/tax-config";
import { calculateNetFromGross } from "../net-calculator";

describe("calculateNetFromGross", () => {
  it("calculates net salary for minimum wage", () => {
    const result = calculateNetFromGross(DEFAULT_TAX_CONFIG.minimumWage.gross, DEFAULT_TAX_CONFIG);

    expect(result.gross).toBe(DEFAULT_TAX_CONFIG.minimumWage.gross);
    expect(result.net).toBeGreaterThan(0);
    expect(result.net).toBeLessThan(result.gross);
  });

  it("throws error for zero gross", () => {
    expect(() => calculateNetFromGross(0, DEFAULT_TAX_CONFIG)).toThrow("Brüt maaş pozitif olmalıdır");
  });

  it("throws error for negative gross", () => {
    expect(() => calculateNetFromGross(-1000, DEFAULT_TAX_CONFIG)).toThrow("Brüt maaş pozitif olmalıdır");
  });

  it("calculates all deductions correctly", () => {
    const result = calculateNetFromGross(30000, DEFAULT_TAX_CONFIG);

    expect(result.deductions.sgkEmployee).toBeGreaterThan(0);
    expect(result.deductions.unemploymentEmployee).toBeGreaterThan(0);
    expect(result.deductions.incomeTax).toBeGreaterThanOrEqual(0);
    expect(result.deductions.stampDuty).toBeGreaterThanOrEqual(0);
    expect(result.deductions.total).toBe(
      result.deductions.sgkEmployee +
      result.deductions.unemploymentEmployee +
      result.deductions.incomeTax +
      result.deductions.stampDuty
    );
  });

  it("calculates employer costs correctly", () => {
    const result = calculateNetFromGross(30000, DEFAULT_TAX_CONFIG);

    expect(result.employerCosts.sgkEmployer).toBeGreaterThan(0);
    expect(result.employerCosts.unemploymentEmployer).toBeGreaterThan(0);
    expect(result.employerCosts.total).toBe(
      result.employerCosts.sgkEmployer +
      result.employerCosts.unemploymentEmployer
    );
  });

  it("calculates total cost correctly", () => {
    const result = calculateNetFromGross(30000, DEFAULT_TAX_CONFIG);

    expect(result.totalCost).toBe(result.gross + result.employerCosts.total);
  });

  it("applies minimum wage tax exemption", () => {
    const result = calculateNetFromGross(30000, DEFAULT_TAX_CONFIG);

    expect(result.deductions.minimumWageTaxExemption).toBeGreaterThan(0);
  });

  it("respects SGK ceiling for high salaries", () => {
    const highSalary = DEFAULT_TAX_CONFIG.sgkCeiling * 2;
    const result = calculateNetFromGross(highSalary, DEFAULT_TAX_CONFIG);

    const maxSgkEmployee = DEFAULT_TAX_CONFIG.sgkCeiling * DEFAULT_TAX_CONFIG.sgk.employeeRate;

    expect(result.deductions.sgkEmployee).toBeLessThanOrEqual(maxSgkEmployee + 0.01);
  });
});
