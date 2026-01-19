import type { TaxConfig } from "../types";

// 2026 Turkish Tax Configuration
// Sources:
// - https://kolayik.com/blog/2026-bordro-parametreleri
// - https://kolayik.com/blog/2026-gelir-vergisi-dilimleri-guncel-tablo
// - https://www.csgb.gov.tr/Media/gm2fekds/asgari-ücret-2026.pdf
export const DEFAULT_TAX_CONFIG: TaxConfig = {
  sgk: {
    employeeRate: 0.14,    // 14% - Çalışan SGK Primi
    employerRate: 0.205,   // 20.5% - İşveren SGK Primi (teşviksiz standart oran)
    employerIncentiveRate: 0.05  // 5% - İşveren SGK Teşviki (5 puanlık teşvik)
  },
  unemployment: {
    employeeRate: 0.01,    // 1% - Çalışan İşsizlik Sigortası
    employerRate: 0.02     // 2% - İşveren İşsizlik Sigortası
  },
  stampDuty: {
    rate: 0.00759          // Binde 7,59 - Damga Vergisi
  },
  incomeTax: {
    brackets: [
      {
        id: "bracket-1",
        minIncome: 0,
        maxIncome: 190000,
        rate: 0.15           // %15
      },
      {
        id: "bracket-2",
        minIncome: 190000,
        maxIncome: 400000,
        rate: 0.20           // %20
      },
      {
        id: "bracket-3",
        minIncome: 400000,
        maxIncome: 1500000,
        rate: 0.27           // %27
      },
      {
        id: "bracket-4",
        minIncome: 1500000,
        maxIncome: 5300000,
        rate: 0.35           // %35
      },
      {
        id: "bracket-5",
        minIncome: 5300000,
        maxIncome: null,
        rate: 0.40           // %40
      }
    ]
  },
  minimumWage: {
    gross: 33030.00,       // 2026 Brüt Asgari Ücret
    net: 28075.50          // 2026 Net Asgari Ücret
  },
  sgkCeiling: 297270.00    // 2026 SGK Tavan Ücreti (Aylık Prime Esas Kazanç Tavanı)
};
