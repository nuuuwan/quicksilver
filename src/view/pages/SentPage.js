import React from "react";
import { Box, Container, Typography } from "@mui/material";

function SentPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4 }}>
        <Typography component="h1" variant="h4">
          Sent
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Sent emails view will be implemented here
        </Typography>
      </Box>
    </Container>
  );
}

export default SentPage;
