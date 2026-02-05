import React, { useState } from "react";
import { Box } from "@mui/material";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";

const RegistrationForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      await onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      setFormError(error.message || "Registration failed. Please try again.");
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
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={handleChange("name")}
        error={errors.name}
        autoComplete="name"
        required
        sx={{ mb: 2 }}
      />

      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        error={errors.email}
        autoComplete="email"
        required
        sx={{ mb: 2 }}
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange("password")}
        error={errors.password}
        autoComplete="new-password"
        required
        sx={{ mb: 2 }}
      />

      <Input
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
        autoComplete="new-password"
        required
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        fullWidth
        loading={loading}
        variant="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegistrationForm;
