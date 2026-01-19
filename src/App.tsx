import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { NERD_ICONS } from "./components/common/NerdIcon";
import { EmployeeTable } from "./components/employees";
import { SettingsModal } from "./components/settings";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      {/* Corporate Header */}
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          minHeight: 48
        }}
      >
        {/* Logo & Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
              borderRadius: 1,
              color: "primary.main",
              fontFamily: "\"JetBrains Mono NF\", monospace",
              fontSize: "16px"
            }}
          >
            {NERD_ICONS.calculator}
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              component="h1"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "text.primary",
                lineHeight: 1.2
              }}
            >
              Bordro
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.65rem",
                letterSpacing: "0.02em"
              }}
            >
              Net / Brüt Hesaplama
            </Typography>
          </Box>
        </Box>

        {/* Status & Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Chip
            label="2026"
            size="small"
            variant="outlined"
            sx={{
              height: 24,
              fontSize: "0.65rem",
              fontWeight: 500,
              borderColor: (theme) => alpha(theme.palette.text.secondary, 0.3),
              color: "text.secondary"
            }}
          />
          <Tooltip title="Vergi Parametreleri" arrow>
            <IconButton
              size="small"
              onClick={() => setSettingsOpen(true)}
              sx={{
                width: 32,
                height: 32,
                bgcolor: (theme) => alpha(theme.palette.text.secondary, 0.08),
                color: "text.secondary",
                fontFamily: "\"JetBrains Mono NF\", monospace",
                fontSize: "14px",
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                  color: "primary.main"
                }
              }}
            >
              {NERD_ICONS.settings}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <EmployeeTable />
      </Box>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </Box>
  );
}

export default App;
