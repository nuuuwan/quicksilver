import React from "react";
import { Typography } from "@mui/material";

/**
 * Heading component for displaying text headings
 * @param {number} level - Heading level 1-6 (h1-h6)
 * @param {React.ReactNode} children - Heading text content
 * @param {object} sx - Additional MUI sx styles
 */
function Heading({ level = 1, children, sx = {}, ...props }) {
  const variant = `h${level}`;

  return (
    <Typography variant={variant} sx={sx} {...props}>
      {children}
    </Typography>
  );
}

export default Heading;
