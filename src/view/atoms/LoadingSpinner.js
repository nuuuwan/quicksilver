import React from "react";
import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = ({ size = "medium", color = "primary" }) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <CircularProgress size={sizeMap[size]} color={color} />
    </Box>
  );
};

export default LoadingSpinner;
