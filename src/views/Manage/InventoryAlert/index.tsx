import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import {
    AddShoppingCart,
    ArrowForward,
    ErrorOutline,
    FilterAltOutlined,
    HistoryOutlined,
    InventoryOutlined,
    MapOutlined,
    NotificationsActive,
    Search,
    Send,
    ShoppingCartOutlined,
    SyncOutlined,
    TrendingUp,
    TuneOutlined,
    UploadFileOutlined,
    Visibility,
    WarehouseOutlined,
    WarningAmber,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Divider,
    IconButton,
    InputAdornment,
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
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const GREEN = COLORS.BUTTON;
const GREEN_LIGHT = "#6C9A4B";
const ORANGE = "#E7A22F";
const BLUE = "#2F6FE7";
const RED = "#BA1B1C";

/* ------------------------- dữ liệu mẫu ------------------------- */
const kpis = [
    { icon: <WarehouseOutlined />, title: "TỔNG GIÁ TRỊ TỒN KHO", value: "1,845,200,000", unit: "VNĐ", foot: "+4.2% so với tháng trước (1,770,800,000đ)", footColor: COLORS.TEXT, footIcon: <TrendingUp sx={{ fontSize: 15 }} />, accent: GREEN, bg: "#fff" },
    { icon: <InventoryOutlined />, title: "TỔNG DANH MỤC VẬT TƯ", value: "348", unit: "Mã SKU", foot: "Có hàng: 322 • Mức tối ưu: 280", footColor: "text.secondary", accent: GREEN, bg: "#fff" },
    { icon: <WarningAmber />, title: "CẢNH BÁO SẮP HẾT", value: "18", unit: "Loại vật tư", foot: "Dưới mức an toàn (< Min) • cần xem xét đặt hàng", footColor: ORANGE, accent: ORANGE, bg: "#FFF8EC" },
    { icon: <ErrorOutline />, title: "BÁO ĐỘNG CẠN KIỆT", value: "04", unit: "Mặt hàng", foot: "Tồn kho = 0 (Trọng yếu) • Đình trệ sản xuất", footColor: RED, accent: RED, bg: "#FDEDED" },
];

const donut = [
    { name: "Gỗ tự nhiên", value: 52, color: GREEN },
    { name: "Gỗ công nghiệp", value: 26, color: GREEN_LIGHT },
    { name: "Kim khí & Phụ kiện", value: 14, color: BLUE },
    { name: "Hóa chất, Sơn & Keo", value: 8, color: ORANGE },
];

const categories = [
    { color: GREEN, title: "Gỗ tự nhiên (Sồi, Gõ, Tần Bì, Óc Chó)", value: "959,504,000 đ", desc: "36.4 m³ khối - Giá trị cao, lưu chuyển dài hạn", pct: "52% tổng vốn" },
    { color: GREEN_LIGHT, title: "Gỗ công nghiệp (MDF, HDF, Plywood, OSB)", value: "479,752,000 đ", desc: "840 tấm các quy cách 12mm, 17mm, ván ẩm", pct: "26% tổng vốn" },
    { color: BLUE, title: "Kim khí & Phụ kiện (Ray trượt, Bản lề, Khóa)", value: "258,328,000 đ", desc: "Hafele, Blum, Eurogold chuẩn module tủ", pct: "14% tổng vốn" },
    { color: ORANGE, title: "Hóa chất, Sơn PU & Keo cồn công nghiệp", value: "147,616,000 đ", desc: "Dung môi, tinh màu, lót PU, keo PUR ép cạnh", pct: "8% tổng vốn" },
];

interface Row {
    code: string;
    dot: string;
    name: string;
    spec: string;
    cat: string;
    catColor: string;
    stock: string;
    stockUnit: string;
    stockColor: string;
    range: string;
    statusText: string;
    statusColor: string;
    ratio: string;
    pct: number;
    value: string;
    turnover: string;
    critical: boolean;
    highlight?: string;
}

const rows: Row[] = [
    { code: "GO-ASH-20", dot: RED, name: "Gỗ Tấn Bì (Ash) Nhập Bắc Mỹ", spec: "Dày 20mm x Rộng 150-250mm x Dài 2.4-3.2m, Sấy KD 10-12%", cat: "Gỗ Tự Nhiên", catColor: GREEN, stock: "0.20", stockUnit: "m²", stockColor: RED, range: "3.00 - 8.00 m³", statusText: "2.5% Mức Min (Báo Động)", statusColor: RED, ratio: "0.2/8.0 m³", pct: 2.5, value: "3,600,000 đ", turnover: "6.4 vòng/năm", critical: true },
    { code: "PK-RAY-HAF", dot: RED, name: "Ray âm giảm chấn Hafele 450mm", spec: "Mã 433.02.054, cơ chế đóng êm Soft-closing, tải 30kg", cat: "Phụ Kiện", catColor: BLUE, stock: "0", stockUnit: "bộ", stockColor: RED, range: "20 - 60 bộ", statusText: "0% (Hết hàng hoàn toàn)", statusColor: RED, ratio: "0/60 bộ", pct: 0, value: "0 đ", turnover: "8.2 vòng/năm", critical: true },
    { code: "HC-KEO-AB", dot: ORANGE, name: "Keo Sữa Ghép Gỗ AB 2 Thành Phần", spec: "Bộ can 20kg chuyên dụng ép cao tần & cảo tay lực ép cao", cat: "Sơn & Keo", catColor: ORANGE, stock: "2", stockUnit: "can", stockColor: ORANGE, range: "6 - 15 can", statusText: "13.3% (Sắp cạn kiệt)", statusColor: ORANGE, ratio: "2/15 can", pct: 13.3, value: "2,840,000 đ", turnover: "12.1 vòng/năm", critical: true, highlight: "#FFF8EC" },
    { code: "GO-OAK-35", dot: GREEN, name: "Gỗ Sồi Trắng (White Oak) FAS", spec: "Dày 35mm x Bản rộng > 200mm, sấy đạt 8-10%, hàng loại 1", cat: "Gỗ Tự Nhiên", catColor: GREEN, stock: "12.80", stockUnit: "m²", stockColor: GREEN, range: "5.00 - 15.00 m³", statusText: "85.3% (Tồn tối ưu)", statusColor: COLORS.TEXT, ratio: "12.8/15.0 m³", pct: 85.3, value: "345,600,000 đ", turnover: "3.8 vòng/năm", critical: false },
    { code: "VAN-MDF-17M", dot: GREEN, name: "Ván MDF Chống Ẩm An Cường 17mm", spec: "Quy cách 1220 x 2440mm, lõi xanh HMR, phủ Melamine mã MS 388 EV", cat: "Ván CN", catColor: GREEN_LIGHT, stock: "185", stockUnit: "tấm", stockColor: GREEN, range: "50 - 250 tấm", statusText: "74.0% (Tồn kho ổn định)", statusColor: COLORS.TEXT, ratio: "195/250 tấm", pct: 74, value: "107,300,000 đ", turnover: "7.5 vòng/năm", critical: false },
    { code: "HC-SON-PU01", dot: GREEN, name: "Sơn Lót PU Gỗ Oseven 2K", spec: "Thùng 16kg, độ phủ cao, chống ố vàng cho gỗ sáng màu", cat: "Sơn & Keo", catColor: ORANGE, stock: "14", stockUnit: "thùng", stockColor: GREEN, range: "8 - 25 thùng", statusText: "56.0% (Đủ định mức)", statusColor: COLORS.TEXT, ratio: "14/25 thùng", pct: 56, value: "18,900,000 đ", turnover: "9.4 vòng/năm", critical: false },
    { code: "PK-BLE-BLUM", dot: GREEN, name: "Bản Lề Giảm Chấn Blum Clip Top 110°", spec: "Inox 304 nguyên khối mạ niken, kèm đế tăng chỉnh 3 chiều", cat: "Phụ Kiện", catColor: BLUE, stock: "240", stockUnit: "cái", stockColor: GREEN, range: "100 - 400 cái", statusText: "60.0% (Tồn kho chuẩn)", statusColor: COLORS.TEXT, ratio: "240/400 cái", pct: 60, value: "15,600,000 đ", turnover: "11.0 vòng/năm", critical: false },
];

const suggestions = [
    { level: "ƯU TIÊN 1", levelColor: RED, ncc: "NCC: Gỗ Tây Nguyên", title: "Nhập gấp Gỗ Tấn Bì (Ash) 20mm", desc: "Khuyến nghị mua bù 4.5 m³ để vừa hoàn tất ĐH-108 vừa tái tạo định mức đệm cho tuần sau.", value: "~ 81,000,000 đ" },
    { level: "ƯU TIÊN 2", levelColor: ORANGE, ncc: "NCC: Hafele VN", title: "Nhập bù Ray âm giảm chấn 450mm", desc: "Hiện hết hàng hoàn toàn. Khuyến nghị đặt ngay 50 bộ để lắp ráp cụm tủ bếp căn hộ Vinhomes.", value: "~ 14,250,000 đ" },
    { level: "ƯU TIÊN 3", levelColor: GREEN, ncc: "NCC: Hóa Chất Mộc Tín", title: "Đặt 10 can Keo Sữa Ghép Gỗ AB", desc: "Tối ưu chi phí vận chuyển chung nhẫn từ kho Hóc Môn. Đảm bảo dây chuyền ép cạnh và mặt bàn không ngắt quãng.", value: "~ 14,200,000 đ" },
];

const tabs = ["Tất cả (348)", "Gỗ tự nhiên", "Ván CN", "Phụ kiện", "Sơn & Keo"];

const InventoryAlert = () => {
    return (
        <Page title="Tồn kho & Cảnh báo">
            <Box bgcolor="#F4F8EF" pb={4}>
                {/* ----------------- header ----------------- */}
                <Box px={{ xs: 2, md: 3 }} pt={3}>
                    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" gap={2}>
                        <Box>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
                                <WarehouseOutlined sx={{ fontSize: 16, color: GREEN }} />
                                <Typography variant="caption" fontWeight={700} color="text.secondary">
                                    PHÂN HỆ KHO & GIÁM SÁT CUNG ỨNG XƯỞNG MỘC
                                </Typography>
                                <Dot color={GREEN} />
                                <Typography variant="caption" color={GREEN}>
                                    Đồng bộ trực tiếp
                                </Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.5rem", md: "1.9rem" } }}>
                                Báo cáo Tồn Kho Thời Gian Thực & Cảnh Báo Thiếu Hụt Vật Tư
                            </Typography>
                            <Typography variant="body2" color="text.secondary" maxWidth={640}>
                                Theo dõi biến động gỗ khối, ván phủ Melamine, phụ kiện kim khí và hóa chất sơn phủ. Tự động kích hoạt định mức mua bù theo tiến độ xưởng.
                            </Typography>
                        </Box>
                        <Stack gap={1} width={{ xs: "100%", md: "auto" }}>
                            <Stack direction="row" flexWrap="wrap" gap={1} justifyContent={{ md: "flex-end" }}>
                                <Button size="small" variant="outlined" startIcon={<SyncOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                    Cập nhật số liệu
                                </Button>
                                <Button size="small" variant="outlined" startIcon={<TuneOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                    Cấu hình định mức tối thiểu
                                </Button>
                            </Stack>
                            <Button variant="contained" startIcon={<UploadFileOutlined />} sx={{ bgcolor: GREEN, alignSelf: { md: "flex-end" } }}>
                                Xuất file kiểm kê Excel
                            </Button>
                        </Stack>
                    </Box>
                </Box>

                {/* ----------------- KPI ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        {kpis.map((k, i) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
                                <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%", bgcolor: k.bg, border: `1px solid ${k.accent}22` }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                            <Typography variant="caption" fontWeight={700} color="text.secondary">
                                                {k.title}
                                            </Typography>
                                            <Box sx={{ color: k.accent, display: "flex" }}>{k.icon}</Box>
                                        </Box>
                                        <Box mt={1} display="flex" alignItems="baseline" gap={0.5} flexWrap="wrap">
                                            <Typography variant="h5" fontWeight={700} color={k.accent === GREEN ? "inherit" : k.accent}>
                                                {k.value}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {k.unit}
                                            </Typography>
                                        </Box>
                                        <Stack direction="row" gap={0.5} alignItems="center" mt={1}>
                                            {k.footIcon && <Box sx={{ color: k.footColor, display: "flex" }}>{k.footIcon}</Box>}
                                            <Typography variant="caption" color={k.footColor} fontWeight={600}>
                                                {k.foot}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* ----------------- alert center ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1}>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <NotificationsActive sx={{ color: RED }} />
                                    <Typography variant="subtitle1" fontWeight={700}>
                                        Trung Tâm Điều Phối Cảnh Báo Khẩn (Alert Center)
                                    </Typography>
                                </Stack>
                                <Typography variant="caption" color={RED} fontWeight={600}>
                                    2 thông báo cần hành động ngay
                                </Typography>
                            </Box>

                            <Grid container spacing={2} mt={0.5}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <AlertCard
                                        severe
                                        tag="KHẨN CẤP - MÃ VT: GO-ASH-20"
                                        meta="Tồn: 0.2 m³ / Min: 3.0 m³"
                                        title="Gỗ Tấn Bì (Ash) 20mm chỉ còn 0.2 m³ (dưới mức tối thiểu 3.0 m³)"
                                        desc="Tác động trực tiếp: Đơn hàng phòng ngủ Tân Bình ĐH-108 đang chờ cắt thị cấp phôi để ghép mộng trong sáng mai."
                                        footLeft="Báo động 18 phút trước"
                                        action="Tạo đề xuất mua hàng ngay"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <AlertCard
                                        tag="CẢNH BÁO - MÃ VT: HC-KEO-AB"
                                        meta="Tồn: 2 can / Min: 6 can"
                                        title="Keo sữa ghép gỗ AB 2 thành phần chỉ còn 2 can (Mức min: 6 can)"
                                        desc="Nhà cung cấp Hóa Chất Mộc Tín dự kiến giao trong 48 giờ. Cần liên hệ phòng Thu Mua giữ đơn đặt hàng dự phòng."
                                        footLeft="NCC: Hóa Chất Mộc Tín"
                                        action="Gửi thông báo Thu Mua"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>

                {/* ----------------- cơ cấu + kho bãi ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1}>
                                        <Box>
                                            <Typography variant="caption" fontWeight={700} color="text.secondary">
                                                CƠ CẤU DANH MỤC ĐẦU TƯ
                                            </Typography>
                                            <Typography variant="h6" fontWeight={700}>
                                                Phân Bổ Giá Trị Tồn Kho Theo Phân Khúc Vật Tư
                                            </Typography>
                                        </Box>
                                        <Chip size="small" label="Tổng: 1.845 Tỷ VNĐ" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                    </Box>

                                    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems="center" gap={3} mt={2}>
                                        <Box position="relative" width={180} height={180} flexShrink={0}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={donut} dataKey="value" cx="50%" cy="50%" innerRadius={62} outerRadius={85} startAngle={90} endAngle={-270} paddingAngle={1}>
                                                        {donut.map((d, i) => (
                                                            <Cell key={i} fill={d.color} />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <Box position="absolute" top="50%" left="50%" sx={{ transform: "translate(-50%, -50%)" }} textAlign="center">
                                                <Typography variant="h5" fontWeight={700}>
                                                    52%
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Gỗ Tự Nhiên
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Stack gap={1.5} flexGrow={1} width="100%">
                                            {categories.map((c, i) => (
                                                <Box key={i} display="flex" gap={1}>
                                                    <Box component="span" sx={{ width: 10, height: 10, borderRadius: "2px", bgcolor: c.color, mt: 0.6, flexShrink: 0 }} />
                                                    <Box flexGrow={1}>
                                                        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={0.5}>
                                                            <Typography variant="body2" fontWeight={600}>
                                                                {c.title}
                                                            </Typography>
                                                            <Typography variant="body2" fontWeight={700}>
                                                                {c.value}
                                                            </Typography>
                                                        </Box>
                                                        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={0.5}>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {c.desc}
                                                            </Typography>
                                                            <Typography variant="caption" color={GREEN} fontWeight={600}>
                                                                {c.pct}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Box mt={2} p={1.5} borderRadius={1.5} bgcolor={COLORS.BASIC} display="flex" flexWrap="wrap" justifyContent="space-between" gap={1}>
                                        <Typography variant="caption" color="text.secondary">
                                            Tỷ lệ an toàn thanh khoản vật tư xưởng:{" "}
                                            <Typography component="span" variant="caption" fontWeight={700} color={GREEN}>
                                                Rất tốt (84/100)
                                            </Typography>
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Hạn mức lưu kho tối đa: 2,500,000,000 VNĐ
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 5 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1}>
                                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                                            KHO BÃI THỰC TẾ
                                        </Typography>
                                        <Chip size="small" label="Khu vực Tân Bình" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                    </Box>
                                    <Typography variant="h6" fontWeight={700}>
                                        Kiểm Soát Mặt Bằng Lưu Kho
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Hiện trạng tải trọng giàn kệ gỗ khối & khu vực pallet cách ẩm.
                                    </Typography>

                                    <Box mt={1.5} position="relative" height={130} borderRadius={2} bgcolor={COLORS.BASIC} display="flex" alignItems="center" justifyContent="center" color={GREEN}>
                                        <WarehouseOutlined sx={{ fontSize: 40 }} />
                                        <Box position="absolute" bottom={8} left={8} right={8} p={1} borderRadius={1} sx={{ bgcolor: "rgba(0,0,0,0.55)" }}>
                                            <Typography variant="caption" fontWeight={700} color="#fff" display="block">
                                                Khu Vực A - Bãi Phối Gỗ Xẻ Khối
                                            </Typography>
                                            <Typography variant="caption" color="#eee">
                                                Độ ẩm trung bình (MC) 11.2% (Đạt chuẩn)
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box mt={2}>
                                        <CapacityBar label="Sức chứa giá đỡ ván MDF" note="78% (624/800 tấm)" pct={78} color={GREEN} />
                                        <Box mt={1.5}>
                                            <CapacityBar label="Khu vực phòng pha sơn PU (An toàn PCCC)" note="91% (Gần đầy)" pct={91} color={ORANGE} />
                                        </Box>
                                    </Box>

                                    <Button fullWidth variant="outlined" startIcon={<MapOutlined />} sx={{ mt: 2, border: "1px solid #ddd", color: "#333" }}>
                                        Sơ đồ định vị pallet xưởng
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* ----------------- bảng tồn kho ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" gap={2}>
                                <TextField
                                    size="small"
                                    placeholder="Lọc theo mã VT, tên gỗ, quy cách..."
                                    sx={{ minWidth: { md: 320 } }}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
                                />
                                <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
                                    <Checkbox size="small" />
                                    <Typography variant="caption" color="text.secondary">
                                        Chỉ hiện mục &lt; Min (18)
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" ml={1}>
                                        Hiển thị 7 của 348 mục
                                    </Typography>
                                </Stack>
                            </Box>

                            <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                                {tabs.map((t, i) => (
                                    <Chip
                                        key={t}
                                        label={t}
                                        onClick={() => {}}
                                        sx={{ bgcolor: i === 0 ? GREEN : COLORS.BASIC, color: i === 0 ? "#fff" : "#333", fontWeight: 600 }}
                                    />
                                ))}
                            </Stack>

                            <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                <Table sx={{ minWidth: 1100 }}>
                                    <TableHead>
                                        <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 11 } }}>
                                            <TableCell>MÃ VT</TableCell>
                                            <TableCell>TÊN VẬT TƯ & QUY CÁCH</TableCell>
                                            <TableCell>PHÂN LOẠI</TableCell>
                                            <TableCell align="right">TỒN THỰC TẾ</TableCell>
                                            <TableCell>ĐỊNH MỨC (MIN - MAX)</TableCell>
                                            <TableCell>TRẠNG THÁI MỨC TỒN</TableCell>
                                            <TableCell align="right">GIÁ TRỊ TỒN</TableCell>
                                            <TableCell align="center">VÒNG QUAY</TableCell>
                                            <TableCell align="center">HÀNH ĐỘNG</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((r) => (
                                            <TableRow key={r.code} hover sx={{ bgcolor: r.highlight }}>
                                                <TableCell>
                                                    <Stack direction="row" gap={0.5} alignItems="center">
                                                        <Dot color={r.dot} />
                                                        <Typography variant="caption" fontWeight={700}>
                                                            {r.code}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 240 }}>
                                                    <Typography variant="body2" fontWeight={700}>
                                                        {r.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {r.spec}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={r.cat} sx={{ bgcolor: COLORS.BASIC, color: r.catColor, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" fontWeight={700} color={r.stockColor}>
                                                        {r.stock}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {r.stockUnit}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="caption">{r.range}</Typography>
                                                </TableCell>
                                                <TableCell sx={{ minWidth: 180 }}>
                                                    <Box display="flex" justifyContent="space-between">
                                                        <Typography variant="caption" fontWeight={600} color={r.statusColor}>
                                                            {r.statusText}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {r.ratio}
                                                        </Typography>
                                                    </Box>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={Math.max(r.pct, 2)}
                                                        sx={{ mt: 0.5, height: 6, borderRadius: 3, bgcolor: "#EEE", "& .MuiLinearProgress-bar": { bgcolor: r.statusColor } }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {r.value}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip size="small" label={r.turnover} sx={{ bgcolor: COLORS.BASIC, color: "#333", fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Stack direction="row" justifyContent="center">
                                                        {r.critical ? (
                                                            <IconButton size="small" sx={{ bgcolor: RED, color: "#fff", "&:hover": { bgcolor: RED } }}>
                                                                <AddShoppingCart fontSize="small" />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton size="small">
                                                                <Visibility fontSize="small" sx={{ color: "text.secondary" }} />
                                                            </IconButton>
                                                        )}
                                                        <IconButton size="small">
                                                            <HistoryOutlined fontSize="small" sx={{ color: "text.secondary" }} />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box mt={2} display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={2}>
                                <Stack direction="row" flexWrap="wrap" gap={2}>
                                    <Typography variant="caption" color="text.secondary">
                                        Hiển thị 1 - 7 trong 348 bản ghi
                                    </Typography>
                                    <LegendItem color={RED} label="Báo động cạn (< Min)" />
                                    <LegendItem color={ORANGE} label="Cận mức sàn" />
                                    <LegendItem color={GREEN} label="Đạt định mức an toàn" />
                                </Stack>
                                <Stack direction="row" gap={0.5} alignItems="center">
                                    <Button size="small" variant="outlined" sx={{ border: "1px solid #ddd", color: "#333" }}>
                                        Trang trước
                                    </Button>
                                    {[1, 2, 3].map((p) => (
                                        <Button key={p} size="small" variant={p === 1 ? "contained" : "outlined"} sx={{ minWidth: 32, bgcolor: p === 1 ? GREEN : "#fff", border: p === 1 ? "none" : "1px solid #ddd", color: p === 1 ? "#fff" : "#333" }}>
                                            {p}
                                        </Button>
                                    ))}
                                    <Typography variant="caption" color="text.secondary">
                                        ...
                                    </Typography>
                                    <Button size="small" variant="outlined" sx={{ minWidth: 32, border: "1px solid #ddd", color: "#333" }}>
                                        50
                                    </Button>
                                    <Button size="small" variant="outlined" sx={{ border: "1px solid #ddd", color: "#333" }}>
                                        Trang sau
                                    </Button>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* ----------------- đề xuất mua bù ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1}>
                                <Box>
                                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                                        TỐI ƯU HÓA NGUỒN VỐN
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700}>
                                        Đề Xuất Mua Bù Kho Tự Động (AI Wood-Stock Forecast)
                                    </Typography>
                                </Box>
                                <Button variant="outlined" startIcon={<Send />} sx={{ border: `1px solid ${GREEN}`, color: GREEN }}>
                                    Gộp tất cả vào Phiếu Dự Trù
                                </Button>
                            </Box>

                            <Grid container spacing={2} mt={0.5}>
                                {suggestions.map((s, i) => (
                                    <Grid size={{ xs: 12, md: 4 }} key={i}>
                                        <Box p={2} borderRadius={2} border="1px solid #eee" height="100%">
                                            <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                                                <Chip size="small" label={s.level} sx={{ bgcolor: `${s.levelColor}1A`, color: s.levelColor, fontWeight: 700 }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {s.ncc}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" fontWeight={700} mt={1}>
                                                {s.title}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {s.desc}
                                            </Typography>
                                            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1} mt={1.5}>
                                                <Typography variant="h6" fontWeight={700} color={GREEN}>
                                                    {s.value}
                                                </Typography>
                                                <Button size="small" variant="contained" endIcon={<ArrowForward />} sx={{ bgcolor: GREEN }}>
                                                    Duyệt mua
                                                </Button>
                                            </Box>
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

/* ------------------------- helpers ------------------------- */
const Dot = ({ color }: { color: string }) => (
    <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color, display: "inline-block", flexShrink: 0 }} />
);

const AlertCard = ({ severe, tag, meta, title, desc, footLeft, action }: { severe?: boolean; tag: string; meta: string; title: string; desc: string; footLeft: string; action: string }) => {
    const color = severe ? RED : ORANGE;
    return (
        <Box p={2} borderRadius={2} bgcolor={severe ? "#FDEDED" : "#FFF8EC"} border={`1px solid ${color}44`} height="100%">
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={1}>
                <Stack direction="row" gap={1} alignItems="center">
                    {severe ? <ErrorOutline sx={{ color, fontSize: 18 }} /> : <WarningAmber sx={{ color, fontSize: 18 }} />}
                    <Chip size="small" label={tag} sx={{ bgcolor: severe ? color : "#fff", color: severe ? "#fff" : color, fontWeight: 700, height: 20 }} />
                </Stack>
                <Typography variant="caption" color="text.secondary">
                    {meta}
                </Typography>
            </Box>
            <Typography variant="body2" fontWeight={700} mt={1}>
                {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {desc}
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1} mt={1.5}>
                <Stack direction="row" gap={0.5} alignItems="center">
                    {severe ? <HistoryOutlined sx={{ fontSize: 14, color: "text.secondary" }} /> : <ShoppingCartOutlined sx={{ fontSize: 14, color: "text.secondary" }} />}
                    <Typography variant="caption" color="text.secondary">
                        {footLeft}
                    </Typography>
                </Stack>
                <Button size="small" variant="contained" startIcon={severe ? <AddShoppingCart /> : <Send />} sx={{ bgcolor: severe ? color : "#fff", color: severe ? "#fff" : color, border: severe ? "none" : `1px solid ${color}`, fontSize: 11 }}>
                    {action}
                </Button>
            </Box>
        </Box>
    );
};

const CapacityBar = ({ label, note, pct, color }: { label: string; note: string; pct: number; color: string }) => (
    <Box>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={0.5}>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="caption" fontWeight={700} color={color}>
                {note}
            </Typography>
        </Box>
        <LinearProgress variant="determinate" value={pct} sx={{ mt: 0.5, height: 8, borderRadius: 4, bgcolor: "#EEE", "& .MuiLinearProgress-bar": { bgcolor: color } }} />
    </Box>
);

const LegendItem = ({ color, label }: { color: string; label: string }) => (
    <Stack direction="row" gap={0.5} alignItems="center">
        <Dot color={color} />
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
    </Stack>
);

export default InventoryAlert;
