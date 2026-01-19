import { HotTable, HotTableClass } from "@handsontable/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";
import { useRef } from "react";
import { UI_LABELS } from "../../core/constants";
import { useTaxConfig } from "../../hooks/useTaxConfig";
import "../../styles/handsontable.css";
import { NERD_ICONS } from "../common/NerdIcon";
import { COLUMN_HEADERS, createColumnConfig, getCellClassName, MAX_HISTORY } from "./employee-table.config";
import { EmployeeDetailPanel } from "./EmployeeDetailPanel";
import { useEmployeeTable } from "./use-employee-table";

registerAllModules();

export function EmployeeTable() {
  const { config } = useTaxConfig();
  const hotRef = useRef<HotTableClass>(null);

  const {
    employees,
    selectedEmployee,
    drawerOpen,
    deleteDialogOpen,
    employeeToDelete,
    history,
    canUndo,
    containerRef,
    tableHeight,
    handleUndo,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleDetailClick,
    handleExport,
    handleAfterChange,
    handleCloseDrawer,
    totals,
    hasData
  } = useEmployeeTable(config);

  // Custom renderer for action buttons using DOM methods
  const actionsRenderer = (
    _instance: Handsontable,
    td: HTMLTableCellElement,
    row: number
  ) => {
    while (td.firstChild) {
      td.removeChild(td.firstChild);
    }

    if (row >= employees.length) {
      td.className = "totals-row-cell";

      return td;
    }

    const container = document.createElement("div");

    container.style.display = "flex";
    container.style.gap = "4px";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";

    const detailBtn = document.createElement("button");

    detailBtn.title = "Detay";
    detailBtn.style.cssText = `
      padding: 4px 8px;
      cursor: pointer;
      border: 1px solid rgba(30, 64, 175, 0.25);
      background: rgba(30, 64, 175, 0.06);
      color: #1e40af;
      border-radius: 4px;
      font-family: "JetBrains Mono NF", monospace;
      font-size: 12px;
      display: flex;
      align-items: center;
      transition: all 0.15s ease;
    `;
    detailBtn.textContent = NERD_ICONS.eye;
    detailBtn.addEventListener("mouseenter", () => {
      detailBtn.style.background = "rgba(30, 64, 175, 0.12)";
      detailBtn.style.borderColor = "#1e40af";
    });
    detailBtn.addEventListener("mouseleave", () => {
      detailBtn.style.background = "rgba(30, 64, 175, 0.06)";
      detailBtn.style.borderColor = "rgba(30, 64, 175, 0.25)";
    });
    detailBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleDetailClick(row);
    });

    const deleteBtn = document.createElement("button");

    deleteBtn.title = "Sil";
    deleteBtn.style.cssText = `
      padding: 4px 8px;
      cursor: pointer;
      border: 1px solid rgba(220, 38, 38, 0.25);
      background: rgba(220, 38, 38, 0.06);
      color: #dc2626;
      border-radius: 4px;
      font-family: "JetBrains Mono NF", monospace;
      font-size: 12px;
      display: flex;
      align-items: center;
      transition: all 0.15s ease;
    `;
    deleteBtn.textContent = NERD_ICONS.trash;
    deleteBtn.addEventListener("mouseenter", () => {
      deleteBtn.style.background = "rgba(220, 38, 38, 0.12)";
      deleteBtn.style.borderColor = "#dc2626";
    });
    deleteBtn.addEventListener("mouseleave", () => {
      deleteBtn.style.background = "rgba(220, 38, 38, 0.06)";
      deleteBtn.style.borderColor = "rgba(220, 38, 38, 0.25)";
    });
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleDeleteClick(row);
    });

    container.appendChild(detailBtn);
    container.appendChild(deleteBtn);
    td.appendChild(container);

    return td;
  };

  const columns = createColumnConfig(actionsRenderer);

  const employeeRows = employees.map(emp => {
    const r = emp.result;

    return [
      "",
      emp.name,
      emp.netSalary,
      r?.gross ?? null,
      r?.deductions.sgkEmployee ?? null,
      r?.deductions.unemploymentEmployee ?? null,
      r?.deductions.incomeTax ?? null,
      r?.deductions.stampDuty ?? null,
      r?.deductions.total ?? null,
      r?.employerCosts.sgkEmployer ?? null,
      r?.employerCosts.sgkIncentive ?? null,
      r?.employerCosts.unemploymentEmployer ?? null,
      r?.employerCosts.total ?? null,
      r?.totalCost ?? null
    ];
  });

  const totalsRow = [
    "",
    UI_LABELS.TOTALS_ROW,
    hasData ? totals.netSalary : null,
    hasData ? totals.gross : null,
    hasData ? totals.sgkEmployee : null,
    hasData ? totals.unemploymentEmployee : null,
    hasData ? totals.incomeTax : null,
    hasData ? totals.stampDuty : null,
    hasData ? totals.totalDeductions : null,
    hasData ? totals.sgkEmployer : null,
    hasData ? totals.sgkIncentive : null,
    hasData ? totals.unemploymentEmployer : null,
    hasData ? totals.employerTotal : null,
    hasData ? totals.totalCost : null
  ];

  const tableData = [...employeeRows, totalsRow];

  return (
    <Box sx={{ display: "flex", gap: 0, flex: 1, height: "100%" }}>
      <Paper
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 0,
          bgcolor: "background.default",
          border: "none",
          height: "100%",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
                fontSize: "0.7rem",
                letterSpacing: "0.08em"
              }}
            >
              HESAPLAMA TABLOSU
            </Typography>
            <Chip
              label={`${employees.filter(e => e.netSalary).length} Çalışan`}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 500,
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.15),
                color: "success.main",
                border: "none"
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Tooltip title={`Geri Al - Ctrl+Z (${history.length}/${MAX_HISTORY})`} arrow>
              <span>
                <IconButton
                  size="small"
                  sx={{
                    width: 28,
                    height: 28,
                    color: "text.secondary",
                    fontFamily: "\"JetBrains Mono NF\", monospace",
                    fontSize: "13px",
                    bgcolor: (theme) => alpha(theme.palette.text.secondary, 0.08),
                    "&:hover": {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                      color: "primary.main"
                    },
                    "&.Mui-disabled": {
                      color: "text.disabled",
                      bgcolor: "transparent"
                    }
                  }}
                  onClick={handleUndo}
                  disabled={!canUndo || history.length === 0}
                >
                  {NERD_ICONS.undo}
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Excel olarak indir (.xlsx)" arrow>
              <IconButton
                size="small"
                sx={{
                  width: 28,
                  height: 28,
                  color: "text.secondary",
                  fontFamily: "\"JetBrains Mono NF\", monospace",
                  fontSize: "13px",
                  bgcolor: (theme) => alpha(theme.palette.text.secondary, 0.08),
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.15),
                    color: "success.main"
                  }
                }}
                onClick={handleExport}
              >
                {NERD_ICONS.download}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            overflow: "hidden",
            position: "relative"
          }}
        >
          <HotTable
            ref={hotRef}
            data={tableData}
            columns={columns}
            colHeaders={COLUMN_HEADERS}
            rowHeaders={true}
            width="100%"
            height={tableHeight}
            licenseKey="non-commercial-and-evaluation"
            stretchH="all"
            autoRowSize={false}
            autoColumnSize={false}
            manualColumnResize={true}
            contextMenu={true}
            afterChange={handleAfterChange}
            className="employee-table"
            cells={(row, col) => {
              const cellProperties: Partial<Handsontable.CellProperties> = {};
              const className = getCellClassName(row, col, employees.length);

              if (row === employees.length) {
                cellProperties.readOnly = true;
              }

              if (className) {
                cellProperties.className = className;
              }

              return cellProperties;
            }}
          />
        </Box>
      </Paper>

      <EmployeeDetailPanel
        employee={selectedEmployee}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Çalışanı Sil
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            <strong>{employeeToDelete?.name}</strong> isimli çalışanı silmek istediğinizden emin misiniz? Bu işlem geri alınabilir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            İptal
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
