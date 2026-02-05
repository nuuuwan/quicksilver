import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppLayout from "../moles/AppLayout";
import ComposeHeader from "../moles/ComposeHeader";
import ComposeForm from "../moles/ComposeForm";
import AttachmentList from "../moles/AttachmentList";
import { useData } from "../../nonview/core/DataContext";

const parseRecipients = (toParam) => {
  if (!toParam) return [];
  return toParam
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean)
    .map((email) => ({ email }));
};

function ComposePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { contacts, sendEmail, saveDraft } = useData();

  const initialTo = searchParams.get("to");
  const initialSubject = searchParams.get("subject") || "";
  const initialBody = searchParams.get("body") || "";

  const [recipients, setRecipients] = useState(parseRecipients(initialTo));
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [attachments, setAttachments] = useState([]);

  const contactSuggestions = useMemo(() => contacts || [], [contacts]);

  const handleAttachFiles = (files) => {
    const newAttachments = files.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSend = async () => {
    await sendEmail({
      to: recipients,
      subject,
      body,
      attachments,
    });
    navigate("/sent");
  };

  const handleSaveDraft = async () => {
    await saveDraft({
      to: recipients,
      subject,
      body,
      attachments,
    });
    navigate("/drafts");
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  return (
    <AppLayout title="Compose">
      <ComposeHeader onSend={handleSend} onClose={handleDiscard} />
      <ComposeForm
        recipients={recipients}
        onRecipientsChange={setRecipients}
        subject={subject}
        onSubjectChange={setSubject}
        body={body}
        onBodyChange={setBody}
        onAttachFiles={handleAttachFiles}
        onSaveDraft={handleSaveDraft}
        onDiscard={handleDiscard}
        contacts={contactSuggestions}
      />
      <AttachmentList
        attachments={attachments}
        onRemove={handleRemoveAttachment}
        editable
      />
    </AppLayout>
  );
}

export default ComposePage;
