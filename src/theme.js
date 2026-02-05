import { createTheme } from "@mui/material";

// Quicksilver Email 2.0 Theme
// Brand Colors: #000000, #8D153A, #EB7400, #FFBE29, #00534E
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#EB7400", // Burgundy - main brand color
      light: "#FFBE29",
      dark: "#8D153A",
      contrastText: "#ffffff",
    },

    text: {
      primary: "#000000", // Pure black for maximum readability
      secondary: "#888888",
    },
    error: {
      main: "#8D153A", // Use burgundy for errors
    },
    warning: {
      main: "#EB7400", // Orange for warnings
    },
    success: {
      main: "#00534E", // Teal for success
    },
    info: {
      main: "#FFBE29", // Gold/yellow for info
    },
    divider: "#E0E0E0",
  },
  typography: {
    fontFamily: ['"Chocolate Classical Sans"', "sans-serif"].join(","),
  },
  shape: {
    borderRadius: 8, // Rounded corners for modern look
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 500,
        },
      },
    },
  },
  spacing: 8, // 8px base spacing unit
});

export default theme;
