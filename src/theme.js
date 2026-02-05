import { createTheme } from "@mui/material";

// Quicksilver Email 2.0 Theme
// Brand Colors: #000000, #8D153A, #EB7400, #FFBE29, #00534E
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8D153A", // Burgundy - main brand color
      light: "#A73D5B",
      dark: "#6A0F2C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00534E", // Dark teal - complementary color
      light: "#337572",
      dark: "#003D3A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F5F5", // Light gray background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000", // Pure black for maximum readability
      secondary: "#6C6C70",
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
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
    button: {
      textTransform: "none", // Prevent uppercase transformation
      fontWeight: 500,
    },
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
