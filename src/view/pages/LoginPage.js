import React from "react";
import { Box, Container, Typography } from "@mui/material";

function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Login page will be implemented here
        </Typography>
      </Box>
    </Container>
  );
}

export default LoginPage;
