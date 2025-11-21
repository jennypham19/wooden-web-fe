import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Chip,
  Tooltip,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Detailed Production Plan Manager with 3 sections:
//  - Nhận BOM & bản vẽ kỹ thuật (BOMList)
//  - Lập kế hoạch sản xuất (ProductionPlan)
//  - Lệnh sản xuất (WorkOrderManager)
// Single-file demo (mock data) suitable to extract into smaller components.

type PlanStatus = "Draft" | "Planned" | "In Progress" | "Completed" | "Blocked";

interface BOMItem {
  id: string;
  orderCode: string;
  files: { name: string; url: string }[];
  note?: string;
  receivedAt: string;
}

interface WorkOrder {
  id: string;
  name: string;
  machine: string;
  startDate: string;
  endDate: string;
  progress: number;
  planId?: string; // link to ProductionPlan
}

interface ProductionPlan {
  id: string;
  orderCode: string;
  productName: string;
  quantity: number;
  unit: string;
  plannedStart: string;
  plannedEnd: string;
  status: PlanStatus;
  note?: string;
}

// ---------- Mock data ----------
const SAMPLE_BOMS: BOMItem[] = [
  {
    id: "bom-1",
    orderCode: "PO-1001",
    files: [{ name: "BOM_PO-1001.xlsx", url: "#" }, { name: "Drawing_A.pdf", url: "#" }],
    note: "Gửi từ kỹ thuật 2025-11-01",
    receivedAt: "2025-11-01",
  },
  {
    id: "bom-2",
    orderCode: "PO-1002",
    files: [{ name: "BOM_PO-1002.xlsx", url: "#" }],
    receivedAt: "2025-11-04",
  },
];

const SAMPLE_PLANS: ProductionPlan[] = [
  {
    id: "plan-1",
    orderCode: "PO-1001",
    productName: "Widget A",
    quantity: 1200,
    unit: "pcs",
    plannedStart: "2025-11-01",
    plannedEnd: "2025-11-10",
    status: "In Progress",
    note: "Priority: high",
  },
];

const SAMPLE_WOS: WorkOrder[] = [
  {
    id: "wo-1",
    name: "Cutting",
    machine: "Cutter-01",
    startDate: "2025-11-01",
    endDate: "2025-11-03",
    progress: 100,
    planId: "plan-1",
  },
  {
    id: "wo-2",
    name: "Assembly",
    machine: "Line-02",
    startDate: "2025-11-04",
    endDate: "2025-11-08",
    progress: 60,
    planId: "plan-1",
  },
];

// ---------- helpers ----------
const statusColor = (s: PlanStatus) => {
  switch (s) {
    case "Draft":
      return "default";
    case "Planned":
      return "info";
    case "In Progress":
      return "warning";
    case "Completed":
      return "success";
    case "Blocked":
      return "error";
    default:
      return "default";
  }
};

