import { describe, it, expect } from "vitest";
import {
  APP_CONSTANTS,
  COLUMN_WIDTHS,
  createEmployeeName,
  EXPORT_CONFIG,
  NUMBER_FORMAT,
  STORAGE_KEYS,
  TABLE_HEADERS,
  UI_LABELS
} from "../constants";

describe("STORAGE_KEYS", () => {
  it("has EMPLOYEES key", () => {
    expect(STORAGE_KEYS.EMPLOYEES).toBe("salary-calculator-employees");
  });

  it("has TAX_CONFIG key", () => {
    expect(STORAGE_KEYS.TAX_CONFIG).toBe("ssbord-tax-config");
  });

  it("has unique keys", () => {
    expect(STORAGE_KEYS.EMPLOYEES).not.toBe(STORAGE_KEYS.TAX_CONFIG);
  });
});

describe("APP_CONSTANTS", () => {
  it("has MAX_UNDO_HISTORY set to 20", () => {
    expect(APP_CONSTANTS.MAX_UNDO_HISTORY).toBe(20);
  });

  it("MAX_UNDO_HISTORY is a positive number", () => {
    expect(APP_CONSTANTS.MAX_UNDO_HISTORY).toBeGreaterThan(0);
  });

  it("has DEFAULT_TABLE_HEIGHT set to 400", () => {
    expect(APP_CONSTANTS.DEFAULT_TABLE_HEIGHT).toBe(400);
  });

  it("has DEFAULT_EMPLOYEE_ID set to 1", () => {
    expect(APP_CONSTANTS.DEFAULT_EMPLOYEE_ID).toBe(1);
  });
});

describe("EXPORT_CONFIG", () => {
  it("has FILENAME for excel export", () => {
    expect(EXPORT_CONFIG.FILENAME).toBe("maas-hesaplama.xlsx");
  });

  it("has WORKSHEET_NAME in Turkish", () => {
    expect(EXPORT_CONFIG.WORKSHEET_NAME).toBe("Maaş Hesaplama");
  });

  it("has COLUMN_WIDTH set to 15", () => {
    expect(EXPORT_CONFIG.COLUMN_WIDTH).toBe(15);
  });
});

describe("NUMBER_FORMAT", () => {
  it("has PATTERN for number formatting", () => {
    expect(NUMBER_FORMAT.PATTERN).toBe("0,0.00");
  });

  it("has CULTURE set to Turkish", () => {
    expect(NUMBER_FORMAT.CULTURE).toBe("tr-TR");
  });
});

describe("COLUMN_WIDTHS", () => {
  it("has ACTIONS width", () => {
    expect(COLUMN_WIDTHS.ACTIONS).toBe(70);
  });

  it("has NAME width", () => {
    expect(COLUMN_WIDTHS.NAME).toBe(120);
  });

  it("has CURRENCY width", () => {
    expect(COLUMN_WIDTHS.CURRENCY).toBe(120);
  });

  it("has CURRENCY_SMALL width", () => {
    expect(COLUMN_WIDTHS.CURRENCY_SMALL).toBe(100);
  });

  it("has CURRENCY_MEDIUM width", () => {
    expect(COLUMN_WIDTHS.CURRENCY_MEDIUM).toBe(110);
  });

  it("has CURRENCY_LARGE width", () => {
    expect(COLUMN_WIDTHS.CURRENCY_LARGE).toBe(130);
  });

  it("widths are in ascending order (small < medium < large)", () => {
    expect(COLUMN_WIDTHS.CURRENCY_SMALL).toBeLessThan(COLUMN_WIDTHS.CURRENCY_MEDIUM);
    expect(COLUMN_WIDTHS.CURRENCY_MEDIUM).toBeLessThan(COLUMN_WIDTHS.CURRENCY_LARGE);
  });
});

describe("UI_LABELS", () => {
  it("has TOTALS_ROW label in Turkish", () => {
    expect(UI_LABELS.TOTALS_ROW).toBe("TOPLAM");
  });

  it("has DEFAULT_EMPLOYEE_NAME in Turkish", () => {
    expect(UI_LABELS.DEFAULT_EMPLOYEE_NAME).toBe("Çalışan");
  });

  it("has EMPLOYEE_DETAIL_TITLE in Turkish", () => {
    expect(UI_LABELS.EMPLOYEE_DETAIL_TITLE).toBe("Çalışan Detayı");
  });
});

describe("TABLE_HEADERS", () => {
  describe("COLUMN", () => {
    it("has 14 headers", () => {
      expect(TABLE_HEADERS.COLUMN).toHaveLength(14);
    });

    it("starts with Aksiyon", () => {
      expect(TABLE_HEADERS.COLUMN[0]).toBe("Aksiyon");
    });

    it("ends with TOPLAM MALİYET", () => {
      expect(TABLE_HEADERS.COLUMN[13]).toBe("TOPLAM MALİYET");
    });

    it("contains Çalışan Adı", () => {
      expect(TABLE_HEADERS.COLUMN).toContain("Çalışan Adı");
    });

    it("contains Net Maaş (₺)", () => {
      expect(TABLE_HEADERS.COLUMN).toContain("Net Maaş (₺)");
    });

    it("contains Brüt Maaş (₺)", () => {
      expect(TABLE_HEADERS.COLUMN).toContain("Brüt Maaş (₺)");
    });

    it("contains SGK Teşvik", () => {
      expect(TABLE_HEADERS.COLUMN).toContain("SGK Teşvik");
    });
  });

  describe("EXPORT", () => {
    it("has 13 headers (no Aksiyon)", () => {
      expect(TABLE_HEADERS.EXPORT).toHaveLength(13);
    });

    it("starts with Çalışan Adı", () => {
      expect(TABLE_HEADERS.EXPORT[0]).toBe("Çalışan Adı");
    });

    it("ends with TOPLAM MALİYET", () => {
      expect(TABLE_HEADERS.EXPORT[12]).toBe("TOPLAM MALİYET");
    });

    it("does not contain Aksiyon", () => {
      expect(TABLE_HEADERS.EXPORT).not.toContain("Aksiyon");
    });

    it("EXPORT is COLUMN without first element", () => {
      expect(TABLE_HEADERS.EXPORT).toEqual(TABLE_HEADERS.COLUMN.slice(1));
    });
  });
});

describe("createEmployeeName", () => {
  it("creates employee name with given id", () => {
    expect(createEmployeeName(1)).toBe("Çalışan 1");
  });

  it("creates employee name for different ids", () => {
    expect(createEmployeeName(5)).toBe("Çalışan 5");
    expect(createEmployeeName(100)).toBe("Çalışan 100");
  });

  it("uses UI_LABELS.DEFAULT_EMPLOYEE_NAME", () => {
    const name = createEmployeeName(1);

    expect(name.startsWith(UI_LABELS.DEFAULT_EMPLOYEE_NAME)).toBe(true);
  });
});
