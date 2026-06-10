import { IOrder } from "@/types/order";
import { Box, Paper, Stack, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import { Inventory } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";

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
                        {data.products.map((product) => {
                            return(
                                <Box mt={2} display='flex' flexDirection='column' gap={1.5} key={product.id}>
                                    <Stack direction='row'>
                                        <Typography variant="subtitle1" fontWeight={600}>Tên sản phẩm:</Typography>
                                        <Typography variant="subtitle1">{product.name}</Typography>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Typography variant="subtitle1" fontWeight={600}>Mô tả/Yêu cầu:</Typography>
                                        <Typography variant="subtitle1">{product.description}</Typography>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Typography variant="subtitle1" fontWeight={600}>Mục tiêu:</Typography>
                                        <Typography variant="subtitle1">{product.target}</Typography>
                                    </Stack>                                       
                                </Box>
                            )
                        })}

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
                            <Box display='flex' flexDirection='row' gap={1.5} alignItems="baseline">
                                <Typography variant="subtitle2">Số lượng:</Typography>
                                <InputText
                                    label=""
                                    name="amount"
                                    value={''}
                                    sx={{ width: 40 }}
                                    type="text"
                                    onlyPositiveNumber={true}
                                    onChange={() => {}}
                                    placeholder=""
                                    from="order-desktop"
                                    variant="standard"
                                />
                                <Typography variant="subtitle2">sản phẩm </Typography>
                                <Typography variant="subtitle2" color="error">(*)</Typography>
                            </Box>
                        </Box>
                    </Paper>                    
                </Grid>
            </Grid>

        </Box>
    )
}

export default AddProduct;