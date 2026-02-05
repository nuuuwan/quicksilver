import React from "react";
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  FormControl,
} from "@mui/material";

const Checkbox = ({
  checked,
  onChange,
  disabled = false,
  label,
  ...props
}) => {
  if (label) {
    return (
      <FormControl>
        <FormControlLabel
          control={
            <MuiCheckbox
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              {...props}
            />
          }
          label={label}
        />
      </FormControl>
    );
  }

  return (
    <MuiCheckbox
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      {...props}
    />
  );
};

export default Checkbox;
