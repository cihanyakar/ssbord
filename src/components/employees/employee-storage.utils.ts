import { STORAGE_KEYS } from "../../core/constants";
import type { EmployeeRow, StoredEmployee } from "./employee-table.types";

export function loadFromStorage(): { employees: StoredEmployee[]; nextId: number } | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);

    if (data) {
      return JSON.parse(data);
    }
  } catch {
    console.error("Failed to load from localStorage");
  }

  return null;
}

export function saveToStorage(employees: EmployeeRow[], nextId: number): void {
  try {
    const data: StoredEmployee[] = employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      netSalary: emp.netSalary
    }));

    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify({ employees: data, nextId }));
  } catch {
    console.error("Failed to save to localStorage");
  }
}
