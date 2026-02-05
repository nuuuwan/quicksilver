import React from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import AppLayout from "../moles/AppLayout";
import ThreadHeader from "../moles/ThreadHeader";
import ThreadView from "../moles/ThreadView";
import MessageComposer from "../moles/MessageComposer";
import EmptyState from "../atoms/EmptyState";
import { useData } from "../../nonview/core/DataContext";

function ThreadPage() {
  const { threadId } = useParams();
  const { getThread, getMessages, loading } = useData();

  const thread = getThread(threadId);
  const messages = getMessages(threadId);

  if (loading) {
    return (
      <AppLayout title="Thread">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  if (!thread) {
    return (
      <AppLayout title="Thread">
        <EmptyState
          title="Thread not found"
          description="The requested thread does not exist."
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout title={thread.subject || "Thread"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <ThreadHeader thread={thread} />
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <ThreadView thread={thread} messages={messages} loading={loading} />
        </Box>
        <Box
          sx={{
            borderTop: 1,
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <MessageComposer threadId={threadId} onSend={() => {}} />
        </Box>
      </Box>
    </AppLayout>
  );
}

export default ThreadPage;
