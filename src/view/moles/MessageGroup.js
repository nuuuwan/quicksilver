import React from "react";
import { Box } from "@mui/material";
import Avatar from "../atoms/Avatar";
import MessageBubble from "./MessageBubble";

const MessageGroup = ({ messages = [], sender }) => {
  if (!messages.length) return null;

  const isSent = sender?.id === "current";
  const senderName = sender?.name || "Unknown";

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "flex-start" }}>
      {!isSent && <Avatar name={senderName} size="small" />}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} isSent={isSent} />
        ))}
      </Box>
    </Box>
  );
};

export default MessageGroup;
