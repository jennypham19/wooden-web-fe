import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import {
    AnalyticsOutlined,
    ChevronRight,
    ContentCutOutlined,
    DonutLargeOutlined,
    MonetizationOnOutlined,
    OpenInNew,
    SellOutlined,
    TaskAltOutlined,
    TrendingDown,
    UploadFileOutlined,
    WarningAmber,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    IconButton,
    LinearProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const GREEN = COLORS.BUTTON;
const GREEN_MID = "#4B7A3A";
const GREEN_LIGHT = "#6C9A4B";
const ORANGE = "#E7A22F";
const RED = "#BA1B1C";

/* ------------------------- dữ liệu mẫu ------------------------- */
const kpis = [
    { icon: <MonetizationOnOutlined />, title: "TỔNG DOANH THU ĐƠN ĐANG CHẠY", value: "685,000,000", unit: "đ", footLabel: "Tiến độ quy mô", chip: "4 dự án tại xưởng" },
    { icon: <SellOutlined />, title: "CHI PHÍ VẬT TƯ THỰC XUẤT (COGS)", value: "312,450,000", unit: "đ", footLabel: "Tỷ lệ vật tư / Doanh thu", chip: "45.6% giá trị" },
    { icon: <ContentCutOutlined />, title: "HIỆU SUẤT CẮT XẺ (HAO HỤT BOM)", value: "-2.8%", unit: "", valueColor: GREEN, valueIcon: <TrendingDown sx={{ fontSize: 20 }} />, footLabel: "Độ lệch tiêu hao", chip: "Tiết kiệm +8,920,000 đ" },
    { icon: <DonutLargeOutlined />, title: "BIÊN LỢI NHUẬN GỘP ƯỚC TÍNH", value: "41.5%", unit: "", valueColor: GREEN, footLabel: "Mục tiêu xưởng (>38%)", chip: "Đạt chỉ tiêu (+3.5%)" },
];

interface Item {
    dot: string;
    name: string;
    norm: string;
    value: string;
    delta: string;
    deltaColor: string;
    pct: number;
    barColor: string;
}

const items: Item[] = [
    { dot: GREEN, name: "Gỗ Sồi Mỹ (White Oak 4/4)", norm: "Định mức: 3.85 m³ | Thực: 3.72 m³", value: "78,120,000 đ", delta: "(-1.9M đ)", deltaColor: GREEN, pct: 90, barColor: GREEN },
    { dot: GREEN, name: "MDF Kháng ẩm HMR An Cường 17mm", norm: "Định mức: 42 tấm | Thực: 40 tấm", value: "33,600,000 đ", delta: "(-1.6M đ)", deltaColor: GREEN, pct: 62, barColor: GREEN },
    { dot: GREEN, name: "Bản lề giảm chấn & Ray trượt Hafele", norm: "Định mức: 1 set | Thực: 1 set", value: "19,850,000 đ", delta: "(0.00 đ)", deltaColor: "text.secondary", pct: 40, barColor: GREEN },
    { dot: ORANGE, name: "Sơn lót & Bóng Inchem + Dung môi pha", norm: "Định mức: 12 thùng | Thực: 13 thùng (Hao hụt)", value: "12,750,000 đ", delta: "(+780k đ)", deltaColor: RED, pct: 100, barColor: ORANGE },
];

const donut = [
    { name: "Gỗ xẻ tự nhiên (Sồi, Gõ, Óc chó)", value: 48, color: GREEN },
    { name: "Ván công nghiệp (MDF, HDF, Plywood)", value: 26, color: GREEN_MID },
    { name: "Phụ kiện ray, bản lề, khóa thông minh", value: 16, color: GREEN_LIGHT },
    { name: "Sơn lót Inchem, keo Titebond & PU", value: 10, color: ORANGE },
];

interface OrderRow {
    code: string;
    project: string;
    client: string;
    bom: string;
    real: string;
    diff: string;
    diffPct: string;
    diffColor: string;
    labor: string;
    margin: string;
    marginNote: string;
    marginColor: string;
    stage: string;
    stageBg: string;
    stageColor: string;
}

const orders: OrderRow[] = [
    { code: "DH-2024-105", project: "Penthouse Anh Hoàng • Thảo Điền", client: "Khách: Hoàng Hải Đăng • Q2 TP.HCM", bom: "148,600,000 đ", real: "144,320,000 đ", diff: "-4,280,000 đ", diffPct: "-2.88% (Tiết kiệm)", diffColor: GREEN, labor: "38,500,000 đ", margin: "43.2%", marginNote: "Gia công chuẩn", marginColor: GREEN, stage: "Sơn hoàn thiện PU", stageBg: "#FCEFD6", stageColor: ORANGE },
    { code: "DH-2024-106", project: "Biệt Thự Nam Long Cần Thơ (Gỗ Gõ Đỏ)", client: "Khách: Chị Trúc Linh • Ninh Kiều, Cần Thơ", bom: "105,000,000 đ", real: "108,450,000 đ", diff: "+3,450,000 đ", diffPct: "+3.28% (Vượt định mức)", diffColor: RED, labor: "26,000,000 đ", margin: "38.0%", marginNote: "Hao hụt vân gỗ", marginColor: ORANGE, stage: "Đang đóng khung", stageBg: COLORS.BASIC, stageColor: GREEN },
    { code: "DH-2024-108", project: "Căn Hộ Duplex Vinhomes Central Park", client: "Khách: Anh Minh Khang • Landmark 81", bom: "46,500,000 đ", real: "41,800,000 đ", diff: "-4,700,000 đ", diffPct: "-10.1% (Tận dụng ván)", diffColor: GREEN, labor: "14,200,000 đ", margin: "44.8%", marginNote: "Vượt mục tiêu", marginColor: GREEN, stage: "Đang đóng khung", stageBg: COLORS.BASIC, stageColor: GREEN },
    { code: "DH-2024-102", project: "Set Bàn Trà Gỗ Sồi Tự Nhiên & Ghế Thư Giãn", client: "Khách: Gallery Art Décor • Quận 1", bom: "18,200,000 đ", real: "17,880,000 đ", diff: "-320,000 đ", diffPct: "-1.75% (Tiết kiệm)", diffColor: GREEN, labor: "4,800,000 đ", margin: "42.0%", marginNote: "Đúng dự toán", marginColor: GREEN, stage: "Đã nghiệm thu xưởng", stageBg: COLORS.BASIC, stageColor: GREEN },
];

const FeeOfSupplies = () => {
    return (
        <Page title="Chi phí vật tư">
            <Box bgcolor="#EEF4E7" pb={4}>
                {/* ----------------- header ----------------- */}
                <Box px={{ xs: 2, md: 3 }} pt={3}>
                    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" gap={2}>
                        <Box>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
                                <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: GREEN }} />
                                <Typography variant="caption" fontWeight={700} color="text.secondary">
                                    SẢN XUẤT & ĐƠN HÀNG
                                </Typography>
                                <Typography variant="caption" color="text.secondary">/</Typography>
                                <Typography variant="caption" fontWeight={700} color={GREEN}>
                                    TÍNH GIÁ THÀNH THỰC TẾ (COST ALLOCATION)
                                </Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}>
                                Tổng Hợp Chi Phí Vật Tư & Biên Lợi Nhuận Đơn Hàng
                            </Typography>
                            <Typography variant="body2" color="text.secondary" maxWidth={640}>
                                Hệ thống đối soát tự động giữa định mức kỹ thuật dự toán (BOM) và lượng xuất kho thực tế tại Xưởng Mộc Tân Bình theo từng lệnh gia công gỗ khối, ván công nghiệp & phụ kiện kim khí.
                            </Typography>
                        </Box>
                        <Stack direction="row" flexWrap="wrap" gap={1.5}>
                            <Button variant="outlined" startIcon={<AnalyticsOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #cfe0c2", color: "#333" }}>
                                Phân tích chênh lệch BOM
                            </Button>
                            <Button variant="contained" startIcon={<UploadFileOutlined />} sx={{ bgcolor: GREEN }}>
                                Xuất bảng định mức giá thành Excel
                            </Button>
                        </Stack>
                    </Box>
                </Box>

                {/* ----------------- KPI ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        {kpis.map((k, i) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
                                <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
                                            <Typography variant="caption" fontWeight={700} color="text.secondary">
                                                {k.title}
                                            </Typography>
                                            <Avatar variant="rounded" sx={{ bgcolor: COLORS.BASIC, color: GREEN, width: 34, height: 34, flexShrink: 0 }}>
                                                {k.icon}
                                            </Avatar>
                                        </Box>
                                        <Box mt={1.5} display="flex" alignItems="baseline" gap={0.5}>
                                            <Typography variant="h4" fontWeight={700} color={k.valueColor || "inherit"}>
                                                {k.value}
                                            </Typography>
                                            {k.unit && (
                                                <Typography variant="body2" color="text.secondary">
                                                    {k.unit}
                                                </Typography>
                                            )}
                                            {k.valueIcon && <Box sx={{ color: k.valueColor, display: "flex" }}>{k.valueIcon}</Box>}
                                        </Box>
                                        <Box mt={1.5} display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1}>
                                            <Typography variant="caption" color="text.secondary">
                                                {k.footLabel}
                                            </Typography>
                                            <Chip size="small" label={k.chip} sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* ----------------- chi tiết đơn + cơ cấu ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        {/* order detail */}
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1.5}>
                                        <Box display="flex" gap={1.5}>
                                            <Avatar variant="rounded" sx={{ bgcolor: "#1B2E16", width: 46, height: 46, fontSize: 10, textAlign: "center", lineHeight: 1.1 }}>
                                                DH-2024-105
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6" fontWeight={700}>
                                                    Nội Thất Penthouse Anh Hoàng • Thảo Điền Q2
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Quy cách: Gỗ Sồi Mỹ xẻ sấy FAS, MDF EMR chống ẩm An Cường phủ Melamine, Phụ kiện Hafele cao cấp.
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Chip label="● Giai đoạn: Sơn hoàn thiện PU" sx={{ bgcolor: "#FCEFD6", color: ORANGE, fontWeight: 600, flexShrink: 0, alignSelf: "flex-start" }} />
                                    </Box>

                                    {/* 3 stats */}
                                    <Grid container spacing={2} mt={1} p={2} bgcolor="#FAFAF7" borderRadius={2}>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Typography variant="caption" color="text.secondary">Dự toán định mức (BOM):</Typography>
                                            <Typography variant="h6" fontWeight={700}>148,600,000 đ</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Typography variant="caption" color="text.secondary">Thực xuất kho xưởng:</Typography>
                                            <Typography variant="h6" fontWeight={700}>144,320,000 đ</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Typography variant="caption" color="text.secondary">Chênh lệch chi phí:</Typography>
                                            <Typography variant="h6" fontWeight={700} color={GREEN}>-4,280,000 đ <Typography component="span" variant="caption">(-2.88%)</Typography></Typography>
                                        </Grid>
                                    </Grid>

                                    {/* bóc tách */}
                                    <Box display="flex" justifyContent="space-between" mt={2.5} mb={1}>
                                        <Typography variant="caption" fontWeight={700} color="text.secondary">HẠNG MỤC BÓC TÁCH VẬT TƯ</Typography>
                                        <Typography variant="caption" fontWeight={700} color="text.secondary">TỶ TRỌNG THỰC / DỰ TOÁN</Typography>
                                    </Box>
                                    <Stack gap={2}>
                                        {items.map((it, i) => (
                                            <Box key={i}>
                                                <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={1}>
                                                    <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
                                                        <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: it.dot }} />
                                                        <Typography variant="body2" fontWeight={600}>{it.name}</Typography>
                                                        <Typography variant="caption" color="text.secondary">{it.norm}</Typography>
                                                    </Stack>
                                                    <Box display="flex" gap={1} alignItems="baseline">
                                                        <Typography variant="body2" fontWeight={700}>{it.value}</Typography>
                                                        <Typography variant="caption" color={it.deltaColor}>{it.delta}</Typography>
                                                    </Box>
                                                </Box>
                                                <LinearProgress variant="determinate" value={it.pct} sx={{ mt: 0.8, height: 6, borderRadius: 3, bgcolor: "#EEE", "& .MuiLinearProgress-bar": { bgcolor: it.barColor } }} />
                                            </Box>
                                        ))}
                                    </Stack>

                                    {/* footer */}
                                    <Box mt={2.5} p={1.5} borderRadius={1.5} bgcolor={COLORS.BASIC} display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={1}>
                                        <Stack direction="row" gap={1} alignItems="flex-start">
                                            <TaskAltOutlined sx={{ fontSize: 18, color: GREEN, mt: 0.2 }} />
                                            <Typography variant="caption" color="text.secondary">
                                                <b>Quản đốc xác nhận:</b> Tối ưu hóa cưa cắt CNC giúp giảm 2 tấm ván nguyên so với phác thảo ban đầu.
                                            </Typography>
                                        </Stack>
                                        <Button size="small" endIcon={<ChevronRight />} sx={{ color: GREEN, fontWeight: 700, flexShrink: 0 }}>
                                            Xem phiếu xuất kho chi tiết
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* cơ cấu toàn xưởng */}
                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" fontWeight={700}>Cơ Cấu Vật Tư Toàn Xưởng</Typography>
                                        <Chip size="small" label="T10/2024" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Phân bổ tỷ trọng chi phí nguyên vật liệu đầu vào trên tất cả các đơn hàng đang triển khai.
                                    </Typography>

                                    <Box position="relative" width="100%" height={200} mt={1}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={donut} dataKey="value" cx="50%" cy="50%" innerRadius={68} outerRadius={92} startAngle={90} endAngle={-270} paddingAngle={1}>
                                                    {donut.map((d, i) => (
                                                        <Cell key={i} fill={d.color} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <Box position="absolute" top="50%" left="50%" sx={{ transform: "translate(-50%, -50%)" }} textAlign="center">
                                            <Typography variant="h5" fontWeight={700}>312.4M</Typography>
                                            <Typography variant="caption" color="text.secondary">Chi phí thực</Typography>
                                        </Box>
                                    </Box>

                                    <Stack gap={1.2} mt={1}>
                                        {donut.map((d, i) => (
                                            <Box key={i} display="flex" justifyContent="space-between" alignItems="center">
                                                <Stack direction="row" gap={1} alignItems="center">
                                                    <Box component="span" sx={{ width: 10, height: 10, borderRadius: "2px", bgcolor: d.color }} />
                                                    <Typography variant="caption">{d.name}</Typography>
                                                </Stack>
                                                <Typography variant="body2" fontWeight={700}>{d.value}%</Typography>
                                            </Box>
                                        ))}
                                    </Stack>

                                    <Box mt={2} p={1.5} borderRadius={1.5} bgcolor={COLORS.BASIC}>
                                        <Typography variant="caption" color="text.secondary">
                                            💡 <b>Lưu ý nhập lô:</b> Giá gỗ Óc Chó xẻ sấy FAS dự kiến tăng nhẹ 3.5% vào đầu tháng sau. Bộ phận thu mua cân nhắc chốt trước cho hợp đồng Căn hộ Duplex.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* ----------------- bảng theo dõi ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={1.5}>
                                <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
                                    <Typography variant="h6" fontWeight={700}>Bảng Theo Dõi Chi Phí & Lợi Nhuận Từng Đơn Hàng</Typography>
                                    <Chip size="small" label="Tổng 4 dự án sản xuất" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                </Stack>
                                <Chip variant="outlined" label="▼ Tất cả trạng thái gia công" sx={{ bgcolor: "#fff" }} />
                            </Box>

                            <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                <Table sx={{ minWidth: 1100 }}>
                                    <TableHead>
                                        <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 11 } }}>
                                            <TableCell>MÃ ĐH</TableCell>
                                            <TableCell>CÔNG TRÌNH & KHÁCH HÀNG</TableCell>
                                            <TableCell align="right">DỰ TOÁN BOM</TableCell>
                                            <TableCell align="right">THỰC XUẤT KHO</TableCell>
                                            <TableCell align="right">CHÊNH LỆCH (VNĐ / %)</TableCell>
                                            <TableCell align="right">NHÂN CÔNG DỰ KIẾN</TableCell>
                                            <TableCell align="center">BIÊN LỢI NHUẬN GỘP</TableCell>
                                            <TableCell align="center">TIẾN ĐỘ XƯỞNG</TableCell>
                                            <TableCell align="center">CHI TIẾT</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.map((o) => (
                                            <TableRow key={o.code} hover>
                                                <TableCell>
                                                    <Typography variant="caption" fontWeight={700}>{o.code}</Typography>
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 240 }}>
                                                    <Typography variant="body2" fontWeight={700}>{o.project}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{o.client}</Typography>
                                                </TableCell>
                                                <TableCell align="right">{o.bom}</TableCell>
                                                <TableCell align="right">{o.real}</TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" fontWeight={700} color={o.diffColor}>{o.diff}</Typography>
                                                    <Typography variant="caption" color={o.diffColor}>{o.diffPct}</Typography>
                                                </TableCell>
                                                <TableCell align="right">{o.labor}</TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" fontWeight={700} color={o.marginColor}>{o.margin}</Typography>
                                                    <Typography variant="caption" color={o.marginColor}>{o.marginNote}</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip size="small" label={o.stage} sx={{ bgcolor: o.stageBg, color: o.stageColor, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                                        <OpenInNew fontSize="small" sx={{ color: GREEN }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {/* total */}
                                        <TableRow sx={{ "& td": { bgcolor: "#FAFAF7", borderTop: "2px solid #e0e0e0" } }}>
                                            <TableCell colSpan={2}>
                                                <Typography variant="body2" fontWeight={700}>TỔNG CỘNG LŨY KẾ 4 ĐƠN HÀNG:</Typography>
                                            </TableCell>
                                            <TableCell align="right"><Typography variant="body2" fontWeight={700}>318,300,000 đ</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" fontWeight={700}>312,450,000 đ</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" fontWeight={700} color={GREEN}>-5,850,000 đ (-1.84%)</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" fontWeight={700}>83,500,000 đ</Typography></TableCell>
                                            <TableCell align="center"><Typography variant="body2" fontWeight={700} color={GREEN}>41.5% (TB)</Typography></TableCell>
                                            <TableCell align="center" colSpan={2}><Typography variant="caption" color="text.secondary">Hoàn thành đối soát BOM</Typography></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box mt={2} display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1.5}>
                                <Typography variant="caption" color="text.secondary">
                                    Hiển thị 4 trên 4 đơn hàng gia công • Cập nhật tự động lúc: 15:42 Hôm nay
                                </Typography>
                                <Stack direction="row" gap={0.5} alignItems="center">
                                    <Button size="small" variant="outlined" sx={{ border: "1px solid #ddd", color: "#333" }}>Trước</Button>
                                    <Button size="small" variant="contained" sx={{ minWidth: 32, bgcolor: GREEN }}>1</Button>
                                    <Button size="small" variant="outlined" sx={{ border: "1px solid #ddd", color: "#333" }}>Sau</Button>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* ----------------- cảnh báo ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1, bgcolor: "#FFF8EC", border: `1px solid ${ORANGE}44` }}>
                        <CardContent>
                            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={2}>
                                <Stack direction="row" gap={1.5} alignItems="flex-start">
                                    <WarningAmber sx={{ color: ORANGE }} />
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={700}>
                                            Cảnh Báo Chênh Lệch Vật Tư Cần Phê Duyệt: Đơn Hàng DH-2024-106
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Đơn Biệt thự Nam Long đã vượt +3.28% định mức gỗ Gõ Đỏ (do mắt chết và vân gỗ đầu cọc không đồng đều phải loại phôi). Cần ký duyệt phiếu xuất vật tư bù hao hụt để cập nhật lại giá thành xuất xưởng.
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" flexWrap="wrap" gap={1} flexShrink={0}>
                                    <Button variant="outlined" sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                        Xem biên bản hao hụt
                                    </Button>
                                    <Button variant="contained" sx={{ bgcolor: GREEN }}>
                                        Ký duyệt bù vật tư
                                    </Button>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Page>
    );
};

export default FeeOfSupplies;
