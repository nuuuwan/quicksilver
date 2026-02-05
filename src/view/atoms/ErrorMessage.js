import React from "react";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ErrorMessage = ({ message, onDismiss, severity = "error" }) => {
  if (!message) return null;

  return (
    <Alert
      severity={severity}
      action={
        onDismiss && (
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onDismiss}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )
      }
    >
      {message}
    </Alert>
  );
};

export default ErrorMessage;
