import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "./SearchBar";

const Header = ({
  title,
  titleIcon,
  showBack = false,
  onMenuClick,
  actions = [],
  showSearch = false,
  onSearch,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const TitleIcon = titleIcon;

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton onClick={onMenuClick} aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: showSearch ? 0 : 1,
          }}
        >
          {TitleIcon && <TitleIcon sx={{ mr: 1, color: "text.secondary" }} />}
          <Typography variant="h6" component="h1">
            {title}
          </Typography>
        </Box>

        {/* Search Bar */}
        {showSearch && (
          <Box sx={{ flexGrow: 1, mx: 2, maxWidth: 600 }}>
            <SearchBar onSearch={onSearch} placeholder="Search emails..." />
          </Box>
        )}

        {/* Action Buttons */}
        {actions.map((action, index) => {
          const ActionIcon = action.icon;
          return (
            <IconButton
              key={index}
              onClick={action.onClick}
              aria-label={action.label}
            >
              <ActionIcon />
            </IconButton>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
