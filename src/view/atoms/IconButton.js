import React from "react";
import { IconButton as MuiIconButton } from "@mui/material";

const IconButton = ({
  icon: Icon,
  onClick,
  disabled = false,
  size = "medium",
  ariaLabel,
  color = "default",
  ...props
}) => {
  return (
    <MuiIconButton
      onClick={onClick}
      disabled={disabled}
      size={size}
      aria-label={ariaLabel}
      color={color}
      {...props}
    >
      {typeof Icon === "function" ? <Icon /> : Icon}
    </MuiIconButton>
  );
};

export default IconButton;
