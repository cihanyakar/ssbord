import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { DEFAULT_TAX_CONFIG } from "../core/config/tax-config";
import { STORAGE_KEYS } from "../core/constants";
import type { TaxConfig, IncomeTaxBracket } from "../core/types";

type ConfigContextValue = {
  config: TaxConfig;
  updateSGKRates: (employeeRate: number, employerRate: number, employerIncentiveRate: number) => void;
  updateUnemploymentRates: (employeeRate: number, employerRate: number) => void;
  updateStampDutyRate: (rate: number) => void;
  updateIncomeTaxBrackets: (brackets: IncomeTaxBracket[]) => void;
  updateMinimumWage: (gross: number, net: number) => void;
  updateSGKCeiling: (ceiling: number) => void;
  resetToDefaults: () => void;
};

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<TaxConfig>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.TAX_CONFIG);

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_TAX_CONFIG;
        }
      }
    }

    return DEFAULT_TAX_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TAX_CONFIG, JSON.stringify(config));
  }, [config]);

  const updateSGKRates = useCallback((employeeRate: number, employerRate: number, employerIncentiveRate: number) => {
    setConfig(prev => ({
      ...prev,
      sgk: { employeeRate, employerRate, employerIncentiveRate }
    }));
  }, []);

  const updateUnemploymentRates = useCallback((employeeRate: number, employerRate: number) => {
    setConfig(prev => ({
      ...prev,
      unemployment: { employeeRate, employerRate }
    }));
  }, []);

  const updateStampDutyRate = useCallback((rate: number) => {
    setConfig(prev => ({
      ...prev,
      stampDuty: { rate }
    }));
  }, []);

  const updateIncomeTaxBrackets = useCallback((brackets: IncomeTaxBracket[]) => {
    setConfig(prev => ({
      ...prev,
      incomeTax: { brackets }
    }));
  }, []);

  const updateMinimumWage = useCallback((gross: number, net: number) => {
    setConfig(prev => ({
      ...prev,
      minimumWage: { gross, net }
    }));
  }, []);

  const updateSGKCeiling = useCallback((ceiling: number) => {
    setConfig(prev => ({
      ...prev,
      sgkCeiling: ceiling
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setConfig(DEFAULT_TAX_CONFIG);
  }, []);

  const value: ConfigContextValue = {
    config,
    updateSGKRates,
    updateUnemploymentRates,
    updateStampDutyRate,
    updateIncomeTaxBrackets,
    updateMinimumWage,
    updateSGKCeiling,
    resetToDefaults
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfigContext() {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfigContext must be used within ConfigProvider");
  }

  return context;
}
