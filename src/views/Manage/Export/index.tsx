import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import {
    AddCircleOutline,
    ApartmentOutlined,
    AssessmentOutlined,
    CalendarMonth,
    CheckCircle,
    CheckCircleOutline,
    FactCheckOutlined,
    FilterAltOutlined,
    HandymanOutlined,
    PrintOutlined,
    ReceiptLongOutlined,
    TaskAltOutlined,
    VerifiedUserOutlined,
    WarehouseOutlined,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    LinearProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const GREEN = COLORS.BUTTON;
const GREEN_LIGHT = "#6C9A4B";
const ORANGE = "#E7A22F";
const BLUE = "#2F6FE7";
const RED = "#BA1B1C";

/* ------------------------- dữ liệu mẫu ------------------------- */
const materials = [
    { name: "Gỗ Sồi Mỹ xẻ sấy 25mm", code: "VT-GO-SOI-25M", now: "18.5 m³", req: "3.2 m³", out: "3.2 m³", cost: "28,500,000 đ", total: "91,200,000 đ", purpose: "Làm khung sofa & bàn", dot: GREEN },
    { name: "Ván Plywood phủ Melamine chống ẩm 18mm", code: "VT-VAN-PLY-18ML", now: "85 tấm", req: "25 tấm", out: "24 tấm", cost: "410,000 đ", total: "9,840,000 đ", purpose: "Đóng thùng tủ áo âm tường", dot: GREEN_LIGHT },
    { name: "Bản lề Blum Clip Top 110 độ", code: "PK-BLUM-110D", now: "150 cái", req: "48 cái", out: "48 cái", cost: "65,000 đ", total: "3,120,000 đ", purpose: "Lắp cánh tủ", dot: BLUE },
    { name: "Sơn phủ mờ bóng mờ 50% PU Inchem", code: "VT-SON-INCH-50", now: "12 thùng", req: "2 thùng", out: "2 thùng", cost: "1,450,000 đ", total: "2,900,000 đ", purpose: "Sơn hoàn thiện mộc", dot: ORANGE },
];

const breakdown = [
    { label: "Gỗ tự nhiên (Sồi Mỹ)", pct: "85.2%", color: GREEN },
    { label: "Ván Plywood", pct: "9.2%", color: GREEN_LIGHT },
    { label: "Phụ kiện ngũ kim", pct: "2.9%", color: BLUE },
    { label: "Sơn PU Inchem", pct: "2.7%", color: ORANGE },
];

const recent = [
    { code: "PXK-202410-089", status: "Đang chuẩn bị", statusColor: ORANGE, statusBg: "#FCEFD6", title: "Penthouse anh Hoàng", sub: "Tổ thi công mộc số 2", label: "Giá trị xuất:", value: "107,060,000 đ", valueColor: GREEN, time: "Hôm nay • 08:30" },
    { code: "PXK-202410-088", status: "Đã xuất kho", statusColor: GREEN, statusBg: COLORS.BASIC, title: "Biệt thự Nam Long - Cần Thơ", sub: "Tổ mộc số 1 (Đội anh Hưng)", label: "Giá trị xuất:", value: "45,820,000 đ", valueColor: GREEN, time: "23/10/2024 • 15:10" },
    { code: "PXK-202410-087", status: "Bảo dưỡng máy", statusColor: BLUE, statusBg: "#E3EDFB", title: "Xuất dầu bôi trơn CNC & Lưỡi cưa", sub: "Tổ kỹ thuật máy xưởng", label: "Giá trị xuất:", value: "4,250,000 đ", valueColor: GREEN, time: "22/10/2024 • 09:00" },
    { code: "PXK-202410-086", status: "Xuất hủy ván ẩm", statusColor: RED, statusBg: "#FBE3E3", title: "Thanh lý 12 tấm MDF cong vênh", sub: "Khu vực kho vật tư phụ", label: "Giá trị hao hụt:", value: "3,120,000 đ", valueColor: RED, time: "21/10/2024 • 16:45" },
];

/* ------------------------- helper ------------------------- */
const FieldBox = ({ label, value, icon, badge }: { label: string; value: string; icon?: React.ReactNode; badge?: React.ReactNode }) => (
    <Box>
        <Typography variant="caption" color="text.secondary" mb={0.5} display="block">
            {label}
        </Typography>
        <Box px={1.5} py={1} borderRadius={1.5} bgcolor={COLORS.BASIC} display="flex" alignItems="center" gap={1}>
            {icon && <Box sx={{ color: GREEN, display: "flex" }}>{icon}</Box>}
            <Typography variant="body2" fontWeight={600} flexGrow={1} noWrap>
                {value}
            </Typography>
            {badge}
        </Box>
    </Box>
);

const Export = () => {
    return (
        <Page title="Xuất kho">
            <Box bgcolor="#F4F8EF" pb={4}>
                {/* ----------------- header banner ----------------- */}
                <Box px={{ xs: 2, md: 3 }} pt={3}>
                    <Box
                        p={2.5}
                        borderRadius={2}
                        bgcolor={COLORS.BASIC}
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        gap={2}
                    >
                        <Box>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
                                <WarehouseOutlined sx={{ fontSize: 16, color: GREEN }} />
                                <Typography variant="caption" fontWeight={700} color={GREEN}>
                                    KHO XƯỞNG CHELOIRE TÂN BÌNH • BÀN GIAO VẬT TƯ GIA CÔNG
                                </Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}>
                                Quản Lý Xuất Kho Vật Tư Sản Xuất
                            </Typography>
                            <Typography variant="body2" color="text.secondary" maxWidth={560}>
                                Tạo phiếu cấp phát gỗ tự nhiên, ván công nghiệp và phụ kiện ngũ kim theo định mức thiết kế BOM trực tiếp cho các tổ thợ mộc thi công.
                            </Typography>
                        </Box>
                        <Stack gap={1.5} width={{ xs: "100%", md: "auto" }}>
                            <Stack direction="row" flexWrap="wrap" gap={1.5}>
                                <Button variant="outlined" startIcon={<ReceiptLongOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #cfe0c2", color: "#333" }}>
                                    Xuất kho theo đơn hàng
                                </Button>
                                <Button variant="outlined" startIcon={<AssessmentOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #cfe0c2", color: "#333" }}>
                                    Báo cáo xuất vật tư
                                </Button>
                            </Stack>
                            <Button variant="contained" startIcon={<AddCircleOutline />} sx={{ bgcolor: GREEN }}>
                                + Tạo lệnh xuất kho
                            </Button>
                        </Stack>
                    </Box>
                </Box>

                {/* ----------------- main 2 columns ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        {/* ===== left column ===== */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            {/* phiếu lệnh */}
                            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                                <CardContent>
                                    <Box display="flex" gap={1.5}>
                                        <Box width={4} borderRadius={2} bgcolor={GREEN} flexShrink={0} />
                                        <Box flexGrow={1}>
                                            <Typography variant="caption" fontWeight={700} color="text.secondary">
                                                PHIẾU LỆNH CHÍNH THỨC
                                            </Typography>
                                            <Typography variant="h6" fontWeight={700}>
                                                Thông tin phiếu xuất kho liên kết BOM
                                            </Typography>
                                            <Chip size="small" label="● Trạng thái: Đang chuẩn bị bốc vật tư" sx={{ mt: 0.5, bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                        </Box>
                                    </Box>

                                    <Grid container spacing={2} mt={1}>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <FieldBox label="Mã số phiếu" value="PXK-202410-089" icon={<Typography fontWeight={700}>#</Typography>} />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <FieldBox label="Ngày thực xuất" value="24/10/2024 • 08:30 Sáng" icon={<CalendarMonth fontSize="small" />} />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                            <FieldBox
                                                label="Loại mục đích xuất"
                                                value="Xuất theo Đơn hàng"
                                                badge={<CheckCircle sx={{ fontSize: 18, color: GREEN }} />}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 7 }}>
                                            <FieldBox
                                                label="Đơn hàng sản xuất đích (Dự án)"
                                                value="ĐH-2024-105: Nội thất Penthouse anh Hoàng - Thảo Điền"
                                                icon={<ApartmentOutlined fontSize="small" />}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 5 }}>
                                            <FieldBox label="Tổ / Thợ mộc nhận vật tư" value="Tổ mộc số 2 (Đội bác Tư)" icon={<HandymanOutlined fontSize="small" />} />
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 2 }} />

                                    <Stack direction="row" flexWrap="wrap" gap={{ xs: 1, md: 3 }}>
                                        <FootItem icon={<VerifiedUserOutlined fontSize="small" />} label="Người phê duyệt lệnh:" value="Quản đốc xưởng (Trần Văn Toàn)" />
                                        <FootItem icon={<FactCheckOutlined fontSize="small" />} label="Thủ kho xuất:" value="Lê Viết Tuấn" />
                                        <FootItem icon={<TaskAltOutlined fontSize="small" />} label="Cơ chế:" value="Tự động trừ thẻ kho tức thì" />
                                    </Stack>
                                </CardContent>
                            </Card>

                            {/* bảng chi tiết vật tư */}
                            <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 2 }}>
                                <CardContent>
                                    <Box
                                        display="flex"
                                        flexDirection={{ xs: "column", sm: "row" }}
                                        justifyContent="space-between"
                                        alignItems={{ xs: "flex-start", sm: "center" }}
                                        gap={1.5}
                                    >
                                        <Stack direction="row" alignItems="center" gap={1}>
                                            <Typography variant="h6" fontWeight={700}>
                                                Bảng Chi Tiết Vật Tư Xuất Kho
                                            </Typography>
                                            <Chip size="small" label="4 chủng loại" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                        </Stack>
                                        <Stack direction="row" flexWrap="wrap" gap={1}>
                                            <Button size="small" variant="outlined" startIcon={<FilterAltOutlined />} sx={{ border: "1px solid #ddd", color: "#333" }}>
                                                Lọc vật tư
                                            </Button>
                                            <Button size="small" variant="outlined" startIcon={<PrintOutlined />} sx={{ border: "1px solid #ddd", color: "#333" }}>
                                                Xuất phiếu in (A4)
                                            </Button>
                                        </Stack>
                                    </Box>

                                    <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                        <Table sx={{ minWidth: 820 }}>
                                            <TableHead>
                                                <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 12 } }}>
                                                    <TableCell>VẬT TƯ & MÃ</TableCell>
                                                    <TableCell align="right">TỒN HIỆN TẠI</TableCell>
                                                    <TableCell align="right">YÊU CẦU</TableCell>
                                                    <TableCell align="center">THỰC XUẤT</TableCell>
                                                    <TableCell align="right">ĐƠN GIÁ VỐN</TableCell>
                                                    <TableCell align="right">TỔNG THÀNH TIỀN</TableCell>
                                                    <TableCell>MỤC ĐÍCH / CÔNG ĐOẠN</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {materials.map((m) => (
                                                    <TableRow key={m.code} hover>
                                                        <TableCell>
                                                            <Typography variant="body2" fontWeight={700}>
                                                                {m.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {m.code}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">{m.now}</TableCell>
                                                        <TableCell align="right">{m.req}</TableCell>
                                                        <TableCell align="center">
                                                            <Chip size="small" label={m.out} sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 700 }} />
                                                        </TableCell>
                                                        <TableCell align="right">{m.cost}</TableCell>
                                                        <TableCell align="right">
                                                            <Typography variant="body2" fontWeight={700}>
                                                                {m.total}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Stack direction="row" gap={0.5} alignItems="center">
                                                                <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: m.dot, flexShrink: 0 }} />
                                                                <Typography variant="caption">{m.purpose}</Typography>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <Box mt={2} p={1.5} borderRadius={1.5} bgcolor={COLORS.BASIC} display="flex" gap={1} alignItems="center">
                                        <CheckCircleOutline sx={{ fontSize: 18, color: GREEN }} />
                                        <Typography variant="caption" color="text.secondary">
                                            Kho tự động giữ chỗ vật tư cho đơn hàng, tránh xuất lạm quyền.
                                        </Typography>
                                    </Box>

                                    <Box mt={2} display="flex" flexWrap="wrap" alignItems="center" gap={2}>
                                        <Typography variant="subtitle1" fontWeight={700}>
                                            Tổng cộng 4 loại vật tư:
                                        </Typography>
                                        <Typography variant="h5" fontWeight={700} color={GREEN}>
                                            107,060,000 đ
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* ===== right column ===== */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            {/* hiệu suất định mức */}
                            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
                                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                                            HIỆU SUẤT ĐỊNH MỨC (BOM)
                                        </Typography>
                                        <Chip size="small" label="-1.5% Chi phí" sx={{ bgcolor: GREEN, color: "#fff", fontWeight: 600 }} />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                                        Tổng giá trị xuất vật tư:
                                    </Typography>
                                    <Typography variant="h4" fontWeight={700}>
                                        107,060,000{" "}
                                        <Typography component="span" variant="h6" color="text.secondary">
                                            đ
                                        </Typography>
                                    </Typography>

                                    <Box mt={2} display="flex" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">
                                            Định mức vật tư dự toán:
                                        </Typography>
                                        <Typography variant="body2" fontWeight={700}>
                                            108,700,000 đ
                                        </Typography>
                                    </Box>
                                    <Box mt={1} display="flex" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">
                                            Tỷ lệ xuất thực tế / Định mức:
                                        </Typography>
                                        <Typography variant="body2" fontWeight={700} color={GREEN}>
                                            98.5% (Tối ưu)
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={98.5}
                                        sx={{ mt: 1, height: 8, borderRadius: 4, bgcolor: "#EEE", "& .MuiLinearProgress-bar": { bgcolor: GREEN } }}
                                    />
                                    <Typography variant="caption" color="text.secondary" mt={1.5} display="block">
                                        Tổ 2 cắt dưỡng gỗ sồi hợp lý, tận dụng ván Melamine dư từ lô tủ trước giúp giảm hao hụt thêm 1,640,000 đ.
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    <Stack gap={1.5}>
                                        {breakdown.map((b, i) => (
                                            <Box key={i} display="flex" justifyContent="space-between" alignItems="center">
                                                <Stack direction="row" gap={1} alignItems="center">
                                                    <Box component="span" sx={{ width: 10, height: 10, borderRadius: "2px", bgcolor: b.color }} />
                                                    <Typography variant="body2">{b.label}</Typography>
                                                </Stack>
                                                <Typography variant="body2" fontWeight={700}>
                                                    {b.pct}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>

                                    <Button fullWidth variant="contained" startIcon={<CheckCircleOutline />} sx={{ mt: 2.5, bgcolor: GREEN, py: 1.2 }}>
                                        Xác nhận xuất & In phiếu bàn giao
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* không gian xưởng */}
                            <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 2 }}>
                                <CardContent>
                                    <Stack direction="row" gap={1} alignItems="center" mb={1.5}>
                                        <HandymanOutlined fontSize="small" sx={{ color: GREEN }} />
                                        <Typography variant="subtitle2" fontWeight={700}>
                                            Không gian xưởng phụ trách
                                        </Typography>
                                    </Stack>
                                    <Box
                                        height={150}
                                        borderRadius={2}
                                        bgcolor={COLORS.BASIC}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        color={GREEN}
                                    >
                                        <WarehouseOutlined sx={{ fontSize: 48 }} />
                                    </Box>
                                    <Typography variant="body2" fontWeight={600} mt={1.5}>
                                        Xưởng Mộc Tân Bình • Phân xưởng Đóng khung 2
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* ----------------- phiếu gần đây ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box
                                display="flex"
                                flexDirection={{ xs: "column", md: "row" }}
                                justifyContent="space-between"
                                alignItems={{ xs: "flex-start", md: "center" }}
                                gap={1}
                            >
                                <Box display="flex" gap={1.5}>
                                    <Box width={4} borderRadius={2} bgcolor={GREEN} flexShrink={0} />
                                    <Box>
                                        <Typography variant="h6" fontWeight={700}>
                                            Các Phiếu Xuất Đang Xử Lý & Lịch Sử Gần Đây
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Lưu vết bàn giao vật liệu cho thợ mộc và xuất chuyển công đoạn
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    Hiển thị 4 phiếu mới nhất trong tuần
                                </Typography>
                            </Box>

                            <Grid container spacing={2} mt={1}>
                                {recent.map((r) => (
                                    <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={r.code}>
                                        <Box p={2} borderRadius={2} border="1px solid #eee" height="100%">
                                            <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                                                <Typography variant="caption" fontWeight={700} color="text.secondary">
                                                    {r.code}
                                                </Typography>
                                                <Chip size="small" label={r.status} sx={{ bgcolor: r.statusBg, color: r.statusColor, fontWeight: 600, height: 20 }} />
                                            </Box>
                                            <Typography variant="body2" fontWeight={700} mt={1}>
                                                {r.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {r.sub}
                                            </Typography>
                                            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={0.5} mt={1.5}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {r.label}
                                                </Typography>
                                                <Typography variant="body2" fontWeight={700} color={r.valueColor}>
                                                    {r.value}
                                                </Typography>
                                            </Box>
                                            <Stack direction="row" gap={0.5} alignItems="center" mt={1}>
                                                <CalendarMonth sx={{ fontSize: 14, color: "text.secondary" }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {r.time}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Page>
    );
};

const FootItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <Stack direction="row" gap={0.5} alignItems="center">
        <Box sx={{ color: GREEN, display: "flex" }}>{icon}</Box>
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
        <Typography variant="caption" fontWeight={700}>
            {value}
        </Typography>
    </Stack>
);

export default Export;
