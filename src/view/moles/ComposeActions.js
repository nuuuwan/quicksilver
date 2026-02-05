import React from "react";
import { Box } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "../atoms/IconButton";
import Button from "../atoms/Button";

const ComposeActions = ({ onAttach, onSaveDraft, onDiscard }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
      <IconButton
        icon={AttachFileIcon}
        ariaLabel="attach file"
        onClick={onAttach}
      />
      <Button
        variant="secondary"
        onClick={onSaveDraft}
        startIcon={<SaveIcon />}
      >
        Save Draft
      </Button>
      <Button
        variant="text"
        onClick={onDiscard}
        startIcon={<DeleteOutlineIcon />}
      >
        Discard
      </Button>
    </Box>
  );
};

export default ComposeActions;
