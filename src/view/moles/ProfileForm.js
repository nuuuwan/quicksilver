import React, { useState } from "react";
import { Box, Stack, TextField, Button, CircularProgress } from "@mui/material";
import ErrorMessage from "../atoms/ErrorMessage";

/**
 * ProfileForm - Form for editing user profile
 * @param {object} user - User object with current values
 * @param {function} onSubmit - Submit callback
 */
function ProfileForm({ user, onSubmit }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation (if changing password)
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        setError("Current password is required to change password");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError("New passwords do not match");
        return;
      }
      if (formData.newPassword.length < 6) {
        setError("New password must be at least 6 characters");
        return;
      }
    }

    setLoading(true);
    try {
      // Prepare update data
      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      // Only include password fields if changing password
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await onSubmit(updateData);
      setSuccess("Profile updated successfully");

      // Clear password fields after successful update
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", px: 2 }}
    >
      <Stack spacing={3}>
        {error && (
          <ErrorMessage message={error} onDismiss={() => setError("")} />
        )}
        {success && (
          <ErrorMessage
            message={success}
            variant="success"
            onDismiss={() => setSuccess("")}
          />
        )}

        <TextField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          fullWidth
          variant="outlined"
        />

        <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
          <TextField
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password to change"
            disabled={loading}
            fullWidth
            variant="outlined"
          />
        </Box>

        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Leave blank to keep current password"
          disabled={loading}
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          disabled={loading}
          fullWidth
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          fullWidth
        >
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}

export default ProfileForm;
