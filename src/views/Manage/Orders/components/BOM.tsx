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

export default function BOM() {
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
        <Typography variant='h5' fontWeight={600}>
          BOM & Hồ sơ kỹ thuật
        </Typography>
        <Button variant='contained'>+ Tạo mới BOM</Button>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Phiên bản</TableCell>
              <TableCell>Người tạo</TableCell>
              <TableCell>Ngày tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>SP001</TableCell>
              <TableCell>Tủ quần áo gỗ sồi</TableCell>
              <TableCell>v1.2</TableCell>
              <TableCell>Trần Minh</TableCell>
              <TableCell>25/10/2025</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
