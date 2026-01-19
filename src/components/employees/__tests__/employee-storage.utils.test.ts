/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadFromStorage, saveToStorage } from "../employee-storage.utils";
import type { EmployeeRow } from "../employee-table.types";

describe("employee-storage.utils", () => {
  const mockLocalStorage = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: () => {
        store = {};
      }
    };
  })();

  beforeEach(() => {
    mockLocalStorage.clear();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
  });

  describe("loadFromStorage", () => {
    it("returns null when no data in localStorage", () => {
      const result = loadFromStorage();

      expect(result).toBeNull();
    });

    it("returns parsed data when valid JSON exists", () => {
      const storedData = {
        employees: [{ id: 1, name: "Test", netSalary: 10000 }],
        nextId: 2
      };

      mockLocalStorage.setItem("salary-calculator-employees", JSON.stringify(storedData));

      const result = loadFromStorage();

      expect(result).toEqual(storedData);
    });

    it("returns null when JSON is invalid", () => {
      mockLocalStorage.setItem("salary-calculator-employees", "invalid-json");

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const result = loadFromStorage();

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith("Failed to load from localStorage");
      consoleSpy.mockRestore();
    });

    it("returns employees and nextId from storage", () => {
      const employees = [
        { id: 1, name: "Employee 1", netSalary: 15000 },
        { id: 2, name: "Employee 2", netSalary: 20000 }
      ];
      const storedData = { employees, nextId: 3 };

      mockLocalStorage.setItem("salary-calculator-employees", JSON.stringify(storedData));

      const result = loadFromStorage();

      expect(result?.employees).toHaveLength(2);
      expect(result?.nextId).toBe(3);
    });
  });

  describe("saveToStorage", () => {
    it("saves employees to localStorage", () => {
      const employees: EmployeeRow[] = [
        { id: 1, name: "Test Employee", netSalary: 10000, result: null }
      ];

      saveToStorage(employees, 2);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "salary-calculator-employees",
        expect.any(String)
      );
    });

    it("saves only id, name, and netSalary (not result)", () => {
      const employees: EmployeeRow[] = [
        {
          id: 1,
          name: "Test",
          netSalary: 10000,
          result: {
            gross: 12000,
            net: 10000,
            deductions: {
              sgkEmployee: 500,
              unemploymentEmployee: 100,
              incomeTaxBase: 1000,
              incomeTax: 200,
              stampDuty: 50,
              total: 850,
              minimumWageTaxExemption: 0,
              minimumWageStampDutyExemption: 0
            },
            employerCosts: {
              sgkEmployer: 600,
              sgkIncentive: 150,
              unemploymentEmployer: 150,
              total: 750
            },
            totalCost: 12750
          }
        }
      ];

      saveToStorage(employees, 2);

      const savedData = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

      expect(savedData.employees[0]).not.toHaveProperty("result");
      expect(savedData.employees[0]).toEqual({
        id: 1,
        name: "Test",
        netSalary: 10000
      });
    });

    it("saves nextId correctly", () => {
      const employees: EmployeeRow[] = [
        { id: 5, name: "Employee", netSalary: 15000, result: null }
      ];

      saveToStorage(employees, 10);

      const savedData = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

      expect(savedData.nextId).toBe(10);
    });

    it("handles empty employees array", () => {
      saveToStorage([], 1);

      const savedData = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

      expect(savedData.employees).toEqual([]);
      expect(savedData.nextId).toBe(1);
    });

    it("handles employees with null netSalary", () => {
      const employees: EmployeeRow[] = [
        { id: 1, name: "Empty Employee", netSalary: null, result: null }
      ];

      saveToStorage(employees, 2);

      const savedData = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

      expect(savedData.employees[0].netSalary).toBeNull();
    });

    it("logs error when localStorage fails", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      mockLocalStorage.setItem.mockImplementationOnce(() => {
        throw new Error("Storage full");
      });

      const employees: EmployeeRow[] = [
        { id: 1, name: "Test", netSalary: 10000, result: null }
      ];

      saveToStorage(employees, 2);

      expect(consoleSpy).toHaveBeenCalledWith("Failed to save to localStorage");
      consoleSpy.mockRestore();
    });
  });
});
