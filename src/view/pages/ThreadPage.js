import React from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../moles/AppLayout";
import ThreadHeader from "../moles/ThreadHeader";
import ThreadView from "../moles/ThreadView";
import MessageComposer from "../moles/MessageComposer";
import LoadingSpinner from "../atoms/LoadingSpinner";
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
        <LoadingSpinner />
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
      <ThreadHeader thread={thread} />
      <ThreadView thread={thread} messages={messages} loading={loading} />
      <MessageComposer threadId={threadId} onSend={() => {}} />
    </AppLayout>
  );
}

export default ThreadPage;
