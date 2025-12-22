import { Box, Button, Paper } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import CardDetailDataOrder from "./CardDetailDataOrder";
import ProductStatusStepper from "./ProductStatusStepper";



import { COLORS } from "@/constants/colors";
import { IOrder } from "@/types/order";


interface CheckedOrderProps{
    data: IOrder;
    onClose: () => void;
}

const CheckedOrder = (props: CheckedOrderProps) => {
    const { data, onClose } = props;
    const handleClose = () => {
        onClose()
    }
    return (
      <Box>
        <NavigateBack title='Kiểm soát đơn hàng' onBack={handleClose} />
        <Paper sx={{ borderRadius: 2, m: 1.5, p: 2 }}>
          <CardDetailDataOrder order={data}>
            <ProductStatusStepper products={data.products} />
          </CardDetailDataOrder>
          <Box mt={2} display='flex' justifyContent='center'>
            <Button
              variant='outlined'
              sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, mr: 2, width: 150 }}
              onClick={() => {}}
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
      </Box>
    );
}

export default CheckedOrder;