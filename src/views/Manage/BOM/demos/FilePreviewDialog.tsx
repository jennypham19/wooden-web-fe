// FilePreviewDialog.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TechFile } from "./TechnicalDocsPage";

type Props = {
  file: TechFile | null;
  open: boolean;
  onClose: () => void;
};

export default function FilePreviewDialog({ file, open, onClose }: Props) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    // If file.file_url exists (hosted), use it. If file is a local File object in future, createObjectURL.
    if (!file) {
      setObjectUrl(null);
      return;
    }
    if (file.file_url) setObjectUrl(file.file_url);
    else {
      // For mock: no file_url -> use placeholder or null
      setObjectUrl(null);
    }
    return () => {
      // revoke if created
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file]); // eslint-disable-line

  if (!file) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>{file.name}</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ minHeight: 480 }}>
        {/* PDF */}
        {file.file_type === "pdf" && (
          objectUrl ? (
            <iframe
              title={file.name}
              src={objectUrl}
              style={{ width: "100%", height: 600, border: "none" }}
            />
          ) : (
            <Typography color="text.secondary">Không có file URL trong mock. Khi tích hợp backend, truyền file_url để xem PDF.</Typography>
          )
        )}

        {/* Image */}
        {file.file_type === "image" && (
          objectUrl ? (
            <img src={objectUrl} alt={file.name} style={{ width: "100%", maxHeight: 700, objectFit: "contain" }} />
          ) : (
            <Typography color="text.secondary">Ảnh demo không có URL. Thêm file_url để hiển thị.</Typography>
          )
        )}

        {/* DWG / SKP / OTHER */}
        {["dwg", "skp", "other", "docx"].includes(file.file_type) && (
          <Stack spacing={2}>
            <Typography>File loại <strong>{file.file_type}</strong> không thể preview trực tiếp trong browser.</Typography>
            <Typography color="text.secondary">Gợi ý: dùng thumbnail (PNG/PDF) lưu kèm, hoặc tích hợp viewer bên thứ 3 (Autodesk Forge / third-party).</Typography>
            <Button variant="contained" sx={{ mt: 1 }} onClick={() => {
              if (file.file_url) window.open(file.file_url, "_blank");
              else alert("Mock: file chưa có URL");
            }}>Mở file / Tải về</Button>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
