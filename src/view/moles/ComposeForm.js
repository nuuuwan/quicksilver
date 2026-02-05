import React, { useRef } from "react";
import { Box } from "@mui/material";
import RecipientInput from "./RecipientInput";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";
import ComposeActions from "./ComposeActions";

const ComposeForm = ({
  recipients,
  onRecipientsChange,
  subject,
  onSubjectChange,
  body,
  onBodyChange,
  onAttachFiles,
  onSaveDraft,
  onDiscard,
  contacts,
}) => {
  const fileInputRef = useRef(null);

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onAttachFiles) {
      onAttachFiles(files);
    }
    e.target.value = "";
  };

  return (
    <Box sx={{ p: 2 }}>
      <RecipientInput
        value={recipients}
        onChange={onRecipientsChange}
        suggestions={contacts}
      />

      <Box sx={{ mt: 2 }}>
        <Input
          label="Subject"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Subject"
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextArea
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
          placeholder="Write your message..."
          autoResize
        />
      </Box>

      <ComposeActions
        onAttach={handleAttachClick}
        onSaveDraft={onSaveDraft}
        onDiscard={onDiscard}
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFilesSelected}
      />
    </Box>
  );
};

export default ComposeForm;
