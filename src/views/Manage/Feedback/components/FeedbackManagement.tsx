import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { FeedbackDetailDialog } from "./FeedbackDetailDialog";

interface FeedbackRow {
  id: string;
  orderCode: string;
  productName: string;
  rating: number;
  staffName: string;
  createdAt: string;
  status: "draft" | "confirmed";
}

const mockData: FeedbackRow[] = [
  {
    id: "1",
    orderCode: "ORD-001",
    productName: "Tủ gỗ sồi",
    rating: 5,
    staffName: "Nguyễn Văn A",
    createdAt: "08/01/2026",
    status: "confirmed",
  },
  {
    id: "2",
    orderCode: "ORD-002",
    productName: "Bàn gỗ óc chó",
    rating: 3,
    staffName: "Trần Thị B",
    createdAt: "07/01/2026",
    status: "draft",
  },
];

export default function FeedbackManagement() {
  const [filters, setFilters] = useState({
    orderCode: "",
    staffName: "",
    rating: "",
    status: "",
  });

  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} m={2}>
        Quản lý phản hồi khách hàng
      </Typography>

      {/* FILTER */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Mã đơn hàng"
            value={filters.orderCode}
            onChange={(e) =>
              setFilters({ ...filters, orderCode: e.target.value })
            }
            size="small"
          />

          <TextField
            label="Nhân viên nhập"
            value={filters.staffName}
            onChange={(e) =>
              setFilters({ ...filters, staffName: e.target.value })
            }
            size="small"
          />

          <TextField
            select
            label="Số sao"
            value={filters.rating}
            size="small"
          >
            <MenuItem value="">Tất cả</MenuItem>
            {[1, 2, 3, 4, 5].map((r) => (
              <MenuItem key={r} value={r}>
                {r} sao
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Trạng thái"
            value={filters.status}
            size="small"
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="draft">Nháp</MenuItem>
            <MenuItem value="confirmed">Đã xác nhận</MenuItem>
          </TextField>

          <Button variant="contained">Lọc</Button>
        </Stack>
      </Paper>

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Đánh giá</TableCell>
              <TableCell>Nhân viên nhập</TableCell>
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Chi tiết</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {mockData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.orderCode}</TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>
                  <Rating value={row.rating} readOnly size="small" />
                </TableCell>
                <TableCell>{row.staffName}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>
                  <Chip
                    label={
                      row.status === "confirmed"
                        ? "Đã xác nhận"
                        : "Nháp"
                    }
                    color={
                      row.status === "confirmed"
                        ? "success"
                        : "warning"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => { setOpen(true)}}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <FeedbackDetailDialog
            open={open}
            onClose={() => { setOpen(false) }}
        />
      )}
    </Box>
  );
}
