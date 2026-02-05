import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import IconButton from "../atoms/IconButton";
import Avatar from "../atoms/Avatar";
import ParticipantList from "../atoms/ParticipantList";
import ThreadActions from "./ThreadActions";

const ThreadHeader = ({ thread, onAction }) => {
  const navigate = useNavigate();
  const participantName = thread?.participants?.[0]?.name || "Unknown";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
        <IconButton
          icon={ArrowBackIcon}
          ariaLabel="back"
          onClick={() => navigate(-1)}
        />
        <Avatar name={participantName} size="medium" />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" noWrap>
            {thread?.subject || "No subject"}
          </Typography>
          <ParticipantList participants={thread?.participants || []} />
        </Box>
      </Box>
      <ThreadActions threadId={thread?.id} onAction={onAction} />
    </Box>
  );
};

export default ThreadHeader;
