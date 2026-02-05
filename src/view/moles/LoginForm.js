import React, { useState } from "react";
import { Box } from "@mui/material";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Checkbox from "../atoms/Checkbox";
import ErrorMessage from "../atoms/ErrorMessage";

const LoginForm = ({ onSubmit, loading = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({ email, password, rememberMe });
    } catch (error) {
      setFormError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
      {formError && (
        <Box sx={{ mb: 2 }}>
          <ErrorMessage
            message={formError}
            onDismiss={() => setFormError("")}
          />
        </Box>
      )}

      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
        required
        sx={{ mb: 2 }}
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="current-password"
        required
        sx={{ mb: 2 }}
      />

      <Checkbox
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        label="Remember me"
      />

      <Button
        type="submit"
        fullWidth
        loading={loading}
        variant="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
