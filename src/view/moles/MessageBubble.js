import React from "react";
import { Box } from "@mui/material";
import MessageContent from "../atoms/MessageContent";
import MessageMeta from "../atoms/MessageMeta";

const MessageBubble = ({ message, isSent }) => {
  return (
    <Box
      sx={{
        alignSelf: isSent ? "flex-end" : "flex-start",
        backgroundColor: isSent ? "primary.main" : "background.paper",
        color: isSent ? "primary.contrastText" : "text.primary",
        borderRadius: 2,
        px: 2,
        py: 1.5,
        maxWidth: "75%",
        boxShadow: 1,
      }}
    >
      <MessageContent content={message.content} />
      <MessageMeta
        timestamp={message.timestamp}
        isRead={message.isRead}
        isSent={isSent}
      />
    </Box>
  );
};

export default MessageBubble;
