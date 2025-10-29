import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export default function ProductionSupport() {
  return (
    <Box>
      <Typography variant='h5' fontWeight={600} mb={3}>
        Hỗ trợ sản xuất
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã yêu cầu</TableCell>
              <TableCell>Mô tả lỗi</TableCell>
              <TableCell>Người báo</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Bản vẽ đính kèm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ERR-01</TableCell>
              <TableCell>Sai kích thước hộc kéo</TableCell>
              <TableCell>Nguyễn Thị H</TableCell>
              <TableCell>
                <Chip label='Đang xử lý' color='warning' />
              </TableCell>
              <TableCell>
                <Button size='small'>Xem</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
