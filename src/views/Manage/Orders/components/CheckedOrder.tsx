import { Box, Button, Paper } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import CardDetailDataOrder from "./CardDetailDataOrder";
import ProductStatusStepper from "./ProductStatusStepper";



import { COLORS } from "@/constants/colors";
import { IOrder } from "@/types/order";
import { useState } from "react";
import { IProduct } from "@/types/product";
import ViewProgressProduct from "./ViewProgressProduct";
import ViewProductsInOrder from "./ViewProductsInOrder";


interface CheckedOrderProps{
    data: IOrder;
    onClose: () => void;
}

const CheckedOrder = (props: CheckedOrderProps) => {
    const { data, onClose } = props;
    const [order, setOrder] = useState<IOrder | null>(null);
    const [openViewProductsInOrder, setOpenViewProductsInOrder] = useState(false);

    const handleClose = () => {
        onClose()
    }

    const handleOpenViewProductsInOrder = (order: IOrder) => {
        setOrder(order)
        setOpenViewProductsInOrder(true)
    }

    const handleCloseViewProductsInOrder = () => {
        setOrder(null)
        setOpenViewProductsInOrder(false)
    }

    return (
      <Box>
        {!openViewProductsInOrder && (
          <>
            <NavigateBack title='Kiểm soát đơn hàng' onBack={handleClose} />
            <Paper sx={{ borderRadius: 2, m: 1.5, p: 2 }}>
              <CardDetailDataOrder order={data}>
                <ProductStatusStepper products={data.products} />
              </CardDetailDataOrder>
              <Box mt={2} display='flex' justifyContent='center'>
                <Button
                  variant='outlined'
                  sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, mr: 2, width: 150 }}
                  onClick={() => data && handleOpenViewProductsInOrder(data)}
                >
                  Xem chi tiết
                </Button>
                <Button
                  variant='outlined'
                  sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 150 }}
                  onClick={() => {}}
                >
                  Chỉnh sửa
                </Button>
              </Box>
            </Paper>          
          </>
        )}
        {openViewProductsInOrder && order && (
          <ViewProductsInOrder
            data={order}
            onBack={handleCloseViewProductsInOrder}
          />
        )}
      </Box>
    );
}

export default CheckedOrder;