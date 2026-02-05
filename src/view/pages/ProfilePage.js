import React from "react";
import { Box } from "@mui/material";
import { useAuth } from "../../nonview/core/AuthContext";
import AppLayout from "../moles/AppLayout";
import ProfileHeader from "../moles/ProfileHeader";
import ProfileForm from "../moles/ProfileForm";

function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();

  const handleUpdateProfile = async (updateData) => {
    await updateProfile(updateData);
  };

  return (
    <AppLayout>
      <Box sx={{ pb: 4 }}>
        <ProfileHeader user={currentUser} />
        <ProfileForm user={currentUser} onSubmit={handleUpdateProfile} />
      </Box>
    </AppLayout>
  );
}

export default ProfilePage;
