import { describe, it, expect } from "vitest";
import { formatNumericDisplay, parseTurkishNumericInput } from "../format.utils";

describe("formatNumericDisplay", () => {
  it("formats integer with 2 decimal places", () => {
    expect(formatNumericDisplay(1000, 2)).toBe("1.000,00");
  });

  it("formats decimal number with 2 decimal places", () => {
    expect(formatNumericDisplay(1234.56, 2)).toBe("1.234,56");
  });

  it("formats with 3 decimal places", () => {
    expect(formatNumericDisplay(0.759, 3)).toBe("0,759");
  });

  it("formats zero", () => {
    expect(formatNumericDisplay(0, 2)).toBe("0,00");
  });

  it("formats negative number", () => {
    expect(formatNumericDisplay(-1234.56, 2)).toBe("-1.234,56");
  });

  it("rounds to specified decimal places", () => {
    expect(formatNumericDisplay(1234.5678, 2)).toBe("1.234,57");
  });

  it("formats large numbers with thousand separators", () => {
    expect(formatNumericDisplay(1234567.89, 2)).toBe("1.234.567,89");
  });
});

describe("parseTurkishNumericInput", () => {
  it("parses simple integer", () => {
    expect(parseTurkishNumericInput("1000")).toBe(1000);
  });

  it("parses Turkish formatted number with thousand separator", () => {
    expect(parseTurkishNumericInput("1.000")).toBe(1000);
  });

  it("parses Turkish formatted decimal", () => {
    expect(parseTurkishNumericInput("1.234,56")).toBe(1234.56);
  });

  it("parses decimal with comma", () => {
    expect(parseTurkishNumericInput("1234,56")).toBe(1234.56);
  });

  it("returns null for empty string", () => {
    expect(parseTurkishNumericInput("")).toBeNull();
  });

  it("returns null for just minus sign", () => {
    expect(parseTurkishNumericInput("-")).toBeNull();
  });

  it("parses negative number", () => {
    expect(parseTurkishNumericInput("-1.234,56")).toBe(-1234.56);
  });

  it("removes non-numeric characters", () => {
    expect(parseTurkishNumericInput("₺1.234,56")).toBe(1234.56);
  });

  it("returns null for invalid input", () => {
    expect(parseTurkishNumericInput("abc")).toBeNull();
  });

  it("parses number with spaces", () => {
    expect(parseTurkishNumericInput("1 234,56")).toBe(1234.56);
  });
});
