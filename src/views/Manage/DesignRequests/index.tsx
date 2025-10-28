import {
  Box, Button, Chip, Drawer, Grid, Paper, Select, MenuItem, Stack,
  Tab, Tabs, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Page from "@/components/Page";

interface DesignRequest {
  id: string;
  project: string;
  customer: string;
  designer: string;
  status: string;
  deadline: string;
}

interface TechnicalDrawing {
  id: string;
  project: string;
  designer: string;
  version: string;
  status: string;
  updatedAt: string;
}

const REQUESTS: DesignRequest[] = [
  { id: "REQ-001", project: "Căn hộ Sunshine", customer: "Nguyễn Văn A", designer: "Minh", status: "Đang thiết kế", deadline: "2025-11-10" },
];

const DRAWINGS: TechnicalDrawing[] = [
  { id: "DWG-001", project: "Căn hộ Sunshine", designer: "Minh", version: "V1", status: "Chờ duyệt", updatedAt: "2025-10-25" },
  { id: "DWG-002", project: "Văn phòng Funi", designer: "Hoa", version: "V2", status: "Đã duyệt", updatedAt: "2025-10-27" },
];

const DesignRequests = () => {
  const [tab, setTab] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected, setSelected] = useState<any>(null);
    return (
        <Page title="Yêu cầu thiết kế">
    <Box p={3}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={600}>
          Yêu cầu & Thiết kế bản vẽ kỹ thuật
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Tạo mới</Button>
      </Stack>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Danh sách yêu cầu thiết kế" />
        <Tab label="Thiết kế bản vẽ kỹ thuật" />
      </Tabs>

      {/* Tab 1: Danh sách yêu cầu */}
      {tab === 0 && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã yêu cầu</TableCell>
                <TableCell>Tên dự án</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Người phụ trách</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hạn nộp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {REQUESTS.map((r) => (
                <TableRow key={r.id} hover onClick={() => { setSelected(r); setOpenDrawer(true); }}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.project}</TableCell>
                  <TableCell>{r.customer}</TableCell>
                  <TableCell>{r.designer}</TableCell>
                  <TableCell>
                    <Chip
                      label={r.status}
                      color={r.status === "Hoàn thành" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{r.deadline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Tab 2: Thiết kế bản vẽ kỹ thuật */}
      {tab === 1 && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã bản vẽ</TableCell>
                <TableCell>Dự án</TableCell>
                <TableCell>Người thiết kế</TableCell>
                <TableCell>Phiên bản</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Cập nhật</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DRAWINGS.map((d) => (
                <TableRow key={d.id} hover onClick={() => { setSelected(d); setOpenDrawer(true); }}>
                  <TableCell>{d.id}</TableCell>
                  <TableCell>{d.project}</TableCell>
                  <TableCell>{d.designer}</TableCell>
                  <TableCell>{d.version}</TableCell>
                  <TableCell>
                    <Chip
                      label={d.status}
                      color={d.status === "Đã duyệt" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{d.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Drawer chi tiết */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box width={480} p={3}>
          <Typography variant="h6" mb={2}>Chi tiết</Typography>
          <Stack spacing={2}>
            {Object.entries(selected || {}).map(([k, v]) => (
              <TextField key={k} label={k.toUpperCase()} value={String(v)} fullWidth />
            ))}
          </Stack>
        </Box>
      </Drawer>
    </Box>
        </Page>
    )
}

export default DesignRequests;