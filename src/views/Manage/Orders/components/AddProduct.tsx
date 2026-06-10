import { IOrder } from "@/types/order";
import { Box, Paper, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import { Inventory } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import Grid from "@mui/material/Grid2";

interface AddProductProps{
    data: IOrder;
    onClose: () => void
}

const AddProduct = (props: AddProductProps) => {
    const { data, onClose } = props;
    
    const handleClose = () => {
        onClose();
    }
    return (
        <Box>
            <NavigateBack
                title={`Thêm sản phẩm cho đơn hàng ${data.name.toUpperCase()}`}
                onBack={handleClose}
            />
            <Grid container sx={{ mt: 2 }}>
                {/*---------------- Danh sách sản phẩm đã đồn tại ---------------- */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 2, mx: 2 }}>
                        <Box display='flex' flexDirection='row' gap={1.5}>
                            <Inventory sx={{ color: COLORS.BUTTON }}/>
                            <Typography fontWeight={500}>Danh sách sản phẩm đã tồn tại</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/*---------------- Danh sách sản phẩm thêm ---------------- */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 2, mx: 2 }}>
                        <Box mb={2} display='flex' flexDirection='row' justifyContent='space-between'>
                            <Box display='flex' flexDirection='row' gap={1.5}>
                                <Inventory sx={{ color: COLORS.BUTTON }}/>
                                <Typography fontWeight={500}>Danh sách sản phẩm thêm</Typography>
                            </Box>
                        </Box>
                    </Paper>                    
                </Grid>
            </Grid>

        </Box>
    )
}

export default AddProduct;