import React from "react";
import { Box, Container, Typography } from "@mui/material";

function InboxPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <Typography component="h1" variant="h4">
          Inbox
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Inbox view with list of conversations will be implemented here
        </Typography>
      </Box>
    </Container>
  );
}

export default InboxPage;
