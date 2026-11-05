import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import {
    Add,
    AddCircleOutline,
    AssessmentOutlined,
    AttachFile,
    CalendarMonth,
    CheckCircle,
    DeleteOutline,
    Description,
    FilterList,
    HistoryOutlined,
    LocalShippingOutlined,
    MoreVert,
    PendingActionsOutlined,
    PersonOutline,
    PictureAsPdf,
    PrintOutlined,
    QrCodeScanner,
    Save,
    Search,
    Send,
    SwapHoriz,
    TrendingUp,
    VerifiedUserOutlined,
    Visibility,
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
    IconButton,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const GREEN = COLORS.BUTTON;
const ORANGE = "#E7A22F";
const RED = "#BA1B1C";

/* ------------------------- dữ liệu mẫu ------------------------- */
const kpis = [
    {
        icon: <WarehouseOutlined />,
        title: "TỔNG GIÁ TRỊ NHẬP THÁNG 10",
        value: "482,900,000 đ",
        note: "+14.2% so với tháng trước",
        noteIcon: <TrendingUp sx={{ fontSize: 16 }} />,
        noteColor: COLORS.TEXT,
        accent: GREEN,
    },
    {
        icon: <VerifiedUserOutlined />,
        title: "PHIẾU NHẬP HOÀN TẤT",
        value: "42 phiếu",
        note: "100% kiểm tra tiêu chuẩn",
        noteIcon: <CheckCircle sx={{ fontSize: 16 }} />,
        noteColor: COLORS.TEXT,
        accent: GREEN,
    },
    {
        icon: <PendingActionsOutlined />,
        title: "CHỜ NGHIỆM THU VẬT TƯ",
        value: "03 lô gỗ",
        note: "1 lô kiểm độ ẩm lõi xanh",
        noteIcon: <PendingActionsOutlined sx={{ fontSize: 16 }} />,
        noteColor: ORANGE,
        accent: ORANGE,
    },
    {
        icon: <LocalShippingOutlined />,
        title: "NHÀ CUNG CẤP UY TÍN",
        value: "08 đối tác",
        note: "Gỗ An Cường dẫn đầu quy mô",
        noteIcon: <LocalShippingOutlined sx={{ fontSize: 16 }} />,
        noteColor: "text.secondary",
        accent: GREEN,
    },
];

const materials = [
    {
        stt: "01",
        code: "MDF-AC-17X",
        name: "MDF An Cường chống ẩm 17mm lõi xanh",
        spec: "Quy cách tiêu chuẩn: 1220 x 2440 x 17mm • Tỷ trọng 720kg/m³",
        unit: "Tấm",
        invQty: "100",
        realQty: "100",
        price: "390,000 đ",
        total: "39,000,000 đ",
        note: "Lô AC-2024-K2, đã test độ ẩm <9%",
    },
    {
        stt: "02",
        code: "PVC-AC-2212",
        name: "Chỉ viền PVC An Cường đồng màu 1.2mm x 22mm",
        spec: "Mã vân 388EV • Dẻo đàn hồi chịu nhiệt cao",
        unit: "Mét",
        invQty: "500",
        realQty: "500",
        price: "4,500 đ",
        total: "2,250,000 đ",
        note: "Đồng màu mã ván đơn hàng Master Villa",
    },
    {
        stt: "03",
        code: "KEO-JOWAT-25",
        name: "Keo nhiệt dán cạnh Jowat Đức",
        spec: "Nhiệt độ nóng chảy 190°C - 210°C • Bao 25kg nguyên đai",
        unit: "Bao (25kg)",
        invQty: "4",
        realQty: "4",
        price: "1,850,000 đ",
        total: "7,400,000 đ",
        note: "Dùng cho máy dán cạnh tự động Homag",
    },
];

const recentReceipts = [
    { code: "PNK-202410-042", date: "24/10/2024", supplier: "Gỗ An Cường JSC", warehouse: "Kho chính - Xưởng mộc 1", total: "52,542,000 đ", status: "Đã nhập kho", statusColor: GREEN },
    { code: "PNK-202410-041", date: "22/10/2024", supplier: "Häfele Việt Nam", warehouse: "Kho phụ kiện & Ngũ kim", total: "18,340,000 đ", status: "Đã nhập kho", statusColor: GREEN },
    { code: "PNK-202410-040", date: "20/10/2024", supplier: "Gỗ Ghép Việt Mỹ Bình Dương", warehouse: "Kho ván thô & Gỗ thịt", total: "86,700,000 đ", status: "Chờ duyệt KCS", statusColor: ORANGE },
    { code: "PNK-202410-039", date: "18/10/2024", supplier: "Sơn Gỗ & Hóa Chất Oseven", warehouse: "Kho sơn hoàn thiện", total: "12,650,000 đ", status: "Đã nhập kho", statusColor: GREEN },
];

/* ------------------------- helper ------------------------- */
const FieldBox = ({ label, value, icon, action }: { label: string; value: string; icon?: React.ReactNode; action?: string }) => (
    <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            {action && (
                <Typography variant="caption" color={GREEN} fontWeight={600} sx={{ cursor: "pointer" }}>
                    {action}
                </Typography>
            )}
        </Box>
        <TextField
            fullWidth
            size="small"
            defaultValue={value}
            InputProps={{
                readOnly: true,
                startAdornment: icon ? (
                    <InputAdornment position="start" sx={{ color: GREEN }}>
                        {icon}
                    </InputAdornment>
                ) : undefined,
            }}
            sx={{ "& .MuiOutlinedInput-root": { bgcolor: COLORS.BASIC } }}
        />
    </Box>
);

const Import = () => {
    return (
        <Page title="Nhập kho">
            <Box bgcolor="#F4F8EF" pb={4}>
                {/* ----------------- header ----------------- */}
                <Box px={{ xs: 2, md: 3 }} pt={3}>
                    <Box
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", md: "flex-start" }}
                        gap={2}
                    >
                        <Box>
                            <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
                                <Typography variant="caption" fontWeight={700} color="text.secondary">
                                    PHÂN HỆ KHO XƯỞNG • MODULE 02
                                </Typography>
                                <FiberDot />
                                <Typography variant="caption" color="text.secondary">
                                    Kho Tân Bình: Đồng bộ trực tuyến
                                </Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}>
                                Quản Lý Nhập Kho Vật Tư
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lập phiếu tiếp nhận gỗ công nghiệp, phụ kiện cơ khí và vật tư hoàn thiện vào dây chuyền xưởng mộc.
                            </Typography>
                        </Box>
                        <Stack direction="row" flexWrap="wrap" gap={1.5}>
                            <Button variant="outlined" startIcon={<HistoryOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                Lịch sử nhập kho
                            </Button>
                            <Button variant="outlined" startIcon={<AssessmentOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                Báo cáo mua hàng
                            </Button>
                            <Button variant="contained" startIcon={<AddCircleOutline />} sx={{ bgcolor: GREEN }}>
                                Tạo phiếu nhập kho mới
                            </Button>
                        </Stack>
                    </Box>
                </Box>

                {/* ----------------- KPI ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Grid container spacing={2}>
                        {kpis.map((k, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                                <Card sx={{ borderRadius: 2, boxShadow: 1, height: "100%" }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
                                            <Box>
                                                <Typography variant="caption" fontWeight={700} color="text.secondary">
                                                    {k.title}
                                                </Typography>
                                                <Typography variant="h5" fontWeight={700} mt={0.5}>
                                                    {k.value}
                                                </Typography>
                                            </Box>
                                            <Avatar variant="rounded" sx={{ bgcolor: COLORS.BASIC, color: k.accent, width: 44, height: 44, flexShrink: 0 }}>
                                                {k.icon}
                                            </Avatar>
                                        </Box>
                                        <Stack direction="row" alignItems="center" gap={0.5} mt={1} color={k.noteColor}>
                                            {k.noteIcon}
                                            <Typography variant="caption" color={k.noteColor} fontWeight={600}>
                                                {k.note}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* ----------------- chi tiết phiếu nhập ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            {/* tiêu đề + actions */}
                            <Box
                                display="flex"
                                flexDirection={{ xs: "column", md: "row" }}
                                justifyContent="space-between"
                                alignItems={{ xs: "flex-start", md: "center" }}
                                gap={2}
                            >
                                <Box display="flex" gap={1.5} alignItems="center">
                                    <Avatar variant="rounded" sx={{ bgcolor: GREEN, width: 42, height: 42 }}>
                                        <Description />
                                    </Avatar>
                                    <Box>
                                        <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
                                            <Typography variant="h6" fontWeight={700}>
                                                Chi Tiết Phiếu Nhập Kho
                                            </Typography>
                                            <Chip size="small" label="● Đã nhập kho" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary">
                                            Ghi nhận chứng từ nhập kho vật tư cơ sở sản xuất
                                        </Typography>
                                    </Box>
                                </Box>
                                <Stack direction="row" flexWrap="wrap" gap={1}>
                                    <Button variant="outlined" startIcon={<PrintOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                        In phiếu (A4)
                                    </Button>
                                    <Button variant="outlined" startIcon={<Send />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>
                                        Gửi kế toán
                                    </Button>
                                    <Button variant="contained" startIcon={<Save />} sx={{ bgcolor: GREEN }}>
                                        Lưu phiếu
                                    </Button>
                                </Stack>
                            </Box>

                            <Divider sx={{ my: 2.5 }} />

                            {/* form fields */}
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FieldBox label="Số Phiếu Nhập" value="PNK-202410-042" icon={<Typography fontWeight={700}>#</Typography>} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FieldBox label="Ngày Nhập Kho" value="24/10/2024 - 08:30" icon={<CalendarMonth fontSize="small" />} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FieldBox label="Nhà Cung Cấp (NCC)" value="Gỗ An Cường JSC (Mã: NCC-ANCUONG)" action="+ Thêm NCC" />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FieldBox label="Người Lập Phiếu" value="Trần Văn Toàn (Quản đốc)" icon={<PersonOutline fontSize="small" />} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FieldBox label="Kho Tiếp Nhận" value="Kho chính - Xưởng mộc 1" icon={<WarehouseOutlined fontSize="small" />} />
                                </Grid>
                            </Grid>

                            {/* đính kèm */}
                            <Box
                                mt={2.5}
                                p={2}
                                borderRadius={2}
                                bgcolor="#FAFAF7"
                                display="flex"
                                flexDirection={{ xs: "column", md: "row" }}
                                justifyContent="space-between"
                                alignItems={{ xs: "flex-start", md: "center" }}
                                gap={2}
                            >
                                <Box display="flex" gap={1.5} alignItems="center">
                                    <Avatar variant="rounded" sx={{ bgcolor: COLORS.BASIC, color: GREEN }}>
                                        <AttachFile />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2">
                                            Đính kèm chứng từ:{" "}
                                            <Typography component="span" variant="body2" fontWeight={700} color={GREEN} sx={{ textDecoration: "underline" }}>
                                                HĐ_VAT_ANCUONG_88291.pdf
                                            </Typography>{" "}
                                            <Typography component="span" variant="caption" color="text.secondary">
                                                (2.4 MB)
                                            </Typography>
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Kèm biên bản nghiệm thu độ ẩm lô gỗ & chất lượng cạnh dán ván dăm
                                        </Typography>
                                    </Box>
                                </Box>
                                <Stack direction="row" flexWrap="wrap" gap={1}>
                                    <Button variant="outlined" size="small" startIcon={<Visibility />} sx={{ border: "1px solid #ddd", color: "#333" }}>
                                        Xem trước file
                                    </Button>
                                    <Button variant="outlined" size="small" startIcon={<SwapHoriz />} sx={{ border: "1px solid #ddd", color: "#333" }}>
                                        Đổi file đính kèm
                                    </Button>
                                </Stack>
                            </Box>

                            {/* danh sách vật tư */}
                            <Box
                                mt={3}
                                display="flex"
                                flexDirection={{ xs: "column", sm: "row" }}
                                justifyContent="space-between"
                                alignItems={{ xs: "flex-start", sm: "center" }}
                                gap={1.5}
                            >
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography variant="h6" fontWeight={700}>
                                        Danh Sách Vật Tư Nhập
                                    </Typography>
                                    <Chip size="small" label="03 Mục" sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 600 }} />
                                </Stack>
                                <Stack direction="row" flexWrap="wrap" gap={1}>
                                    <Button variant="outlined" size="small" startIcon={<QrCodeScanner />} sx={{ border: "1px solid #ddd", color: "#333" }}>
                                        Quét mã vạch VT
                                    </Button>
                                    <Button variant="contained" size="small" startIcon={<Add />} sx={{ bgcolor: GREEN }}>
                                        Thêm dòng vật tư
                                    </Button>
                                </Stack>
                            </Box>

                            <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                <Table sx={{ minWidth: 980 }}>
                                    <TableHead>
                                        <TableRow sx={{ "& th": { bgcolor: "#FAFAF7", fontWeight: 700, color: "text.secondary", fontSize: 12 } }}>
                                            <TableCell>STT</TableCell>
                                            <TableCell>MÃ VT</TableCell>
                                            <TableCell>TÊN VẬT TƯ & QUY CÁCH</TableCell>
                                            <TableCell>ĐVT</TableCell>
                                            <TableCell align="right">SL HÓA ĐƠN</TableCell>
                                            <TableCell align="right">THỰC NHẬP</TableCell>
                                            <TableCell align="right">ĐƠN GIÁ NHẬP</TableCell>
                                            <TableCell align="right">THÀNH TIỀN</TableCell>
                                            <TableCell>GHI CHÚ / LÔ GỖ</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {materials.map((m) => (
                                            <TableRow key={m.stt} hover>
                                                <TableCell>{m.stt}</TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={m.code} sx={{ bgcolor: COLORS.BASIC, color: GREEN, fontWeight: 700 }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Box display="flex" gap={1.5} alignItems="center">
                                                        <Box width={40} height={40} borderRadius={1} bgcolor={COLORS.BASIC} flexShrink={0} display="flex" alignItems="center" justifyContent="center" color={GREEN}>
                                                            <WarehouseOutlined fontSize="small" />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="body2" fontWeight={600}>
                                                                {m.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {m.spec}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip size="small" label={m.unit} sx={{ bgcolor: COLORS.BASIC, fontWeight: 600 }} />
                                                </TableCell>
                                                <TableCell align="right">{m.invQty}</TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" fontWeight={700} color={GREEN}>
                                                        {m.realQty}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">{m.price}</TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" fontWeight={700}>
                                                        {m.total}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction="row" gap={0.5} alignItems="flex-start">
                                                        <FiberDot />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {m.note}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton size="small">
                                                        <DeleteOutline fontSize="small" sx={{ color: "text.secondary" }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* 2 panel: nghiệm thu + thanh toán */}
                            <Grid container spacing={2} mt={1}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box p={2} borderRadius={2} bgcolor="#FAFAF7" height="100%">
                                        <Stack direction="row" gap={1} alignItems="center" mb={1}>
                                            <Description fontSize="small" sx={{ color: GREEN }} />
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                Biên Bản Nghiệm Thu & Ghi Chú Giao Hàng
                                            </Typography>
                                        </Stack>
                                        <Box p={1.5} bgcolor="#fff" borderRadius={1} border="1px solid #eee">
                                            <Typography variant="body2" color="text.secondary">
                                                Hàng giao đủ số lượng 100 tấm MDF, không cong vênh hay ẩm mốc góc cạnh. Đã bốc dỡ an toàn vào dãy kệ A-04 kho chính Xưởng Tân Bình. Lái xe giao hàng An Cường: Nguyễn Văn Hưng (Biển số 51C-739.22).
                                            </Typography>
                                        </Box>
                                        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={1} mt={2}>
                                            <Typography variant="caption" color="text.secondary">
                                                Xác nhận: Thủ kho kiểm nhận đầy đủ
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Ký điện tử: TT-2024-889
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box p={2} borderRadius={2} bgcolor={COLORS.BASIC} height="100%">
                                        <Box display="flex" justifyContent="space-between" mb={1}>
                                            <Typography variant="body2" color="text.secondary">
                                                Tiền hàng trước thuế:
                                            </Typography>
                                            <Typography variant="body2" fontWeight={600}>
                                                48,650,000 đ
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                            <Stack direction="row" gap={1} alignItems="center">
                                                <Typography variant="body2" color="text.secondary">
                                                    Thuế giá trị gia tăng (VAT 8%):
                                                </Typography>
                                                <Chip size="small" label="NĐ 72/2024" sx={{ bgcolor: "#fff", fontWeight: 600, height: 20 }} />
                                            </Stack>
                                            <Typography variant="body2" fontWeight={600}>
                                                3,892,000 đ
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ my: 1.5 }} />
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" fontWeight={700}>
                                                TỔNG THANH TOÁN:
                                            </Typography>
                                            <Typography variant="h5" fontWeight={700} color={GREEN}>
                                                52,542,000 đ
                                            </Typography>
                                        </Box>

                                        <Box mt={2} p={1.5} bgcolor="#fff" borderRadius={1.5}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                                <Typography variant="caption" fontWeight={600}>
                                                    Tình Trạng Thanh Toán Đơn NCC:
                                                </Typography>
                                                <Chip size="small" label="Đã tạm ứng 50%" sx={{ bgcolor: "#FCEFD6", color: ORANGE, fontWeight: 600 }} />
                                            </Box>
                                            <Box display="flex" height={10} borderRadius={5} overflow="hidden">
                                                <Box width="50%" bgcolor={GREEN} />
                                                <Box width="50%" bgcolor={ORANGE} />
                                            </Box>
                                            <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={1} mt={1}>
                                                <Typography variant="caption" color="text.secondary">
                                                    Đã thanh toán tạm ứng:{" "}
                                                    <Typography component="span" variant="caption" fontWeight={700} color={GREEN}>
                                                        26,271,000 đ
                                                    </Typography>
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Còn nợ công nợ:{" "}
                                                    <Typography component="span" variant="caption" fontWeight={700} color={RED}>
                                                        26,271,000 đ (50%)
                                                    </Typography>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>

                {/* ----------------- danh sách phiếu gần nhất ----------------- */}
                <Box px={{ xs: 2, md: 3 }} mt={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box
                                display="flex"
                                flexDirection={{ xs: "column", md: "row" }}
                                justifyContent="space-between"
                                alignItems={{ xs: "flex-start", md: "center" }}
                                gap={2}
                            >
                                <Box>
                                    <Typography variant="h6" fontWeight={700}>
                                        Danh Sách Phiếu Nhập Kho Gần Nhất (Tháng 10/2024)
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Tổng hợp phiếu nhập nguyên liệu gỗ tấm, ray trượt, bản lề, hóa chất dán cạnh
                                    </Typography>
                                </Box>
                                <Stack direction="row" gap={1} width={{ xs: "100%", md: "auto" }}>
                                    <TextField
                                        size="small"
                                        placeholder="Tìm theo mã PNK hoặc NCC..."
                                        fullWidth
                                        sx={{ minWidth: { md: 260 } }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <IconButton sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                        <FilterList />
                                    </IconButton>
                                </Stack>
                            </Box>

                            <TableContainer sx={{ mt: 2, overflowX: "auto" }}>
                                <Table sx={{ minWidth: 900 }}>
                                    <TableHead>
                                        <TableRow sx={{ "& th": { fontWeight: 700, color: "text.secondary", fontSize: 12, borderBottom: "2px solid #eee" } }}>
                                            <TableCell>MÃ PHIẾU</TableCell>
                                            <TableCell>NGÀY NHẬP</TableCell>
                                            <TableCell>NHÀ CUNG CẤP</TableCell>
                                            <TableCell>KHO ĐÍCH</TableCell>
                                            <TableCell align="right">TỔNG TIỀN (VNĐ)</TableCell>
                                            <TableCell>TRẠNG THÁI KHO</TableCell>
                                            <TableCell align="center">CHỨNG TỪ</TableCell>
                                            <TableCell align="center">THAO TÁC</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentReceipts.map((r) => (
                                            <TableRow key={r.code} hover>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight={700} color={GREEN}>
                                                        {r.code}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{r.date}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {r.supplier}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {r.warehouse}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {r.total}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        size="small"
                                                        label={r.status}
                                                        sx={{
                                                            bgcolor: r.statusColor === ORANGE ? "#FCEFD6" : COLORS.BASIC,
                                                            color: r.statusColor,
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="small">
                                                        <Description fontSize="small" sx={{ color: GREEN }} />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Stack direction="row" justifyContent="center">
                                                        <Tooltip title="Xuất PDF">
                                                            <IconButton size="small">
                                                                <PictureAsPdf fontSize="small" sx={{ color: "text.secondary" }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <IconButton size="small">
                                                            <MoreVert fontSize="small" sx={{ color: "text.secondary" }} />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box mt={2} display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={1.5}>
                                <Typography variant="caption" color="text.secondary">
                                    Hiển thị 4 trong tổng số 42 phiếu nhập tháng 10
                                </Typography>
                                <Stack direction="row" gap={0.5} alignItems="center">
                                    <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                        <Typography variant="caption">{"<"}</Typography>
                                    </IconButton>
                                    {[1, 2, 3].map((p) => (
                                        <Button
                                            key={p}
                                            size="small"
                                            variant={p === 1 ? "contained" : "outlined"}
                                            sx={{
                                                minWidth: 32,
                                                bgcolor: p === 1 ? GREEN : "#fff",
                                                border: p === 1 ? "none" : "1px solid #ddd",
                                                color: p === 1 ? "#fff" : "#333",
                                            }}
                                        >
                                            {p}
                                        </Button>
                                    ))}
                                    <IconButton size="small" sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                                        <Typography variant="caption">{">"}</Typography>
                                    </IconButton>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Page>
    );
};

const FiberDot = () => (
    <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: COLORS.BUTTON, display: "inline-block", flexShrink: 0 }} />
);

export default Import;
