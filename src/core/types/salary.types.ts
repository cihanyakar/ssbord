export type SalaryCalculationResult = {
  gross: number;
  net: number;
  deductions: DeductionsBreakdown;
  employerCosts: EmployerCostsBreakdown;
  totalCost: number;
};

export type DeductionsBreakdown = {
  sgkEmployee: number;
  unemploymentEmployee: number;
  incomeTaxBase: number;
  incomeTax: number;
  stampDuty: number;
  minimumWageTaxExemption: number;
  minimumWageStampDutyExemption: number;
  total: number;
};

export type EmployerCostsBreakdown = {
  sgkEmployer: number;
  sgkIncentive: number; // İşveren SGK Teşviki tutarı
  unemploymentEmployer: number;
  total: number;
};
