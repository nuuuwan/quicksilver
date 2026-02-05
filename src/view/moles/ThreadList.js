import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThreadListItem from "./ThreadListItem";
import LoadingSpinner from "../atoms/LoadingSpinner";
import EmptyState from "../atoms/EmptyState";

const ThreadList = ({
  threads,
  loading = false,
  emptyMessage = "No emails found",
  selectedThreadId,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
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
    );
  }

  if (!threads || threads.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  const handleThreadClick = (threadId) => {
    navigate(`/thread/${threadId}`);
  };

  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      {threads.map((thread) => (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          isSelected={thread.id === selectedThreadId}
          onClick={handleThreadClick}
        />
      ))}
    </Box>
  );
};

export default ThreadList;
