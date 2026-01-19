// Storage Keys
export const STORAGE_KEYS = {
  EMPLOYEES: "salary-calculator-employees",
  TAX_CONFIG: "ssbord-tax-config"
} as const;

// Application Constants
export const APP_CONSTANTS = {
  MAX_UNDO_HISTORY: 20,
  DEFAULT_TABLE_HEIGHT: 400,
  DEFAULT_EMPLOYEE_ID: 1
} as const;

// Export Configuration
export const EXPORT_CONFIG = {
  FILENAME: "maas-hesaplama.xlsx",
  WORKSHEET_NAME: "Maaş Hesaplama",
  COLUMN_WIDTH: 15
} as const;

// Number Formatting
export const NUMBER_FORMAT = {
  PATTERN: "0,0.00",
  CULTURE: "tr-TR"
} as const;

// Table Column Widths
export const COLUMN_WIDTHS = {
  ACTIONS: 70,
  NAME: 120,
  CURRENCY: 120,
  CURRENCY_SMALL: 100,
  CURRENCY_MEDIUM: 110,
  CURRENCY_LARGE: 130
} as const;

// UI Labels (Turkish)
export const UI_LABELS = {
  TOTALS_ROW: "TOPLAM",
  DEFAULT_EMPLOYEE_NAME: "Çalışan",
  EMPLOYEE_DETAIL_TITLE: "Çalışan Detayı"
} as const;

// Table Column Headers (Turkish)
export const TABLE_HEADERS = {
  COLUMN: [
    "Aksiyon",
    "Çalışan Adı",
    "Net Maaş (₺)",
    "Brüt Maaş (₺)",
    "SGK Çalışan",
    "İşsizlik Çlş.",
    "Gelir Vergisi",
    "Damga V.",
    "Toplam Kesinti",
    "SGK İşveren",
    "SGK Teşvik",
    "İşsizlik İşv.",
    "İşveren Maliyeti",
    "TOPLAM MALİYET"
  ] as string[],
  EXPORT: [
    "Çalışan Adı",
    "Net Maaş (₺)",
    "Brüt Maaş (₺)",
    "SGK Çalışan",
    "İşsizlik Çlş.",
    "Gelir Vergisi",
    "Damga V.",
    "Toplam Kesinti",
    "SGK İşveren",
    "SGK Teşvik",
    "İşsizlik İşv.",
    "İşveren Maliyeti",
    "TOPLAM MALİYET"
  ] as string[]
};

// Helper function to create employee name
export function createEmployeeName(id: number): string {
  return `${UI_LABELS.DEFAULT_EMPLOYEE_NAME} ${id}`;
}
