import React from "react";
import { Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RecipientChip = ({ email, name, onRemove }) => {
  return (
    <Chip
      label={name ? `${name} <${email}>` : email}
      onDelete={onRemove}
      deleteIcon={<CloseIcon />}
      size="small"
      sx={{ mr: 0.5, mb: 0.5 }}
    />
  );
};

export default RecipientChip;
