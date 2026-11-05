import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import {
    AttachMoneyOutlined,
    GroupsOutlined,
    HistoryOutlined,
    InsightsOutlined,
    Inventory2Outlined,
    LoginOutlined,
    LogoutOutlined,
    PictureAsPdf,
    ReceiptLongOutlined,
    RecyclingOutlined,
    Search,
    TableChartOutlined,
    TrendingDown,
    TrendingUp,
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
    InputAdornment,
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
const GREEN_LIGHT = "#A9C78F";
const ORANGE = "#D9822B";

/* ------------------------- dữ liệu mẫu ------------------------- */
const navTabs = [
    { label: "Báo cáo Xuất - Nhập - Tồn vật tư", icon: <ReceiptLongOutlined fontSize="small" />, active: true },
    { label: "Thu - Chi & Lãi/Lỗ ròng", icon: <AttachMoneyOutlined fontSize="small" /> },
    { label: "Hao hụt phôi & Phế liệu", icon: <RecyclingOutlined fontSize="small" /> },
    { label: "Hiệu suất theo tổ thợ mộc", icon: <GroupsOutlined fontSize="small" /> },
];

const barData = [
    { name: "Tuần 1 (01 - 07)", nhap: 145, xuat: 62 },
    { name: "Tuần 2 (08 - 14)", nhap: 98, xuat: 79 },
    { name: "Tuần 3 (15 - 21)", nhap: 160, xuat: 92 },
    { name: "Tuần 4 (22 - 31)", nhap: 80, xuat: 55 },
];

const donut = [
    { name: "Gỗ tự nhiên (Sồi, Gõ, Óc chó)", value: 54, color: GREEN_DARK },
    { name: "Ván công nghiệp (MDF, HDF)", value: 32, color: GREEN_MID },
    { name: "Phụ kiện & Hóa chất sơn", value: 14, color: GREEN_LIGHT },
];

const areaCards = [
    { tag: "Kho Phôi Thô", title: "Gỗ Sồi Trắng & Gõ Đỏ Pachy", desc: "Kiểm định độ ẩm đạt chuẩn: 9.8%" },
    { tag: "Tổ Gia Công Máy", title: "Cắt Ghép & Tối Ưu Phôi CNC", desc: "Tối ưu sơ đồ cắt nesting: 94.2%" },
    { tag: "Kho Kim Khí & Sơn", title: "Phụ Kiện Blum & Sơn Lau Clear", desc: "Dự phòng an toàn sản xuất: 18 ngày" },
];

interface GroupRow {
    code: string;
    name: string;
    detail: string;
    unit: string;
    open: string;
    in: string;
    out: string;
    close: string;
    value: string;
    turnover: string;
}

const groups: GroupRow[] = [
    { code: "N1-GTN", name: "Gỗ Tự Nhiên Xẻ Sấy", detail: "Sồi Mỹ, Gõ Đỏ Pachy, Óc Chó FAS", unit: "m³", open: "48.20", in: "+15.50", out: "9.30", close: "54.40", value: "1.088.000.000 đ", turnover: "0.17 vòng" },
    { code: "N2-VCN", name: "Ván Công Nghiệp & HDF Chống Ẩm", detail: "MDF An Cường, Plywood Bạch Dương 18mm", unit: "Tấm", open: "420", in: "+280", out: "215", close: "485", value: "315.250.000 đ", turnover: "0.48 vòng" },
    { code: "N3-PKK", name: "Phụ Kiện Kim Khí & Ray Bản Lề", detail: "Bản lề giảm chấn Blum, Ray bi Hafele 450mm", unit: "Bộ", open: "1.250", in: "+650", out: "540", close: "1.360", value: "149.600.000 đ", turnover: "0.41 vòng" },
    { code: "N4-SHC", name: "Sơn PU, Dầu Lau & Hóa Chất", detail: "Sơn lót PU Oseven, Tinh màu Walnut, Butyl", unit: "Thùng", open: "85", in: "+42", out: "48", close: "79", value: "94.800.000 đ", turnover: "0.59 vòng" },
    { code: "N5-KTH", name: "Keo Ghép Mộng & Nhám Giấy Cát", detail: "Titebond III Ultimate, Nhám cuộn Kovax P180-P400", unit: "Kg/Cuộn", open: "310", in: "+120", out: "145", close: "285", value: "39.900.000 đ", turnover: "0.49 vòng" },
    { code: "N6-DGB", name: "Vật Tư Đóng Gói Xuất Xưởng", detail: "Màng PE bọc nội thất, Mút xốp nổ 5mm, Nẹp góc carton", unit: "Cuộn", open: "160", in: "+95", out: "88", close: "167", value: "25.050.000 đ", turnover: "0.54 vòng" },
];

const periods = ["Tháng 10/2024", "Quý 3/2024", "Năm 2024"];

const ReportsStatistics = () => {
    return (
        <Page title="Báo cáo & Thống kê">
            <Box bgcolor="#EEF4E7" pb={4}>
                {/* ----------------- header ----------------- */}
                <Box px={{ xs: 2, md: 3 }} pt={3}>
                    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" gap={2}>
                        <Box>
                            <Typography variant="caption" fontWeight={700} color="text.secondary">
                                TRUNG TÂM PHÂN TÍCH & BÁO CÁO • KỲ KINH DOANH 2024
                            </Typography>
                            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}>
                                Báo Cáo Xuất - Nhập - Tồn & Hiệu Suất Xưởng Mộc
                            </Typography>
                            <Typography variant="body2" color="text.secondary" maxWidth={620}>
                                Hệ thống dữ liệu hợp nhất định mức tiêu hao nguyên vật liệu, biến động kho gỗ xẻ, ván công nghiệp và hiệu quả vận hành xưởng Tân Bình.
                            </Typography>
                        </Box>
                        <Stack gap={1.5} alignItems={{ md: "flex-end" }}>
                            <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
                                {periods.map((p, i) => (
                                    <Chip key={p} label={p} onClick={() => {}} sx={{ bgcolor: i === 0 ? "#fff" : "transparent", fontWeight: i === 0 ? 700 : 400, boxShadow: i === 0 ? 1 : 0 }} />
                                ))}
                                <Button variant="outlined" startIcon={<PictureAsPdf />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                    In PDF
                                </Button>
                            </Stack>
                            <Button variant="contained" startIcon={<TableChartOutlined />} sx={{ bgcolor: GREEN }}>
                                Xuất Excel (XLSX)
                            </Button>
                        </Stack>
                    </Box>
                </Box>

                {/* ----------------- nav tabs ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <Stack direction="row" flexWrap="wrap" gap={1} p={1}>
                            {navTabs.map((t) => (
                                <Button
                                    key={t.label}
                                    startIcon={t.icon}
                                    sx={{
                                        bgcolor: t.active ? COLORS.BASIC : "transparent",
                                        color: t.active ? GREEN : "text.secondary",
                                        fontWeight: t.active ? 700 : 500,
                                        textTransform: "none",
                                    }}
                                >
                                    {t.label}
                                    {t.active && <Box component="span" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: GREEN, ml: 1 }} />}
                                </Button>
                            ))}
                        </Stack>
                    </Card>
                </Box>

                {/* ----------------- KPI ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
                            <KpiCard icon={<HistoryOutlined />} title="TỒN ĐẦU KỲ" value="1.650.200.000" unit="đ" foot="Chốt kỳ ngày 30/09/2024" bar />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
                            <KpiCard icon={<LoginOutlined />} title="NHẬP TRONG KỲ" value="+482.900.000" unit="đ" valueColor={GREEN} foot="14 lô hàng gỗ xẻ & phụ kiện" foot2="↗ +12.4% so ký trước" foot2Color={GREEN} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
                            <KpiCard icon={<LogoutOutlined />} title="XUẤT SẢN XUẤT" value="288.100.000" unit="đ" foot="Phục vụ 8 dự án nội thất" foot2="Đạt định mức cấp phát: 98.2%" foot2Color="text.secondary" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
                            <KpiCard icon={<WarehouseOutlined />} title="TỒN CUỐI KỲ" value="1.845.000.000" unit="đ" foot="Giá trị thực kiểm quy đổi" foot2="Hạn mức lưu kho   73.8%" foot2Color="text.secondary" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, lg: 2.4 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%", bgcolor: "#15241A", color: "#fff" }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="caption" fontWeight={700} sx={{ opacity: 0.8 }}>TỶ LỆ HAO HỤT</Typography>
                                        <Chip size="small" label="TỐT" sx={{ bgcolor: GREEN_MID, color: "#fff", fontWeight: 700, height: 20 }} />
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={0.5} mt={1.5}>
                                        <Typography variant="h4" fontWeight={700}>3.4%</Typography>
                                        <TrendingDown sx={{ color: GREEN_LIGHT }} />
                                    </Box>
                                    <Typography variant="caption" sx={{ opacity: 0.8 }} mt={1} display="block">Trần tiêu chuẩn xưởng: 4.5%</Typography>
                                    <Typography variant="caption" color={GREEN_LIGHT} fontWeight={600}>Tiết kiệm 22.4M đ phôi thô</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* ----------------- chart + donut ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, lg: 8 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={1}>
                                        <Box>
                                            <Typography variant="h6" fontWeight={700}>Luân Chuyển Vật Tư Qua Các Tuần</Typography>
                                            <Typography variant="caption" color="text.secondary">Đối chiếu giá trị Nhập kho đối ứng Xuất cho xưởng mộc (Triệu VNĐ)</Typography>
                                        </Box>
                                        <Stack direction="row" gap={2}>
                                            <LegendDot color={GREEN_DARK} label="Nhập vật tư" />
                                            <LegendDot color={GREEN_LIGHT} label="Xuất sản xuất" />
                                        </Stack>
                                    </Box>
                                    <Box height={300} mt={2}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={barData} barGap={6}>
                                                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                                <YAxis hide />
                                                <Bar dataKey="nhap" fill={GREEN_DARK} radius={[3, 3, 0, 0]} barSize={30} label={{ position: "top", fontSize: 11, formatter: (v: number) => `${v}M` }} />
                                                <Bar dataKey="xuat" fill={GREEN_LIGHT} radius={[3, 3, 0, 0]} barSize={30} label={{ position: "top", fontSize: 11, formatter: (v: number) => `${v}M` }} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={700}>Cơ Cấu Tiêu Hao Vật Tư</Typography>
                                    <Typography variant="caption" color="text.secondary">Tỷ trọng chi phí xuất xưởng theo nhóm</Typography>

                                    <Box position="relative" width="100%" height={200} mt={1}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={donut} dataKey="value" cx="50%" cy="50%" innerRadius={66} outerRadius={90} startAngle={90} endAngle={-270} paddingAngle={1}>
                                                    {donut.map((d, i) => (
                                                        <Cell key={i} fill={d.color} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <Box position="absolute" top="50%" left="50%" sx={{ transform: "translate(-50%, -50%)" }} textAlign="center">
                                            <Typography variant="caption" color="text.secondary">TỔNG XUẤT</Typography>
                                            <Typography variant="h5" fontWeight={700}>288M</Typography>
                                        </Box>
                                    </Box>

                                    <Stack gap={1.2} mt={1}>
                                        {donut.map((d, i) => (
                                            <Box key={i} p={1} borderRadius={1.5} bgcolor="#FAFAF7" display="flex" justifyContent="space-between" alignItems="center">
                                                <Stack direction="row" gap={1} alignItems="center">
                                                    <Box component="span" sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: d.color }} />
                                                    <Typography variant="caption">{d.name}</Typography>
                                                </Stack>
                                                <Typography variant="body2" fontWeight={700}>{d.value.toFixed(1)}%</Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* ----------------- area cards ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Grid container spacing={2}>
                        {areaCards.map((a, i) => (
                            <Grid size={{ xs: 12, md: 4 }} key={i}>
                                <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                                    <CardContent>
                                        <Stack direction="row" gap={1.5}>
                                            <Box width={64} height={64} borderRadius={1.5} bgcolor={COLORS.BASIC} display="flex" alignItems="center" justifyContent="center" color={GREEN} flexShrink={0}>
                                                <WarehouseOutlined />
                                            </Box>
                                            <Box>
                                                <Chip size="small" label={a.tag} sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600, height: 20, mb: 0.5 }} />
                                                <Typography variant="body2" fontWeight={700}>{a.title}</Typography>
                                                <Typography variant="caption" color="text.secondary">{a.desc}</Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* ----------------- bảng tổng hợp ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={1.5}>
                                <Box>
                                    <Typography variant="h6" fontWeight={700}>Bảng Tổng Hợp Xuất - Nhập - Tồn Chi Tiết</Typography>
                                    <Typography variant="caption" color="text.secondary">Báo cáo cân đối kho theo 06 nhóm vật tư chủ lực trong tháng 10/2024</Typography>
                                </Box>
                                <Stack direction="row" gap={1.5} alignItems="center">
                                    <TextField
                                        size="small"
                                        placeholder="Tìm theo mã nhóm..."
                                        InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
                                    />
                                    <Typography variant="caption" color="text.secondary" noWrap>Đang hiển thị 6/6 nhóm</Typography>
                                </Stack>
                            </Box>

                            <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                <Table sx={{ minWidth: 1050 }}>
                                    <TableHead>
                                        <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 11 } }}>
                                            <TableCell>MÃ NHÓM</TableCell>
                                            <TableCell>TÊN NHÓM VẬT TƯ</TableCell>
                                            <TableCell>ĐVT</TableCell>
                                            <TableCell align="right">TỒN ĐẦU KỲ</TableCell>
                                            <TableCell align="right">NHẬP KỲ</TableCell>
                                            <TableCell align="right">XUẤT KỲ</TableCell>
                                            <TableCell align="right">TỒN CUỐI KỲ</TableCell>
                                            <TableCell align="right">THÀNH TIỀN TỒN</TableCell>
                                            <TableCell align="center">VÒNG QUAY KHO</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groups.map((g) => (
                                            <TableRow key={g.code} hover>
                                                <TableCell><Typography variant="caption" fontWeight={700}>{g.code}</Typography></TableCell>
                                                <TableCell sx={{ maxWidth: 220 }}>
                                                    <Typography variant="body2" fontWeight={700}>{g.name}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{g.detail}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={g.unit} sx={{ bgcolor: COLORS.BASIC, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell align="right">{g.open}</TableCell>
                                                <TableCell align="right"><Typography variant="body2" fontWeight={700} color={GREEN}>{g.in}</Typography></TableCell>
                                                <TableCell align="right"><Typography variant="body2" fontWeight={700} color={ORANGE}>{g.out}</Typography></TableCell>
                                                <TableCell align="right"><Typography variant="body2" fontWeight={700}>{g.close}</Typography></TableCell>
                                                <TableCell align="right">{g.value}</TableCell>
                                                <TableCell align="center">
                                                    <Chip size="small" label={g.turnover} sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow sx={{ "& td": { bgcolor: "#FAFAF7", borderTop: "2px solid #e0e0e0" } }}>
                                            <TableCell colSpan={3}><Typography variant="body2" fontWeight={700}>TỔNG CỘNG TOÀN XƯỞNG (6 NHÓM)</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" fontWeight={700}>1.650.200.000 đ</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" fontWeight={700} color={GREEN}>+482.900.000 đ</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" fontWeight={700} color={ORANGE}>288.100.000 đ</Typography></TableCell>
                                            <TableCell align="right">--</TableCell>
                                            <TableCell align="right"><Typography variant="body2" fontWeight={700}>1.845.000.000 đ</Typography></TableCell>
                                            <TableCell align="center"><Typography variant="caption" fontWeight={700}>TB: 0.36 vòng</Typography></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>

                {/* ----------------- nhận xét ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1, bgcolor: COLORS.BASIC }}>
                        <CardContent>
                            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" gap={2}>
                                <Stack direction="row" gap={1.5} alignItems="flex-start">
                                    <InsightsOutlined sx={{ color: GREEN, mt: 0.3 }} />
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={700}>Nhận Xét Của Ban Điều Hành Sản Xuất:</Typography>
                                        <Typography variant="body2" color="text.secondary" maxWidth={720}>
                                            Kho gỗ tự nhiên nhập tích trữ đón đầu 2 công trình biệt thự Thảo Điền và Lakeview khiến tồn cuối kỳ tăng 11.8%. Tỷ lệ hao hụt phôi gia công tuần 3 và tuần 4 tiếp tục được kiểm soát ở mức <b>3.4%</b> nhờ quy trình nesting tự động và giám sát cưa phôi chuẩn 2 bậc.
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" gap={1} alignItems="center" flexShrink={0}>
                                    <Box textAlign="right">
                                        <Typography variant="caption" color="text.secondary" display="block">Kế toán trưởng kiểm duyệt</Typography>
                                        <Typography variant="body2" fontWeight={700}>Nguyễn Thị Kim Loan</Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: "#fff", color: GREEN }}>
                                        <VerifiedUserOutlined />
                                    </Avatar>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Page>
    );
};

/* ------------------------- helpers ------------------------- */
const KpiCard = ({ icon, title, value, unit, valueColor, foot, foot2, foot2Color, bar }: { icon: React.ReactNode; title: string; value: string; unit: string; valueColor?: string; foot: string; foot2?: string; foot2Color?: string; bar?: boolean }) => (
    <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="caption" fontWeight={700} color="text.secondary">{title}</Typography>
                <Box sx={{ color: GREEN, display: "flex" }}>{icon}</Box>
            </Box>
            <Box mt={1} display="flex" alignItems="baseline" gap={0.5} flexWrap="wrap">
                <Typography variant="h6" fontWeight={700} color={valueColor || "inherit"}>{value}</Typography>
                <Typography variant="caption" color="text.secondary">{unit}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>{foot}</Typography>
            {foot2 && <Typography variant="caption" fontWeight={600} color={foot2Color} display="block">{foot2}</Typography>}
            {bar && <Box mt={1} height={5} borderRadius={3} bgcolor="#e4e8de"><Box width="60%" height="100%" borderRadius={3} bgcolor={GREEN} /></Box>}
        </CardContent>
    </Card>
);

const LegendDot = ({ color, label }: { color: string; label: string }) => (
    <Stack direction="row" gap={0.5} alignItems="center">
        <Box component="span" sx={{ width: 10, height: 10, borderRadius: "2px", bgcolor: color }} />
        <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Stack>
);

export default ReportsStatistics;
