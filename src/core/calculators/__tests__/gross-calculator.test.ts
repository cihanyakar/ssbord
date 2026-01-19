import { describe, it, expect } from "vitest";
import { DEFAULT_TAX_CONFIG } from "../../config/tax-config";
import { calculateGrossFromNet } from "../gross-calculator";
import { calculateNetFromGross } from "../net-calculator";

describe("calculateGrossFromNet", () => {
  it("throws error for zero net", () => {
    expect(() => calculateGrossFromNet(0, DEFAULT_TAX_CONFIG)).toThrow("Net maaş pozitif olmalıdır");
  });

  it("throws error for negative net", () => {
    expect(() => calculateGrossFromNet(-1000, DEFAULT_TAX_CONFIG)).toThrow("Net maaş pozitif olmalıdır");
  });

  it("converges to correct net salary", () => {
    const targetNet = 20000;
    const result = calculateGrossFromNet(targetNet, DEFAULT_TAX_CONFIG);

    expect(result.net).toBe(targetNet);
  });

  it("inverse of net calculation equals original gross", () => {
    const originalGross = 30000;
    const netResult = calculateNetFromGross(originalGross, DEFAULT_TAX_CONFIG);
    const grossResult = calculateGrossFromNet(netResult.net, DEFAULT_TAX_CONFIG);

    expect(grossResult.gross).toBeCloseTo(originalGross, 0);
  });

  it("calculates correct gross for minimum wage net", () => {
    const targetNet = DEFAULT_TAX_CONFIG.minimumWage.net;
    const result = calculateGrossFromNet(targetNet, DEFAULT_TAX_CONFIG);

    expect(result.gross).toBeCloseTo(DEFAULT_TAX_CONFIG.minimumWage.gross, 0);
  });

  it("handles various net salary values", () => {
    const testCases = [15000, 20000, 30000, 50000, 100000];

    testCases.forEach(targetNet => {
      const result = calculateGrossFromNet(targetNet, DEFAULT_TAX_CONFIG);

      expect(result.net).toBe(targetNet);
      expect(result.gross).toBeGreaterThan(targetNet);
    });
  });

  it("returns consistent results for same input", () => {
    const targetNet = 25000;
    const result1 = calculateGrossFromNet(targetNet, DEFAULT_TAX_CONFIG);
    const result2 = calculateGrossFromNet(targetNet, DEFAULT_TAX_CONFIG);

    expect(result1.gross).toBe(result2.gross);
    expect(result1.totalCost).toBe(result2.totalCost);
  });
});
