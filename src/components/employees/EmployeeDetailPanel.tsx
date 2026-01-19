import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { UI_LABELS } from "../../core/constants";
import type { SalaryCalculationResult } from "../../core/types";
import { formatCurrency, formatPercentage } from "../../core/utils/math.utils";
import { NERD_ICONS } from "../common/NerdIcon";

type EmployeeDetailPanelProps = {
  employee: {
    id: number;
    name: string;
    netSalary: number | null;
    result: SalaryCalculationResult | null;
  } | null;
  open: boolean;
  onClose: () => void;
};

type DetailRowProps = {
  label: string;
  value: string;
  color?: string;
  bold?: boolean;
  indent?: boolean;
};

function DetailRow({ label, value, color, bold, indent }: DetailRowProps) {
  return (
    <ListItem dense sx={{ py: 0.5, pl: indent ? 4 : 2 }}>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          variant: "body2",
          color: "text.secondary",
          fontSize: indent ? "0.8rem" : "0.875rem"
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontWeight: bold ? 700 : 500,
          color: color || "text.primary",
          fontFamily: "\"Roboto Mono\", monospace"
        }}
      >
        {value}
      </Typography>
    </ListItem>
  );
}

export function EmployeeDetailPanel({ employee, open, onClose }: EmployeeDetailPanelProps) {
  const { name, netSalary, result } = employee || { name: "", netSalary: null, result: null };
  const netPercentage = result ? (result.net / result.gross) * 100 : 0;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 360 }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="span"
            sx={{ fontFamily: "\"JetBrains Mono NF\", monospace", fontSize: "18px" }}
          >
            {NERD_ICONS.person}
          </Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {name || UI_LABELS.EMPLOYEE_DETAIL_TITLE}
          </Typography>
        </Box>
        <IconButton
          size="small"
          sx={{
            color: "white",
            fontFamily: "\"JetBrains Mono NF\", monospace",
            fontSize: "14px"
          }}
          onClick={onClose}
        >
          {NERD_ICONS.close}
        </IconButton>
      </Box>

      {/* Content */}
      {!result || !netSalary ? (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: 3 }}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Net maaş girilerek hesaplama yapılması bekleniyor
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {/* Summary */}
          <Box sx={{ p: 2, bgcolor: "success.main", color: "white" }}>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Net Maaş
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {formatCurrency(result.net)}
            </Typography>
          </Box>

          {/* Brüt Maaş */}
          <List dense disablePadding>
            <DetailRow label="Brüt Maaş" value={formatCurrency(result.gross)} bold />
          </List>

          <Divider />

          {/* Çalışan Kesintileri */}
          <Box sx={{ px: 2, pt: 1.5 }}>
            <Chip
              label="Çalışan Kesintileri"
              size="small"
              color="error"
              variant="outlined"
              sx={{ fontSize: "0.75rem" }}
            />
          </Box>
          <List dense disablePadding>
            <DetailRow
              label="SGK Primi (%14)"
              value={`-${formatCurrency(result.deductions.sgkEmployee)}`}
              color="error.main"
              indent
            />
            <DetailRow
              label="İşsizlik Sig. (%1)"
              value={`-${formatCurrency(result.deductions.unemploymentEmployee)}`}
              color="error.main"
              indent
            />
            <DetailRow
              label="Gelir Vergisi Matrahı"
              value={formatCurrency(result.deductions.incomeTaxBase)}
              indent
            />
            <DetailRow
              label="Asgari Ücret İstisnası"
              value={`-${formatCurrency(result.deductions.minimumWageTaxExemption)}`}
              color="success.main"
              indent
            />
            <DetailRow
              label="Gelir Vergisi"
              value={`-${formatCurrency(result.deductions.incomeTax)}`}
              color="error.main"
              indent
            />
            <DetailRow
              label="Damga Vergisi"
              value={`-${formatCurrency(result.deductions.stampDuty)}`}
              color="error.main"
              indent
            />
            <Divider sx={{ my: 0.5 }} />
            <DetailRow
              label="Toplam Kesinti"
              value={`-${formatCurrency(result.deductions.total)}`}
              color="error.main"
              bold
            />
          </List>

          <Divider />

          {/* Net Maaş */}
          <List dense disablePadding>
            <DetailRow
              label={`Net Maaş (${formatPercentage(netPercentage / 100)})`}
              value={formatCurrency(result.net)}
              color="success.main"
              bold
            />
          </List>

          <Divider />

          {/* İşveren Maliyetleri */}
          <Box sx={{ px: 2, pt: 1.5 }}>
            <Chip
              label="İşveren Maliyetleri"
              size="small"
              color="warning"
              variant="outlined"
              sx={{ fontSize: "0.75rem" }}
            />
          </Box>
          <List dense disablePadding>
            <DetailRow
              label="SGK Primi (%20.5)"
              value={`+${formatCurrency(result.employerCosts.sgkEmployer)}`}
              color="warning.main"
              indent
            />
            <DetailRow
              label="İşsizlik Sig. (%2)"
              value={`+${formatCurrency(result.employerCosts.unemploymentEmployer)}`}
              color="warning.main"
              indent
            />
            <Divider sx={{ my: 0.5 }} />
            <DetailRow
              label="İşveren Toplam"
              value={`+${formatCurrency(result.employerCosts.total)}`}
              color="warning.main"
              bold
            />
          </List>

          <Divider />

          {/* Toplam Maliyet */}
          <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              İşveren Toplam Maliyet
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {formatCurrency(result.totalCost)}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              (Brüt + İşveren Payları)
            </Typography>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
