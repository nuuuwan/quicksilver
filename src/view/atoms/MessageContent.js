import React from "react";
import { Typography } from "@mui/material";

const MessageContent = ({ content }) => {
  return (
    <Typography
      variant="body2"
      sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
    >
      {content}
    </Typography>
  );
};

export default MessageContent;
