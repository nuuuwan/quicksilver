import React from "react";
import { Fab } from "@mui/material";

const FloatingActionButton = ({
  icon: Icon,
  onClick,
  ariaLabel,
  color = "primary",
}) => {
  return (
    <Fab
      color={color}
      aria-label={ariaLabel}
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 80,
        right: 16,
        display: { xs: "flex", md: "none" },
      }}
    >
      {typeof Icon === "function" ? <Icon /> : Icon}
    </Fab>
  );
};

export default FloatingActionButton;
