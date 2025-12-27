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
import { getDetailOrder } from "@/services/order-service";
import EvaluatedProduct from "./EvaluatedProduct";
import EvaluatedWork from "./EvaluatedWork";

interface EvaluatedProductsInOrderProps{
    onBack: () => void;
    data: IOrder,
    from?: string
}

const EvaluatedProductsInOrder = (props: EvaluatedProductsInOrderProps) => {
    const { onBack, data, from } = props;
    const [products, setProducts] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [order, setOrder] = useState<IOrder | null>(null);
    const [openEvaluated, setOpenEvaluated] = useState<{ type: string, open: boolean }>({
        type: '',
        open: false
    });

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

    const handleOpenEvaluatedProduct = (product: IProduct) => {
        setProduct(product)
        setOpenEvaluated({ type: 'product', open: true })
    }

    const handleCloseEvaluatedProduct = () => {
        setProduct(null)
        setOpenEvaluated({ type: 'product', open: false })
    }

    /* Đánh giá công việc */
    const handleOpenEvaluatedWork = (product: IProduct) => {
        setProduct(product)
        setOpenEvaluated({ type: 'work', open: true })
    }

    const handleCloseEvaluatedWork = () => {
        setProduct(null)
        setOpenEvaluated({ type: 'work', open: false })
    }
    return(
        <Box>
            {!openEvaluated.open && (
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
                                            {from === 'job' && (
                                                <Button
                                                    fullWidth
                                                    sx={{ mt: 2, bgcolor: COLORS.BUTTON, borderRadius: 3 }}
                                                    onClick={() => product && handleOpenEvaluatedWork(product)}
                                                >
                                                    Đánh giá công việc
                                                </Button>                                               
                                            )}
                                            {from === 'order' && (
                                                <Button
                                                    fullWidth
                                                    sx={{ mt: 2, bgcolor: COLORS.BUTTON, borderRadius: 3 }}
                                                    onClick={() => product && handleOpenEvaluatedProduct(product)}
                                                >
                                                    Đánh giá sản phẩm
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>                
                </>
            )}
            {openEvaluated.open && openEvaluated.type === 'product' && product &&  (
                <EvaluatedProduct
                    data={product}
                    onBack={handleCloseEvaluatedProduct}
                />
            )}
            {openEvaluated.open && openEvaluated.type === 'work' && product && (
                <EvaluatedWork
                    data={product}
                    onBack={handleCloseEvaluatedWork}
                />
            )}
        </Box>
    )
}

export default EvaluatedProductsInOrder;