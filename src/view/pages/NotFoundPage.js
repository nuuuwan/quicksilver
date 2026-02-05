import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EmptyState from "../atoms/EmptyState";
import Button from "../atoms/Button";

/**
 * NotFoundPage - 404 error page
 * Path: *
 * Displays when user navigates to non-existent route
 */
function NotFoundPage() {
  const navigate = useNavigate();

  const handleBackToInbox = () => {
    navigate("/inbox");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: 2,
      }}
    >
      <EmptyState
        icon={<ErrorOutlineIcon sx={{ fontSize: 80 }} />}
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <Box sx={{ mt: 3 }}>
        <Button variant="primary" onClick={handleBackToInbox}>
          Back to Inbox
        </Button>
      </Box>
    </Box>
  );
}

export default NotFoundPage;
