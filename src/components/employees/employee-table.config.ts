import type Handsontable from "handsontable";
import { APP_CONSTANTS, COLUMN_WIDTHS, NUMBER_FORMAT, STORAGE_KEYS, TABLE_HEADERS } from "../../core/constants";

// Re-export from central constants for backward compatibility
export const STORAGE_KEY = STORAGE_KEYS.EMPLOYEES;
export const MAX_HISTORY = APP_CONSTANTS.MAX_UNDO_HISTORY;
export const COLUMN_HEADERS = TABLE_HEADERS.COLUMN;
export const EXPORT_HEADERS = TABLE_HEADERS.EXPORT;

export type ActionsRenderer = (
  instance: Handsontable,
  td: HTMLTableCellElement,
  row: number
) => HTMLTableCellElement;

const numericFormat = { pattern: NUMBER_FORMAT.PATTERN, culture: NUMBER_FORMAT.CULTURE };

export function createColumnConfig(
  actionsRenderer: ActionsRenderer
): Handsontable.ColumnSettings[] {
  return [
    { data: 0, renderer: actionsRenderer, readOnly: true, width: COLUMN_WIDTHS.ACTIONS },
    { data: 1, type: "text", width: COLUMN_WIDTHS.NAME },
    { data: 2, type: "numeric", width: COLUMN_WIDTHS.CURRENCY, numericFormat },
    { data: 3, type: "numeric", width: COLUMN_WIDTHS.CURRENCY, readOnly: true, numericFormat },
    { data: 4, type: "numeric", width: COLUMN_WIDTHS.CURRENCY_SMALL, readOnly: true, numericFormat },
    { data: 5, type: "numeric", width: COLUMN_WIDTHS.CURRENCY_SMALL, readOnly: true, numericFormat },
    { data: 6, type: "numeric", width: COLUMN_WIDTHS.CURRENCY_MEDIUM, readOnly: true, numericFormat },
    { data: 7, type: "numeric", width: COLUMN_WIDTHS.CURRENCY_SMALL, readOnly: true, numericFormat },
    { data: 8, type: "numeric", width: COLUMN_WIDTHS.CURRENCY, readOnly: true, numericFormat },
    { data: 9, type: "numeric", width: COLUMN_WIDTHS.CURRENCY_MEDIUM, readOnly: true, numericFormat },
    { data: 10, type: "numeric", width: COLUMN_WIDTHS.CURRENCY_SMALL, readOnly: true, numericFormat },
    { data: 11, type: "numeric", width: COLUMN_WIDTHS.CURRENCY_SMALL, readOnly: true, numericFormat },
    { data: 12, type: "numeric", width: COLUMN_WIDTHS.CURRENCY_LARGE, readOnly: true, numericFormat },
    { data: 13, type: "numeric", width: COLUMN_WIDTHS.CURRENCY_LARGE, readOnly: true, numericFormat }
  ];
}

export function getCellClassName(
  row: number,
  col: number,
  employeesLength: number
): string | undefined {
  const isTotalsRow = row === employeesLength;

  if (isTotalsRow) {
    return col === 13 ? "totals-row-cell totals-row-total" : "totals-row-cell";
  }

  if (col === 2) { return "editable-cell"; }
  if (col === 13) { return "total-cost-cell"; }
  if (col >= 4 && col <= 8) { return "deduction-cell"; }
  if (col === 10) { return "incentive-cell"; } // SGK Teşvik - green/positive
  if (col >= 9 && col <= 12 && col !== 10) { return "employer-cell"; }

  return undefined;
}
