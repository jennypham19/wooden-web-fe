import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import {
    AddCircleOutline,
    CreditCardOutlined,
    EmailOutlined,
    EventBusyOutlined,
    FactCheckOutlined,
    HistoryOutlined,
    Inventory2Outlined,
    LocationOnOutlined,
    PaymentsOutlined,
    PhoneOutlined,
    PrintOutlined,
    Search,
    ShoppingCartOutlined,
    Star,
    StorefrontOutlined,
    TuneOutlined,
    VerifiedOutlined,
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
const RED = "#C0392B";

/* ------------------------- dữ liệu mẫu ------------------------- */
const kpis = [
    { icon: <StorefrontOutlined />, title: "ĐỐI TÁC HOẠT ĐỘNG", value: "18", unit: "đối tác", foot: "100% ký cam kết tiêu chuẩn mộc", footColor: GREEN, accent: GREEN, bg: "#fff" },
    { icon: <Inventory2Outlined />, title: "LŨY KẾ NHẬP KHO 2024", value: "1,420,000,000", unit: "đ", foot: "● 87 phiếu nhập gỗ & kim khí qua duyệt", footColor: "text.secondary", accent: GREEN, bg: "#fff" },
    { icon: <CreditCardOutlined />, title: "TỔNG CÔNG NỢ PHẢI TRẢ", value: "184,500,000", unit: "đ", valueColor: ORANGE, foot: "Trong hạn gối đầu an toàn (≤ 30 ngày)", footColor: "text.secondary", accent: ORANGE, bg: "#fff" },
    { icon: <EventBusyOutlined />, title: "ĐẾN HẠN THANH TOÁN TUẦN NÀY", value: "78,200,000", unit: "đ", valueColor: RED, foot: "⏰ 3 NCC đang chờ quyết toán trước T6", footColor: RED, accent: RED, bg: "#FDEDED", border: true },
];

const segments = ["Tất cả phân khúc (18)", "Gỗ công nghiệp (MDF, Melamine)", "Gỗ tự nhiên (Sồi, Óc chó, Tần bì)", "Phụ kiện kim khí (Ray, Bản lề)", "Hóa chất, Sơn & Keo PUR"];

interface Supp {
    name: string;
    code: string;
    dot: string;
    industry: string;
    contact: string;
    phone: string;
    warehouse: string;
    accum: string;
    debt: string;
    debtSub: string;
    debtColor: string;
    term: string;
    termChip?: string;
    termChipColor?: string;
    termChipBg?: string;
    rating: string;
    ratingNote: string;
    paid?: boolean;
}

const suppliers: Supp[] = [
    { name: "Gỗ An Cường JSC", code: "NCC-AC-001", dot: GREEN, industry: "MDF, HDF Melamine", contact: "A. Quang (Kinh doanh)", phone: "0903.882.119", warehouse: "Kho Bình Dương", accum: "620,000,000 đ", debt: "54,000,000 đ", debtSub: "Hạn mức: 120M", debtColor: ORANGE, term: "Gối 30 ngày", rating: "4.9", ratingNote: "(Chuẩn ly)" },
    { name: "Häfele Việt Nam Co.", code: "NCC-HF-004", dot: RED, industry: "Phụ kiện ray trượt, khóa", contact: "C. Mai Hương", phone: "028.3744.600", warehouse: "Q.2, HCM", accum: "245,500,000 đ", debt: "38,200,000 đ", debtSub: "Hạn: Hôm nay", debtColor: RED, term: "", termChip: "Quá hạn 2 ngày", termChipColor: RED, termChipBg: "#FBE3E3", rating: "5.0", ratingNote: "(Chính hãng)" },
    { name: "Gỗ Xẻ Tây Nguyên", code: "NCC-TN-009", dot: GREEN, industry: "Gỗ Sồi & Tần Bì sấy", contact: "A. Đắc (Chủ bãi)", phone: "0918.421.902", warehouse: "Buôn Ma Thuột", accum: "310,000,000 đ", debt: "28,000,000 đ", debtSub: "Hạn: 24/10", debtColor: ORANGE, term: "Gối 15 ngày", rating: "4.6", ratingNote: "(Ẩm 12%)" },
    { name: "Sơn Gỗ Cao Cấp Oseven", code: "NCC-OS-012", dot: GREEN, industry: "Sơn PU, Lót & Bóng 2K", contact: "Đại lý Tiến Phát", phone: "0933.117.844", warehouse: "Long An", accum: "118,200,000 đ", debt: "12,000,000 đ", debtSub: "Hạn: 26/10", debtColor: ORANGE, term: "Gối 45 ngày", rating: "4.8", ratingNote: "(Độ bền màu)" },
    { name: "Ván Ép Ba Thanh", code: "NCC-BT-007", dot: GREEN, industry: "Plywood, MFC chống ẩm", contact: "Chị Tuyết (Kho Tổng)", phone: "0909.551.309", warehouse: "Hóc Môn", accum: "126,300,000 đ", debt: "0 đ", debtSub: "Đã tất toán", debtColor: "text.secondary", term: "", termChip: "Thanh toán ngay", termChipColor: GREEN, termChipBg: COLORS.BASIC, rating: "4.7", ratingNote: "(Keo E0 chuẩn)", paid: true },
];

const history = [
    { code: "PNK-2024-1008", desc: "50 tấm MDF Lõi Xanh 17mm", status: "Còn nợ: 14,000,000 đ", statusColor: ORANGE, amount: "24,500,000 đ", date: "12/10/2024", due: "Hạn: 12/11/2024" },
    { code: "PNK-2024-0994", desc: "80 tấm Melamine Sồi Mỹ MS 388", status: "Còn nợ: 40,000,000 đ", statusColor: RED, amount: "40,000,000 đ", date: "28/09/2024", due: "Hạn: 28/10/2024" },
    { code: "PNK-2024-0962", desc: "65 tấm HDF chống ẩm bề mặt nhám", status: "Đã thanh toán 100%", statusColor: GREEN, amount: "32,800,000 đ", date: "15/09/2024", due: "UNC-0915" },
];

const Supplier = () => {
    return (
        <Page title="Quản lý nhà cung cấp">
            <Box bgcolor="#EEF4E7" pb={4}>
                {/* ----------------- header ----------------- */}
                <Box px={{ xs: 2, md: 3 }} pt={3}>
                    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" gap={2}>
                        <Box>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
                                <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: GREEN }} />
                                <Typography variant="caption" fontWeight={700} color="text.secondary">QUAN HỆ ĐỐI TÁC CUNG ỨNG</Typography>
                                <Box component="span" sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "text.secondary" }} />
                                <Typography variant="caption" fontWeight={700} color="text.secondary">QUẢN LÝ CÔNG NỢ VẬT TƯ</Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}>
                                Danh Sách Nhà Cung Cấp & Theo Dõi Công Nợ Vật Tư
                            </Typography>
                            <Typography variant="body2" color="text.secondary" maxWidth={640}>
                                Hệ thống điều phối 18 chuỗi cung ứng phôi gỗ, phụ kiện kim khí và dung môi chuyên dụng xưởng Cheloire. Cập nhật hạn mức thanh toán, chiết khấu và độ tin cậy nguyên vật liệu.
                            </Typography>
                        </Box>
                        <Stack direction="row" flexWrap="wrap" gap={1.5}>
                            <Button variant="outlined" startIcon={<FactCheckOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #cfe0c2", color: "#333" }}>
                                Đối soát công nợ kỳ này
                            </Button>
                            <Button variant="contained" startIcon={<AddCircleOutline />} sx={{ bgcolor: GREEN }}>
                                + Thêm nhà cung cấp mới
                            </Button>
                        </Stack>
                    </Box>
                </Box>

                {/* ----------------- KPI ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        {kpis.map((k, i) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
                                <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%", bgcolor: k.bg, borderLeft: k.border ? `4px solid ${RED}` : undefined }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                            <Typography variant="caption" fontWeight={700} color="text.secondary">{k.title}</Typography>
                                            <Avatar variant="rounded" sx={{ bgcolor: `${k.accent}1A`, color: k.accent, width: 34, height: 34 }}>{k.icon}</Avatar>
                                        </Box>
                                        <Box mt={1.5} display="flex" alignItems="baseline" gap={0.5} flexWrap="wrap">
                                            <Typography variant="h5" fontWeight={700} color={k.valueColor || "inherit"}>{k.value}</Typography>
                                            <Typography variant="body2" color="text.secondary">{k.unit}</Typography>
                                        </Box>
                                        <Typography variant="caption" fontWeight={600} color={k.footColor} mt={1} display="block">{k.foot}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* ----------------- main ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        {/* left: table */}
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                                <CardContent>
                                    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={1.5} alignItems={{ md: "center" }}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            placeholder="Tìm theo tên xưởng, mã NCC, người liên hệ..."
                                            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
                                        />
                                        <Stack direction="row" gap={1} alignItems="center" flexShrink={0}>
                                            <Typography variant="caption" color="text.secondary" noWrap>Lọc theo hạn:</Typography>
                                            <Chip variant="outlined" label="▼ Tất cả hạn nợ" sx={{ bgcolor: "#fff" }} />
                                            <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                                <TuneOutlined fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </Box>

                                    <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                                        {segments.map((s, i) => (
                                            <Chip key={s} label={s} onClick={() => {}} sx={{ bgcolor: i === 0 ? GREEN : COLORS.BASIC, color: i === 0 ? "#fff" : "#333", fontWeight: 600 }} />
                                        ))}
                                    </Stack>

                                    <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                        <Table sx={{ minWidth: 980 }}>
                                            <TableHead>
                                                <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 11 } }}>
                                                    <TableCell>ĐỐI TÁC & MÃ</TableCell>
                                                    <TableCell>NGÀNH HÀNG</TableCell>
                                                    <TableCell>ĐẦU MỐI & KHO</TableCell>
                                                    <TableCell align="right">LŨY KẾ MUA</TableCell>
                                                    <TableCell align="right">CÔNG NỢ NỢ</TableCell>
                                                    <TableCell>KỲ HẠN NỢ</TableCell>
                                                    <TableCell>CHẤT LƯỢNG</TableCell>
                                                    <TableCell align="center">THAO TÁC</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {suppliers.map((s) => (
                                                    <TableRow key={s.code} hover>
                                                        <TableCell>
                                                            <Stack direction="row" gap={0.5} alignItems="center">
                                                                <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: s.dot, flexShrink: 0 }} />
                                                                <Box>
                                                                    <Typography variant="body2" fontWeight={700}>{s.name}</Typography>
                                                                    <Typography variant="caption" color="text.secondary">{s.code}</Typography>
                                                                </Box>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip size="small" label={s.industry} sx={{ bgcolor: COLORS.BASIC, fontWeight: 600 }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" fontWeight={600}>{s.contact}</Typography>
                                                            <Typography variant="caption" color="text.secondary">{s.phone} • {s.warehouse}</Typography>
                                                        </TableCell>
                                                        <TableCell align="right">{s.accum}</TableCell>
                                                        <TableCell align="right">
                                                            <Typography variant="body2" fontWeight={700} color={s.debtColor}>{s.debt}</Typography>
                                                            <Typography variant="caption" color={s.debtColor === "text.secondary" ? "text.secondary" : s.debtColor}>{s.debtSub}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            {s.termChip ? (
                                                                <Chip size="small" label={s.termChip} sx={{ bgcolor: s.termChipBg, color: s.termChipColor, fontWeight: 600 }} />
                                                            ) : (
                                                                <Stack direction="row" gap={0.5} alignItems="center">
                                                                    <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: GREEN }} />
                                                                    <Typography variant="caption">{s.term}</Typography>
                                                                </Stack>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Stack direction="row" gap={0.3} alignItems="center">
                                                                <Star sx={{ fontSize: 14, color: ORANGE }} />
                                                                <Typography variant="body2" fontWeight={700}>{s.rating}</Typography>
                                                                <Typography variant="caption" color="text.secondary">{s.ratingNote}</Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Stack direction="row" justifyContent="center">
                                                                <IconButton size="small">
                                                                    {s.paid ? <ShoppingCartOutlined fontSize="small" sx={{ color: "text.secondary" }} /> : <PaymentsOutlined fontSize="small" sx={{ color: GREEN }} />}
                                                                </IconButton>
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

                                    <Box mt={2} display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={1.5}>
                                        <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
                                            <Typography variant="caption" color="text.secondary">Hiển thị 5 / 18 đối tác cung ứng</Typography>
                                            <Typography variant="caption" color="text.secondary">•</Typography>
                                            <Typography variant="caption" color={GREEN} fontWeight={600} sx={{ cursor: "pointer", textDecoration: "underline" }}>Tải bảng Excel chi tiết công nợ</Typography>
                                        </Stack>
                                        <Stack direction="row" gap={0.5} alignItems="center">
                                            <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                                <Typography variant="caption">{"<"}</Typography>
                                            </IconButton>
                                            {[1, 2, 3].map((p) => (
                                                <Button key={p} size="small" variant={p === 1 ? "contained" : "outlined"} sx={{ minWidth: 32, bgcolor: p === 1 ? GREEN : "#fff", border: p === 1 ? "none" : "1px solid #ddd", color: p === 1 ? "#fff" : "#333" }}>{p}</Button>
                                            ))}
                                            <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                                <Typography variant="caption">{">"}</Typography>
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>

                            {/* quy chuẩn */}
                            <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 2 }}>
                                <CardContent>
                                    <Stack direction="row" gap={1} alignItems="center" mb={1}>
                                        <VerifiedUserOutlined sx={{ color: GREEN }} />
                                        <Typography variant="subtitle1" fontWeight={700}>Quy chuẩn thẩm định đầu vào phôi gỗ Cheloire</Typography>
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary">
                                        Mọi lô hàng gỗ tấm ép (MDF/Plywood) từ đối tác đều phải kiểm tra độ ẩm (≤ 12%), độ dung sai bề mặt không vượt quá ±0.2mm trước khi ký nhận biên bản nhập kho. Công nợ chỉ được kích hoạt thanh toán khi có đủ chữ ký của KCS xưởng và Quản đốc Trần Văn Toàn.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* right: supplier detail */}
                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                        <Stack direction="row" gap={1.5} alignItems="center">
                                            <Avatar variant="rounded" sx={{ bgcolor: GREEN, width: 44, height: 44, fontWeight: 700 }}>AC</Avatar>
                                            <Box>
                                                <Stack direction="row" gap={0.5} alignItems="center">
                                                    <Typography variant="h6" fontWeight={700}>Gỗ An Cường JSC</Typography>
                                                    <VerifiedOutlined sx={{ fontSize: 18, color: GREEN }} />
                                                </Stack>
                                                <Typography variant="caption" color="text.secondary">MST: 3700748131 • Cấp 1</Typography>
                                            </Box>
                                        </Stack>
                                        <Chip size="small" label="VIP Tier" sx={{ bgcolor: "#1B3F16", color: "#fff", fontWeight: 700 }} />
                                    </Box>

                                    <Box mt={2} position="relative" height={130} borderRadius={2} bgcolor={COLORS.BASIC} display="flex" alignItems="center" justifyContent="center" color={GREEN}>
                                        <WarehouseOutlined sx={{ fontSize: 40 }} />
                                        <Box position="absolute" bottom={8} left={8} right={8} p={1} borderRadius={1} sx={{ bgcolor: "rgba(0,0,0,0.55)" }}>
                                            <Typography variant="caption" color="#fff">
                                                Vật tư cung cấp: Ván MDF chống ẩm Melamine, HDF lõi xanh
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="text.secondary">Chiết khấu thương mại xưởng:</Typography>
                                        <Chip size="small" label="4.0% / đơn hàng" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 700 }} />
                                    </Box>
                                    <Box mt={1} display="flex" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">Hạn mức nợ cho phép:</Typography>
                                        <Typography variant="body2" fontWeight={700}>120,000,000 đ <Typography component="span" variant="caption" color="text.secondary">(Đã dùng 45%)</Typography></Typography>
                                    </Box>
                                    <LinearProgress variant="determinate" value={45} sx={{ mt: 1, height: 8, borderRadius: 4, bgcolor: "#EEE", "& .MuiLinearProgress-bar": { bgcolor: ORANGE } }} />

                                    <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle2" fontWeight={700}>Lịch sử 3 đơn nhập gần nhất</Typography>
                                        <Typography variant="caption" color={GREEN} sx={{ cursor: "pointer" }}>Xem tất cả (24)</Typography>
                                    </Box>
                                    <Stack gap={1.5} mt={1}>
                                        {history.map((h, i) => (
                                            <Box key={i} pb={1.5} borderBottom={i < history.length - 1 ? "1px solid #eee" : "none"}>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="body2" fontWeight={700}>{h.code}</Typography>
                                                    <Typography variant="body2" fontWeight={700}>{h.amount}</Typography>
                                                </Box>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography variant="caption" color="text.secondary">{h.desc}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{h.date}</Typography>
                                                </Box>
                                                <Box display="flex" justifyContent="space-between" mt={0.3}>
                                                    <Stack direction="row" gap={0.5} alignItems="center">
                                                        <Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: h.statusColor }} />
                                                        <Typography variant="caption" fontWeight={600} color={h.statusColor}>{h.status}</Typography>
                                                    </Stack>
                                                    <Typography variant="caption" color="text.secondary">{h.due}</Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>

                                    <Button fullWidth variant="contained" startIcon={<CreditCardOutlined />} sx={{ mt: 2, bgcolor: "#1B3F16", py: 1.2 }}>
                                        Lập phiếu trả nợ NCC
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* đầu mối */}
                            <Card sx={{ borderRadius: 2, boxShadow: 1, mt: 2 }}>
                                <CardContent>
                                    <Typography variant="caption" fontWeight={700} color="text.secondary">ĐẦU MỐI PHỤ TRÁCH VẬT TƯ</Typography>
                                    <Stack direction="row" gap={1.5} alignItems="center" mt={1.5}>
                                        <Avatar sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 700 }}>TQ</Avatar>
                                        <Box>
                                            <Typography variant="body2" fontWeight={700}>Trần Lê Anh Quang</Typography>
                                            <Typography variant="caption" color="text.secondary">Giám đốc Vùng Bán Lẻ - An Cường HCM</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack gap={1} mt={2}>
                                        <ContactRow icon={<PhoneOutlined fontSize="small" />} text="0903.882.119 (Ưu tiên báo giá xưởng)" />
                                        <ContactRow icon={<EmailOutlined fontSize="small" />} text="quang.tla@ancuong.com" />
                                        <ContactRow icon={<LocationOnOutlined fontSize="small" />} text="Kho trung chuyển: DT743, Dĩ An, Bình Dương" />
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Page>
    );
};

const ContactRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <Stack direction="row" gap={1} alignItems="center">
        <Box sx={{ color: GREEN, display: "flex" }}>{icon}</Box>
        <Typography variant="caption" color="text.secondary">{text}</Typography>
    </Stack>
);

export default Supplier;
