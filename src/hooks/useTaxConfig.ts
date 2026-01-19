import { useConfigContext } from "../context/ConfigContext";

export function useTaxConfig() {
  return useConfigContext();
}
