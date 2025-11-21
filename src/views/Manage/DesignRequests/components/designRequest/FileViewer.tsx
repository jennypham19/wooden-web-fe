import { useCallback, useEffect, useState } from "react";
import mammoth from "mammoth";
import { Box, Button } from "@mui/material";
import FullScreenDialog from "@/components/FullScreenDialog";
import { COLORS } from "@/constants/colors";
import { Download } from "@mui/icons-material";


interface PreviewFileProps {
  file: File | null;
  open: boolean,
  onClose: () => void;
}

export default function PreviewFile({ file, open, onClose }: PreviewFileProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [docxHtml, setDocxHtml] = useState<string>("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      setDocxHtml("");
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();

    // IMAGE / VIDEO / PDF → createObjectURL
    if (
      ["jpg", "jpeg", "png", "gif", "webp", "mp4", "webm", "ogg", "pdf"].includes(
        ext!
      )
    ) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setDocxHtml("");
      return () => URL.revokeObjectURL(url);
    }

    // DOCX → convert offline
    if (ext === "docx") {
      file.arrayBuffer().then((arrayBuffer) => {
        mammoth.convertToHtml({ arrayBuffer }).then((result) => {
          setDocxHtml(result.value);
          setPreviewUrl("");
        });
      });
    }
  }, [file]);

  if (!file) return null;

  const ext = file.name.split(".").pop()?.toLowerCase();

  // --- IMAGE ---
  const RenderImage = () => {
    return(
      <img
          src={previewUrl}
          style={{ width: "100%", maxHeight: 600, objectFit: "contain" }}
      />
    )
  }

  // --- VIDEO ---
  const RenderVideo = () => (
    <video src={previewUrl} controls style={{ width: "100%" }} />
  )

  // --- PDF ---
  const RenderPdf = () => (
        <iframe
          title={file.name}
          src={previewUrl}
          style={{
            width: "100%",
            height: '100%',
            borderRadius: 4,
          }}
          loading="eager"
        />
  )

  // --- DOCX ---
  const RenderDoc = () => (
      <Box
        sx={{
          marginTop: 2,
          padding: 2,
          border: "1px solid #ddd",
          borderRadius: 2,
          height: '100%',
          overflow: "auto",
          backgroundColor: "#fff",
        }}
        dangerouslySetInnerHTML={{ __html: docxHtml }}
      />
  )

  // return <Box>Định dạng file này không được hỗ trợ</Box>;

  const handleDownload = useCallback(() => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  }, [file]);

  return (
    <FullScreenDialog
      open={open}
      onClose={onClose}
      title={file.name}
      actions={
        <Box display='flex' justifyContent='center' my={1}>
          <Button
            variant="contained"
            sx={{ bgcolor: COLORS.BUTTON, width: 120, mr: 2 }}
            startIcon={<Download/>}
            onClick={handleDownload}
          >
            Tải xuống
          </Button>
          <Button
            variant="outlined"
            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 100 }}
            onClick={onClose}
          >
            Đóng
          </Button>
        </Box>
      }
    >
      {["jpg", "jpeg", "png", "gif", "webp"].includes(ext!) && (
        <RenderImage/>
      )}
      {["mp4", "webm", "ogg"].includes(ext!) && (
        <RenderVideo/>
      )}
      {ext === "pdf" && (
        <RenderPdf/>
      )}
      {ext === "docx" && (
        <RenderDoc/>
      )}
    </FullScreenDialog>
  )
}
