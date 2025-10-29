import DialogComponent from "@/components/DialogComponent";
import { IOrder } from "@/types/order";
import { Avatar, Box, Card, CardContent, Chip, Paper, Stack, Typography } from "@mui/material";
import avatar from "@/assets/images/users/default-avatar.jpg";
import { getProccessOrderLabel, getStatusOrderColor, getStatusOrderLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";
import Grid from "@mui/material/Grid2";

interface DetailOrderProps{
    open: boolean,
    data: IOrder,
    onClose: () => void;
}

const DetailOrder = (props: DetailOrderProps) => {
    const { open, data, onClose} = props;
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            dialogTitle="Chi tiết đơn hàng"
            isActiveFooter={false}
        >

            <Box display='flex' justifyContent='space-between'>
                <Box display='flex' flexDirection='row'>
                    <Avatar 
                        src={avatar} 
                        sx={{ width: 80, height: 80, borderRadius: '50%', mr: 1 }}
                    />
                    <Stack margin='auto 0' direction='column'>
                        <Typography variant="caption">Khách hàng</Typography>
                        <Typography fontSize='15px' fontWeight={600}>{data.nameCustomer}</Typography>
                    </Stack>
                </Box>
                <Box margin='auto 0'>
                    <Chip label={getStatusOrderLabel(data.status)} color={getStatusOrderColor(data.status).color}/>
                </Box>
            </Box>
            <Stack mt={1} display='flex' justifyContent='space-between'>
                <Typography fontSize='15px'><b>Đơn hàng:</b> {data.name}</Typography>
                <Typography fontSize='15px'><b>ID đơn:</b> {data.codeOrder}</Typography>
            </Stack>
            <Stack mt={1} display='flex' justifyContent='space-between'>
                <Typography fontSize='15px'><b>Ngày nhận:</b> {DateTime.FormatDate(data.dateOfReceipt)}</Typography>
                <Typography fontSize='15px'><b>Hạn trả:</b> {DateTime.FormatDate(data.dateOfPayment)}</Typography>
            </Stack>
            <Stack mt={1} display='flex' justifyContent='space-between'>
                <Typography fontSize='15px'><b>Tiến độ:</b> {getProccessOrderLabel(data.proccess)}</Typography>
                <Typography fontSize='15px'><b>Trạng thái:</b> {getStatusOrderLabel(data.status)}</Typography>
            </Stack>
            <Typography mt={1} fontSize='15px'><b>Số lượng sản phẩm:</b> {data.amount} sản phẩm/ đơn hàng</Typography>
            <Typography mt={1} fontSize='15px'><b>Yêu cầu:</b> {data.requiredNote}</Typography>
            <Typography mt={1} fontSize='15px' fontWeight={700}>Danh sách sản phẩm kèm theo:</Typography>
            <Grid container spacing={2}>      
                {data.products.map((product, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}>
                        <Paper sx={{ border: '1px solid #000', p: 1 }}>
                            <Typography fontSize='14px'><b>Tên sản phẩm:</b> <i>{product.name.toUpperCase()}</i></Typography>
                            <Typography mt={1} fontSize='14px'><b>Mô tả/ Yêu cầu:</b> {product.description}</Typography>
                            <Typography mt={1} fontSize='14px'><b>Mục tiêu:</b> {product.target}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid> 
        </DialogComponent>
    )
}

export default DetailOrder;