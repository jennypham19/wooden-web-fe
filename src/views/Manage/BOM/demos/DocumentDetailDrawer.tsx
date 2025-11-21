// DocumentDetailDrawer.tsx
import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FilePreviewDialog from "./FilePreviewDialog";
import { TechnicalDocument, TechFile } from "./TechnicalDocsPage";

type Props = {
  open: boolean;
  document: TechnicalDocument | null;
  onClose: () => void;
  onUpdate?: (doc: TechnicalDocument) => void;
};

export default function DocumentDetailDrawer({ open, document, onClose, onUpdate }: Props) {
  const [previewFile, setPreviewFile] = useState<TechFile | null>(null);

  if (!document) return null;

  const handleDeleteFile = (fileId: string) => {
    // placeholder: call API to delete file, then update parent via onUpdate
    const newFiles = document.files.filter(f => f.id !== fileId);
    const updatedDoc = { ...document, files: newFiles };
    onUpdate?.(updatedDoc);
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box width={640} p={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Chi tiết hồ sơ</Typography>
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
          </Stack>

          <Stack spacing={1} mb={2}>
            <Typography variant="subtitle1" fontWeight={600}>{document.title}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2">{document.product_name ? `${document.product_name} (${document.product_code})` : ""}</Typography>
              <Chip label={document.version} size="small" />
              <Chip label={document.status} color={document.status === "approved" ? "success" : "warning"} size="small" />
            </Stack>
            <Typography variant="caption">Cập nhật: {document.updated_at} • Tạo bởi: {document.created_by}</Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2">Danh sách file</Typography>
            <Button startIcon={<CloudUploadIcon />} size="small" variant="outlined">Tải lên file mới</Button>
          </Stack>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tên file</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Phiên bản</TableCell>
                <TableCell>Người upload</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {document.files.map(file => (
                <TableRow key={file.id} hover>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{file.file_type}</TableCell>
                  <TableCell>{file.version || "-"}</TableCell>
                  <TableCell>{file.uploaded_by}</TableCell>
                  <TableCell>{file.uploaded_at}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => setPreviewFile(file)}><VisibilityIcon /></IconButton>
                    <IconButton size="small" onClick={() => {
                      // placeholder: download file
                      if (file.file_url) window.open(file.file_url, "_blank");
                      else alert("File chưa có URL (mock)");
                    }}>
                      {/* download */}
                      <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24"><path fill="currentColor" d="M5,20H19V18H5V20M12,3L7,8H10V14H14V8H17L12,3Z" /></svg>
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteFile(file.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {document.files.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">Chưa có file nào</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button variant="outlined">Chỉnh sửa</Button>
            <Button variant="contained" color="primary">Duyệt hồ sơ</Button>
          </Stack>
        </Box>
      </Drawer>

      <FilePreviewDialog
        file={previewFile}
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </>
  );
}
