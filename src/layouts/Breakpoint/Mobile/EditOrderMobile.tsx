import { Avatar, Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/avatar-1.png";
import { IOrder } from "@/types/order";
import CommonImage from "@/components/Image/index";
import { Phone, Place, PlaylistAdd } from "@mui/icons-material";
import { getStatusOrderColor, getStatusOrderLabel } from "@/utils/labelEntoVni";

interface EditOrderMobileProps{
    order: IOrder
}
const EditOrderMobile = (props: EditOrderMobileProps) => {
    const { order } = props;
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography>KHÁCH HÀNG</Typography>
                    <Box my={1.5} display='flex' justifyContent='space-between'>
                        <Box display='flex' flexDirection='row'>
                            <Avatar
                                src={avatar} 
                                sx={{ width: 60, height: 60, mr: 1.5, borderRadius: 2 }}
                            />
                            <Stack margin='auto 0'>
                                <Typography fontSize='15px' fontWeight={600}>{order.customer.name}</Typography>
                            </Stack>
                        </Box>
                    </Box>  
                    <Divider/>  
                    <Stack my={1.5} direction='row'>
                        <Phone/>
                        <Typography>{order.customer.phone}</Typography>
                    </Stack>
                    <Stack direction='row'>
                        <Place/>
                        <Typography>{order.customer.address} (<span style={{ fontStyle: 'italic'}}>{order.customer.type === 'home' ? "Nhà riêng" : "Cơ quan"}</span>)</Typography>
                    </Stack>                
                </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box my={1.5} display='flex' justifyContent='space-between'>
                        <Stack direction='row'>
                            <PlaylistAdd/>
                            <Typography fontWeight={600} fontSize={18}>Thông tin chi tiết</Typography>
                        </Stack>
                        <Box margin='auto 0'>
                            <Chip label={getStatusOrderLabel(order.status)} color={getStatusOrderColor(order.status).color}/>
                        </Box>
                    </Box> 
                </Paper>
            </Grid>
        </Grid>
    )
}

export default EditOrderMobile;