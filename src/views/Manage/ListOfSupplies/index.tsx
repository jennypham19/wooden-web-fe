import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import {
    AddBox,
    Close,
    DescriptionOutlined,
    EditOutlined,
    FilterAltOutlined,
    InventoryOutlined,
    HourglassBottomOutlined,
    LaunchOutlined,
    PaymentsOutlined,
    PriorityHighOutlined,
    QrCode2,
    Refresh,
    RuleFolderOutlined,
    Search,
    SwapHorizOutlined,
    ViewColumnOutlined,
    Visibility,
    VerifiedUserOutlined,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    IconButton,
    InputAdornment,
    MenuItem,
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
const RED = "#BA1B1C";
const ORANGE = "#D9822B";

/* ------------------------- dữ liệu mẫu ------------------------- */
const kpis = [
    {
        icon: <InventoryOutlined />,
        title: "VẬT TƯ ĐANG QUẢN LÝ",
        value: "1.248",
        unit: "mặt hàng",
        footLeft: "● 985 Đang dùng",
        footLeftColor: GREEN,
        footRight: "● 263 Ngừng dùng",
        footRightColor: "text.secondary",
        accent: GREEN,
        bg: "#fff",
    },
    {
        icon: <PaymentsOutlined />,
        title: "GIÁ TRỊ TỒN KHO ƯỚC TÍNH",
        value: "14.850.000.000",
        unit: "đ",
        footLeft: "↗ +3.2% so với tháng trước",
        footLeftColor: GREEN,
        footRight: "FIFO Standard",
        footRightColor: "text.secondary",
        accent: GREEN,
        bg: "#fff",
    },
    {
        icon: <PriorityHighOutlined />,
        title: "DƯỚI MỨC TỐI THIỂU",
        value: "18",
        unit: "mã vật tư",
        footLeft: "! Cần tạo yêu cầu mua ngay",
        footLeftColor: RED,
        footRight: "Lọc ngay",
        footRightColor: RED,
        accent: RED,
        bg: "#FDEDED",
    },
    {
        icon: <HourglassBottomOutlined />,
        title: "CHẬM LUÂN CHUYỂN (>90 NGÀY)",
        value: "7",
        unit: "mã tồn kho",
        footLeft: "Tồn đọng vốn: ~184.200.000 đ",
        footLeftColor: "text.secondary",
        footRight: "Đề xuất xuất điều phối",
        footRightColor: GREEN,
        accent: ORANGE,
        bg: "#fff",
    },
];

const quickFilters = [
    { label: "Tất cả (1.248)", active: true },
    { label: "● Dưới tồn tối thiểu (18)", dot: RED },
    { label: "● Tồn khả dụng cao (>100)", dot: GREEN },
    { label: "Gỗ & Ván (412)" },
];

const dropdowns = [
    { label: "NHÓM VẬT TƯ", value: "Gỗ & Ván công nghiệp" },
    { label: "LOẠI VẬT TƯ", value: "Tất cả loại" },
    { label: "ĐƠN VỊ TÍNH (ĐVT)", value: "Tất cả ĐVT" },
    { label: "KHO LƯU TRỮ", value: "Kho Tổng Miền Bắc (Hà Nội)" },
    { label: "TRẠNG THÁI TỒN", value: "Tất cả mức tồn" },
];

const activeFilters = ["Nhóm: Gỗ & Ván CN", "Kho: Kho Tổng Miền Bắc", 'Từ khóa: "VT-NVL"'];

interface Row {
    stt: string;
    code: string;
    name: string;
    barcode: string;
    badge?: string;
    group: string;
    groupMuted?: boolean;
    unit: string;
    spec: string;
    type: string;
    total: string;
    held: string;
    avail: string;
    availAlert?: boolean;
    min: string;
    alert: string;
    alertColor: string;
    alertBg: string;
    status: string;
    statusMuted?: boolean;
    date: string;
    author: string;
    checked?: boolean;
}

const rows: Row[] = [
    { stt: "01", code: "VT-NVL-00192", name: "Ván MDF lõi xanh chống ẩm Dongwha 18mm", barcode: "8935012398401", group: "Gỗ & Ván CN", unit: "Tấm", spec: "1220 x 2440 x 18mm", type: "Nguyên vật liệu chính", total: "450", held: "120", avail: "330", min: "80", alert: "An toàn", alertColor: GREEN, alertBg: COLORS.BASIC, status: "Đang dùng", date: "14/03/2024", author: "Nguyễn Thu Hà", checked: true },
    { stt: "02", code: "VT-NVL-00204", name: "Ván Plywood Bạch Dương phủ Melamine 12mm", barcode: "8935012398418", group: "Gỗ & Ván CN", unit: "Tấm", spec: "1220 x 2440 x 12mm", type: "Nguyên vật liệu chính", total: "24", held: "15", avail: "9", availAlert: true, min: "50", alert: "Dưới tối thiểu", alertColor: RED, alertBg: "#FBE3E3", status: "Đang dùng", date: "18/03/2024", author: "Trần Đình Quang", checked: true },
    { stt: "03", code: "VT-PK-0081", name: "Bản lề giảm chấn Inox 304 Blum thẳng", barcode: "8935012401292", group: "Phụ kiện kim khí", unit: "Bộ", spec: "Inox 304 - Góc mở 110°", type: "Phụ kiện lắp ráp", total: "2,400", held: "650", avail: "1,750", min: "500", alert: "An toàn", alertColor: GREEN, alertBg: COLORS.BASIC, status: "Đang dùng", date: "02/02/2024", author: "Lê Mai Hương" },
    { stt: "04", code: "VT-HC-0012", name: "Keo hạt dán cạnh nhiệt độ cao Jowat EVA 280.30", barcode: "8935012403319", badge: "EVA", group: "Keo & Hóa chất", unit: "Bao (25kg)", spec: "Hạt nhựa EVA - 190-210°C", type: "Vật tư phụ trợ", total: "35", held: "18", avail: "17", min: "15", alert: "Sắp hết hàng", alertColor: ORANGE, alertBg: "#FCEFD6", status: "Đang dùng", date: "10/01/2024", author: "Nguyễn Thu Hà" },
    { stt: "05", code: "VT-BB-0044", name: "Màng PE quấn pallet 50cm khổ tiêu chuẩn (Mẫu cũ)", barcode: "8935012404491", badge: "BOX", group: "Vật tư bao bì", groupMuted: true, unit: "Cuộn", spec: "Rộng 50cm x Dài 300m - 2.8kg", type: "Vật tư tiêu hao", total: "0", held: "0", avail: "0", min: "0", alert: "Hết hàng", alertColor: "#777", alertBg: "#EDEDED", status: "Ngừng sử dụng", statusMuted: true, date: "15/08/2023", author: "Hoàng Văn Nam" },
    { stt: "06", code: "VT-NVL-00308", name: "Chỉ nẹp viền PVC vân sồi Oak Light 21mm x 1mm", barcode: "8935012405521", badge: "PVC", group: "Gỗ & Ván CN", unit: "Mét", spec: "Bản rộng 21mm x dày 1.0mm", type: "Nguyên vật liệu chính", total: "15,600", held: "3,200", avail: "12,400", min: "2,000", alert: "An toàn", alertColor: GREEN, alertBg: COLORS.BASIC, status: "Đang dùng", date: "22/03/2024", author: "Trần Đình Quang" },
];

const legend = [
    { color: GREEN, label: "Tồn an toàn" },
    { color: ORANGE, label: "Sắp hết hàng" },
    { color: RED, label: "Dưới mức tối thiểu" },
    { color: "#BBB", label: "Hết hàng tồn" },
];

const ListOfSupplies = () => {
    return (
        <Page title="Danh mục vật tư">
            <Box bgcolor="#F7F8F4" pb={2}>
                {/* ----------------- title ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={1.5} display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" gap={2}>
                    <Box>
                        <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}>
                            Danh mục Vật tư
                        </Typography>
                        <Typography variant="body2" color="text.secondary" maxWidth={620}>
                            Quản lý danh sách định danh, mã hóa SKU, thông số kỹ thuật và giám sát biến động tồn kho khả dụng thời gian thực phục vụ chuỗi cung ứng sản xuất.
                        </Typography>
                    </Box>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                        <Button variant="outlined" startIcon={<DescriptionOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>Xuất Excel / Báo cáo</Button>
                        <Button variant="outlined" startIcon={<ViewColumnOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>Tùy chỉnh cột</Button>
                        <Button variant="outlined" startIcon={<Refresh />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>Làm mới</Button>
                        <Button variant="contained" startIcon={<AddBox />} sx={{ bgcolor: "#15241A" }}>Thêm mới vật tư (F2)</Button>
                    </Stack>
                </Box>

                {/* ----------------- KPI ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Grid container spacing={2}>
                        {kpis.map((k, i) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
                                <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%", bgcolor: k.bg }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                            <Typography variant="caption" fontWeight={700} color="text.secondary">{k.title}</Typography>
                                            <Box width={36} height={36} borderRadius={1.5} bgcolor={`${k.accent}1A`} color={k.accent} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                                                {k.icon}
                                            </Box>
                                        </Box>
                                        <Box mt={1} display="flex" alignItems="baseline" gap={0.5} flexWrap="wrap">
                                            <Typography variant="h5" fontWeight={700} color={k.accent === RED ? RED : "inherit"}>{k.value}</Typography>
                                            <Typography variant="caption" color="text.secondary">{k.unit}</Typography>
                                        </Box>
                                        <Box mt={1} display="flex" flexWrap="wrap" justifyContent="space-between" gap={0.5}>
                                            <Typography variant="caption" fontWeight={600} color={k.footLeftColor}>{k.footLeft}</Typography>
                                            <Typography variant="caption" fontWeight={600} color={k.footRightColor}>{k.footRight}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* ----------------- filters card ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            {/* search + quick filters */}
                            <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} justifyContent="space-between" gap={2}>
                                <TextField
                                    size="small"
                                    defaultValue="VT-NVL"
                                    sx={{ minWidth: { lg: 360 }, flexGrow: 1 }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
                                        endAdornment: <InputAdornment position="end"><QrCode2 fontSize="small" sx={{ color: "text.secondary" }} /></InputAdornment>,
                                    }}
                                />
                                <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
                                    <Typography variant="caption" fontWeight={700} color="text.secondary">BỘ LỌC NHANH:</Typography>
                                    {quickFilters.map((q) => (
                                        <Chip
                                            key={q.label}
                                            label={q.label}
                                            onClick={() => {}}
                                            sx={{
                                                bgcolor: q.active ? COLORS.BASIC : "#F2F2F2",
                                                color: q.active ? GREEN : q.dot || "#555",
                                                fontWeight: 600,
                                                border: q.active ? `1px solid ${GREEN}` : "none",
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Box>

                            {/* dropdowns */}
                            <Grid container spacing={2} mt={0.5} alignItems="flex-end">
                                {dropdowns.map((d) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={d.label}>
                                        <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={0.5}>{d.label}</Typography>
                                        <TextField select size="small" fullWidth value={d.value}>
                                            <MenuItem value={d.value}>{d.value}</MenuItem>
                                        </TextField>
                                    </Grid>
                                ))}
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                                    <Stack direction="row" gap={1}>
                                        <Button fullWidth variant="contained" startIcon={<FilterAltOutlined />} sx={{ bgcolor: GREEN }}>Lọc dữ liệu</Button>
                                        <IconButton sx={{ border: "1px solid #ddd", borderRadius: 1 }}><Refresh /></IconButton>
                                    </Stack>
                                </Grid>
                            </Grid>

                            {/* active filters */}
                            <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center" mt={2}>
                                <Typography variant="caption" color="text.secondary">Bộ lọc đang kích hoạt:</Typography>
                                {activeFilters.map((f) => (
                                    <Chip key={f} size="small" label={f} onDelete={() => {}} deleteIcon={<Close />} sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                ))}
                                <Typography variant="caption" color={RED} fontWeight={600} sx={{ cursor: "pointer" }}>Xóa tất cả (Clear all)</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>

                {/* ----------------- table card ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            {/* toolbar */}
                            <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} justifyContent="space-between" gap={1.5} alignItems={{ lg: "center" }}>
                                <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
                                    <Checkbox size="small" sx={{ p: 0.5 }} />
                                    <Typography variant="caption" fontWeight={600}>Chọn tất cả trang này (10)</Typography>
                                    <Typography variant="caption" color="text.secondary">Đã chọn: <b>2 vật tư</b></Typography>
                                    <Button size="small" variant="outlined" startIcon={<QrCode2 />} sx={{ border: "1px solid #ddd", color: "#333" }}>In nhãn mã vạch</Button>
                                    <Button size="small" variant="outlined" startIcon={<SwapHorizOutlined />} sx={{ border: "1px solid #ddd", color: "#333" }}>Tạo phiếu điều chuyển</Button>
                                    <Button size="small" variant="outlined" sx={{ border: `1px solid ${RED}`, color: RED }}>⊘ Ngừng kinh doanh</Button>
                                </Stack>
                                <Typography variant="caption" color="text.secondary" noWrap>⊟ Chế độ xem: Đầy đủ định mức tồn</Typography>
                            </Box>

                            <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                <Table sx={{ minWidth: 1500 }}>
                                    <TableHead>
                                        <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 11, whiteSpace: "nowrap" } }}>
                                            <TableCell padding="checkbox" />
                                            <TableCell>STT</TableCell>
                                            <TableCell>MÃ VẬT TƯ</TableCell>
                                            <TableCell>TÊN VẬT TƯ & HÌNH ẢNH</TableCell>
                                            <TableCell>NHÓM VẬT TƯ</TableCell>
                                            <TableCell>ĐVT</TableCell>
                                            <TableCell>QUY CÁCH / KỸ THUẬT</TableCell>
                                            <TableCell>LOẠI VẬT TƯ</TableCell>
                                            <TableCell align="right">TỔNG TỒN</TableCell>
                                            <TableCell align="right">GIỮ CHỖ</TableCell>
                                            <TableCell align="right">KHẢ DỤNG</TableCell>
                                            <TableCell align="right">TỒN T.THIỂU</TableCell>
                                            <TableCell>CẢNH BÁO TỒN</TableCell>
                                            <TableCell>TRẠNG THÁI</TableCell>
                                            <TableCell>NGÀY & NGƯỜI TẠO</TableCell>
                                            <TableCell align="center">THAO TÁC</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((r) => (
                                            <TableRow key={r.code} hover selected={r.checked} sx={{ "&.Mui-selected": { bgcolor: "#F2F7EE" } }}>
                                                <TableCell padding="checkbox"><Checkbox size="small" checked={r.checked} /></TableCell>
                                                <TableCell>{r.stt}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" gap={0.3} alignItems="center">
                                                        <Typography variant="caption" fontWeight={700} color={GREEN}>{r.code}</Typography>
                                                        <LaunchOutlined sx={{ fontSize: 13, color: GREEN }} />
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 280 }}>
                                                    <Stack direction="row" gap={1} alignItems="center">
                                                        <Box width={38} height={38} borderRadius={1} bgcolor={COLORS.BASIC} flexShrink={0} display="flex" alignItems="center" justifyContent="center" color={GREEN}>
                                                            {r.badge ? <Typography variant="caption" fontWeight={700}>{r.badge}</Typography> : <InventoryOutlined fontSize="small" />}
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="body2" fontWeight={600}>{r.name}</Typography>
                                                            <Typography variant="caption" color="text.secondary">Barcode: {r.barcode}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={r.group} sx={{ bgcolor: r.groupMuted ? "#EDEDED" : COLORS.BASIC, color: r.groupMuted ? "#777" : GREEN, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell>{r.unit}</TableCell>
                                                <TableCell sx={{ fontFamily: "monospace", fontSize: 12 }}>{r.spec}</TableCell>
                                                <TableCell>{r.type}</TableCell>
                                                <TableCell align="right"><Typography variant="body2" fontWeight={700}>{r.total}</Typography></TableCell>
                                                <TableCell align="right">{r.held}</TableCell>
                                                <TableCell align="right"><Typography variant="body2" fontWeight={700} color={r.availAlert ? RED : GREEN}>{r.avail}</Typography></TableCell>
                                                <TableCell align="right">{r.min}</TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={`● ${r.alert}`} sx={{ bgcolor: r.alertBg, color: r.alertColor, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={r.status} sx={{ bgcolor: r.statusMuted ? "#EDEDED" : COLORS.BASIC, color: r.statusMuted ? "#777" : GREEN, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="caption" display="block">{r.date}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{r.author}</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Stack direction="row" justifyContent="center">
                                                        <IconButton size="small"><Visibility fontSize="small" sx={{ color: "text.secondary" }} /></IconButton>
                                                        <IconButton size="small"><EditOutlined fontSize="small" sx={{ color: "text.secondary" }} /></IconButton>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* footer */}
                            <Box mt={2} display="flex" flexDirection={{ xs: "column", lg: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", lg: "center" }} gap={1.5}>
                                <Stack direction="row" flexWrap="wrap" gap={1.5} alignItems="center">
                                    <Typography variant="caption" fontWeight={700} color="text.secondary">CHÚ THÍCH TỒN:</Typography>
                                    {legend.map((l) => (
                                        <Stack key={l.label} direction="row" gap={0.5} alignItems="center">
                                            <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: l.color }} />
                                            <Typography variant="caption" color="text.secondary">{l.label}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                                <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
                                    <Typography variant="caption" color="text.secondary">Số bản ghi / trang:</Typography>
                                    <TextField select size="small" value={10} sx={{ width: 72 }}>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={25}>25</MenuItem>
                                        <MenuItem value={50}>50</MenuItem>
                                    </TextField>
                                    <Typography variant="caption" color="text.secondary">Hiển thị 1 - 10 của 1.248</Typography>
                                    <Stack direction="row" gap={0.5} alignItems="center">
                                        <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}><Typography variant="caption">{"<"}</Typography></IconButton>
                                        {[1, 2, 3].map((p) => (
                                            <Button key={p} size="small" variant={p === 1 ? "contained" : "outlined"} sx={{ minWidth: 30, bgcolor: p === 1 ? "#15241A" : "#fff", border: p === 1 ? "none" : "1px solid #ddd", color: p === 1 ? "#fff" : "#333" }}>{p}</Button>
                                        ))}
                                        <Typography variant="caption" color="text.secondary">...</Typography>
                                        <Button size="small" variant="outlined" sx={{ minWidth: 36, border: "1px solid #ddd", color: "#333" }}>125</Button>
                                        <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}><Typography variant="caption">{">"}</Typography></IconButton>
                                    </Stack>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* ----------------- bottom LSX bar ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={2}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1, bgcolor: COLORS.BASIC }}>
                        <CardContent>
                            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={2}>
                                <Stack direction="row" gap={1.5} alignItems="flex-start">
                                    <Box width={40} height={40} borderRadius={1.5} bgcolor="#fff" color={GREEN} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                                        <SwapHorizOutlined />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={700}>Quy chuẩn định lượng & Cân đối vật tư theo Lệnh Sản Xuất (LSX)</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Số lượng tồn khả dụng = Tổng tồn thực tế - (Lượng đặt trước cho LSX đã duyệt + Đơn hàng bán chờ xuất). Hệ thống tự động khóa vật tư khi phát sinh lệnh duyệt.
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" flexWrap="wrap" gap={1} flexShrink={0}>
                                    <Button variant="outlined" startIcon={<RuleFolderOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #cfe0c2", color: "#333" }}>Kiểm tra định mức BOM</Button>
                                    <Button variant="contained" startIcon={<InventoryOutlined />} sx={{ bgcolor: "#15241A" }}>Nhật ký xuất nhập tồn (Kardex)</Button>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Page>
    );
};

export default ListOfSupplies;
