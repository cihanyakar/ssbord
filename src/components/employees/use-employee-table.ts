import ExcelJS from "exceljs";
import type Handsontable from "handsontable";
import { useCallback, useEffect, useRef, useState } from "react";
import { calculateGrossFromNet } from "../../core/calculators";
import { APP_CONSTANTS, createEmployeeName, EXPORT_CONFIG } from "../../core/constants";
import type { SalaryCalculationResult, TaxConfig } from "../../core/types";
import { calculateEmployeeTotals, employeeToExportRow, totalsToExportRow } from "../../core/utils/employee.utils";
import { loadFromStorage, saveToStorage } from "./employee-storage.utils";
import { EXPORT_HEADERS, MAX_HISTORY } from "./employee-table.config";
import type { DeleteTarget, EmployeeHistory, EmployeeRow } from "./employee-table.types";

export type UseEmployeeTableReturn = {
  employees: EmployeeRow[];
  selectedEmployee: EmployeeRow | null;
  drawerOpen: boolean;
  deleteDialogOpen: boolean;
  employeeToDelete: DeleteTarget;
  history: EmployeeHistory[];
  canUndo: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  tableHeight: number;
  handleUndo: () => void;
  handleDeleteClick: (rowIndex: number) => void;
  handleDeleteConfirm: () => void;
  handleDeleteCancel: () => void;
  handleDetailClick: (rowIndex: number) => void;
  handleExport: () => Promise<void>;
  handleAfterChange: (changes: Handsontable.CellChange[] | null) => void;
  handleCloseDrawer: () => void;
  totals: ReturnType<typeof calculateEmployeeTotals>;
  hasData: boolean;
};

function createEmptyEmployee(id: number): EmployeeRow {
  return { id, name: createEmployeeName(id), netSalary: null, result: null };
}

