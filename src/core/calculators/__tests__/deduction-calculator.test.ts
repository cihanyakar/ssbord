import { describe, it, expect } from "vitest";
import { calculateDeduction, calculateSGKDeduction } from "../deduction-calculator";

describe("calculateDeduction", () => {
  it("calculates percentage deduction", () => {
    expect(calculateDeduction(10000, 0.14)).toBe(1400);
  });

  it("returns 0 for 0 rate", () => {
    expect(calculateDeduction(10000, 0)).toBe(0);
  });

  it("calculates full amount for 100% rate", () => {
    expect(calculateDeduction(10000, 1)).toBe(10000);
  });

  it("rounds to two decimal places", () => {
    expect(calculateDeduction(10000, 0.00759)).toBe(75.9);
  });

  it("throws error for negative amount", () => {
    expect(() => calculateDeduction(-1000, 0.14)).toThrow("Tutar negatif olamaz");
  });

  it("throws error for rate below 0", () => {
    expect(() => calculateDeduction(1000, -0.1)).toThrow("Oran 0 ile 1 arasında olmalıdır");
  });

  it("throws error for rate above 1", () => {
    expect(() => calculateDeduction(1000, 1.5)).toThrow("Oran 0 ile 1 arasında olmalıdır");
  });
});

describe("calculateSGKDeduction", () => {
  const ceiling = 69007.5;

  it("calculates deduction for salary below ceiling", () => {
    const deduction = calculateSGKDeduction(30000, 0.14, ceiling);

    expect(deduction).toBe(4200); // 30000 * 0.14
  });

  it("caps deduction at ceiling", () => {
    const deduction = calculateSGKDeduction(100000, 0.14, ceiling);

    expect(deduction).toBe(9661.05); // 69007.5 * 0.14
  });

  it("calculates exactly at ceiling", () => {
    const deduction = calculateSGKDeduction(69007.5, 0.14, ceiling);

    expect(deduction).toBe(9661.05);
  });

  it("handles zero salary", () => {
    const deduction = calculateSGKDeduction(0, 0.14, ceiling);

    expect(deduction).toBe(0);
  });

  it("handles employer rate", () => {
    const deduction = calculateSGKDeduction(30000, 0.205, ceiling);

    expect(deduction).toBe(6150); // 30000 * 0.205
  });
});
