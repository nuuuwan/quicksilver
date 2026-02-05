import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";

const Avatar = ({ src, name, size = "medium", status }) => {
  const sizeMap = {
    small: 32,
    medium: 40,
    large: 56,
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <MuiAvatar
      src={src}
      alt={name}
      sx={{
        width: sizeMap[size],
        height: sizeMap[size],
        fontSize: size === "small" ? "0.875rem" : "1rem",
        position: "relative",
      }}
    >
      {!src && getInitials(name)}
    </MuiAvatar>
  );
};

export default Avatar;
