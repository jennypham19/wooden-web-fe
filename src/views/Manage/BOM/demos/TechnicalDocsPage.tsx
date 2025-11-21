// TechnicalDocsPage.tsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import DocumentDetailDrawer from "./DocumentDetailDrawer";
import UploadDocumentDialog from "./UploadDocumentDialog";

export type TechFile = {
  id: string;
  name: string;
  file_url?: string; // url from server
  file_type: "pdf" | "image" | "dwg" | "skp" | "docx" | "other";
  version?: string;
  note?: string;
  uploaded_by: string;
  uploaded_at: string;
  size?: number;
};

export type TechnicalDocument = {
  id: string;
  title: string;
  product_code?: string;
  product_name?: string;
  version?: string;
  status: "draft" | "pending" | "approved" | "rejected";
  created_by: string;
  updated_at: string;
  files: TechFile[];
};

// MOCK DATA (replace by API)
const MOCK_DOCS: TechnicalDocument[] = [
  {
    id: "TD-001",
    title: "Hồ sơ kỹ thuật - Tủ bếp gỗ sồi",
    product_code: "SP-001",
    product_name: "Tủ bếp gỗ sồi",
    version: "V2",
    status: "approved",
    created_by: "Nguyễn Văn A",
    updated_at: "2025-10-26",
    files: [
      {
        id: "F-1",
        name: "Sunshine_V2.pdf",
        file_url: "", // if hosted, put URL
        file_type: "pdf",
        version: "V2",
        uploaded_by: "Minh",
        uploaded_at: "2025-10-25",
      },
      {
        id: "F-2",
        name: "Panel_Layouts.png",
        file_type: "image",
        uploaded_by: "Minh",
        uploaded_at: "2025-10-25",
      },
    ],
  },
  {
    id: "TD-002",
    title: "Hồ sơ kỹ thuật - Bàn làm việc MFC",
    product_code: "SP-002",
    product_name: "Bàn làm việc MFC",
    version: "V1",
    status: "draft",
    created_by: "Trần Văn B",
    updated_at: "2025-10-22",
    files: [],
  },
];

export default function TechnicalDocsPage() {
  const [docs, setDocs] = useState<TechnicalDocument[]>(MOCK_DOCS);
  const [query, setQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<TechnicalDocument | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const filtered = useMemo(() =>
    docs.filter(d =>
      (d.title + d.product_name + d.product_code).toLowerCase().includes(query.toLowerCase())
    ), [docs, query]);

  const handleOpenDetail = (doc: TechnicalDocument) => {
    setSelectedDoc(doc);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedDoc(null);
  };

  const handleAddDocument = (newDoc: TechnicalDocument) => {
    setDocs(prev => [newDoc, ...prev]);
    setOpenUpload(false);
  };

  const statusColor = (s: TechnicalDocument["status"]) => {
    switch (s) {
      case "approved": return "success";
      case "pending": return "warning";
      case "rejected": return "error";
      default: return "default";
    }
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>Hồ sơ kỹ thuật</Typography>
        <Stack direction="row" spacing={1}>
          <Button startIcon={<UploadFileIcon />} variant="outlined" onClick={() => setOpenUpload(true)}>
            Tải lên tài liệu
          </Button>
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenUpload(true)}>
            + Tạo hồ sơ mới
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Tìm theo tên hồ sơ / mã sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
            }}
            sx={{ flex: 1 }}
          />
        </Stack>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên hồ sơ</TableCell>
              <TableCell>Sản phẩm / BOM</TableCell>
              <TableCell>Phiên bản</TableCell>
              <TableCell>Số file</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Người tạo</TableCell>
              <TableCell>Ngày cập nhật</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map(doc => (
              <TableRow key={doc.id} hover>
                <TableCell>{doc.title}</TableCell>
                <TableCell>{doc.product_name ? `${doc.product_name} (${doc.product_code})` : "-"}</TableCell>
                <TableCell>{doc.version}</TableCell>
                <TableCell>{doc.files.length}</TableCell>
                <TableCell><Chip label={doc.status} color={statusColor(doc.status)} size="small" /></TableCell>
                <TableCell>{doc.created_by}</TableCell>
                <TableCell>{doc.updated_at}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenDetail(doc)} size="small" color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="small" color="inherit">
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <DocumentDetailDrawer
        open={openDetail}
        document={selectedDoc}
        onClose={handleCloseDetail}
        onUpdate={(updated) => {
          setDocs(prev => prev.map(d => d.id === updated.id ? updated : d));
        }}
      />

      <UploadDocumentDialog
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onCreate={(created) => handleAddDocument(created)}
      />
    </Box>
  );
}
