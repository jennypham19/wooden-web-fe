import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import CardDetailDataOrder from "./CardDetailDataOrder";
import ProductStatusStepper from "./ProductStatusStepper";



import { COLORS } from "@/constants/colors";
import { IOrder } from "@/types/order";
import { useState } from "react";
import ViewProductsInOrder from "./ViewProductsInOrder";
import UpdateOrder from "./UpdateOrder";
import DialogListImageProduct from "./DialogListImageProduct";


interface CheckedOrderProps{
    data: IOrder;
    onClose: () => void;
    onFetchData: () => void;
}

const CheckedOrder = (props: CheckedOrderProps) => {
    const { data, onClose, onFetchData } = props;
    const [order, setOrder] = useState<IOrder | null>(null);
    const [openViewProductsInOrder, setOpenViewProductsInOrder] = useState(false);
    const [openUpdateOrder, setOpenUpdateOrder] = useState(false);
    const [viewImageProducts, setViewImageProducts] = useState(false);

    const handleClose = () => {
        onClose()
    }

    // Xem chi tiết
    const handleOpenViewProductsInOrder = (order: IOrder) => {
        setOrder(order)
        setOpenViewProductsInOrder(true)
        setOpenUpdateOrder(false)
    }

    const handleCloseViewProductsInOrder = () => {
        setOrder(null)
        setOpenViewProductsInOrder(false)
    }

    // Chỉnh sửa
    const handleOpenUpdateOrder= (order: IOrder) => {
      setOrder(order)
      setOpenUpdateOrder(true)
    }

    const handleCloseUpdateOrder = () => {
      setOrder(null)
      setOpenUpdateOrder(false);
      onFetchData()
    }

    // view image products
    const handleOpenViewImageProducts = (order: IOrder) => {
      setOrder(order);
      setViewImageProducts(true)
    }

    const handleCloseViewImageProducts = () => {
      setOrder(null);
      setViewImageProducts(false)
    }

    return (
      <Box>
        {!openViewProductsInOrder && (
          <>
            <NavigateBack title='Kiểm soát đơn hàng' onBack={handleClose} />
            <Paper sx={{ borderRadius: 2, m: 1.5, p: 2 }}>
              <CardDetailDataOrder order={data} onViewImageProducts={handleOpenViewImageProducts}>
                <ProductStatusStepper products={data.products} />
              </CardDetailDataOrder>
              {data.reason !== null && (
                <Stack mt={2} direction='row'>
                  <Typography fontWeight={600} fontSize='15px'>Lý do thay đổi ngày trả hàng: </Typography>
                  <Typography fontSize='15px'>{data.reason}</Typography>
                </Stack>
              )}
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
                  onClick={() => data && handleOpenUpdateOrder(data)}
                  disabled={data.reason !== null}
                >
                  Chỉnh sửa
                </Button>
              </Box>
            </Paper>
            {openUpdateOrder && order && (
              <UpdateOrder
                data={order}
                onClose={handleCloseUpdateOrder}
              />
            )}          
          </>
        )}
        {openViewProductsInOrder && order && (
          <ViewProductsInOrder
            data={order}
            onBack={handleCloseViewProductsInOrder}
          />
        )}
        {viewImageProducts && order && (
          <DialogListImageProduct
            order={order}
            onClose={handleCloseViewImageProducts}
            open={viewImageProducts}
          />
        )}
      </Box>
    );
}

export default CheckedOrder;