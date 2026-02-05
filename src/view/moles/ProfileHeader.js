import React from 'react';
import { Box } from '@mui/material';
import Avatar from '../atoms/Avatar';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';

/**
 * ProfileHeader - Profile page header with avatar and user info
 * @param {object} user - User object with name, email, avatar
 */
function ProfileHeader({ user }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 4,
        px: 2,
      }}
    >
      <Avatar 
        src={user.avatar} 
        name={user.name} 
        size="large"
        sx={{
          width: 120,
          height: 120,
          fontSize: '3rem',
        }}
      />
      <Box sx={{ textAlign: 'center' }}>
        <Heading level={4} sx={{ mb: 0.5 }}>
          {user.name}
        </Heading>
        <Text variant="body" color="text.secondary">
          {user.email}
        </Text>
      </Box>
    </Box>
  );
}

export default ProfileHeader;
