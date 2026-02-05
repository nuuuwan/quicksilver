import React from "react";
import { Box, Container, Typography } from "@mui/material";

function RegisterPage() {
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
          Register
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Registration page will be implemented here
        </Typography>
      </Box>
    </Container>
  );
}

export default RegisterPage;
