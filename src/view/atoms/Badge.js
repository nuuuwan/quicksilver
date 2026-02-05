import React from "react";
import { Badge as MuiBadge } from "@mui/material";

const Badge = ({
  count,
  max = 99,
  variant = "primary",
  dot = false,
  children,
}) => {
  const color = variant === "error" ? "error" : "primary";

  if (dot) {
    return (
      <MuiBadge variant="dot" color={color}>
        {children}
      </MuiBadge>
    );
  }

  if (!count || count === 0) {
    return children || null;
  }

  return (
    <MuiBadge badgeContent={count} max={max} color={color}>
      {children}
    </MuiBadge>
  );
};

export default Badge;
