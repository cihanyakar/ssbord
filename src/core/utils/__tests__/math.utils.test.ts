import { describe, it, expect } from "vitest";
import { roundToTwoDecimals, formatCurrency, formatPercentage } from "../math.utils";

describe("roundToTwoDecimals", () => {
  it("rounds to two decimal places", () => {
    expect(roundToTwoDecimals(1.234)).toBe(1.23);
  });

  it("rounds up correctly", () => {
    expect(roundToTwoDecimals(1.235)).toBe(1.24);
  });

  it("handles integer input", () => {
    expect(roundToTwoDecimals(100)).toBe(100);
  });

  it("handles negative numbers", () => {
    expect(roundToTwoDecimals(-1.234)).toBe(-1.23);
  });

  it("handles zero", () => {
    expect(roundToTwoDecimals(0)).toBe(0);
  });

  it("avoids floating point errors", () => {
    expect(roundToTwoDecimals(0.1 + 0.2)).toBe(0.3);
  });
});

describe("formatCurrency", () => {
  it("formats positive amount", () => {
    const result = formatCurrency(1234.56);

    expect(result).toContain("1.234,56");
    expect(result).toContain("₺");
  });

  it("formats zero", () => {
    const result = formatCurrency(0);

    expect(result).toContain("0,00");
  });

  it("formats negative amount", () => {
    const result = formatCurrency(-1234.56);

    expect(result).toContain("1.234,56");
  });

  it("formats large amounts", () => {
    const result = formatCurrency(1234567.89);

    expect(result).toContain("1.234.567,89");
  });
});

describe("formatPercentage", () => {
  it("formats decimal as percentage", () => {
    expect(formatPercentage(0.14)).toBe("%14.00");
  });

  it("formats zero", () => {
    expect(formatPercentage(0)).toBe("%0.00");
  });

  it("formats small decimal", () => {
    expect(formatPercentage(0.00759)).toBe("%0.76");
  });

  it("formats 100%", () => {
    expect(formatPercentage(1)).toBe("%100.00");
  });

  it("formats fractional percentage", () => {
    expect(formatPercentage(0.205)).toBe("%20.50");
  });
});
