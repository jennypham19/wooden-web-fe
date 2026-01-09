import DialogComponent from "@/components/DialogComponent";
import CommonImage from "@/components/Image/index";
import { IOrder } from "@/types/order";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface DialogListImageProductProps{
    open: boolean,
    onClose: () => void;
    order: IOrder
}

const DialogListImageProduct = (props: DialogListImageProductProps) => {
    const { open, onClose, order } = props;
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            dialogTitle={`Danh sách hình ảnh đơn hàng ${order.name}`}
            isActiveFooter={false}
            isCenter={false}
            maxWidth={'md'}
        >
            <Grid container spacing={2}>
                {order.products.map((product, index) => {
                    return(
                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                            <Box display='flex' justifyContent='center' flexDirection='column'>
                                <CommonImage
                                    src={product.urlImage}
                                    sx={{ height: 220, objectFit: 'fill', borderRadius: 3 }}
                                />
                                <Typography mt={1} fontSize='15px' fontWeight={600}>{product.name}</Typography>
                                <Typography mt={1} fontSize='15px'>Kích thước: {product.dimension.length} x {product.dimension.width} x {product.dimension.height} cm</Typography>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </DialogComponent>
    )
}

export default DialogListImageProduct;