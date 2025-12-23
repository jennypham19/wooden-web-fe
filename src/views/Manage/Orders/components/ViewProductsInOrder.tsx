import { IOrder } from "@/types/order";
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/product";
import { getProductsByOrderId } from "@/services/product-service";
import Grid from "@mui/material/Grid2";
import CommonImage from "@/components/Image/index";
import logo_product from "@/assets/images/users/logo_product.png";
import { getStatusProductColor, getStatusProductLabel } from "@/utils/labelEntoVni";
import { COLORS } from "@/constants/colors";
import ViewProgressProduct from "./ViewProgressProduct";
import { getDetailOrder } from "@/services/order-service";

interface ViewProductsInOrderProps{
    onBack: () => void;
    data: IOrder
}

const ViewProductsInOrder = (props: ViewProductsInOrderProps) => {
    const { onBack, data } = props;
    const [products, setProducts] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [order, setOrder] = useState<IOrder | null>(null);
    const [openViewProgressProduct, setOpenViewProgressProduct] = useState(false);

    const getOrder = async(id: string) => {
        const res = await getDetailOrder(id);
        const newOrder = res.data as any as IOrder;
        setOrder(newOrder)
    };
    const getProducts = async(id: string) => {
        const res = await getProductsByOrderId(id);
        const newProducts = res.data as any as IProduct[];
        setProducts(newProducts)
    };    

    useEffect(() => {
        if(data){
            getProducts(data.id);
            getOrder(data.id);
        }
    }, [data])

    const handleOpenViewProgressProduct = (product: IProduct) => {
        setProduct(product)
        setOpenViewProgressProduct(true)
    }

    const handleCloseViewProgressProduct = () => {
        setProduct(null)
        setOpenViewProgressProduct(false)
    }

    return(
        <Box>
            {!openViewProgressProduct && (
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
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mt: 2, border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 3 }}
                                                onClick={() => product && handleOpenViewProgressProduct(product)}
                                            >
                                                Tiến độ sản phẩm
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>                
                </>
            )}
            {openViewProgressProduct && product && order && (
                <ViewProgressProduct
                    order={order}
                    product={product}
                    onBack={handleCloseViewProgressProduct}
                />
            )}
        </Box>
    )
}

export default ViewProductsInOrder;