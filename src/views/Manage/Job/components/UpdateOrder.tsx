import { Box, Button, Card, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import { IOrder } from "@/types/order";
import { getProductsByOrderId } from "@/services/product-service";
import { IProduct } from "@/types/product";
import Grid from "@mui/material/Grid2";
import logo_product from "@/assets/images/users/logo_product.png";
import CommonImage from "@/components/Image/index";
import { getStatusProductColor, getStatusProductLabel } from "@/utils/labelEntoVni";
import { COLORS } from "@/constants/colors";
import ProgressProduct from "./ProgressProduct";
import useNotification from "@/hooks/useNotification";
import { updateProccessOder } from "@/services/order-service";
import { ProccessOrder } from "@/constants/status";

interface UpdateOrderProps{
    onBack: () => void;
    data: IOrder
}

const UpdateOrder: React.FC<UpdateOrderProps> = ({ onBack, data }) => {
    const notify = useNotification();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [openProgress, setOpenProgress] = useState(false);

    const getProducts = async(id: string) => {
        const res = await getProductsByOrderId(id);
        const newProducts = res.data as any as IProduct[];
        setProducts(newProducts)
    };    

    useEffect(() => {
        if(data){
            getProducts(data.id);
        }
    }, [data])

    const handleOpenProgress = (data: IProduct) => {
        setProduct(data);
        setOpenProgress(true)
    }

    const handleCloseProgress = () => {
        setProduct(null);
        setOpenProgress(false)
        getProducts(data.id);
    }

    const showButtonFinishedOrder = () => {
        if(data === null) return;
        const newData = data && data.products.every(s => s.status === 'completed');
        if(!newData) {
            return false
        }
        return true;
        
    }

    const handleFinished = async(id: string) => {
        try {
            const payload: { proccess: string } = {
                proccess: 'in_progress_75%'
            }
            const res = await updateProccessOder(id, payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            onBack()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    return(
        <Box>
            {!openProgress && (
                <>
                    <NavigateBack
                        title="Xem chi tiết"
                        onBack={onBack}
                    />
                    <Grid sx={{ mx: 2 }} container spacing={2}>
                        {products.map((product, index) => {
                            return(
                                <Grid key={index} size={{ xs: 12, md: 3 }}>
                                    <Card sx={{ borderRadius: 2 }}>
                                        <CommonImage
                                            sx={{ px: 2, pt: 2, objectFit: 'cover', height: 250, width: '100%' }}
                                            src={product.urlImage !== null ? product.urlImage : logo_product}
                                            alt={product.name}
                                        />
                                        <CardContent>
                                            <Box flexDirection='row' display='flex' justifyContent='space-between'>
                                                <Stack direction='row'>
                                                    <Typography fontSize='14px' fontWeight={500}>SP {index + 1}: </Typography>
                                                    <Typography fontSize='14px' fontWeight={500}>{product.name}</Typography>
                                                </Stack>
                                                <Chip
                                                    label={getStatusProductLabel(product.status)}
                                                    color={getStatusProductColor(product.status).color}
                                                />
                                            </Box>
                                            <Typography mt={1} fontSize='14px'>{product.description}</Typography>
                                            {(product.isCreated && product.status !== 'completed') &&  (
                                                <Button
                                                    variant="outlined"
                                                    fullWidth
                                                    sx={{ mt: 2, border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 3 }}
                                                    onClick={() => product && handleOpenProgress(product)}
                                                >
                                                    Cập nhật tiến độ
                                                </Button>
                                            )}
                                            {!product.isCreated && (
                                                <Typography mt={2} fontSize='14px' fontStyle='italic'>Sản phẩm chưa được tạo công việc. Vui lòng liên hệ quản lý.</Typography>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    {showButtonFinishedOrder() &&  (
                        <Box display='flex' justifyContent='center'>
                            <Button
                                sx={{ bgcolor: COLORS.BUTTON, mt: 2, borderRadius: 3, width: 200 }}
                                onClick={() => data && handleFinished(data.id)}
                            >
                                Hoàn thành đơn hàng
                            </Button>
                        </Box>
                    )}
                </>
            )}
            {openProgress && product && (
                <ProgressProduct
                    data={product}
                    onBack={handleCloseProgress}
                />
            )}
        </Box>
    )
}

export default UpdateOrder;