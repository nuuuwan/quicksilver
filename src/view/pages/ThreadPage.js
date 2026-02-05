import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function ThreadPage() {
  const { threadId } = useParams();

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <Typography component="h1" variant="h4">
          Thread {threadId}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Single conversation/thread view will be implemented here
        </Typography>
      </Box>
    </Container>
  );
}

export default ThreadPage;
