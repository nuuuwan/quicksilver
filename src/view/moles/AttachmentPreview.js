import React from "react";
import { Box } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "../atoms/IconButton";
import AttachmentInfo from "../atoms/AttachmentInfo";

const AttachmentPreview = ({ attachment, onRemove, onDownload }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 1,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        backgroundColor: "background.paper",
      }}
    >
      <InsertDriveFileIcon color="action" />
      <AttachmentInfo name={attachment.name} size={attachment.size} />
      <Box sx={{ flex: 1 }} />
      {onDownload && (
        <IconButton
          icon={DownloadIcon}
          ariaLabel="download"
          onClick={() => onDownload(attachment)}
        />
      )}
      {onRemove && (
        <IconButton
          icon={CloseIcon}
          ariaLabel="remove"
          onClick={() => onRemove(attachment.id)}
        />
      )}
    </Box>
  );
};

export default AttachmentPreview;
