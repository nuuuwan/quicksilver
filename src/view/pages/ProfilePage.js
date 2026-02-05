import React from "react";
import { Box, Container, Typography } from "@mui/material";

function ProfilePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography component="h1" variant="h4">
          Profile
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          User profile and settings will be implemented here
        </Typography>
      </Box>
    </Container>
  );
}

export default ProfilePage;
