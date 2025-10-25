import { Box, Card, CardContent, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2";

const Dashboard = () => {
    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight={600} mb={2}>Dashboard - Tổng quan kinh doanh</Typography>
            <Grid container spacing={2}>
                {['Đơn hàng hôm nay', 'Doanh thu tháng', 'Khách hàng mới', 'Đơn hàng chờ xử lý'].map((label, index) => (
                <Grid size={{ xs: 12, md: 3}} key={index}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="subtitle1" color="text.secondary">{label}</Typography>
                        <Typography variant="h6" fontWeight={600}>123</Typography>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Dashboard