import InputAdornment from "@mui/material/InputAdornment";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import React, { useState, useEffect, useCallback } from "react";
import { formatNumericDisplay, parseTurkishNumericInput } from "../../core/utils/format.utils";

type NumericInputProps = {
  value: number | null;
  onChange: (value: number | null) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  decimalPlaces?: number;
} & Omit<TextFieldProps, "value" | "onChange">;

export function NumericInput({
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  decimalPlaces = 2,
  ...props
}: NumericInputProps) {
  const formatValue = useCallback(
    (num: number) => formatNumericDisplay(num, decimalPlaces),
    [decimalPlaces]
  );

  const [localValue, setLocalValue] = useState<string>(
    value !== null ? formatValue(value) : ""
  );

  useEffect(() => {
    if (value !== null) {
      setLocalValue(formatValue(value));
    }
  }, [value, formatValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setLocalValue(inputValue);

    const numericValue = parseTurkishNumericInput(inputValue);

    if (numericValue !== null) {
      if (min !== undefined && numericValue < min) { return; }
      if (max !== undefined && numericValue > max) { return; }
    }

    onChange(numericValue);
  };

  const handleBlur = () => {
    if (value !== null) {
      setLocalValue(formatValue(value));
    }
  };

  return (
    <TextField
      {...props}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      slotProps={{
        input: {
          startAdornment: prefix ? (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ) : undefined,
          endAdornment: suffix ? (
            <InputAdornment position="end">{suffix}</InputAdornment>
          ) : undefined
        }
      }}
    />
  );
}