export function useEmployeeTable(config: TaxConfig): UseEmployeeTableReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nextIdRef = useRef(APP_CONSTANTS.DEFAULT_EMPLOYEE_ID + 1);

  const [employees, setEmployees] = useState<EmployeeRow[]>(() => {
    const stored = loadFromStorage();

    if (stored && stored.employees.length > 0) {
      const loadedEmployees = stored.employees.map(emp => ({
        ...emp,
        result: emp.netSalary ? calculateGrossFromNet(emp.netSalary, config) : null
      }));
      const hasEmptyRow = loadedEmployees.some(emp => !emp.netSalary);

      if (!hasEmptyRow) {
        const newId = stored.nextId;

        loadedEmployees.push(createEmptyEmployee(newId));
        nextIdRef.current = newId + 1;
      } else {
        nextIdRef.current = stored.nextId;
      }

      return loadedEmployees;
    }

    return [createEmptyEmployee(APP_CONSTANTS.DEFAULT_EMPLOYEE_ID)];
  });

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRow | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<DeleteTarget>(null);
  const [history, setHistory] = useState<EmployeeHistory[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [tableHeight, setTableHeight] = useState<number>(APP_CONSTANTS.DEFAULT_TABLE_HEIGHT);

  const saveToHistory = useCallback(() => {
    setHistory(prev => {
      const newHistory = [...prev, { employees: [...employees], nextId: nextIdRef.current }];

      if (newHistory.length > MAX_HISTORY) {
        return newHistory.slice(-MAX_HISTORY);
      }

      return newHistory;
    });
    setCanUndo(true);
  }, [employees]);

  const handleUndo = useCallback(() => {
    if (history.length === 0) { return; }

    const lastState = history[history.length - 1];

    setHistory(prev => prev.slice(0, -1));
    setEmployees(lastState.employees);
    nextIdRef.current = lastState.nextId;
    setCanUndo(history.length > 1);
  }, [history]);

  // Ctrl+Z keyboard shortcut for undo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo]);

  // Save to localStorage whenever employees change
  useEffect(() => {
    saveToStorage(employees, nextIdRef.current);
  }, [employees]);

  // Recalculate all employees when config changes
  useEffect(() => {
    setEmployees(prev => prev.map(emp => {
      if (emp.netSalary && emp.netSalary > 0) {
        try {
          const result = calculateGrossFromNet(emp.netSalary, config);

          return { ...emp, result };
        } catch {
          return { ...emp, result: null };
        }
      }

      return emp;
    }));
  }, [config]);

  // ResizeObserver for dynamic table height
  useEffect(() => {
    const container = containerRef.current;

    if (!container) { return; }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;

        if (height > 0) {
          setTableHeight(height);
        }
      }
    });

    observer.observe(container);

    // Initial height
    const initialHeight = container.clientHeight;

    if (initialHeight > 0) {
      setTableHeight(initialHeight);
    }

    return () => observer.disconnect();
  }, []);

  const calculateEmployee = useCallback((netSalary: number | null): SalaryCalculationResult | null => {
    if (!netSalary || netSalary <= 0) { return null; }
    try {
      return calculateGrossFromNet(netSalary, config);
    } catch {
      return null;
    }
  }, [config]);

  const addNewEmptyRow = useCallback((currentEmployees: EmployeeRow[]): EmployeeRow[] => {
    const newId = nextIdRef.current;

    nextIdRef.current = newId + 1;

    return [...currentEmployees, createEmptyEmployee(newId)];
  }, []);

  const handleDeleteClick = (rowIndex: number) => {
    const employee = employees[rowIndex];

    if (!employee) { return; }

    const employeesWithData = employees.filter(emp => emp.netSalary !== null);

    if (employeesWithData.length === 0 && employees.length <= 1) { return; }

    setEmployeeToDelete({ index: rowIndex, name: employee.name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (employeeToDelete === null) { return; }

    saveToHistory();
    setEmployees(prev => {
      const filtered = prev.filter((_, i) => i !== employeeToDelete.index);

      if (filtered.length === 0) {
        return [createEmptyEmployee(nextIdRef.current)];
      }

      return filtered;
    });
    setSelectedEmployee(null);
    setDrawerOpen(false);
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const handleDetailClick = (rowIndex: number) => {
    const employee = employees[rowIndex];

    if (employee) {
      setSelectedEmployee(employee);
      setDrawerOpen(true);
    }
  };

  const handleExport = async() => {
    const data = employees.map(emp => employeeToExportRow(emp.name, emp.netSalary, emp.result));
    const exportTotals = calculateEmployeeTotals(employees);
    const hasExportData = employees.some(emp => emp.result !== null);

    if (hasExportData) {
      data.push(totalsToExportRow(exportTotals));
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(EXPORT_CONFIG.WORKSHEET_NAME);

    worksheet.addRow(EXPORT_HEADERS);
    data.forEach(row => worksheet.addRow(row));

    worksheet.columns.forEach(column => {
      column.width = EXPORT_CONFIG.COLUMN_WIDTH;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = EXPORT_CONFIG.FILENAME;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAfterChange = (changes: Handsontable.CellChange[] | null) => {
    if (!changes) { return; }

    let hasChanges = false;
    let needsNewRow = false;
    const updates: { row: number; col: number; value: unknown }[] = [];

    changes.forEach(([row, col, oldValue, newValue]) => {
      if (row >= employees.length) { return; }
      if (col === 0) { return; }
      if (oldValue === newValue) { return; }

      hasChanges = true;
      updates.push({ row, col: col as number, value: newValue });

      if (col === 2 && newValue && !oldValue) {
        needsNewRow = true;
      }
    });

    if (hasChanges) {
      saveToHistory();

      setEmployees(prev => {
        const updated = [...prev];

        updates.forEach(({ row, col, value }) => {
          if (col === 1) {
            updated[row] = { ...updated[row], name: value as string };
          } else if (col === 2) {
            const netSalary = typeof value === "number" ? value : parseFloat(String(value).replace(/\./g, "").replace(",", "."));
            const result = calculateEmployee(isNaN(netSalary) ? null : netSalary);

            updated[row] = {
              ...updated[row],
              netSalary: isNaN(netSalary) ? null : netSalary,
              result
            };
          }
        });

        return updated;
      });

      if (needsNewRow) {
        setEmployees(prev => {
          const hasEmptyRow = prev.some(emp => !emp.netSalary);

          if (!hasEmptyRow) {
            return addNewEmptyRow(prev);
          }

          return prev;
        });
      }
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const totals = calculateEmployeeTotals(employees);
  const hasData = employees.some(emp => emp.result !== null);

  return {
    employees,
    selectedEmployee,
    drawerOpen,
    deleteDialogOpen,
    employeeToDelete,
    history,
    canUndo,
    containerRef,
    tableHeight,
    handleUndo,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleDetailClick,
    handleExport,
    handleAfterChange,
    handleCloseDrawer,
    totals,
    hasData
  };
}
