// UploadDocumentDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TechnicalDocument, TechFile } from "./TechnicalDocsPage";
import { v4 as uuidv4 } from "uuid";

// Props
type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (doc: TechnicalDocument) => void;
};

export default function UploadDocumentDialog({ open, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [version, setVersion] = useState("V1");
  const [status, setStatus] = useState<"draft" | "pending" | "approved">("draft");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    e.currentTarget.value = "";
  };

  const removeLocalFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    // In real app: upload files -> get file URLs -> create technical document via API
    // Here: create mock TechnicalDocument with TechFile entries (no file_url)
    const docId = `TD-${Math.floor(Math.random() * 10000)}`;
    const techFiles: TechFile[] = files.map(f => ({
      id: uuidv4(),
      name: f.name,
      file_type: f.type.startsWith("image/") ? "image" :
                 f.type === "application/pdf" ? "pdf" : "other",
      uploaded_at: new Date().toISOString().slice(0,10),
      uploaded_by: "Bạn",
    }));
    const newDoc: TechnicalDocument = {
      id: docId,
      title: title || `Hồ sơ ${docId}`,
      product_code: productCode || undefined,
      product_name: productName || undefined,
      version,
      status,
      created_by: "Bạn",
      updated_at: new Date().toISOString().slice(0,10),
      files: techFiles,
    };
    onCreate(newDoc);
    // reset
    setTitle(""); setProductCode(""); setProductName(""); setVersion("V1"); setStatus("draft"); setFiles([]);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <span>Tạo hồ sơ kỹ thuật mới</span>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField label="Tiêu đề hồ sơ" fullWidth value={title} onChange={(e)=>setTitle(e.target.value)} />
          <Stack direction="column" spacing={2}>
            <TextField label="Mã sản phẩm / BOM" value={productCode} onChange={(e)=>setProductCode(e.target.value)} />
            <TextField label="Tên sản phẩm" value={productName} onChange={(e)=>setProductName(e.target.value)} />
            <TextField select label="Phiên bản" value={version} onChange={(e)=>setVersion(e.target.value)} sx={{ minWidth: 120 }}>
              <MenuItem value="V1">V1</MenuItem>
              <MenuItem value="V2">V2</MenuItem>
              <MenuItem value="V3">V3</MenuItem>
            </TextField>
            <TextField select label="Trạng thái" value={status} onChange={(e) => setStatus(e.target.value as any)} sx={{ minWidth: 160 }}>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="pending">Chờ duyệt</MenuItem>
              <MenuItem value="approved">Đã duyệt</MenuItem>
            </TextField>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2">Upload file (PDF, DWG, PNG, JPG, DOCX...)</Typography>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ border: "1px dashed #ccc", padding: 8, borderRadius: 6 }}
            />
            <List dense>
              {files.map((f, i) => (
                <ListItem key={i}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => removeLocalFile(i)} title="Xoá">
                      <CloseIcon />
                    </IconButton>
                  }>
                  <ListItemText primary={f.name} secondary={`${Math.round(f.size/1024)} KB`} />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleCreate}>Tạo hồ sơ</Button>
      </DialogActions>
    </Dialog>
  );
}
