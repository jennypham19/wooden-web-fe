import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

const InformationOfCustomerAndProduct = () => {
    return(
        <Paper sx={{ mx: { xs: 3, md: 0 }, p: 2, mb: 2.5 }}>
            <Box display='flex' flexDirection='row' gap={1}>
                <IconButton sx={{ borderRadius: '50%', bgcolor: COLORS.BUTTON, color: '#FFF', width: 20, height: 20 }}>
                    <Typography variant="caption" fontWeight={600}>1</Typography>
                </IconButton>
                <Typography variant="subtitle2" fontWeight={600}>Thông tin khách hàng</Typography>
            </Box>
            <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="caption" fontWeight={500}>Tên khách hàng</Typography>
                    <InputText
                        label=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        name="name"
                        margin="dense"
                        placeholder="Nhập tên khách hàng"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="caption" fontWeight={500}>Số điện thoại</Typography>
                    <InputText
                        label=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        name="phone"
                        margin="dense"
                        placeholder="Nhập số điện thoại"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="caption" fontWeight={500}>Email liên hệ</Typography>
                    <InputText
                        label=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        name="email"
                        margin="dense"
                        placeholder="Nhập email liên hệ"
                    />
                </Grid>
            </Grid>
            <Box mt={2} display='flex' flexDirection='row' gap={1}>
                <IconButton sx={{ borderRadius: '50%', bgcolor: COLORS.BUTTON, color: '#FFF', width: 20, height: 20 }}>
                    <Typography variant="caption" fontWeight={600}>2</Typography>
                </IconButton>
                <Typography variant="subtitle2" fontWeight={600}>Thông tin đơn hàng</Typography>
            </Box>
            <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="caption" fontWeight={500}>Mã đơn hàng</Typography>
                    <InputText
                        label=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        name=""
                        margin="dense"
                        placeholder="Nhập mã đơn hàng"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="caption" fontWeight={500}>Tên đơn hàng</Typography>
                    <InputText
                        label=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        name=""
                        margin="dense"
                        placeholder="Nhập tên đơn hàng"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="caption" fontWeight={500}>Ngày tạo</Typography>
                    <InputText
                        label=""
                        value={dayjs()}
                        type="date"
                        onChange={() => {}}
                        name=""
                        margin="dense"
                        placeholder="Chọn ngày tạo"
                        disabled
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default InformationOfCustomerAndProduct;