// FULL React + MUI v5 + React Router v6
// Issue Management UI – Desktop-first

import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

// ========== TYPES ==========
export type Role = 'WORKER' | 'MANAGER' | 'WAREHOUSE' | 'TECH' | 'ADMIN';

export interface Issue {
  id: string;
  orderCode: string;
  step: string;
  type: 'DEFECT' | 'MATERIAL_SHORTAGE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'SUBMITTED' | 'CONFIRMED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
}

// ========== MOCK AUTH ==========
const useAuth = () => ({ role: 'MANAGER' as Role });

// ========== ROLE GUARD ==========
const RoleGuard = ({ allow }: { allow: Role[] }) => {
  const { role } = useAuth();
  if (!allow.includes(role)) return <Navigate to="/" replace />;
  return <Outlet />;
};

// ========== LAYOUT ==========
const drawerWidth = 240;


// ========== STATUS CHIP ==========
import { Chip } from '@mui/material';
const IssueStatusChip = ({ status }: { status: Issue['status'] }) => {
  const colorMap: any = {
    SUBMITTED: 'default',
    CONFIRMED: 'info',
    IN_PROGRESS: 'warning',
    RESOLVED: 'success',
    REJECTED: 'error',
  };
  return <Chip size="small" label={status} color={colorMap[status]} />;
};

// ========== PRODUCTION STEP PAGE (WITH REPORT ACTION) ==========
import { Fab, Tooltip } from '@mui/material';

const ProductionStepPage = () => {
  const hasBlockingIssue = true; // mock trạng thái công đoạn đang bị block

  return (
    <Box>
      <Typography variant="h6">Đơn hàng ORD001 – Công đoạn: Cắt gỗ</Typography>

      <Box mt={2} mb={2}>
        <Tooltip
          title={hasBlockingIssue ? 'Công đoạn đang có báo cáo đang xử lý' : ''}
        >
          <span>
            <Button
              variant="contained"
              color="error"
              startIcon={<ReportProblemIcon />}
            //   disabled={hasBlockingIssue}
            >
              Báo lỗi / Thiếu vật tư
            </Button>
          </span>
        </Tooltip>
      </Box>

      <Typography color="text.secondary">
        Nội dung thao tác sản xuất tại công đoạn...
      </Typography>

      {/* FAB dùng chung toàn hệ thống */}
      <Fab
        color="error"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <ReportProblemIcon />
      </Fab>
    </Box>
  );
};

// ========== ISSUE LIST PAGE ==========
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Button,
} from '@mui/material';

const IssueListPage = () => {
  const issues: Issue[] = [
    {
      id: '1',
      orderCode: 'ORD001',
      step: 'Cắt gỗ',
      type: 'MATERIAL_SHORTAGE',
      severity: 'HIGH',
      status: 'IN_PROGRESS',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Danh sách báo cáo
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="outlined">Trạng thái</Button>
        <Button variant="outlined">Loại</Button>
        <Button variant="outlined">Mức độ</Button>
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Đơn hàng</TableCell>
            <TableCell>Công đoạn</TableCell>
            <TableCell>Loại</TableCell>
            <TableCell>Mức độ</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((i) => (
            <TableRow key={i.id} hover>
              <TableCell>{i.orderCode}</TableCell>
              <TableCell>{i.step}</TableCell>
              <TableCell>{i.type}</TableCell>
              <TableCell>{i.severity}</TableCell>
              <TableCell>
                <IssueStatusChip status={i.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

// ========== ISSUE CREATE (WORKER) ==========
import { Card, CardContent, TextField, MenuItem } from '@mui/material';

const IssueCreatePage = () => (
  <Card sx={{ maxWidth: 600 }}>
    <CardContent>
      <Typography variant="h6">Báo lỗi / Thiếu vật tư</Typography>
      <Stack spacing={2} mt={2}>
        <TextField select label="Đơn hàng">
          <MenuItem value="ORD001">ORD001</MenuItem>
        </TextField>
        <TextField select label="Công đoạn">
          <MenuItem value="CUT">Cắt gỗ</MenuItem>
        </TextField>
        <TextField select label="Loại báo cáo">
          <MenuItem value="DEFECT">Báo lỗi</MenuItem>
          <MenuItem value="MATERIAL_SHORTAGE">Thiếu vật tư</MenuItem>
        </TextField>
        <TextField label="Mô tả" multiline minRows={3} />
        <Button variant="contained">Gửi báo cáo</Button>
      </Stack>
    </CardContent>
  </Card>
);

// ========== APP ==========
export default function App() {
  return (
    <Box>
        <ProductionStepPage/>
        <IssueListPage/>
        <IssueCreatePage/>
    </Box>
  );
}
