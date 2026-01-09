import {
  Dialog,
  DialogTitle,
  DialogContent,
  Rating,
  Typography,
  Stack,
  Chip,
  Button,
} from "@mui/material";

export function FeedbackDetailDialog({ open, onClose }: any) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chi tiết phản hồi</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            <b>Đơn hàng:</b> ORD-001
          </Typography>

          <Typography>
            <b>Sản phẩm:</b> Tủ gỗ sồi
          </Typography>

          <Rating value={5} readOnly />

          <Typography>
            <b>Ý kiến khách hàng:</b>
            <br />
            Sản phẩm đẹp, đúng yêu cầu, giao đúng hẹn.
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Nhân viên nhập: Nguyễn Văn A · 08/01/2026
          </Typography>

          <Chip label="Đã xác nhận" color="success" />

          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={onClose}>Đóng</Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
