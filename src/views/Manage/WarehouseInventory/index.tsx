import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import {
    AccountBalanceWalletOutlined,
    AddCircleOutline,
    BalanceOutlined,
    ChecklistRtlOutlined,
    DescriptionOutlined,
    DownloadOutlined,
    EditOutlined,
    FilterAltOutlined,
    GridViewOutlined,
    InfoOutlined,
    LockOutlined,
    PrintOutlined,
    QrCodeScanner,
    Search,
    Visibility,
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

const GREEN = COLORS.BUTTON;
const ORANGE = "#E7A22F";
const BLUE = "#2F6FE7";
const RED = "#BA1B1C";

/* ------------------------- dữ liệu mẫu ------------------------- */
const kpis = [
    { label: "KỲ THÁNG 10/2024", title: "Tổng Đợt Kiểm Kê", icon: <GridViewOutlined />, value: "04", unit: "đợt trong tháng", footLeft: "● 3 Hoàn tất", footLeftColor: GREEN, footRight: "● 1 Đang đếm", footRightColor: ORANGE },
    { label: "BAO PHỦ DANH MỤC", title: "SKU Đã Kiểm Tra", icon: <ChecklistRtlOutlined />, value: "148", unit: "/ 148 mã SKU", progress: 100 },
    { label: "CHỈ SỐ SAI LỆCH", title: "Đối Soát Mã Vật Tư", icon: <BalanceOutlined />, value: "142", unit: "Khớp tuyệt đối", footLeft: "⊞ +4 Thừa phôi", footLeftColor: BLUE, footRight: "⊟ -2 Hao hụt mộc", footRightColor: RED },
    { label: "TÀI SẢN & GIÁ TRỊ", title: "Chênh Lệch Định Giá", icon: <AccountBalanceWalletOutlined />, value: "+2.150.000", unit: "VNĐ", valueColor: GREEN, footLeft: "Sai lệch 0.05%", footLeftColor: "text.secondary", footRight: "Chuẩn an toàn < 0.5%", footRightColor: GREEN },
];

const tabs = [
    { label: "Tất cả phiếu kiểm kê (12)", active: true },
    { label: "Đang kiểm đếm ● (1)" },
    { label: "Chờ phê duyệt điều chỉnh (2)" },
    { label: "Đã chốt số & Cân đối kho (9)" },
];

interface Session {
    code: string;
    name: string;
    purpose: string;
    warehouse: string;
    date: string;
    members: string[];
    council: string;
    lines: string;
    match: string;
    matchColor: string;
    status: string;
    statusColor: string;
    statusBg: string;
    action: "edit" | "view" | "approve";
}

const sessions: Session[] = [
    { code: "KKK-202410-04", name: "Kiểm kê đột xuất - Phụ kiện Blum & Hafele tủ áo", purpose: "Phục vụ dự án Khách sạn Indochine Heritage (LSX-105)", warehouse: "Kho Ngũ Kim K2", date: "24/10/2024", members: ["NV", "TH", "TĐ"], council: "3 người", lines: "28 mã", match: "92.8%", matchColor: ORANGE, status: "● Đang kiểm đếm", statusColor: ORANGE, statusBg: "#FCEFD6", action: "edit" },
    { code: "KKK-202410-03", name: "Kiểm kê định kỳ tháng 10 - Kho phôi gỗ sồi & teak", purpose: "Kiểm kê gỗ hộp xẻ sấy tiêu chuẩn FAS và phôi ghép thanh", warehouse: "Kho Gỗ Nguyên Liệu K1", date: "20/10/2024", members: ["TĐ", "HL"], council: "Thủ kho + Quản đốc", lines: "54 mã", match: "98.5%", matchColor: GREEN, status: "✓ Đã cân đối kho", statusColor: GREEN, statusBg: COLORS.BASIC, action: "view" },
    { code: "KKK-202410-02", name: "Kiểm kê phân xưởng hóa chất & keo dán PUR", purpose: "Sơn PU lót/bóng, dung môi Butyl, keo sữa Titebond, chất cứng", warehouse: "Kho Sơn & Keo K3", date: "15/10/2024", members: ["LM", "TH"], council: "Kế toán + Trưởng sơn", lines: "36 mã", match: "100%", matchColor: GREEN, status: "◷ Chờ duyệt điều chỉnh", statusColor: ORANGE, statusBg: "#FCEFD6", action: "approve" },
    { code: "KKK-202410-01", name: "Kiểm kê đầu kỳ phôi ván công nghiệp MDF & Plywood", purpose: "Quy cách 1220x2440mm từ 9mm đến 25mm phủ Melamine & Veneer", warehouse: "Kho Tấm Nhân Tạo K1-B", date: "02/10/2024", members: ["NV", "TĐ"], council: "Ban kiểm kê quý", lines: "30 mã", match: "100%", matchColor: GREEN, status: "✓ Đã cân đối kho", statusColor: GREEN, statusBg: COLORS.BASIC, action: "view" },
];

interface Reconcile {
    code: string;
    name: string;
    book: string;
    bookUnit: string;
    real: string;
    realUnit: string;
    diff: string;
    diffColor: string;
    reason: string;
    reasonColor: string;
    status: string;
    statusColor: string;
    statusBg: string;
}

const reconciles: Reconcile[] = [
    { code: "VT-GO-001", name: "Gỗ Sồi Trắng Mỹ 4/4 (White Oak FAS)", book: "18.5", bookUnit: "m³", real: "18.5", realUnit: "m³", diff: "0.0 m³", diffColor: GREEN, reason: "Khớp kiện xếp pallet lô nhập khẩu tháng 09", reasonColor: "text.secondary", status: "Khớp 100%", statusColor: GREEN, statusBg: COLORS.BASIC },
    { code: "PK-BLUM-110", name: "Bản lề Blum Clip Top 110° Giảm chấn", book: "85", bookUnit: "cái", real: "83", realUnit: "cái", diff: "-2 cái", diffColor: RED, reason: "Hao hụt thử mẫu cánh tủ LSX-105 (chưa xuất bổ sung)", reasonColor: RED, status: "Thiếu (-2)", statusColor: RED, statusBg: "#FBE3E3" },
    { code: "PLY-MLM-18", name: "Ván Plywood Phủ Melamine Trắng 18mm", book: "60", bookUnit: "tấm", real: "61", realUnit: "tấm", diff: "+1 tấm", diffColor: BLUE, reason: "Tổ mộc 1 trả lại phôi nguyên chưa lập phiếu hoàn kho", reasonColor: "text.secondary", status: "Thừa (+1)", statusColor: BLUE, statusBg: "#E3EDFB" },
    { code: "KEO-TB-03", name: "Keo Dán Gỗ Kháng Nước Titebond III Ultimate (1 Gallon)", book: "20", bookUnit: "bình", real: "20", realUnit: "bình", diff: "0 bình", diffColor: GREEN, reason: "Nguyên tem niêm phong kho hóa chất", reasonColor: "text.secondary", status: "Khớp 100%", statusColor: GREEN, statusBg: COLORS.BASIC },
];

const avatarColors = [GREEN, ORANGE, BLUE, RED, "#6C9A4B"];

const WarehouseInventory = () => {
    return (
        <Page title="Kiểm kê kho">
            <Box bgcolor="#F4F8EF" pb={4}>
                {/* ----------------- header ----------------- */}
                <Box px={{ xs: 2, md: 3 }} pt={3}>
                    <Stack direction="row" flexWrap="wrap" gap={0.5} alignItems="center" mb={1}>
                        <Typography variant="caption" color="text.secondary">Trang chủ</Typography>
                        <Typography variant="caption" color="text.secondary">›</Typography>
                        <Typography variant="caption" color="text.secondary">Quản lý kho</Typography>
                        <Typography variant="caption" color="text.secondary">›</Typography>
                        <Typography variant="caption" fontWeight={700} color={GREEN}>5. Kiểm kê kho</Typography>
                    </Stack>
                    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" gap={2}>
                        <Box>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1.5}>
                                <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.5rem", md: "1.9rem" } }}>
                                    Kiểm Kê Kho Định Kỳ & Đột Xuất
                                </Typography>
                                <Chip size="small" label="Tiêu chuẩn ISO 9001:2015 - Xưởng Tân Bình" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                            </Stack>
                            <Typography variant="body2" color="text.secondary" maxWidth={680}>
                                Hệ thống giám sát đối chiếu số dư sổ sách và thực đếm tại xưởng mộc. Tự động xác lập biên bản sai lệch phôi gỗ, phụ kiện ngũ kim và cân đối tài sản vật tư theo quy chuẩn xưởng Cheloire.
                            </Typography>
                        </Box>
                        <Stack direction="row" flexWrap="wrap" gap={1.5}>
                            <Button variant="outlined" startIcon={<QrCodeScanner />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                Quét QR/PDA
                            </Button>
                            <Button variant="outlined" startIcon={<DownloadOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                Xuất biên bản (Excel/PDF)
                            </Button>
                            <Button variant="contained" startIcon={<AddCircleOutline />} sx={{ bgcolor: GREEN }}>
                                + Tạo phiếu kiểm kê mới
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
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                            <Box>
                                                <Typography variant="caption" fontWeight={700} color="text.secondary">
                                                    {k.label}
                                                </Typography>
                                                <Typography variant="subtitle1" fontWeight={700}>
                                                    {k.title}
                                                </Typography>
                                            </Box>
                                            <Avatar variant="rounded" sx={{ bgcolor: COLORS.BASIC, color: GREEN, width: 38, height: 38 }}>
                                                {k.icon}
                                            </Avatar>
                                        </Box>
                                        <Box mt={1.5} display="flex" alignItems="baseline" gap={0.5} flexWrap="wrap">
                                            <Typography variant="h4" fontWeight={700} color={k.valueColor || "inherit"}>
                                                {k.value}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {k.unit}
                                            </Typography>
                                        </Box>
                                        {k.progress !== undefined ? (
                                            <Box display="flex" alignItems="center" gap={1} mt={1.5}>
                                                <LinearProgress variant="determinate" value={k.progress} sx={{ flexGrow: 1, height: 8, borderRadius: 4, bgcolor: "#EEE", "& .MuiLinearProgress-bar": { bgcolor: GREEN } }} />
                                                <Typography variant="caption" fontWeight={700}>
                                                    {k.progress}%
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box mt={1.5} display="flex" flexWrap="wrap" justifyContent="space-between" gap={1}>
                                                <Typography variant="caption" fontWeight={600} color={k.footLeftColor}>
                                                    {k.footLeft}
                                                </Typography>
                                                <Typography variant="caption" fontWeight={600} color={k.footRightColor}>
                                                    {k.footRight}
                                                </Typography>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* ----------------- danh sách phiếu kiểm kê ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} justifyContent="space-between" gap={2}>
                                <Stack direction="row" flexWrap="wrap" gap={1}>
                                    {tabs.map((t) => (
                                        <Chip
                                            key={t.label}
                                            label={t.label}
                                            onClick={() => {}}
                                            sx={{ bgcolor: t.active ? GREEN : COLORS.BASIC, color: t.active ? "#fff" : "#333", fontWeight: 600 }}
                                        />
                                    ))}
                                </Stack>
                                <Stack direction="row" gap={1}>
                                    <TextField
                                        size="small"
                                        placeholder="Tìm mã phiếu, tên đợt, kho..."
                                        sx={{ minWidth: { md: 240 } }}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
                                    />
                                    <IconButton sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                        <FilterAltOutlined />
                                    </IconButton>
                                </Stack>
                            </Box>

                            <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                <Table sx={{ minWidth: 1100 }}>
                                    <TableHead>
                                        <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 11 } }}>
                                            <TableCell>MÃ PHIẾU</TableCell>
                                            <TableCell>TÊN ĐỢT KIỂM KÊ / MỤC ĐÍCH</TableCell>
                                            <TableCell>KHO VẬT TƯ</TableCell>
                                            <TableCell>NGÀY THỰC HIỆN</TableCell>
                                            <TableCell>HỘI ĐỒNG KIỂM ĐẾM</TableCell>
                                            <TableCell align="center">SỐ DÒNG</TableCell>
                                            <TableCell align="center">TỶ LỆ KHỚP</TableCell>
                                            <TableCell>TRẠNG THÁI</TableCell>
                                            <TableCell align="center">THAO TÁC</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sessions.map((s) => (
                                            <TableRow key={s.code} hover>
                                                <TableCell>
                                                    <Typography variant="caption" fontWeight={700}>
                                                        {s.code}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 280 }}>
                                                    <Typography variant="body2" fontWeight={700}>
                                                        {s.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {s.purpose}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={s.warehouse} sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">{s.date}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction="row" alignItems="center" gap={1}>
                                                        <Stack direction="row">
                                                            {s.members.map((m, idx) => (
                                                                <Avatar key={idx} sx={{ width: 26, height: 26, fontSize: 11, bgcolor: avatarColors[idx % avatarColors.length], ml: idx === 0 ? 0 : -1, border: "2px solid #fff" }}>
                                                                    {m}
                                                                </Avatar>
                                                            ))}
                                                        </Stack>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {s.council}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="center">{s.lines}</TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" fontWeight={700} color={s.matchColor}>
                                                        {s.match}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={s.status} sx={{ bgcolor: s.statusBg, color: s.statusColor, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {s.action === "approve" ? (
                                                        <Button size="small" variant="contained" sx={{ bgcolor: GREEN, fontSize: 11 }}>
                                                            Phê duyệt
                                                        </Button>
                                                    ) : (
                                                        <Stack direction="row" justifyContent="center">
                                                            <IconButton size="small">
                                                                {s.action === "edit" ? <EditOutlined fontSize="small" sx={{ color: "text.secondary" }} /> : <Visibility fontSize="small" sx={{ color: "text.secondary" }} />}
                                                            </IconButton>
                                                            <IconButton size="small">
                                                                {s.action === "edit" ? <PrintOutlined fontSize="small" sx={{ color: "text.secondary" }} /> : <DescriptionOutlined fontSize="small" sx={{ color: "text.secondary" }} />}
                                                            </IconButton>
                                                        </Stack>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>

                {/* ----------------- đối soát + PDA ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        {/* đối soát nhanh */}
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1}>
                                        <Stack direction="row" gap={1} alignItems="center">
                                            <Box component="span" sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: ORANGE }} />
                                            <Typography variant="h6" fontWeight={700}>
                                                Đối Soát Chênh Lệch Nhanh (Đợt Gần Nhất KKK-202410-04)
                                            </Typography>
                                        </Stack>
                                        <Chip size="small" label="Kho Ngũ Kim K2" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        So sánh tức thì giữa tồn hệ thống ERP và số liệu thực đếm tại sàn thao tác xưởng Tân Bình.
                                    </Typography>

                                    <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                        <Table sx={{ minWidth: 760 }}>
                                            <TableHead>
                                                <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 11 } }}>
                                                    <TableCell>MÃ & TÊN VẬT TƯ</TableCell>
                                                    <TableCell align="right">SỐ SÁCH</TableCell>
                                                    <TableCell align="right">THỰC TẾ ĐẾM</TableCell>
                                                    <TableCell align="right">CHÊNH LỆCH</TableCell>
                                                    <TableCell>NGUYÊN NHÂN / GIẢI TRÌNH CỦA XƯỞNG</TableCell>
                                                    <TableCell align="center">TRẠNG THÁI</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {reconciles.map((r) => (
                                                    <TableRow key={r.code} hover>
                                                        <TableCell sx={{ maxWidth: 220 }}>
                                                            <Typography variant="body2" fontWeight={700}>
                                                                {r.code}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {r.name}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography variant="body2" component="span" fontWeight={600}>
                                                                {r.book}
                                                            </Typography>
                                                            <Typography variant="caption" component="span" color="text.secondary">
                                                                {r.bookUnit}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography variant="body2" component="span" fontWeight={600}>
                                                                {r.real}
                                                            </Typography>
                                                            <Typography variant="caption" component="span" color="text.secondary">
                                                                {r.realUnit}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography variant="body2" fontWeight={700} color={r.diffColor}>
                                                                {r.diff}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell sx={{ maxWidth: 240 }}>
                                                            <Typography variant="caption" color={r.reasonColor}>
                                                                {r.reason}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip size="small" label={r.status} sx={{ bgcolor: r.statusBg, color: r.statusColor, fontWeight: 600 }} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <Box mt={2} p={2} borderRadius={2} bgcolor="#FFF8EC" display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={2}>
                                        <Stack direction="row" gap={1} alignItems="center">
                                            <InfoOutlined sx={{ color: ORANGE, fontSize: 18 }} />
                                            <Typography variant="caption" color="text.secondary">
                                                Có <b>2 phát hiện sai lệch</b> cần chữ ký xác nhận của Quản đốc & Kế toán trưởng trước khi chốt số.
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" gap={1}>
                                            <Button variant="outlined" sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                                Biên bản giải trình hao hụt
                                            </Button>
                                            <Button variant="contained" sx={{ bgcolor: GREEN }}>
                                                Tạo bút toán điều chỉnh tồn kho
                                            </Button>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* PDA */}
                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" fontWeight={700}>
                                            Kiểm Kê Trực Tiếp Tại Kho
                                        </Typography>
                                        <Stack direction="row" gap={0.5} alignItems="center">
                                            <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: GREEN }} />
                                            <Typography variant="caption" color={GREEN} fontWeight={600}>
                                                Online PDA
                                            </Typography>
                                        </Stack>
                                    </Box>

                                    <Box mt={1.5} position="relative" height={160} borderRadius={2} bgcolor={COLORS.BASIC} display="flex" alignItems="center" justifyContent="center" color={GREEN}>
                                        <QrCodeScanner sx={{ fontSize: 44 }} />
                                        <Box position="absolute" bottom={8} left={8} right={8} p={1.2} borderRadius={1} sx={{ bgcolor: "rgba(0,0,0,0.6)" }}>
                                            <Typography variant="caption" fontWeight={700} color="#cfe0c2" display="block">
                                                KHU VỰC ĐANG ĐẾM
                                            </Typography>
                                            <Typography variant="body2" fontWeight={700} color="#fff">
                                                Kệ Pallet E-04: Phụ Kiện Cánh Tủ
                                            </Typography>
                                            <Typography variant="caption" color="#eee">
                                                Thủ kho Nguyễn Văn Toàn đang quét mã vạch bằng máy Honeywell EDA51
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Stack gap={1.5} mt={2}>
                                        <StatRow label="Tốc độ quét thực đếm:" value="42 mã / giờ" />
                                        <StatRow label="Tỷ lệ sai lệch gỗ phôi:" value="0.0% (Khớp tuyệt đối)" valueColor={GREEN} />
                                        <StatRow label="Quy chế bù trừ hao hụt:" value="Định mức cho phép ≤ 1.5%" valueColor={GREEN} />
                                    </Stack>

                                    <Divider sx={{ my: 2 }} />

                                    <Typography variant="caption" fontWeight={700} color="text.secondary">
                                        QUY TRÌNH CÂN ĐỐI TỒN KHO:
                                    </Typography>
                                    <Stack gap={0.8} mt={1}>
                                        {[
                                            "Thủ kho hoàn tất phiếu thực đếm",
                                            "Kế toán đối soát và lập bảng chênh lệch",
                                            "Quản đốc duyệt biên bản giải trình cưa xẻ",
                                            "Hệ thống tự động đồng bộ thẻ kho & giá vốn",
                                        ].map((step, i) => (
                                            <Stack key={i} direction="row" gap={1} alignItems="flex-start">
                                                <Avatar sx={{ width: 20, height: 20, fontSize: 11, bgcolor: COLORS.BASIC, color: GREEN }}>{i + 1}</Avatar>
                                                <Typography variant="caption" color="text.secondary">
                                                    {step}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>

                                    <Button fullWidth variant="contained" startIcon={<LockOutlined />} sx={{ mt: 2, bgcolor: "#1B3F16", py: 1.2 }}>
                                        Khóa Sổ Kỳ Kiểm Kê Này
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Page>
    );
};

const StatRow = ({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) => (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={0.5}>
        <Typography variant="caption" color="text.secondary">
            {label}
        </Typography>
        <Typography variant="caption" fontWeight={700} color={valueColor || "inherit"}>
            {value}
        </Typography>
    </Box>
);

export default WarehouseInventory;
