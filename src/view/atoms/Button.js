import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";

const Button = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  children,
  fullWidth = false,
  type = "button",
  ...props
}) => {
  const getVariant = () => {
    switch (variant) {
      case "primary":
        return "contained";
      case "secondary":
        return "outlined";
      case "text":
        return "text";
      case "danger":
        return "contained";
      default:
        return "contained";
    }
  };

  const getColor = () => {
    if (variant === "danger") {
      return "error";
    }
    return "primary";
  };

  return (
    <MuiButton
      variant={getVariant()}
      color={getColor()}
      size={size}
      disabled={disabled || loading}
      onClick={onClick}
      fullWidth={fullWidth}
      type={type}
      startIcon={loading ? <CircularProgress size={20} /> : null}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
