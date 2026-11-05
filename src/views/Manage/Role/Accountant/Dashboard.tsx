import { COLORS } from "@/constants/colors";
import {
    Add,
    ArrowOutward,
    CheckCircle,
    FactCheck,
    FiberManualRecord,
    Inventory2,
    IosShare,
    LocalShipping,
    Notifications,
    Payments,
    Remove,
    SensorsOutlined,
    Visibility,
    WarningAmber,
    Warehouse,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    LinearProgress,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip as RechartTooltip,
    XAxis,
    YAxis,
} from "recharts";

const GREEN = "#416327";
const GREEN_LIGHT = "#6C9A4B";
const ORANGE = "#E7A22F";
const BLUE = "#2F6FE7";
const RED = "#BA1B1C";

/* ------------------------- dữ liệu mẫu ------------------------- */
const statCards = [
    {
        icon: <Warehouse />,
        title: "Tồn Kho Thực Tế",
        chip: "An toàn định mức",
        chipColor: COLORS.BASIC,
        chipText: GREEN,
        value: "294.350.000",
        unit: "đ",
        sub: "48 mã vật tư lưu kho",
        note: "Hao hụt 0.8%",
        noteColor: GREEN,
        progress: 72,
        progressColor: GREEN,
    },
    {
        icon: <Inventory2 />,
        title: "Nhập Kho T10",
        chip: "+14.2% so T9",
        chipColor: "#E3EDFB",
        chipText: BLUE,
        value: "482.900.000",
        unit: "đ",
        sub: "42 phiếu hoàn tất",
        note: "100% KCS độ ẩm",
        noteColor: BLUE,
        progress: 88,
        progressColor: BLUE,
    },
    {
        icon: <LocalShipping />,
        title: "Xuất Kho Sản Xuất",
        chip: "Khớp BOM 98.7%",
        chipColor: "#FCEFD6",
        chipText: ORANGE,
        value: "466.400.000",
        unit: "đ",
        sub: "8 Lệnh sản xuất đang chạy",
        note: "3 tổ thợ",
        noteColor: ORANGE,
        progress: 80,
        progressColor: ORANGE,
    },
    {
        icon: <Payments />,
        title: "Dòng Tiền Thu / Chi",
        chip: "Lãi gộp 24.6%",
        chipColor: "#FBE3E3",
        chipText: RED,
        value: "+680M",
        value2: "-512.4M",
        unit: "",
        sub: "12 Đơn hàng đang xử lý",
        note: "Dư: +167.6M",
        noteColor: GREEN,
        progress: 62,
        progressColor: RED,
    },
];

const chartData = [
    { name: "Tuần 1 (01-07/10)", nhap: 108, xuat: 92, antoan: 105 },
    { name: "Tuần 2 (08-14/10)", nhap: 132, xuat: 115, antoan: 105 },
    { name: "Tuần 3 (15-21/10)", nhap: 146, xuat: 138, antoan: 105 },
    { name: "Tuần 4 (Hiện tại)", nhap: 96.9, xuat: 121.4, antoan: 105 },
];

const alerts = [
    {
        dot: RED,
        tag: "DƯỚI MỨC TỐI THIỂU",
        code: "VT-GO-014",
        title: "Gỗ Teak Nam Mỹ (Tự nhiên FAS)",
        line1: "Thực tế: 1.2 m³",
        line2: "Định mức min: 2.0 m³",
        foot: "Thiếu 0.8 m³ cho Lệnh SX-105",
        footColor: RED,
        action: "Đặt mua NCC",
        actionColor: RED,
    },
    {
        dot: ORANGE,
        tag: "SẮP HẾT CHO ĐƠN HÀNG",
        code: "PK-BLUM-110",
        title: "Bản lề Blum Clip Top 110° Giảm Chấn",
        line1: "Còn lại: 35 bộ",
        line2: "Lệnh SX-106 cần: 48 bộ",
        foot: "NCC: Hafele VN (Lead: 2 ngày)",
        footColor: "text.secondary",
        action: "Bổ sung kho",
        actionColor: ORANGE,
    },
];

