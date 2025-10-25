import { useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, TextField, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

// ======================= 1. DASHBOARD =======================
export function SalesDashboard() {
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>Dashboard - Tổng quan kinh doanh</Typography>
      <Grid container spacing={2}>
        {['Đơn hàng hôm nay', 'Doanh thu tháng', 'Khách hàng mới', 'Đơn hàng chờ xử lý'].map((label, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">{label}</Typography>
                <Typography variant="h6" fontWeight={600}>123</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ======================= 2. TẠO ĐƠN HÀNG =======================
export function CreateOrderPage() {
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>Tạo đơn hàng mới</Typography>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Tên khách hàng" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Số điện thoại" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField fullWidth multiline rows={2} label="Địa chỉ giao hàng" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Ghi chú" multiline rows={3} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">Tạo đơn</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

// ======================= 3. DANH SÁCH ĐƠN HÀNG =======================
export function OrderListPage() {
  const orders = [
    { id: 'DH001', customer: 'Nguyễn Văn A', status: 'Đang xử lý', total: '3.500.000đ' },
    { id: 'DH002', customer: 'Trần Thị B', status: 'Hoàn thành', total: '5.200.000đ' }
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>Danh sách đơn hàng</Typography>
      <Paper sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Tổng tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id} hover>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell>{o.status}</TableCell>
                <TableCell>{o.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

// ======================= 4. KHÁCH HÀNG =======================
export function CustomerPage() {
  const customers = [
    { id: 1, name: 'Nguyễn Văn A', phone: '0909123456', totalOrders: 5 },
    { id: 2, name: 'Trần Thị B', phone: '0987654321', totalOrders: 2 }
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>Khách hàng</Typography>
      <Paper sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Số đơn hàng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{c.totalOrders}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

// ======================= 5. BÁO CÁO DOANH SỐ =======================
export function SalesReportPage() {
  useEffect(() => {
    // call API for report data
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2}>Báo cáo doanh số</Typography>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Typography>Biểu đồ doanh thu tháng, thống kê đơn hàng, top khách hàng,...</Typography>
      </Card>
    </Box>
  );
}
