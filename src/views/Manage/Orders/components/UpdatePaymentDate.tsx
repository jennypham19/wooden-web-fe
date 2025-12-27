import { IOrder } from "@/types/order";
import { Box, Paper, Stack, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import CardDetailDataOrder from "./CardDetailDataOrder";
import ProductStatusStepper from "./ProductStatusStepper";
import UpdateOrder from "./UpdateOrder";

interface UpdatePaymentDateProps{
    data: IOrder;
    onClose: () => void;
}

const UpdatePaymentDate = (props: UpdatePaymentDateProps) => {
    const { data, onClose } = props;

    return(
        <Box>
            <NavigateBack title='Kiểm soát đơn hàng' onBack={onClose} />
            <Paper sx={{ borderRadius: 2, m: 1.5, p: 2 }}>
              <CardDetailDataOrder order={data}>
                <ProductStatusStepper products={data.products} />
              </CardDetailDataOrder>
              {data.reason !== null && (
                <Stack mt={2} direction='row'>
                  <Typography fontWeight={600} fontSize='15px'>Lý do thay đổi ngày trả hàng: </Typography>
                  <Typography fontSize='15px'>{data.reason}</Typography>
                </Stack>
              )}
            </Paper>
            <UpdateOrder
                data={data}
                onClose={onClose}
            />
        </Box>
    )
}

export default UpdatePaymentDate;