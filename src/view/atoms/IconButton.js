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
  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return Icon;
    if (typeof Icon === "function" || typeof Icon === "object") {
      return React.createElement(Icon);
    }
    return null;
  };

  return (
    <MuiIconButton
      onClick={onClick}
      disabled={disabled}
      size={size}
      aria-label={ariaLabel}
      color={color}
      {...props}
    >
      {renderIcon()}
    </MuiIconButton>
  );
};

export default IconButton;
