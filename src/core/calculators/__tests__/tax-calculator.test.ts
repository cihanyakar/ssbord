import { describe, it, expect } from "vitest";
import type { IncomeTaxConfig } from "../../types";
import { calculateIncomeTax } from "../tax-calculator";

const taxConfig: IncomeTaxConfig = {
  brackets: [
    { id: "1", minIncome: 0, maxIncome: 110000, rate: 0.15 },
    { id: "2", minIncome: 110000, maxIncome: 230000, rate: 0.20 },
    { id: "3", minIncome: 230000, maxIncome: 580000, rate: 0.27 },
    { id: "4", minIncome: 580000, maxIncome: 3000000, rate: 0.35 },
    { id: "5", minIncome: 3000000, maxIncome: null, rate: 0.40 }
  ]
};

describe("calculateIncomeTax", () => {
  it("returns 0 for zero income", () => {
    expect(calculateIncomeTax(0, taxConfig)).toBe(0);
  });

  it("returns 0 for negative income", () => {
    expect(calculateIncomeTax(-1000, taxConfig)).toBe(0);
  });

  it("calculates tax for income in first bracket", () => {
    const tax = calculateIncomeTax(50000, taxConfig);

    expect(tax).toBe(7500); // 50000 * 0.15
  });

  it("calculates tax at first bracket boundary", () => {
    const tax = calculateIncomeTax(110000, taxConfig);

    expect(tax).toBe(16500); // 110000 * 0.15
  });

  it("calculates tax spanning two brackets", () => {
    const tax = calculateIncomeTax(150000, taxConfig);

    // First bracket: 110000 * 0.15 = 16500
    // Second bracket: 40000 * 0.20 = 8000
    // Total: 24500
    expect(tax).toBe(24500);
  });

  it("calculates tax spanning multiple brackets", () => {
    const tax = calculateIncomeTax(300000, taxConfig);

    // First: 110000 * 0.15 = 16500
    // Second: 120000 * 0.20 = 24000
    // Third: 70000 * 0.27 = 18900
    // Total: 59400
    expect(tax).toBe(59400);
  });

  it("calculates tax for very high income", () => {
    const tax = calculateIncomeTax(5000000, taxConfig);

    // First: 110000 * 0.15 = 16500
    // Second: 120000 * 0.20 = 24000
    // Third: 350000 * 0.27 = 94500
    // Fourth: 2420000 * 0.35 = 847000
    // Fifth: 2000000 * 0.40 = 800000
    // Total: 1782000
    expect(tax).toBe(1782000);
  });
});
