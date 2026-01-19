import { describe, it, expect } from "vitest";
import { DEFAULT_TAX_CONFIG } from "../tax-config";

describe("DEFAULT_TAX_CONFIG", () => {
  describe("sgk rates", () => {
    it("has employee rate of 14%", () => {
      expect(DEFAULT_TAX_CONFIG.sgk.employeeRate).toBe(0.14);
    });

    it("has employer rate of 20.5%", () => {
      expect(DEFAULT_TAX_CONFIG.sgk.employerRate).toBe(0.205);
    });

    it("employer rate is higher than employee rate", () => {
      expect(DEFAULT_TAX_CONFIG.sgk.employerRate).toBeGreaterThan(
        DEFAULT_TAX_CONFIG.sgk.employeeRate
      );
    });

    it("has employer incentive rate of 5%", () => {
      expect(DEFAULT_TAX_CONFIG.sgk.employerIncentiveRate).toBe(0.05);
    });

    it("employer incentive rate is less than employer rate", () => {
      expect(DEFAULT_TAX_CONFIG.sgk.employerIncentiveRate).toBeLessThan(
        DEFAULT_TAX_CONFIG.sgk.employerRate
      );
    });
  });

  describe("unemployment rates", () => {
    it("has employee rate of 1%", () => {
      expect(DEFAULT_TAX_CONFIG.unemployment.employeeRate).toBe(0.01);
    });

    it("has employer rate of 2%", () => {
      expect(DEFAULT_TAX_CONFIG.unemployment.employerRate).toBe(0.02);
    });
  });

  describe("stamp duty", () => {
    it("has rate of 0.759%", () => {
      expect(DEFAULT_TAX_CONFIG.stampDuty.rate).toBe(0.00759);
    });

    it("rate is less than 1%", () => {
      expect(DEFAULT_TAX_CONFIG.stampDuty.rate).toBeLessThan(0.01);
    });
  });

  describe("income tax brackets", () => {
    it("has 5 brackets", () => {
      expect(DEFAULT_TAX_CONFIG.incomeTax.brackets).toHaveLength(5);
    });

    it("first bracket starts at 0", () => {
      expect(DEFAULT_TAX_CONFIG.incomeTax.brackets[0].minIncome).toBe(0);
    });

    it("first bracket has 15% rate", () => {
      expect(DEFAULT_TAX_CONFIG.incomeTax.brackets[0].rate).toBe(0.15);
    });

    it("last bracket has no max income (null)", () => {
      const lastBracket = DEFAULT_TAX_CONFIG.incomeTax.brackets[4];

      expect(lastBracket.maxIncome).toBeNull();
    });

    it("last bracket has 40% rate", () => {
      expect(DEFAULT_TAX_CONFIG.incomeTax.brackets[4].rate).toBe(0.40);
    });

    it("brackets have sequential min/max income", () => {
      const brackets = DEFAULT_TAX_CONFIG.incomeTax.brackets;

      for (let i = 1; i < brackets.length; i++) {
        expect(brackets[i].minIncome).toBe(brackets[i - 1].maxIncome);
      }
    });

    it("brackets have increasing rates", () => {
      const brackets = DEFAULT_TAX_CONFIG.incomeTax.brackets;

      for (let i = 1; i < brackets.length; i++) {
        expect(brackets[i].rate).toBeGreaterThan(brackets[i - 1].rate);
      }
    });

    it("all brackets have unique ids", () => {
      const ids = DEFAULT_TAX_CONFIG.incomeTax.brackets.map(b => b.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("minimum wage", () => {
    it("has gross value of 33030.00 (2026)", () => {
      expect(DEFAULT_TAX_CONFIG.minimumWage.gross).toBe(33030.00);
    });

    it("has net value of 28075.50 (2026)", () => {
      expect(DEFAULT_TAX_CONFIG.minimumWage.net).toBe(28075.50);
    });

    it("net is less than gross", () => {
      expect(DEFAULT_TAX_CONFIG.minimumWage.net).toBeLessThan(
        DEFAULT_TAX_CONFIG.minimumWage.gross
      );
    });

    it("net is approximately 85% of gross", () => {
      const ratio = DEFAULT_TAX_CONFIG.minimumWage.net / DEFAULT_TAX_CONFIG.minimumWage.gross;

      expect(ratio).toBeGreaterThan(0.80);
      expect(ratio).toBeLessThan(0.90);
    });
  });

  describe("sgk ceiling", () => {
    it("has value of 297270.00 (2026)", () => {
      expect(DEFAULT_TAX_CONFIG.sgkCeiling).toBe(297270.00);
    });

    it("is greater than minimum wage gross", () => {
      expect(DEFAULT_TAX_CONFIG.sgkCeiling).toBeGreaterThan(
        DEFAULT_TAX_CONFIG.minimumWage.gross
      );
    });

    it("is 9x minimum wage gross (SGK ceiling rule)", () => {
      const ratio = DEFAULT_TAX_CONFIG.sgkCeiling / DEFAULT_TAX_CONFIG.minimumWage.gross;

      expect(ratio).toBe(9);
    });
  });
});
