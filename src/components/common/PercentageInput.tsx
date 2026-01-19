import type { TextFieldProps } from "@mui/material/TextField";
import { NumericInput } from "./NumericInput";

type PercentageInputProps = {
  value: number;
  onChange: (value: number) => void;
} & Omit<TextFieldProps, "value" | "onChange">;

export function PercentageInput({ value, onChange, ...props }: PercentageInputProps) {
  const displayValue = value * 100;

  const handleChange = (newValue: number | null) => {
    if (newValue !== null) {
      onChange(newValue / 100);
    }
  };

  return (
    <NumericInput
      {...props}
      value={displayValue}
      onChange={handleChange}
      prefix="%"
      min={0}
      max={100}
      decimalPlaces={3}
    />
  );
}
