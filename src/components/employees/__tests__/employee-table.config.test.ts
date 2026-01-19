import { describe, it, expect } from "vitest";
import {
  COLUMN_HEADERS,
  EXPORT_HEADERS,
  getCellClassName,
  MAX_HISTORY,
  STORAGE_KEY
} from "../employee-table.config";

describe("Constants", () => {
  describe("STORAGE_KEY", () => {
    it("equals the central constant value", () => {
      expect(STORAGE_KEY).toBe("salary-calculator-employees");
    });
  });

  describe("MAX_HISTORY", () => {
    it("equals the central constant value", () => {
      expect(MAX_HISTORY).toBe(20);
    });
  });

  describe("COLUMN_HEADERS", () => {
    it("has 14 headers", () => {
      expect(COLUMN_HEADERS).toHaveLength(14);
    });
  });

  describe("EXPORT_HEADERS", () => {
    it("has 13 headers", () => {
      expect(EXPORT_HEADERS).toHaveLength(13);
    });
  });
});

describe("getCellClassName", () => {
  const employeesLength = 5;

  describe("totals row", () => {
    it("returns totals-row-cell for non-total columns in totals row", () => {
      expect(getCellClassName(5, 0, employeesLength)).toBe("totals-row-cell");
      expect(getCellClassName(5, 1, employeesLength)).toBe("totals-row-cell");
      expect(getCellClassName(5, 5, employeesLength)).toBe("totals-row-cell");
    });

    it("returns totals-row-cell totals-row-total for column 13 in totals row", () => {
      expect(getCellClassName(5, 13, employeesLength)).toBe("totals-row-cell totals-row-total");
    });
  });

  describe("editable cell", () => {
    it("returns editable-cell for column 2 (net salary)", () => {
      expect(getCellClassName(0, 2, employeesLength)).toBe("editable-cell");
      expect(getCellClassName(3, 2, employeesLength)).toBe("editable-cell");
    });
  });

  describe("total cost cell", () => {
    it("returns total-cost-cell for column 13", () => {
      expect(getCellClassName(0, 13, employeesLength)).toBe("total-cost-cell");
      expect(getCellClassName(3, 13, employeesLength)).toBe("total-cost-cell");
    });
  });

  describe("deduction cells", () => {
    it("returns deduction-cell for columns 4-8", () => {
      expect(getCellClassName(0, 4, employeesLength)).toBe("deduction-cell");
      expect(getCellClassName(0, 5, employeesLength)).toBe("deduction-cell");
      expect(getCellClassName(0, 6, employeesLength)).toBe("deduction-cell");
      expect(getCellClassName(0, 7, employeesLength)).toBe("deduction-cell");
      expect(getCellClassName(0, 8, employeesLength)).toBe("deduction-cell");
    });

    it("does not return deduction-cell for column 3", () => {
      expect(getCellClassName(0, 3, employeesLength)).not.toBe("deduction-cell");
    });

    it("does not return deduction-cell for column 9", () => {
      expect(getCellClassName(0, 9, employeesLength)).not.toBe("deduction-cell");
    });
  });

  describe("incentive cell", () => {
    it("returns incentive-cell for column 10", () => {
      expect(getCellClassName(0, 10, employeesLength)).toBe("incentive-cell");
      expect(getCellClassName(3, 10, employeesLength)).toBe("incentive-cell");
    });
  });

  describe("employer cells", () => {
    it("returns employer-cell for columns 9, 11, 12", () => {
      expect(getCellClassName(0, 9, employeesLength)).toBe("employer-cell");
      expect(getCellClassName(0, 11, employeesLength)).toBe("employer-cell");
      expect(getCellClassName(0, 12, employeesLength)).toBe("employer-cell");
    });

    it("does not return employer-cell for column 8", () => {
      expect(getCellClassName(0, 8, employeesLength)).not.toBe("employer-cell");
    });

    it("does not return employer-cell for column 10 (incentive)", () => {
      expect(getCellClassName(0, 10, employeesLength)).not.toBe("employer-cell");
    });
  });

  describe("undefined cells", () => {
    it("returns undefined for column 0 (actions)", () => {
      expect(getCellClassName(0, 0, employeesLength)).toBeUndefined();
    });

    it("returns undefined for column 1 (name)", () => {
      expect(getCellClassName(0, 1, employeesLength)).toBeUndefined();
    });

    it("returns undefined for column 3 (gross)", () => {
      expect(getCellClassName(0, 3, employeesLength)).toBeUndefined();
    });
  });

  describe("edge cases", () => {
    it("handles empty employees list", () => {
      expect(getCellClassName(0, 2, 0)).toBe("totals-row-cell");
    });

    it("handles single employee", () => {
      expect(getCellClassName(0, 2, 1)).toBe("editable-cell");
      expect(getCellClassName(1, 2, 1)).toBe("totals-row-cell");
    });
  });
});
