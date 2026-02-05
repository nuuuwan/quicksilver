import React from "react";
import { TextField } from "@mui/material";

const TextArea = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  rows = 3,
  maxLength,
  autoResize = false,
  ...props
}) => {
  return (
    <TextField
      multiline
      minRows={autoResize ? 2 : rows}
      maxRows={autoResize ? 10 : rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      inputProps={{ maxLength }}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};

export default TextArea;
