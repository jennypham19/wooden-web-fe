import { Box, Chip, Drawer, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";


interface TechnicalDrawing {
  id: string;
  project: string;
  designer: string;
  version: string;
  status: string;
  updatedAt: string;
}

const DRAWINGS: TechnicalDrawing[] = [
  { id: "DWG-001", project: "Căn hộ Sunshine", designer: "Minh", version: "V1", status: "Chờ duyệt", updatedAt: "2025-10-25" },
  { id: "DWG-002", project: "Văn phòng Funi", designer: "Hoa", version: "V2", status: "Đã duyệt", updatedAt: "2025-10-27" },
];

const DesignTechnicalDrawing = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected, setSelected] = useState<any>(null);

    return(
        <Box>
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
    )
}

export default DesignTechnicalDrawing;