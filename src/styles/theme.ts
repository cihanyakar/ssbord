import { createTheme, alpha } from "@mui/material/styles";

// Corporate Light Theme - Professional fintech aesthetic
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e40af",
      light: "#3b82f6",
      dark: "#1e3a8a",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5"
    },
    success: {
      main: "#059669",
      light: "#10b981",
      dark: "#047857"
    },
    error: {
      main: "#dc2626",
      light: "#ef4444",
      dark: "#b91c1c"
    },
    warning: {
      main: "#d97706",
      light: "#f59e0b",
      dark: "#b45309"
    },
    info: {
      main: "#0284c7",
      light: "#0ea5e9",
      dark: "#0369a1"
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff"
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      disabled: "#94a3b8"
    },
    divider: alpha("#64748b", 0.12),
    action: {
      active: "#1e293b",
      hover: alpha("#1e293b", 0.04),
      selected: alpha("#1e40af", 0.08),
      disabled: "#94a3b8",
      disabledBackground: alpha("#94a3b8", 0.12)
    }
  },
  typography: {
    fontFamily: "\"JetBrains Mono NF\", \"SF Mono\", \"Consolas\", monospace",
    fontSize: 13,
    h1: {
      fontWeight: 600,
      letterSpacing: "-0.02em"
    },
    h2: {
      fontWeight: 600,
      letterSpacing: "-0.02em"
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.01em"
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em"
    },
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: "0.01em"
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.75rem",
      letterSpacing: "0.05em",
      textTransform: "uppercase"
    },
    body1: {
      fontSize: "0.875rem",
      letterSpacing: "0.01em"
    },
    body2: {
      fontSize: "0.8125rem",
      letterSpacing: "0.01em"
    },
    caption: {
      fontSize: "0.6875rem",
      letterSpacing: "0.03em",
      textTransform: "uppercase"
    },
    button: {
      fontWeight: 500,
      letterSpacing: "0.02em"
    }
  },
  shape: {
    borderRadius: 6
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)",
    "0 25px 50px -12px rgb(0 0 0 / 0.15)"
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#cbd5e1 #f1f5f9",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: 8,
            height: 8
          },
          "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
            background: "#f1f5f9"
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: 4,
            "&:hover": {
              background: "#94a3b8"
            }
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderColor: alpha("#64748b", 0.12)
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid ${alpha("#64748b", 0.12)}`
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 6
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(30, 64, 175, 0.2)"
          }
        },
        outlined: {
          borderColor: alpha("#64748b", 0.3),
          "&:hover": {
            borderColor: "#1e40af",
            backgroundColor: alpha("#1e40af", 0.04)
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          transition: "all 0.15s ease",
          "&:hover": {
            transform: "translateY(-1px)"
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small"
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: alpha("#64748b", 0.25)
            },
            "&:hover fieldset": {
              borderColor: alpha("#64748b", 0.4)
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1e40af",
              borderWidth: 1
            }
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)"
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          borderLeft: `1px solid ${alpha("#64748b", 0.12)}`
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1e293b",
          color: "#f8fafc",
          fontSize: "0.75rem",
          fontWeight: 400,
          padding: "6px 12px"
        },
        arrow: {
          color: "#1e293b"
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 4
        },
        outlined: {
          borderWidth: 1
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha("#64748b", 0.12)
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: alpha("#64748b", 0.04)
          }
        }
      }
    }
  }
});
