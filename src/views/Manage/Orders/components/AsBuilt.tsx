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
  Typography,
} from '@mui/material';

export default function AsBuilt() {
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
        <Typography variant='h5' fontWeight={600}>
          Bản vẽ hoàn công
        </Typography>
        <Button variant='contained'>Tải lên bản vẽ</Button>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Ngày hoàn công</TableCell>
              <TableCell>Người xác nhận</TableCell>
              <TableCell>Xem bản vẽ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>SP003</TableCell>
              <TableCell>Bàn học gỗ óc chó</TableCell>
              <TableCell>26/10/2025</TableCell>
              <TableCell>Phạm Dũng</TableCell>
              <TableCell>
                <Button size='small'>Xem PDF</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
