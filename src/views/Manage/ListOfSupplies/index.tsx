import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import { Add, Download, EditNoteOutlined, FilterAltOutlined, ForestOutlined, HandymanOutlined, PaletteOutlined, PrintOutlined, QrCodeScanner, ScienceOutlined, SquareFootOutlined, SvgIconComponent, TrendingUp, UploadFile } from "@mui/icons-material";
import { Box, Button, Checkbox, Chip, Stack, TableRow, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { StorageDonutChart } from "./components/Chart";
import SearchBox from "./components/SearchBox";
import TableData from "./components/TableData";

interface FilterItemProps{
    icon: any,
    label: string
}

const data: FilterItemProps[] = [
    {
        icon: <ForestOutlined/>,
        label: 'Gỗ tự nhiên xẻ sấy'
    },
    {
        icon: <SquareFootOutlined/>,
        label: 'Gỗ công nghiệp MDF/MFC'
    },
    {
        icon: <HandymanOutlined/>,
        label: 'Phụ kiện kim khí & Ray'
    },
    {
        icon: <PaletteOutlined/>,
        label: 'Sơn & Dung môi PU'
    },
    {
        icon: <ScienceOutlined/>,
        label: 'Keo dán & Hóa chất ép'
    },
    {
        icon: <HandymanOutlined/>,
        label: 'Ốc vít, Bản lề & Chốt'
    }
]

const ListOfSupplies = () => {
    return(
        <Page title="Danh mục vật tư">
            <Grid container spacing={2} sx={{ mx: 2, mt: 3 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box p={2} bgcolor="#fff">
                        <Typography variant="h5" fontWeight={600}>Quản lý Danh mục Vật tư Xưởng Mộc</Typography>
                        <Typography variant="subtitle2">
                            Tổng số: <b>348</b> loại vật tư tiêu chuẩn • <b>06</b> nhóm định mức phân xưởng
                        </Typography>
                        <Box my={2} display='flex' flexDirection='row' gap={2}>
                            <Button
                                sx={{ bgcolor: COLORS.BASIC, color: COLORS.BUTTON }}
                                startIcon={<UploadFile/>}
                            >
                                Nhập Excel
                            </Button>
                            <Button
                                sx={{ bgcolor: COLORS.BASIC, color: COLORS.BUTTON }}
                                startIcon={<Download/>}
                            >
                                Xuất file
                            </Button>
                            <Button
                                sx={{ bgcolor: COLORS.BASIC, color: COLORS.BUTTON }}
                                startIcon={<QrCodeScanner/>}
                            >
                                In Mã / QR
                            </Button>
                            <Button
                                sx={{ bgcolor: COLORS.BUTTON }}
                                startIcon={<Add/>}
                            >
                               Thêm vật tư mới
                            </Button>
                        </Box>
                        <Box p={2} bgcolor={COLORS.BASIC}>
                            <Grid container>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography variant="subtitle2">Tổng giá trị lưu kho</Typography>
                                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: COLORS.BUTTON }}>1,842,500,000 đ</Typography>
                                    <Stack sx={{ color: COLORS.TEXT }} direction='row'>
                                        <TrendingUp/>
                                        <Typography variant="subtitle2">+3.8% so với  tháng trước</Typography>
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography variant="subtitle2">Vật tư đạt định mức</Typography>
                                    <Typography variant="subtitle1" sx={{ color: COLORS.BUTTON }}>
                                        <b>312</b> / 348 loại
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: COLORS.TEXT }}>89.6% an toàn sản xuất</Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography variant="subtitle2">Cảnh báo sắp hết</Typography>
                                    <Typography variant="subtitle1" sx={{ color: COLORS.STATUS.WARNING, fontWeight: 600 }}>
                                        28 loại
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: COLORS.STATUS.WARNING }}>Cần lập lệnh mua mới</Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography variant="subtitle2">Hết hàng nghiêm trọng</Typography>
                                    <Typography variant="subtitle1" sx={{ color: COLORS.STATUS.ERROR, fontWeight: 600 }}>
                                        08 loại
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: COLORS.STATUS.ERROR }}>Chặn tiến độ đơn hàng</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box p={2} bgcolor="#fff">
                        <Grid container sx={{ mb: 2 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2" fontWeight={600}>Cơ cấu kho nguyên vật liệu</Typography>
                                <Typography variant="subtitle2">Tỷ trọng vốn lưu kho theo ngành hàng</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }}}>
                                <Chip
                                    label="Tháng 10/2026"
                                    sx={{ bgcolor: COLORS.BASIC, color: COLORS.BUTTON, fontWeight: 600 }}
                                />
                            </Grid>
                        </Grid>
                        <StorageDonutChart/>
                    </Box>
                </Grid>
            </Grid>
            <Box p={2} my={3} mx={2} bgcolor='#fff'>
                <SearchBox
                    initialValue=""
                    onSearch={() => {}}
                    placeholder="Tìm nhanh theo mã VT, tên loại gỗ, quy cách độ ẩm, nhà cung ứng..."
                >
                    <Box margin='auto 0' display='flex' flexDirection='row' gap={2}>
                        <Stack bgcolor={COLORS.BUTTON} p={1}>
                            <Typography variant="subtitle2">Tất cả tồn kho</Typography>
                            <Typography variant="subtitle2">348</Typography>
                        </Stack>
                        <Stack bgcolor={COLORS.BASIC} p={1}>
                            <span style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: COLORS.BUTTON,
                                borderRadius: '50%',
                                display: 'inline-block',
                                margin: 'auto 0'
                            }} />
                            <Typography variant="subtitle2">Bình thường</Typography>
                            <Typography variant="subtitle2">312</Typography>
                        </Stack>
                        <Stack bgcolor={COLORS.BASIC} p={1}>
                            <span style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: COLORS.STATUS.WARNING,
                                borderRadius: '50%',
                                display: 'inline-block',
                                margin: 'auto 0'
                            }} />
                            <Typography variant="subtitle2">Dưới định mức</Typography>
                            <Typography variant="subtitle2" sx={{ color: COLORS.STATUS.WARNING }}>28</Typography>
                        </Stack>
                        <Stack bgcolor={COLORS.BASIC} p={1}>
                            <span style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: COLORS.STATUS.ERROR,
                                borderRadius: '50%',
                                display: 'inline-block',
                                margin: 'auto 0'
                            }} />
                            <Typography variant="subtitle2">Hết hàng</Typography>
                            <Typography variant="subtitle2" sx={{ color: COLORS.STATUS.ERROR }}>8</Typography>
                        </Stack>
                    </Box>
                </SearchBox>
                <Box mt={3} display='flex' flexDirection='row' gap={2}>
                    <Stack>
                        <FilterAltOutlined/>
                        <Typography variant="subtitle2">PHÂN NHÓM:</Typography>
                    </Stack>
                    <Chip
                        sx={{ bgcolor: COLORS.BUTTON, px: 2 }}
                        label='Tất cả (6)'
                    />
                    {data.map((item, index) => (
                        <Stack bgcolor={COLORS.BASIC} px={2} margin='auto 0' py={0.5} borderRadius={30} key={index}>
                            {item.icon}
                            <Typography variant="subtitle2">{item.label}</Typography>
                        </Stack>
                    ))}
                </Box>
            </Box>
            <Box mt={3} mx={2}>
                <Box p={2} bgcolor={COLORS.BASIC} display='flex' justifyContent='space-between'>
                    <Stack margin='auto 0'>
                        <Checkbox/>
                        <Typography variant="subtitle2" fontWeight={600}>Chọn tất cả vật tư trang 1</Typography>
                        <Typography variant="subtitle2">• Hiển thị 6 trên 348 loại</Typography>
                    </Stack>
                    <Stack>
                        <Button
                            startIcon={<PrintOutlined/>}
                            sx={{ bgcolor: '#e4e0e0', color: '#000'}}
                        >
                            In nhãn kệ
                        </Button>
                        <Button
                            startIcon={<EditNoteOutlined/>}
                            sx={{ bgcolor: '#e4e0e0', color: '#000'}}
                        >
                            Cập nhật giá loạt
                        </Button>
                    </Stack>
                </Box>
            </Box>
            <Box mx={2}>
                <TableData
                    label="supplies"
                    array={['', 'MÃ VẬT TƯ', 'TÊN VẬT TƯ & QUY CÁCH KỸ THUẬT', 'PHÂN NHÓM', 'ĐVT', 'TỒN TỐI THIỂU', 'TỒN THỰC TẾ', 'GIÁ NHẬP GẦN NHẤT', 'NHÀ CUNG CẤP CHÍNH', 'TRẠNG THÁI', 'THAO TÁC']}
                    colSpan={11}
                    data={[]}
                    renderRow={(supplies, index) => (
                        <TableRow key={index}>

                        </TableRow>
                    )}
                />
            </Box>            
        </Page>
    )
}

export default ListOfSupplies;