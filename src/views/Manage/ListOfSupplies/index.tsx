import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import { Add, Delete, Download, Edit, EditNoteOutlined, FilterAltOutlined, ForestOutlined, HandymanOutlined, History, PaletteOutlined, PrintOutlined, QrCodeScanner, ScienceOutlined, SquareFootOutlined, TrendingUp, UploadFile } from "@mui/icons-material";
import { Box, Button, Checkbox, Chip, MenuItem, Pagination, Select, Stack, TableCell, TableRow, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { StorageDonutChart } from "./components/Chart";
import SearchBox from "./components/SearchBox";
import TableData from "./components/TableData";
import DetailDrawer from "./components/DetailDrawer";
import { MOCK_DATA } from "./constants";
import { getStockStatusColor, getStockStatusLabel, getUrgencyLevelLabel } from "@/utils/labelEntoVni";
import IconButton from "@/components/IconButton/IconButton";
import { StockStatus } from "@/constants/status";
import { Material } from "@/constants/material";

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
    const [selected, setSelected] = useState<Material | null>(null);

    return(
        <Page title="Danh mục vật tư">
            <Box px={2} mt={3}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box p={2} bgcolor="#fff">
                        <Typography variant="h5" fontWeight={600} sx={{ fontSize: { xs: '1.4rem', md: '1.5rem' } }}>Quản lý Danh mục Vật tư Xưởng Mộc</Typography>
                        <Typography variant="subtitle2">
                            Tổng số: <b>348</b> loại vật tư tiêu chuẩn • <b>06</b> nhóm định mức phân xưởng
                        </Typography>
                        <Box my={2} display='flex' flexDirection='row' flexWrap='wrap' gap={2}>
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
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <Typography variant="subtitle2">Tổng giá trị lưu kho</Typography>
                                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: COLORS.BUTTON }}>1,842,500,000 đ</Typography>
                                    <Stack sx={{ color: COLORS.TEXT }} direction='row' alignItems='center' gap={0.5}>
                                        <TrendingUp fontSize="small"/>
                                        <Typography variant="subtitle2">+3.8% so với tháng trước</Typography>
                                    </Stack>
                                </Grid>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <Typography variant="subtitle2">Vật tư đạt định mức</Typography>
                                    <Typography variant="subtitle1" sx={{ color: COLORS.BUTTON }}>
                                        <b>312</b> / 348 loại
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: COLORS.TEXT }}>89.6% an toàn sản xuất</Typography>
                                </Grid>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <Typography variant="subtitle2">Cảnh báo sắp hết</Typography>
                                    <Typography variant="subtitle1" sx={{ color: COLORS.STATUS.WARNING, fontWeight: 600 }}>
                                        28 loại
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: COLORS.STATUS.WARNING }}>Cần lập lệnh mua mới</Typography>
                                </Grid>
                                <Grid size={{ xs: 6, md: 3 }}>
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
            </Box>
            <Box p={2} my={3} mx={2} bgcolor='#fff'>
                <SearchBox
                    initialValue=""
                    onSearch={() => {}}
                    placeholder="Tìm nhanh theo mã VT, tên loại gỗ, quy cách độ ẩm, nhà cung ứng..."
                >
                    <Box margin='auto 0' mt={{ xs: 2, md: 0 }} display='flex' flexDirection='row' flexWrap='wrap' gap={2}>
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
                <Box mt={3} display='flex' flexDirection='row' flexWrap='wrap' alignItems='center' gap={2}>
                    <Stack direction='row' alignItems='center' gap={0.5}>
                        <FilterAltOutlined/>
                        <Typography variant="subtitle2" noWrap>PHÂN NHÓM:</Typography>
                    </Stack>
                    <Chip
                        sx={{ bgcolor: COLORS.BUTTON, px: 2 }}
                        label='Tất cả (6)'
                    />
                    {data.map((item, index) => (
                        <Stack direction='row' alignItems='center' bgcolor={COLORS.BASIC} px={2} py={0.5} gap={0.5} borderRadius={30} key={index}>
                            {item.icon}
                            <Typography variant="subtitle2" noWrap>{item.label}</Typography>
                        </Stack>
                    ))}
                </Box>
            </Box>
            <Box mt={3} mx={2}>
                <Box
                    p={2}
                    bgcolor={COLORS.BASIC}
                    display='flex'
                    flexDirection={{ xs: 'column', md: 'row' }}
                    justifyContent='space-between'
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    gap={2}
                >
                    <Stack direction='row' alignItems='center' flexWrap='wrap' gap={0.5}>
                        <Checkbox/>
                        <Typography variant="subtitle2" fontWeight={600}>Chọn tất cả vật tư trang 1</Typography>
                        <Typography variant="subtitle2">• Hiển thị 6 trên 348 loại</Typography>
                    </Stack>
                    <Stack direction='row' flexWrap='wrap' gap={1}>
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
                    minWidth={1100}
                    data={MOCK_DATA}
                    renderRow={(supplies, index) => (
                        <TableRow
                            key={index}
                            hover
                            onClick={() => setSelected(supplies)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                <Checkbox/>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>{supplies.materialCode}</Typography>
                                {supplies.urgencyLevel === 'high' ? (
                                    <Typography variant="caption" color="error" fontWeight={600}>{getUrgencyLevelLabel(supplies.urgencyLevel)}</Typography>
                                ) : (
                                    <Typography variant="caption">{supplies.batchCode}</Typography>
                                )}
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>{supplies.materialName}</Typography>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6}}>
                                        <Typography variant="caption">{supplies.technicalSpecifications}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6}} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                                        {supplies.urgencyLevel === 'high' ? (
                                            <Box margin="auto 0" bgcolor="#f8a2af" p={0.5}>
                                                <Typography variant="caption" color="error" fontWeight={600}>
                                                    {supplies.alertMessage}
                                                </Typography>
                                            </Box>
                                        ) : supplies.urgencyLevel === 'medium' ? (
                                            <Box margin="auto 0" bgcolor="#f8eba2" p={0.5}>
                                                <Typography variant="caption" color="warning" fontWeight={600}>
                                                    {supplies.alertMessage}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box margin="auto 0" bgcolor={COLORS.BASIC} p={0.5}>
                                                <Typography variant="caption" fontWeight={600}>
                                                    {supplies.materialStandard}
                                                </Typography>
                                            </Box>
                                        )}                                        
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={supplies.categoryName}
                                    sx={{ bgcolor: COLORS.BASIC, fontWeight: 600 }}
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">{supplies.unitName}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">{supplies.minimumStock}</Typography>
                            </TableCell>
                            <TableCell>
                                {supplies.stockStatus === StockStatus.IN_STOCK ? (
                                    <Typography variant="subtitle2" fontWeight={600} color="success">{supplies.actualStock}</Typography>
                                ) : supplies.stockStatus === StockStatus.LOW_IN_STOCK ? (
                                    <Typography variant="subtitle2" fontWeight={600} color="warning">{supplies.actualStock}</Typography>
                                ) : (
                                    <Typography variant="subtitle2" fontWeight={600} color="error">{supplies.actualStock}</Typography>
                                )}
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">{`${supplies.lastPurchasePrice}.000đ/${supplies.unitName.toLowerCase()}`}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>{supplies.primarySupplier?.supplierName}</Typography>
                                <Typography variant="caption">{supplies.primarySupplier?.address || supplies.primarySupplier?.description || supplies.primarySupplier?.supplierCode}</Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={getStockStatusLabel(supplies.stockStatus)}
                                    color={getStockStatusColor(supplies.stockStatus).color}
                                />
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                                <IconButton
                                    tooltip="Chỉnh sửa vật tư"
                                    handleFunt={() => console.log('Chỉnh sửa vật tư')}
                                    icon={<Edit/>}
                                    height={15}
                                    width={20}
                                />
                                <IconButton
                                    tooltip="Thẻ kho & biến động"
                                    handleFunt={() => console.log('Thẻ kho & biến động')}
                                    icon={<History/>}
                                    height={15}
                                    width={20}
                                />
                                <IconButton
                                    tooltip="Xóa"
                                    handleFunt={() => console.log('Xóa')}
                                    icon={<Delete/>}
                                    height={15}
                                    width={20}
                                />
                            </TableCell>
                        </TableRow>
                    )}
                />
                <Grid sx={{ bgcolor:  "#fff", p: 2 }} container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Typography variant="subtitle2">Hiển thị</Typography>
                            <Select size="small" value={20} sx={{ width: 150 }}>
                                <MenuItem value={20}>20 dòng / trang</MenuItem>
                                <MenuItem value={50}>50 dòng / trang</MenuItem>
                                <MenuItem value={100}>100 dòng / trang</MenuItem>
                            </Select>
                            <Typography variant="subtitle2" color="text.secondary">
                                từ 1 đến 6 trong tổng <b>348</b> mục
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box display='flex' justifyContent='flex-end'>
                            <Pagination
                                count={24}
                                defaultPage={1}
                                shape="rounded"
                                siblingCount={1}
                                boundaryCount={1}
                                sx={{
                                    '& .Mui-selected': {
                                        bgcolor: `${COLORS.BUTTON} !important`,
                                        color: '#fff',
                                    },
                                }}
                        />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <DetailDrawer
                open={Boolean(selected)}
                material={selected}
                onClose={() => setSelected(null)}
            />
        </Page>
    )
}

export default ListOfSupplies;