const stock = [
    { label: "Gỗ tự nhiên FAS", value: "123.627.000 đ", ratio: "Tỷ trọng: 42%  8.6 m³", color: GREEN, w: 42 },
    { label: "Ván MDF & Plywood", value: "100.079.000 đ", ratio: "Tỷ trọng: 34%  218 tấm", color: GREEN_LIGHT, w: 34 },
    { label: "Phụ kiện Blum / Hafele", value: "52.983.000 đ", ratio: "Tỷ trọng: 18%  312 bộ", color: ORANGE, w: 18 },
    { label: "Keo, Nhám & Sơn PU", value: "17.661.000 đ", ratio: "Tỷ trọng: 6%  45 can/thùng", color: BLUE, w: 6 },
];

const orders = [
    { code: "DH-2024-105", tag: "Khớp BOM", tagColor: COLORS.BASIC, tagText: GREEN, name: "Penthouse Thảo Điền (Gỗ Teak & Óc Chó)", by: "Phụ trách: Tổ Mộc 2 (Đỗ Mạnh Hưng)", due: "Giao: 28/10/2024", pct: 85, color: GREEN },
    { code: "DH-2024-108", tag: "Đúng tiến độ", tagColor: "#E3EDFB", tagText: BLUE, name: "Boutique Villa Đà Lạt (Sồi Mỹ & Mây Đan)", by: "Phụ trách: Tổ Mộc 1 (Lê Viết Tuấn)", due: "Giao: 15/11/2024", pct: 45, color: ORANGE },
    { code: "DH-2024-112", tag: "Mới khởi động", tagColor: "#EDEDED", tagText: "#666", name: "Căn hộ Master Imperia (MDF An Cường)", by: "Phụ trách: Tổ Mộc 3 (Trần Văn Toàn)", due: "Giao: 30/11/2024", pct: 20, color: GREEN_LIGHT },
];

const transactions = [
    { code: "PXK-202410-090", time: "10:45 • Hôm nay", dot: ORANGE, item: "Gỗ Sồi Trắng Mỹ FAS (Dày 45mm)", desc: "Phục vụ: DH Penthouse Thảo Điền (Cánh tủ & Bàn ăn)", qty: "3.2 m³", value: "107.060.000 đ", valueColor: ORANGE, unit: "Tổ Mộc 2 (Gia công)", kcs: "Đỗ Mạnh Hưng", status: "Đã duyệt", statusColor: GREEN },
    { code: "PNK-202410-042", time: "08:20 • Hôm nay", dot: GREEN, item: "Ván MDF Chống Ẩm Lõi Xanh An Cường (17mm)", desc: "Số lô hàng: AC-HCM-8910 (Đã kiểm tra E1)", qty: "100 tấm", value: "52.542.000 đ", valueColor: GREEN, unit: "Cty CP Gỗ An Cường", kcs: "Trần Văn Toàn", status: "Đã nhập kho", statusColor: GREEN },
    { code: "KKK-202410-01", time: "Hôm qua • 16:30", dot: GREEN, item: "Biên Bản Kiểm Kê Định Kỳ Kho Kim Khí & Sơn", desc: "Kiểm tra ray trượt, bản lề Blum, sơn lót PU và dung môi", qty: "24 mã SKUs", value: "Lệch 0%", valueColor: GREEN, unit: "Kho Phụ Trợ B1", kcs: "Lê Viết Tuấn", status: "Đã ký duyệt", statusColor: GREEN },
    { code: "PC-202410-018", time: "22/10/2024", dot: RED, item: "Chi Thanh Toán Đợt 1 Phôi Gỗ Ghép Tấm Bì (Ash)", desc: "Ủy nhiệm chi ngân hàng ACB theo HĐ-TM-184", qty: "1 đợt", value: "43.350.000 đ", valueColor: RED, unit: "Gỗ Ghép Việt Mỹ Corp", kcs: "Kim Loan (Kế toán)", status: "Hoàn tất", statusColor: GREEN },
];

