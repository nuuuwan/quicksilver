import React from "react";
import { TextField } from "@mui/material";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  label,
  fullWidth = true,
  required = false,
  autoComplete,
  ...props
}) => {
  return (
    <TextField
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      error={!!error}
      helperText={error}
      label={label}
      fullWidth={fullWidth}
      required={required}
      autoComplete={autoComplete}
      variant="outlined"
      {...props}
    />
  );
};

export default Input;
