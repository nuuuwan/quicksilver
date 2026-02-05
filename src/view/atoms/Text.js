import React from "react";
import { Typography } from "@mui/material";

/**
 * Text component for displaying text content
 * @param {string} variant - Text variant: 'body' | 'caption' | 'label'
 * @param {string} color - Text color
 * @param {React.ReactNode} children - Text content
 * @param {object} sx - Additional MUI sx styles
 */
function Text({ variant = "body", color, children, sx = {}, ...props }) {
  // Map our variants to MUI variants
  const variantMap = {
    body: "body1",
    caption: "caption",
    label: "body2",
  };

  const muiVariant = variantMap[variant] || "body1";

  return (
    <Typography variant={muiVariant} color={color} sx={sx} {...props}>
      {children}
    </Typography>
  );
}

export default Text;
