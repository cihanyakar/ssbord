export type TaxConfig = {
  sgk: SGKRates;
  unemployment: UnemploymentRates;
  stampDuty: StampDutyConfig;
  incomeTax: IncomeTaxConfig;
  minimumWage: MinimumWageConfig;
  sgkCeiling: number;
};

export type SGKRates = {
  employeeRate: number;
  employerRate: number;
  employerIncentiveRate: number; // İşveren SGK Teşviki (5 puan, 6 puan vb.)
};

export type UnemploymentRates = {
  employeeRate: number;
  employerRate: number;
};

export type StampDutyConfig = {
  rate: number;
};

export type IncomeTaxConfig = {
  brackets: IncomeTaxBracket[];
};

export type IncomeTaxBracket = {
  id: string;
  minIncome: number;
  maxIncome: number | null;
  rate: number;
};

export type MinimumWageConfig = {
  gross: number;
  net: number;
};
