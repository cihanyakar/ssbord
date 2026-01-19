import { UI_LABELS } from "../constants";
import type { SalaryCalculationResult } from "../types";

export type EmployeeTotals = {
  netSalary: number;
  gross: number;
  sgkEmployee: number;
  unemploymentEmployee: number;
  incomeTax: number;
  stampDuty: number;
  totalDeductions: number;
  sgkEmployer: number;
  sgkIncentive: number;
  unemploymentEmployer: number;
  employerTotal: number;
  totalCost: number;
};

export type EmployeeData = {
  netSalary: number | null;
  result: SalaryCalculationResult | null;
};

export function calculateEmployeeTotals(employees: EmployeeData[]): EmployeeTotals {
  return employees.reduce(
    (acc, emp) => {
      if (emp.result) {
        acc.netSalary += emp.netSalary || 0;
        acc.gross += emp.result.gross;
        acc.sgkEmployee += emp.result.deductions.sgkEmployee;
        acc.unemploymentEmployee += emp.result.deductions.unemploymentEmployee;
        acc.incomeTax += emp.result.deductions.incomeTax;
        acc.stampDuty += emp.result.deductions.stampDuty;
        acc.totalDeductions += emp.result.deductions.total;
        acc.sgkEmployer += emp.result.employerCosts.sgkEmployer;
        acc.sgkIncentive += emp.result.employerCosts.sgkIncentive;
        acc.unemploymentEmployer += emp.result.employerCosts.unemploymentEmployer;
        acc.employerTotal += emp.result.employerCosts.total;
        acc.totalCost += emp.result.totalCost;
      }

      return acc;
    },
    {
      netSalary: 0,
      gross: 0,
      sgkEmployee: 0,
      unemploymentEmployee: 0,
      incomeTax: 0,
      stampDuty: 0,
      totalDeductions: 0,
      sgkEmployer: 0,
      sgkIncentive: 0,
      unemploymentEmployer: 0,
      employerTotal: 0,
      totalCost: 0
    }
  );
}

export function employeeToExportRow(
  name: string,
  netSalary: number | null,
  result: SalaryCalculationResult | null
): (string | number | null)[] {
  return [
    name,
    netSalary ?? "",
    result?.gross ?? "",
    result?.deductions.sgkEmployee ?? "",
    result?.deductions.unemploymentEmployee ?? "",
    result?.deductions.incomeTax ?? "",
    result?.deductions.stampDuty ?? "",
    result?.deductions.total ?? "",
    result?.employerCosts.sgkEmployer ?? "",
    result?.employerCosts.sgkIncentive ?? "",
    result?.employerCosts.unemploymentEmployer ?? "",
    result?.employerCosts.total ?? "",
    result?.totalCost ?? ""
  ];
}

export function totalsToExportRow(totals: EmployeeTotals): (string | number)[] {
  return [
    UI_LABELS.TOTALS_ROW,
    totals.netSalary,
    totals.gross,
    totals.sgkEmployee,
    totals.unemploymentEmployee,
    totals.incomeTax,
    totals.stampDuty,
    totals.totalDeductions,
    totals.sgkEmployer,
    totals.sgkIncentive,
    totals.unemploymentEmployer,
    totals.employerTotal,
    totals.totalCost
  ];
}
