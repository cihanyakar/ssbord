import { describe, it, expect } from "vitest";
import type { SalaryCalculationResult } from "../../types";
import {
  calculateEmployeeTotals,
  employeeToExportRow,
  totalsToExportRow
} from "../employee.utils";

const mockResult: SalaryCalculationResult = {
  gross: 30000,
  net: 20000,
  deductions: {
    sgkEmployee: 4200,
    unemploymentEmployee: 300,
    incomeTaxBase: 25500,
    incomeTax: 3825,
    stampDuty: 227.7,
    minimumWageTaxExemption: 500,
    minimumWageStampDutyExemption: 50,
    total: 8552.7
  },
  employerCosts: {
    sgkEmployer: 6150,
    sgkIncentive: 1500,
    unemploymentEmployer: 600,
    total: 6750
  },
  totalCost: 36750
};

describe("calculateEmployeeTotals", () => {
  it("calculates totals for single employee", () => {
    const employees = [{ netSalary: 20000, result: mockResult }];
    const totals = calculateEmployeeTotals(employees);

    expect(totals.netSalary).toBe(20000);
    expect(totals.gross).toBe(30000);
    expect(totals.sgkEmployee).toBe(4200);
    expect(totals.totalCost).toBe(36750);
  });

  it("calculates totals for multiple employees", () => {
    const employees = [
      { netSalary: 20000, result: mockResult },
      { netSalary: 20000, result: mockResult }
    ];
    const totals = calculateEmployeeTotals(employees);

    expect(totals.netSalary).toBe(40000);
    expect(totals.gross).toBe(60000);
    expect(totals.totalCost).toBe(73500);
  });

  it("ignores employees without results", () => {
    const employees = [
      { netSalary: 20000, result: mockResult },
      { netSalary: null, result: null }
    ];
    const totals = calculateEmployeeTotals(employees);

    expect(totals.netSalary).toBe(20000);
    expect(totals.gross).toBe(30000);
  });

  it("returns zeros for empty array", () => {
    const totals = calculateEmployeeTotals([]);

    expect(totals.netSalary).toBe(0);
    expect(totals.gross).toBe(0);
    expect(totals.totalCost).toBe(0);
  });

  it("handles all employees without results", () => {
    const employees = [
      { netSalary: null, result: null },
      { netSalary: null, result: null }
    ];
    const totals = calculateEmployeeTotals(employees);

    expect(totals.netSalary).toBe(0);
    expect(totals.gross).toBe(0);
  });
});

describe("employeeToExportRow", () => {
  it("creates export row with result", () => {
    const row = employeeToExportRow("Test Employee", 20000, mockResult);

    expect(row[0]).toBe("Test Employee");
    expect(row[1]).toBe(20000);
    expect(row[2]).toBe(30000);
    expect(row[12]).toBe(36750);
  });

  it("creates export row without result", () => {
    const row = employeeToExportRow("Test Employee", null, null);

    expect(row[0]).toBe("Test Employee");
    expect(row[1]).toBe("");
    expect(row[2]).toBe("");
  });

  it("handles partial data with netSalary but no result", () => {
    const row = employeeToExportRow("Test", 15000, null);

    expect(row[0]).toBe("Test");
    expect(row[1]).toBe(15000);
    expect(row[2]).toBe("");
  });
});

describe("totalsToExportRow", () => {
  it("creates totals export row", () => {
    const totals = {
      netSalary: 40000,
      gross: 60000,
      sgkEmployee: 8400,
      unemploymentEmployee: 600,
      incomeTax: 7650,
      stampDuty: 455.4,
      totalDeductions: 17105.4,
      sgkEmployer: 12300,
      sgkIncentive: 3000,
      unemploymentEmployer: 1200,
      employerTotal: 13500,
      totalCost: 73500
    };

    const row = totalsToExportRow(totals);

    expect(row[0]).toBe("TOPLAM");
    expect(row[1]).toBe(40000);
    expect(row[2]).toBe(60000);
    expect(row[12]).toBe(73500);
  });
});
