import { IOrder } from "@/types/order";
import { Box, Button, Drawer } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { useEffect, useState } from "react";
import { getDetailOrder } from "@/services/order-service";
import CardDetailDataOrder from "./CardDetailDataOrder";
import DialogListImageProduct from "./DialogListImageProduct";

interface DetailOrderProps{
    open: boolean,
    data: IOrder,
    onClose: () => void;
}

const DetailOrder = (props: DetailOrderProps) => {
    const { open, data, onClose} = props;
    const [order, setOrder] = useState<IOrder | null>(null);
    const [viewImageProducts, setViewImageProducts] = useState(false);
    useEffect(() => {
        if(open && data){
            const getOrder = async() => {
                const res = await getDetailOrder(data.id);
                const newOrder = res.data as any as IOrder;
                setOrder(newOrder)
            };

            getOrder()
        }
    }, [open, data])

    // view image products
    const handleOpenViewImageProducts = (order: IOrder) => {
      setOrder(order);
      setViewImageProducts(true)
    }

    const handleCloseViewImageProducts = () => {
      setOrder(null);
      setViewImageProducts(false)
    }
    
    return(
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', md: 600 },
                    p: 3
                }
            }}      
        >
            <CardDetailDataOrder
                order={order}
                onViewImageProducts={handleOpenViewImageProducts}
            />
            <Box mt={2} display='flex' justifyContent='center'>
                <Button
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 120 }}
                    onClick={onClose}
                >
                    Đóng
                </Button>
            </Box>
            {viewImageProducts && order && (
                <DialogListImageProduct
                    order={order}
                    onClose={handleCloseViewImageProducts}
                    open={viewImageProducts}
                />
            )}
        </Drawer>
    )
}

export default DetailOrder;