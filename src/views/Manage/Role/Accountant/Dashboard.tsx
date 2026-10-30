import { COLORS } from "@/constants/colors";
import { Add, FactCheck, FiberManualRecord, IosShare, Remove } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2";

const DashboardAccountant = () => {
    return (
        <Box>
            {/* ----------------- banner chính ----------------- */}
            <Box borderRadius={2} m={3} p={2} bgcolor='#fff'>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2">BÀN LÀM VIỆC CHÍNH • MỘC ERP</Typography>
                        <Typography variant="h6" fontWeight={600}>Trung Tâm Điều Hành & Tổng Quan Xưởng Mộc</Typography>
                        <Chip
                            sx={{ bgcolor: '#E6F2DE', mt: 2, fontWeight: 600 }}
                            label="KHO PHÔI GỖ & XƯỞNG VĨNH PHÚC (Trực Tuyến)"
                            icon={<FiberManualRecord sx={{ color: COLORS.BUTTON }}/>}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack borderRadius={1} display='flex' justifyContent='center' width='50%' p={1} gap={2} direction='row' bgcolor='#E6F2DE'>
                            <Typography>Hôm nay</Typography>
                            <Typography>Tuần này</Typography>
                            <Typography>Tháng 10/2026</Typography>
                            <Typography>Quý 4</Typography>
                        </Stack>
                        <Box mt={2} display='flex' flexDirection='row' gap={2}>
                            <Button
                                sx={{ bgcolor: COLORS.BUTTON, p: 1 }}
                                startIcon={<Add/>}
                            >
                                Tạo phiếu nhập
                            </Button>
                            <Button
                                 sx={{ bgcolor: COLORS.BUTTON }}
                                 startIcon={<Remove/>}
                            >
                                Tạo phiếu xuất
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                                startIcon={<FactCheck/>}
                            >
                                Kiểm kê nhanh
                            </Button>
                            <Tooltip title="Xuất báo cáo PDF/Excel">
                                <IconButton>
                                    <IosShare sx={{ color: COLORS.BUTTON }}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>                
            </Box>

            {/* ----------------- 4 card ----------------- */}
            <Box px={2.5}>
                <Grid container spacing={2}>
                    {['Đơn hàng hôm nay', 'Doanh thu tháng', 'Khách hàng mới', 'Đơn hàng chờ xử lý'].map((label, index) => (
                    <Grid size={{ xs: 12, md: 3}} key={index}>
                        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1" color="text.secondary">{label}</Typography>
                            <Typography variant="h6" fontWeight={600}>123</Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default DashboardAccountant