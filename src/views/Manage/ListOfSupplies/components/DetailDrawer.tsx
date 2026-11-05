import { COLORS } from "@/constants/colors";
import { Material } from "@/constants/material";
import {
    Close,
    HistoryOutlined,
    NorthEast,
    SouthWest,
    StraightenOutlined,
    SwapHoriz,
    TuneOutlined,
} from "@mui/icons-material";
import { Box, Button, Chip, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";

interface DetailDrawerProps {
    open: boolean;
    material: Material | null;
    onClose: () => void;
}

interface SpecItem {
    label: string;
    value: string;
    highlight?: boolean;
}

interface HistoryItem {
    type: "export" | "import";
    title: string;
    sub: string;
    amount: string;
    remain: string;
}

const specs: SpecItem[] = [
    { label: "Quy cách định hình", value: "1220 x 2440 x 17 mm" },
    { label: "Đơn vị đo lường", value: "Tấm (Sheet)" },
    { label: "Tỷ trọng / Tiêu chuẩn", value: "720 - 780 kg/m³ (HMR E1)" },
    { label: "Độ ẩm kiểm định", value: "6% - 8% Đạt chuẩn", highlight: true },
];

const history: HistoryItem[] = [
    {
        type: "export",
        title: "Xuất cho ĐH #DH-2024-082 (Tủ bếp Gò Vấp)",
        sub: "Hôm nay, 09:30 • Quản đốc Toàn",
        amount: "-25 Tấm",
        remain: "Còn: 120",
    },
    {
        type: "import",
        title: "Nhập kho từ NCC An Cường",
        sub: "22/10/2024 • Phiếu NK-1049",
        amount: "+100 Tấm",
        remain: "Còn: 145",
    },
];

const SectionTitle = ({ icon, label, action }: { icon: React.ReactNode; label: string; action?: string }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Box display="flex" gap={1} alignItems="center">
            <Box sx={{ color: COLORS.BUTTON, display: "flex" }}>{icon}</Box>
            <Typography variant="subtitle2" fontWeight={700}>
                {label}
            </Typography>
        </Box>
        {action && (
            <Typography variant="caption" color={COLORS.TEXT} sx={{ cursor: "pointer" }}>
                {action}
            </Typography>
        )}
    </Box>
);

const DetailDrawer = ({ open, material, onClose }: DetailDrawerProps) => {
    if (!material) return null;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { width: 650, maxWidth: "100%" } }}
        >
            {/* header */}
            <Box bgcolor="#1B3F16" color="#fff" p={2.5}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box display="flex" gap={1} alignItems="center">
                        <Chip
                            size="small"
                            label={material.materialCode}
                            sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600 }}
                        />
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {material.categoryName}
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose} sx={{ color: "#fff" }}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
                <Typography variant="h6" fontWeight={700} mt={1.5}>
                    {material.materialName}
                </Typography>
            </Box>

            <Box p={2.5} sx={{ overflowY: "auto" }}>
                {/* thông số kỹ thuật */}
                <SectionTitle icon={<StraightenOutlined fontSize="small" />} label="THÔNG SỐ KỸ THUẬT XƯỞNG" action="Khu vực kệ: B4-T2" />
                <Box display="grid" gridTemplateColumns="1fr 1fr" rowGap={2} columnGap={2}>
                    {specs.map((s, i) => (
                        <Box key={i}>
                            <Typography variant="caption" color="text.secondary">
                                {s.label}
                            </Typography>
                            <Typography variant="body2" fontWeight={600} color={s.highlight ? COLORS.TEXT : "inherit"}>
                                {s.value}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Divider sx={{ my: 2.5 }} />

                {/* định mức & giá thành */}
                <SectionTitle icon={<TuneOutlined fontSize="small" />} label="ĐỊNH MỨC & GIÁ THÀNH" />
                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={1}>
                    <Box p={1.5} bgcolor={COLORS.BASIC} borderRadius={1.5}>
                        <Typography variant="caption" color="text.secondary">
                            Tồn tối thiểu
                        </Typography>
                        <Typography variant="h6" fontWeight={700}>
                            {material.minimumStock}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Định mức an toàn
                        </Typography>
                    </Box>
                    <Box p={1.5} bgcolor={COLORS.BASIC} borderRadius={1.5}>
                        <Typography variant="caption" color="text.secondary">
                            Tồn thực tế
                        </Typography>
                        <Typography variant="h6" fontWeight={700} color={COLORS.BUTTON}>
                            {material.actualStock}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Đang khả dụng
                        </Typography>
                    </Box>
                    <Box p={1.5} bgcolor={COLORS.BASIC} borderRadius={1.5}>
                        <Typography variant="caption" color="text.secondary">
                            Giá mua gần nhất
                        </Typography>
                        <Typography variant="h6" fontWeight={700}>
                            {material.lastPurchasePrice.toLocaleString("vi-VN")}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            VNĐ / {material.unitName}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2.5 }} />

                {/* lịch sử biến động */}
                <SectionTitle icon={<HistoryOutlined fontSize="small" />} label="LỊCH SỬ BIẾN ĐỘNG GẦN ĐÂY" action="Xem tất cả thẻ kho" />
                <Stack gap={1.5}>
                    {history.map((h, i) => (
                        <Box key={i} display="flex" gap={1.5} p={1.5} border="1px solid #eee" borderRadius={1.5}>
                            <Box
                                width={34}
                                height={34}
                                borderRadius={1}
                                flexShrink={0}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bgcolor={h.type === "export" ? "#FBE3E3" : COLORS.BASIC}
                                color={h.type === "export" ? COLORS.STATUS.ERROR : COLORS.BUTTON}
                            >
                                {h.type === "export" ? <NorthEast fontSize="small" /> : <SouthWest fontSize="small" />}
                            </Box>
                            <Box flexGrow={1}>
                                <Typography variant="body2" fontWeight={600}>
                                    {h.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {h.sub}
                                </Typography>
                            </Box>
                            <Box textAlign="right">
                                <Typography
                                    variant="body2"
                                    fontWeight={700}
                                    color={h.type === "export" ? COLORS.STATUS.ERROR : COLORS.TEXT}
                                >
                                    {h.amount}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {h.remain}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>

                {/* actions */}
                <Stack gap={1.5} mt={3}>
                    <Button variant="contained" fullWidth sx={{ bgcolor: "#1B3F16", py: 1.2 }} startIcon={<span>🛒</span>}>
                        Lập phiếu đề xuất mua hàng (PO)
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ bgcolor: COLORS.BASIC, border: "none", color: COLORS.BUTTON, py: 1.2 }}
                        startIcon={<SwapHoriz />}
                    >
                        Chuyển kho / Điều chuyển phân xưởng
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default DetailDrawer;
