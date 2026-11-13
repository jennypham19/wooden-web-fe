import IconButton from "@/components/IconButton/IconButton";
import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import { Add, Edit, FileDownloadOutlined, Visibility } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Link,
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
import { useState } from "react";
import AddSuppliers from "./components/AddSuppliers";
import InputSelect from "@/components/InputSelect";
import SearchBox from "../components/SearchTextBox";

const GREEN = COLORS.BUTTON;
const RED = "#C0392B";

/* ------------------------- dữ liệu mẫu ------------------------- */
const filters = [
    { label: "Tìm kiếm", placeholder: "Tên, MST, người liên hệ...", search: true },
    { 
        label: "Mặt hàng", 
        value: "Tất cả", 
        options: [
            {
                value: 'all',
                label: "Tất cả"
            },
            {
                value: 'go-tu-nhien',
                label: "Gỗ tự nhiên"
            },
            {
                value: 'van-cong-nghiep',
                label: "Ván công nghiệp"
            },
            {
                value: 'phu-kien',
                label: "Phụ kiện"
            },
            {
                value: 'keo-son',
                label: "Keo & Sơn"
            },
        ] 
    },
    { 
        label: "Công nợ", 
        value: "Tất cả", 
        options: ["Tất cả", "Còn nợ", "Quá hạn", "Đã tất toán"] 
    },
    { 
        label: "Trạng thái", 
        value: "Đang giao dịch", 
        options: ["Đang giao dịch", "Ngừng giao dịch"] 
    },
];

interface Supp {
    code: string;
    name: string;
    link?: boolean;
    mst: string;
    goods: string;
    contact: string;
    term: string;
    debt: string;
    overdue: string;
    overdueRed?: boolean;
    active: boolean;
    importFile: number;
    differential: string;
}

const suppliers: Supp[] = [
    { code: "NCC-001", name: "CTY CP Gỗ Hòa Phát", link: true, mst: "0108384924", goods: "Gỗ tự nhiên, ván", contact: "Trần Văn Bình · 0912 345 678", term: "30 ngày", debt: "30.130.000đ", overdue: "0đ", active: true, importFile: 6, differential: '1/6 · 16,7%' },
    { code: "NCC-002", name: "CTY Gỗ Vượng Thịnh", mst: "0106622188", goods: "Gỗ tự nhiên", contact: "Lê Thu Hà · 0903 112 233", term: "15 ngày", debt: "148.900.000đ", overdue: "12.500.000đ", overdueRed: true, active: true, importFile: 5, differential: '2/5 · 40%' },
    { code: "NCC-003", name: "CTY TNHH Phụ kiện Minh Long", mst: "0105577341", goods: "Bản lề, ray, tay nắm", contact: "Phạm Hùng · 0988 456 789", term: "30 ngày", debt: "25.164.000đ", overdue: "0đ", active: true, importFile: 6, differential: '1/6 · 16,7%' },
    { code: "NCC-004", name: "CTY TNHH Keo sơn Phương Nam", mst: "0312228890", goods: "Keo, sơn, dung môi", contact: "Ngô Lan · 0977 654 321", term: "45 ngày", debt: "18.420.000đ", overdue: "0đ", active: true, importFile: 3, differential: '1/3 · 33,3%' },
    { code: "NCC-005", name: "CTY Ván ép An Phát", mst: "0107789012", goods: "Ván công nghiệp", contact: "Vũ Đức · 0965 000 111", term: "30 ngày", debt: "0đ", overdue: "0đ", active: false, importFile: 0, differential: '-' },
];

