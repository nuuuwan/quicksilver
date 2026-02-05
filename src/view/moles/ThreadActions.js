import React from "react";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArchiveIcon from "@mui/icons-material/Archive";
import IconButton from "../atoms/IconButton";

const ThreadActions = ({ threadId, onAction }) => {
  const handleAction = (action) => () => {
    if (onAction) {
      onAction(action, threadId);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton
        icon={ArchiveIcon}
        ariaLabel="archive"
        onClick={handleAction("archive")}
      />
      <IconButton
        icon={DeleteIcon}
        ariaLabel="delete"
        onClick={handleAction("delete")}
      />
      <IconButton
        icon={MarkEmailUnreadIcon}
        ariaLabel="mark unread"
        onClick={handleAction("unread")}
      />
      <IconButton
        icon={MoreVertIcon}
        ariaLabel="more"
        onClick={handleAction("more")}
      />
    </Box>
  );
};

export default ThreadActions;