// ---------- Main UI ----------
export default function ProductionPlanManagerDetailed() {
  const [tab, setTab] = useState(0);

  // data state
  const [boms, setBoms] = useState<BOMItem[]>(SAMPLE_BOMS);
  const [plans, setPlans] = useState<ProductionPlan[]>(SAMPLE_PLANS);
  const [wos, setWos] = useState<WorkOrder[]>(SAMPLE_WOS);

  // local states for dialogs
  const [bomDialogOpen, setBomDialogOpen] = useState(false);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [woDialogOpen, setWoDialogOpen] = useState(false);

  const [editingBom, setEditingBom] = useState<BOMItem | null>(null);
  const [editingPlan, setEditingPlan] = useState<ProductionPlan | null>(null);
  const [editingWo, setEditingWo] = useState<WorkOrder | null>(null);

  // ----- computations -----
  const planProgress = (planId: string) => {
    const related = wos.filter((w) => w.planId === planId);
    if (!related.length) return 0;
    return Math.round(related.reduce((s, r) => s + r.progress, 0) / related.length);
  };

  // ----- CRUD handlers (demo only) -----
  const createOrUpdatePlan = (p: ProductionPlan) => {
    setPlans((prev) => (prev.find((x) => x.id === p.id) ? prev.map((x) => (x.id === p.id ? p : x)) : [p, ...prev]));
    setPlanDialogOpen(false);
  };

  const createOrUpdateBom = (b: BOMItem) => {
    setBoms((prev) => (prev.find((x) => x.id === b.id) ? prev.map((x) => (x.id === b.id ? b : x)) : [b, ...prev]));
    setBomDialogOpen(false);
  };

  const createOrUpdateWo = (w: WorkOrder) => {
    setWos((prev) => (prev.find((x) => x.id === w.id) ? prev.map((x) => (x.id === w.id ? w : x)) : [w, ...prev]));
    setWoDialogOpen(false);
  };

  // quick delete
  const deletePlan = (id: string) => {
    if (!confirm("Xóa kế hoạch?")) return;
    setPlans((p) => p.filter((x) => x.id !== id));
    setWos((w) => w.filter((x) => x.planId !== id));
  };

  const deleteBom = (id: string) => {
    if (!confirm("Xóa BOM?")) return;
    setBoms((p) => p.filter((x) => x.id !== id));
  };

  const deleteWo = (id: string) => {
    if (!confirm("Xóa Work Order?")) return;
    setWos((p) => p.filter((x) => x.id !== id));
  };

  // ---------- Render sections ----------
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Quản lý kế hoạch</Typography>
              <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                <Tab label="Nhận BOM & bản vẽ" />
                <Tab label="Lập kế hoạch sản xuất" />
                <Tab label="Lệnh sản xuất" />
              </Tabs>
            </Stack>

            {tab === 0 && (
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">Danh sách BOM nhận từ kỹ thuật</Typography>
                  <Button startIcon={<AddIcon />} onClick={() => { setEditingBom(null); setBomDialogOpen(true); }}>
                    Thêm BOM
                  </Button>
                </Stack>

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã đơn</TableCell>
                      <TableCell>Files</TableCell>
                      <TableCell>Ngày nhận</TableCell>
                      <TableCell>Ghi chú</TableCell>
                      <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {boms.map((b) => (
                      <TableRow key={b.id} hover>
                        <TableCell>{b.orderCode}</TableCell>
                        <TableCell>
                          {b.files.map((f, i) => (
                            <div key={i}><a href={f.url}>{f.name}</a></div>
                          ))}
                        </TableCell>
                        <TableCell>{b.receivedAt}</TableCell>
                        <TableCell>{b.note}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="Xem">
                              <IconButton size="small" onClick={() => { setEditingBom(b); setBomDialogOpen(true); }}>
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                              <IconButton size="small" onClick={() => deleteBom(b.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}

            {tab === 1 && (
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">Danh sách kế hoạch sản xuất</Typography>
                  <Button startIcon={<AddIcon />} onClick={() => { setEditingPlan(null); setPlanDialogOpen(true); }}>
                    Tạo kế hoạch
                  </Button>
                </Stack>

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã đơn</TableCell>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell>Số lượng</TableCell>
                      <TableCell>Thời gian</TableCell>
                      <TableCell>Tiến độ</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plans.map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell>{p.orderCode}</TableCell>
                        <TableCell>{p.productName}</TableCell>
                        <TableCell>{p.quantity} {p.unit}</TableCell>
                        <TableCell>{p.plannedStart} → {p.plannedEnd}</TableCell>
                        <TableCell sx={{ minWidth: 140 }}>
                          <LinearProgress variant="determinate" value={planProgress(p.id)} />
                          <Typography variant="caption">{planProgress(p.id)}%</Typography>
                        </TableCell>
                        <TableCell><Chip label={p.status} color={statusColor(p.status)} size="small" /></TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="Sửa">
                              <IconButton size="small" onClick={() => { setEditingPlan(p); setPlanDialogOpen(true); }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                              <IconButton size="small" onClick={() => deletePlan(p.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}

            {tab === 2 && (
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">Lệnh sản xuất (Work Orders)</Typography>
                  <Button startIcon={<AddIcon />} onClick={() => { setEditingWo(null); setWoDialogOpen(true); }}>
                    Tạo Work Order
                  </Button>
                </Stack>

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên</TableCell>
                      <TableCell>Máy</TableCell>
                      <TableCell>Thời gian</TableCell>
                      <TableCell>Tiến độ</TableCell>
                      <TableCell>Thuộc kế hoạch</TableCell>
                      <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wos.map((w) => (
                      <TableRow key={w.id} hover>
                        <TableCell>{w.name}</TableCell>
                        <TableCell>{w.machine}</TableCell>
                        <TableCell>{w.startDate} → {w.endDate}</TableCell>
                        <TableCell>
                          <LinearProgress variant="determinate" value={w.progress} />
                          <Typography variant="caption">{w.progress}%</Typography>
                        </TableCell>
                        <TableCell>{w.planId ? plans.find(p => p.id === w.planId)?.orderCode : '-'}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Tooltip title="Sửa">
                              <IconButton size="small" onClick={() => { setEditingWo(w); setWoDialogOpen(true); }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
                              <IconButton size="small" onClick={() => deleteWo(w.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">Tổng quan nhanh</Typography>
            <Divider sx={{ my: 1 }} />
            <Stack spacing={1}>
              <Typography variant="body2">Tổng BOM: {boms.length}</Typography>
              <Typography variant="body2">Tổng kế hoạch: {plans.length}</Typography>
              <Typography variant="body2">Tổng WO: {wos.length}</Typography>
            </Stack>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Hành động nhanh</Typography>
            <Stack spacing={1} mt={1}>
              <Button variant="outlined" onClick={() => alert('Gửi báo cáo demo')}>Gửi báo cáo</Button>
              <Button variant="outlined" onClick={() => alert('Thông báo QC demo')}>Thông báo QC</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialogs: BOM */}
      <BomDialog
        open={bomDialogOpen}
        initial={editingBom}
        onClose={() => setBomDialogOpen(false)}
        onSave={(b) => createOrUpdateBom(b)}
      />

      {/* Dialogs: Plan */}
      <PlanDialog
        open={planDialogOpen}
        initial={editingPlan}
        onClose={() => setPlanDialogOpen(false)}
        onSave={(p) => createOrUpdatePlan(p)}
      />

      {/* Dialogs: WO */}
      <WoDialog
        open={woDialogOpen}
        initial={editingWo}
        plans={plans}
        onClose={() => setWoDialogOpen(false)}
        onSave={(w) => createOrUpdateWo(w)}
      />
    </Box>
  );
}

// ---------- Inline Dialog Components (small) ----------
function BomDialog({ open, initial, onClose, onSave }: { open: boolean; initial: BOMItem | null; onClose: () => void; onSave: (b: BOMItem) => void; }) {
  const empty: BOMItem = { id: `bom-${Date.now()}`, orderCode: "", files: [], receivedAt: new Date().toISOString().slice(0, 10) };
  const [form, setForm] = useState<BOMItem>(initial ?? empty);

  React.useEffect(() => setForm(initial ?? empty), [initial, open]);

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle>{initial ? 'Chỉnh sửa BOM' : 'Thêm BOM'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Mã đơn" size="small" value={form.orderCode} onChange={(e) => setForm({ ...form, orderCode: e.target.value })} />
          <TextField label="Ghi chú" size="small" value={form.note ?? ''} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          <TextField label="Ngày nhận (YYYY-MM-DD)" size="small" value={form.receivedAt} onChange={(e) => setForm({ ...form, receivedAt: e.target.value })} />
          <Typography variant="caption">Demo: file upload omitted — use files array to store name/url</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={() => onSave(form)}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}

function PlanDialog({ open, initial, onClose, onSave }: { open: boolean; initial: ProductionPlan | null; onClose: () => void; onSave: (p: ProductionPlan) => void; }) {
  const empty: ProductionPlan = {
    id: `plan-${Date.now()}`,
    orderCode: "",
    productName: "",
    quantity: 0,
    unit: "pcs",
    plannedStart: new Date().toISOString().slice(0, 10),
    plannedEnd: new Date().toISOString().slice(0, 10),
    status: "Draft",
  };
  const [form, setForm] = useState<ProductionPlan>(initial ?? empty);
  React.useEffect(() => setForm(initial ?? empty), [initial, open]);

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={onClose}>
      <DialogTitle>{initial ? 'Sửa kế hoạch' : 'Tạo kế hoạch'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}><TextField label="Mã đơn" size="small" fullWidth value={form.orderCode} onChange={(e) => setForm({ ...form, orderCode: e.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Sản phẩm" size="small" fullWidth value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} /></Grid>
          <Grid item xs={6} sm={3}><TextField label="Số lượng" type="number" size="small" fullWidth value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} /></Grid>
          <Grid item xs={6} sm={3}><TextField label="Đơn vị" size="small" fullWidth value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></Grid>
          <Grid item xs={6} sm={3}><TextField label="Bắt đầu" size="small" fullWidth value={form.plannedStart} onChange={(e) => setForm({ ...form, plannedStart: e.target.value })} /></Grid>
          <Grid item xs={6} sm={3}><TextField label="Kết thúc" size="small" fullWidth value={form.plannedEnd} onChange={(e) => setForm({ ...form, plannedEnd: e.target.value })} /></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Trạng thái</InputLabel>
              <Select label="Trạng thái" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PlanStatus })}>
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Planned">Planned</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Blocked">Blocked</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}><TextField label="Ghi chú" fullWidth multiline rows={3} size="small" value={form.note ?? ''} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={() => onSave(form)}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}

function WoDialog({ open, initial, onClose, onSave, plans }: { open: boolean; initial: WorkOrder | null; onClose: () => void; onSave: (w: WorkOrder) => void; plans: ProductionPlan[]; }) {
  const empty: WorkOrder = { id: `wo-${Date.now()}`, name: "", machine: "", startDate: new Date().toISOString().slice(0, 10), endDate: new Date().toISOString().slice(0, 10), progress: 0 };
  const [form, setForm] = useState<WorkOrder>(initial ?? empty);
  React.useEffect(() => setForm(initial ?? empty), [initial, open]);

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle>{initial ? 'Sửa WO' : 'Tạo WO'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Tên" size="small" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Máy" size="small" value={form.machine} onChange={(e) => setForm({ ...form, machine: e.target.value })} />
          <TextField label="Bắt đầu" size="small" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <TextField label="Kết thúc" size="small" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          <TextField label="Tiến độ (%)" type="number" size="small" value={form.progress} onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })} />

          <FormControl size="small">
            <InputLabel>Thuộc kế hoạch</InputLabel>
            <Select label="Thuộc kế hoạch" value={form.planId ?? ''} onChange={(e) => setForm({ ...form, planId: e.target.value || undefined })}>
              <MenuItem value="">-- Chọn --</MenuItem>
              {plans.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.orderCode} — {p.productName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={() => onSave(form)}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
