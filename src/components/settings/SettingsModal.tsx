import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTaxConfig } from "../../hooks/useTaxConfig";
import { NERD_ICONS } from "../common/NerdIcon";
import { NumericInput } from "../common/NumericInput";
import { PercentageInput } from "../common/PercentageInput";

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
};

type ParameterRowProps = {
  label: string;
  children: React.ReactNode;
  description?: string;
};

function ParameterRow({ label, children, description }: ParameterRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1.5,
        borderBottom: 1,
        borderColor: "divider"
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" fontWeight={500}>
          {label}
        </Typography>
        {description && (
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: 180, flexShrink: 0 }}>
        {children}
      </Box>
    </Box>
  );
}

type SectionHeaderProps = {
  icon: string;
  title: string;
};

function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 1,
        mt: 2,
        mb: 1
      }}
    >
      <Box
        component="span"
        sx={{
          fontFamily: "\"JetBrains Mono NF\", monospace",
          fontSize: "14px",
          color: "primary.main"
        }}
      >
        {icon}
      </Box>
      <Typography variant="subtitle2" color="primary" fontWeight={600}>
        {title}
      </Typography>
    </Box>
  );
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const {
    config,
    updateSGKRates,
    updateUnemploymentRates,
    updateStampDutyRate,
    updateIncomeTaxBrackets,
    updateMinimumWage,
    updateSGKCeiling,
    resetToDefaults
  } = useTaxConfig();

  const handleBracketRateChange = (index: number, rate: number) => {
    const newBrackets = [...config.incomeTax.brackets];

    newBrackets[index] = { ...newBrackets[index], rate };
    updateIncomeTaxBrackets(newBrackets);
  };

  const handleBracketMinChange = (index: number, minIncome: number) => {
    const newBrackets = [...config.incomeTax.brackets];

    newBrackets[index] = { ...newBrackets[index], minIncome };
    // Also update the previous bracket's maxIncome
    if (index > 0) {
      newBrackets[index - 1] = { ...newBrackets[index - 1], maxIncome: minIncome };
    }
    updateIncomeTaxBrackets(newBrackets);
  };

  const handleBracketMaxChange = (index: number, maxIncome: number | null) => {
    const newBrackets = [...config.incomeTax.brackets];

    newBrackets[index] = { ...newBrackets[index], maxIncome };
    // Also update the next bracket's minIncome
    if (index < newBrackets.length - 1 && maxIncome !== null) {
      newBrackets[index + 1] = { ...newBrackets[index + 1], minIncome: maxIncome };
    }
    updateIncomeTaxBrackets(newBrackets);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, maxHeight: "90vh" }
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1.5
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="span"
            sx={{ fontFamily: "\"JetBrains Mono NF\", monospace", fontSize: "18px" }}
          >
            {NERD_ICONS.settings}
          </Box>
          <Typography variant="h6" fontWeight={600}>
            Hesaplama Parametreleri
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Tooltip title="Varsayılana Sıfırla">
            <IconButton
              size="small"
              sx={{
                color: "white",
                fontFamily: "\"JetBrains Mono NF\", monospace",
                fontSize: "14px"
              }}
              onClick={resetToDefaults}
            >
              {NERD_ICONS.undo}
            </IconButton>
          </Tooltip>
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
      </DialogTitle>

      <DialogContent sx={{ pt: 2, px: 3 }}>
        {/* SGK Primleri */}
        <SectionHeader icon={NERD_ICONS.chart} title="SGK Primleri" />
        <Stack>
          <ParameterRow label="Çalışan SGK Primi">
            <PercentageInput
              value={config.sgk.employeeRate}
              onChange={(rate) => updateSGKRates(rate, config.sgk.employerRate, config.sgk.employerIncentiveRate)}
              size="small"
              fullWidth
            />
          </ParameterRow>
          <ParameterRow label="İşveren SGK Primi">
            <PercentageInput
              value={config.sgk.employerRate}
              onChange={(rate) => updateSGKRates(config.sgk.employeeRate, rate, config.sgk.employerIncentiveRate)}
              size="small"
              fullWidth
            />
          </ParameterRow>
          <ParameterRow label="İşveren SGK Teşviki" description="5 puanlık teşvik vb.">
            <PercentageInput
              value={config.sgk.employerIncentiveRate}
              onChange={(rate) => updateSGKRates(config.sgk.employeeRate, config.sgk.employerRate, rate)}
              size="small"
              fullWidth
            />
          </ParameterRow>
          <ParameterRow label="SGK Tavan Ücreti" description="Aylık SGK matrah tavanı">
            <NumericInput
              value={config.sgkCeiling}
              onChange={(value) => value !== null && updateSGKCeiling(value)}
              prefix="₺"
              size="small"
              fullWidth
            />
          </ParameterRow>
        </Stack>

        {/* İşsizlik Sigortası */}
        <SectionHeader icon={NERD_ICONS.person} title="İşsizlik Sigortası" />
        <Stack>
          <ParameterRow label="Çalışan İşsizlik Primi">
            <PercentageInput
              value={config.unemployment.employeeRate}
              onChange={(rate) => updateUnemploymentRates(rate, config.unemployment.employerRate)}
              size="small"
              fullWidth
            />
          </ParameterRow>
          <ParameterRow label="İşveren İşsizlik Primi">
            <PercentageInput
              value={config.unemployment.employerRate}
              onChange={(rate) => updateUnemploymentRates(config.unemployment.employeeRate, rate)}
              size="small"
              fullWidth
            />
          </ParameterRow>
        </Stack>

        {/* Damga Vergisi */}
        <SectionHeader icon={NERD_ICONS.document} title="Damga Vergisi" />
        <Stack>
          <ParameterRow label="Damga Vergisi Oranı">
            <PercentageInput
              value={config.stampDuty.rate}
              onChange={updateStampDutyRate}
              size="small"
              fullWidth
            />
          </ParameterRow>
        </Stack>

        {/* Asgari Ücret */}
        <SectionHeader icon={NERD_ICONS.calculator} title="Asgari Ücret" />
        <Stack>
          <ParameterRow label="Brüt Asgari Ücret">
            <NumericInput
              value={config.minimumWage.gross}
              onChange={(value) => value !== null && updateMinimumWage(value, config.minimumWage.net)}
              prefix="₺"
              size="small"
              fullWidth
            />
          </ParameterRow>
          <ParameterRow label="Net Asgari Ücret" description="Vergi istisnası hesabında kullanılır">
            <NumericInput
              value={config.minimumWage.net}
              onChange={(value) => value !== null && updateMinimumWage(config.minimumWage.gross, value)}
              prefix="₺"
              size="small"
              fullWidth
            />
          </ParameterRow>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Gelir Vergisi Dilimleri */}
        <SectionHeader icon={NERD_ICONS.list} title="Gelir Vergisi Dilimleri" />

        <Stack spacing={1.5}>
          {config.incomeTax.brackets.map((bracket, index) => (
            <Box
              key={bracket.id}
              sx={{
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 1,
                border: 1,
                borderColor: "grey.200"
              }}
            >
              <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 1.5 }}>
                {index + 1}. Dilim
              </Typography>

              <Stack spacing={1.5}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                      Alt Sınır (₺)
                    </Typography>
                    <NumericInput
                      value={bracket.minIncome}
                      onChange={(value) => value !== null && handleBracketMinChange(index, value)}
                      size="small"
                      fullWidth
                      disabled={index === 0}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                      Üst Sınır (₺)
                    </Typography>
                    <NumericInput
                      value={bracket.maxIncome}
                      onChange={(value) => handleBracketMaxChange(index, value)}
                      size="small"
                      fullWidth
                      disabled={index === config.incomeTax.brackets.length - 1}
                      placeholder="Sınırsız"
                    />
                  </Box>
                  <Box sx={{ width: 120 }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                      Vergi Oranı
                    </Typography>
                    <PercentageInput
                      value={bracket.rate}
                      onChange={(rate) => handleBracketRateChange(index, rate)}
                      size="small"
                      fullWidth
                    />
                  </Box>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
