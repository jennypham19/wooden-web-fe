import { CloudUpload, Download } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const TechDocsPage = () => {
    return(
        <Box>
          <Stack direction="row" spacing={2} mb={2}>
            <Button variant="contained" startIcon={<CloudUpload />}>
              Tải lên tài liệu
            </Button>
          </Stack>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Loại tài liệu</TableCell>
                <TableCell>Tên file</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Người upload</TableCell>
                <TableCell>Ngày cập nhật</TableCell>
                <TableCell align="center">Tải về</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>Hướng dẫn lắp ráp</TableCell>
                <TableCell>huong_dan_lap_rap.pdf</TableCell>
                <TableCell>Chi tiết lắp ráp sản phẩm tủ bếp</TableCell>
                <TableCell>Nguyễn Văn C</TableCell>
                <TableCell>2025-10-25</TableCell>
                <TableCell align="center">
                  <IconButton color="primary">
                    <Download />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
    )
}

export default TechDocsPage;