import { COLORS } from "@/constants/colors";
import {
    AccessTime,
    Add,
    CheckCircleOutline,
    DeleteOutline,
    EditOutlined,
    ErrorOutline,
    FilterAltOutlined,
    HourglassEmptyOutlined,
    Inventory2Outlined,
    LockOutlined,
    ReceiptLongOutlined,
    Search,
    SyncAltOutlined,
    Visibility,
    WarningAmberOutlined,
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
import SearchBox from "../../components/SearchTextBox";
import { useState } from "react";
import ImportTicket from "./components/ImportTicket";

const GREEN = COLORS.BUTTON;
const BLUE = "#2F6FE7";
const AMBER = "#E7A22F";
const RED = "#BA1B1C";
const PURPLE = "#9C27B0";

/* ------------------------- dữ liệu mẫu ------------------------- */
const kpis = [
    {
        icon: <ReceiptLongOutlined />,
        iconColor: PURPLE,
        title: "Tổng vật tư tồn kho",
        value: "1248",
        unit: "đơn vị",
        rows: [
            { label: "Tổng giá trị", value: "480.000.000 đ" },
            { label: "Tỷ lệ an toàn", value: "🛡 96.8 %" },
        ],
    },
    {
        icon: <Inventory2Outlined />,
        iconColor: BLUE,
        title: "Phiếu nhập hôm nay",
        value: "12",
        unit: "phiếu",
        rows: [
            { label: "Hoàn tất", value: "09/12 phiếu" },
            { label: "Khối lượng", value: "🏷 2000 sp" },
        ],
    },
    {
        icon: <SyncAltOutlined />,
        iconColor: AMBER,
        title: "Chờ đối chiếu",
        value: "03",
        unit: "phiếu",
        rows: [
            { label: "Kết quả", value: "0/ 3 phiếu" },
            { label: "Phiếu cần hoàn tất", value: "📄 3 phiếu" },
        ],
    },
    {
        icon: <WarningAmberOutlined />,
        iconColor: RED,
        title: "Phiếu chênh lệch",
        value: "02",
        unit: "phiếu",
        rows: [
            { label: "SL thực tế", value: "1200 sp" },
            { label: "SL thiếu", value: "🏷 20 sp" },
        ],
    },
];

const tabs = [
    { label: "Tất cả", icon: <FilterAltOutlined fontSize="small" />, active: true },
    { label: "Chênh lệch", icon: <ErrorOutline fontSize="small" /> },
    { label: "Chờ đối chiếu", icon: <HourglassEmptyOutlined fontSize="small" /> },
    { label: "Đã khớp", icon: <CheckCircleOutline fontSize="small" /> },
];

type StatusKey = "match" | "waiting" | "diff" | "booked";

const statusMap: Record<StatusKey, { label: string; color: string; icon: React.ReactNode }> = {
    match: { label: "Trùng khớp", color: GREEN, icon: <CheckCircleOutline sx={{ fontSize: 16 }} /> },
    waiting: { label: "Chờ đối chiếu", color: AMBER, icon: <AccessTime sx={{ fontSize: 16 }} /> },
    diff: { label: "Chênh lệch", color: RED, icon: <ErrorOutline sx={{ fontSize: 16 }} /> },
    booked: { label: "Đã hạch toán", color: BLUE, icon: <LockOutlined sx={{ fontSize: 16 }} /> },
};

interface Row {
    code: string;
    date: string;
    supplier: string;
    type: string;
    qty: string;
    diff: string;
    status: StatusKey;
}

const rows: Row[] = [
    { code: "DVT001", date: "23/12/2026", supplier: "CTY CP gỗ Hòa Phát", type: "Gỗ xoan", qty: "200 tấm", diff: "0 sp", status: "match" },
    { code: "DVT002", date: "18/12/2026", supplier: "CTY CP gỗ Hòa Phát", type: "Gỗ xà cừ", qty: "100 tấm", diff: "Chưa biết", status: "waiting" },
    { code: "DVT002", date: "10/12/2026", supplier: "CTY gỗ Vượng Thịnh", type: "Gỗ lướt", qty: "20 tấn", diff: "200 kg", status: "diff" },
    { code: "DVT002", date: "10/12/2026", supplier: "CTY gỗ Hòa Phát", type: "Gỗ xưa", qty: "100 tấn", diff: "0 sp", status: "booked" },
    { code: "DVT001", date: "23/12/2026", supplier: "CTY CP gỗ Hòa Phát", type: "Gỗ xoan", qty: "200 tấm", diff: "0 sp", status: "match" },
    { code: "DVT002", date: "18/12/2026", supplier: "CTY CP gỗ Hòa Phát", type: "Gỗ xà cừ", qty: "100 tấm", diff: "Chưa biết", status: "waiting" },
    { code: "DVT002", date: "10/12/2026", supplier: "CTY gỗ Vượng Thịnh", type: "Gỗ lướt", qty: "20 tấn", diff: "200 kg", status: "diff" },
    { code: "DVT002", date: "10/12/2026", supplier: "CTY gỗ Hòa Phát", type: "Gỗ xưa", qty: "100 tấn", diff: "0 sp", status: "booked" },
];

const DashboardAccountant = () => {
    const [openImportTicket, setOpenImportTicket] = useState(false);
    const handleOpenImportTicket = () => {
        setOpenImportTicket(true)
    }

    const handleCloseImportTicket = () => {
        setOpenImportTicket(false)
    }
    return (
        <Box bgcolor="#F7F8F4" minHeight="100%">
            {!openImportTicket && (
                <Box p={{ xs: 2, md: 3 }}>
                    {/* ----------------- toolbar ----------------- */}
                    <SearchBox
                        initialValue=""
                        onSearch={() => {}}
                        placeholder="Tìm kiếm"
                    >
                        <Button onClick={handleOpenImportTicket} variant="outlined" startIcon={<Add />} sx={{ borderRadius: 3, border: "1.5px solid #222", color: "#222", fontWeight: 700, px: 2.5 }}>
                            Tạo phiếu nhập kho
                        </Button>
                    </SearchBox>

                    {/* ----------------- heading ----------------- */}
                    <Typography variant="h6" fontWeight={700} mt={3}>Bảng theo dõi sản phẩm</Typography>

                    {/* ----------------- KPI ----------------- */}
                    <Grid container spacing={2} mt={0.5}>
                        {kpis.map((k, i) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
                                <Card sx={{ borderRadius: 3, boxShadow: 2, height: "100%" }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                            <Typography variant="body2" color="text.secondary">{k.title}</Typography>
                                            <Box width={40} height={40} borderRadius={2} bgcolor={`${k.iconColor}1A`} color={k.iconColor} display="flex" alignItems="center" justifyContent="center">
                                                {k.icon}
                                            </Box>
                                        </Box>
                                        <Box display="flex" alignItems="baseline" gap={0.5} mt={1}>
                                            <Typography variant="h4" fontWeight={700}>{k.value}</Typography>
                                            <Typography variant="body2" color="text.secondary">{k.unit}</Typography>
                                        </Box>
                                        <Box mt={1.5} pt={1.5} borderTop="1px solid #f0f0f0">
                                            {k.rows.map((r, j) => (
                                                <Box key={j} display="flex" justifyContent="space-between" mb={j === 0 ? 0.5 : 0}>
                                                    <Typography variant="caption" color="text.secondary">{r.label}</Typography>
                                                    <Typography variant="caption" fontWeight={600}>{r.value}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* ----------------- filter tabs ----------------- */}
                    <Stack direction="row" flexWrap="wrap" gap={1.5} alignItems="center" mt={3}>
                        <Typography variant="body2" color="text.secondary" mr={1}>Lọc nâng cao</Typography>
                        {tabs.map((t) => (
                            <Button
                                key={t.label}
                                startIcon={t.icon}
                                sx={{
                                    borderRadius: 3,
                                    px: 2.5,
                                    bgcolor: t.active ? GREEN : "#fff",
                                    color: t.active ? "#fff" : "#444",
                                    border: t.active ? "none" : "1.5px solid #222",
                                    fontWeight: 600,
                                    "&:hover": { bgcolor: t.active ? GREEN : "#f5f5f5" },
                                }}
                            >
                                {t.label}
                            </Button>
                        ))}
                    </Stack>

                    {/* ----------------- table ----------------- */}
                    <TableContainer component={Card} sx={{ mt: 2, borderRadius: 3, boxShadow: 2, overflowX: "auto" }}>
                        <Table sx={{ minWidth: 900 }}>
                            <TableHead>
                                <TableRow sx={{ "& th": { fontWeight: 700, color: "#333", borderBottom: "2px solid #eee" } }}>
                                    <TableCell padding="checkbox" sx={{ pl: 2 }}><Checkbox size="small" defaultChecked /></TableCell>
                                    <TableCell>Mã phiếu</TableCell>
                                    <TableCell>Ngày nhập</TableCell>
                                    <TableCell>Nhà cung cấp</TableCell>
                                    <TableCell>Loại vật tư</TableCell>
                                    <TableCell>Số lượng nhập</TableCell>
                                    <TableCell>Chênh lệch</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell>Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((r, i) => {
                                    const s = statusMap[r.status];
                                    return (
                                        <TableRow key={i} hover>
                                            <TableCell padding="checkbox" sx={{ pl: 2 }}><Checkbox size="small" defaultChecked /></TableCell>
                                            <TableCell><Typography variant="body2" fontWeight={600}>{r.code}</Typography></TableCell>
                                            <TableCell>{r.date}</TableCell>
                                            <TableCell>{r.supplier}</TableCell>
                                            <TableCell>{r.type}</TableCell>
                                            <TableCell>{r.qty}</TableCell>
                                            <TableCell>{r.diff}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    icon={<Box sx={{ color: `${s.color} !important`, display: "flex" }}>{s.icon}</Box>}
                                                    label={s.label}
                                                    variant="outlined"
                                                    sx={{ color: s.color, borderColor: `${s.color}66`, bgcolor: `${s.color}0D`, fontWeight: 600, borderRadius: 3 }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction="row" gap={0.5}>
                                                    <IconButton size="small"><Visibility fontSize="small" sx={{ color: "text.secondary" }} /></IconButton>
                                                    <IconButton size="small"><EditOutlined fontSize="small" sx={{ color: "text.secondary" }} /></IconButton>
                                                    <IconButton size="small"><DeleteOutline fontSize="small" sx={{ color: "text.secondary" }} /></IconButton>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>                
            )}
            {openImportTicket && (
                <ImportTicket
                    onBack={handleCloseImportTicket}
                />
            )}
        </Box>
    );
};

export default DashboardAccountant;
