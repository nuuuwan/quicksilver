import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function ComposePage() {
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to");
  const reply = searchParams.get("reply");
  const forward = searchParams.get("forward");

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography component="h1" variant="h4">
          Compose Email
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Compose new email interface will be implemented here
        </Typography>
        {to && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            To: {to}
          </Typography>
        )}
        {reply && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Reply to thread: {reply}
          </Typography>
        )}
        {forward && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Forward thread: {forward}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default ComposePage;
