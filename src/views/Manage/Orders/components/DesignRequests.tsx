import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

export default function DesignRequests() {
  return (
    <Box>
      <Typography variant='h5' fontWeight={600} mb={3}>
        Danh sách yêu cầu thiết kế
      </Typography>

      <Stack direction='row' spacing={2} mb={2}>
        <TextField size='small' label='Tìm kiếm sản phẩm' />
        <TextField size='small' label='Trạng thái' select SelectProps={{ native: true }}>
          <option>Tất cả</option>
          <option>Mới</option>
          <option>Đang thiết kế</option>
          <option>Đã duyệt</option>
        </TextField>
        <Button variant='contained'>Tìm kiếm</Button>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã yêu cầu</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Người phụ trách</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hạn hoàn thành</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3].map((id) => (
              <TableRow key={id} hover>
                <TableCell>REQ-00{id}</TableCell>
                <TableCell>Bàn làm việc</TableCell>
                <TableCell>Nguyễn Văn A</TableCell>
                <TableCell>Đang thiết kế</TableCell>
                <TableCell>30/10/2025</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
