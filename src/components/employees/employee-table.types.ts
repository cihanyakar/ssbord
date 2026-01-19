import type { SalaryCalculationResult } from "../../core/types";

export type EmployeeRow = {
  id: number;
  name: string;
  netSalary: number | null;
  result: SalaryCalculationResult | null;
};

export type StoredEmployee = {
  id: number;
  name: string;
  netSalary: number | null;
};

export type EmployeeHistory = {
  employees: EmployeeRow[];
  nextId: number;
};

export type DeleteTarget = {
  index: number;
  name: string;
} | null;