const Supplier = () => {
    const [openSuppliers, setOpenSuppliers] = useState<{open: boolean, type: string | null}>({ open: false, type: null });
    const handleOpenSuppliers = (type: string) => {
        switch (type) {
            case 'add':
                setOpenSuppliers({ open: true, type: type})
                break;
            case 'edit': 
                setOpenSuppliers({ open: true, type: type})
                break;      
            case 'view':
                setOpenSuppliers({ open: true, type: type})
                break;
        }
    } 

    const handleCloseSuppliers = (type: string) => {
        switch (type) {
            case 'add':
                setOpenSuppliers({ open: false, type: type})
                break;
            case 'edit': 
                setOpenSuppliers({ open: false, type: type})
                break;      
            case 'view':
                setOpenSuppliers({ open: false, type: type})
                break;
        }
    } 
    return (
        <Page title="Quản lý nhà cung cấp">
            {!openSuppliers.open && (
            <Box p={{ xs: 2, md: 3 }} bgcolor="#F7F8F4" minHeight="100%">
                {/* ----------------- title ----------------- */}
                <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-start" }} gap={2}>
                    <Box>
                        <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}>Nhà cung cấp</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phiếu nhập chọn NCC từ danh mục này, không gõ tay tên và MST
                        </Typography>
                    </Box>
                    <Stack direction="row" flexWrap="wrap" gap={1.5}>
                        <Button variant="outlined" startIcon={<FileDownloadOutlined />} sx={{ bgcolor: "#fff", border: "1px solid #ddd", color: "#333" }}>Xuất Excel</Button>
                        <Button onClick={() => handleOpenSuppliers('add')} variant="contained" startIcon={<Add />} sx={{ bgcolor: COLORS.BUTTON }}>Thêm nhà cung cấp</Button>
                    </Stack>
                </Box>

                {/* ----------------- filters ----------------- */}
                <Card sx={{ borderRadius: 3, boxShadow: 1, mt: 2.5 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            {filters.map((f) => (
                                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.label}>
                                    <Typography variant="body2" fontWeight={500} mb={0.5}>{f.label}</Typography>
                                    {f.search ? (
                                        <TextField fullWidth size="small" placeholder={f.placeholder} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, border: '1px solid #000' } }} />
                                    ) : (
                                        // <TextField select fullWidth size="small" defaultValue={f.value} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}>
                                        //     {f.options?.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                                        // </TextField>
                                        <InputSelect
                                            label=""
                                            name=""
                                            value={""}
                                            onChange={() => {}}
                                            options={f.options}
                                            transformOptions={data =>
                                                data.map((item) => ({
                                                    value: item.value,
                                                    label: item.label
                                                }))
                                            }
                                            placeholder={f.value}
                                        />
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>

                {/* ----------------- table ----------------- */}
                <TableContainer component={Card} sx={{ borderRadius: 3, boxShadow: 1, mt: 2.5, overflowX: "auto" }}>
                    <Table sx={{ minWidth: 1100 }}>
                        <TableHead>
                            <TableRow sx={{ "& th": { fontWeight: 700, color: "#333", borderBottom: "2px solid #eee", whiteSpace: "nowrap" } }}>
                                <TableCell>Mã</TableCell>
                                <TableCell>Tên nhà cung cấp</TableCell>
                                <TableCell>MST</TableCell>
                                <TableCell>Đơn vị cha</TableCell>
                                <TableCell>Mặt hàng chính</TableCell>
                                <TableCell>Liên hệ</TableCell>
                                <TableCell>Phiếu nhập</TableCell>
                                <TableCell>Chênh lệch</TableCell>
                                <TableCell>Hạn nợ</TableCell>
                                <TableCell align="right">Nợ hiện tại</TableCell>
                                <TableCell align="right">Quá hạn</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suppliers.map((s) => (
                                <TableRow key={s.code} hover sx={{ "& td": { py: 2.5 } }}>
                                    <TableCell><Typography variant="body2" fontWeight={700}>{s.code}</Typography></TableCell>
                                    <TableCell>
                                        {s.link ? (
                                            <Link href="#" underline="always" sx={{ color: GREEN, fontWeight: 500 }}>{s.name}</Link>
                                        ) : (
                                            <Typography variant="body2">{s.name}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>{s.mst}</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>{s.goods}</TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap" }}>{s.contact}</TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap" }}>{s.importFile}</TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                                        <Typography variant="body2" fontWeight={s.overdueRed ? 700 : 400} color={s.overdueRed ? RED : "inherit"}>{s.differential}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: "nowrap" }}>{s.term}</TableCell>
                                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>{s.debt}</TableCell>
                                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                                        <Typography variant="body2" fontWeight={s.overdueRed ? 700 : 400} color={s.overdueRed ? RED : "inherit"}>{s.overdue}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={s.active ? "Đang giao dịch" : "Ngừng giao dịch"}
                                            variant="outlined"
                                            sx={{
                                                color: s.active ? GREEN : "#777",
                                                borderColor: s.active ? `${GREEN}66` : "#ccc",
                                                bgcolor: s.active ? `${GREEN}0D` : "#F2F2F2",
                                                fontWeight: 600,
                                                borderRadius: 2,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box display='flex' flexDirection='row'>
                                            <IconButton
                                                tooltip="Xem chi tiết"
                                                handleFunt={() => {}}
                                                icon={<Visibility/>}
                                                backgroundColor="transparent"
                                            />
                                            <IconButton
                                                tooltip="Chỉnh sửa"
                                                handleFunt={() => {}}
                                                icon={<Edit/>}
                                                backgroundColor="transparent"
                                            />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            )}
            {openSuppliers.open && openSuppliers.type === 'add' && (
                <AddSuppliers
                    onBack={() => handleCloseSuppliers('add')}
                />
            )}
        </Page>
    );
};

export default Supplier;