const DashboardAccountant = () => {
    return (
        <Box bgcolor="#F4F8EF" pb={4}>
            {/* ----------------- banner chính ----------------- */}
            <Box borderRadius={2} m={{ xs: 1.5, md: 3 }} p={2} bgcolor="#fff" boxShadow={1}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            BÀN LÀM VIỆC CHÍNH • CHELOIRE WOOD ERP
                        </Typography>
                        <Typography variant="h5" fontWeight={700}>
                            Trung Tâm Điều Hành & Tổng Quan Xưởng Mộc
                        </Typography>
                        <Chip
                            sx={{ bgcolor: COLORS.BASIC, mt: 2, fontWeight: 600, color: GREEN }}
                            label="Kho Phôi Gỗ & Xưởng Tân Bình (Trực Tuyến)"
                            icon={<FiberManualRecord sx={{ color: `${COLORS.BUTTON} !important` }} />}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack
                            borderRadius={1}
                            justifyContent={{ xs: "flex-start", md: "flex-end" }}
                            flexWrap="wrap"
                            p={1}
                            gap={1}
                            direction="row"
                            bgcolor="#F4F8EF"
                        >
                            {["Hôm nay", "Tuần này", "Tháng 10/2024", "Quý 4"].map((t) => (
                                <Typography
                                    key={t}
                                    variant="body2"
                                    px={1.5}
                                    py={0.5}
                                    borderRadius={1}
                                    fontWeight={t === "Tháng 10/2024" ? 700 : 400}
                                    bgcolor={t === "Tháng 10/2024" ? "#fff" : "transparent"}
                                    boxShadow={t === "Tháng 10/2024" ? 1 : 0}
                                    sx={{ cursor: "pointer" }}
                                >
                                    {t}
                                </Typography>
                            ))}
                        </Stack>
                        <Box mt={2} display="flex" flexDirection="row" flexWrap="wrap" gap={1.5} justifyContent={{ xs: "flex-start", md: "flex-end" }}>
                            <Button variant="contained" sx={{ bgcolor: COLORS.BUTTON }} startIcon={<Add />}>
                                Tạo phiếu nhập
                            </Button>
                            <Button variant="contained" sx={{ bgcolor: COLORS.BUTTON }} startIcon={<Remove />}>
                                Tạo phiếu xuất
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                                startIcon={<FactCheck />}
                            >
                                Kiểm kê nhanh
                            </Button>
                            <Tooltip title="Xuất báo cáo PDF/Excel">
                                <IconButton sx={{ border: "1px solid #ddd" }}>
                                    <IosShare sx={{ color: COLORS.BUTTON }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* ----------------- 4 card KPI ----------------- */}
            <Box px={{ xs: 1.5, md: 3 }}>
                <Grid container spacing={2}>
                    {statCards.map((c, i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                        <Box display="flex" gap={1} alignItems="center">
                                            <Box sx={{ color: c.progressColor }}>{c.icon}</Box>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                {c.title}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            size="small"
                                            label={c.chip}
                                            sx={{ bgcolor: c.chipColor, color: c.chipText, fontWeight: 600 }}
                                        />
                                    </Box>
                                    <Box mt={1.5} display="flex" alignItems="baseline" gap={1} flexWrap="wrap">
                                        <Typography variant="h5" fontWeight={700} color={c.value2 ? GREEN : "inherit"}>
                                            {c.value}
                                        </Typography>
                                        {c.value2 && (
                                            <Typography variant="h6" fontWeight={700} color={RED}>
                                                {c.value2}
                                            </Typography>
                                        )}
                                        {c.unit && (
                                            <Typography variant="body2" color="text.secondary">
                                                {c.unit}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box mt={1} display="flex" justifyContent="space-between">
                                        <Typography variant="caption" color="text.secondary">
                                            {c.sub}
                                        </Typography>
                                        <Typography variant="caption" fontWeight={600} color={c.noteColor}>
                                            {c.note}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={c.progress}
                                        sx={{
                                            mt: 1.5,
                                            height: 6,
                                            borderRadius: 3,
                                            bgcolor: "#EEE",
                                            "& .MuiLinearProgress-bar": { bgcolor: c.progressColor },
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* ----------------- chart + cảnh báo ----------------- */}
            <Box px={{ xs: 1.5, md: 3 }} mt={2}>
                <Grid container spacing={2}>
                    {/* chart */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                            <CardContent>
                                <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "flex-start" }} gap={1}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={700}>
                                            Xu Hướng Lưu Chuyển Vật Tư Qua 4 Tuần
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Biến động giá trị Nhập kho, Xuất gia công và Tồn bảo an Tháng 10/2024
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" flexWrap="wrap" gap={2}>
                                        <LegendDot color={GREEN} label="Nhập kho" />
                                        <LegendDot color={ORANGE} label="Xuất xưởng" />
                                        <LegendDot color="#222" label="Mức an toàn" />
                                    </Stack>
                                </Box>
                                <Box height={{ xs: 260, md: 320 }} mt={2}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={chartData} barGap={4}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                            <YAxis hide />
                                            <RechartTooltip />
                                            <Bar dataKey="nhap" fill={GREEN} radius={[4, 4, 0, 0]} barSize={28} />
                                            <Bar dataKey="xuat" fill={ORANGE} radius={[4, 4, 0, 0]} barSize={28} />
                                            <Line
                                                type="monotone"
                                                dataKey="antoan"
                                                stroke="#222"
                                                strokeWidth={2}
                                                dot={{ r: 4, fill: "#222" }}
                                            />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* cảnh báo tồn kho */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" gap={1} alignItems="center">
                                        <WarningAmber sx={{ color: RED }} />
                                        <Typography variant="h6" fontWeight={700}>
                                            Cảnh Báo Tồn Kho
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" color={GREEN} sx={{ cursor: "pointer" }}>
                                        Xem tất cả (4)
                                    </Typography>
                                </Box>

                                {alerts.map((a, i) => (
                                    <Box key={i} mt={2} p={1.5} borderRadius={1.5} border="1px solid #eee">
                                        <Box display="flex" justifyContent="space-between">
                                            <Box display="flex" gap={1} alignItems="center">
                                                <FiberManualRecord sx={{ color: a.dot, fontSize: 12 }} />
                                                <Typography variant="caption" fontWeight={700} color={a.dot}>
                                                    {a.tag}
                                                </Typography>
                                            </Box>
                                            <Typography variant="caption" color="text.secondary">
                                                {a.code}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" fontWeight={700} mt={0.5}>
                                            {a.title}
                                        </Typography>
                                        <Box display="flex" justifyContent="space-between" mt={0.5}>
                                            <Typography variant="caption" color="text.secondary">
                                                {a.line1}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {a.line2}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                                            <Typography variant="caption" color={a.footColor} fontWeight={600}>
                                                {a.foot}
                                            </Typography>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                sx={{ bgcolor: a.actionColor, fontSize: 11, py: 0.3 }}
                                            >
                                                {a.action}
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}

                                <Box mt={2} p={1.5} borderRadius={1.5} bgcolor={COLORS.BASIC} display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" gap={1}>
                                        <CheckCircle sx={{ color: GREEN, fontSize: 20 }} />
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>
                                                Plywood Melamine Chống Ẩm 18mm
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Đã nhập đủ 100 tấm từ An Cường (Kho lưu B2)
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Chip size="small" label="Đủ vật tư" sx={{ bgcolor: "#fff", color: GREEN, fontWeight: 600 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* ----------------- cơ cấu + tiến độ đơn hàng ----------------- */}
            <Box px={{ xs: 1.5, md: 3 }} mt={2}>
                <Grid container spacing={2}>
                    {/* cơ cấu giá trị */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                            <CardContent>
                                <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="flex-start" gap={1}>
                                    <Typography variant="h6" fontWeight={700}>
                                        Cơ Cấu Giá Trị Vật Tư Tồn Kho Theo 4 Phân Nhóm
                                    </Typography>
                                    <Box textAlign={{ xs: "left", sm: "right" }} flexShrink={0}>
                                        <Typography variant="caption" color="text.secondary">
                                            Tổng vốn vật tư:
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={700}>
                                            294.350.000 đ
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* thanh tỷ trọng */}
                                <Box mt={2} display="flex" height={14} borderRadius={1} overflow="hidden">
                                    {stock.map((s, i) => (
                                        <Box key={i} width={`${s.w}%`} bgcolor={s.color} />
                                    ))}
                                </Box>

                                <Grid container spacing={2} mt={1}>
                                    {stock.map((s, i) => (
                                        <Grid size={{ xs: 6, md: 3 }} key={i}>
                                            <Box display="flex" gap={0.5} alignItems="center">
                                                <FiberManualRecord sx={{ color: s.color, fontSize: 12 }} />
                                                <Typography variant="caption" fontWeight={600}>
                                                    {s.label}
                                                </Typography>
                                            </Box>
                                            <Typography variant="subtitle2" fontWeight={700} mt={0.5}>
                                                {s.value}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {s.ratio}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* 2 khu */}
                                <Grid container spacing={2} mt={1}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <AreaCard
                                            tag="KHU A • PHÔI GỖ FAS"
                                            title="Gỗ Sồi Trắng & Teak Nam Mỹ"
                                            desc="Kiểm soát độ ẩm trung bình 9.8% đạt chuẩn xuất xưởng nội"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <AreaCard
                                            tag="KHU B • LẮP RÁP & HOÀN THIỆN"
                                            title="Dây Chuyền Lắp Bản Lề & Sơn"
                                            desc="Đang hoàn thiện chi tiết cánh kính cho đơn Penthouse Thảo…"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* tiến độ theo đơn hàng */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        Tiến Độ Theo Đơn Hàng
                                    </Typography>
                                    <Chip size="small" label="3 Đang Chạy" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                </Box>

                                {orders.map((o, i) => (
                                    <Box key={i} mt={2}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Box display="flex" gap={1} alignItems="center">
                                                <Typography variant="body2" fontWeight={700}>
                                                    {o.code}
                                                </Typography>
                                                <Chip size="small" label={o.tag} sx={{ bgcolor: o.tagColor, color: o.tagText, fontWeight: 600, height: 20 }} />
                                            </Box>
                                            <Typography variant="body2" fontWeight={700}>
                                                {o.pct}%
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2">{o.name}</Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={o.pct}
                                            sx={{
                                                my: 0.8,
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: "#EEE",
                                                "& .MuiLinearProgress-bar": { bgcolor: o.color },
                                            }}
                                        />
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography variant="caption" color="text.secondary">
                                                {o.by}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {o.due}
                                            </Typography>
                                        </Box>
                                        {i < orders.length - 1 && <Divider sx={{ mt: 1.5 }} />}
                                    </Box>
                                ))}

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mt: 2, border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                                >
                                    Chi tiết tiến độ xưởng & Định mức vật tư →
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* ----------------- nhật ký giao dịch ----------------- */}
            <Box px={{ xs: 1.5, md: 3 }} mt={2}>
                <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                    <CardContent>
                        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" gap={1}>
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                                    Nhật Ký Giao Dịch & Vận Hành Kho Gần Nhất
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Dòng luân chuyển thực tế cập nhật tự động theo các lệnh xuất, nhập và kiểm kê
                                </Typography>
                            </Box>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {["Tất cả", "Phiếu xuất", "Phiếu nhập", "Kiểm kê"].map((t, i) => (
                                    <Typography
                                        key={t}
                                        variant="body2"
                                        fontWeight={i === 0 ? 700 : 400}
                                        px={1.5}
                                        py={0.5}
                                        borderRadius={1}
                                        bgcolor={i === 0 ? COLORS.BASIC : "transparent"}
                                        color={i === 0 ? GREEN : "text.secondary"}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        {t}
                                    </Typography>
                                ))}
                            </Stack>
                        </Box>

                        {/* header table */}
                        <Box mt={2} sx={{ overflowX: "auto" }}>
                            <Box
                                display="grid"
                                gridTemplateColumns="1.3fr 2.5fr 0.9fr 1.3fr 1.2fr 1fr 1fr 0.6fr"
                                minWidth={960}
                                px={1}
                                py={1}
                                bgcolor="#FAFAF7"
                                borderRadius={1}
                            >
                                {["MÃ PHIẾU & LOẠI", "CHI TIẾT VẬT TƯ / HẠNG MỤC", "SỐ LƯỢNG", "GIÁ TRỊ GIAO DỊCH", "ĐƠN VỊ NHẬN / NCC", "PHỤ TRÁCH KCS", "TRẠNG THÁI", "THAO TÁC"].map((h) => (
                                    <Typography key={h} variant="caption" fontWeight={700} color="text.secondary">
                                        {h}
                                    </Typography>
                                ))}
                            </Box>

                            {transactions.map((t, i) => (
                                <Box
                                    key={i}
                                    display="grid"
                                    gridTemplateColumns="1.3fr 2.5fr 0.9fr 1.3fr 1.2fr 1fr 1fr 0.6fr"
                                    minWidth={960}
                                    px={1}
                                    py={1.5}
                                    alignItems="center"
                                    borderBottom="1px solid #f0f0f0"
                                >
                                    <Box display="flex" gap={1}>
                                        <FiberManualRecord sx={{ color: t.dot, fontSize: 10, mt: 0.6 }} />
                                        <Box>
                                            <Typography variant="caption" fontWeight={700} display="block">
                                                {t.code}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {t.time}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" fontWeight={600}>
                                            {t.item}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {t.desc}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2">{t.qty}</Typography>
                                    <Typography variant="body2" fontWeight={700} color={t.valueColor}>
                                        {t.value}
                                    </Typography>
                                    <Typography variant="caption">{t.unit}</Typography>
                                    <Typography variant="caption">{t.kcs}</Typography>
                                    <Box>
                                        <Chip size="small" label={t.status} sx={{ bgcolor: COLORS.BASIC, color: t.statusColor, fontWeight: 600 }} />
                                    </Box>
                                    <IconButton size="small">
                                        <Visibility fontSize="small" sx={{ color: "text.secondary" }} />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>

                        <Box mt={2} display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={1.5}>
                            <Box display="flex" gap={1} alignItems="center">
                                <CheckCircle sx={{ color: GREEN, fontSize: 18 }} />
                                <Typography variant="caption" color="text.secondary">
                                    Hiển thị 4 giao dịch mới nhất trên tổng số 142 bản ghi trong tháng 10.
                                </Typography>
                            </Box>
                            <Button variant="contained" sx={{ bgcolor: COLORS.BUTTON, flexShrink: 0 }} endIcon={<ArrowOutward />}>
                                Xem Toàn Bộ Sổ Kho Chi Tiết →
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* ----------------- thanh cảm biến ----------------- */}
            <Box px={{ xs: 1.5, md: 3 }} mt={2}>
                <Card sx={{ borderRadius: 2, boxShadow: 1, bgcolor: "#fff" }}>
                    <CardContent sx={{ py: "12px !important" }}>
                        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={1.5}>
                            <Box display="flex" gap={1.5} alignItems="center">
                                <Avatar sx={{ bgcolor: COLORS.BASIC, color: GREEN, width: 36, height: 36 }}>
                                    <SensorsOutlined fontSize="small" />
                                </Avatar>
                                <Box>
                                    <Typography variant="body2" fontWeight={700}>
                                        Hệ Thống Cảm Biến Kho Gỗ & Máy Đo Độ Ẩm Tự Động
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Kho Tân Bình: Nhiệt độ 27.5°C • Độ ẩm không khí 62% • Độ ẩm phôi sấy TB 9.8% (Đạt tiêu chuẩn xuất xưởng)
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" gap={1} alignItems="center">
                                <FiberManualRecord sx={{ color: GREEN, fontSize: 12 }} />
                                <Typography variant="caption" color="text.secondary">
                                    Đồng bộ 1 phút trước
                                </Typography>
                                <Notifications sx={{ color: "text.secondary", ml: 1 }} fontSize="small" />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

/* ------------------------- helper components ------------------------- */
const LegendDot = ({ color, label }: { color: string; label: string }) => (
    <Box display="flex" gap={0.5} alignItems="center">
        <FiberManualRecord sx={{ color, fontSize: 12 }} />
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
    </Box>
);

const AreaCard = ({ tag, title, desc }: { tag: string; title: string; desc: string }) => (
    <Box display="flex" gap={1.5} p={1.5} border="1px solid #eee" borderRadius={1.5}>
        <Box
            width={70}
            height={70}
            borderRadius={1}
            bgcolor={COLORS.BASIC}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
        >
            <Warehouse sx={{ color: GREEN }} />
        </Box>
        <Box>
            <Typography variant="caption" fontWeight={700} color={GREEN}>
                {tag}
            </Typography>
            <Typography variant="body2" fontWeight={700}>
                {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {desc}
            </Typography>
        </Box>
    </Box>
);

export default DashboardAccountant;
