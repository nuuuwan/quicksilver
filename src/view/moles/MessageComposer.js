import React, { useState } from "react";
import { Box } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "../atoms/IconButton";
import TextArea from "../atoms/TextArea";

const MessageComposer = ({
  threadId,
  onSend,
  placeholder = "Write a message...",
}) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    if (onSend) {
      onSend({ threadId, content: value.trim() });
    }
    setValue("");
  };

  return (
    <Box
      sx={{
        p: 2,
        borderTop: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
        display: "flex",
        alignItems: "flex-end",
        gap: 1,
      }}
    >
      <IconButton icon={AttachFileIcon} ariaLabel="attach" />
      <IconButton icon={EmojiEmotionsIcon} ariaLabel="emoji" />
      <Box sx={{ flex: 1 }}>
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoResize
        />
      </Box>
      <IconButton icon={SendIcon} ariaLabel="send" onClick={handleSend} />
    </Box>
  );
};

export default MessageComposer;
