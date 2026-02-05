import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Badge,
  Button as MuiButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useData } from "../../nonview/core/DataContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useData();

  const navItems = [
    { label: "Inbox", path: "/inbox", icon: InboxIcon, badge: unreadCount },
    { label: "Sent", path: "/sent", icon: SendIcon },
    { label: "Drafts", path: "/drafts", icon: DraftsIcon },
    { label: "Trash", path: "/trash", icon: DeleteIcon },
  ];

  return (
    <Box
      sx={{
        width: 240,
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
      }}
    >
      {/* Logo/Brand */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h5" fontWeight={600} color="primary">
          Quicksilver
        </Typography>
      </Box>

      {/* Compose Button */}
      <Box sx={{ p: 2 }}>
        <MuiButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/compose")}
          startIcon={<EditIcon />}
        >
          Compose
        </MuiButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1, py: 0 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const badgeCount =
            typeof item.badge === "number" ? item.badge : undefined;

          return (
            <ListItem
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                cursor: "pointer",
                backgroundColor: isActive ? "action.selected" : "transparent",
                "&:hover": {
                  backgroundColor: isActive
                    ? "action.selected"
                    : "action.hover",
                },
                borderLeft: isActive ? 3 : 0,
                borderColor: "primary.main",
              }}
            >
              <ListItemIcon>
                {badgeCount ? (
                  <Badge badgeContent={badgeCount} color="primary">
                    <Icon color={isActive ? "primary" : "action"} />
                  </Badge>
                ) : (
                  <Icon color={isActive ? "primary" : "action"} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "primary" : "text.primary",
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
