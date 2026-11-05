import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import {
    AccountBalanceOutlined,
    AccountBalanceWalletOutlined,
    AddCircleOutline,
    ArrowDownward,
    ArrowUpward,
    CheckCircleOutline,
    DonutLargeOutlined,
    DownloadOutlined,
    FactCheckOutlined,
    GroupsOutlined,
    PaymentsOutlined,
    PrintOutlined,
    RemoveCircleOutline,
    Search,
    SyncAlt,
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
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const GREEN = COLORS.BUTTON;
const GREEN_DARK = "#2C4A1C";
const GREEN_MID = "#6C9A4B";
const ORANGE = "#E7A22F";
const RED = "#C0392B";

/* ------------------------- dữ liệu mẫu ------------------------- */
const barData = [
    { name: "Tuần 40", thu: 95, chi: 70 },
    { name: "Tuần 41", thu: 132, chi: 100 },
    { name: "Tuần 42", thu: 88, chi: 84 },
    { name: "Tuần 43", thu: 112, chi: 78 },
];

const donut = [
    { name: "Gỗ & Sơn & Phụ kiện", amount: "177.7M (62%)", value: 62, color: GREEN_DARK },
    { name: "Lương & Ứng thợ mộc", amount: "68.8M (24%)", value: 24, color: GREEN_MID },
    { name: "Điện 3 pha & Nước", amount: "22.9M (8%)", value: 8, color: ORANGE },
    { name: "Vận chuyển & Bảo dưỡng", amount: "17.2M (6%)", value: 6, color: "#9BB58A" },
];

const quickTags = ["Tất cả", "Thu đặt cọc 50%", "Thu nghiệm thu đợt 2", "Chi vật tư NCC An Cường", "Chi ứng lương thợ mộc", "Sửa máy Tubi & cửa trượt"];

interface Txn {
    code: string;
    time: string;
    type: "Thu quỹ" | "Chi quỹ";
    item: string;
    itemSub: string;
    party: string;
    partySub: string;
    order: string;
    amount: string;
    income: boolean;
    method: string;
    methodCash?: boolean;
    status: string;
}

const txns: Txn[] = [
    { code: "PT-2024-1082", time: "24/10/2024\n09:42", type: "Thu quỹ", item: "Tạm ứng 50% Hợp đồng đóng tủ bếp Walnut", itemSub: "Đợt 1 khởi động xẻ gỗ", party: "Chị Hoàng Yến", partySub: "0918.234.xxx", order: "#ĐH-WALNUT-89", amount: "+75,000,000", income: true, method: "VCB Xưởng", status: "GĐ Toàn đã duyệt" },
    { code: "PC-2024-0941", time: "23/10/2024\n15:20", type: "Chi quỹ", item: "Thanh toán lô ván MDF phủ Melamine & nẹp chỉ", itemSub: "Hóa đơn VAT số 0029148", party: "Công ty CP Gỗ An Cường", partySub: "Kho Bình Dương", order: "PO-AC-1024", amount: "-64,850,000", income: false, method: "VCB Xưởng", status: "Kế toán Ngọc ký" },
    { code: "PC-2024-0940", time: "22/10/2024\n17:10", type: "Chi quỹ", item: "Tạm ứng lương tuần thợ cả & 3 thợ phụ làm mộng", itemSub: "Theo phiếu chấm công ca ngày", party: "Thợ cả: Nguyễn Văn Long", partySub: "Tổ mộc Tân Bình", order: "Nội bộ xưởng", amount: "-12,500,000", income: false, method: "Tiền mặt két", methodCash: true, status: "Quản đốc Toàn duyệt" },
    { code: "PT-2024-1081", time: "20/10/2024\n11:05", type: "Thu quỹ", item: "Thu quyết toán lắp đặt cửa gỗ Lim Nam Phi đợt 2", itemSub: "Biên bản nghiệm thu kỹ thuật số 08", party: "Anh Vũ Đình Trọng", partySub: "Biệt thự Q.2", order: "#ĐH-LIM-TDIEN", amount: "+128,000,000", income: true, method: "VCB Xưởng", status: "GĐ Toàn đã duyệt" },
    { code: "PC-2024-0939", time: "18/10/2024\n14:45", type: "Chi quỹ", item: "Thay vòng bi trục cốt & mài đĩa cưa hợp kim Ý", itemSub: "Máy cưa bàn trượt 2 lưỡi Altendorf", party: "Kỹ thuật cơ khí Minh Phát", partySub: "Bảo trì máy chế biến gỗ", order: "Bảo dưỡng phân xưởng", amount: "-4,200,000", income: false, method: "Tiền mặt két", methodCash: true, status: "Quản đốc Toàn duyệt" },
    { code: "PC-2024-0938", time: "15/10/2024\n08:30", type: "Chi quỹ", item: "Hóa đơn điện lực 3 pha vận hành máy cưa & buồng sơn", itemSub: "Kỳ tiêu thụ tháng 09/2024 (EVN HCM)", party: "Công ty Điện lực Tân Bình", partySub: "Mã KH: PE020003418", order: "Chi phí vận hành xưởng", amount: "-14,600,000", income: false, method: "VCB Xưởng", status: "Kế toán Ngọc ký" },
];

const footerCards = [
    { icon: <FactCheckOutlined />, title: "Kiểm kê két tiền mặt hàng ngày", desc: "Quản đốc kiểm tra tiền thực tế vào 17h30 mỗi ngày. Chênh lệch tối đa cho phép 0 đ.", bg: COLORS.BASIC },
    { icon: <SyncAlt />, title: "Tự động kết nối VCB iB@nking", desc: "Đồng bộ mã giao dịch khi khách chuyển khoản cọc với cú pháp tên đơn hàng.", bg: COLORS.BASIC },
    { icon: <WarningAmber />, title: "Định mức chi tiền mặt tại xưởng", desc: "Khoản chi trên 20,000,000 đ bắt buộc chuyển khoản ngân hàng theo quy định thuế.", bg: "#FFF8EC" },
];

const RevenueExpenditure = () => {
    return (
        <Page title="Quản lý thu-chi">
            <Box bgcolor="#EEF4E7" pb={4}>
                {/* ----------------- header ----------------- */}
                <Box px={{ xs: 2, md: 3 }} pt={3}>
                    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" gap={2}>
                        <Box>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
                                <Chip size="small" label="TÀI CHÍNH XƯỞNG MỘC" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 700, height: 22 }} />
                                <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: GREEN }} />
                                <Typography variant="caption" fontWeight={700} color="text.secondary">THÁNG 10/2024</Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}>
                                Sổ Quỹ Thu Chi & Dòng Tiền Hoạt Động Xưởng
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Giám sát dòng tiền tự động, đối soát công nợ vật tư và giải ngân xưởng mộc Tân Bình.
                            </Typography>
                        </Box>
                        <Stack gap={1.5} alignItems={{ md: "flex-end" }} width={{ xs: "100%", md: "auto" }}>
                            <Stack direction="row" flexWrap="wrap" gap={1.5}>
                                <Button variant="outlined" startIcon={<AccountBalanceOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #cfe0c2", color: "#333" }}>
                                    Đối soát sổ phụ ngân hàng
                                </Button>
                                <Button variant="contained" startIcon={<RemoveCircleOutline />} sx={{ bgcolor: RED }}>
                                    + Lập phiếu chi
                                </Button>
                            </Stack>
                            <Button variant="contained" startIcon={<AddCircleOutline />} sx={{ bgcolor: GREEN, alignSelf: { md: "flex-end" } }}>
                                + Lập phiếu thu
                            </Button>
                        </Stack>
                    </Box>
                </Box>

                {/* ----------------- KPI ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <KpiCard icon={<ArrowDownward />} accent={GREEN} title="Tổng thu trong tháng" value="420,500,000" unit="đ" foot="↗ +14.8% Tạm ứng & Thanh toán bàn giao" footColor={GREEN} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <KpiCard icon={<ArrowUpward />} accent={RED} title="Tổng chi trong tháng" value="286,750,000" unit="đ" foot="68.2% Gỗ, lương thợ, điện 3 pha & x" footColor={RED} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <KpiCard icon={<AccountBalanceWalletOutlined />} accent={GREEN} title="Dòng tiền ròng (Tồn quỹ)" value="+133,750,000" unit="đ" valueColor={GREEN} foot="● Thặng dư khả dụng an toàn" footColor={GREEN} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%", bgcolor: "#15241A", color: "#fff" }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle2" fontWeight={700}>Tài khoản & Tiền mặt</Typography>
                                        <Chip size="small" label="VCB • 9801" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600 }} />
                                    </Box>
                                    <Stack gap={1} mt={1.5}>
                                        <Box display="flex" justifyContent="space-between">
                                            <Stack direction="row" gap={0.5} alignItems="center">
                                                <AccountBalanceOutlined sx={{ fontSize: 16 }} />
                                                <Typography variant="caption">Vietcombank Xưởng</Typography>
                                            </Stack>
                                            <Typography variant="caption" fontWeight={700}>112,430,000 đ</Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Stack direction="row" gap={0.5} alignItems="center">
                                                <PaymentsOutlined sx={{ fontSize: 16 }} />
                                                <Typography variant="caption">Kết tiền mặt xưởng:</Typography>
                                            </Stack>
                                            <Typography variant="caption" fontWeight={700}>21,320,000 đ</Typography>
                                        </Box>
                                    </Stack>
                                    <LinearProgress variant="determinate" value={84} sx={{ mt: 1.5, height: 6, borderRadius: 3, bgcolor: "rgba(255,255,255,0.15)", "& .MuiLinearProgress-bar": { bgcolor: GREEN_MID } }} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* ----------------- chart + cơ cấu ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={1}>
                                        <Box>
                                            <Typography variant="h6" fontWeight={700}>Dòng Tiền Thu - Chi 4 Tuần Gần Nhất</Typography>
                                            <Typography variant="caption" color="text.secondary">So sánh thực thu đặt cọc & giải ngân vật tư gỗ thô</Typography>
                                        </Box>
                                        <Stack direction="row" gap={2}>
                                            <LegendDot color={GREEN} label="Thu" />
                                            <LegendDot color={RED} label="Chi" />
                                        </Stack>
                                    </Box>
                                    <Box height={300} mt={2}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={barData} barGap={6}>
                                                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                                <YAxis hide />
                                                <Bar dataKey="thu" fill={GREEN_DARK} radius={[3, 3, 0, 0]} barSize={26} />
                                                <Bar dataKey="chi" fill={RED} radius={[3, 3, 0, 0]} barSize={26} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Box>
                                    <Box mt={1} pt={1.5} borderTop="1px solid #eee" display="flex" flexWrap="wrap" justifyContent="space-between" gap={1}>
                                        <Typography variant="caption" color="text.secondary">
                                            Đỉnh điểm thu: Đợt quyết toán biệt thự Thảo Điền (Tuần 41)
                                        </Typography>
                                        <Typography variant="caption" fontWeight={700}>
                                            Tỷ suất an toàn: <Typography component="span" variant="caption" color={GREEN} fontWeight={700}>1.46x</Typography>
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                        <Box>
                                            <Typography variant="h6" fontWeight={700}>Cơ Cấu Chi Phí Xưởng Mộc</Typography>
                                            <Typography variant="caption" color="text.secondary">Tổng chi tháng: 286.75 triệu</Typography>
                                        </Box>
                                        <DonutLargeOutlined sx={{ color: GREEN }} />
                                    </Box>

                                    <Box display="flex" flexDirection={{ xs: "column", sm: "row", lg: "column", xl: "row" }} alignItems="center" gap={2} mt={2}>
                                        <Box position="relative" width={150} height={150} flexShrink={0}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={donut} dataKey="value" cx="50%" cy="50%" innerRadius={52} outerRadius={72} startAngle={90} endAngle={-270} paddingAngle={1}>
                                                        {donut.map((d, i) => (
                                                            <Cell key={i} fill={d.color} />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <Box position="absolute" top="50%" left="50%" sx={{ transform: "translate(-50%, -50%)" }} textAlign="center">
                                                <Typography variant="h6" fontWeight={700}>62%</Typography>
                                                <Typography variant="caption" color="text.secondary">VẬT TƯ GỖ</Typography>
                                            </Box>
                                        </Box>
                                        <Stack gap={1.2} flexGrow={1} width="100%">
                                            {donut.map((d, i) => (
                                                <Box key={i} display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                                                    <Stack direction="row" gap={1} alignItems="center">
                                                        <Box component="span" sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: d.color }} />
                                                        <Typography variant="caption">{d.name}</Typography>
                                                    </Stack>
                                                    <Typography variant="caption" fontWeight={700} noWrap>{d.amount}</Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Box mt={2} p={1.5} borderRadius={1.5} bgcolor={COLORS.BASIC} display="flex" justifyContent="space-between" alignItems="center" gap={1}>
                                        <Stack direction="row" gap={1} alignItems="center">
                                            <GroupsOutlined sx={{ fontSize: 18, color: GREEN }} />
                                            <Typography variant="caption" color="text.secondary">Khấu hao máy Tubi & Cưa trượt:</Typography>
                                        </Stack>
                                        <Typography variant="caption" fontWeight={700}>4,500,000 đ/tháng</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* ----------------- bảng giao dịch ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} gap={1.5} alignItems={{ lg: "center" }}>
                                <TextField
                                    size="small"
                                    placeholder="Tìm theo mã phiếu, thợ, đối tác..."
                                    sx={{ minWidth: { lg: 240 } }}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
                                />
                                <Stack direction="row" flexWrap="wrap" gap={1} flexGrow={1}>
                                    <Chip variant="outlined" label="▼ Tất cả loại giao dịch" sx={{ bgcolor: "#fff" }} />
                                    <Chip variant="outlined" label="▼ Mọi phương thức" sx={{ bgcolor: "#fff" }} />
                                    <Chip variant="outlined" label="▼ Trạng thái duyệt" sx={{ bgcolor: "#fff" }} />
                                </Stack>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Typography variant="caption" color="text.secondary">Hiển thị: 6 / 64 giao dịch</Typography>
                                    <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                        <DownloadOutlined fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Box>

                            <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                                {quickTags.map((t, i) => (
                                    <Chip key={t} label={t} onClick={() => {}} sx={{ bgcolor: i === 0 ? COLORS.BASIC : "#F2F2F2", color: i === 0 ? GREEN : "#555", fontWeight: 600, border: i === 0 ? `1px solid ${GREEN}` : "none" }} />
                                ))}
                            </Stack>

                            <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                <Table sx={{ minWidth: 1200 }}>
                                    <TableHead>
                                        <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 11 } }}>
                                            <TableCell>MÃ PHIẾU</TableCell>
                                            <TableCell>THỜI GIAN</TableCell>
                                            <TableCell>LOẠI</TableCell>
                                            <TableCell>HẠNG MỤC THU / CHI</TableCell>
                                            <TableCell>ĐỐI TƯỢNG (NỘP / NHẬN)</TableCell>
                                            <TableCell>ĐƠN HÀNG / ĐỐI TÁC</TableCell>
                                            <TableCell align="right">SỐ TIỀN (VNĐ)</TableCell>
                                            <TableCell>PHƯƠNG THỨC</TableCell>
                                            <TableCell>TRẠNG THÁI DUYỆT</TableCell>
                                            <TableCell align="center">THAO TÁC</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {txns.map((t) => (
                                            <TableRow key={t.code} hover>
                                                <TableCell>
                                                    <Typography variant="caption" fontWeight={700} color={t.income ? GREEN : RED}>{t.code}</Typography>
                                                </TableCell>
                                                <TableCell sx={{ whiteSpace: "pre-line" }}>
                                                    <Typography variant="caption">{t.time}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={t.type} sx={{ bgcolor: t.income ? COLORS.BASIC : "#FBE3E3", color: t.income ? GREEN : RED, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 200 }}>
                                                    <Typography variant="body2" fontWeight={700}>{t.item}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{t.itemSub}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight={600}>{t.party}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{t.partySub}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={t.order} sx={{ bgcolor: COLORS.BASIC, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" fontWeight={700} color={t.income ? GREEN : RED}>{t.amount}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction="row" gap={0.5} alignItems="center">
                                                        {t.methodCash ? <PaymentsOutlined sx={{ fontSize: 16, color: "text.secondary" }} /> : <AccountBalanceOutlined sx={{ fontSize: 16, color: "text.secondary" }} />}
                                                        <Typography variant="caption">{t.method}</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction="row" gap={0.5} alignItems="center">
                                                        <CheckCircleOutline sx={{ fontSize: 15, color: GREEN }} />
                                                        <Typography variant="caption" color={GREEN}>{t.status}</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="small">
                                                        <PrintOutlined fontSize="small" sx={{ color: "text.secondary" }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box mt={2} display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1.5}>
                                <Typography variant="caption" color="text.secondary">
                                    Hiển thị 1 đến 6 trong tổng số 64 chứng từ sổ quỹ
                                </Typography>
                                <Stack direction="row" gap={0.5} alignItems="center">
                                    <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                        <Typography variant="caption">{"<"}</Typography>
                                    </IconButton>
                                    {[1, 2, 3].map((p) => (
                                        <Button key={p} size="small" variant={p === 1 ? "contained" : "outlined"} sx={{ minWidth: 32, bgcolor: p === 1 ? GREEN : "#fff", border: p === 1 ? "none" : "1px solid #ddd", color: p === 1 ? "#fff" : "#333" }}>
                                            {p}
                                        </Button>
                                    ))}
                                    <Typography variant="caption" color="text.secondary">...</Typography>
                                    <Button size="small" variant="outlined" sx={{ minWidth: 32, border: "1px solid #ddd", color: "#333" }}>11</Button>
                                    <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                        <Typography variant="caption">{">"}</Typography>
                                    </IconButton>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* ----------------- footer info cards ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        {footerCards.map((f, i) => (
                            <Grid size={{ xs: 12, md: 4 }} key={i}>
                                <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                    <CardContent>
                                        <Stack direction="row" gap={1.5} alignItems="flex-start">
                                            <Avatar variant="rounded" sx={{ bgcolor: f.bg, color: i === 2 ? ORANGE : GREEN, width: 40, height: 40, flexShrink: 0 }}>
                                                {f.icon}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={700}>{f.title}</Typography>
                                                <Typography variant="caption" color="text.secondary">{f.desc}</Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Page>
    );
};

/* ------------------------- helpers ------------------------- */
const KpiCard = ({ icon, accent, title, value, unit, valueColor, foot, footColor }: { icon: React.ReactNode; accent: string; title: string; value: string; unit: string; valueColor?: string; foot: string; footColor: string }) => (
    <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
                <Avatar variant="rounded" sx={{ bgcolor: `${accent}1A`, color: accent, width: 32, height: 32 }}>{icon}</Avatar>
            </Box>
            <Box mt={1.5} display="flex" alignItems="baseline" gap={0.5}>
                <Typography variant="h5" fontWeight={700} color={valueColor || "inherit"}>{value}</Typography>
                <Typography variant="body2" color="text.secondary">{unit}</Typography>
            </Box>
            <Typography variant="caption" fontWeight={600} color={footColor} mt={1} display="block">{foot}</Typography>
        </CardContent>
    </Card>
);

const LegendDot = ({ color, label }: { color: string; label: string }) => (
    <Stack direction="row" gap={0.5} alignItems="center">
        <Box component="span" sx={{ width: 10, height: 10, borderRadius: "2px", bgcolor: color }} />
        <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Stack>
);

export default RevenueExpenditure;
